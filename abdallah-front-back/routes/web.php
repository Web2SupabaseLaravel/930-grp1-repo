<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\Users;


Route::get('/users/create', function () {
    $data['user'] = new Users();
    $data['route'] = 'users.store';
    $data['method'] = 'post';
    $data['titleForm'] = 'Register New User';
    $data['submitButton'] = 'Register';
    return view('users.form', $data);
})->name('users.create');

Route::post('/users', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:6|confirmed',
    ]);

    $user = new Users();
    $user->name = $request->name;
    $user->email = $request->email;
    $user->password = Hash::make($request->password);
    $user->save();

    return redirect()->route('users.create')->with('success', 'User registered successfully');
})->name('users.store');

Route::get('/users', function () {
    return response()->json(['users' => Users::all()]);
})->name('users.index');

Route::get('/login', function () {
    return view('auth.login');
})->name('login.form');

Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (Auth::attempt($request->only('email', 'password'))) {
        return redirect('/dashboard');
    }

    return back()->withErrors(['email' => 'Invalid credentials']);
})->name('login');

Route::get('/dashboard', function () {
    return 'welcome';
})->middleware('auth')->name('dashboard');

Route::get('/forgot-password', function () {
    return view('auth.forgot-password');
})->middleware('guest')->name('password.request');

Route::post('/forgot-password', function (Request $request) {
    $request->validate(['email' => 'required|email']);

    $status = Password::sendResetLink($request->only('email'));

    return $status === Password::RESET_LINK_SENT
        ? back()->with(['status' => __($status)])
        : back()->withErrors(['email' => __($status)]);
})->middleware('guest')->name('password.email');

Route::get('/reset-password/{token}', function ($token) {
    return view('auth.reset-password', ['token' => $token]);
})->middleware('guest')->name('password.reset');

Route::post('/reset-password', function (Request $request) {
    $request->validate([
        'token' => 'required',
        'email' => 'required|email',
        'password' => 'required|min:8|confirmed',
    ]);

    $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->forceFill([
                'password' => Hash::make($password),
            ])->save();
        }
    );

    return $status === Password::PASSWORD_RESET
        ? redirect()->route('users.create')->with('success', __($status))
        : back()->withErrors(['email' => [__($status)]]);
})->middleware('guest')->name('password.update');

Route::get('/logout', function () {
    Auth::logout();
    return redirect('/login');
})->name('logout');

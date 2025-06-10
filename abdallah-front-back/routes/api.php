<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;

Route::post('/register', [UsersController::class, 'store']);
Route::post('/login', [UsersController::class, 'login']);
Route::post('/forgot-password', [UsersController::class, 'forgotPassword']);
Route::post('/reset-password', [UsersController::class, 'resetPassword']);

Route::middleware('auth:jwt')->group(function () {
    Route::get('/me', [UsersController::class, 'me']);
    Route::post('/logout', [UsersController::class, 'logout']);
});

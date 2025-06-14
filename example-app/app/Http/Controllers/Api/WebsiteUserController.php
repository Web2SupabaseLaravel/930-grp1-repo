<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Models\WebsiteUser;
use App\Models\Admin;
use App\Models\Student;
use App\Models\Instructor;

class WebsiteUserController extends Controller
{
    public function countUsers()
    {
        return response()->json(['total_users' => WebsiteUser::count()]);
    }

    public function index()
    {
        $users = WebsiteUser::with(['admin', 'student', 'instructor'])->get();

        $formatted = $users->map(function ($user) {
            $role = 'Unknown';
            if ($user->admin) $role = 'Admin';
            elseif ($user->instructor) $role = 'Instructor';
            elseif ($user->student) $role = 'Student';

            return [
                'id' => $user->id,
                'email' => $user->email,
                'role' => $role,
            ];
        });

        return response()->json($formatted);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|unique:website_users,email',
                'password' => 'required|string|min:6',
                'role' => 'required|in:admin,student,instructor',
            ]);

            $user = WebsiteUser::create([
                'id' => Str::uuid(),
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $this->attachRole($user->id, $request->role);

            return response()->json(['message' => 'User created successfully', 'user_id' => $user->id], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error: ' . $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ], 500);
        }
    }

    public function show($id)
    {
        $user = WebsiteUser::with(['admin', 'student', 'instructor'])->find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $role = 'Unknown';
        if ($user->admin) $role = 'Admin';
        elseif ($user->instructor) $role = 'Instructor';
        elseif ($user->student) $role = 'Student';

        return response()->json([
            'id' => $user->id,
            'email' => $user->email,
            'role' => $role,
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = WebsiteUser::with(['admin', 'student', 'instructor'])->find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $request->validate([
            'email' => 'required|email|unique:website_users,email,' . $user->id,
            'password' => 'nullable|string|min:6',
            'role' => 'required|in:admin,student,instructor',
        ]);

        $user->email = $request->email;
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
        $user->save();

        
        $user->admin()?->delete();
        $user->student()?->delete();
        $user->instructor()?->delete();

        $this->attachRole($user->id, $request->role);

        return response()->json(['message' => 'User updated successfully']);
    }

    public function destroy($id)
    {
        $user = WebsiteUser::with(['admin', 'student', 'instructor'])->find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->admin()?->delete();
        $user->student()?->delete();
        $user->instructor()?->delete();
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    private function attachRole($userId, $role)
    {
        if ($role === 'admin') {
            Admin::create(['user_id' => $userId]);
        } elseif ($role === 'student') {
            Student::create(['user_id' => $userId]);
        } elseif ($role === 'instructor') {
            Instructor::create(['user_id' => $userId]);
        }
    }
}

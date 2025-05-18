<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LessonCompletionConroller;
use App\Http\Controllers\LessonController;

Route::view('/', 'welcome');

Route::view('dashboard', 'dashboard')
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::view('profile', 'profile')
    ->middleware(['auth'])
    ->name('profile');

    //Jaber Routes
Route::get('/course/{course_id}/lessons', [LessonController::class, 'index']);
Route::get('/lesson/{lesson_id}/{course_id}', [LessonController::class, 'show']);
Route::post('/storelessons', [LessonCompletionConroller::class, 'store']);

require __DIR__.'/auth.php';

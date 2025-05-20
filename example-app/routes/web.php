<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LessonController;

Route::view('/', 'welcome');

Route::view('dashboard', 'dashboard')
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::view('profile', 'profile')
    ->middleware(['auth'])
    ->name('profile');


Route::get('/courses/{course_id}/lessons', [LessonController::class, 'index'])->name('lessons.index');
Route::get('/lessons/{lesson_id}', [LessonController::class, 'show'])->name('lessons.show');
Route::post('/lessons', [LessonController::class, 'store'])->name('lessons.store');
Route::put('/lessons/{lesson_id}', [LessonController::class, 'update'])->name('lessons.update');
Route::delete('/lessons/{lesson_id}', [LessonController::class, 'destroy'])->name('lessons.destroy');


require __DIR__.'/auth.php';

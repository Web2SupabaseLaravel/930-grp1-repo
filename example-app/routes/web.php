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

Route::get('/course/{course_id}/lessons', [LessonController::class, 'index'])->name('lessons.index');
Route::get('/lesson/{lesson_id}/{course_id}', [LessonController::class, 'show'])->name('lessons.show');
Route::post('/storelessons', [LessonCompletionConroller::class, 'store'])->name('lessoncompletions.store');
Route::get('/lessoncompletions', [LessonCompletionConroller::class, 'index'])->name('lessoncompletions.index');
Route::get('/lessoncompletions/{id}', [LessonCompletionConroller::class, 'show'])->name('lessoncompletions.show');
Route::get('/lessoncompletions/{id}/edit', [LessonCompletionConroller::class, 'edit'])->name('lessoncompletions.edit');
Route::put('/lessoncompletions/{id}', [LessonCompletionConroller::class, 'update'])->name('lessoncompletions.update');
Route::delete('/lessoncompletions/{id}', [LessonCompletionConroller::class, 'destroy'])->name('lessoncompletions.destroy');

require __DIR__.'/auth.php';

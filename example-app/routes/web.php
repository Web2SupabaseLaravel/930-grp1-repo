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
Route::get('/course/{course_id}/lessons', [LessonController::class, 'index'])->name('lessons.index');
Route::get('/lesson/{lesson_id}/{course_id}', [LessonController::class, 'show'])->name('lesson.show');
Route::get('/lessons/{id}/edit', [LessonController::class, 'edit'])->name('lessons.edit');
Route::put('/lessons/{lesson_id}{course_id}', [LessonController::class, 'update'])->name('lessons.update');

Route::get('/lessoncompleted/{id}/edit',[LessonCompletionConroller::class,'show'])->name('lessonCompletion.show');
Route::post('/storelessons',[LessonCompletionConroller::class,'store'])->name('lessonCompletion.store');
Route::get('/course/{id}/completions', [LessonCompletionConroller::class, 'index'])->name('lessonCompletions.index');
Route::delete('/lessontodelete/{id}',[LessonCompletionConroller::class,'destroy'])->name('lessonCompletions.delete');

require __DIR__.'/auth.php';

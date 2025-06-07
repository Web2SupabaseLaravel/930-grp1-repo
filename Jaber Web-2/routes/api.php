<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LessonCompletionConroller;
use App\Http\Controllers\LessonController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::get('/course/{course_id}/lessons', [LessonController::class, 'index']);

Route::get('/lesson/{lesson_id}/{course_id}', [LessonController::class, 'show']);

Route::get('/lessoncompletions', [LessonCompletionConroller::class, 'index']);

Route::get('/lessoncompletions/{id}', [LessonCompletionConroller::class, 'show']);

Route::post('/lessoncompletions', [LessonCompletionConroller::class, 'store']);

Route::put('/lessoncompletions/{id}', [LessonCompletionConroller::class, 'update']);

Route::delete('/lessoncompletions/{id}', [LessonCompletionConroller::class, 'destroy']);


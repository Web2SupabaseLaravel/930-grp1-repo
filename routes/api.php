<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuestionController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Test POST route
Route::post('/', function () {
    return response()->json(['message' => 'POST worked!']);
});

// Question routes
Route::post('questions', [QuestionController::class, 'store']);
Route::get('questions', [QuestionController::class, 'index']);
Route::put('questions/{id}', [QuestionController::class, 'update']);
Route::delete('questions/{id}', [QuestionController::class, 'destroy']);
Route::get('questions/{id}', [QuestionController::class, 'show']);


// Quiz routes
Route::get('quizzes', [QuizController::class, 'index']);
Route::post('quizzes', [QuizController::class, 'store']);
Route::get('quizzes/{id}', [QuizController::class, 'show']);
Route::put('quizzes/{id}', [QuizController::class, 'update']);
Route::delete('quizzes/{id}', [QuizController::class, 'destroy']);

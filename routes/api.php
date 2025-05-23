<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LastestcourseController;
use App\Http\Controllers\EnrollmentController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {
    return ['message' => 'API is working'];
});



Route::get('/lastestcourses', [LastestcourseController::class, 'apiIndex']);
Route::get('/enrollments', [EnrollmentController::class, 'index']);
Route::post('/enrollments', [EnrollmentController::class, 'store']);
Route::get('/enrollments/{student_id}/{course_id}', [EnrollmentController::class, 'show']);
Route::delete('/enrollments/{student_id}/{course_id}', [EnrollmentController::class, 'destroy']);
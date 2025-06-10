<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LastestcourseController;
use App\Http\Controllers\EnrollmentController;

use App\Http\Controllers\JWTAuthController;
use App\Http\Middleware\JwtMiddleware;

Route::post('register', [JWTAuthController::class, 'register']);
Route::post('login', [JWTAuthController::class, 'login']);

Route::middleware([JwtMiddleware::class])->group(function () {
    Route::get('user', [JWTAuthController::class, 'getUser']);
    Route::post('logout', [JWTAuthController::class, 'logout']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/test', function () {
    return ['message' => 'API is working'];
});



Route::get('/latest-courses', [LastestcourseController::class, 'apiIndex']);
Route::get('/enrollments', [EnrollmentController::class, 'index']);
Route::post('/enrollments', [EnrollmentController::class, 'store']);
Route::delete('/enrollments/{student_id}/{course_id}', [EnrollmentController::class, 'destroy']);
Route::patch('/enrollments/{student_id}/{course_id}', [EnrollmentController::class, 'update']);

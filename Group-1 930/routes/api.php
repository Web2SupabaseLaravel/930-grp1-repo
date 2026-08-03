<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LessonCompletionConroller;
use App\Http\Controllers\LessonController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Jaber
Route::get('/course/{course_id}/lessons', [LessonController::class, 'index']);
Route::get('/lesson/{lesson_id}/{course_id}', [LessonController::class, 'show']);
Route::get('/lessoncompletions', [LessonCompletionConroller::class, 'index']);
Route::get('/lessoncompletions/{id}', [LessonCompletionConroller::class, 'show']);
Route::post('/lessoncompletions', [LessonCompletionConroller::class, 'store']);
Route::put('/lessoncompletions/{id}', [LessonCompletionConroller::class, 'update']);
Route::delete('/lessoncompletions/{id}', [LessonCompletionConroller::class, 'destroy']);

//Ibrahim 
Route::get('/course/{course_id}/lessons', [LessonController::class, 'index']);
Route::get('/lesson/{lesson_id}', [LessonController::class, 'show']);
Route::post('/lesson', [LessonController::class, 'store']);
Route::put('/lesson/{lesson_id}', [LessonController::class, 'update']);
Route::delete('/lesson/{lesson_id}', [LessonController::class, 'destroy']);

//Manar 
Route::apiResource('courses', CourseApiController::class);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Abdallah
Route::post('/register', [UsersController::class, 'store']);
Route::post('/login', [UsersController::class, 'login']);
Route::post('/forgot-password', [UsersController::class, 'forgotPassword']);
Route::post('/reset-password', [UsersController::class, 'resetPassword']);Route::middleware('auth:jwt')->group(function () {
Route::get('/me', [UsersController::class, 'me']);
Route::post('/logout', [UsersController::class, 'logout']);
});

//Walaa
Route::get('/latest-courses', [LastestcourseController::class, 'apiIndex']);
Route::get('/enrollments', [EnrollmentController::class, 'index']);
Route::get('/enrollments/{student_id}/{course_id}', [EnrollmentController::class, 'show']);
Route::post('/enrollments', [EnrollmentController::class, 'store']);
Route::delete('/enrollments/{student_id}/{course_id}', [EnrollmentController::class, 'destroy']);
Route::patch('/enrollments/{student_id}/{course_id}', [EnrollmentController::class, 'update']);

//Mohammad
Route::get('/courses/count', [CourseController::class, 'countCourses']);
Route::get('/website-users/count', [WebsiteUserController::class, 'countUsers']);
Route::get('/enrollments/count', [EnrollmentController::class, 'countEnrollments']);
Route::get('/website-users', [WebsiteUserController::class, 'index']);          
Route::post('/website-users', [WebsiteUserController::class, 'store']);        
Route::get('/website-users/{id}', [WebsiteUserController::class, 'show']);     
Route::put('/website-users/{id}', [WebsiteUserController::class, 'update']);   
Route::delete('/website-users/{id}', [WebsiteUserController::class, 'destroy']);
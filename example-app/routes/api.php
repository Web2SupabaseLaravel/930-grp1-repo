<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\WebsiteUserController;
use App\Http\Controllers\Api\EnrollmentController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/courses/count', [CourseController::class, 'countCourses']);
Route::get('/website-users/count', [WebsiteUserController::class, 'countUsers']);
Route::get('/enrollments/count', [EnrollmentController::class, 'countEnrollments']);


Route::get('/website-users', [WebsiteUserController::class, 'index']);          
Route::post('/website-users', [WebsiteUserController::class, 'store']);        
Route::get('/website-users/{id}', [WebsiteUserController::class, 'show']);     
Route::put('/website-users/{id}', [WebsiteUserController::class, 'update']);   
Route::delete('/website-users/{id}', [WebsiteUserController::class, 'destroy']);

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

Route::prefix('admin')->group(function () {
    Route::get('/users', [AdminController::class, 'indexUsers']);
    Route::post('/users', [AdminController::class, 'createUser']);
    Route::put('/users/{id}', [AdminController::class, 'updateUser']);
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser']);

    Route::get('/reports/enrollments', [AdminController::class, 'courseEnrollmentReport']);
    Route::get('/reports/popular-courses', [AdminController::class, 'popularCourses']);
});
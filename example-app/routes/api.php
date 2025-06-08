<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\LessonController;
use Illuminate\Support\Facades\DB;

Route::options('/{any}', function () {
    return response('', 200)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization, X-Requested-With');
})->where('any', '.*');
Route::get('/db-test', function () {
    try {
        DB::connection()->getPdo();
        $dbConfig = [
            'connection' => config('database.default'),
            'host' => config('database.connections.pgsql.host'),
            'database' => config('database.connections.pgsql.database'),
            'username' => config('database.connections.pgsql.username'),
            'port' => config('database.connections.pgsql.port'),
        ];
        
        return response()->json([
            'message' => 'Database connection successful',
            'config' => $dbConfig
        ])->header('Access-Control-Allow-Origin', '*');
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Database connection failed',
            'error' => $e->getMessage()
        ], 500)->header('Access-Control-Allow-Origin', '*');
    }
});


Route::get('/course/{course_id}/lessons', [LessonController::class, 'index']);
Route::get('/lesson/{lesson_id}', [LessonController::class, 'show']);
Route::post('/lesson', [LessonController::class, 'store']);
Route::put('/lesson/{lesson_id}', [LessonController::class, 'update']);
Route::delete('/lesson/{lesson_id}', [LessonController::class, 'destroy']);

// Catch-all for undefined routes
Route::any('{any}', function () {
    return response()->json(['message' => 'Not Found'], 404);
})->where('any', '.*');

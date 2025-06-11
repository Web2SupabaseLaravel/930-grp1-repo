<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CourseApiController extends Controller
{
    // Get all courses
    public function index()
    {
        $courses = Course::orderBy('id')->get();
        return response()->json($courses);
    }

    // Store a new course
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'catagory' => 'required|string|max:100',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'instructor_id' => 'required|uuid|exists:users,id',
            'learning_objectives' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $course = new Course($request->all());
        $course->id = Str::uuid();
        $course->managed_by = optional(auth()->user())->id ?? '8faf2226-c270-4be8-89c7-ffc60a4bf1eb';
        $course->save();

        return response()->json([
            'message' => 'Course created successfully',
            'course' => $course
        ], 201);
    }

    // Show a single course
    public function show(Course $course)
    {
        return response()->json($course);
    }

    // Update course
    public function update(Request $request, Course $course)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'catagory' => 'required|string|max:100',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'instructor_id' => 'required|uuid|exists:users,id',
            'learning_objectives' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $course->update($request->all());

        return response()->json([
            'message' => 'Course updated successfully',
            'course' => $course
        ]);
    }

    // Delete course
    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json([
            'message' => 'Course deleted successfully'
        ]);
    }
}

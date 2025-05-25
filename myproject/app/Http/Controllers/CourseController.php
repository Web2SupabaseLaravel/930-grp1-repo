<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class CourseController extends Controller
{
    /**
     * Display a listing of the courses.
     *
     */
    public function index()
    {
        $courses = Course::orderBy('id')->get();
        return view('courses.index', compact('courses'));
    }

    /**
     * Show the form for creating a new course.
     *
     */
    public function create()
    {
        $instructors = User::all();
        return view('courses.form_courses', compact('instructors'));
    }

    /**
     * Store a newly created course in storage.
     *
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'catagory' => 'required|string|max:100',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'instructor_id' => 'uuid|required|exists:instructors,user_id',
            'learning_objectives' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $course = new Course($request->all());
$course->id = Str::uuid(); // Generate a unique ID for the course
$course->managed_by = auth()->id() ?? '8faf2226-c270-4be8-89c7-ffc60a4bf1eb';
$course->save();

        return redirect()->route('courses.index')
            ->with('success', 'Course created successfully.');
    }

    /**
     * Display the specified course.
     *
     */
    public function show(Course $course)
    {
        return view('courses.show', compact('course'));
    }

    /**
     * Show the form for editing the specified course.
     *
     */
    public function edit(Course $course)
    {
        $instructors = User::all();
        return view('courses.form_courses', compact('course', 'instructors'));
    }

    /**
     * Update the specified course in storage.
     *
     */
    public function update(Request $request, Course $course)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'catagory' => 'required|string|max:100',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'instructor_id' => 'uuid|required|exists:users,user_id',
            'learning_objectives' => 'required|string',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $course->update($request->all());

        return redirect()->route('courses.index')
            ->with('success', 'Course updated successfully.');
    }

    /**
     * Remove the specified course from storage.
     *
     */
    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('courses.index')
            ->with('success', 'Course deleted successfully.');
    }
}

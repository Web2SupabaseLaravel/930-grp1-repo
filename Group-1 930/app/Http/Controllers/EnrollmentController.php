<?php

namespace App\Http\Controllers;
use App\Models\enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class enrollmentController extends Controller
{
     /**
     * عرض جميع الكورسات التي سجل بها الطالب.
     */
public function index(Request $request)
{
    $studentId = $request->query('student_id');

    if ($studentId) {
        return Enrollment::with('course')
            ->where('student_id', $studentId)
            ->get();
    }

   
    return Enrollment::with('course')->get();
}



    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_id' => 'required|uuid|exists:courses,id',
        ]);

        $validated['student_id'] ="0524c29d-8233-4189-82a0-3cfb46042eb4";
        $validated['progress_percent'] = 0;

        // منع التكرار
        $existing = Enrollment::where('course_id', $validated['course_id'])
                              ->where('student_id', $validated['student_id'])
                              ->first();

        if ($existing) {
            return response()->json(['message' => 'Already enrolled in this course.'], 409);
        }

        $enrollment = Enrollment::create($validated);

        return response()->json($enrollment, 201);
    }


     /**
     * عرض تفاصيل التسجيل (يشمل التقدم ومعلومات الكورس).
     */
public function show(Request $request, $student_id, $course_id)
{
    $enrollment = Enrollment::where('student_id', $student_id)
                            ->where('course_id', $course_id)
                            ->first();

    if (!$enrollment) {
        return response()->json(['message' => 'Enrollment not found'], 404);
    }

  
    $enrollment->load('course');

    return response()->json($enrollment, 200);
}



public function update(Request $request, $student_id, $course_id)
{
    $request->validate([
        'progress_percent' => 'required|integer|min:0|max:100'
    ]);

    $enrollment = Enrollment::where('student_id', $student_id)
                            ->where('course_id', $course_id)
                            ->first();

    if (!$enrollment) {
        return response()->json(['message' => 'Enrollment not found'], 404);
    }

    $enrollment->progress_percent = $request->progress_percent;
    $enrollment->save();

    return response()->json($enrollment);
}


    /**
     * Remove the specified resource from storage.
     */
public function destroy(Request $request, $student_id, $course_id)
{
    $enrollment = Enrollment::where('student_id', $student_id)
                            ->where('course_id', $course_id)
                            ->first();

    if (!$enrollment) {
        return response()->json(['message' => 'Enrollment not found'], 404);
    }

    if ($student_id != $enrollment->student_id) {
        return response()->json(['message' => 'Unauthorized access.'], 403);
    }

    // حذف التسجيل باستخدام Query Builder مباشرةً
    $deleted = \DB::table('enrollments')
                  ->where('student_id', $student_id)
                  ->where('course_id', $course_id)
                  ->delete();

    if ($deleted) {
        return response()->json(['message' => 'Enrollment deleted'], 200);
    } else {
        return response()->json(['message' => 'Failed to delete enrollment'], 500);
    }
}}

<?php

namespace App\Http\Controllers;
use App\Models\enrollment;
use Illuminate\Http\Request;

class enrollmentController extends Controller
{
     /**
     * عرض جميع الكورسات التي سجل بها الطالب.
     */
    public function index(Request $request)
    {
        $studentId = "0524c29d-8233-4189-82a0-3cfb46042eb4";

        $enrollments = Enrollment::where('student_id', $studentId)
            ->whereHas('course') // التأكد من وجود الكورس
            ->with('course') // جلب بيانات الكورس
            ->get();

        return response()->json($enrollments, 200);
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

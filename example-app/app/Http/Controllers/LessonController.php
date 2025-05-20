<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lesson;
use App\Models\Course;
use Illuminate\Support\Str;

class LessonController extends Controller
{
    public function index($course_id)
    {
       
        $course = Course::where('id', $course_id)->firstOrFail();
        $lessons = Lesson::where('course_id', $course_id)->get();

        return view('lessons.index', compact('course', 'lessons'));
    }

    public function show($lesson_id)
    {
        $lesson = Lesson::where('lesson_id', $lesson_id)->firstOrFail();
        return response()->json($lesson);
    }

    public function create()
    {
        return response()->json([
            'fields' => [
                'title' => '',
                'content_type' => '',
                'content_url' => '',
                'order_number' => '',
                'course_id' => ''
            ],
            'message' => 'جاهز لإنشاء درس جديد'
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'course_id' => 'required|exists:courses,id',
            'content_type' => 'nullable|string',
            'content_url' => 'nullable|string',
            'order_number' => 'nullable|integer',
        ]);

        $lesson = Lesson::create([
            'lesson_id' => Str::uuid(),
            'course_id' => $request->course_id,
            'title' => $request->title,
            'content_type' => $request->content_type,
            'content_url' => $request->content_url,
            'order_number' => $request->order_number,
        ]);

        return response()->json([
            'message' => 'تم إنشاء الدرس بنجاح',
            'lesson' => $lesson
        ], 201);
    }

    public function update(Request $request, $lesson_id)
    {
        $lesson = Lesson::where('lesson_id', $lesson_id)->firstOrFail();

        $request->validate([
            'title' => 'required|string|max:255',
            'content_type' => 'nullable|string',
            'content_url' => 'nullable|string',
            'order_number' => 'nullable|integer',
        ]);

        $lesson->update([
            'title' => $request->title,
            'content_type' => $request->content_type,
            'content_url' => $request->content_url,
            'order_number' => $request->order_number,
        ]);

        return response()->json([
            'message' => 'تم تحديث الدرس بنجاح',
            'lesson' => $lesson
        ]);
    }

    public function destroy($lesson_id)
    {
        $lesson = Lesson::where('lesson_id', $lesson_id)->firstOrFail();
        $lesson->delete();

        return response()->json([
            'message' => 'تم حذف الدرس بنجاح'
        ]);
    }
}

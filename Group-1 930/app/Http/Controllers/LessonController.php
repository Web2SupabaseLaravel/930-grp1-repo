<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Lesson;
use App\Models\LessonCompletion;
use App\Models\Course;


class LessonController extends Controller
{
    public function index($course_id)
    {
    $student_id = '0524c29d-8233-4189-82a0-3cfb46042eb4';
        $lessons = Lesson::where('course_id', $course_id)->orderby('order_number')->get();
        $completed = LessonCompletion::where('course_id', $course_id)
            ->where('student_id', $student_id)
            ->pluck('lesson_id')
            ->toArray();
            
        $courseinfo=Course::where('id',$course_id)->firstOrFail();


        return response()->json([
            "lessonsCompleted"=>$completed,
            "lessons"=>$lessons,
            "course"=>$courseinfo,
        ]);
    }

public function show($lesson_id, $course_id)
{
    $student_id = '0524c29d-8233-4189-82a0-3cfb46042eb4';

    $lesson = Lesson::where('lesson_id', $lesson_id)
                    ->where('course_id', $course_id)
                    ->firstOrFail();

    $next = Lesson::where('course_id', $course_id)
                  ->where('order_number', '>', $lesson->order_number)
                  ->orderBy('order_number')
                  ->first();

    $prev = Lesson::where('course_id', $course_id)
                  ->where('order_number', '<', $lesson->order_number)
                  ->orderBy('order_number', 'desc')
                  ->first();

    $completion = LessonCompletion::where('lesson_id', $lesson_id)
        ->where('course_id', $course_id)
        ->where('student_id', $student_id)
        ->first();

    return response()->json([
        'lesson' => $lesson,
        'next' => $next,
        'prev' => $prev,
        'completed_lesson' => $completion
    ]);
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
        if (empty($request->title)) {
            return response()->json(['message' => 'Title is required'], 422);
        }
        
        if (empty($request->course_id)) {
            return response()->json(['message' => 'Course ID is required'], 422);
        }
        
        if (!Course::where('id', $request->course_id)->exists()) {
            return response()->json(['message' => 'Course not found'], 422);
        }
        
        $lesson = new Lesson();
        $lesson->lesson_id = $request->lesson_id ?? Str::uuid();
        $lesson->course_id = $request->course_id;
        $lesson->title = $request->title;
        $lesson->content_type = $request->content_type ?? 'text';
        $lesson->content_url = $request->content_url ?? '';
        $lesson->order_number = $request->order_number ?? 1;
        $lesson->created_at = now();
        $lesson->save();
        
        return response()->json([
            'message' => 'Lesson created successfully',
            'lesson' => $lesson
        ], 201);
    }

    public function update(Request $request, $lesson_id)
    {
        $lesson = Lesson::where('lesson_id', $lesson_id)->first();
        if (!$lesson) {
            return response()->json(['message' => 'Lesson not found'], 404);
        }
        
        if (empty($request->title)) {
            return response()->json(['message' => 'Title is required'], 422);
        }
        
        $lesson->title = $request->title;
        
        if ($request->has('content_type')) {
            $lesson->content_type = $request->content_type;
        }
        
        if ($request->has('content_url')) {
            $lesson->content_url = $request->content_url;
        }
        
        if ($request->has('order_number')) {
            $lesson->order_number = $request->order_number;
        }
        
        $lesson->save();
        
        return response()->json([
            'message' => 'Lesson updated successfully',
            'lesson' => $lesson
        ]);
    }

    public function destroy($lesson_id)
    {
        $lesson = Lesson::where('lesson_id', $lesson_id)->first();
        if (!$lesson) {
            return response()->json(['message' => 'Lesson not found'], 404);
        }
        
        $course_id = $lesson->course_id;
        $lesson->delete();
        
        return response()->json([
            'message' => 'Lesson deleted successfully',
            'deleted_lesson_id' => $lesson_id,
            'course_id' => $course_id
        ]);
    }
}



   

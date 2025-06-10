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
}

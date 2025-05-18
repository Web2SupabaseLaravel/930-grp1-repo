<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LessonCompletion;

class LessonCompletionConroller extends Controller
{
    public function store(Request $request)
    {
$student_id = '0524c29d-8233-4189-82a0-3cfb46042eb4'; 
        $request->validate([
            'lesson_id' => 'required',
            'course_id' => 'required',
        ]);

        $exists = LessonCompletion::where('lesson_id', $request->lesson_id)
            ->where('course_id', $request->course_id)
            ->where('student_id', $student_id)
            ->exists();

        if (!$exists) {
            LessonCompletion::create([
                'lesson_id' => $request->lesson_id,
                'course_id' => $request->course_id,
                'student_id' => $student_id
            ]);
        }

        return redirect()->back();
    }
}

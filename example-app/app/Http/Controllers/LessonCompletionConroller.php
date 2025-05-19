<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LessonCompletion;

class LessonCompletionConroller extends Controller
{
    public function index()
    {
        $alllessonscompleted = LessonCompletion::all();

        return response()->json([
            'all_completions' => $alllessonscompleted
    ]);
    }
    public function show($id)
    {
        $completion = LessonCompletion::findOrFail($id);

        return response()->json([
            'completion' => $completion
        ]);
    }

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
            $newlessoncompleted=new LessonCompletion();
            $newlessoncompleted->lesson_id=$request->lesson_id;
            $newlessoncompleted->course_id=$request->course_id;
            $newlessoncompleted->student_id=$student_id;
            $newlessoncompleted->save();
        }

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $completion = LessonCompletion::findOrFail($id);

        $request->validate([
            'lesson_id' => 'required',
            'course_id' => 'required',
            'student_id' => 'required',
        ]);

        $completion->lesson_id = $request->lesson_id;
        $completion->course_id = $request->course_id;
        $completion->student_id = $request->student_id;
        $completion->save();

        return response()->json(['message' => 'Updated successfully']);
    }

    public function destroy($id)
    {
        $completion = LessonCompletion::findOrFail($id);
        $completion->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}

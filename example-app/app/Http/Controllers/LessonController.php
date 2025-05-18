<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LessonCompletion ;
use App\Models\Lesson;
use App\Models\Enrollment;




class LessonController extends Controller
{

    public function index($course_id)
    {

    $student_id = 'b38ad75c-cd01-410c-b5a6-d69a2f2f3723';
    $all_lessons = Lesson::where('course_id', $course_id)->get();

    $completed_lessons = LessonCompletion ::where('course_id', $course_id)
        ->where('student_id', $student_id)
        ->pluck('lesson_id')
        ->toArray();

    $progress=Enrollment::where('course_id',$course_id)->where('student_id',$student_id)->value('progress_percent');
    //$course=Course::where('course_id',$course_id)->firstOrFail();

    return response()->json([
    'all_lessons' => $all_lessons,
    'completed_lessons' => $completed_lessons,
    'course_progress'=>$progress,
    //'course'=>$course
]);
    }


    public function create()
    {
       
    }


    public function store(Request $request)
    {
        //
    }


public function show($lesson_id, $course_id)
{


    $lesson = Lesson::where('lesson_id', $lesson_id)
                    ->where('course_id', $course_id)
                    ->firstOrFail();
    
    $next=Lesson::where('course_id',$course_id)->where('order_number','>',$lesson->order_number)->orderBy('order_number','asc')->first();
    $prev=Lesson::where('course_id',$course_id)->where('order_number','<',$lesson->order_number)->orderBy('order_number','desc')->first();


    return response()->json([
        'lesson' => $lesson,
        'next'=> $next,
        'prev'=>$prev
    ]);
}


    public function edit(string $id)
    {
        $lesson=Lesson::where('lesson_id',$id)->firstOrFail();

        return response()->json([
            'lesson to edit'=>$lesson
        ]);
    }//Not needed in my work, andd may not be logical for my work as well, but I did it for the practice


    public function update(Request $request,$lesson_id,$course_id)
    {
        $lesson = Lesson::where('lesson_id', $lesson_id)->where('course_id',$course_id)->firstOrFail();

    $request->validate([
        'title' => 'required|string',
        'order_number' => 'required|integer',
        'description' => 'string'
    ]);
    
    $lesson->title = $request->input('title');
    $lesson->order_number = $request->input('order_number');
    $lesson->description = $request->input('description');
    $lesson->save();

    return response()->json([
        'message' => 'Lesson updated successfully!',
        'lesson' => $lesson]);
    }


    public function destroy(string $id)
    {
        $lessontoremove=Lesson::where('lesson_id',$lesson_id)->where('course_id',$course_id)->firstOrFail();
        $lessontoremove->delete();
        return respose().json([
            'message'=>'Deleted Succesfully'
        ]);
    }
}

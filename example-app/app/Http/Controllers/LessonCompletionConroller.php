<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LessonCompletion;

class LessonCompletionConroller extends Controller
{

    public function index($id)
    {
        $allLessons=LessonCompletion::where('id',$id)->get();
        return response()->json([
        'allLessons'=>$allLessons
        ]);
    }


    public function create()
    {
        

    }


    public function store(Request $request)
    {

        $student_id='0524c29d-8233-4189-82a0-3cfb46042eb4';

        $request->validate([
            'lesson_id'=>'required',
            'course_id'=>'required',
        ]);

        $exists=LessonCompletion::where('lesson_id',$request->lesson_id)->where('course_id',$request->course_id)->where('student_id',$student_id)->exists();

        if(!$exists){
        $inputCompletion=new LessonCompletion ();
        $inputCompletion->student_id=$student_id;
        $inputCompletion->lesson_id=$request->lesson_id;
        $inputCompletion->course_id=$request->course_id;
        $inputCompletion->save();}

        $completed_count=LessonCompletion::where('course_id',$request->course_id)->where('student_id',$student_id)->count();
        $total_count=Lesson::where('course_id',$request->course_id)->count();
        
        if($total_count)
        $totalprogress=($completed_count/$total_count)*100;
        else{
        $totalprogress=0;
        }

        Enrollment::where('course_id',$request->course_id)->where('student_id',$student_id)->update(['progress_percent'=>$totalprogress]);

        return response()->json([
            'message'=>'Marked as completed',
            'total_progress'=>$totalprogress
        ]);

    }


    public function show(string $id)
    {
        $lesson=LessonCompletion::where('id',$id)->firstOrFail();


        return response()->json([
            'lesson'=>$lesson
        ]);

    }


    public function edit(string $id)
    {
        $lessoncompleted=LessonCompletion::where('lesson_id',$id)->firstOrFail();

        return response()->json([
        'lessoncompleted'=>$lessoncompleted
        ]);
    }


    public function update(Request $request, string $id)
    {
        
    }


    public function destroy($id)
    {
        $lessontoremove=Lesson::where('id',$id)->firstOrFail();
        $lessontoremove->delete();
    }
}

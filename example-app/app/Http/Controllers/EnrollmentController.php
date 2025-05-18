<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EnrollmentController extends Controller
{

    public function index()
    {
        //
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {
        $request->validate(
            [
                'lesson_id'=>'required',
                'course_id'=>'required',
                'progress_percent'=>'required'
            ]
            );

        $newernrollment=new Enrollment();
        $newernrollment->lesson_id=$request->lesson_id;
        $newernrollment->course_id=$request->course_id;
        $newernrollment->progress_percent=$request->progress_percent;
        $newernrollment.save();

        return response()->json([
            'newdata'=>$newernrollment
        ]);

    }


    public function show(string $id)
    {
        //
    }


    public function edit(string $id)
    {
        //
    }


    public function update(Request $request, string $id)
    {
        //
    }


    public function destroy(string $id)
    {
        //
    }
}

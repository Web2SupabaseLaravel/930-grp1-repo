<?php

namespace App\Http\Controllers;
use App\Models\Course;
use Illuminate\Http\Request;
class LastestcourseController extends Controller
{

public function apiIndex(Request $request)
{
    $category = $request->input('catagory');  // خذ القيمة من الرابط

    if ($category) {
        $courses = Course::where('catagory', $category)
                         ->orderBy('id', 'desc')
                         ->get();
    } else {
        $courses = Course::orderBy('id', 'desc')->get();
    }

    return response()->json($courses);
}

}

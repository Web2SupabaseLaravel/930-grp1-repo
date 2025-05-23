<?php

namespace App\Http\Controllers;
use App\Models\Course;
use Illuminate\Http\Request;
class LastestcourseController extends Controller
{
public function index(Request $request)
    {
        $category = $request->input('category');

        if ($category) {
            // إذا المستخدم اختار تصنيف
            $courses = Course::where('category', $category)
                             ->orderBy('id', 'desc') 
                             ->get();
        } else {
            // إذا المستخدم ما اختار شيء
            $courses = Course::orderBy('id', 'desc')->get();
        }

return view('LastestcourseController', compact('courses', 'category'));
    }


    public function apiIndex(Request $request)
{
    $category = $request->input('category');

    if ($category) {
        $courses = Course::where('category', $category)
                         ->orderBy('id', 'desc') // أو orderBy('created_at', 'desc') لو موجود
                         ->get();
    } else {
        $courses = Course::orderBy('id', 'desc')->get();
    }

    return response()->json($courses);
}

}

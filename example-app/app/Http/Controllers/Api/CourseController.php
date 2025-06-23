<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    public function countCourses()
    {
        $count = Course::count();
        return response()->json(['total_courses' => $count]);
    }
}

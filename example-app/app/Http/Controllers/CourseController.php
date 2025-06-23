<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    public function count()
    {
        $total = DB::table('courses')->count();

        return response()->json([
            'total_courses' => $total
        ]);
    }
}

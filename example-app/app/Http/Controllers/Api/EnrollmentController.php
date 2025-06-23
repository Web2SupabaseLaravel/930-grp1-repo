<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class EnrollmentController extends Controller
{
    public function countEnrollments()
    {
        $count = DB::table('enrollments')->count();
        return response()->json(['total_enrollments' => $count]);
    }
}

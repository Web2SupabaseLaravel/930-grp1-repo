<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Enrollment extends Model
{
    use HasFactory;
    protected $table ='enrollments';
    protected $keyType='string';
    public $timestamps=false;
    public $incrementing=false;// becuase we are using UUID, so don't expect the primary key to be incrementing as if we did in int

    protected $fillable=[
        'student_id','course_id','progress_percent'
    ];

        //public function completions()
    //{
        //return $this->belongsTo(Course::class, 'course_id', 'course_id');
    //}

}

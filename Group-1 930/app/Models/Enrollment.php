<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Enrollment extends Model
{
    use HasFactory;
    protected $table ='enrollments';
    protected $primaryKey = null;
    protected $keyType='string';
    public $timestamps=false;
    public $incrementing=false;

    protected $fillable=[
        'student_id','course_id','progress_percent'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
}
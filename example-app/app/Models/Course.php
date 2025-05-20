<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $table = 'courses';
   

    public $timestamps = true;

    protected $fillable = [
        'title', 'description', 'created_at'
    ];

    public function lessons()
    {
        return $this->hasMany(Lesson::class, 'course_id', 'id');
       
    }
}
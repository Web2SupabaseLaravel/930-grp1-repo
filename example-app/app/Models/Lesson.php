<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\LessonComplition;

class Lesson extends Model
{
    use HasFactory;
    protected $table='lessons';
    protected $keyType='string';
    public $incrementing=false;
    public $timestamps =true;


        protected $fillable=[
        'lesson_id','course_id','title','content_type','content_url','order_number','created_at'
    ];


}

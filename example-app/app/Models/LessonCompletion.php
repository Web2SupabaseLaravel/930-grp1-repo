<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Lesson;

class LessonCompletion  extends Model
{
    use HasFactory;
    protected $table='lesson_complitions';
    protected $keyType='string';
    public $incrementing=false;
    public $timestamps =false;


    // public function lessons(){
    //     return $this->belongsTo(Lesson::class,'lesson_id','lesson_id');
    // }
}//Table has PK of id so no need to mention it here

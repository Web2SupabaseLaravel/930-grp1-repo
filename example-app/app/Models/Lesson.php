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

    // public function completions(){
    //     return $this->hasMany(LessonComplition::class,'lesson_id','lesson_id');
    // }

}

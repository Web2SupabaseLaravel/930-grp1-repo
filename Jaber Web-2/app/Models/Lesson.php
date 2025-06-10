<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\LessonCompletion;

class Lesson extends Model
{
    use HasFactory;

    protected $table = 'lessons';
    protected $keyType = 'string';
    public $incrementing = false;
    public $timestamps = true;

    protected $fillable = [
        'lesson_id', 'course_id', 'title', 'content_type', 'content_url', 'order_number'
    ];

    public function completions()
    {
        return $this->hasMany(LessonCompletion::class, 'lesson_id', 'lesson_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    protected $table = 'lessons';
    protected $primaryKey = 'lesson_id';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = true;
    const UPDATED_AT = null;

    protected $fillable = [
        'lesson_id',
        'course_id',
        'title',
        'content_type',
        'content_url',
        'order_number',
        'created_at',
    ];

   public function course()
{
    return $this->belongsTo(Course::class, 'course_id', 'id');
}

    public function quizzes()
    {
        return $this->hasMany(Quiz::class, 'lesson_id');
    }

    public function completions()
    {
        return $this->hasMany(LessonCompletion::class, 'lesson_id');
    }
}


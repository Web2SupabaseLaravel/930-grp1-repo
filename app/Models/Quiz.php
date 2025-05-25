<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
      protected $table = 'quizzes';
    protected $primaryKey = 'quiz_id';
    public $incrementing = false;
    protected $keyType = 'uuid';
    public $timestamps = false;

    protected $fillable = [
        'quiz_id',
        'course_id',
        'lesson_id',
        'total_marks',
        'passing_marks',
        'created_at',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (!$model->quiz_id) {
                $model->quiz_id = (string) Str::uuid();
            }
        });
    }
}

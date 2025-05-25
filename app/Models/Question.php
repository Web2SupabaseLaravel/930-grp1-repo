<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Question extends Model
{
    use HasFactory;

    protected $table = 'questions';
    protected $primaryKey = 'id'; // Assuming 'id' is your primary key
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false ; // Set to false if you don't have created_at/updated_at

    protected $fillable = [
        'id',
        'course_id',
        'lesson_id',
        'quiz_id',
        'question',
        'choice_1',
        'choice_2',
        'choice_3',
        'choice_4',
        'answer',
        'mark',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (!$model->id) {
                $model->id = (string) Str::uuid();
            }
        });
    }
}

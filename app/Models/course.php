<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Course extends Model
{
    public $incrementing = false;
    protected $keyType = 'uuid';

    protected $fillable = [
        'id',
        'title',
        'catagory',
        'description',
        'price',
        'instructor_id',
        'learning_objectives',
        'managed_by',
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

    public function enrollments()
    {
    return $this->hasMany(enrollment::class, 'course_id');
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     *
     */
    public $timestamps = false;
     protected $fillable = [
        'title',
        'catagory', // Note: This follows the table schema you provided
        'description',
        'price',
        'instructor_id',
        'learning_objectives',
        'managed_by',
    ];

    /**
     * Get the instructor that owns the course.
     */
    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }

    /**
     * Get the manager that manages the course.
     */
    public function manager()
    {
        return $this->belongsTo(User::class, 'managed_by');
    }
}

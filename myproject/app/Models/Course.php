<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Concerns\HasUuids;


class Course extends Model
{
    use HasFactory;
    use HasUuids;

    protected $table = 'courses';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = false;
    public $incrementing = false;
     protected $fillable = [
        'title',
        'catagory',
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

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;
    protected $table="courses";
    protected $keyType="string";
    public $timestamps=false;
    public $incrementing;

    protected $fillable=[
        'id','title','catagory','description','price','instructor_id','learning_objectives','managed_by'
    ];


}

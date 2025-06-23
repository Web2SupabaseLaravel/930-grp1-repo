<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Admin;
use App\Models\Student;
use App\Models\Instructor;

class WebsiteUser extends Model
{
    public $table = 'website_users';

    protected $fillable = ['id', 'email', 'password'];

    public $incrementing = false; 
    protected $keyType = 'string'; 
    public $timestamps = false;

   
    public function admin()
    {
        return $this->hasOne(Admin::class, 'user_id', 'id');
    }

    public function student()
    {
        return $this->hasOne(Student::class, 'user_id', 'id');
    }

    public function instructor()
    {
        return $this->hasOne(Instructor::class, 'user_id', 'id');
    }
}

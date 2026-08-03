<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = 'admins';
    public $timestamps = false;
    protected $primaryKey = 'user_id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['user_id'];

    public function user()
    {
        return $this->belongsTo(WebsiteUser::class, 'user_id');
    }
}

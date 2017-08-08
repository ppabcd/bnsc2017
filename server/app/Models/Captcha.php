<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Captcha extends Model
{
    protected $fillable = ['captcha'];
    public $timestamps = false;
}

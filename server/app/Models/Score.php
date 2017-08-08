<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    protected $fillable = ['type', 'score', 'user_id'];
    public $timestamps = false;
}

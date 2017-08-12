<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'users', 'middleware' => 'jwt.auth'], function() {
    Route::patch('{id}', 'UserController@update');
});
Route::get('profile', 'ProfileController@index');

// auth
Route::post('auth/login', 'AuthenticateController@login');
Route::post('auth/register', 'RegisterController@register');
Route::get('authenticate', 'AuthenticateController@authenticate');
Route::get('auth/logout', 'AuthenticateController@logout');

// score
Route::group(['prefix' => 'score', 'middleware' => 'jwt.auth'], function() {
    Route::get('{type}', 'ScoreController@index');
    Route::post('/', 'ScoreController@save');
});

// captcha
Route::get('captcha', 'CaptchaController@index');

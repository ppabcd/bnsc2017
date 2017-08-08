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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'users', 'middleware' => 'jwt.auth'], function() {
    Route::get('{id}', 'UserController@index');
    Route::patch('{id}', 'UserController@update');
});

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
Route::post('captcha/validate', 'CaptchaController@validate');
<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;

use App\User;

use JWTAuth;

class RegisterController extends Controller
{
    private $user;

    public function __construct(User $user) {
        $this->user = $user;
    }

    public function register(RegisterRequest $request) {
        $file = $request->file('profile_picture');
        $path = $file->store('avatars');

        $params = [
            'name' => $request['name'],
            'username' => $request['username'],
            'email' => $request['email'],
            'password' => bcrypt($request['password']),
            'date_of_birth' => $request['date_of_birth'],
            'phone_number' => $request['phone_number'],
            'profile_picture' => $path
        ];

        try {
            $user = $this->user->create($params);
        } catch(\Exception $e) {
            return response()->json(['error' => 'could_not_create_user'], 500);
        }

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'apiVersion' => "1.0",
            'data' => [
                'token' => $token
            ]
        ], 200);
    }
}

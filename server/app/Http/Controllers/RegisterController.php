<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;

use App\User;

use JWTAuth;
use File;

use App\Services\Base64;
use App\Services\CaptchaService;

class RegisterController extends Controller
{
    private $user;
    private $base64;
    private $captchaService;

    public function __construct(User $user, Base64 $base64, CaptchaService $captchaService) {
        $this->user = $user;
        $this->base64 = $base64;
        $this->captchaService = $captchaService;
    }

    public function register(RegisterRequest $request) {
        $captcha = $request['captcha'];
        if($this->captchaService->validate($captcha['data'], $captcha['captcha'])) {
            // upload image
            $image = $this->base64->convertToImage($request['profile_picture']);

            $imagePath = "avatars/" . $image['name'];

            File::put($imagePath, $image['image']);

            $params = [
                'name' => $request['name'],
                'username' => $request['username'],
                'email' => $request['email'],
                'password' => bcrypt($request['password']),
                'date_of_birth' => $request['date_of_birth'],
                'phone_number' => $request['phone_number'],
                'profile_picture' => $imagePath
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
        }else {
            return response()->json([
                'apiVersion' => "1.0",
                'data' => [
                    'message' => 'Captcha invalid'
                ]
            ], 400);
        }
    }
}

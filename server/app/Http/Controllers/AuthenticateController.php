<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;

use App\Services\CaptchaService;
use JWTAuth;

class AuthenticateController extends Controller
{
    private $captchaService;

    public function __construct(CaptchaService $captchaService) {
        $this->captchaService = $captchaService;
    }
    public function login(LoginRequest $request) {
        $captcha = $request['captcha'];

        if($this->captchaService->validate($captcha['data'], $captcha['captcha'])) {

            $credentials = $request->only('email', 'password');

            try {
                if(! $token = JWTAuth::attempt($credentials)) {
                    return response()->json(['error' => 'invalid_credentials'], 401);
                }
            } catch (JWTException $e) {
                return response()->json(['error' => 'could_not_create_token'], 500);
            }

            return response()->json([
                'apiVersion' => '1.0',
                'data' => [
                    'token' => $token
                ]
            ], 200);
        }else {
            return response()->json([
                'apiVersion' => '1.0',
                'data' => [
                    'message' => 'Invalid captcha'
                ]
            ], 400);
        }
    }

    public function logout() {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'Logged out.']);
    }

    public function authenticate() {
        try {
            if(! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (\Tymon\JWTAuth\Exceptions\JWTExcpetion $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }

        return response()->json(['authenticated' => true], 200);
    }
}
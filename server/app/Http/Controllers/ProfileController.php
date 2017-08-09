<?php

namespace App\Http\Controllers;

use JWTAuth;

class ProfileController extends Controller
{
    public function index() {
        $user = JWTAuth::parseToken()->toUser();

        return response()->json([
            'apiVersion' => '1.0',
            'data' => [
                'image_path' => asset('/'),
                'user' => $user
            ]
        ], 200);
    }
}

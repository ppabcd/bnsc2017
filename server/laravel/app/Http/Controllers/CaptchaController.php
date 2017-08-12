<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Captcha;

class CaptchaController extends Controller
{
    private $captcha;

    public function __construct(Captcha $captcha) {
        $this->captcha = $captcha;
    }

    public function index() {
        $captcha = $this->captcha->inRandomOrder()->first();

        return response()->json([
            'apiVersion' => '1.0',
            'data' => [
                'captcha' => $captcha,
            ]
        ], 200);
    }
}

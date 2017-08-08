<?php

namespace App\Services;

use App\Models\Captcha;

class CaptchaService
{
    private $captcha;

    public function __construct(Captcha $captcha) {
        $this->captcha = $captcha;
    }

    public function validate($id, $captcha) {
        $captchaDatabase = $this->captcha->find($id);

        if($captchaDatabase['captcha'] == $captcha) {
            return true;
        }

        return false;
    }
}
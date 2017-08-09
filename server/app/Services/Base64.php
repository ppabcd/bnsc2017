<?php

namespace App\Services;

class Base64
{
    public function convertToImage($picture) {
        $base64_str = substr($picture, strpos($picture, ",") +1);
        $image = base64_decode($base64_str);
        $imageName = uniqid() . ".jpg";

        return [
            'image' => $image,
            'name' => $imageName
        ];
    }
}
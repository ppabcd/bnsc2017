<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\User;

class UserController extends Controller
{
    private $user;

    public function __construct(User $user) {
        $this->user = $user;
    }

    public function index($id) {
        $user = $this->user->find($id);

        return response()->json([
            'apiVersion' => '1.0',
            'data' => [
                'storage_path' => storage_path(),
                'user' => $user
            ]
        ], 200);
    }

    public function update($id) {

    }
}

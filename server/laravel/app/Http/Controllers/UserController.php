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

    public function update(Request $request, $id) {
        $user = $this->user->find($id);

        return $request->except("_token");

        $user->fill([
            'username' => $request['username'],
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password']),
            'date_of_birth' => $request['date_of_birth'],
            'phone_number' => $request['phone_number'],
        ]);
        $user->save();

        return response()->json([
            'apiVersion' => "1.0",
            'data' => [
                'user' => $user,
                'message' => 'User data has been updated'
            ]
        ], 200);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\ScoreRequest;

use App\Models\Score;

use JWTAuth;

class ScoreController extends Controller
{
    private $score;

    public function __construct(Score $score) {
        $this->score = $score;
    }

    public function index($type) {
        $highScores = $this->score->where('type','=', $type)
                                  ->orderBy('score', 'DESC')
                                  ->limit(10)
                                  ->get();

        return response()->json([
            'apiVersion' => '1.0',
            'data' => [
                'items' => $highScores
            ]
        ], 200);
    }

    public function save(ScoreRequest $request) {
        $user = JWTAuth::parseToken()->toUser();

        $params = [
            'score' => $request['score'],
            'type' => $request['type'],
            'user_id' => $user['id']
        ];
        $this->score->create($params);

        return response()->json(['message' => 'Your score has been saved'], 200);
    }
}

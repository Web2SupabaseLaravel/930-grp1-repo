<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Question;

class QuestionController extends Controller
{
    // CREATE
   public function store(Request $request)
{
    $validated = $request->validate([
        'course_id' => 'required|uuid',
        'lesson_id' => 'required|uuid',
        'quiz_id' => 'required|uuid',
        'question' => 'required|string',
        'choice_1' => 'required|string',
        'choice_2' => 'required|string',
        'choice_3' => 'required|string',
        'choice_4' => 'required|string',
        'answer' => 'required|string',
        'mark' => 'required|integer',
    ]);

    try {
        $question = Question::create($validated);
        return response()->json($question, 201);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

    // READ
    public function index()
    {
       $questions= Question::all();
        return response()->json($questions, 200);
    }


    // UPDATE
    public function update(Request $request, $id)
    {
        $question = Question::findOrFail($id);
        $question->update($request->only([
            'course_id', 'lesson_id', 'quiz_id', 'question',
            'choice_1', 'choice_2', 'choice_3', 'choice_4',
            'answer', 'mark'
        ]));

        return response()->json($question,200);
    }
  // GET /Question/{id}
    public function show ($id)
    {
        $question = Question::findOrFail($id);
        return response()->json($question,200);
    }
    // DELETE
    public function destroy($id)
    {
        $question = Question::findOrFail($id);
        $question->delete();
        return response()->json(null,204);
    }
}
//['message' => 'Deleted']

<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class QuizController extends Controller
{
    // GET /quizzes
    public function index()
    {
        $quizzes = Quiz::all(); // Fixed variable name
        return response()->json($quizzes, 200);
    }

    // POST /quizzes
    public function store(Request $request)
    {

        $validated = $request->validate([
            'course_id' => 'required|uuid',
            'lesson_id' => 'required|uuid',
            'total_marks' => 'required|integer',
            'passing_marks' => 'required|integer',
        ]);
// For debugging, use one of these instead:
error_log(json_encode($validated)); // Logs to error log
// or
\Log::info('Validated data:', $validated); // Laravel logging

        $quiz = Quiz::create([
            'quiz_id' => (string) Str::uuid(), // Optional: manually set UUID if not using model boot method
            'course_id' => $validated['course_id'],
            'lesson_id' => $validated['lesson_id'],
            'total_marks' => $validated['total_marks'],
            'passing_marks' => $validated['passing_marks'],
            'created_at' => now(),
        ]);

        return response()->json($quiz, 201);
    }

    // GET /quizzes/{id}
    public function show($id)
    {
        $quiz = Quiz::findOrFail($id);
        return response()->json($quiz,200);
    }

    // PUT /quizzes/{id}
    public function update(Request $request, $id)
    {
        $quiz = Quiz::findOrFail($id);

        $validated = $request->validate([
            'course_id' => 'sometimes|uuid',
            'lesson_id' => 'sometimes|uuid',
            'total_marks' => 'sometimes|integer',
            'passing_marks' => 'sometimes|integer',
        ]);

        $quiz->update($validated);

        return response()->json($quiz, 200);
    }

    // DELETE /quizzes/{id}
    public function destroy($id)
    {
        $quiz = Quiz::findOrFail($id);
        $quiz->delete();

        return response()->json(null, 204);
    }
}

<!DOCTYPE html>
<html>
<head><title>Lesson Details</title></head>
<body>

    <h1>{{ $lesson->title }}</h1>

    <p>Type: {{ $lesson->content_type }}</p>
    <p>URL: <a href="{{ $lesson->content_url }}">{{ $lesson->content_url }}</a></p>


    <form method="POST" action="{{ url('/storelessons') }}">
        @csrf
        <input type="hidden" name="lesson_id" value="{{ $lesson->lesson_id }}">
        <input type="hidden" name="course_id" value="{{ $lesson->course_id }}">
        <button type="submit">Mark as Completed</button>
    </form>

    <p><a href="{{ url('/course/'.$lesson->course_id.'/lessons') }}">⬅ Back to Lessons</a></p>

    @if($prev)
        <a href="{{ url('/lesson/'.$prev->lesson_id.'/'.$prev->course_id) }}">← Previous</a>
    @endif

    @if($next)
        <a href="{{ url('/lesson/'.$next->lesson_id.'/'.$next->course_id) }}" style="margin-left: 20px;">Next →</a>
    @endif

</body>
</html>

<!DOCTYPE html>
<html>
<head>
    <title>Course Lessons</title>
</head>
<body>

    <h1>Lessons for Course: {{ $course_id }}</h1>

    <p>Progress: {{ $progress }}%</p>

    <ul>
        @foreach($lessons as $lesson)
            <li>
                {{ $lesson->title }}

                @if(in_array($lesson->lesson_id, $completedLessons))
                    ( Completed)
                @endif

                <a href="{{ url('/lesson/' . $lesson->lesson_id . '/' . $course_id) }}">View</a>
            </li>
        @endforeach
    </ul>

</body>
</html>

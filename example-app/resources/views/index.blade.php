@extends('layouts.app')

@section('content')
<div class="container mt-5">
    <h2 class="mb-4">الدروس الخاصة بالكورس: {{ $course->title }}</h2>

    @if ($lessons->isEmpty())
        <div class="alert alert-warning">
            لا توجد دروس بعد لهذا الكورس.
        </div>
    @else
        <ul class="list-group">
            @foreach ($lessons as $lesson)
                <li class="list-group-item">
                    <h5>{{ $lesson->order_number }}. {{ $lesson->title }}</h5>
                    <p>النوع: {{ $lesson->content_type ?? 'غير محدد' }}</p>
                    @if ($lesson->content_url)
                        <a href="{{ $lesson->content_url }}" class="btn btn-sm btn-outline-primary" target="_blank">عرض المحتوى</a>
                    @endif
                </li>
            @endforeach
        </ul>
    @endif
</div>
@endsection

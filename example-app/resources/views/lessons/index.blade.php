@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Course lessons : {{ $course->title }}</h1>

    <a href="{{ url()->previous() }}" class="btn btn-secondary mb-3">back</a>

    @if($lessons->isEmpty())
        <div class="alert alert-info">no more lessons</div>
    @else
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Number</th>
                    <th>Title</th>
                    <th>Type </th>
                    <th>Link </th>
                    <th>Ordering</th>
                    <th>Made at </th>
                </tr>
            </thead>
            <tbody>
                @foreach($lessons as $index => $lesson)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $lesson->title }}</td>
                        <td>{{ $lesson->content_type ?? ' not defined' }}</td>
                        <td>
                            @if($lesson->content_url)
                                <a href="{{ $lesson->content_url }}" target="_blank">View</a>
                            @else
                                -
                            @endif
                        </td>
                        <td>{{ $lesson->order_number ?? '-' }}</td>
                        <td>{{ $lesson->created_at->format('Y-m-d') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif
</div>
@endsection
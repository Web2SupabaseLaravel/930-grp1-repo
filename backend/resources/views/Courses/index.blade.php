@extends('layouts.app')

@section('content')
<div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="text-dark fw-bold">Relevant Courses :</h2>
        <a href="{{ route('courses.create') }}" class="btn btn-outline-dark" style="width: 50px; height: 50px; font-size: 24px; display: flex; align-items: center; justify-content: center; border-radius: 5px; border-width: 2px;">
            <i class="fas fa-plus"></i>
        </a>
    </div>

    <hr class="my-3">

    @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            {{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    @endif

    @foreach($courses as $course)
        <div class="card mb-3 shadow-sm">
            <div class="card-body p-4">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h4 class="mb-1 fw-bold">{{ $course->title }}</h4>
                        <p class="text-muted mb-0 small">{{ $course->learning_objectives }}</p>
                    </div>
                    <div class="col-md-6 text-end">
                        <a href="{{ route('courses.create') }}" class="btn btn-success rounded-pill px-4">Add</a>
                        <a href="{{ route('courses.edit', $course->id) }}" class="btn btn-primary rounded-pill px-4">Update</a>
                        <form action="{{ route('courses.destroy', $course->id) }}" method="POST" class="d-inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger rounded-pill px-4" onclick="return confirm('Are you sure you want to delete this course?')">Delete</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    @endforeach

    @if(count($courses) == 0)
        <div class="text-center py-5">
            <p class="lead text-muted">No courses available.</p>
            <a href="{{ route('courses.create') }}" class="btn btn-success rounded-pill px-4">Add Your First Course</a>
        </div>
    @endif
</div>

<style>
    .btn-success {
        background-color: #4CAF50;
        border-color: #4CAF50;
    }

    .btn-primary {
        background-color: #2d3b55;
        border-color: #2d3b55;
    }

    .btn-danger {
        background-color: #F44336;
        border-color: #F44336;
    }

    .card {
        border-radius: 8px;
        border: none;
        background-color: #f8f9fa;
    }

    hr {
        margin-top: 0;
        margin-bottom: 20px;
        opacity: 0.2;
    }

    .btn {
        font-weight: 500;
        padding: 8px 16px;
    }
</style>
@endsection

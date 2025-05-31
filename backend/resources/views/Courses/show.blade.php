@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card shadow-sm">
                <div class="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h4 class="mb-0">Course Details</h4>
                    <div>
                        <a href="{{ route('courses.edit', $course->id) }}" class="btn btn-primary btn-sm rounded-pill px-3">Edit</a>
                        <a href="{{ route('courses.index') }}" class="btn btn-secondary btn-sm rounded-pill px-3">Back to List</a>
                    </div>
                </div>

                <div class="card-body p-4">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <h5 class="text-primary">Course Title</h5>
                            <p>{{ $course->title }}</p>
                        </div>
                        <div class="col-md-6">
                            <h5 class="text-primary">Instructor</h5>
                            <p>{{ $course->instructor->name ?? 'N/A' }}</p>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <h5 class="text-primary">Category</h5>
                            <p>{{ $course->catagory }}</p>
                        </div>
                        <div class="col-md-6">
                            <h5 class="text-primary">Price</h5>
                            <p>${{ number_format($course->price, 2) }}</p>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-12">
                            <h5 class="text-primary">Learning Objectives</h5>
                            <p>{{ $course->learning_objectives }}</p>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-12">
                            <h5 class="text-primary">Description</h5>
                            <p>{{ $course->description }}</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <h5 class="text-primary">Created At</h5>
                            <p>{{ $course->created_at->format('M d, Y H:i') }}</p>
                        </div>
                        <div class="col-md-6">
                            <h5 class="text-primary">Last Updated</h5>
                            <p>{{ $course->updated_at->format('M d, Y H:i') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-10">
            <div class="card shadow-sm">
                <div class="card-header bg-white py-3">
                    <h4 class="mb-0">{{ isset($course) ? 'Edit Course' : 'Add Course' }}</h4>
                </div>

                <div class="card-body p-4">
                    <form method="POST" action="{{ isset($course) ? route('courses.update', $course->id) : route('courses.store') }}">
                        @csrf
                        @if(isset($course))
                            @method('PUT')
                        @endif

                        <div class="row mb-4">
                            <!-- Course Title -->
                            <div class="col-md-6">
                                <label for="title" class="text-primary fw-bold mb-2">Course Title:</label>
                                <input id="title" type="text" class="form-control @error('title') is-invalid @enderror" name="title" value="{{ $course->title ?? old('title') }}" placeholder="Data structure" required>
                                @error('title')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>

                            <!-- Instructor ID as Text Input -->
                            <div class="col-md-6">
                                <label for="instructor_id" class="text-primary fw-bold mb-2">Instructor ID:</label>
                                <input id="instructor_id" type="text"
                                    class="form-control @error('instructor_id') is-invalid @enderror"
                                    name="instructor_id"
                                    value="{{ $course->instructor_id ?? old('instructor_id') ?? auth()->id() }}"
                                    placeholder="Enter Instructor ID" required>
                                @error('instructor_id')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-4">
                            <!-- Course Duration -->
                            <div class="col-md-6">
                                <label for="duration" class="text-primary fw-bold mb-2">Course duration:</label>
                                <div class="input-group">
                                    <input id="duration" type="text" class="form-control" placeholder="In months" value="{{ old('duration') }}">
                                    <div class="input-group-append">
                                        <span class="input-group-text bg-light px-3">
                                            <i class="fas fa-chevron-up" id="duration-up"></i>
                                            <i class="fas fa-chevron-down" id="duration-down"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Price -->
                            <div class="col-md-6">
                                <label for="price" class="text-primary fw-bold mb-2">Price:</label>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">$</span>
                                    </div>
                                    <input id="price" type="number" class="form-control @error('price') is-invalid @enderror" name="price" value="{{ $course->price ?? old('price') }}" placeholder="150" required min="0" step="0.01">
                                    @error('price')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <!-- Category -->
                            <div class="col-md-6">
                                <label for="catagory" class="text-primary fw-bold mb-2">Category:</label>
                                <input id="catagory" type="text" class="form-control @error('catagory') is-invalid @enderror" name="catagory" value="{{ $course->catagory ?? old('catagory') }}" placeholder="Data Science" required>
                                @error('catagory')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>

                            <!-- Learning Objectives -->
                            <div class="col-md-6">
                                <label for="learning_objectives" class="text-primary fw-bold mb-2">Learning Objectives:</label>
                                <textarea id="learning_objectives" class="form-control @error('learning_objectives') is-invalid @enderror" name="learning_objectives" placeholder="Learn key data structures (arrays, stacks, queues, trees)." required>{{ $course->learning_objectives ?? old('learning_objectives') }}</textarea>
                                @error('learning_objectives')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-4">
                            <!-- Course Description -->
                            <div class="col-md-12">
                                <label for="description" class="text-primary fw-bold mb-2">Course description:</label>
                                <textarea id="description" class="form-control @error('description') is-invalid @enderror" name="description" rows="4" placeholder="This course introduces students to fundamental data structures used in computer science..." required>{{ $course->description ?? old('description') }}</textarea>
                                @error('description')
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                        </div>

                        <div class="row mb-0">
                            <div class="col-md-12 text-center">
                                <button type="submit" class="btn btn-primary px-5 py-2 rounded-pill">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Duration increment/decrement buttons
        document.getElementById('duration-up').addEventListener('click', function() {
            const durationInput = document.getElementById('duration');
            if (durationInput.value === '') {
                durationInput.value = 1;
            } else {
                durationInput.value = parseInt(durationInput.value) + 1;
            }
        });

        document.getElementById('duration-down').addEventListener('click', function() {
            const durationInput = document.getElementById('duration');
            if (durationInput.value > 1) {
                durationInput.value = parseInt(durationInput.value) - 1;
            }
        });
    });
</script>
@endsection

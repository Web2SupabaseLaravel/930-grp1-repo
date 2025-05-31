<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->uuid('id')->primary(); // UUID بدل من id() العادي
            $table->string('title');
            $table->string('catagory');
            $table->text('description');
            $table->decimal('price', 8, 2);
            $table->uuid('instructor_id'); // UUID من جدول users
            $table->text('learning_objectives');
            $table->uuid('managed_by'); // UUID للمدير

            $table->timestamps();

            // العلاقات
            $table->foreign('instructor_id')->references('id')->on('instructor')->onDelete('cascade');
            $table->foreign('managed_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};

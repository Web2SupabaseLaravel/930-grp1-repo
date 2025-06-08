<?php

$database_path = __DIR__ . '/database.sqlite';

// Create or connect to the SQLite database
$pdo = new PDO('sqlite:' . $database_path);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Drop tables if they exist
$pdo->exec('DROP TABLE IF EXISTS lessons');
$pdo->exec('DROP TABLE IF EXISTS courses');

// Create courses table
$pdo->exec('
CREATE TABLE courses (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)');

// Create lessons table
$pdo->exec('
CREATE TABLE lessons (
    lesson_id VARCHAR(36) PRIMARY KEY,
    course_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content_type VARCHAR(50) DEFAULT "text",
    content_url TEXT,
    order_number INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id)
)');

// Insert all courses from Supabase
$pdo->exec("
INSERT INTO courses (id, title, description) VALUES
('f2849c27-30f5-40b4-9cdd-87521090bdbb', 'Course_5', 'Web Development Course'),
('ed2a9535-bfaa-44c0-b574-5adb62275dda', 'Course_2', 'Course 2 Description'),
('02f9a3e4-24aa-4670-a53a-8888cfd6618a', 'Course_4', 'Course 4 Description'),
('be203a34-34d2-4692-b207-d6a2f39faeda', 'Course_1', 'Course 1 Description'),
('2751ebab-33b9-4953-9cc6-678bf31fc15a', 'Course_3', 'Course 3 Description')
");

// Insert all the actual lesson data from Supabase
$pdo->exec("
INSERT INTO lessons (lesson_id, course_id, title, content_type, content_url, order_number, created_at) VALUES
('2161a4f8-cb1d-4182-b8b4-9a634a15105e', 'f2849c27-30f5-40b4-9cdd-87521090bdbb', 'Lesson 2 for Course_5', 'article', 'http://example.com/lesson_2_f2849c27-30f5-40b4-9cdd-87521090bdbb', 2, '2025-04-28 12:46:37.956248'),
('43664f7f-49f8-4cb5-b821-509998d08315', 'ed2a9535-bfaa-44c0-b574-5adb62275dda', 'Lesson 1 for Course_2', 'article', 'http://example.com/lesson_1_ed2a9535-bfaa-44c0-b574-5adb62275dda', 1, '2025-04-28 12:46:37.956177'),
('5b6dc6cc-1121-4175-84ab-5ae41250c384', '02f9a3e4-24aa-4670-a53a-8888cfd6618a', 'Lesson 2 for Course_4', 'video', 'http://example.com/lesson_2_02f9a3e4-24aa-4670-a53a-8888cfd6618a', 2, '2025-04-28 12:46:37.956221'),
('5d5ce40f-e004-4ad1-b8df-303226b47b00', 'be203a34-34d2-4692-b207-d6a2f39faeda', 'Lesson 1 for Course_1', 'video', 'http://example.com/lesson_1_be203a34-34d2-4692-b207-d6a2f39faeda', 1, '2025-04-28 12:46:37.956123'),
('68282a44-7106-4efe-be7f-2ccef2a7b59e', '02f9a3e4-24aa-4670-a53a-8888cfd6618a', 'Lesson 1 for Course_4', 'article', 'http://example.com/lesson_1_02f9a3e4-24aa-4670-a53a-8888cfd6618a', 1, '2025-04-28 12:46:37.956213'),
('6fded871-3a25-433c-a094-e97d93e8dc83', 'f2849c27-30f5-40b4-9cdd-87521090bdbb', 'Lesson 1 for Course_5', 'video', 'http://example.com/lesson_1_f2849c27-30f5-40b4-9cdd-87521090bdbb', 1, '2025-04-28 12:46:37.95624'),
('a9a6e31a-227c-4ccd-89e5-0bc4c748b799', '2751ebab-33b9-4953-9cc6-678bf31fc15a', 'Lesson 1 for Course_3', 'article', 'http://example.com/lesson_1_2751ebab-33b9-4953-9cc6-678bf31fc15a', 1, '2025-04-28 12:46:37.956194'),
('d066e085-d86f-4a8f-843a-6f81c79a6e7f', '02f9a3e4-24aa-4670-a53a-8888cfd6618a', 'fsdf', 'fsdf', 'fsdf', 4532, '2025-05-23 23:30:56'),
('d4c77066-a6ac-4369-9ec8-60dffd15a6f4', 'ed2a9535-bfaa-44c0-b574-5adb62275dda', 'Lesson 2 for Course_2', 'article', 'http://example.com/lesson_2_ed2a9535-bfaa-44c0-b574-5adb62275dda', 2, '2025-04-28 12:46:37.956185'),
('e6a7757e-80f1-4fd4-8fed-2cddd55248cf', '2751ebab-33b9-4953-9cc6-678bf31fc15a', 'Lesson 2 for Course_3', 'article', 'http://example.com/lesson_2_2751ebab-33b9-4953-9cc6-678bf31fc15a', 2, '2025-04-28 12:46:37.956204'),
('eaee114f-3d39-4f02-8d6c-16cc0c7c428c', 'be203a34-34d2-4692-b207-d6a2f39faeda', 'Lesson 2 for Course_1', 'article', 'http://example.com/lesson_2_be203a34-34d2-4692-b207-d6a2f39faeda', 2, '2025-04-28 12:46:37.956157')
");

echo "Database initialized with actual Supabase data successfully!";

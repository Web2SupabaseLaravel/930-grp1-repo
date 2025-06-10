-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
    lesson_id VARCHAR(36) PRIMARY KEY,
    course_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content_type VARCHAR(50) DEFAULT 'text',
    content_url TEXT,
    order_number INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Insert test course
INSERT INTO courses (id, title, description) 
VALUES ('f2849c27-30f5-40b4-9cdd-87521090bdbb', 'Course_5', 'Web Development Course');

-- Insert sample lessons
INSERT INTO lessons (lesson_id, course_id, title, content_type, content_url, order_number) 
VALUES 
('1e5b9a47-8c14-48e2-9fa3-3d5d6f3bbc71', 'f2849c27-30f5-40b4-9cdd-87521090bdbb', 'Introduction to HTML', 'text', '', 1),
('2f6c8b59-9d25-59f3-0gb4-4e6e7f4ccd82', 'f2849c27-30f5-40b4-9cdd-87521090bdbb', 'CSS Basics', 'text', '', 2),
('3g7d9c60-0e36-60g4-1hc5-5f7f8g5dde93', 'f2849c27-30f5-40b4-9cdd-87521090bdbb', 'JavaScript Fundamentals', 'text', '', 3);

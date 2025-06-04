import React, { useState, useEffect } from 'react';
import CourseService from '../../services/CourseService';
import Message from './Message';
import '../../App.css';


const navigateTo = (path) => {
    console.log(`Navigating to ${path}`);
    //useNavigate() from react-router-dom
    //navigate(path);
};

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: null, type: 'info' });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setLoading(true);
        setMessage({ text: null, type: 'info' });
        try {
            const response = await CourseService.getAllCourses();
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
            setMessage({ text: 'Failed to load courses.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await CourseService.deleteCourse(id);
                setMessage({ text: 'Course deleted successfully.', type: 'success' });
                // Refresh the list after deletion
                fetchCourses();
            } catch (error) {
                console.error("Error deleting course:", error);
                setMessage({ text: 'Failed to delete course.', type: 'error' });
            }
        }
    };

    // Placeholder functions for Add/Update navigation
    const handleAddClick = () => {
        navigateTo('/courses/new'); // Navigate to the form for adding
    };

    const handleUpdateClick = (id) => {
        navigateTo(`/courses/edit/${id}`); // Navigate to the form for editing
    };

    if (loading) {
        return <div>Loading courses...</div>;
    }

    return (
        <div className="course-list-container">
            <div className="list-header">
                <h2>Relevant Courses:</h2>
                <button onClick={handleAddClick} className="button-add-main">+</button>
            </div>
            <hr className="header-divider" />

            <Message message={message.text} type={message.type} />

            {courses.length === 0 && !loading && <p>No courses found.</p>}

            <ul className="course-list">
                {courses.map((course) => (
                    <li key={course.id} className="course-list-item">
                        <div className="course-info">
                            <h3>{course.title}</h3>
                            <p>{course.description}</p> {/* Or learning_objectives*/}
                        </div>
                        <div className="course-actions">
                            {/* Add buttons*/}
                            <button onClick={() => console.log('Add action for:', course.id)} className="button button-add">Add</button>
                            <button onClick={() => handleUpdateClick(course.id)} className="button button-update">Update</button>
                            <button onClick={() => handleDelete(course.id)} className="button button-delete">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseList;


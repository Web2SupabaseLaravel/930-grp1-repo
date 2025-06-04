import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import CourseService from '../../services/CourseService';
import Message from './Message';
import '../../App.css'; 

const CourseDetail = () => {
    const { id: courseId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ text: null, type: 'info' });

    useEffect(() => {
        setLoading(true);
        setMessage({ text: null, type: 'info' });
        CourseService.getCourseById(courseId)
            .then(response => {
                setCourse(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching course details:", error);
                setMessage({ text: 'Failed to load course details.', type: 'error' });
                setLoading(false);
            });
    }, [courseId]);

    if (loading) {
        return <div>Loading course details...</div>;
    }

    if (message.text && message.type === 'error') {
        return <Message message={message.text} type={message.type} />;
    }

    if (!course) {
        return <div>Course not found.</div>; 
    }

    const displayPrice = typeof course.price === 'number' 
        ? `$${course.price.toFixed(2)}` 
        : (course.price ? `$${course.price}` : 'N/A');

    return (
        <div className="course-detail-container">
            {/* Title TODO*/}
            {/* <h2 className="detail-title">Course Details</h2> */}
            
            <Message message={message.text} type={message.type} />

            <div className="detail-grid">
                <div className="detail-item">
                    <label>Course Title:</label>
                    <p>{course.title || 'N/A'}</p>
                </div>
                <div className="detail-item">
                    <label>Instructor ID:</label>
                    <p>{course.instructor_id || 'N/A'}</p>
                </div>
                <div className="detail-item">
                    <label>Category:</label> 
                    <p>{course.catagory || 'N/A'}</p>
                </div>
                <div className="detail-item">
                    <label>Price:</label>
                    <p>{displayPrice}</p>
                </div>
                <div className="detail-item detail-item-full">
                    <label>Learning Objectives:</label>
                    <p>{course.learning_objectives || 'N/A'}</p>
                </div>
                <div className="detail-item detail-item-full">
                    <label>Course Description:</label>
                    <p>{course.description || 'N/A'}</p>
                </div>
            </div>

            <div className="detail-actions">
                 <button onClick={() => navigate('/courses')} className="button button-secondary">Back to List</button>
                 {/* TODO: Add Edit button */}
                 {/* <button onClick={() => navigate(`/courses/edit/${course.id}`)} className="button button-update">Edit</button> */}
            </div>
        </div>
    );
};

export default CourseDetail;


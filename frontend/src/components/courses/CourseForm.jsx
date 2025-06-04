import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Assuming React Router for ID and navigation
import CourseService from '../../services/CourseService';
import Message from './Message';
import '../../App.css';
const CourseForm = () => {
    // Get course ID from URL parameters if editing
    const { id: courseId } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(courseId);

    const [formData, setFormData] = useState({
        title: '',
        instructor_id: '', 
        catagory: '', 
        price: '',
        learning_objectives: '',
        description: ''
    });
    const [message, setMessage] = useState({ text: null, type: 'info' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing) {
            setLoading(true);
            CourseService.getCourseById(courseId)
                .then(response => {
                    const courseData = { ...response.data, price: String(response.data.price) }; 
                    setFormData(courseData);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching course details:", error);
                    setMessage({ text: 'Failed to load course data for editing.', type: 'error' });
                    setLoading(false);
                });
        }
    }, [courseId, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: null, type: 'info' });
        setErrors({});

        const dataToSend = { ...formData, price: parseFloat(formData.price) };

        try {
            let response;
            if (isEditing) {
                response = await CourseService.updateCourse(courseId, dataToSend);
                setMessage({ text: response.data.message || 'Course updated successfully!', type: 'success' });
            } else {
                response = await CourseService.createCourse(dataToSend);
                setMessage({ text: response.data.message || 'Course created successfully!', type: 'success' });
            }
            setTimeout(() => navigate('/courses'), 1500); 

        } catch (error) {
            console.error("Error submitting form:", error);
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
                setMessage({ text: 'Please fix the errors below.', type: 'error' });
            } else {
                setMessage({ text: `An error occurred: ${error.message || 'Please try again.'}`, type: 'error' });
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditing) {
        return <div>Loading course details...</div>;
    }

    return (
        <div className="course-form-container">
            <h2 className="form-title">{isEditing ? 'Edit Course' : 'Add New Course'}</h2>
            <Message message={message.text} type={message.type} />

            <form onSubmit={handleSubmit} className="course-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="title">Course Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter course title"
                            className={errors.title ? 'input-error' : ''}
                        />
                        {errors.title && <span className="error-text">{errors.title[0]}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="instructor_id">Instructor ID:</label>
                        <input
                            type="text"
                            id="instructor_id"
                            name="instructor_id"
                            value={formData.instructor_id}
                            onChange={handleChange}
                            placeholder="Enter instructor UUID"
                            className={errors.instructor_id ? 'input-error' : ''}
                        />
                        {errors.instructor_id && <span className="error-text">{errors.instructor_id[0]}</span>}
                    </div>
                </div>


                <div className="form-row">
                     <div className="form-group">
                        <label htmlFor="catagory">Category:</label> 
                        <input
                            type="text"
                            id="catagory"
                            name="catagory"
                            value={formData.catagory}
                            onChange={handleChange}
                            placeholder="e.g., Data Science, Web Development"
                            className={errors.catagory ? 'input-error' : ''}
                        />
                        {errors.catagory && <span className="error-text">{errors.catagory[0]}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="e.g., 150"
                            step="0.01" 
                            min="0"
                            className={errors.price ? 'input-error' : ''}
                        />
                         {errors.price && <span className="error-text">{errors.price[0]}</span>}
                    </div>
                </div>

                <div className="form-group form-group-full">
                    <label htmlFor="learning_objectives">Learning Objectives:</label>
                    <textarea
                        id="learning_objectives"
                        name="learning_objectives"
                        value={formData.learning_objectives}
                        onChange={handleChange}
                        placeholder="List key learning objectives"
                        rows="4"
                        className={errors.learning_objectives ? 'input-error' : ''}
                    ></textarea>
                    {errors.learning_objectives && <span className="error-text">{errors.learning_objectives[0]}</span>}
                </div>

                <div className="form-group form-group-full">
                    <label htmlFor="description">Course Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Detailed course description"
                        rows="6"
                        className={errors.description ? 'input-error' : ''}
                    ></textarea>
                    {errors.description && <span className="error-text">{errors.description[0]}</span>}
                </div>

                <div className="form-actions">
                    <button type="submit" className="button button-submit" disabled={loading}>
                        {loading ? 'Submitting...' : (isEditing ? 'Update Course' : 'Add Course')}
                    </button>
                    <button type="button" className="button button-cancel" onClick={() => navigate('/courses')} disabled={loading}>
                        Cancel
                    </button> 
                </div>
            </form>
        </div>
    );
};

export default CourseForm;

// This code is a React component for a course form that can be used for both creating and editing courses.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageAlert from './MessageAlert';

const CourseDetails = ({ match }) => {
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const token = localStorage.getItem('token'); // Assuming token is stored here

  useEffect(() => {
    fetchCourse(match.params.id);
  }, [match.params.id]);

  const fetchCourse = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourse(response.data);
    } catch {
      setMessage({ text: 'Failed to fetch course details. Please ensure you are logged in.', type: 'error' });
    }
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="container" style={{ backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
      {message.text && <MessageAlert message={message} onClose={() => setMessage({ text: '', type: '' })} />}
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm">
            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h4 className="mb-0" style={{ color: '#2C3E50' }}>Course Details</h4>
              <div>
                <button
                  onClick={() => window.location.href = `/courses/create?edit=${course.id}`}
                  className="btn btn-primary btn-sm rounded-pill px-3"
                  style={{ backgroundColor: '#2C3E50', color: 'white', borderColor: '#2C3E50' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => window.location.href = '/courses'}
                  className="btn btn-secondary btn-sm rounded-pill px-3"
                  style={{ backgroundColor: '#7F8C8D', color: 'white', borderColor: '#7F8C8D' }}
                >
                  Back to List
                </button>
              </div>
            </div>
            <div className="card-body p-4">
              <div className="row mb-3">
                <div className="col-md-6">
                  <h5 className="text-primary" style={{ color: '#3498DB' }}>Course Title</h5>
                  <p style={{ color: '#2C3E50' }}>{course.title}</p>
                </div>
                <div className="col-md-6">
                  <h5 className="text-primary" style={{ color: '#3498DB' }}>Instructor</h5>
                  <p style={{ color: '#2C3E50' }}>{course.instructor_id ? course.instructor_id : 'N/A'}</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <h5 className="text-primary" style={{ color: '#3498DB' }}>Category</h5>
                  <p style={{ color: '#2C3E50' }}>{course.category}</p>
                </div>
                <div className="col-md-6">
                  <h5 className="text-primary" style={{ color: '#3498DB' }}>Price</h5>
                  <p style={{ color: '#2C3E50' }}>${parseFloat(course.price).toFixed(2)}</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <h5 className="text-primary" style={{ color: '#3498DB' }}>Learning Objectives</h5>
                  <p style={{ color: '#2C3E50' }}>{course.learning_objectives}</p>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-12">
                  <h5 className="text-primary" style={{ color: '#3498DB' }}>Description</h5>
                  <p style={{ color: '#2C3E50' }}>{course.description}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <h5 className="text-primary" style={{ color: '#3498DB' }}>Created At</h5>
                  <p style={{ color: '#2C3E50' }}>{new Date(course.created_at).toLocaleString()}</p>
                </div>
                <div className="col-md-6">
                  <h5 className="text-primary" style={{ color: '#3498DB' }}>Last Updated</h5>
                  <p style={{ color: '#2C3E50' }}>{new Date(course.updated_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
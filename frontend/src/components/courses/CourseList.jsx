import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MessageAlert from './MessageAlert';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState({ text: '', type: '' });
  const token = localStorage.getItem('token');

  const fetchCourses = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/courses', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data);
    } catch {
      setMessage({ text: 'Failed to fetch courses. Please ensure you are logged in.', type: 'error' });
    }
  }, [token]); // Dependencies: token, as it’s used inside

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(courses.filter(course => course.id !== id));
        setMessage({ text: 'Course deleted successfully', type: 'success' });
      } catch {
        setMessage({ text: 'Failed to delete course. Please check your permissions.', type: 'error' });
      }
    }
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
      {message.text && <MessageAlert message={message} onClose={() => setMessage({ text: '', type: '' })} />}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 style={{ color: '#2C3E50', fontWeight: 'bold' }}>Relevant Courses :</h2>
        <button
          onClick={() => window.location.href = '/courses/create'}
          className="btn"
          style={{ width: '50px', height: '50px', fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px', borderWidth: '2px', backgroundColor: '#27AE60', color: 'white', borderColor: '#27AE60' }}
        >
          +
        </button>
      </div>
      <hr className="my-3" style={{ opacity: 0.2 }} />
      {courses.length === 0 ? (
        <div className="text-center py-5">
          <p className="lead" style={{ color: '#7F8C8D' }}>No courses available.</p>
          <button
            onClick={() => window.location.href = '/courses/create'}
            className="btn rounded-pill px-4"
            style={{ backgroundColor: '#27AE60', color: 'white', borderColor: '#27AE60' }}
          >
            Add Your First Course
          </button>
        </div>
      ) : (
        courses.map((course) => (
          <div key={course.id} className="card mb-3 shadow-sm">
            <div className="card-body p-4">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h4 className="mb-1" style={{ color: '#2C3E50', fontWeight: 'bold' }}>{course.title}</h4>
                  <p className="text-muted mb-0 small" style={{ color: '#7F8C8D' }}>{course.learning_objectives}</p>
                </div>
                <div className="col-md-6 text-end">
                  <button
                    onClick={() => window.location.href = `/courses/create?edit=${course.id}`}
                    className="btn rounded-pill px-4 me-2"
                    style={{ backgroundColor: '#27AE60', color: 'white', borderColor: '#27AE60' }}
                  >
                    Add
                  </button>
                  <button
                    onClick={() => window.location.href = `/courses/create?edit=${course.id}`}
                    className="btn rounded-pill px-4 me-2"
                    style={{ backgroundColor: '#2C3E50', color: 'white', borderColor: '#2C3E50' }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="btn rounded-pill px-4"
                    style={{ backgroundColor: '#E74C3C', color: 'white', borderColor: '#E74C3C' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseList;
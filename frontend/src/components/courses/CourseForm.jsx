import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MessageAlert from './MessageAlert';

const CourseForm = () => {
  const [course, setCourse] = useState({
    title: '',
    instructor_id: '',
    duration: '',
    price: '',
    category: '',
    learning_objectives: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const token = localStorage.getItem('token'); // Assuming token is stored here

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    if (editId) {
      setIsEdit(true);
      setCourseId(editId);
      fetchCourse(editId);
    }
  }, []);

  const fetchCourse = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourse(response.data);
    } catch {
      setMessage({ text: 'Failed to fetch course details.', type: 'error' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://127.0.0.1:8000/api/courses/${courseId}`, course, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage({ text: 'Course updated successfully', type: 'success' });
      } else {
        await axios.post('http://127.0.0.1:8000/api/courses', course, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage({ text: 'Course created successfully', type: 'success' });
        setCourse({ title: '', instructor_id: '', duration: '', price: '', category: '', learning_objectives: '', description: '' });
      }
      setErrors({});
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setMessage({ text: 'An error occurred. Please ensure you are logged in.', type: 'error' });
      }
    }
  };

  return (
    <div className="container" style={{ backgroundColor: '#F8F9FA', minHeight: '100vh' }}>
      {message.text && <MessageAlert message={message} onClose={() => setMessage({ text: '', type: '' })} />}
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm">
            <div className="card-header bg-white py-3">
              <h4 className="mb-0" style={{ color: '#3498DB' }}>{isEdit ? 'Edit Course' : 'Add Course'}</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="title" className="text-primary fw-bold mb-2" style={{ color: '#3498DB' }}>Course Title:</label>
                    <input
                      id="title"
                      type="text"
                      className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                      name="title"
                      value={course.title}
                      onChange={handleChange}
                      placeholder="Data structure"
                      required
                    />
                    {errors.title && <div className="invalid-feedback" style={{ color: '#E74C3C' }}>{errors.title[0]}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="instructor_id" className="text-primary fw-bold mb-2" style={{ color: '#3498DB' }}>Instructor ID:</label>
                    <input
                      id="instructor_id"
                      type="text"
                      className={`form-control ${errors.instructor_id ? 'is-invalid' : ''}`}
                      name="instructor_id"
                      value={course.instructor_id}
                      onChange={handleChange}
                      placeholder="Enter Instructor ID"
                      required
                    />
                    {errors.instructor_id && <div className="invalid-feedback" style={{ color: '#E74C3C' }}>{errors.instructor_id[0]}</div>}
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="duration" className="text-primary fw-bold mb-2" style={{ color: '#3498DB' }}>Course duration:</label>
                    <input
                      id="duration"
                      type="number"
                      className="form-control"
                      name="duration"
                      value={course.duration}
                      onChange={handleChange}
                      placeholder="In months"
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="price" className="text-primary fw-bold mb-2" style={{ color: '#3498DB' }}>Price:</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" style={{ backgroundColor: '#F8F9FA', color: '#7F8C8D' }}>$</span>
                      </div>
                      <input
                        id="price"
                        type="number"
                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                        name="price"
                        value={course.price}
                        onChange={handleChange}
                        placeholder="150"
                        required
                        min="0"
                        step="0.01"
                      />
                      {errors.price && <div className="invalid-feedback" style={{ color: '#E74C3C' }}>{errors.price[0]}</div>}
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <label htmlFor="category" className="text-primary fw-bold mb-2" style={{ color: '#3498DB' }}>Category:</label>
                    <input
                      id="category"
                      type="text"
                      className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                      name="category"
                      value={course.category}
                      onChange={handleChange}
                      placeholder="Data Science"
                      required
                    />
                    {errors.category && <div className="invalid-feedback" style={{ color: '#E74C3C' }}>{errors.category[0]}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="learning_objectives" className="text-primary fw-bold mb-2" style={{ color: '#3498DB' }}>Learning Objectives:</label>
                    <textarea
                      id="learning_objectives"
                      className={`form-control ${errors.learning_objectives ? 'is-invalid' : ''}`}
                      name="learning_objectives"
                      value={course.learning_objectives}
                      onChange={handleChange}
                      placeholder="Learn key data structures (arrays, stacks, queues, trees)."
                      required
                    />
                    {errors.learning_objectives && <div className="invalid-feedback" style={{ color: '#E74C3C' }}>{errors.learning_objectives[0]}</div>}
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-12">
                    <label htmlFor="description" className="text-primary fw-bold mb-2" style={{ color: '#3498DB' }}>Course description:</label>
                    <textarea
                      id="description"
                      className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                      name="description"
                      value={course.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="This course introduces students to fundamental data structures used in computer science..."
                      required
                    />
                    {errors.description && <div className="invalid-feedback" style={{ color: '#E74C3C' }}>{errors.description[0]}</div>}
                  </div>
                </div>
                <div className="row mb-0">
                  <div className="col-md-12 text-center">
                    <button type="submit" className="btn px-5 py-2 rounded-pill" style={{ backgroundColor: '#3498DB', color: 'white', borderColor: '#3498DB' }}>
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
  );
};

export default CourseForm;
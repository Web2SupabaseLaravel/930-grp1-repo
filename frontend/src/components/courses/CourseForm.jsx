import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';    
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../API'; // Import the API instance
import { Link } from 'react-router-dom';
export default function CourseForm() {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleFileChange = (e) => {
    setCourse({ ...course, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(course).forEach(key => {
      formData.append(key, course[key]);
    });

    try {
      await api.post('/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/courses/list'); // Redirect to the course list after successful creation
    } catch (error) {
      console.error('Error creating course:', error);
      // Handle error (e.g., show a notification or alert)
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={course.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={course.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Duration</label>
          <input
            type="text"
            className="form-control"
            name="duration"
            value={course.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={course.price}
            onChange={handleChange}
            required
            />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Course</button>
        <Link to="/courses/list" className="btn btn-secondary ms-2">Back to Course List</Link>
        </form>
    </div>
  );
}
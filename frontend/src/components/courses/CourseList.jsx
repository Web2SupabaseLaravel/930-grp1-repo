import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../API'; // Import the API instance
import { Link } from 'react-router-dom';
export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of courses from the API
    api.get('/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      api.delete(`/courses/${id}`)
        .then(() => {
          setCourses(courses.filter(course => course.id !== id));
        })
        .catch(error => {
          console.error('Error deleting course:', error);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Course List</h2>
      <Link to="/courses/create" className="btn btn-primary mb-3">Create Course</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>{course.duration}</td>
              <td>{course.price}</td>
              <td><img src={course.image} alt={course.title} style={{ width: '100px' }} /></td>
              <td>
                <Link to={`/courses/edit/${course.id}`} className="btn btn-warning me-2">Edit</Link>
                <button onClick={() => handleDelete(course.id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

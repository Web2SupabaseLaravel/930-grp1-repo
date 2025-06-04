// import React from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import api from '../../API'; // Import the API instance
// import { Link } from 'react-router-dom';
// export default function CourseList() {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch the list of courses from the API
//     api.get('/courses')
//       .then(response => {
//         setCourses(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching courses:', error);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this course?')) {
//       api.delete(`/courses/${id}`)
//         .then(() => {
//           setCourses(courses.filter(course => course.id !== id));
//         })
//         .catch(error => {
//           console.error('Error deleting course:', error);
//         });
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Course List</h2>
//       <Link to="/courses/create" className="btn btn-primary mb-3">Create Course</Link>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Duration</th>
//             <th>Price</th>
//             <th>Image</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {courses.map(course => (
//             <tr key={course.id}>
//               <td>{course.id}</td>
//               <td>{course.title}</td>
//               <td>{course.description}</td>
//               <td>{course.duration}</td>
//               <td>{course.price}</td>
//               <td><img src={course.image} alt={course.title} style={{ width: '100px' }} /></td>
//               <td>
//                 <Link to={`/courses/edit/${course.id}`} className="btn btn-warning me-2">Edit</Link>
//                 <button onClick={() => handleDelete(course.id)} className="btn btn-danger">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import CourseService from '../../services/CourseService';
import Message from './Message';
import '../../App.css';

// Mock function for navigation - replace with actual router logic later
const navigateTo = (path) => {
    console.log(`Navigating to ${path}`);
    // In a real app, you'd use useNavigate() from react-router-dom
    // Example: navigate(path);
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
                            <p>{course.description}</p> {/* Or learning_objectives based on design preference */}
                        </div>
                        <div className="course-actions">
                            {/* Add button functionality might differ based on final requirements, placeholder for now */}
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


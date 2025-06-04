// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'http://127.0.0.1:8000/api',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//     },
// });

// export default api;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import CourseDetail from './components/CourseDetail'; // Assuming you might want a detail view route
import './App.css';

function App() {
    return (
        <Router>
            <div className="container"> {/* Optional: Add a container for consistent padding/width */} 
                {/* Navbar was explicitly excluded */}
                <Routes>
                    {/* Default route redirects to the course list */}
                    <Route path="/" element={<Navigate replace to="/courses" />} />
                    
                    {/* Route for displaying all courses */}
                    <Route path="/courses" element={<CourseList />} />
                    
                    {/* Route for adding a new course */}
                    <Route path="/courses/new" element={<CourseForm />} />
                    
                    {/* Route for editing an existing course */}
                    <Route path="/courses/edit/:id" element={<CourseForm />} />

                    {/* Optional: Route for viewing a single course detail */}
                    {/* You can uncomment this if you want a dedicated detail page */}
                    {/* <Route path="/courses/view/:id" element={<CourseDetail />} /> */}

                    {/* Add other routes as needed */}
                    
                    {/* Optional: Catch-all route for 404 Not Found */}
                    {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;


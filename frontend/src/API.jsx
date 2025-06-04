import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CourseList from './components/courses/CourseList';
import CourseForm from './components/courses/CourseForm';
import CourseDetail from './components/courses/CourseDetail'; 
import './App.css';

function App() {
    return (
        <Router>
            <div className="container"> 
                <Routes>
                    <Route path="/" element={<Navigate replace to="/courses" />} />
                    
                    <Route path="/courses" element={<CourseList />} />
                    
                    <Route path="/courses/new" element={<CourseForm />} />
                    
                    <Route path="/courses/edit/:id" element={<CourseForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;


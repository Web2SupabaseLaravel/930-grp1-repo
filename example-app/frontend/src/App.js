import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LessonList from './components/LessonList';
import LessonForm from './components/LessonForm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LessonList />} />
      <Route path="/add" element={<LessonForm mode="add" />} />
      <Route path="/edit/:id" element={<LessonForm mode="update" />} />
    </Routes>
  );
}

export default App;

 


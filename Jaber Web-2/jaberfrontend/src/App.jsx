import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LessonList from './components/LessonList';
import LessonShow from './components/LessonShow';
import { useParams } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/course/:courseId/lessons" element={<LessonListWrapper />} />
        <Route path="/course/:courseId/lesson/:lessonId" element={<LessonShow />} />
        <Route path="/" element={<h1>Jaber Front end naviagte to<br/> http://localhost:3000/course/f2849c27-30f5-40b4-9cdd-87521090bdbb/lessons</h1>} />
      </Routes>
    </Router>
  );
}

export default App;

function LessonListWrapper() {
  const { courseId } = useParams();
  return <LessonList courseId={courseId} />;
}
// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LessonList from './components/LessonList';
import LessonShow from './components/LessonShow';
import { useParams } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/*Jaber*/}
        <Route path="/course/:courseId/lessons" element={<LessonListWrapper />} />
        <Route path="/course/:courseId/lesson/:lessonId" element={<LessonShow />} />
        <Route path="/" element={<h1>Jaber Front end naviagte to<br/> http://localhost:3000/course/f2849c27-30f5-40b4-9cdd-87521090bdbb/lessons</h1>} />

        {/*Ibrahim*/}
        <Route path="/" element={<LessonList />} />
        <Route path="/add" element={<LessonForm mode="add" />} />
        <Route path="/edit/:id" element={<LessonForm mode="update" />} />

        {/*Manar*/}
        <Route path="/" element={<Navigate replace to="/courses" />} />         
        <Route path="/courses" element={<CourseList />} />         
        <Route path="/courses/new" element={<CourseForm />} />      
        <Route path="/courses/edit/:id" element={<CourseForm />} />
        
        {/*Abdallah*/}
        <Route path="/" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} /> 

        {/*Walaa*/}
        <Route path="/" element={<LatestCoursesPage />} />      
        <Route path="/student/:studentId/enrollments" element={<EnrollmentList />} />

      </Routes>
    </Router>
  );
}

export default App;

function LessonListWrapper() {
  const { courseId } = useParams();
  return <LessonList courseId={courseId} />;
}
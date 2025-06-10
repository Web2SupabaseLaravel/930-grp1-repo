import React, { useEffect, useState } from 'react';
import api from '../api';
import LessonCard from './LessonCard';
import Footer from './Footer';

const LessonList = ({ courseId }) => {

  const [lessons, setLessons] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [course,setcourse]=useState([]);

  const fetchLessons = () => {
    api.get(`/course/${courseId}/lessons`).then((res) => {
        setLessons(res.data.lessons);
        setCompleted(res.data.lessonsCompleted);
        setcourse(res.data.course);
      })
      .catch((err) => {
        console.error('Error fetching lessons:', err);
      });
  };

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  const progress = Math.round((completed.length / Math.max(lessons.length, 1)) * 100);

  return (
    <>    
    <div className="container mt-4" style={{ backgroundColor: '#F8F9FA', padding: '20px', borderRadius: '12px', marginBottom:'360px' }}>
      <h2 className="fw-bold mb-3" style={{ color: '#2C3E50' }}>{course.title}</h2> 
      <div className="progress mb-2" style={{ height: '10px', backgroundColor: '#D6DBDF' }}>
        <div className="progress-bar" role="progressbar" style={{ width: `${progress}%`, backgroundColor: '#3498DB' }}aria-valuenow={progress}aria-valuemin="0"aria-valuemax="100"></div>
      </div>

      <p className="text-center mb-4" style={{ fontSize: '14px', color: '#7F8C8D' }}>{progress}% Completed</p>

      <div className="row">
        {lessons.map((lesson) => (
          <div className="col-12 col-md-6 mb-3" key={lesson.lesson_id}>
            <LessonCard lesson={lesson} isCompleted={completed.includes(lesson.lesson_id)} courseId={courseId}/>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
</>

  );
};

export default LessonList;
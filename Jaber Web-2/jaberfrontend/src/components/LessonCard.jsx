import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';

const LessonCard = ({ lesson, isCompleted, courseId }) => {
  const navigate = useNavigate();

  const gotoLesson = () => {
    navigate(`/course/${courseId}/lesson/${lesson.lesson_id}`);
  };

  return (
    <div className="d-flex flex-row align-items-center justify-content-between" style={{ padding: '20px',borderRadius: '12px',backgroundColor: '#F8F9FA',border: 'none',boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',}}>
      <div className="d-flex align-items-center">
        <div className="me-3 fs-4">
          {isCompleted ? 
          (<FontAwesomeIcon icon={faCheckCircle} style={{ color: '#6CC070' }} />) 
          : 
          (<FontAwesomeIcon icon={faCircle} style={{ color: '#AAB2BD' }} />)}
        </div>
        
        <div>
          <h5 className="mb-1" style={{ color: '#2C3E50' }}>Lesson {lesson.order_number}</h5>
          <p className="mb-0" style={{ fontSize: '14px', color: '#7F8C8D' }}>{lesson.title}</p>
        </div>
      </div>

      <button className="btn px-4" style={{borderRadius: '20px', backgroundColor: '#3498DB',color: '#F8F9FA', border: 'none',}}onClick={gotoLesson}>
        START
      </button>
    </div>
  );
};

export default LessonCard;
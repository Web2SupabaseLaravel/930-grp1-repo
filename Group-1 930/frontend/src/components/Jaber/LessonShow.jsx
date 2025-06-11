import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api';
import Footer from './Footer';

const LessonShow = () => {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [completedLesson, setCompletedLesson] = useState(null);

useEffect(() => {
  api.get(`/lesson/${lessonId}/${courseId}`).then((res) => {
    setLesson(res.data.lesson);
    setNext(res.data.next);
    setPrev(res.data.prev);
    setCompletedLesson(res.data.completed_lesson); 
  });
}, [lessonId, courseId]);

  const markAsCompleted = () => {
    api.post('/lessoncompletions', {
      lesson_id: lessonId,
      course_id: courseId,
    }).then(() => {
      alert(' Marked as completed!');
    });
  };
  
  const markAsUnfinished = () => {
  if (!completedLesson) {
    alert('Lesson is not marked as completed yet.');
    return;
  }

  api.delete(`/lessoncompletions/${completedLesson.id}`)
    .then(() => {
      alert('Marked as Unfinished!');
      setCompletedLesson(null);
    });
};

  if (!lesson) return <p>Loading Lesson Material...</p>;

  const renderContent = () => {
    const type = lesson.content_type?.toLowerCase();
    if (type.includes('video')) {
      return (
        <div className="text-center mb-4">
          <video controls style={{ width: '100%', maxWidth: '800px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <source src={lesson.content_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else if (type.includes('text') || type.includes('article')) {
      return (
        <div className="mb-4 p-4 rounded" style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
          <p style={{ color: '#2C3E50' }}>{lesson.content_url}</p>
        </div>
      );
    } else if (type.includes('image')) {
      return (
        <div className="text-center mb-4">
          <img src={lesson.content_url} alt="Lesson visual" className="img-fluid rounded" />
        </div>
      );
    } else if (type.includes('audio')) {
      return (
        <div className="text-center mb-4">
          <audio controls>
            <source src={lesson.content_url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    } else if (type.includes('file')) {
      return (
        <div className="text-center mb-4">
          <a href={lesson.content_url} download className="btn btn-outline-secondary">
            Download Lesson File
          </a>
        </div>
      );
    } else {
      return <div className="text-center mb-4 text-muted">Unknown content type.</div>;
    }
  };

  const navToQuiz = () => {
    navigate("");
  };

  return (
    <>
    <div className="container mt-4 p-4 bg-light rounded-4 shadow" style={{marginBottom:'420px'}}>
      <div className="row justify-content-between align-items-center text-md-start text-center mb-4">
        <div className="col-md-8">
          <h4 className="fw-bold mb-1" style={{ color: '#2C3E50' }}>Lesson {lesson.order_number}</h4>
          <h5 className="mb-1" style={{ color: '#2C3E50' }}>{lesson.title}</h5>
          <p className="small mb-0" style={{ color: '#7F8C8D' }}>Type: {lesson.content_type}</p>
        </div>
        <div className="col-md-4 text-md-end text-center mt-3 mt-md-0 d-flex flex-column align-items-center">
          <button className="btn text-white px-4 rounded-pill mb-2 col-lg-8 col-md-12 col-8 " style={{ backgroundColor: '#27AE60' }} onClick={markAsCompleted}>
            MARK AS FINISHED
          </button>
          <button className="btn text-white px-4 rounded-pill mb-2 col-lg-8 col-md-12 col-8" style={{ backgroundColor: '#E74C3C' }} onClick={markAsUnfinished}
>
            UNFINISHED
          </button>
        </div>
      </div>

      {renderContent()}

      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
        {prev && (
          <a href={`/course/${courseId}/lesson/${prev.lesson_id}`} className="btn px-4 rounded-pill border-1" style={{ borderColor: '#3498DB', color: '#3498DB', backgroundColor: '#F8F9FA' }}>
            Previous Lesson
          </a>
        )}

        <button className="btn px-4 rounded-pill border-0 text-white" style={{ backgroundColor: '#3498DB' }} onClick={navToQuiz}>
          Attempt Quiz
        </button>

        {next && (
          <a href={`/course/${courseId}/lesson/${next.lesson_id}`} className="btn px-4 rounded-pill border-1" style={{ borderColor: '#3498DB', color: '#3498DB', backgroundColor: '#F8F9FA' }}>
            Next Lesson
          </a>
        )}
      </div>

      <div className="row mt-4">
        <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-start">
          <Link to={`/course/${courseId}/lessons`} className="btn px-4 rounded-pill border-0 text-white" style={{ backgroundColor: '#3498DB' }}>
            Back to Course
          </Link>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default LessonShow;

import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import api, { CORRECT_COURSE_ID } from '../api';
import Header from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
const DEFAULT_COURSE_ID = 'f2849c27-30f5-40b4-9cdd-87521090bdbb'; 
const LessonList = ({ lessons: propLessons, onAdd, onDelete, onAddQuiz, courseId = DEFAULT_COURSE_ID }) => {
  const navigate = useNavigate();
  const handleUpdate = (lessonId) => {
    navigate(`/edit/${lessonId}`);
  }
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchLessonsFromAPI = async () => {
  try {
    console.log('Fetching lessons directly from API for course:', courseId);
    const response = await api.get(`/api/course/${courseId}/lessons`);
    const fetchedLessons = response.data.lessons || [];
    console.log('API returned lessons:', fetchedLessons);
    if (Array.isArray(fetchedLessons)) {
      const courseLessons = fetchedLessons
        .filter(lesson => lesson.course_id === courseId)
        .sort((a, b) => a.order_number - b.order_number);

      console.log(`Filtered ${courseLessons.length} lessons for course ${courseId}`);
      return courseLessons;
    } else {
      console.warn('Non-array data received from API:', fetchedLessons);
      return [];
    }
  } catch (err) {
    console.error('Error fetching lessons from API:', err);
    setError('Failed to load lessons from API: ' + (err.message || 'Unknown error'));
    return [];
  }
};
    const loadLessons = async () => {
      try {
        setLoading(true);
        setError(null);
        const lessonsToUse = await fetchLessonsFromAPI();
        const sortedLessons = [...lessonsToUse].sort((a, b) => a.order_number - b.order_number);
        setLessons(sortedLessons);
      } catch (err) {
        console.error('Error processing lessons:', err);
        setError('Failed to load lessons: ' + (err.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    };
    loadLessons();
  }, [propLessons, courseId]);

  const handleDelete = async (lessonId) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        setLoading(true);
        console.log('Deleting lesson ID:', lessonId);
        await api.delete(`/api/lesson/${lessonId}`);
        setLessons(prevLessons => prevLessons.filter(lesson => lesson.lesson_id !== lessonId));
      } catch (err) {
        setError('Failed to delete lesson: ' + (err.response?.data?.message || err.message || 'Unknown error'));
        console.error('Delete error:', err);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    setError(null);
  }, []);
  return (
    <>
      <Header />
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 style={{ fontWeight: 'bold', fontSize: '2.5rem', color: '#2C3E50' }}>Web Development</h1>
          <Button 
            variant="outline-dark" 
            className="rounded-3 p-2" 
            style={{ width: '50px', height: '50px' }} 
            onClick={() => navigate('/add')}
          >
            <FontAwesomeIcon icon={faSquarePlus} size="2x" />
          </Button>
        </div>
      {loading && <Spinner animation="border" />}
      {error && (
        <div className="bg-danger bg-opacity-10 text-danger p-3 rounded mb-4">
          {error}
        </div>
      )}
      {!loading && !error && lessons.length === 0 ? (
        <div className="bg-light p-4 rounded mb-4 text-center">
          <h3>No lessons found for this course</h3>
          <p className="text-muted">Click the + button above to add your first lesson</p>
        </div>
      ) : (!loading && !error && lessons.map((lesson) => (
        <Card key={lesson.lesson_id} className="mb-4 shadow border-0" style={{ borderRadius: '10px' }}>
          <Card.Body className="p-4">
            <Row className="align-items-center">
              <Col md={6}>
                <h3 style={{ fontWeight: 'bold', fontSize: '1.3rem', marginBottom: '0.2rem' }}>Lesson {lesson.order_number || '1'}</h3>
                <p className="text-muted mb-0">{lesson.title}</p>
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <Button 
                  variant="success" 
                  className="rounded-pill mx-1" 
                  onClick={() => onAddQuiz(lesson.lesson_id)} 
                  style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
                >
                  Add Quiz
                </Button>
                <Button 
                  variant="dark" 
                  className="rounded-pill mx-1" 
                  onClick={() => handleUpdate(lesson.lesson_id)}
                  style={{ backgroundColor: '#2C3E50', borderColor: '#2C3E50' }}
                >
                  Update
                </Button>
                <Button 
                  variant="danger" 
                  className="rounded-pill mx-1" 
                  onClick={() => handleDelete(lesson.lesson_id)}
                  style={{ backgroundColor: '#E74C3C', borderColor: '#E74C3C' }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )))}
      </Container>
      <Footer />
    </>
  );
};
export default LessonList;

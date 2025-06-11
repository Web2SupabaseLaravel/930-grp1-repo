import React, { useEffect, useState } from 'react';
import axios from '../axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const LatestCourses = ({ category = null }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId'); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/latest-courses', {
          params: { catagory: category }
        });
        setCourses(res.data);
      } catch (err) {
        setError('فشل في تحميل الكورسات');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [category]);

  const handleEnroll = async (courseId) => {
    try {
      await axios.post('/enrollments', {
        student_id: studentId,
        course_id: courseId
      });
      navigate(`/course/${courseId}/lessons`);
    } catch (err) {
      alert('فشل في التسجيل بالكورس');
    }
  };

  if (loading) return <div className="text-center mt-5">جاري تحميل الكورسات...</div>;
  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="row">
        {courses.map(course => (
          <div key={course.id} className="col-md-4 mb-4">
            <Card className="h-100 shadow-sm">
              {course.image_url && (
                <Card.Img variant="top" src={course.image_url} alt={course.title} />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title>{course.title}</Card.Title>
                <Card.Text className="text-truncate">
                  {course.description || 'لا يوجد وصف'}
                </Card.Text>
                <Button
                  variant="primary"
                  className="mt-auto"
                  onClick={() => handleEnroll(course.id)}
                >
                  Start course
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCourses;

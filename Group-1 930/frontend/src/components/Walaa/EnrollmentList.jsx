import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useParams } from 'react-router-dom';
import { Card, Button, Spinner, Alert, Container, Row, Col } from 'react-bootstrap';

import ProgressBar from 'react-bootstrap/ProgressBar';

const EnrollmentList = () => {
  const { studentId } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('/enrollments', {
        params: { student_id: studentId }
      })
      .then(res => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('فشل في تحميل الكورسات');
        setLoading(false);
      });
  }, [studentId]);

  if (loading) {
    return <div className="text-center mt-5"><Spinner animation="border" /> جاري تحميل الكورسات...</div>;
  }

  if (error) {
    return <Alert variant="danger" className="mt-5 text-center">{error}</Alert>;
  }

  return (
    <Container className="mt-5">
      <h3 className="mb-4">Your courses</h3>
      {courses.length === 0 ? (
        <p>لم تسجل في أي كورسات بعد.</p>
      ) : (
        <Row>
          {courses.map((enrollment) => {
            const course = enrollment.course;
            return (
              <Col key={course.id} md={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  {course.image_url && (
                    <Card.Img variant="top" src={course.image_url} alt={course.title} />
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{course.title}</Card.Title>
                    <Card.Text className="text-truncate">
                      {course.description || 'بدون وصف'}
                    </Card.Text>
                    <Card.Text className="mt-auto">
                      <small className="text-muted">progress : {enrollment.progress_percent || 0}%</small>
                    </Card.Text>
                      <div className="mt-auto">
                      <ProgressBar
                      now={enrollment.progress_percent || 0}
                      label={`${enrollment.progress_percent || 0}%`}
                      striped
                      />
                    </div>

    
                    <Button
                      variant="primary"
                      href={`/course/${course.id}/lessons`}
                      className="mt-2"
                    >
                      Complete the course
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default EnrollmentList;

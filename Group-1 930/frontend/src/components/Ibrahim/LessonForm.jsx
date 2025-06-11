import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, InputGroup } from 'react-bootstrap';
import api, { CORRECT_COURSE_ID } from '../api';
import Header from './Header';
import Footer from './Footer';
import { useParams, useNavigate } from 'react-router-dom';


const COURSE_ID = 'f2849c27-30f5-40b4-9cdd-87521090bdbb'; 

const LessonForm = ({ mode = 'add', onCancel, onSubmit, lesson }) => {
  const navigate = useNavigate();
  
  const { id } = useParams();
  const [title, setTitle] = useState(lesson?.title || '');
  const [contentType, setContentType] = useState(lesson?.content_type || '');
  const [orderNumber, setOrderNumber] = useState(lesson?.order_number || '');
  const [contentUrl, setContentUrl] = useState(lesson?.content_url || '');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  
  const fileInputRef = React.useRef(null);

  
  useEffect(() => {
    const fetchLessonDetails = async () => {
      if (mode === 'update') {
        setLoading(true);
        setError(null);
        
        try {
          
          if (lesson && lesson.title) {
            
            console.log('Using provided lesson data:', lesson);
            setTitle(lesson.title || '');
            setContentType(lesson.content_type || '');
            setOrderNumber(lesson.order_number || '');
            setContentUrl(lesson.content_url || '');
          } else {
           
            const lessonId = (lesson && lesson.id) || id;
            if (lessonId) {
              console.log('Fetching lesson by ID:', lessonId);
              try {
                const response = await api.get(`/api/lesson/${lessonId}`);
                const lessonData = response.data && response.data.lesson ? response.data.lesson : response.data;

                console.log('Lesson data fetched:', lessonData);
                
                if (lessonData) {
                  setTitle(lessonData.title || '');
                  setContentType(lessonData.content_type || '');
                  setOrderNumber(lessonData.order_number || '');
                  setContentUrl(lessonData.content_url || '');
                } else {
                  setError('Lesson not found');
                }
              } catch (fetchError) {
                console.error('Error fetching lesson:', fetchError);
                setError('Failed to load lesson data');
              }
            }
          }
        } catch (err) {
          console.error('Error loading lesson:', err);
          setError('Failed to load lesson');
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchLessonDetails();
  }, [lesson, mode, id]);

  const handleFileChange = (e) => {
    
    if (e.target.files && e.target.files.length > 0) {
      setContentUrl(e.target.files[0].name);
      
      const fileName = e.target.files[0].name.toLowerCase();
      if (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.gif')) {
        setContentType('image');
      } else if (fileName.endsWith('.mp4') || fileName.endsWith('.webm') || fileName.endsWith('.mov')) {
        setContentType('video');
      } else if (fileName.endsWith('.mp3') || fileName.endsWith('.wav') || fileName.endsWith('.ogg')) {
        setContentType('audio');
      } else {
        setContentType('document');
      }
    }
  };
  
  
  const handleContentFileClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      
      if (!title || !contentType || !orderNumber) {
        setError('Please fill in all required fields: Title, Content Type, and Order Number');
        setLoading(false);
        return;
      }

      
      const newLessonData = {
        ...(mode === 'update' && { lesson_id: lesson?.lesson_id || lesson?.id || id }),
        course_id: COURSE_ID,
        title: title.trim(),
        content_type: contentType.trim(),
        content_url: contentUrl || '',
        order_number: parseInt(orderNumber) || 1, 
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 23)
      };

      console.log(`${mode === 'add' ? 'Adding' : 'Updating'} lesson with data:`, newLessonData);

      if (mode === 'update') {
        
        try {
          await api.put(`/api/lesson/${newLessonData.lesson_id}`, newLessonData);
          setError(null);
          alert('Lesson updated successfully');
          navigate('/');
        } catch (err) {
          console.error('Error updating lesson:', err);
          setError('Failed to save lesson: ' + (err.response?.data?.message || err.message || 'Unknown error'));
        }
      } else if (mode === 'add') {
        
        try {
          
          const { lesson_id, ...addPayload } = newLessonData;
          await api.post('/api/lesson', addPayload);
          setError(null);
          alert('Lesson added successfully');
          navigate('/');
          if (typeof onSubmit === 'function') {
            onSubmit(newLessonData);
          }
        } catch (err) {
          console.error('Error adding lesson:', err);
          setError('Failed to add lesson: ' + (err.response?.data?.message || err.message || 'Unknown error'));
        }
      }

      
      console.log('Lesson saved successfully:', newLessonData);
    } catch (err) {
      console.error('Error saving lesson:', err);
      setError('Failed to save lesson: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container className="py-4">
        <h1 className="mb-4" style={{ fontWeight: 'bold', fontSize: '2.5rem', color: '#2C3E50' }}>{mode === 'add' ? 'Add Lesson' : 'Update Lesson'}</h1>
        
        {error && (
          <div className="bg-danger bg-opacity-10 text-danger p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <Form className="mb-4" onSubmit={handleSubmit}>
          <div className="bg-white shadow-sm p-3 mb-3 rounded">
            <div className="d-flex align-items-center mb-2">
              <span className="me-2" style={{ fontSize: '1.1rem' }}>≡</span>
              <span className="fw-bold">Title</span>
            </div>
            <Form.Control 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              required
              className="border-0"
            />
          </div>
          
          <div className="bg-white shadow-sm p-3 mb-3 rounded">
            <div className="d-flex align-items-center mb-2">
              <span className="me-2" style={{ fontSize: '1.1rem' }}>≡</span>
              <span className="fw-bold">Type</span>
            </div>
            <Form.Control 
              type="text" 
              value={contentType} 
              onChange={e => setContentType(e.target.value)}
              required
              className="border-0"
            />
          </div>
          
          <div className="bg-white shadow-sm p-3 mb-3 rounded">
            <div className="d-flex align-items-center mb-2">
              <span className="me-2" style={{ fontSize: '1.1rem' }}>↑</span>
              <span className="fw-bold">Lesson {orderNumber || '3'}</span>
            </div>
            <Form.Control 
              type="number" 
              value={orderNumber} 
              onChange={e => setOrderNumber(e.target.value)}
              required
              className="border-0"
            />
          </div>
          
          <div className="bg-white shadow-sm p-3 mb-4 rounded">
            <div className="d-flex align-items-center mb-2">
              <span className="me-2" style={{ fontSize: '1.1rem' }}>≡</span>
              <span className="fw-bold">Content</span>
            </div>
            
            <InputGroup>
              <Form.Control 
                type="text" 
                value={contentUrl} 
                onChange={e => setContentUrl(e.target.value)}
                placeholder="Enter content URL or select a file"
                className="border-0 mb-2"
              />
              <Button 
                variant="outline-secondary"
                onClick={handleContentFileClick}
                style={{ borderColor: '#3498DB', color: '#3498DB' }}
              >
                Browse
              </Button>
            </InputGroup>
            
            {contentUrl && (
              <div className="mt-2 text-muted">
                Current file: {contentUrl}
              </div>
            )}
            
            <Form.Control 
              type="file" 
              ref={fileInputRef} 
              className="d-none" 
              onChange={handleFileChange} 
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.ppt,.pptx,.txt,.exe"
            />
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Button 
              variant="outline-primary" 
              className="px-5 rounded-pill me-3" 
              onClick={() => navigate('/')} 
              disabled={loading}
              style={{ borderColor: '#3498DB', color: '#3498DB' }}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              type="submit" 
              className="px-5 rounded-pill" 
              disabled={loading}
              style={{ backgroundColor: '#3498DB', borderColor: '#3498DB' }}
            >
              {mode === 'add' ? 'Add' : 'Update'}
            </Button>
          </div>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default LessonForm;

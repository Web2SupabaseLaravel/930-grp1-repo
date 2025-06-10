import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EnrollmentList from './components/EnrollmentList'; 
import LatestCoursesPage from './components/LatestCoursesPage';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LatestCoursesPage />} />      
        <Route path="/student/:studentId/enrollments" element={<EnrollmentList />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;


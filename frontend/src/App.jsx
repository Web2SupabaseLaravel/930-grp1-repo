// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


// import React from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import EditCourse from "./components/courses/EditCourse";
// import CreateCourse from "./components/courses/CreateCourse";
// import CourseList from "./components/courses/CourseList";
// import CourseForm from "./components/courses/CourseForm";                    

// import { useEffect, useState } from 'react';

// function App() {
//    const [courses, setCourses] = useState([]);

//    useEffect(() => {
//      fetch('http://127.0.0.1:8000/api/courses')
//        .then(response => response.json())
//        .then(data => setCourses(data))
//        .catch(error => console.error('Error fetching data:', error));
//    }, []);

//   return (
    // <div style={{ padding: '2rem' }}>
    //   <h1>Courses from Laravel API</h1>
    //   <ul>
    //     {courses.map(course => (
    //       <li key={course.id}>{course.title}</li>
    //     ))}
    //   </ul>
    // // </div>
    // <Router>
      {/* bootstrap navbar*/}
//       <Routes>
//         <Route path="/courses/create" element={<CreateCourse/>}> </Route>
//         <Route path="/courses/edit/:id" element={<EditCourse/>}> </Route>
//         <Route path="/courses/list" element={<CourseList/>}> </Route>
//         <Route path="/courses/form" element={<CourseForm/>}> </Route>


//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CourseList from './components/courses/CourseList';
import CourseForm from './components/courses/CourseForm';
import CourseDetail from './components/courses/CourseDetail'; // Assuming you might want a detail view route
import './App.css';

function App() {
    return (
        <Router>
            <div className="container"> {/* Optional: Add a container for consistent padding/width */} 
                {/* Navbar was explicitly excluded */}
                <Routes>
                    {/* Default route redirects to the course list */}
                    <Route path="/" element={<Navigate replace to="/courses" />} />
                    
                    {/* Route for displaying all courses */}
                    <Route path="/courses" element={<CourseList />} />
                    
                    {/* Route for adding a new course */}
                    <Route path="/courses/new" element={<CourseForm />} />
                    
                    {/* Route for editing an existing course */}
                    <Route path="/courses/edit/:id" element={<CourseForm />} />

                    {/* Optional: Route for viewing a single course detail */}
                    {/* You can uncomment this if you want a dedicated detail page */}
                    {/* <Route path="/courses/view/:id" element={<CourseDetail />} /> */}

                    {/* Add other routes as needed */}
                    
                    {/* Optional: Catch-all route for 404 Not Found */}
                    {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;


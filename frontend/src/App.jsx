import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CourseList from './components/courses/CourseList';
import CourseForm from './components/courses/CourseForm';
import CourseDetails from './components/courses/CourseDetails'; 
import './App.css';

const App = () => {
    return (
        <Router>
    <Switch>
        <Route exact path="/" component={CourseList} />
        <Route path="/courses/create" component={CourseForm} />
        <Route path="/courses/:id" component={CourseDetails} />
      </Switch>
        </Router>
    );
}

export default App;

// import React from 'react';
//     import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//     import CourseList from './components/courses/CourseList';
//     import './App.css';

//     const App = () => {
//       return (
//         <div>
//           <h1>Test Render</h1> {/* Add this to verify rendering */}
//           <Router>
//             <Switch>
//               <Route exact path="/" component={CourseList} />
//               <Route path="/courses/create" component={() => <h2>Create Page</h2>} />
//               <Route path="/courses/:id" component={() => <h2>Details Page</h2>} />
//             </Switch>
//           </Router>
//         </div>
//       );
//     };

//     export default App;

// import React from 'react';
//   import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//   import CourseList from './components/CourseList.jsx';
//   import CourseForm from './components/CourseForm.jsx';
//   import CourseDetails from './components/CourseDetails.jsx';
//   import './App.css';

//   const App = () => {
//     return (
//       <div>
//         <h1>Test Render</h1> {/* Temporary test */}
//         <Router>
//           <Switch>
//             <Route exact path="/" component={CourseList} />
//             <Route path="/courses/create" component={CourseForm} />
//             <Route path="/courses/:id" component={CourseDetails} />
//           </Switch>
//         </Router>
//       </div>
//     );
//   };

//   export default App;
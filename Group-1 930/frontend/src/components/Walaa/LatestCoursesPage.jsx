import React, { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import LatestCourses from './LatestCourses';

const LatestCoursesPage = () => {
  const [category, setCategory] = useState(null);

  return (
    <div className="container mt-5">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h2 className="mb-0">NEW COURSES</h2>
    <CategoryFilter category={category} setCategory={setCategory} />
  </div>

  <LatestCourses category={category} />
</div>

  );
};

export default LatestCoursesPage;

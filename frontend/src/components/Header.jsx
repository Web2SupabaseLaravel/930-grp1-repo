import React from 'react';

const OnlineCoursesHeader = () => {
  return (
    <div className="courses-header">
      {/* Background with gradient */}
      <div className="header-background"></div>
      
      {/* Content overlay */}
      <div className="content-overlay">
        {/* Main heading */}
        <h1 className="main-heading">
          Free online courses<br />
          from the experts.
        </h1>
        
        {/* Subheading */}
        <p className="sub-heading">
          The best platform, enroll in your special course
        </p>
      </div>
      
      <style jsx>{`
        .courses-header {
          position: relative;
          width: 100%;
          height: 400px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0 100px;
        }
        
        .header-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('../assets/background.png');
          background-size: cover;
          background-position: center;
          z-index: -1;
        }
        
        .content-overlay {
          position: relative;
          z-index: 2;
          max-width: 600px;
        }
        
        .main-heading {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-weight: 700;
          font-size: 60px;
          line-height: 1.1;
          color: #F8F9FA;
          text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
          margin: 0 0 30px 0;
          letter-spacing: -1px;
        }
        
        .sub-heading {
          font-family: 'Georgia', serif;
          font-weight: 400;
          font-size: 22px;
          line-height: 1.4;
          color: #FFFFFF;
          opacity: 0.8;
          margin: 0;
          max-width: 510px;
        }
        
        @media (max-width: 768px) {
          .courses-header {
            padding: 40px 20px;
            height: 300px;
          }
          
          .main-heading {
            font-size: 42px;
          }
          
          .sub-heading {
            font-size: 18px;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default OnlineCoursesHeader;
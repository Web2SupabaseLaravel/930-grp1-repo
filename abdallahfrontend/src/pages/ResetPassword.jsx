import React from 'react';
import './ResetPassword.css';
import logo from '../assets/logo.png';


const ResetPassword = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-box">
       <img src={logo} alt="LearnUp" className="logo" />
        <h2>Reset Password</h2>

        <input type="email" placeholder="Enter Your Email" className="input" />
        <input type="password" placeholder="New Password" className="input" />
        <input type="password" placeholder="Confirm Password" className="input" />

        <button className="btn">Reset Password</button>
      </div>
    </div>
  );
};

export default ResetPassword;

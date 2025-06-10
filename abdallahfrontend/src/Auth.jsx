

import React, { useState } from 'react';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={`container ${isLogin ? '' : 'sign-up-mode'}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <img src="/logo.png" alt="LearnUp" className="logo" />
            <h2 className="title">Login</h2>
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <button className="btn solid">Login</button>
            <p className="social-text">
              Don’t have an account?{' '}
              <span className="switch" onClick={toggleForm}>Register</span>
            </p>
          </form>

          <form action="#" className="sign-up-form">
            <img src="/logo.png" alt="LearnUp" className="logo" />
            <h2 className="title">Register</h2>
            <input type="text" placeholder="Full Name" className="input" />
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <input type="password" placeholder="Confirm Password" className="input" />
            <button className="btn">Register</button>
            <p className="social-text">
              Already have an account?{' '}
              <span className="switch" onClick={toggleForm}>Login</span>
            </p>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Welcome Back!</h3>
            <p>Already have an account?</p>
            <button className="btn transparent" onClick={toggleForm}>
              Login
            </button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>Hello, Welcome!</h3>
            <p>Don’t have an account?</p>
            <button className="btn transparent" onClick={toggleForm}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

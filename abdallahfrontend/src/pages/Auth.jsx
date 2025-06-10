import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Auth.css';
import logo from '../assets/logo.png';


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); 

  return (
    <div className={`auth-container ${isLogin ? 'login-mode' : 'register-mode'}`}>
  
      <div className="form-section">
        
        <div className="form-box sign-in-box">
          <form>
            <img src={logo} alt="LearnUp" className="logo" />
            <h2>Login</h2>
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <a onClick={() => navigate('/forgot-password')} className="forgot">Forgot Password?</a>
            <button className="btn">Login</button>
          </form>
        </div>

        <div className="form-box sign-up-box">
          <form>
            <img src={logo} alt="LearnUp" className="logo" />
            <h2>Register</h2>
            <input type="text" placeholder="Full Name" className="input" />
            <input type="email" placeholder="Email" className="input" />
            <input type="password" placeholder="Password" className="input" />
            <input type="password" placeholder="Confirm Password" className="input" />
            <button className="btn">Register</button>
          </form>
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-content">
          <h3>{isLogin ? 'Welcome Back!' : 'Hello, Welcome!'}</h3>
          <p>{isLogin ? 'Already have an account?' : "Don't have an account?"}</p>
          <button className="btn transparent" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Login' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

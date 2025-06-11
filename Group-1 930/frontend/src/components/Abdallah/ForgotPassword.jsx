import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './ForgotPassword.css'; 
import logo from '../assets/logo.png';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/forgot-password', { email });
      setMessage(res.data.message);

     
      setTimeout(() => {
        navigate('/reset-password');
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Something went wrong.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <img src={logo} alt="LearnUp" className="logo" />
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Please Enter Your Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="btn" type="submit">Send Reset Link</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;

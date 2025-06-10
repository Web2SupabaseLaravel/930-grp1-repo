import React, { useState } from "react";
import logo from "../assets/logo.png";

function Login({ setIsLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="form">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
      <p onClick={() => setIsLogin(false)}>Don't have an account? Register</p>
    </div>
  );
}

export default Login;

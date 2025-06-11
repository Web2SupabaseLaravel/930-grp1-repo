import React, { useState } from "react";
import logo from "../assets/logo.png";

function Register({ setIsLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="form">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Register</h2>
      <input type="text" placeholder="Full Name" onChange={e => setName(e.target.value)} />
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button>Register</button>
      <p onClick={() => setIsLogin(true)}>Already have an account? Login</p>
    </div>
  );
}

export default Register;

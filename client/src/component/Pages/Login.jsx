import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../component/Pages/Login.css'
import { useAuthContext } from '../Context/Autcontext';
// import { usecontext } from '../Context/Autcontext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const {login}= useAuthContext();
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Store token and user data in localStorage
        login(data.user);

        localStorage.setItem('token', data.token);
        if (data.user.role === 'admin') {
           navigate('/');
        }else{
            navigate('/employee');
        }
      
      } else {
        // Set errors based on backend message
        if (data.msg === "User not found") {
          setEmailError("Email not registered.");
        } else if (data.msg === "Invalid credentials") {
          setPasswordError("Incorrect password.");
        } else {
          setEmailError('');
          setPasswordError('');
        }
      }
    } catch (error) {
      setEmailError('Server error. Please try again later.');
      setPasswordError('');
    }
  }

  return (
    <div className="login-container">
      <h1 className="login-title">Login Page</h1>
      <form className="login-form" onSubmit={handlesubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="form-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {emailError && <div className="error-message " style={{color:"red"}}>{emailError}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="form-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {passwordError && <div style={{color:"red"}}  className="error-message">{passwordError}</div>}
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  )
}

export default Login
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = ({ onLogin }: { onLogin: () => void }) => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e: any) => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    const handleLogin = async (e: any) => {
  e.preventDefault();
  setError('');
  
  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password
      }),
    });
    
    const result = await response.json();
    
    if (response.ok) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('username', result.username);
      onLogin();
      navigate("/");
    } else {
      setError(result.error || "Invalid username or password");
    }
  } catch (error) {
    console.error('Connection error:', error);
    setError("Backend is running but React can't connect. Check console.");
  }
};

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="header">
                    <h2>Login</h2>               
                </div>

                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" placeholder="Enter your username" value={data.username} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type={showPassword ? 'text' : 'password'} id="password" placeholder="Enter your password" value={data.password} onChange={handleChange} required />
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="radio" role="switch" id="switchCheckChecked" onClick={() => setShowPassword(!showPassword)} />
                            <label className="form-check-label" htmlFor="switchCheckChecked">Show Password</label>
                        </div>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                    <button type="button" className="login-btn" onClick={() => navigate("/signin")}>
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Login;
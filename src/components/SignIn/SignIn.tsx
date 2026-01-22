import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e: any) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };

    const handleSignIn = async (e: any) => {
    e.preventDefault();
    setError('');

    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password
            })
        });

        const result = await response.json();
        
        if (response.ok) {
            alert('User created successfully!');
            setFormData({ username: '', password: '' });
            navigate("/login");
        } else {
            setError(result.error || 'Failed to create user');
        }
    } catch (error) {
        setError('Cannot connect to server. Make sure backend is running.');
    }
}

    return (
            <div className="login-page">
                <div className="login-container">
                    <div className="header">
                        <h2>Create a new User</h2>
                    </div>

                    <form onSubmit={handleSignIn} className="login-form">
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" placeholder="Enter your username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type={showPassword ? 'text' : 'password'} id="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="radio" role="switch" id="switchCheckChecked" onClick={() => setShowPassword(!showPassword)} />
                                <label className="form-check-label" htmlFor="switchCheckChecked">Show Password</label>
                            </div>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button type="submit" className="login-btn">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        )
    }
    export default SignIn;
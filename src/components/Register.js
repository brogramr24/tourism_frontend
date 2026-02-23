import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        user_type: 'tourist'
    });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Email may already exist.');
        }
    };

    return (
        <div className="card" style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input 
                        type="text" 
                        value={formData.first_name}
                        onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input 
                        type="text" 
                        value={formData.last_name}
                        onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Account Type</label>
                    <select 
                        value={formData.user_type}
                        onChange={(e) => setFormData({...formData, user_type: e.target.value})}
                    >
                        <option value="tourist">Tourist</option>
                        <option value="guide">Guide</option>
                    </select>
                </div>
                <button type="submit" className="btn">Register</button>
            </form>
        </div>
    );
};

export default Register;

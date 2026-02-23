import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const CreateExperience = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        duration_hours: '',
        max_participants: '',
        price_per_person: '',
        category: 'adventure'
    });
    const { user } = useAuth();
    const navigate = useNavigate();

    if (user?.type !== 'guide') {
        return <div className="container">Only guides can create experiences.</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/api/experiences`, formData);
            alert('Experience created!');
            navigate('/experiences');
        } catch (error) {
            alert('Failed to create: ' + error.response?.data?.error);
        }
    };

    return (
        <div>
            <h1>Create New Experience</h1>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input 
                            type="text" 
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea 
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input 
                            type="text" 
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (hours)</label>
                        <input 
                            type="number" 
                            value={formData.duration_hours}
                            onChange={(e) => setFormData({...formData, duration_hours: e.target.value})}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Max Participants</label>
                        <input 
                            type="number" 
                            value={formData.max_participants}
                            onChange={(e) => setFormData({...formData, max_participants: e.target.value})}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Price per Person ($)</label>
                        <input 
                            type="number" 
                            step="0.01"
                            value={formData.price_per_person}
                            onChange={(e) => setFormData({...formData, price_per_person: e.target.value})}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select 
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        >
                            <option value="adventure">Adventure</option>
                            <option value="cultural">Cultural</option>
                            <option value="food">Food</option>
                            <option value="nature">Nature</option>
                            <option value="historical">Historical</option>
                            <option value="wellness">Wellness</option>
                        </select>
                    </div>
                    <button type="submit" className="btn">Create Experience</button>
                </form>
            </div>
        </div>
    );
};

export default CreateExperience;

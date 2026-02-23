import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const ExperienceList = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ location: '', category: '' });

    const fetchExperiences = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/experiences`);

            // 🔥 SAFE FIX: Ensure it's always an array
            const data = Array.isArray(response.data)
                ? response.data
                : response.data?.experiences || [];

            setExperiences(data);

        } catch (error) {
            console.error('Error fetching experiences:', error);
            setExperiences([]); // prevent crash
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    // 🔥 SAFE FILTER
    const filteredExperiences = (Array.isArray(experiences) ? experiences : []).filter(exp => {
        return (
            exp?.location?.toLowerCase().includes(filters.location.toLowerCase()) &&
            (filters.category === '' || exp?.category === filters.category)
        );
    });

    if (loading) return <div className="container">Loading...</div>;

    return (
        <div>
            <h1>Available Experiences</h1>

            <div className="card" style={{ marginTop: '20px' }}>
                <h3>Filter</h3>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <input
                        type="text"
                        placeholder="Location..."
                        value={filters.location}
                        onChange={(e) =>
                            setFilters({ ...filters, location: e.target.value })
                        }
                    />

                    <select
                        value={filters.category}
                        onChange={(e) =>
                            setFilters({ ...filters, category: e.target.value })
                        }
                    >
                        <option value="">All Categories</option>
                        <option value="adventure">Adventure</option>
                        <option value="cultural">Cultural</option>
                        <option value="food">Food</option>
                        <option value="nature">Nature</option>
                        <option value="historical">Historical</option>
                        <option value="wellness">Wellness</option>
                    </select>
                </div>
            </div>

            <div className="grid">
                {filteredExperiences.map(exp => (
                    <div key={exp.experience_id} className="card">
                        <h3>{exp.title}</h3>
                        <p>📍 {exp.location}</p>
                        <p>⏱️ {exp.duration_hours} hours</p>
                        <p>💰 ${exp.price_per_person} per person</p>
                        <p>Category: {exp.category}</p>

                        <Link to={`/experience/${exp.experience_id}`}>
                            <button className="btn">View Details</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceList;
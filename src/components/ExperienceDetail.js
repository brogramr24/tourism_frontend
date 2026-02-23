import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const ExperienceDetail = () => {
    const { id } = useParams();
    const [experience, setExperience] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const [participants, setParticipants] = useState(1);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchExperience();
    }, [id]);

    const fetchExperience = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/experiences/${id}`);
            setExperience(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBooking = async () => {
        if (!user) {
            alert('Please login to book');
            return;
        }
        try {
            await axios.post(`${API_URL}/api/bookings`, {
                experience_id: id,
                scheduled_date: bookingDate,
                num_participants: participants
            });
            alert('Booking successful!');
            navigate('/bookings');
        } catch (error) {
            alert('Booking failed: ' + error.response?.data?.error);
        }
    };

    if (!experience) return <div>Loading...</div>;

    return (
        <div>
            <h1>{experience.title}</h1>
            <div className="card">
                <p>{experience.description}</p>
                <p>📍 {experience.location}</p>
                <p>⏱️ {experience.duration_hours} hours</p>
                <p>💰 ${experience.price_per_person} per person</p>
                <p>Max participants: {experience.max_participants}</p>
                
                {user && user.type === 'tourist' && (
                    <div style={{ marginTop: '20px' }}>
                        <h3>Book This Experience</h3>
                        <div className="form-group">
                            <label>Date</label>
                            <input 
                                type="date" 
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                            />
                        </div>
                        <div className="form-group">
                            <label>Participants</label>
                            <input 
                                type="number" 
                                min="1" 
                                max={experience.max_participants}
                                value={participants}
                                onChange={(e) => setParticipants(parseInt(e.target.value))}
                            />
                        </div>
                        <p><strong>Total: ${experience.price_per_person * participants}</strong></p>
                        <button onClick={handleBooking} className="btn">Book Now</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExperienceDetail;

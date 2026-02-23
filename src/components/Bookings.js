import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/bookings`);
            setBookings(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>My Bookings</h1>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                bookings.map(booking => (
                    <div key={booking.booking_id} className="card">
                        <h3>{booking.title || booking.experience_title}</h3>
                        <p>Date: {new Date(booking.scheduled_date).toLocaleDateString()}</p>
                        <p>Participants: {booking.num_participants}</p>
                        <p>Total: ${booking.total_amount}</p>
                        <p>Status: <strong>{booking.status}</strong></p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Bookings;

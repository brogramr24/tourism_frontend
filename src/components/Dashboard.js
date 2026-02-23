import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();

    if (!user) return <div className="container">Please login to view dashboard</div>;

    return (
        <div>
            <h1>Dashboard</h1>
            <div className="card">
                <h2>Welcome, {user.email}</h2>
                <p><strong>Account Type:</strong> {user.type}</p>
                <p><strong>User ID:</strong> {user.id}</p>
            </div>

            {user.type === 'tourist' && (
                <div className="card">
                    <h3>Tourist Options</h3>
                    <Link to="/experiences"><button className="btn">Browse Experiences</button></Link>
                    <Link to="/bookings" style={{ marginLeft: '10px' }}><button className="btn">My Bookings</button></Link>
                </div>
            )}

            {user.type === 'guide' && (
                <div className="card">
                    <h3>Guide Options</h3>
                    <Link to="/create"><button className="btn">Add New Experience</button></Link>
                    <Link to="/bookings" style={{ marginLeft: '10px' }}><button className="btn">View Bookings</button></Link>
                </div>
            )}

            {user.type === 'admin' && (
                <div className="card">
                    <h3>Admin Options</h3>
                    <p>System management and analytics available here.</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;

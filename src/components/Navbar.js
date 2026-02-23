import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <h2>🌍 Tourism App</h2>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/experiences">Experiences</Link>
                {user ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/bookings">My Bookings</Link>
                        {user.type === 'guide' && <Link to="/create">Add Experience</Link>}
                        <span style={{ marginLeft: '2rem' }}>Hi, {user.email}</span>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

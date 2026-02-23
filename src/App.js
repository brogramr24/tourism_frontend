import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ExperienceList from './components/ExperienceList';
import ExperienceDetail from './components/ExperienceDetail';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Bookings from './components/Bookings';
import CreateExperience from './components/CreateExperience';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<ExperienceList />} />
                        <Route path="/experiences" element={<ExperienceList />} />
                        <Route path="/experience/:id" element={<ExperienceDetail />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/bookings" element={<Bookings />} />
                        <Route path="/create" element={<CreateExperience />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;

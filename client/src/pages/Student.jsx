import React from 'react'
import { Routes, Route } from 'react-router-dom';
import NavigationBar from '../components/Student/NavigationBar';
import Dashboard from '../components/Student/Dashboard';
import Examboard from '../components/Student/Examboard';
import SideBarProfile from '../components/Student/SideBarProfile';
import Profile from '../components/Student/Profile';

const Student = () => {
    return (
        <div>
            <NavigationBar />

            <div className="flex">
                <SideBarProfile />

                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/exams" element={<Examboard />} />
                    <Route path="/profile/*" element={<Profile />} />
                </Routes>
            </div>
        </div>
    )
}

export default Student
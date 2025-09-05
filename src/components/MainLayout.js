import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('coreResetUser')) || null;
        } catch {
            return null;
        }
    });
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('coreResetUser');
        setUser(null);
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <div
                className="flex-1 flex flex-col"
                style={{
                    marginLeft: sidebarOpen ? 220 : 64,
                    transition: 'margin-left 0.4s',
                }}
            >
                <Navbar user={user} onLogout={handleLogout} />
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

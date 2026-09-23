import React, { useState } from 'react';
import { Utensils, LayoutDashboard, UserCheck, Bot } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('student');

  return (
    <div className="app-container">
      {/* Header Navigation */}
      <nav className="navbar">
        <div className="brand">
          <Utensils size={28} />
          <span>Campus Food Services Assistant</span>
        </div>
        <div className="nav-tabs">
          <button 
            className={`nav-btn ${activeTab === 'student' ? 'active' : ''}`}
            onClick={() => setActiveTab('student')}
          >
            <UserCheck size={18} />
            Student Portal
          </button>
          <button 
            className={`nav-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            <LayoutDashboard size={18} />
            Admin Dashboard
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'student' && (
          <div className="placeholder-card">
            <h2>Student Self-Service Portal</h2>
            <p>Report issues, check menus, reserve meals, and manage dietary preferences.</p>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="placeholder-card">
            <h2>Administrative Command Centre</h2>
            <p>Monitor open complaints, SLA status, meal reservations, and food-waste insights.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

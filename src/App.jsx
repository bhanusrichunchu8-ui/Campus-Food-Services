import React, { useState } from 'react';
import { Utensils, LayoutDashboard, UserCheck } from 'lucide-react';
import StudentPortal from './components/StudentPortal';
import AdminDashboard from './components/AdminDashboard';
import VirtualAgent from './components/VirtualAgent';

function App() {
  const [activeTab, setActiveTab] = useState('student');
  
  const [cases, setCases] = useState([
    {
      id: 'FS-1001',
      type: 'Complaint',
      category: 'Food Quality',
      details: 'Sambar served cold in Mess Block A during lunch time.',
      urgency: 'Medium',
      status: 'In Progress',
      timestamp: '12:30 PM',
      date: '2026-03-30'
    },
    {
      id: 'FS-1002',
      type: 'Complaint',
      category: 'Hygiene & Safety',
      details: 'Water counter near exit needs cleaning.',
      urgency: 'High',
      status: 'Escalated',
      timestamp: '01:15 PM',
      date: '2026-03-30'
    }
  ]);

  const handleAddCase = (newCase) => {
    setCases((prevCases) => [newCase, ...prevCases]);
  };

  const handleUpdateStatus = (caseId, newStatus) => {
    setCases((prevCases) =>
      prevCases.map((c) =>
        c.id === caseId ? { ...c, status: newStatus } : c
      )
    );
  };

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
          <StudentPortal cases={cases} onAddCase={handleAddCase} />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard cases={cases} onUpdateStatus={handleUpdateStatus} />
        )}
      </main>

      {/* Persistent AI Virtual Agent Chatbot */}
      <VirtualAgent onAddCase={handleAddCase} />
    </div>
  );
}

export default App;
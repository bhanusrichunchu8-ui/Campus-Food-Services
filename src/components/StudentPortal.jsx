import React, { useState } from 'react';
import { AlertTriangle, UtensilsCrossed, Calendar, ShieldAlert, Send, CheckCircle2, Clock } from 'lucide-react';

export default function StudentPortal({ cases, onAddCase }) {
  const [activeForm, setActiveForm] = useState('complaint'); // 'complaint', 'reservation', 'dietary'
  
  // Complaint / Issue Form State
  const [category, setCategory] = useState('Food Quality');
  const [description, setDescription] = useState('');
  const [urgency, setUrgency] = useState('Medium');

  // Reservation Form State
  const [mealType, setMealType] = useState('Lunch');
  const [reservationDate, setReservationDate] = useState('');

  // Dietary Form State
  const [dietaryType, setDietaryType] = useState('Vegetarian');
  const [allergyNotes, setAllergyNotes] = useState('');

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newCase = {
      id: `FS-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'Complaint',
      category,
      details: description,
      urgency,
      status: 'In Progress',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString()
    };

    onAddCase(newCase);
    setDescription('');
    alert('Complaint submitted successfully! SLA timer started.');
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    if (!reservationDate) return;

    const newCase = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'Reservation',
      category: `Meal Reservation (${mealType})`,
      details: `Reserved for date: ${reservationDate}`,
      urgency: 'Low',
      status: 'Confirmed',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString()
    };

    onAddCase(newCase);
    setReservationDate('');
    alert('Meal reservation recorded! This helps reduce food waste.');
  };

  const handleDietarySubmit = (e) => {
    e.preventDefault();

    const newCase = {
      id: `DIET-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'Dietary Request',
      category: `Dietary / Allergy (${dietaryType})`,
      details: allergyNotes || 'No specific allergy notes provided.',
      urgency: 'High',
      status: 'Pending Verification',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString()
    };

    onAddCase(newCase);
    setAllergyNotes('');
    alert('Dietary request submitted to mess staff for allergy verification.');
  };

  return (
    <div className="student-portal">
      {/* Module Navigation Sub-bar */}
      <div className="sub-nav">
        <button 
          className={`sub-nav-btn ${activeForm === 'complaint' ? 'active' : ''}`}
          onClick={() => setActiveForm('complaint')}
        >
          <AlertTriangle size={18} />
          Report Food Issue
        </button>
        <button 
          className={`sub-nav-btn ${activeForm === 'reservation' ? 'active' : ''}`}
          onClick={() => setActiveForm('reservation')}
        >
          <Calendar size={18} />
          Meal Reservation
        </button>
        <button 
          className={`sub-nav-btn ${activeForm === 'dietary' ? 'active' : ''}`}
          onClick={() => setActiveForm('dietary')}
        >
          <ShieldAlert size={18} />
          Dietary & Allergy Needs
        </button>
      </div>

      <div className="portal-grid">
        {/* Form Section */}
        <div className="form-card">
          {activeForm === 'complaint' && (
            <form onSubmit={handleComplaintSubmit}>
              <h3><UtensilsCrossed size={20} /> Report Food or Hygiene Issue</h3>
              <p className="form-desc">Log complaints for automated AI categorization, routing, and SLA tracking.</p>

              <div className="form-group">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="Food Quality">Food Quality (Raw, Undercooked, Taste)</option>
                  <option value="Hygiene & Safety">Hygiene & Safety Concern</option>
                  <option value="Menu Availability">Unavailable Menu Item</option>
                  <option value="Billing Issue">Billing / Fee Dispute</option>
                  <option value="Missed Meal">Missed Meal Request</option>
                </select>
              </div>

              <div className="form-group">
                <label>Urgency Level</label>
                <select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                  <option value="Low">Low (General Feedback)</option>
                  <option value="Medium">Medium (Attention Required)</option>
                  <option value="High">High (Immediate Action Required / Hygiene)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Issue Details</label>
                <textarea 
                  rows="4" 
                  placeholder="Describe the issue clearly (e.g., Cold food served at counter 2)..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                <Send size={16} /> Submit Issue
              </button>
            </form>
          )}

          {activeForm === 'reservation' && (
            <form onSubmit={handleReservationSubmit}>
              <h3><Calendar size={20} /> Reserve Meal</h3>
              <p className="form-desc">Book meals in advance to help mess staff estimate demand and minimize food waste.</p>

              <div className="form-group">
                <label>Meal Type</label>
                <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Snacks">Evening Snacks</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>

              <div className="form-group">
                <label>Reservation Date</label>
                <input 
                  type="date" 
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                  required 
                />
              </div>

              <button type="submit" className="submit-btn">
                <Send size={16} /> Confirm Reservation
              </button>
            </form>
          )}

          {activeForm === 'dietary' && (
            <form onSubmit={handleDietarySubmit}>
              <h3><ShieldAlert size={20} /> Dietary Preference & Allergy Request</h3>
              <p className="form-desc">Notify mess staff about special dietary requirements or severe food allergies.</p>

              <div className="form-group">
                <label>Dietary Category</label>
                <select value={dietaryType} onChange={(e) => setDietaryType(e.target.value)}>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                  <option value="Jain Food">Jain Preference</option>
                  <option value="Severe Allergy">Severe Allergy Alert</option>
                </select>
              </div>

              <div className="form-group">
                <label>Allergy / Restriction Details</label>
                <textarea 
                  rows="3" 
                  placeholder="Specify allergies (e.g., Peanuts, Dairy, Shellfish) or dietary instructions..."
                  value={allergyNotes}
                  onChange={(e) => setAllergyNotes(e.target.value)}
                />
              </div>

              <button type="submit" className="submit-btn">
                <Send size={16} /> Save Requirement
              </button>
            </form>
          )}
        </div>

        {/* Live Submissions Feed */}
        <div className="status-card">
          <h3>Recent Activity & Tracking</h3>
          {cases.length === 0 ? (
            <p className="empty-msg">No submissions recorded yet.</p>
          ) : (
            <div className="case-list">
              {cases.map((c) => (
                <div key={c.id} className="case-item">
                  <div className="case-header">
                    <span className="case-id">{c.id}</span>
                    <span className={`badge ${c.urgency.toLowerCase()}`}>{c.urgency} Urgency</span>
                  </div>
                  <h4 className="case-title">{c.category}</h4>
                  <p className="case-details">{c.details}</p>
                  <div className="case-footer">
                    <span className="status-pill">
                      <Clock size={14} /> {c.status}
                    </span>
                    <span className="case-time">{c.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
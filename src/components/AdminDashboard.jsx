import React from 'react';
import { AlertCircle, ShieldAlert, Clock, CheckCircle, Flame, TrendingDown, Scale, Utensils } from 'lucide-react';

export default function AdminDashboard({ cases, onUpdateStatus }) {
  // Metric Calculations
  const openComplaints = cases.filter(c => c.status !== 'Resolved').length;
  const highPriority = cases.filter(c => c.urgency === 'High' && c.status !== 'Resolved').length;
  const slaBreached = cases.filter(c => c.status === 'Escalated').length;
  const reservationsCount = cases.filter(c => c.type === 'Reservation').length;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Administrative Command Centre</h2>
        <p>Real-time operational metrics, SLA management, and food-waste insights[cite: 1].</p>
      </div>

      {/* KPI Summary Cards */}
      <div className="metrics-grid">
        <div className="metric-card border-blue">
          <div className="metric-icon blue"><AlertCircle size={22} /></div>
          <div className="metric-data">
            <span className="metric-value">{openComplaints}</span>
            <span className="metric-label">Open Issues</span>
          </div>
        </div>

        <div className="metric-card border-red">
          <div className="metric-icon red"><ShieldAlert size={22} /></div>
          <div className="metric-data">
            <span className="metric-value">{highPriority}</span>
            <span className="metric-label">High Priority</span>
          </div>
        </div>

        <div className="metric-card border-amber">
          <div className="metric-icon amber"><Clock size={22} /></div>
          <div className="metric-data">
            <span className="metric-value">{slaBreached}</span>
            <span className="metric-label">SLA Escalated</span>
          </div>
        </div>

        <div className="metric-card border-green">
          <div className="metric-icon green"><Utensils size={22} /></div>
          <div className="metric-data">
            <span className="metric-value">{reservationsCount}</span>
            <span className="metric-label">Today's Reservations</span>
          </div>
        </div>
      </div>

      {/* Main Analytics Grid */}
      <div className="admin-grid">
        {/* Cases Management Table */}
        <div className="table-card">
          <h3>Active Tickets & Case Escalations</h3>
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Category</th>
                  <th>Details</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cases.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">No active tickets found.</td>
                  </tr>
                ) : (
                  cases.map((c) => (
                    <tr key={c.id}>
                      <td className="font-bold">{c.id}</td>
                      <td>{c.category}</td>
                      <td className="details-cell">{c.details}</td>
                      <td>
                        <span className={`badge ${c.urgency.toLowerCase()}`}>
                          {c.urgency}
                        </span>
                      </td>
                      <td>
                        <span className={`status-pill-table ${c.status.toLowerCase().replace(/\s+/g, '-')}`}>
                          {c.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {c.status !== 'Resolved' && (
                            <button 
                              className="act-btn resolve"
                              onClick={() => onUpdateStatus(c.id, 'Resolved')}
                            >
                              Resolve
                            </button>
                          )}
                          {c.status !== 'Escalated' && c.status !== 'Resolved' && (
                            <button 
                              className="act-btn escalate"
                              onClick={() => onUpdateStatus(c.id, 'Escalated')}
                            >
                              Escalate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Operational & Food Waste Analytics Card */}
        <div className="analytics-card">
          <h3><TrendingDown size={20} /> Food Waste & Operational Insights</h3>
          <p className="analytics-subtitle">Data compiled from reservations, meal claims, and student feedback[cite: 1].</p>

          <div className="stat-highlight">
            <div className="stat-value">18.6 kg</div>
            <div className="stat-desc">Estimated Daily Food Waste Avoided[cite: 1]</div>
          </div>

          <div className="insights-list">
            <div className="insight-item">
              <Scale size={18} className="text-blue" />
              <div>
                <strong>Reservation Accuracy:</strong>
                <p>88% of pre-booked meals were claimed today[cite: 1].</p>
              </div>
            </div>

            <div className="insight-item">
              <Flame size={18} className="text-red" />
              <div>
                <strong>Top Concern:</strong>
                <p>Temperature complaints for breakfast dishes in Mess Block A[cite: 1].</p>
              </div>
            </div>

            <div className="insight-item">
              <CheckCircle size={18} className="text-green" />
              <div>
                <strong>SLA Performance:</strong>
                <p>Average resolution time reduced to 24 minutes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
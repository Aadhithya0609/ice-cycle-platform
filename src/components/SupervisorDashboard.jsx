import React from 'react';
import { Shield, MapPin, Signal, Activity, MessageSquare, CreditCard, Award, Umbrella, Zap } from 'lucide-react';
import { sellers } from '../services/mockData';

const SupervisorDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="header-section">
        <div>
          <h1 className="gradient-text" style={{ fontSize: '2.5rem' }}>Zone Supervisor Hub</h1>
          <p className="text-muted">Monitoring: <b>Chennai South Operations</b></p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="glass-card" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
             <Award size={18} color="var(--accent)" /> Retention: 94%
          </div>
          <div className="glass-card" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
             <Umbrella size={18} color="var(--primary)" /> Monsoon Kits: 100% Issued
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '30px' }}>
        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)' }}>
            <h3>Fleet Management</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '16px 24px' }}>Seller & Vehicle</th>
                <th style={{ padding: '16px 24px' }}>Payment Status</th>
                <th style={{ padding: '16px 24px' }}>Bank Integration</th>
                <th style={{ padding: '16px 24px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--glass-border)', fontSize: '0.9rem' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       <div style={{ padding: '8px', background: s.hasEBike ? 'rgba(112,224,0,0.1)' : 'rgba(148,163,184,0.1)', borderRadius: '8px' }}>
                          <Zap size={16} color={s.hasEBike ? 'var(--secondary)' : 'var(--text-muted)'} />
                       </div>
                       <div>
                          <b>{s.name}</b>
                          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.hasEBike ? 'Electric Cargo' : 'Standard Pedal'}</p>
                       </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--secondary)' }}>
                       Digital: 88%
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                       <CreditCard size={14} color={s.financialStatus === 'Integrated' ? 'var(--secondary)' : 'var(--text-muted)'} />
                       {s.financialStatus}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                     <span style={{ 
                       padding: '4px 8px', borderRadius: '12px', fontSize: '0.7rem',
                       background: s.status === 'Online' ? 'rgba(112,224,0,0.1)' : 'rgba(255,255,255,0.05)',
                       color: s.status === 'Online' ? 'var(--secondary)' : 'var(--text-muted)'
                     }}>
                       {s.status}
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
           <div className="glass-card" style={{ padding: '24px' }}>
              <h3>Retention & Payouts</h3>
              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                 <div style={{ padding: '15px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px' }}>
                    <p className="text-muted" style={{ fontSize: '0.75rem' }}>Top Performer (Quarterly Bonus Eligible)</p>
                    <p style={{ fontWeight: 600, marginTop: '5px' }}>Rajesh (62/60 Days)</p>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '10px' }}>
                       <div style={{ width: '100%', height: '100%', background: 'var(--secondary)' }} />
                    </div>
                 </div>
                 <div style={{ padding: '15px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '16px' }}>
                    <p className="text-muted" style={{ fontSize: '0.75rem' }}>New Onboarding</p>
                    <p style={{ fontWeight: 600, marginTop: '5px' }}>3 Candidates (Vernacular Ready)</p>
                 </div>
              </div>
           </div>

           <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <Umbrella size={18} color="var(--primary)" /> Monsoon Continuity
              </h3>
              <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '10px' }}>
                 Current Risk: <b>LOW (No Rain Forecast)</b>
              </p>
              <p style={{ fontSize: '0.75rem', marginTop: '10px', color: 'var(--text-light)' }}>
                 Schedule adjustment: <b>None Required</b>
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;

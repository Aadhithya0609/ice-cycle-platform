import React from 'react';
import { Shield, MapPin, Signal, Activity, MessageSquare } from 'lucide-react';

const SupervisorDashboard = () => {
  const activeSellers = [
    { id: 1, name: 'Rajesh', zone: 'Sector 4', status: 'Online', stock: '92%', lastSeen: 'Just now' },
    { id: 2, name: 'Saravana', zone: 'Main Street', status: 'Online', stock: '45%', lastSeen: '2m ago' },
    { id: 3, name: 'Vijay', zone: 'Park Road', status: 'Offline', stock: '0%', lastSeen: '1h ago' },
  ];

  return (
    <div className="dashboard-container">
      <div className="header-section">
        <div>
          <h1 className="gradient-text">Supervisor Hub</h1>
          <p className="text-muted">Assigned Zone: <b>Chennai North</b></p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="glass-card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
             <Signal size={16} color="var(--secondary)" /> 12 Sellers Active
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        <div className="glass-card" style={{ padding: '0' }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)' }}>
            <h3>Assigned Sellers</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <th style={{ padding: '16px 24px' }}>SELLER</th>
                <th style={{ padding: '16px 24px' }}>ZONE</th>
                <th style={{ padding: '16px 24px' }}>STOCK</th>
                <th style={{ padding: '16px 24px' }}>STATUS</th>
                <th style={{ padding: '16px 24px' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {activeSellers.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--glass-border)', fontSize: '0.9rem' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <b>{s.name}</b>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: {s.id}0023</div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>{s.zone}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ flex: 1, height: '4px', background: '#334155', borderRadius: '2px', width: '60px' }}>
                        <div style={{ width: s.stock, height: '100%', background: parseInt(s.stock) < 30 ? 'var(--primary)' : 'var(--secondary)', borderRadius: '2px' }} />
                      </div>
                      {s.stock}
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
                  <td style={{ padding: '16px 24px' }}>
                     <button style={{ background: 'var(--glass)', padding: '6px', borderRadius: '8px', color: 'white' }}>
                        <MessageSquare size={16} />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3>Security Feed</h3>
          <div style={{ marginTop: '20px' }}>
            <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.2)', marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Activity size={18} color="#EF4444" />
                <p style={{ fontSize: '0.85rem' }}><b>Sudden Stock Drop</b></p>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '5px' }}>
                Seller <b>Vijay</b> reported 0 stock in 5 mins. Verification required.
              </p>
            </div>
            
            <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={18} color="#3B82F6" />
                <p style={{ fontSize: '0.85rem' }}><b>Route Deviation</b></p>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '5px' }}>
                Seller <b>Saravana</b> is 400m outside assigned zone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;

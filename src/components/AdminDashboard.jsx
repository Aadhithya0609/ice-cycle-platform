import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, ShoppingCart, AlertCircle, Trash2, CloudSun, Box, Timer, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { CHENNAI_CENTER, demandHeatmap, sellers } from '../services/mockData';

const AdminDashboard = () => {
  const [testStatus, setTestStatus] = useState('Idle');
  const [timer, setTimer] = useState(0);

  const startTTLTest = () => {
    setTestStatus('Reservation Active (Stock: 1 → 0)');
    setTimer(10); // Simulating a quick TTL of 10s for the demo
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && testStatus.includes('Active')) {
      setTestStatus('TTL Expired (Stock: 0 → 1 Released)');
      setTimeout(() => setTestStatus('Idle'), 3000);
    }
    return () => clearInterval(interval);
  }, [timer, testStatus]);

  return (
    <div className="dashboard-container">
      <div className="header-section">
        <div>
          <h1 className="gradient-text">Production Command Center</h1>
          <p className="text-muted">Chennai • Real-time Monitoring</p>
        </div>
        <div className="glass-card" style={{ padding: '15px 25px', display: 'flex', gap: '20px' }}>
           <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '0.7rem' }}>Resident Notifications</p>
              <h3 style={{ color: 'var(--secondary)' }}>Active • 1,240 Sent</h3>
           </div>
           <CloudSun size={32} color="var(--accent)" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
        <div className="glass-card" style={{ padding: '24px', height: '400px' }}>
           <MapContainer center={CHENNAI_CENTER} zoom={12} zoomControl={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {demandHeatmap.map((p, i) => <CircleMarker key={i} center={[p[0], p[1]]} radius={25} pathOptions={{fillColor: '#FF5D8F', color: 'transparent', fillOpacity: 0.3}} />)}
           </MapContainer>
        </div>

        {/* TTL CONCURRENCY TESTING LAB */}
        <div className="glass-card" style={{ padding: '30px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
             <Timer color="#3B82F6" size={20} />
             <h3>Concurrency Logic Lab</h3>
          </div>
          <p className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '20px' }}>
            Simulate a 1-unit flash sale and test the 3-minute TTL (Time-To-Live) stock release.
          </p>
          
          <div className="glass-card" style={{ padding: '15px', marginBottom: '20px', textAlign: 'center' }}>
             <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Status</p>
             <h4 style={{ color: timer > 0 ? 'var(--primary)' : 'var(--text-light)', margin: '5px 0' }}>{testStatus}</h4>
             {timer > 0 && <p className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800 }}>{timer}s</p>}
          </div>

          <button 
            onClick={startTTLTest}
            disabled={timer > 0}
            style={{ width: '100%', padding: '12px', background: 'var(--primary)', color: 'white', borderRadius: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            <RefreshCw size={18} /> Simulate 10-Cust Conflict
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

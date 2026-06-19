import React, { useState } from 'react';
import { Users, TrendingUp, ShoppingCart, AlertCircle, ShieldCheck, Lock, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { CHENNAI_CENTER, demandHeatmap, sellers } from '../services/mockData';

const AdminDashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const stats = [
    { label: 'Active Sellers', value: '42', icon: Users, color: '#3B82F6' },
    { label: 'Orders Today', value: '347', icon: ShoppingCart, color: '#10B981' },
    { label: 'Total Revenue', value: '₹12,840', icon: TrendingUp, color: '#F59E0B' },
    { label: 'Stock Alerts', value: '5', icon: AlertCircle, color: '#EF4444' },
  ];

  if (!isAuthorized) {
    return (
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '400px', background: 'var(--card-dark)' }}>
          <Lock size={40} color="#EF4444" style={{ marginBottom: '20px' }} />
          <h3>Secure Command Center</h3>
          <p className="text-muted" style={{ fontSize: '0.8rem', margin: '15px 0' }}>Unauthorized access is monitored. Enter Admin PIN.</p>
          <input 
            type="password" 
            placeholder="PIN (Try 1234)" 
            style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '12px', textAlign: 'center' }}
            onChange={(e) => e.target.value === '1234' && setIsAuthorized(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="header-section">
        <h1 className="gradient-text">Command Center</h1>
        <div className="glass-card" style={{ padding: '8px 16px', color: 'var(--secondary)', fontSize: '0.8rem' }}>• SECURE SESSION</div>
      </div>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="glass-card stat-card">
            <s.icon color={s.color} size={24} />
            <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '10px' }}>{s.label}</p>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px', minHeight: '400px' }}>
        <div className="glass-card" style={{ padding: '20px', overflow: 'hidden' }}>
          <MapContainer center={CHENNAI_CENTER} zoom={11} style={{ height: '350px', width: '100%', borderRadius: '12px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {demandHeatmap.map((p, i) => (
              <CircleMarker key={i} center={[p[0], p[1]]} radius={p[2] * 40} pathOptions={{ color: 'transparent', fillColor: '#FF5D8F', fillOpacity: 0.2 }} />
            ))}
          </MapContainer>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <h3>Network Integrity</h3>
          <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '10px' }}>All seller nodes verified.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

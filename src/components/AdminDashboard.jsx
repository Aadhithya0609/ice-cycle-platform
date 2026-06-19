import React, { useState } from 'react';
import { Users, TrendingUp, ShoppingCart, AlertCircle, ShieldCheck, Lock, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { CHENNAI_CENTER, demandHeatmap, sellers } from '../services/mockData';

const AdminDashboard = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [securityPin, setSecurityPin] = useState('');

  const stats = [
    { label: 'Active Sellers', value: '42', icon: Users, color: '#3B82F6' },
    { label: 'Orders Today', value: '347', icon: ShoppingCart, color: '#10B981' },
    { label: 'Total Revenue', value: '₹12,840', icon: TrendingUp, color: '#F59E0B' },
    { label: 'Stock Alerts', value: '5', icon: AlertCircle, color: '#EF4444' },
  ];

  if (!isAuthorized) {
    return (
      <div className="dashboard-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Lock color="#EF4444" size={30} />
          </div>
          <h3>Admin Authorization</h3>
          <p className="text-muted" style={{ fontSize: '0.8rem', margin: '10px 0 20px' }}>This area contains sensitive revenue and business data. Please enter your terminal security key.</p>
          <input 
            type="password" 
            placeholder="Enter Admin PIN (Type 1234)" 
            className="glass-card"
            style={{ width: '100%', padding: '12px', textAlign: 'center', marginBottom: '20px', color: 'white', border: '1px solid var(--glass-border)' }}
            onChange={(e) => e.target.value === '1234' && setIsAuthorized(true)}
          />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#10B981', fontSize: '0.7rem' }}>
             <ShieldCheck size={14} /> End-to-End Encrypted Session
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="header-section">
        <div>
          <h1 className="gradient-text">Global Command Center</h1>
          <p className="text-muted">High-Fidelity Operations & Revenue Monitoring</p>
        </div>
        <div className="glass-card" style={{ padding: '10px 20px', border: '1px solid var(--secondary)' }}>
           <span style={{ color: 'var(--secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={16} /> SECURE SYSTEM ACTIVE
           </span>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card stat-card">
            <s.icon color={s.color} size={24} />
            <p className="text-muted" style={{ marginTop: '10px' }}>{s.label}</p>
            <div className="stat-value">{s.value}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
        <div className="glass-card" style={{ padding: '24px', height: '500px', display: 'flex', flexDirection: 'column' }}>
          <h3>Demand Heatmap (Chennai Region)</h3>
          <div style={{ flex: 1, marginTop: '20px', borderRadius: '16px', overflow: 'hidden' }}>
            <MapContainer center={CHENNAI_CENTER} zoom={12} zoomControl={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {demandHeatmap.map((point, i) => (
                <CircleMarker key={i} center={[point[0], point[1]]} radius={point[2] * 40} pathOptions={{ fillColor: '#FF5D8F', color: 'transparent', fillOpacity: 0.2 }}>
                  <Tooltip permanent direction="center" className="heatmap-tooltip">{Math.round(point[2] * 100)}%</Tooltip>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '30px' }}>
          <h3>System Integrity</h3>
          <div style={{ marginTop: '20px' }}>
            <div style={{ padding: '12px', borderBottom: '1px solid var(--glass-border)' }}>
               <p style={{ fontSize: '0.85rem' }}>Inventory Sync: <b>HEALTHY</b></p>
               <p className="text-muted" style={{ fontSize: '0.75rem' }}>Last cross-check: 2 mins ago</p>
            </div>
            <div style={{ padding: '12px', borderBottom: '1px solid var(--glass-border)' }}>
               <p style={{ fontSize: '0.85rem' }}>Revenue Reconciliation: <b>COMPLETED</b></p>
               <p className="text-muted" style={{ fontSize: '0.75rem' }}>Settlement key: SEC_0x9212</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

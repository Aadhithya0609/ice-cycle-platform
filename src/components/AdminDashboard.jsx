import React from 'react';
import { Users, TrendingUp, ShoppingCart, AlertCircle, CloudSun, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { CHENNAI_CENTER, demandHeatmap, sellers } from '../services/mockData';

const AdminDashboard = () => {
  const stats = [
    { label: 'Active Sellers', value: '42', icon: Users, color: '#3B82F6' },
    { label: 'Orders Today', value: '347', icon: ShoppingCart, color: '#10B981' },
    { label: 'Total Revenue', value: '₹12,840', icon: TrendingUp, color: '#F59E0B' },
    { label: 'Spoilage Alerts', value: '5', icon: Trash2, color: '#EF4444' },
  ];

  return (
    <div className="dashboard-container">
      <div className="header-section">
        <div>
          <h1 className="gradient-text" style={{ fontSize: '2.5rem' }}>Chennai Operations Command</h1>
          <p className="text-muted">Real-time fleet intelligence and regional heatmaps</p>
        </div>
        <div className="glass-card" style={{ padding: '15px 25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Chennai, Today</p>
            <h3 style={{ color: 'var(--text-light)' }}>38°C • Sunny</h3>
          </div>
          <CloudSun size={32} color="var(--accent)" />
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
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3>Demand Heatmap (Chennai Region)</h3>
            <span style={{ fontSize: '0.8rem', background: 'var(--glass)', padding: '4px 12px', borderRadius: '20px' }}>Live</span>
          </div>
          <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden' }}>
            <MapContainer center={CHENNAI_CENTER} zoom={12} zoomControl={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {demandHeatmap.map((point, i) => (
                <CircleMarker key={i} center={[point[0], point[1]]} radius={point[2] * 40} pathOptions={{ fillColor: '#FF5D8F', color: 'transparent', fillOpacity: 0.3 }}>
                  <Tooltip permanent direction="center" className="heatmap-tooltip">{Math.round(point[2] * 100)}% Demand</Tooltip>
                </CircleMarker>
              ))}
              {sellers.map((s) => (
                <CircleMarker key={s.id} center={s.location} radius={6} pathOptions={{ fillColor: s.status === 'ONLINE' ? '#70E000' : '#94A3B8', color: 'white', weight: 2, fillOpacity: 1 }} />
              ))}
            </MapContainer>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-card" style={{ padding: '30px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
               <AlertCircle color="var(--danger)" size={20} />
               <h3>Critical Alerts</h3>
            </div>
            {sellers.filter(s => Object.values(s.spoiled).some(v => v > 0)).map(s => (
               <div key={s.id} style={{ padding: '15px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.1)', marginBottom: '10px' }}>
                  <b style={{ fontSize: '0.9rem' }}>{s.name}</b>
                  <p style={{ fontSize: '0.8rem' }}>Fridge anomaly detected. Spoilage risk high.</p>
               </div>
            ))}
          </div>
          <div className="glass-card" style={{ padding: '30px' }}>
             <h3>Route AI</h3>
             <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '10px' }}>Optimal distribution achieved in Central Chennai.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

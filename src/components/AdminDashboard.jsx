import React from 'react';
import { Users, TrendingUp, ShoppingCart, AlertCircle, Map as MapIcon, CloudSun, Thermometer, Trash2 } from 'lucide-react';
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
          <p className="text-muted">Live fleet status and demand heatmaps</p>
        </div>
        
        {/* Weather API Integration Mockup */}
        <div className="glass-card" style={{ padding: '15px 25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Chennai, Today</p>
            <h3 style={{ color: 'var(--text-light)' }}>38°C • Sunny</h3>
          </div>
          <CloudSun size={32} color="var(--accent)" />
          <div style={{ borderLeft: '1px solid var(--glass-border)', paddingLeft: '20px' }}>
            <p style={{ fontSize: '0.7rem', color: 'var(--secondary)' }}>Demand Forecast: HIGH</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Deployment Op: 100%</p>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card stat-card"
          >
            <s.icon color={s.color} size={24} />
            <p className="text-muted" style={{ marginTop: '10px' }}>{s.label}</p>
            <div className="stat-value">{s.value}</div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
        {/* Real Map with Demand Heatmap */}
        <div className="glass-card" style={{ padding: '24px', height: '500px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
            <h3>Demand Heatmap (Chennai)</h3>
            <span style={{ fontSize: '0.8rem', background: 'var(--glass)', padding: '4px 12px', borderRadius: '20px' }}>Live Updates every 30s</span>
          </div>
          <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden' }}>
            <MapContainer center={CHENNAI_CENTER} zoom={12} zoomControl={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {demandHeatmap.map((point, i) => (
                <CircleMarker 
                  key={i}
                  center={[point[0], point[1]]}
                  radius={point[2] * 40}
                  pathOptions={{ fillColor: '#FF5D8F', color: 'transparent', fillOpacity: 0.3 }}
                >
                  <Tooltip permanent direction="center" className="heatmap-tooltip">
                    {Math.round(point[2] * 100)}% Demand
                  </Tooltip>
                </CircleMarker>
              ))}
              {sellers.map((s) => (
                <CircleMarker 
                  key={s.id}
                  center={s.location}
                  radius={6}
                  pathOptions={{ fillColor: s.status === 'ONLINE' ? '#70E000' : '#94A3B8', color: 'white', weight: 2, fillOpacity: 1 }}
                />
              ))}
            </MapContainer>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Spoilage / Fridge Alert Panel */}
          <div className="glass-card" style={{ padding: '30px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
               <Trash2 color="var(--danger)" size={20} />
               <h3>Critical Spoilage Alerts</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {sellers.filter(s => Object.values(s.spoiled).some(v => v > 0)).map(s => (
                <div key={s.id} style={{ padding: '15px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <b style={{ fontSize: '0.9rem' }}>{s.name}</b>
                    <span style={{ fontSize: '0.7rem', color: 'var(--danger)' }}>Temp: 14°C ⚠️</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                    Reported {Object.values(s.spoiled).reduce((a,b) => a+b)} units spoiled due to fridge cooling delay.
                  </p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                     <button style={{ flex: 1, padding: '6px', background: 'var(--danger)', color: 'white', borderRadius: '8px', fontSize: '0.7rem' }}>Write Off</button>
                     <button style={{ flex: 1, padding: '6px', background: 'var(--glass)', color: 'var(--text-light)', borderRadius: '8px', fontSize: '0.7rem' }}>View Log</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '30px' }}>
            <h3>Route Efficiency AI</h3>
            <div style={{ marginTop: '15px', color: 'var(--secondary)', fontSize: '0.85rem' }}>
               ✓ Suggesting 15% route deviation in <b>T-Nagar</b> for 2PM burst.
            </div>
            <div style={{ marginTop: '10px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
               Expected sales uplift: <b>+₹450/seller</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

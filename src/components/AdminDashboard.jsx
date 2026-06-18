import React from 'react';
import { Users, TrendingUp, ShoppingCart, AlertCircle, Map as MapIcon, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const stats = [
    { label: 'Active Sellers', value: '42', icon: Users, color: '#3B82F6' },
    { label: 'Orders Today', value: '347', icon: ShoppingCart, color: '#10B981' },
    { label: 'Total Revenue', value: '₹12,840', icon: TrendingUp, color: '#F59E0B' },
    { label: 'Stock Alerts', value: '3', icon: AlertCircle, color: '#EF4444' },
  ];

  return (
    <div className="dashboard-container">
      <div className="header-section">
        <div>
          <h1 className="gradient-text">Global Command Center</h1>
          <p className="text-muted">Real-time oversight of all cycle operations</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button className="glass-card" style={{ padding: '10px 20px', color: 'white' }}>Download Report</button>
          <button className="switch-btn active">Live Map View</button>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div className="glass-card" style={{ padding: '30px', height: '400px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3>Dynamic Heatmap</h3>
            <Layers size={20} color="var(--primary)" />
          </div>
          <div style={{ flex: 1, background: '#0F172A', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
             {/* Simulating a heatmap with glowing dots */}
             <div style={{ position: 'absolute', top: '40%', left: '30%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(255,93,143,0.3) 0%, transparent 70%)' }} />
             <div style={{ position: 'absolute', top: '60%', left: '70%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(112,224,0,0.2) 0%, transparent 70%)' }} />
             <div style={{ padding: '20px' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>High demand detected in <b>Chennai Central</b> Area</p>
             </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '30px' }}>
          <h3>Recent Inventory Events</h3>
          <div style={{ marginTop: '20px' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 0', borderBottom: '1px solid var(--glass-border)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === 3 ? 'var(--primary)' : 'var(--secondary)' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.9rem' }}>{i === 3 ? 'Stock Exhausted: Mango Cup' : 'Bulk Sale: 5 Chocolate Cones'}</p>
                  <p className="text-muted" style={{ fontSize: '0.75rem' }}>Seller: Rajesh • Anna Nagar</p>
                </div>
                <p className="text-muted" style={{ fontSize: '0.75rem' }}>2 min ago</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

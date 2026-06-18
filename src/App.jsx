import React, { useState, useEffect } from 'react';
import SellerApp from './components/SellerApp';
import CustomerApp from './components/CustomerApp';
import AdminDashboard from './components/AdminDashboard';
import SupervisorDashboard from './components/SupervisorDashboard';
import { Sun, Moon, Info } from 'lucide-react';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('customer');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);
  
  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Platform Version Header */}
      <div style={{ 
        background: 'var(--primary)', color: 'white', padding: '8px 20px', 
        fontSize: '0.75rem', fontWeight: 800, textAlign: 'center', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' 
      }}>
        <Info size={14} /> NEW: ICECYCLE PLATFORM v2.0 READY (CHENNAI REGION)
      </div>

      {/* Theme Toggle */}
      <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Switcher for presentation purposes */}
      <div className="view-switcher">
        <button className={`switch-btn ${currentView === 'customer' ? 'active' : ''}`} onClick={() => setCurrentView('customer')}>Customer</button>
        <button className={`switch-btn ${currentView === 'seller' ? 'active' : ''}`} onClick={() => setCurrentView('seller')}>Seller</button>
        <button className={`switch-btn ${currentView === 'admin' ? 'active' : ''}`} onClick={() => setCurrentView('admin')}>Admin</button>
        <button className={`switch-btn ${currentView === 'supervisor' ? 'active' : ''}`} onClick={() => setCurrentView('supervisor')}>Supervisor</button>
      </div>

      <main className="content">
        {currentView === 'seller' && <SellerApp />}
        {currentView === 'customer' && <CustomerApp />}
        {currentView === 'admin' && <AdminDashboard />}
        {currentView === 'supervisor' && <SupervisorDashboard />}
      </main>
    </div>
  );
}

export default App;

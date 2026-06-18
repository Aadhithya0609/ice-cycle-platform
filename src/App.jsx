import React, { useState, useEffect } from 'react';
import SellerApp from './components/SellerApp';
import CustomerApp from './components/CustomerApp';
import AdminDashboard from './components/AdminDashboard';
import SupervisorDashboard from './components/SupervisorDashboard';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('customer'); // Default to customer for first impression
  
  return (
    <div className="app-container">
      {/* Switcher for presentation purposes */}
      <div className="view-switcher">
        <button 
          className={`switch-btn ${currentView === 'customer' ? 'active' : ''}`}
          onClick={() => setCurrentView('customer')}
        >
          Customer
        </button>
        <button 
          className={`switch-btn ${currentView === 'seller' ? 'active' : ''}`}
          onClick={() => setCurrentView('seller')}
        >
          Seller
        </button>
        <button 
          className={`switch-btn ${currentView === 'admin' ? 'active' : ''}`}
          onClick={() => setCurrentView('admin')}
        >
          Admin
        </button>
        <button 
          className={`switch-btn ${currentView === 'supervisor' ? 'active' : ''}`}
          onClick={() => setCurrentView('supervisor')}
        >
          Supervisor
        </button>
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

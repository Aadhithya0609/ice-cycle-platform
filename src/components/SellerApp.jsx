import React, { useState } from 'react';
import { Power, MapPin, Package, Plus, Mic, CheckCircle } from 'lucide-react';
import { flavours, initialInventory } from '../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const SellerApp = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [inventory, setInventory] = useState(initialInventory);
  const [salesSession, setSalesSession] = useState({ total: 0, items: 0 });
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);

  const handleSale = (id) => {
    if (inventory[id] > 0) {
      setInventory(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setSalesSession(prev => ({ 
        total: prev.total + flavours.find(f => f.id === id).price,
        items: prev.items + 1
      }));
    }
  };

  const handleVoiceCommand = () => {
    setShowVoiceOverlay(true);
    setTimeout(() => {
      setShowVoiceOverlay(false);
      handleSale('choc_cone'); // Simulating "Sold 1 chocolate cone"
    }, 2000);
  };

  return (
    <div className="mobile-frame">
      <div className="app-header">
        <div>
          <h2 className="gradient-text">Seller App</h2>
          <p className="text-muted" style={{fontSize: '0.8rem'}}>Rajesh • Anna Nagar</p>
        </div>
        <button 
          onClick={() => setIsOnline(!isOnline)}
          style={{ background: isOnline ? 'var(--secondary)' : '#334155', padding: '10px', borderRadius: '12px' }}
        >
          <Power size={20} color="white" />
        </button>
      </div>

      {!isOnline ? (
        <div style={{ padding: '40px', textAlign: 'center', marginTop: '100px' }}>
          <div className="glass-card" style={{ padding: '40px' }}>
            <div className="pulse-animation" style={{ marginBottom: '20px' }}>
              <Package size={64} color="var(--primary)" />
            </div>
            <h3>Shift is Offline</h3>
            <p className="text-muted" style={{ margin: '10px 0 30px' }}>Go online to start tracking location and inventory.</p>
            <button 
              className="switch-btn active" 
              style={{ width: '100%', padding: '16px' }}
              onClick={() => setIsOnline(true)}
            >
              Start Shift
            </button>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div style={{ padding: '20px' }}>
            <div className="glass-card" style={{ padding: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p className="text-muted">Session Sales</p>
                <h3>₹{salesSession.total}</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="text-muted">Items</p>
                <h3>{salesSession.items}</h3>
              </div>
            </div>

            <h4 style={{ marginBottom: '16px' }}>Inventory Management</h4>
            <div className="inventory-grid">
              {flavours.map(f => (
                <div key={f.id} className="glass-card flavour-card">
                  <img src={f.image} className="flavour-img" alt={f.name} />
                  <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{f.name}</p>
                  <p className="gradient-text" style={{ fontWeight: 800 }}>{inventory[f.id]} left</p>
                  <button 
                    onClick={() => handleSale(f.id)}
                    style={{ marginTop: '10px', background: 'var(--primary)', color: 'white', padding: '6px 12px', borderRadius: '10px', width: '100%' }}
                    disabled={inventory[f.id] === 0}
                  >
                    <Plus size={16} /> Sold
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <button className="voice-fab" onClick={handleVoiceCommand}>
            <div className="voice-visualizer"></div>
            <Mic size={24} />
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {showVoiceOverlay && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ 
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              background: 'rgba(0,0,0,0.9)', padding: '30px', borderRadius: '24px', zIndex: 100,
              textAlign: 'center', width: '80%'
            }}
          >
            <Mic size={48} color="var(--primary)" className="pulse-animation" />
            <h3 style={{ marginTop: '20px' }}>Listening...</h3>
            <p className="text-muted">"Add 1 chocolate cone sold"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SellerApp;

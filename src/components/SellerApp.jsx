import React, { useState } from 'react';
import { Power, MapPin, Package, Plus, Mic, CheckCircle, Smartphone, AlertTriangle, PhoneCall, QrCode } from 'lucide-react';
import { flavours, initialInventory } from '../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const SellerApp = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [inventory, setInventory] = useState(initialInventory);
  const [spoiled, setSpoiled] = useState({ choc_cone: 0, mango_cup: 0, vanilla_bar: 0, strawberry_bar: 0 });
  const [salesSession, setSalesSession] = useState({ total: 0, items: 0 });
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleSale = (id) => {
    if (inventory[id] > 0) {
      setInventory(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setSalesSession(prev => ({ 
        total: prev.total + flavours.find(f => f.id === id).price,
        items: prev.items + 1
      }));
    }
  };

  const reportSpoilage = (id) => {
     if (inventory[id] > 0) {
        setInventory(prev => ({ ...prev, [id]: prev[id] - 1 }));
        setSpoiled(prev => ({ ...prev, [id]: prev[id] + 1 }));
     }
  };

  return (
    <div className="mobile-frame">
      <div className="app-header">
        <div>
          <h2 className="gradient-text">Seller Hub</h2>
          <p className="text-muted" style={{fontSize: '0.8rem'}}>Rajesh • Anna Nagar Zone</p>
        </div>
        <button 
          onClick={() => setIsOnline(!isOnline)}
          style={{ background: isOnline ? 'var(--secondary)' : '#334155', padding: '10px', borderRadius: '12px' }}
        >
          <Power size={20} color="white" />
        </button>
      </div>

      {!isOnline ? (
        <div style={{ padding: '40px', textAlign: 'center', marginTop: '60px' }}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass-card" style={{ padding: '40px' }}>
            <Package size={64} color="var(--primary)" style={{ marginBottom: '20px' }} />
            <h3>Offline</h3>
            <p className="text-muted" style={{ margin: '10px 0 30px' }}>Your current zone is <b>Chennai Central</b>. Start shift to show on map.</p>
            <button 
              className="switch-btn active" 
              style={{ width: '100%', padding: '16px' }}
              onClick={() => setIsOnline(true)}
            >
              Go Online
            </button>
          </motion.div>
          
          <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
             <button style={{ flex: 1, padding: '12px', background: 'var(--glass)', borderRadius: '12px', color: 'var(--text-light)', fontSize: '0.8rem' }}>
                <PhoneCall size={16} /> IVR Help
             </button>
             <button style={{ flex: 1, padding: '12px', background: 'var(--glass)', borderRadius: '12px', color: 'var(--text-light)', fontSize: '0.8rem' }}>
                <Smartphone size={16} /> My Route
             </button>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
               <div className="glass-card" style={{ padding: '15px' }}>
                  <p className="text-muted" style={{fontSize: '0.7rem'}}>Sales</p>
                  <h3>₹{salesSession.total}</h3>
               </div>
               <div className="glass-card" style={{ padding: '15px' }}>
                  <p className="text-muted" style={{fontSize: '0.7rem'}}>Items</p>
                  <h3>{salesSession.items}</h3>
               </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4>Stock Management</h4>
                <button 
                  onClick={() => setShowQR(true)}
                  style={{ background: 'var(--accent)', padding: '6px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', fontWeight: 600, color: '#000' }}
                >
                  <QrCode size={16} /> UPI Pay
                </button>
            </div>

            <div className="inventory-grid" style={{ marginBottom: '80px' }}>
              {flavours.map(f => (
                <div key={f.id} className="glass-card flavour-card" style={{ padding: '12px' }}>
                  <img src={f.image} className="flavour-img" style={{ width: '60px', height: '60px' }} />
                  <p style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-light)' }}>{f.name}</p>
                  <p className="gradient-text" style={{ fontWeight: 800 }}>{inventory[f.id]} left</p>
                  
                  <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                    <button 
                      onClick={() => handleSale(f.id)}
                      style={{ flex: 2, background: 'var(--primary)', color: 'white', padding: '6px', borderRadius: '8px', fontSize: '0.7rem' }}
                    >
                      <Plus size={14} /> Sold
                    </button>
                    <button 
                      onClick={() => reportSpoilage(f.id)}
                      title="Report Spoilage"
                      style={{ flex: 1, background: 'var(--glass)', color: 'var(--danger)', padding: '6px', borderRadius: '8px' }}
                    >
                      <AlertTriangle size={14} />
                    </button>
                  </div>
                  {spoiled[f.id] > 0 && <p style={{ fontSize: '0.65rem', color: 'var(--danger)', marginTop: '5px' }}>{spoiled[f.id]} Spoiled</p>}
                </div>
              ))}
            </div>
          
            <button className="voice-fab" onClick={() => setShowVoiceOverlay(true)}>
              <Mic size={24} />
            </button>
        </motion.div>
      )}

      {/* UPI QR Simulation Overlay */}
      <AnimatePresence>
        {showQR && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="glass-card"
            style={{ 
              position: 'absolute', top: 50, left: 20, right: 20, bottom: 50, zIndex: 1000,
              background: '#fff', color: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px'
            }}
          >
            <button onClick={() => setShowQR(false)} style={{ position: 'absolute', top: 20, right: 20 }}><X size={24} /></button>
            <h3>Accept Payment</h3>
            <div style={{ width: '200px', height: '200px', background: '#eee', margin: '20px 0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <QrCode size={150} />
            </div>
            <p className="text-muted" style={{ textAlign: 'center' }}>Scan to pay using any UPI app (GPay, PhonePe, Paytm)</p>
            <div style={{ background: '#70E00022', padding: '10px', borderRadius: '10px', color: '#70E000', fontSize: '0.8rem', marginTop: '20px' }}>
                ✓ Connected to IceCycle Settlement
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVoiceOverlay && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            style={{ 
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              background: 'rgba(0,0,0,0.9)', padding: '30px', borderRadius: '24px', zIndex: 1000,
              textAlign: 'center', width: '80%', color: 'white'
            }}
          >
            <Mic size={48} color="var(--primary)" className="pulse-animation" />
            <h3 style={{ marginTop: '20px' }}>Voice Control</h3>
            <p style={{ color: '#94A3B8' }}>Say: "Add 2 chocolate cups sold"</p>
            <button onClick={() => setShowVoiceOverlay(false)} style={{ marginTop: '20px', color: '#94A3B8' }}>Cancel</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const X = ({ size }) => <Smartphone size={size} style={{ transform: 'rotate(45deg)' }} />;

export default SellerApp;

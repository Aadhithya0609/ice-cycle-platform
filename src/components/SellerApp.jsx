import React, { useState } from 'react';
import { Power, Package, Plus, Mic, AlertTriangle, PhoneCall, QrCode, Zap, Umbrella, Languages, Landmark, Volume2 } from 'lucide-react';
import { flavours, initialInventory } from '../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const SellerApp = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [lang, setLang] = useState('English');
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
          <h2 className="gradient-text">{lang === 'English' ? 'Seller Hub' : 'सेलर हब'}</h2>
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <span style={{ fontSize: '0.65rem', background: 'rgba(112,224,0,0.1)', color: 'var(--secondary)', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
               <Zap size={10} /> E-Bike Active
            </span>
            <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
               <Umbrella size={10} /> Kit: OK
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setLang(lang === 'English' ? 'Hindi' : 'English')}
            style={{ background: 'var(--glass)', padding: '8px', borderRadius: '12px', color: 'var(--text-light)' }}
          >
            <Languages size={18} />
          </button>
          <button 
            onClick={() => setIsOnline(!isOnline)}
            style={{ background: isOnline ? 'var(--secondary)' : '#334155', padding: '10px', borderRadius: '12px' }}
          >
            <Power size={20} color="white" />
          </button>
        </div>
      </div>

      {!isOnline ? (
        <div style={{ padding: '24px', textAlign: 'center', marginTop: '40px' }}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass-card" style={{ padding: '30px' }}>
            <Package size={48} color="var(--primary)" style={{ marginBottom: '15px' }} />
            <h3>{lang === 'English' ? 'Start Your Shift' : 'शिफ्ट शुरू करें'}</h3>
            <p className="text-muted" style={{ fontSize: '0.8rem', margin: '10px 0 20px' }}>
               {lang === 'English' ? 'Chennai Central Zone • High Demand Forecast' : 'चेन्नई सेंट्रल जोन • उच्च मांग पूर्वानुमान'}
            </p>
            <button 
              className="switch-btn active" 
              style={{ width: '100%', padding: '16px' }}
              onClick={() => setIsOnline(true)}
            >
              {lang === 'English' ? 'Go Online' : 'ऑनलाइन जाएं'}
            </button>
          </motion.div>

          <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
             <button className="glass-card" style={{ padding: '15px', color: 'var(--text-light)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <Landmark size={20} color="var(--secondary)" />
                <span style={{ fontSize: '0.7rem' }}>Bank Status</span>
             </button>
             <button className="glass-card" style={{ padding: '15px', color: 'var(--text-light)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <PhoneCall size={20} color="var(--primary)" />
                <span style={{ fontSize: '0.7rem' }}>IVR Support</span>
             </button>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
               <div className="glass-card" style={{ padding: '15px' }}>
                  <p className="text-muted" style={{fontSize: '0.7rem'}}>{lang === 'English' ? 'Earnings' : 'कमाई'}</p>
                  <h3>₹{salesSession.total}</h3>
               </div>
               <div className="glass-card" style={{ padding: '15px' }}>
                  <p className="text-muted" style={{fontSize: '0.7rem'}}>{lang === 'English' ? 'Items Sold' : 'बेचे गए आइटम'}</p>
                  <h3>{salesSession.items}</h3>
               </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h4>{lang === 'English' ? 'Live Inventory' : 'लाइव स्टॉक'}</h4>
                <button 
                  onClick={() => setShowQR(true)}
                  style={{ background: 'var(--accent)', padding: '6px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', fontWeight: 600, color: '#000' }}
                >
                  <QrCode size={16} /> {lang === 'English' ? 'UPI' : 'यूपीआई'}
                </button>
            </div>

            <div className="inventory-grid" style={{ marginBottom: '80px' }}>
              {flavours.map(f => (
                <div key={f.id} className="glass-card flavour-card" style={{ padding: '8px' }}>
                  <img src={f.image} className="flavour-img" style={{ width: '50px', height: '50px' }} />
                  <p style={{ fontWeight: 600, fontSize: '0.75rem', color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    {f.name} <Volume2 size={12} className="text-muted" />
                  </p>
                  <p className="gradient-text" style={{ fontWeight: 800, fontSize: '0.9rem' }}>{inventory[f.id]}</p>
                  
                  <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                    <button onClick={() => handleSale(f.id)} style={{ flex: 2, background: 'var(--primary)', color: 'white', padding: '4px', borderRadius: '6px', fontSize: '0.65rem' }}>
                      <Plus size={12} /> {lang === 'English' ? 'Sale' : 'बिक्री'}
                    </button>
                    <button onClick={() => reportSpoilage(f.id)} style={{ flex: 1, background: 'var(--glass)', color: 'var(--danger)', padding: '4px', borderRadius: '6px' }}>
                      <AlertTriangle size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          
            <button className="voice-fab" onClick={() => setShowVoiceOverlay(true)}>
              <Mic size={24} />
            </button>
        </motion.div>
      )}

      {/* QR Overlay and Voice Overlay same as before... */}
      <AnimatePresence>
        {showQR && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-card" style={{ position: 'absolute', top: 50, left: 20, right: 20, bottom: 50, zIndex: 1000, background: '#fff', color: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
            <button onClick={() => setShowQR(false)} style={{ position: 'absolute', top: 20, right: 20, color: '#000' }}>X</button>
            <h3 style={{fontSize: '1rem'}}>Payment QR</h3>
            <div style={{ width: '180px', height: '180px', background: '#eee', margin: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><QrCode size={140} /></div>
            <p style={{ fontSize: '0.8rem', textAlign: 'center', color: '#666' }}>ID: {salesSession.total > 0 ? `TRX_${Math.random().toString(36).substr(2, 5).toUpperCase()}` : 'Ready'}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showVoiceOverlay && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0,0,0,0.95)', padding: '30px', borderRadius: '24px', zIndex: 1000, textAlign: 'center', width: '80%', color: 'white' }}>
            <Mic size={48} color="var(--primary)" className="pulse-animation" />
            <h3 style={{ marginTop: '20px' }}>{lang === 'English' ? 'Listening...' : 'सुन रहे हैं...'}</h3>
            <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>"Add 2 chocolate cups"</p>
            <button onClick={() => setShowVoiceOverlay(false)} style={{ marginTop: '20px', color: '#94A3B8' }}>Cancel</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SellerApp;

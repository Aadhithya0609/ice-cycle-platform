import React, { useState } from 'react';
import { Power, Package, Plus, Mic, AlertTriangle, PhoneCall, QrCode, Zap, Umbrella, Languages, Navigation2, MapPin } from 'lucide-react';
import { flavours, initialInventory } from '../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const SellerApp = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [langIdx, setLangIdx] = useState(0);
  const [inventory, setInventory] = useState(initialInventory);
  const [salesSession, setSalesSession] = useState({ total: 0, items: 0 });
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);

  const translations = [
    { label: 'English', hub: 'Seller Hub', start: 'Start Shift', items: 'Items Sold', earnings: 'Earnings', sale: 'Sale', suggestion: 'Suggested: P.H. Road Corridor' },
    { label: 'தமிழ் (Tamil)', hub: 'விற்பனையாளர் மையம்', start: 'ஷிப்டைத் தொடங்கு', items: 'விற்கப்பட்டவை', earnings: 'வருமானம்', sale: 'விற்பனை', suggestion: 'பரிந்துரை: பி.எச். சாலை' },
    { label: 'हिन्दी (Hindi)', hub: 'सेलर हब', start: 'शिफ्ट शुरू करें', items: 'बेचे गए आइटम', earnings: 'कमाई', sale: 'बिक्री', suggestion: 'सुझाव: पी.एच. रोड' },
    { label: 'తెలుగు (Telugu)', hub: 'సెల్లర్ హబ్', start: 'షిఫ్ట్ ప్రారంభించండి', items: 'అమ్మిన వస్తువులు', earnings: 'సంపాదన', sale: 'అమ్మకం', suggestion: 'సూచన: పి.హెచ్. రోడ్' },
    { label: 'മലയാളം (Malayalam)', hub: 'സെല്ലർ ഹബ്', start: 'ഷിഫ്റ്റ് ആരംഭിക്കുക', items: 'വിറ്റ ഇനങ്ങൾ', earnings: 'വരുമാനം', sale: 'വിൽപന', suggestion: 'നിർദ്ദേശിച്ചത്: പി.എച്ച് റോഡ്' }
  ];

  const t = translations[langIdx];

  const handleLangToggle = () => setLangIdx((prev) => (prev + 1) % translations.length);

  return (
    <div className="mobile-frame">
      <div className="app-header">
        <div>
          <h2 className="gradient-text">{t.hub}</h2>
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <span style={{ fontSize: '0.6rem', background: 'rgba(112,224,0,0.1)', color: 'var(--secondary)', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
               <Zap size={10} /> 84%
            </span>
            <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{t.label}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleLangToggle} style={{ background: 'var(--glass)', padding: '10px', borderRadius: '12px', color: 'var(--text-light)' }}>
            <Languages size={18} />
          </button>
          <button onClick={() => setIsOnline(!isOnline)} style={{ background: isOnline ? 'var(--secondary)' : '#334155', padding: '10px', borderRadius: '12px' }}>
            <Power size={20} color="white" />
          </button>
        </div>
      </div>

      {!isOnline ? (
        <div style={{ padding: '24px', textAlign: 'center', marginTop: '40px' }}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass-card" style={{ padding: '30px' }}>
            <MapPin size={48} color="var(--primary)" style={{ marginBottom: '15px' }} />
            <h3>{t.start}</h3>
            <p className="text-muted" style={{ fontSize: '0.8rem', margin: '10px 0 20px' }}>Current Zone: <b>Anna Nagar</b></p>
            <button className="switch-btn active" style={{ width: '100%', padding: '16px' }} onClick={() => setIsOnline(true)}>{t.start}</button>
          </motion.div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '20px' }}>
            {/* AI Place Suggestion (Route Optimization logic) */}
            <div className="glass-card" style={{ padding: '12px 15px', marginBottom: '20px', border: '1px solid var(--secondary)', background: 'rgba(112,224,0,0.05)', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <Navigation2 size={16} color="var(--secondary)" />
               <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--secondary)' }}>{t.suggestion}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
               <div className="glass-card" style={{ padding: '15px' }}>
                  <p className="text-muted" style={{fontSize: '0.65rem'}}>{t.earnings}</p>
                  <h3>₹{salesSession.total}</h3>
               </div>
               <div className="glass-card" style={{ padding: '15px' }}>
                  <p className="text-muted" style={{fontSize: '0.65rem'}}>{t.items}</p>
                  <h3>{salesSession.items}</h3>
               </div>
            </div>

            <div className="inventory-grid" style={{ marginBottom: '80px' }}>
              {flavours.map(f => (
                <div key={f.id} className="glass-card flavour-card" style={{ padding: '8px' }}>
                  <img src={f.image} style={{ width: '50px', height: '50px', borderRadius: '50%', marginBottom: '8px', objectFit: 'cover' }} />
                  <p style={{ fontWeight: 600, fontSize: '0.7rem', color: 'var(--text-light)' }}>{f.name}</p>
                  <p className="gradient-text" style={{ fontWeight: 800 }}>{inventory[f.id]}</p>
                  <button onClick={() => setSalesSession(p => ({...p, total: p.total + f.price, items: p.items + 1}))} style={{ marginTop: '8px', width: '100%', background: 'var(--primary)', color: 'white', padding: '6px', borderRadius: '6px', fontSize: '0.6rem' }}>
                    {t.sale}
                  </button>
                </div>
              ))}
            </div>
            <button className="voice-fab" onClick={() => setShowVoiceOverlay(true)}><Mic size={24} /></button>
        </motion.div>
      )}

      {/* Voice Overlay logic remains same... */}
      <AnimatePresence>
        {showVoiceOverlay && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(0,0,0,0.95)', padding: '30px', borderRadius: '24px', zIndex: 1000, textAlign: 'center', width: '80%', color: 'white' }}>
            <Mic size={48} color="var(--primary)" className="pulse-animation" />
            <h3 style={{ marginTop: '20px' }}>Listening...</h3>
            <button onClick={() => setShowVoiceOverlay(false)} style={{ marginTop: '20px', color: '#94A3B8' }}>Cancel</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SellerApp;

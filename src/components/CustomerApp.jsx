import React, { useState } from 'react';
import { Search, MapPin, Navigation, ShoppingBag, Star } from 'lucide-react';
import { flavours, sellers } from '../services/mockData';
import { motion } from 'framer-motion';

const CustomerApp = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isOrdering, setIsOrdering] = useState(false);

  return (
    <div className="mobile-frame">
      <div className="map-placeholder">
        {sellers.map((s, i) => (
          <div 
            key={s.id} 
            className="map-pin pulse-animation" 
            style={{ 
              top: 100 + i * 150, 
              left: 50 + i * 120,
              filter: selectedSeller?.id === s.id ? 'hue-rotate(90deg)' : 'none'
            }}
            onClick={() => setSelectedSeller(s)}
          />
        ))}

        <div className="app-header" style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'transparent' }}>
          <div className="glass-card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', width: '100%', gap: '10px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              placeholder="Find chocolate ice cream..." 
              style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none' }}
            />
          </div>
        </div>

        {selectedSeller && (
          <motion.div 
            initial={{ y: 300 }} 
            animate={{ y: 0 }}
            style={{ 
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'var(--bg-dark)', borderTopLeftRadius: '32px', borderTopRightRadius: '32px',
              padding: '30px', borderTop: '2px solid var(--primary)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2>{selectedSeller.name}'s Cycle</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <MapPin size={14} /> 200m away • <Star size={14} color="var(--accent)" fill="var(--accent)" /> 4.8
                </div>
              </div>
              <button 
                onClick={() => setSelectedSeller(null)}
                style={{ background: 'var(--glass)', padding: '5px 12px', borderRadius: '20px', color: 'white' }}
              >
                Close
              </button>
            </div>

            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }}>
              {flavours.map(f => (
                <div key={f.id} className="glass-card" style={{ minWidth: '140px', padding: '12px', textAlign: 'center' }}>
                  <img src={f.image} style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '8px' }} />
                  <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>{f.name}</p>
                  <p className="gradient-text">₹{f.price}</p>
                  <button 
                    onClick={() => setIsOrdering(true)}
                    style={{ background: 'var(--primary)', color: 'white', fontSize: '0.7rem', padding: '4px 10px', borderRadius: '8px', marginTop: '8px' }}
                  >
                    Quick Order
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {isOrdering && (
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(15,23,42,0.95)', zIndex: 100, padding: '40px', textAlign: 'center'
        }}>
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
            <ShoppingBag size={80} color="var(--secondary)" style={{ marginBottom: '20px' }} />
            <h2 className="gradient-text">Order Placed!</h2>
            <p className="text-muted" style={{ margin: '20px 0' }}>
              Rajesh has received your order for 1 Chocolate Cone. He's arriving in 4 minutes.
            </p>
            <div className="glass-card" style={{ padding: '20px', marginBottom: '40px' }}>
              <p>Payment: <b>Cash on Delivery</b></p>
              <p>Total: <b>₹40</b></p>
            </div>
            <button 
              className="switch-btn active" 
              style={{ width: '100%', padding: '16px' }}
              onClick={() => setIsOrdering(false)}
            >
              Track on Map
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CustomerApp;

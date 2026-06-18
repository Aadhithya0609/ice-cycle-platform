import React, { useState } from 'react';
import { Search, MapPin, Navigation, ShoppingBag, Star, X } from 'lucide-react';
import { flavours, sellers, CHENNAI_CENTER } from '../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Custom Marker Icon for IceCream Cycle
const cycleIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/565/565410.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
});

const CustomerApp = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isOrdering, setIsOrdering] = useState(false);

  return (
    <div className="mobile-frame">
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        <MapContainer center={CHENNAI_CENTER} zoom={13} zoomControl={false} style={{ height: '100%', width: '100%', minHeight: '400px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {sellers.map((s) => (
            s.status === 'ONLINE' && (
              <Marker 
                key={s.id} 
                position={s.location} 
                icon={cycleIcon}
                eventHandlers={{ click: () => setSelectedSeller(s) }}
              />
            )
          ))}
        </MapContainer>

        <div className="app-header" style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'transparent', zIndex: 1000 }}>
          <div className="glass-card" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', width: '100%', gap: '10px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              placeholder="Find nearby ice cream..." 
              style={{ background: 'transparent', border: 'none', color: 'var(--text-light)', width: '100%', outline: 'none' }}
            />
          </div>
        </div>

        <AnimatePresence>
          {selectedSeller && (
            <motion.div 
              initial={{ y: 300 }} 
              animate={{ y: 0 }}
              exit={{ y: 400 }}
              style={{ 
                position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1001,
                background: 'var(--card-dark)', borderTopLeftRadius: '32px', borderTopRightRadius: '32px',
                padding: '30px', borderTop: '2px solid var(--primary)',
                boxShadow: '0 -10px 40px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ color: 'var(--text-light)' }}>{selectedSeller.name}'s Cycle</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    <MapPin size={14} /> Anna Nagar, Chennai • <Star size={14} color="var(--accent)" fill="var(--accent)" /> 4.9
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedSeller(null)}
                  style={{ background: 'var(--glass)', padding: '5px', borderRadius: '50%', color: 'var(--text-light)' }}
                >
                  <X size={20} />
                </button>
              </div>

              <h4 style={{ marginBottom: '15px', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Flavours Available</h4>
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }}>
                {flavours.map(f => (
                  <div key={f.id} className="glass-card" style={{ minWidth: '130px', padding: '12px', textAlign: 'center' }}>
                    <img src={f.image} style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '8px', objectFit: 'cover' }} />
                    <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>{f.name}</p>
                    <p className="gradient-text" style={{ fontWeight: 800 }}>₹{f.price}</p>
                    <button 
                      onClick={() => setIsOrdering(true)}
                      style={{ background: 'var(--primary)', color: 'white', fontSize: '0.7rem', padding: '6px 12px', borderRadius: '10px', marginTop: '8px', width: '100%' }}
                    >
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="glass-card" style={{ marginTop: '20px', padding: '15px', color: 'var(--secondary)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Star size={16} fill="var(--secondary)" />
                <span>Loyalty: Buy 1 more to get your free Mango Cup!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isOrdering && (
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(15,23,42,0.95)', zIndex: 2000, padding: '40px', textAlign: 'center',
          display: 'flex', flexDirection: 'column', justifyContent: 'center'
        }}>
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
            <ShoppingBag size={80} color="var(--secondary)" style={{ marginBottom: '20px' }} />
            <h2 className="gradient-text" style={{ fontSize: '2rem' }}>Order Placed!</h2>
            <p className="text-muted" style={{ margin: '20px 0' }}>
              Your order for <b>1 Chocolate Cone</b> is confirmed. Seller is navigating to your GPS location.
            </p>
            <div className="glass-card" style={{ padding: '20px', marginBottom: '40px' }}>
              <p>Estimated Arrival: <b>3 mins</b></p>
              <p>Payment: <b>Cash / UPI on Delivery</b></p>
            </div>
            <button 
              className="switch-btn active" 
              style={{ width: '100%', padding: '18px', fontSize: '1rem' }}
              onClick={() => setIsOrdering(false)}
            >
              Track Order
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CustomerApp;

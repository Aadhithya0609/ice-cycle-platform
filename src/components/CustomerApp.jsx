import React, { useState, useEffect } from 'react';
import { Search, MapPin, Navigation, ShoppingBag, Star, X, Bell, MessageCircle } from 'lucide-react';
import { flavours, sellers, CHENNAI_CENTER } from '../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';

const cycleIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/565/565410.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

// Component to handle auto-centering on user location
const LocationMarker = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 15);
    }
  }, [coords, map]);
  return coords ? (
    <Marker position={coords} icon={new L.Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/9131/9131546.png',
      iconSize: [30, 30],
    })} />
  ) : null;
}

const CustomerApp = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isOrdering, setIsOrdering] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [optedIn, setOptedIn] = useState(false);

  useEffect(() => {
    // REQUEST LIVE LOCATION PERMISSION
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.warn("GPS Access Denied")
      );
    }
  }, []);

  return (
    <div className="mobile-frame">
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        <MapContainer center={CHENNAI_CENTER} zoom={13} zoomControl={false} style={{ height: '100%', width: '100%', minHeight: '400px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker coords={userLocation} />
          {sellers.map((s) => s.status === 'ONLINE' && (
            <Marker key={s.id} position={s.location} icon={cycleIcon} eventHandlers={{ click: () => setSelectedSeller(s) }} />
          ))}
        </MapContainer>

        <div className="app-header" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000 }}>
          <div className="glass-card" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', width: '100%', gap: '10px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              placeholder="Search flavours..." 
              style={{ background: 'transparent', border: 'none', color: 'var(--text-light)', width: '100%', outline: 'none' }}
              onChange={(e) => console.log("Searching for:", e.target.value)}
            />
          </div>
        </div>

        {/* WhatsApp Broadcast Opt-in (Resident Notification logic) */}
        {!selectedSeller && !isOrdering && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ position: 'absolute', top: 80, left: 20, right: 20, zIndex: 1000 }}
          >
             <div className="glass-card" style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px', background: optedIn ? 'rgba(112,224,0,0.2)' : 'var(--glass)' }}>
                <div style={{ background: '#25D366', padding: '10px', borderRadius: '12px' }}>
                   <MessageCircle size={20} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                   <p style={{ fontSize: '0.8rem', fontWeight: 700 }}>{optedIn ? 'Subscribed!' : 'Neighborhood Alerts'}</p>
                   <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Get WhatsApp pings when sellers arrive nearby.</p>
                </div>
                <button 
                  onClick={() => setOptedIn(!optedIn)}
                  style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '0.7rem', fontWeight:600 }}
                >
                  {optedIn ? 'On' : 'Join'}
                </button>
             </div>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedSeller && (
            <motion.div 
              initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 400 }}
              style={{ 
                position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1001,
                background: 'var(--card-dark)', borderTopLeftRadius: '32px', borderTopRightRadius: '32px',
                padding: '30px', borderTop: '2px solid var(--primary)',
                boxShadow: '0 -10px 40px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ color: 'var(--text-light)' }}>{selectedSeller.name}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    <Navigation size={14} /> Tracking now • <Star size={14} color="var(--accent)" fill="var(--accent)" /> 4.9
                  </div>
                </div>
                <button onClick={() => setSelectedSeller(null)} style={{ background: 'var(--glass)', padding: '5px', borderRadius: '50%', color: 'var(--text-light)' }}>
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }}>
                {flavours.map(f => (
                  <div key={f.id} className="glass-card" style={{ minWidth: '130px', padding: '12px', textAlign: 'center' }}>
                    <img src={f.image} style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '8px', objectFit: 'cover' }} />
                    <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>{f.name}</p>
                    <p className="gradient-text">₹{f.price}</p>
                    <button onClick={() => setIsOrdering(true)} style={{ background: 'var(--primary)', color: 'white', fontSize: '0.7rem', padding: '6px 12px', borderRadius: '10px', marginTop: '8px', width: '100%' }}>
                      Order
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isOrdering && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.95)', zIndex: 2000, padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <ShoppingBag size={80} color="var(--secondary)" style={{ margin: '0 auto 20px' }} className="pulse-animation" />
          <h2 className="gradient-text" style={{ fontSize: '2rem' }}>Order Placed!</h2>
          <p className="text-muted" style={{ margin: '20px 0' }}>One Chocolate Cone reserved. Your neighborhood WhatsApp group will be notified of arrival!</p>
          <button className="switch-btn active" style={{ width: '100%', padding: '18px' }} onClick={() => setIsOrdering(false)}>Track Live</button>
        </div>
      )}
    </div>
  );
};

export default CustomerApp;

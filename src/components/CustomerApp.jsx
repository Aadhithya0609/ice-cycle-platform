import React, { useState, useEffect } from 'react';
import { Search, MapPin, Navigation, ShoppingBag, Star, X, MessageCircle, Info } from 'lucide-react';
import { flavours, sellers, CHENNAI_CENTER } from '../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';

const cycleIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/565/565410.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

const LocationMarker = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, map.getZoom());
  }, [coords, map]);
  return coords ? (
    <>
      <Circle center={coords} radius={100} pathOptions={{ color: 'var(--primary)', fillColor: 'var(--primary)', fillOpacity: 0.1 }} />
      <Marker position={coords} icon={new L.Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/9131/9131546.png',
        iconSize: [32, 32],
      })} />
    </>
  ) : null;
}

const CustomerApp = () => {
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isOrdering, setIsOrdering] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [optedIn, setOptedIn] = useState(false);
  const [broadcastVisible, setBroadcastVisible] = useState(false);

  useEffect(() => {
    // ENHANCED TRACKING: watchPosition + highAccuracy
    const watchId = navigator.geolocation.watchPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.warn(err),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    // Simulate WhatsApp Broadcast when Seller is close (prototype logic)
    const interval = setInterval(() => {
      if (optedIn && !broadcastVisible) {
        setBroadcastVisible(true);
        setTimeout(() => setBroadcastVisible(false), 5000);
      }
    }, 15000);

    return () => {
      navigator.geolocation.clearWatch(watchId);
      clearInterval(interval);
    }
  }, [optedIn, broadcastVisible]);

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
            />
          </div>
        </div>

        {/* Real-time Broadcast Notification (WhatsApp System) */}
        <AnimatePresence>
          {broadcastVisible && (
            <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -50, opacity: 0 }} style={{ position: 'absolute', top: 60, left: 20, right: 20, zIndex: 2000 }}>
               <div className="glass-card" style={{ padding: '12px 20px', border: '1px solid #25D366', background: 'rgba(37, 211, 102, 0.1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MessageCircle size={20} color="#25D366" />
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}><b>WhatsApp Broadcast:</b> Rajesh is in your area!</p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ position: 'absolute', top: 80, left: 20, right: 20, zIndex: 1000 }}>
           <div className="glass-card" style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: optedIn ? '#25D366' : 'var(--glass)', padding: '10px', borderRadius: '12px' }}>
                 <Bell size={20} color={optedIn ? 'white' : 'var(--text-muted)'} />
              </div>
              <div style={{ flex: 1 }}>
                 <p style={{ fontSize: '0.8rem', fontWeight: 700 }}>Resident Access</p>
                 <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Get WhatsApp pings on arrival.</p>
              </div>
              <button onClick={() => setOptedIn(!optedIn)} style={{ background: optedIn ? 'var(--secondary)' : 'var(--primary)', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 600 }}>
                {optedIn ? 'Active' : 'Join'}
              </button>
           </div>
        </div>

        <AnimatePresence>
          {selectedSeller && (
            <motion.div initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 400 }} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1001, background: 'var(--card-dark)', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', padding: '30px', borderTop: '2px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ color: 'var(--text-light)' }}>{selectedSeller.name}</h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Nearest Seller • High Accuracy GPS</p>
                </div>
                <button onClick={() => setSelectedSeller(null)} style={{ background: 'var(--glass)', padding: '5px', borderRadius: '50%', color: 'var(--text-light)' }}><X size={20} /></button>
              </div>
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px' }}>
                {flavours.map(f => (
                  <div key={f.id} className="glass-card" style={{ minWidth: '130px', padding: '12px', textAlign: 'center' }}>
                    <img src={f.image} style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '8px', objectFit: 'cover' }} />
                    <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>{f.name}</p>
                    <p className="gradient-text">₹{f.price}</p>
                    <button onClick={() => setIsOrdering(true)} style={{ background: 'var(--primary)', color: 'white', fontSize: '0.7rem', padding: '6px 12px', borderRadius: '10px', marginTop: '8px', width: '100%' }}>Order</button>
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
          <h2 className="gradient-text" style={{ fontSize: '2rem' }}>Reserving...</h2>
          <p className="text-muted" style={{ margin: '20px 0' }}>Your order is locked for 3 mins. Seller has been notified of your precise GPS coordinates.</p>
          <button className="switch-btn active" style={{ width: '100%', padding: '18px' }} onClick={() => setIsOrdering(false)}>View Map</button>
        </div>
      )}
    </div>
  );
};

export default CustomerApp;

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Navigation, ShoppingBag, Star, X, Info, LogOut, User } from 'lucide-react';
import { flavours, sellers, CHENNAI_CENTER } from '../services/mockData';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';

const cycleIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/565/565410.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

// PRODUCTION FIX: Explicitly removing default icon settings that crash on hosted URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) map.flyTo(coords, 16); // High zoom for accuracy
  }, [coords]);
  
  return coords ? (
    <>
      <Circle center={coords} radius={50} pathOptions={{ color: 'var(--primary)', fillColor: 'var(--primary)', fillOpacity: 0.2 }} />
      <Marker position={coords} icon={new L.Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/9131/9131546.png',
        iconSize: [32, 32],
      })} />
    </>
  ) : null;
}

const CustomerApp = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isOrdering, setIsOrdering] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const requestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      (err) => alert("Please enable GPS for accurate tracking"),
      { enableHighAccuracy: true }
    );
  };

  if (!isLogged) {
    return (
      <div className="mobile-frame" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-card" style={{ padding: '30px', textAlign: 'center', width: '85%' }}>
          <User size={48} color="var(--primary)" style={{ marginBottom: '15px' }} />
          <h3>Welcome to IceCycle</h3>
          <p className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '20px' }}>Sign in to discover sellers near your location.</p>
          <button className="switch-btn active" style={{ width: '100%', padding: '14px' }} onClick={() => setIsLogged(true)}>Login with Mobile</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-frame">
      <div style={{ height: '100%', width: '100%', position: 'relative' }}>
        <MapContainer center={CHENNAI_CENTER} zoom={13} zoomControl={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker coords={userLocation} />
          {sellers.map((s) => s.status === 'ONLINE' && (
            <Marker key={s.id} position={s.location} icon={cycleIcon} eventHandlers={{ click: () => setSelectedSeller(s) }} />
          ))}
        </MapContainer>

        {/* LOGOUT BUTTON */}
        <button 
          onClick={() => setIsLogged(false)}
          style={{ position: 'absolute', top: 80, right: 20, zIndex: 1000, background: 'var(--glass)', padding: '10px', borderRadius: '50%', color: 'white' }}
        >
          <LogOut size={18} />
        </button>

        {/* RE-CALIBRATE GPS BUTTON */}
        <button 
          onClick={requestLocation}
          style={{ position: 'absolute', bottom: 100, right: 20, zIndex: 1000, background: 'var(--primary)', padding: '12px', borderRadius: '50%', color: 'white', boxShadow: 'var(--shadow)' }}
        >
          <Navigation size={20} />
        </button>

        <div className="app-header" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1000 }}>
          <div className="glass-card" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', width: '100%', gap: '10px' }}>
            <Search size={18} color="var(--text-muted)" />
            <input 
              placeholder="Finding nearest flavor..." 
              style={{ background: 'transparent', border: 'none', color: 'var(--text-light)', width: '100%', outline: 'none' }}
              onClick={requestLocation}
            />
          </div>
        </div>

        <AnimatePresence>
          {selectedSeller && (
            <motion.div initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 400 }} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1001, background: 'var(--card-dark)', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', padding: '30px', borderTop: '2px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ color: 'var(--text-light)' }}>{selectedSeller.name}</h2>
                  <p className="text-muted" style={{ fontSize: '0.8rem' }}>Stock verified by SecureNode</p>
                </div>
                <button onClick={() => setSelectedSeller(null)} style={{ background: 'var(--glass)', padding: '5px', borderRadius: '50%', color: 'var(--text-light)' }}><X size={20} /></button>
              </div>
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto' }}>
                {flavours.map(f => (
                  <div key={f.id} className="glass-card" style={{ minWidth: '130px', padding: '12px', textAlign: 'center' }}>
                    <img src={f.image} style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '8px', objectFit: 'cover' }} />
                    <p style={{ fontSize: '0.8rem', fontWeight: 600 }}>{f.name}</p>
                    <p className="gradient-text">₹{f.price}</p>
                    <button onClick={() => setIsOrdering(true)} style={{ background: 'var(--primary)', color: 'white', fontSize: '0.7rem', padding: '6px 12px', borderRadius: '10px', marginTop: '8px', width: '100%' }}>Secure Buy</button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isOrdering && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.95)', zIndex: 2000, padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="glass-card" style={{ padding: '30px' }}>
             <ShoppingBag size={60} color="var(--secondary)" style={{ margin: '0 auto 20px' }} />
             <h2 className="gradient-text">Encrypted Order</h2>
             <p className="text-muted" style={{ margin: '15px 0' }}>Your transaction is signed. Seller {selectedSeller?.name} is arriving.</p>
             <button className="switch-btn active" style={{ width: '100%' }} onClick={() => setIsOrdering(false)}>Track</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerApp;

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, query, where, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// IMPORTANT: Replace with your Firebase project configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "icecycle-platform.firebaseapp.com",
  projectId: "icecycle-platform",
  storageBucket: "icecycle-platform.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

/* 
  PRODUCTION CONCURRENCY DESIGN:
  In a real scenario, we use Cloud Functions for the reservation engine.
  Example logic for reserveStock:
*/
export const reserveStock = async (sellerId, flavourId, quantity) => {
  // In production, this would be a call to a Cloud Run endpoint 
  // that uses Redis Lua scripts to prevent overselling.
  console.log(`Reserving ${quantity} of ${flavourId} for seller ${sellerId}`);
  
  // For this prototype, we simulate the success:
  return { status: 'success', reservationId: 'res_' + Math.random().toString(36).substr(2, 9) };
};

export const recordSale = async (sellerId, flavourId, quantity) => {
  const inventoryRef = doc(db, 'inventories', sellerId);
  // Atomic decrement simulation
  await updateDoc(inventoryRef, {
    [`quantities.${flavourId}`]: 0 // In real code: increment(-quantity)
  });
};

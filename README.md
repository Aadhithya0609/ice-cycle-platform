# IceCycle — Real-Time Ice Cream Sales Platform

IceCycle is a production-grade prototype for bicycle-based ice cream sales, featuring live tracking, inventory management, and real-time ordering.

## 🚀 Presentation Hub
This repository contains a unified simulator for:
1. **Seller App**: Inventory management and shift control.
2. **Customer App**: Discovery and ordering.
3. **Admin Dashboard**: Global analytics and heatmaps.
4. **Supervisor Dashboard**: Zone management and security audits.

## 🛠 Tech Stack
- **Frontend**: React + Vite
- **Styling**: Vanilla CSS (Premium Glassmorphism Design)
- **State/Backend**: Firebase (Auth, Firestore)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Concurrency**: High-contention reservation engine design included.

## 📦 Getting Started

1. **Clone the repo**
2. **Install dependencies**: `npm install`
3. **Run locally**: `npm run dev`
4. **Deploy to GitHub Pages**: `npm run deploy`

## 🔐 Firebase Setup
1. Create a Firebase project at [firebase.google.com](https://firebase.google.com).
2. Enable **Authentication** (Phone OTP/Email).
3. Enable **Cloud Firestore** in test mode.
4. Copy your config into `src/services/firebase.js`.

## 🎤 Voice Commands
Sellers can use voice to record sales. Click the Mic icon and say "Add chocolate cone sold". (Simulated in this prototype, extensible via Gemini API).

---
*Designed for Senior Management Presentation.*

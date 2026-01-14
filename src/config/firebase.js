import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics'; // TAMBAHKAN INI

// TODO: Ganti dengan config dari Firebase Console kamu
const firebaseConfig = {
  apiKey: "AIzaSyBUAOlFlZivUGtbdP9uJqZJiSxTp2mDYe4",
  authDomain: "les-pintar.firebaseapp.com",
  projectId: "les-pintar",
  storageBucket: "les-pintar.firebasestorage.app",
  messagingSenderId: "210021137620",
  appId: "1:210021137620:web:852e24b6a7a58d1adc0f41",
  measurementId: "G-TKL1H5HQW4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (conditional - hanya di production)
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.log('Analytics not available in development');
  }
}

export { analytics };
export default app;
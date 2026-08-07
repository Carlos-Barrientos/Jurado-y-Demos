// Firebase SDK Integration for PROSUR AI Showcase
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  addDoc 
} from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

// Official Firebase configuration for Reto IA Prosur
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA8lEUhNYQJA22DNTex0JRvPahqMrmapvs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "reto-ia-prosur.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "reto-ia-prosur",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "reto-ia-prosur.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "674667540011",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:674667540011:web:ff7724d2c7b1f43852c46e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XW3PPB719W"
};

// Check if credentials are properly set
export function isFirebaseConfigured() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY");
}

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  addDoc,
  ref,
  uploadString,
  getDownloadURL
};

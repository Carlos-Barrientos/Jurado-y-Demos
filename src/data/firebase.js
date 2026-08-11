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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA5RYOO60spj3IVDxr_pZ9QJ-vzma8xyD0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "carlos-reto-ia.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "carlos-reto-ia",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "carlos-reto-ia.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "576490842617",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:576490842617:web:e163e4975f3c37095d3528",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-BY3422CQJV"
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

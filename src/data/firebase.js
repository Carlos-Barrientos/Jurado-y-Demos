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
  apiKey: "AIzaSyA8lEUhNYQJA22DNTex0JRvPahqMrmapvs",
  authDomain: "reto-ia-prosur.firebaseapp.com",
  projectId: "reto-ia-prosur",
  storageBucket: "reto-ia-prosur.firebasestorage.app",
  messagingSenderId: "674667540011",
  appId: "1:674667540011:web:ff7724d2c7b1f43852c46e",
  measurementId: "G-XW3PPB719W"
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

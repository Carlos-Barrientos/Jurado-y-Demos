import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import fs from 'fs';

const firebaseConfig = {
  apiKey: "AIzaSyA5RYOO60spj3IVDxr_pZ9QJ-vzma8xyD0",
  authDomain: "carlos-reto-ia.firebaseapp.com",
  projectId: "carlos-reto-ia",
  storageBucket: "carlos-reto-ia.firebasestorage.app",
  messagingSenderId: "576490842617",
  appId: "1:576490842617:web:e163e4975f3c37095d3528",
  measurementId: "G-BY3422CQJV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// To avoid messing with ES Modules in node for store.js, I will parse store.js with regex or just run the script as a module if package.json allows it. 
// The project is Vite, so it's likely type="module". Let's try importing store.js
import { defaultState as notExported } from './src/data/store.js'; 
// wait, defaultState is NOT exported in store.js! It's a local const.

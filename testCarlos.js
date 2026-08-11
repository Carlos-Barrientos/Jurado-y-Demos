import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

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

async function testConnection() {
  console.log("Probando conexión a carlos-reto-ia...");
  try {
    const docRef = await addDoc(collection(db, "test_connection"), {
      timestamp: new Date(),
      status: "ÉXITO"
    });
    console.log("¡ÉXITO! Documento escrito con ID:", docRef.id);
    process.exit(0);
  } catch (e) {
    console.error("ERROR conectando a Firestore:", e);
    process.exit(1);
  }
}

testConnection();

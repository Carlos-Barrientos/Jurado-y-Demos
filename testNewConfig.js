import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA8lEUhNYQJA22DNTex0JRvPahqMrmapvs",
  authDomain: "reto-ia-prosur.firebaseapp.com",
  projectId: "reto-ia-prosur",
  storageBucket: "reto-ia-prosur.firebasestorage.app",
  messagingSenderId: "674667540011",
  appId: "1:674667540011:web:ff7724d2c7b1f43852c46e",
  measurementId: "G-XW3PPB719W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testConnection() {
  try {
    console.log("Probando conexión a reto-ia-prosur (nueva config)...");
    const docRef = await addDoc(collection(db, "test_connection"), {
      timestamp: new Date().toISOString(),
      message: "Test OK"
    });
    console.log("¡ÉXITO! Documento escrito con ID: ", docRef.id);
    process.exit(0);
  } catch (e) {
    console.error("ERROR conectando a reto-ia-prosur:", e);
    process.exit(1);
  }
}

testConnection();

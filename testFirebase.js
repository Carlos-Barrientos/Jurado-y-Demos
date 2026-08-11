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

async function testFirebase() {
  console.log("Iniciando prueba de conexión con Firebase...");
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log("Intentando escribir un documento de prueba...");
    const testDoc = await addDoc(collection(db, "test_connection"), {
      message: "¡Conexión exitosa desde el asistente de IA!",
      timestamp: new Date().toISOString()
    });
    
    console.log("✅ ¡ÉXITO! Documento escrito con ID: ", testDoc.id);
    
    console.log("Intentando leer el documento...");
    const querySnapshot = await getDocs(collection(db, "test_connection"));
    console.log(`✅ ¡ÉXITO! Se leyeron ${querySnapshot.size} documentos de la colección de prueba.`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ ERROR AL CONECTAR CON FIREBASE:");
    console.error(error.message);
    process.exit(1);
  }
}

testFirebase();

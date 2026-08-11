import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJUaYL5HtXy7BwEoGhJwFeCV2ag-0kAeU",
  authDomain: "proyecto-chesa.firebaseapp.com",
  projectId: "proyecto-chesa",
  storageBucket: "proyecto-chesa.firebasestorage.app",
  messagingSenderId: "462706116532",
  appId: "1:462706116532:web:da0d54dba6fa5f540f94e1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testConnection() {
  try {
    console.log("Probando conexión a proyecto-chesa...");
    const docRef = await addDoc(collection(db, "test_connection"), {
      timestamp: new Date().toISOString(),
      message: "Test OK"
    });
    console.log("¡ÉXITO! Documento escrito con ID: ", docRef.id);
    process.exit(0);
  } catch (e) {
    console.error("ERROR conectando a proyecto-chesa:", e);
    process.exit(1);
  }
}

testConnection();

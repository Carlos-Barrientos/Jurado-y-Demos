import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

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
const storage = getStorage(app);

async function testStorage() {
  try {
    const storageRef = ref(storage, 'test/test.txt');
    console.log('Intentando subir archivo de prueba...');
    await uploadString(storageRef, 'Hola mundo desde test de almacenamiento');
    console.log('Subida exitosa. Obteniendo URL de descarga...');
    const url = await getDownloadURL(storageRef);
    console.log('Storage funcionando correctamente. URL:', url);
  } catch (error) {
    console.error('Error al probar storage:', error);
  }
}

testStorage();

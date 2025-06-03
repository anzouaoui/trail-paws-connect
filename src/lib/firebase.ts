
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // Remplacez par votre vraie clé API
  authDomain: "traildog-1e3c9.firebaseapp.com",
  projectId: "traildog-1e3c9",
  storageBucket: "traildog-1e3c9.appspot.com",
  messagingSenderId: "123456789", // Remplacez par votre ID d'expéditeur
  appId: "1:123456789:web:XXXXXXXXXXXXXXXX" // Remplacez par votre ID d'application
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBx2FdXW7XfKZuLLTQA4_qbl-_muswG6GE",
  authDomain: "traildog-1e3c9.firebaseapp.com",
  projectId: "traildog-1e3c9",
  storageBucket: "traildog-1e3c9.firebasestorage.app",
  messagingSenderId: "155891952495",
  appId: "1:155891952495:web:f4b93c0aed4a3a5efe169a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

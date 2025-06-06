import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db } from '@/config/firebase.config';

// Types pour les collections principales
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DogProfile {
  id: string;
  userId: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Activity {
  id: string;
  userId: string;
  dogId: string;
  type: string;
  duration: number;
  distance: number;
  date: Date;
  createdAt: Date;
}

// Services pour les profils utilisateur
export const userService = {
  async create(data: Omit<UserProfile, 'id'>) {
    const docRef = await addDoc(collection(db, 'users'), data);
    return docRef.id;
  },

  async getById(id: string) {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as UserProfile : null;
  },

  async update(id: string, data: Partial<UserProfile>) {
    const docRef = doc(db, 'users', id);
    await updateDoc(docRef, { ...data, updatedAt: new Date() });
  }
};

// Services pour les profils de chiens
export const dogService = {
  async create(data: Omit<DogProfile, 'id'>) {
    const docRef = await addDoc(collection(db, 'dogs'), data);
    return docRef.id;
  },

  async getByUserId(userId: string) {
    const q = query(collection(db, 'dogs'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DogProfile));
  },

  async update(id: string, data: Partial<DogProfile>) {
    const docRef = doc(db, 'dogs', id);
    await updateDoc(docRef, { ...data, updatedAt: new Date() });
  },

  async delete(id: string) {
    const docRef = doc(db, 'dogs', id);
    await deleteDoc(docRef);
  }
};

// Services pour les activités
export const activityService = {
  async create(data: Omit<Activity, 'id'>) {
    const docRef = await addDoc(collection(db, 'activities'), data);
    return docRef.id;
  },

  async getByUserId(userId: string, limitCount = 20) {
    const q = query(
      collection(db, 'activities'), 
      where('userId', '==', userId),
      orderBy('date', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Activity));
  },

  async update(id: string, data: Partial<Activity>) {
    const docRef = doc(db, 'activities', id);
    await updateDoc(docRef, data);
  },

  async delete(id: string) {
    const docRef = doc(db, 'activities', id);
    await deleteDoc(docRef);
  }
};

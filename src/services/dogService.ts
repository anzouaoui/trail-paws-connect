import { db } from '@/config/firebase.config';
import { Dog } from '@/types/dog';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';

const USERS_COLLECTION = 'users';
const DOGS_COLLECTION = 'dogs';

export const dogService = {
  /**
   * Crée un nouveau chien dans la sous-collection du propriétaire
   */
  async createDog(userId: string, dogData: Omit<Dog, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const dogsRef = collection(db, USERS_COLLECTION, userId, DOGS_COLLECTION);
    const newDogRef = doc(dogsRef);
    const timestamp = serverTimestamp();
    
    // Supprimer les champs undefined
    const cleanData = Object.entries(dogData).reduce((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);
    
    await setDoc(newDogRef, {
      ...cleanData,
      id: newDogRef.id,
      userId,
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    return newDogRef.id;
  },

  /**
   * Met à jour un chien existant
   */
  async updateDog(userId: string, dogId: string, dogData: Partial<Dog>): Promise<void> {
    const dogRef = doc(db, USERS_COLLECTION, userId, DOGS_COLLECTION, dogId);
    
    await updateDoc(dogRef, {
      ...dogData,
      updatedAt: serverTimestamp(),
    });
  },

  /**
   * Récupère un chien par son ID
   */
  async getDogById(userId: string, dogId: string): Promise<Dog | null> {
    const dogRef = doc(db, USERS_COLLECTION, userId, DOGS_COLLECTION, dogId);
    const dogDoc = await getDoc(dogRef);

    if (!dogDoc.exists()) {
      return null;
    }

    const dogData = dogDoc.data();
    return {
      ...dogData,
      id: dogDoc.id,
      createdAt: (dogData.createdAt as Timestamp).toDate(),
      updatedAt: (dogData.updatedAt as Timestamp).toDate(),
    } as Dog;
  },

  /**
   * Récupère tous les chiens d'un utilisateur
   */
  async getUserDogs(userId: string): Promise<Dog[]> {
    const dogsRef = collection(db, USERS_COLLECTION, userId, DOGS_COLLECTION);
    const dogsSnapshot = await getDocs(dogsRef);
    
    return dogsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        createdAt: (data.createdAt as Timestamp).toDate(),
        updatedAt: (data.updatedAt as Timestamp).toDate(),
      } as Dog;
    });
  },

  /**
   * Supprime un chien
   */
  async deleteDog(userId: string, dogId: string): Promise<void> {
    const dogRef = doc(db, USERS_COLLECTION, userId, DOGS_COLLECTION, dogId);
    await deleteDoc(dogRef);
  },
};

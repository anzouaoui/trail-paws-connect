
import { db } from '@/config/firebase.config';
import { User } from '@/types/user';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  DocumentReference,
  Timestamp,
} from 'firebase/firestore';

const USERS_COLLECTION = 'users';

export const userService = {
  /**
   * Crée un nouvel utilisateur dans Firestore
   */
  async createUser(userId: string, userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const timestamp = serverTimestamp();
    
    await setDoc(userRef, {
      ...userData,
      id: userId,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  },

  /**
   * Met à jour un utilisateur existant
   */
  async updateUser(userId: string, userData: Partial<User>): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: new Date().toISOString()
      });
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      throw new Error(error.message);
    }
  },

  /**
   * Récupère un utilisateur par son ID
   */
  async getUserById(userId: string): Promise<User | null> {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return null;
    }

    const userData = userDoc.data();
    return {
      ...userData,
      id: userDoc.id,
      createdAt: (userData.createdAt as Timestamp).toDate(),
      updatedAt: (userData.updatedAt as Timestamp).toDate(),
    } as User;
  },

  /**
   * Vérifie si un utilisateur existe
   */
  async userExists(userId: string): Promise<boolean> {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userDoc = await getDoc(userRef);
    return userDoc.exists();
  },
};

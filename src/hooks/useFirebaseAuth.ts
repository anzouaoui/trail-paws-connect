import { useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile
} from 'firebase/auth';
import { auth } from '@/config/firebase.config';

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('Auth state changed:', user ? 'User logged in' : 'User logged out');
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error('Auth state change error:', error);
      setUser(null);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      setLoading(true); // Reset loading state on cleanup
    };
  }, []);

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Mettre à jour le profil de l'utilisateur avec son nom
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const socialLogin = async (provider: 'google' | 'facebook') => {
    setLoading(true);
    try {
      const authProvider = provider === 'google' 
        ? new GoogleAuthProvider()
        : new FacebookAuthProvider();
      
      const userCredential = await signInWithPopup(auth, authProvider);
      return userCredential.user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  return {
    user,
    loading,
    signup,
    login,
    socialLogin,
    logout
  };
};

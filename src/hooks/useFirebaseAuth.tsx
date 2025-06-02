
import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  socialLogin: (provider: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const FirebaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const socialLogin = async (provider: string) => {
    let authProvider;
    
    switch (provider) {
      case 'Google':
        authProvider = new GoogleAuthProvider();
        break;
      case 'Facebook':
        authProvider = new FacebookAuthProvider();
        break;
      default:
        throw new Error(`Provider ${provider} not supported`);
    }
    
    await signInWithPopup(auth, authProvider);
  };

  const signup = async (name: string, email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // TODO: Save user profile with name in Firestore
    console.log('User created:', userCredential.user);
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, socialLogin, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useFirebaseAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useFirebaseAuth must be used within a FirebaseAuthProvider");
  }
  return context;
};

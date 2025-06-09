
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFirebaseAuth } from '@/contexts/FirebaseAuthContext';
import { Loader2 } from 'lucide-react';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useFirebaseAuth();

  // Pendant le chargement, afficher un spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-forest" />
      </div>
    );
  }

  // Si pas d'utilisateur, rediriger vers login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si authentifié, afficher le contenu protégé
  return <>{children}</>;
};

export default PrivateRoute;

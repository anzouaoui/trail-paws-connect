
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Facebook, Mail, Lock, User, UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signup, socialLogin } = useFirebaseAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast({
        variant: "destructive",
        title: "Conditions non acceptées",
        description: "Veuillez accepter les conditions d'utilisation pour continuer",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      await signup(name, email, password);
      
      toast({
        title: "Compte créé !",
        description: "Bienvenue sur TrailPaws Connect !",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Échec de l'inscription",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider: string) => {
    setIsLoading(true);
    
    try {
      await socialLogin(provider);
      
      toast({
        title: `Inscription via ${provider} réussie !`,
        description: "Bienvenue sur TrailPaws Connect !",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Échec de l'inscription",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-forest">Créer un Compte</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Rejoignez notre communauté de passionnés de sports canins
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Jean Dupont"
                  className="pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="vous@exemple.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => 
                  setAcceptTerms(checked as boolean)
                }
              />
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                J'accepte les{" "}
                <Link to="/terms-of-service" className="text-forest hover:underline">
                  Conditions d'utilisation
                </Link>{" "}
                et la{" "}
                <Link to="/privacy-policy" className="text-forest hover:underline">
                  Politique de confidentialité
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Création du compte..." : "Créer le compte"}
              <UserPlus className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-input"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou continuer avec
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialSignup("Google")}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSocialSignup("Facebook")}
                disabled={isLoading}
              >
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm">
            Vous avez déjà un compte ?{" "}
            <Link
              to="/login"
              className="font-medium text-forest hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;


import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Camera,
  Calendar,
  MapPin,
  User,
  Heart,
  Weight,
  Dog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useFirebaseAuth } from "@/contexts/FirebaseAuthContext";
import { userService } from "@/services/userService";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

type Activity = 'canicross' | 'canirandonee' | 'canivtt';
type Gender = 'male' | 'female' | 'other';

const activities: Array<{ value: Activity; label: string }> = [
  { value: "canicross", label: "Canicross" },
  { value: "canirandonee", label: "Canirandonnée" },
  { value: "canivtt", label: "Cani VTT" },
];

const genders: Array<{ value: Gender; label: string }> = [
  { value: "male", label: "Homme" },
  { value: "female", label: "Femme" },
  { value: "other", label: "Autre" },
];

const CreateProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useFirebaseAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    photoURL: "",
    firstName: "",
    lastName: "",
    location: "",
    mainActivity: "canicross" as Activity,
    bio: "",
    birthDate: "",
    gender: "male" as Gender,
    weight: "",
    restingHeartRate: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photoURL: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Vous devez être connecté pour créer un profil",
      });
      return;
    }

    setIsLoading(true);

    try {
      let photoURL = formData.photoURL;

      try {
        // Si une nouvelle photo a été sélectionnée (format data:image)
        if (photoURL && photoURL.startsWith('data:image')) {
          const storage = getStorage();
          const photoRef = ref(storage, `users/${user.uid}/profile.jpg`);
          
          // Convertir le Data URL en Blob
          const response = await fetch(photoURL);
          const blob = await response.blob();
          
          // Upload sur Firebase Storage
          await uploadBytes(photoRef, blob);
          photoURL = await getDownloadURL(photoRef);
        }

        console.log('Données du formulaire:', {
          ...formData,
          userId: user.uid,
          email: user.email
        });

        // Créer le profil utilisateur dans Firestore
        await userService.createUser(user.uid, {
          photoURL,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          location: formData.location.trim(),
          mainActivity: formData.mainActivity,
          bio: formData.bio.trim(),
          birthDate: formData.birthDate,
          gender: formData.gender,
          weight: Number(formData.weight),
          restingHeartRate: Number(formData.restingHeartRate),
          email: user.email || '',
        });

        console.log('Profil utilisateur créé avec succès');
        
        toast({
          title: "Profil créé avec succès",
          description: "Ajoutons maintenant votre chien !",
        });
        navigate("/add-dog");
      } catch (error) {
        console.error('Erreur lors de la création du profil:', error);
        throw error;
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">Créez votre profil</h1>
          <p className="text-muted-foreground mt-2">
            Renseignez vos informations pour commencer
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo de profil */}
          <div className="flex flex-col items-center space-y-4">
            <div
              className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden relative cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {formData.photoURL ? (
                <img
                  src={formData.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              Ajouter une photo
            </Button>
          </div>

          {/* Informations de base */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ville/Région</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainActivity">Activité principale</Label>
              <Select
                value={formData.mainActivity}
                onValueChange={(value: Activity) =>
                  setFormData({ ...formData, mainActivity: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre activité" />
                </SelectTrigger>
                <SelectContent>
                  {activities.map((activity) => (
                    <SelectItem key={activity.value} value={activity.value}>
                      {activity.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Parlez-nous un peu de vous..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate">Date de naissance</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) =>
                    setFormData({ ...formData, birthDate: e.target.value })
                  }
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Sexe</Label>
              <Select
                value={formData.gender}
                onValueChange={(value: Gender) =>
                  setFormData({ ...formData, gender: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre sexe" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((gender) => (
                    <SelectItem key={gender.value} value={gender.value}>
                      {gender.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Poids (kg)</Label>
              <div className="relative">
                <Weight className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  className="pl-9"
                  min="30"
                  max="200"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="restingHeartRate">
                Fréquence cardiaque au repos (bpm)
              </Label>
              <div className="relative">
                <Heart className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="restingHeartRate"
                  type="number"
                  value={formData.restingHeartRate}
                  onChange={(e) =>
                    setFormData({ ...formData, restingHeartRate: e.target.value })
                  }
                  className="pl-9"
                  min="40"
                  max="120"
                  required
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              "Création du profil..."
            ) : (
              <>
                <Dog className="mr-2 h-4 w-4" />
                Continuer et ajouter mon chien
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateProfilePage;

import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Camera,
  Calendar,
  Dog,
  Heart,
  Weight,
  Ruler,
  Award,
  AlertCircle,
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
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

const breeds = [
  { value: "berger_allemand", label: "Berger Allemand" },
  { value: "malinois", label: "Berger Belge Malinois" },
  { value: "husky", label: "Husky Sibérien" },
  { value: "border_collie", label: "Border Collie" },
  { value: "autre", label: "Autre" },
];

const sexes = [
  { value: "male", label: "Mâle" },
  { value: "female", label: "Femelle" },
];

const AddDogPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useFirebaseAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    photoURL: "",
    name: "",
    breed: "",
    otherBreed: "",
    sex: "",
    birthDate: "",
    weight: "",
    height: "",
    restingHeartRate: "",
    achievements: "",
    healthInfo: "",
    microchip: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showOtherBreed, setShowOtherBreed] = useState(false);

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

  const handleBreedChange = (value: string) => {
    setFormData({ ...formData, breed: value });
    setShowOtherBreed(value === "autre");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Sauvegarder les données dans Firebase
      toast({
        title: "Chien ajouté avec succès",
        description: "Vous pouvez maintenant commencer vos activités !",
      });
      navigate("/home");
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
          <h1 className="text-2xl font-bold">Ajoutez votre chien</h1>
          <p className="text-muted-foreground mt-2">
            Renseignez les informations de votre compagnon
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo du chien */}
          <div className="flex flex-col items-center space-y-4">
            <div
              className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden relative cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {formData.photoURL ? (
                <img
                  src={formData.photoURL}
                  alt="Dog"
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
          <div className="space-y-2">
            <Label htmlFor="name">Nom du chien</Label>
            <div className="relative">
              <Dog className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="breed">Race</Label>
              <Select
                value={formData.breed}
                onValueChange={handleBreedChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez la race" />
                </SelectTrigger>
                <SelectContent>
                  {breeds.map((breed) => (
                    <SelectItem key={breed.value} value={breed.value}>
                      {breed.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {showOtherBreed && (
              <div className="space-y-2">
                <Label htmlFor="otherBreed">Précisez la race</Label>
                <Input
                  id="otherBreed"
                  value={formData.otherBreed}
                  onChange={(e) =>
                    setFormData({ ...formData, otherBreed: e.target.value })
                  }
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="sex">Sexe</Label>
              <Select
                value={formData.sex}
                onValueChange={(value) =>
                  setFormData({ ...formData, sex: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le sexe" />
                </SelectTrigger>
                <SelectContent>
                  {sexes.map((sex) => (
                    <SelectItem key={sex.value} value={sex.value}>
                      {sex.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
          </div>

          {/* Mensurations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  min="1"
                  max="100"
                  step="0.1"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Taille au garrot (cm)</Label>
              <div className="relative">
                <Ruler className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="height"
                  type="number"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({ ...formData, height: e.target.value })
                  }
                  className="pl-9"
                  min="20"
                  max="100"
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

          {/* Informations complémentaires */}
          <div className="space-y-2">
            <Label htmlFor="achievements">Palmarès sportif</Label>
            <div className="relative">
              <Award className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="achievements"
                value={formData.achievements}
                onChange={(e) =>
                  setFormData({ ...formData, achievements: e.target.value })
                }
                placeholder="Listez les compétitions et résultats..."
                className="min-h-[100px] pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="healthInfo">Informations de santé importantes</Label>
            <div className="relative">
              <AlertCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="healthInfo"
                value={formData.healthInfo}
                onChange={(e) =>
                  setFormData({ ...formData, healthInfo: e.target.value })
                }
                placeholder="Allergies, conditions médicales, etc..."
                className="min-h-[100px] pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="microchip">Numéro de puce/tatouage</Label>
            <Input
              id="microchip"
              value={formData.microchip}
              onChange={(e) =>
                setFormData({ ...formData, microchip: e.target.value })
              }
              placeholder="Si applicable"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              "Ajout en cours..."
            ) : (
              <>
                <Dog className="mr-2 h-4 w-4" />
                Terminer et commencer l'aventure
              </>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddDogPage;

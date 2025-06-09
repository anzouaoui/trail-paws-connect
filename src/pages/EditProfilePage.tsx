import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { userService } from "@/services/userService";
import { User } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { uploadFile } from "@/lib/utils";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { user: authUser } = useFirebaseAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState<Partial<User>>({});
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");

  useEffect(() => {
    const loadProfile = async () => {
      if (!authUser?.uid) return;

      try {
        const userData = await userService.getUserById(authUser.uid);
        if (userData) {
          setProfileData(userData);
          if (userData.photoURL) {
            setPhotoPreview(userData.photoURL);
          }
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger le profil",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [authUser?.uid, toast]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser?.uid) return;

    setIsSaving(true);
    try {
      let photoURL = profileData.photoURL;

      if (photoFile) {
        const uploadPath = `users/${authUser.uid}/profile-photo`;
        photoURL = await uploadFile(photoFile, uploadPath);
      }

      const updatedProfile = {
        ...profileData,
        photoURL,
        updatedAt: new Date(),
      };

      await userService.updateUser(authUser.uid, updatedProfile);

      toast({
        title: "Succès",
        description: "Profil mis à jour avec succès",
      });
      navigate('/profile');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-forest" />
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-forest">Modifier mon profil</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="photo">Photo de profil</Label>
          <div className="flex items-center gap-4">
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input
            id="firstName"
            value={profileData.firstName || ""}
            onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input
            id="lastName"
            value={profileData.lastName || ""}
            onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={profileData.bio || ""}
            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Localisation</Label>
          <Input
            id="location"
            value={profileData.location || ""}
            onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mainActivity">Activité principale</Label>
          <select
            id="mainActivity"
            value={profileData.mainActivity || "canicross"}
            onChange={(e) => setProfileData({ ...profileData, mainActivity: e.target.value as "canicross" | "canirandonee" | "canivtt" })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="canicross">Canicross</option>
            <option value="canirandonee">Canirandonnée</option>
            <option value="canivtt">CaniVTT</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/profile')}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-forest hover:bg-forest/90"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              "Enregistrer"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;

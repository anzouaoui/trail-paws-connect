
import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DogProfileCard from "@/components/DogProfileCard";
import { useToast } from "@/hooks/use-toast";

// Données fictives - dans une vraie app cela viendrait d'une base de données
const mockDogs = [
  {
    id: "1",
    name: "Max",
    breed: "Border Collie",
    age: 3,
    weight: "18 kg",
    imageSrc: undefined,
    sportPreference: "Canicross",
    level: "intermediate" as const
  },
  {
    id: "2",
    name: "Bella",
    breed: "Golden Retriever",
    age: 2,
    weight: "25 kg",
    imageSrc: undefined,
    sportPreference: "Randonnée canine",
    level: "beginner" as const
  }
];

const DogProfilesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddDog = () => {
    navigate("/dog-profile/new");
  };

  const handleViewDog = (id: string) => {
    navigate(`/dog-profile/${id}/edit`);
  };

  return (
    <div className="pb-24">
      {/* En-tête */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/profile")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Mes Chiens</h1>
          <div className="flex-1"></div>
          <Button 
            onClick={handleAddDog}
            size="icon"
            className="bg-forest text-white"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {mockDogs.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <p className="text-muted-foreground text-center mb-4">
                Vous n'avez pas encore ajouté de chiens. Ajoutez votre premier chien pour commencer à suivre vos activités ensemble !
              </p>
              <Button onClick={handleAddDog} className="bg-forest text-white">
                <Plus className="h-5 w-5 mr-2" /> Ajouter un chien
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {mockDogs.map((dog) => (
              <div 
                key={dog.id}
                onClick={() => handleViewDog(dog.id)}
                className="cursor-pointer transform transition-transform hover:scale-[1.01]"
              >
                <DogProfileCard {...dog} />
              </div>
            ))}
            <Button 
              onClick={handleAddDog} 
              className="mt-4 bg-forest text-white"
            >
              <Plus className="h-5 w-5 mr-2" /> Ajouter un autre chien
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DogProfilesPage;

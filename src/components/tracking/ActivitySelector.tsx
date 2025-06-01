
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import DogAvatar from "@/components/DogAvatar";
import { Dog } from "@/types/tracking";

interface ActivitySelectorProps {
  dogs: Dog[];
  selectedDogIndex: number;
  onDogSelection: (index: number) => void;
}

const ActivitySelector: React.FC<ActivitySelectorProps> = ({
  dogs,
  selectedDogIndex,
  onDogSelection
}) => {
  const { toast } = useToast();

  const handleDogSelection = (index: number) => {
    onDogSelection(index);
    toast({
      description: `${dogs[index].name} est prêt pour l'action !`,
    });
  };

  return (
    <Card className="rounded-2xl border-none shadow-sm">
      <CardContent className="p-4">
        <div className="mb-6">
          <Label htmlFor="activity-type" className="text-base font-medium">Type d'Activité</Label>
          <Select defaultValue="canicross">
            <SelectTrigger id="activity-type" className="mt-1 rounded-xl h-12">
              <SelectValue placeholder="Sélectionnez le type d'activité" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="canicross">Canicross</SelectItem>
              <SelectItem value="cani-hiking">Cani-randonnée</SelectItem>
              <SelectItem value="cani-MTB">Cani-VTT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="mb-6">
          <Label className="text-base font-medium">Partenaire Canin</Label>
          <div className="flex space-x-3 mt-3 overflow-x-auto pb-2 scrollbar-hide">
            {dogs.map((dog, index) => (
              <motion.div
                key={dog.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDogSelection(index)}
                className={`p-3 border rounded-xl cursor-pointer transition-all flex flex-col items-center ${
                  index === selectedDogIndex ? 'bg-forest-light/20 border-forest' : 'border-border'
                }`}
              >
                <DogAvatar name={dog.name} size="md" />
                <span className="block text-center font-medium mt-2">{dog.name}</span>
                <span className="text-xs text-muted-foreground">{dog.breed}</span>
                <div className={`mt-1 px-2 py-0.5 rounded-full text-xs ${
                  dog.energy > 90 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {dog.energy}% Énergie
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <Switch id="auto-pause" />
          <Label htmlFor="auto-pause">Pause automatique à l'arrêt</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivitySelector;

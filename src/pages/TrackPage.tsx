
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal, BarChart, Timer, MapPin, Users, Zap } from "lucide-react";
import ActivitySelector from "@/components/tracking/ActivitySelector";
import TrackingControls from "@/components/tracking/TrackingControls";
import WidgetCustomizer from "@/components/tracking/WidgetCustomizer";
import TrackingWidgets from "@/components/tracking/TrackingWidgets";
import { useTracking } from "@/hooks/useTracking";
import { Widget, Dog, TeamMember } from "@/types/tracking";

const TrackPage = () => {
  const [selectedDogIndex, setSelectedDogIndex] = useState(0);
  const [isCustomizingWidgets, setIsCustomizingWidgets] = useState(false);
  
  // Sample dogs with expanded properties
  const dogs: Dog[] = [
    { 
      id: "dog1",
      name: "Max", 
      breed: "Border Collie", 
      energy: 92,
      status: "Prêt à courir",
      avatar: undefined
    },
    { 
      id: "dog2",
      name: "Bella", 
      breed: "Husky",
      energy: 88,
      status: "Reposé",
      avatar: undefined
    }
  ];

  // Team members
  const teamMembers: TeamMember[] = [
    { 
      id: "user1", 
      name: "Sarah", 
      avatar: undefined,
      online: true,
      lastActivity: "Il y a 2 heures"
    },
    { 
      id: "user2", 
      name: "Mike", 
      avatar: undefined,
      online: false,
      lastActivity: "Hier"
    },
    { 
      id: "user3", 
      name: "Emma", 
      avatar: undefined,
      online: true,
      lastActivity: "À l'instant"
    }
  ];

  // Customizable widgets
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: 'stats', type: 'stats', title: 'Statistiques d\'Activité', position: 0, visible: true, icon: <BarChart className="h-5 w-5" /> },
    { id: 'timer', type: 'timer', title: 'Chronomètre', position: 1, visible: true, icon: <Timer className="h-5 w-5" /> },
    { id: 'map', type: 'map', title: 'Carte en Direct', position: 2, visible: true, icon: <MapPin className="h-5 w-5" /> },
    { id: 'partners', type: 'partners', title: 'Partenaires d\'Équipe', position: 3, visible: true, icon: <Users className="h-5 w-5" /> },
    { id: 'goals', type: 'goals', title: 'Objectifs du Jour', position: 4, visible: false, icon: <Zap className="h-5 w-5" /> }
  ]);

  const { isTracking, isPaused, trackingData, handleStartTracking, handleStopTracking } = useTracking(dogs, selectedDogIndex);

  // Handle widget position changes (simple implementation)
  const moveWidget = (id: string, direction: 'up' | 'down') => {
    const newWidgets = [...widgets];
    const index = newWidgets.findIndex(widget => widget.id === id);
    
    if (direction === 'up' && index > 0) {
      // Swap with widget above
      [newWidgets[index].position, newWidgets[index-1].position] = 
      [newWidgets[index-1].position, newWidgets[index].position];
      [newWidgets[index], newWidgets[index-1]] = [newWidgets[index-1], newWidgets[index]];
    } else if (direction === 'down' && index < newWidgets.length - 1) {
      // Swap with widget below
      [newWidgets[index].position, newWidgets[index+1].position] = 
      [newWidgets[index+1].position, newWidgets[index].position];
      [newWidgets[index], newWidgets[index+1]] = [newWidgets[index+1], newWidgets[index]];
    }
    
    setWidgets(newWidgets);
  };

  // Toggle widget visibility
  const toggleWidgetVisibility = (id: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === id ? { ...widget, visible: !widget.visible } : widget
    ));
  };

  return (
    <div className="px-4 py-6 pb-24">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Suivre l'Activité</h1>
        <Button 
          variant="outline" 
          size="icon"
          className="rounded-full"
          onClick={() => setIsCustomizingWidgets(!isCustomizingWidgets)}
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </header>
      
      <Tabs defaultValue="activity" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-2 rounded-2xl p-1 h-14">
          <TabsTrigger 
            value="activity" 
            className="rounded-xl text-base data-[state=active]:bg-forest data-[state=active]:text-white"
          >
            Activité
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="rounded-xl text-base data-[state=active]:bg-forest data-[state=active]:text-white"
          >
            Paramètres
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity" className="mt-4">
          <ActivitySelector 
            dogs={dogs} 
            selectedDogIndex={selectedDogIndex} 
            onDogSelection={setSelectedDogIndex} 
          />
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4">
          <Card className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-4 space-y-5">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Retour Vocal</Label>
                  <p className="text-sm text-muted-foreground">Recevoir des mises à jour audio pendant l'activité</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Précision GPS</Label>
                  <p className="text-sm text-muted-foreground">Mode haute précision (consomme plus de batterie)</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Écran Toujours Actif</Label>
                  <p className="text-sm text-muted-foreground">Garder l'affichage actif pendant le suivi</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div>
                <Label htmlFor="update-frequency" className="text-base">Fréquence de Mise à Jour</Label>
                <Select defaultValue="3">
                  <SelectTrigger id="update-frequency" className="mt-1 rounded-xl h-12">
                    <SelectValue placeholder="Sélectionnez la fréquence" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="1">1 seconde</SelectItem>
                    <SelectItem value="3">3 secondes</SelectItem>
                    <SelectItem value="5">5 secondes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="notification-interval" className="text-base">Intervalle de Notification</Label>
                <Select defaultValue="5">
                  <SelectTrigger id="notification-interval" className="mt-1 rounded-xl h-12">
                    <SelectValue placeholder="Sélectionnez l'intervalle" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="1">Toutes les 1 minute</SelectItem>
                    <SelectItem value="5">Toutes les 5 minutes</SelectItem>
                    <SelectItem value="10">Toutes les 10 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <WidgetCustomizer
        widgets={widgets}
        isCustomizingWidgets={isCustomizingWidgets}
        onToggleCustomization={() => setIsCustomizingWidgets(!isCustomizingWidgets)}
        onMoveWidget={moveWidget}
        onToggleWidgetVisibility={toggleWidgetVisibility}
      />
      
      <TrackingWidgets
        widgets={widgets}
        trackingData={trackingData}
        isTracking={isTracking}
        isCustomizingWidgets={isCustomizingWidgets}
        teamMembers={teamMembers}
      />
      
      <TrackingControls
        isTracking={isTracking}
        isPaused={isPaused}
        onStartTracking={handleStartTracking}
        onStopTracking={handleStopTracking}
      />
    </div>
  );
};

export default TrackPage;

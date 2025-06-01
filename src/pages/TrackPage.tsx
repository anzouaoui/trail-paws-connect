
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Play, Pause, Timer, MapPin, Activity, 
  Heart, BarChart, MoreHorizontal, ChevronDown, 
  User, Users, Zap, Flame, ArrowDownUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DogAvatar from "@/components/DogAvatar";

// Widget interface for type safety
interface Widget {
  id: string;
  type: 'stats' | 'timer' | 'map' | 'partners' | 'goals';
  title: string;
  position: number;
  visible: boolean;
  icon: React.ReactNode;
}

const TrackPage = () => {
  const { toast } = useToast();
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [distance, setDistance] = useState("0.0");
  const [speed, setSpeed] = useState("0.0");
  const [heartRate, setHeartRate] = useState("--");
  const [calories, setCalories] = useState("0");
  const [isPaused, setIsPaused] = useState(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [selectedDogIndex, setSelectedDogIndex] = useState(0);
  const [isCustomizingWidgets, setIsCustomizingWidgets] = useState(false);
  
  // Sample dogs with expanded properties
  const dogs = [
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
  const teamMembers = [
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

  // Format time for display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0'),
    ].join(':');
  };

  // Update timer and simulate activity data
  useEffect(() => {
    if (isTracking && !isPaused) {
      const interval = setInterval(() => {
        setElapsedSeconds(prev => {
          const newTime = prev + 1;
          setElapsedTime(formatTime(newTime));
          return newTime;
        });
        
        // Simulate changing values for distance and other metrics
        if (elapsedSeconds % 5 === 0) {
          const currentDistance = parseFloat(distance);
          const newDistance = (currentDistance + 0.01).toFixed(1);
          setDistance(newDistance);
          
          // Random speed between 8-12 km/h
          const newSpeed = (8 + Math.random() * 4).toFixed(1);
          setSpeed(newSpeed);
          
          // Random heart rate for dog (120-180 bpm)
          const newHeartRate = Math.floor(120 + Math.random() * 60).toString();
          setHeartRate(newHeartRate);
          
          // Increment calories
          const newCalories = (parseInt(calories) + 2).toString();
          setCalories(newCalories);
        }
      }, 1000);
      
      setTimerInterval(interval);
      return () => clearInterval(interval);
    }
  }, [isTracking, isPaused, elapsedSeconds, distance, calories]);

  const handleStartTracking = () => {
    if (!isTracking) {
      // Starting a new activity
      setIsTracking(true);
      setIsPaused(false);
      toast({
        title: "Activité Commencée",
        description: `Suivi commencé avec ${dogs[selectedDogIndex].name}`,
      });
    } else if (isPaused) {
      // Resuming
      setIsPaused(false);
      toast({
        description: "Activité reprise",
      });
    } else {
      // Pausing
      setIsPaused(true);
      if (timerInterval) clearInterval(timerInterval);
      toast({
        description: "Activité en pause",
      });
    }
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    setIsPaused(false);
    if (timerInterval) clearInterval(timerInterval);
    
    // Would normally save the activity here
    toast({
      title: "Activité Terminée",
      description: `Vous avez parcouru ${distance}km en ${elapsedTime}`,
      variant: "default",
    });
    
    // Reset values for next activity
    setTimeout(() => {
      setElapsedTime("00:00:00");
      setElapsedSeconds(0);
      setDistance("0.0");
      setSpeed("0.0");
      setHeartRate("--");
      setCalories("0");
    }, 2000);
  };

  const handleDogSelection = (index: number) => {
    setSelectedDogIndex(index);
    toast({
      description: `${dogs[index].name} est prêt pour l'action !`,
    });
  };
  
  // Filter visible widgets and sort by position
  const visibleWidgets = widgets
    .filter(widget => widget.visible || isCustomizingWidgets)
    .sort((a, b) => a.position - b.position);

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
      
      {isCustomizingWidgets && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <Card className="rounded-2xl border-forest border-dashed shadow-sm bg-forest/5">
            <CardHeader className="p-3">
              <CardTitle className="text-sm flex items-center justify-between">
                <span>Personnaliser le Tableau de Bord</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 rounded-lg"
                  onClick={() => setIsCustomizingWidgets(false)}
                >
                  Terminé
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-xs text-muted-foreground mb-3">Glissez et arrangez les widgets ou basculez la visibilité</p>
              <div className="space-y-2">
                {widgets.map(widget => (
                  <div key={widget.id} 
                    className="flex items-center justify-between p-2 bg-background rounded-xl border"
                  >
                    <div className="flex items-center gap-2">
                      <span className="p-1 bg-muted rounded-md">{widget.icon}</span>
                      <span>{widget.title}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => moveWidget(widget.id, 'up')}
                        disabled={widget.position === 0}
                      >
                        <ChevronDown className="h-4 w-4 rotate-180" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => moveWidget(widget.id, 'down')}
                        disabled={widget.position === widgets.length - 1}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                      <Switch 
                        checked={widget.visible}
                        onCheckedChange={() => toggleWidgetVisibility(widget.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      
      <div className="space-y-4">
        <AnimatePresence>
          {visibleWidgets.map((widget) => (
            <motion.div
              key={widget.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ type: "spring", bounce: 0.2 }}
              className={`${!widget.visible && isCustomizingWidgets ? 'opacity-50' : ''}`}
            >
              {/* Widget: Activity Stats */}
              {widget.id === 'stats' && (
                <Card className="rounded-2xl shadow-sm overflow-hidden">
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-forest" />
                      Statistiques d'Activité
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-muted/50 rounded-xl p-3 text-center">
                        <div className="text-2xl font-bold">{distance} km</div>
                        <div className="text-xs text-muted-foreground">Distance</div>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-3 text-center">
                        <div className="text-2xl font-bold">{speed} km/h</div>
                        <div className="text-xs text-muted-foreground">Vitesse</div>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-3 text-center">
                        <div className="text-2xl font-bold flex items-center justify-center gap-1">
                          {heartRate}
                          <Heart className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="text-xs text-muted-foreground">Rythme Cardiaque</div>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-3 text-center">
                        <div className="text-2xl font-bold flex items-center justify-center gap-1">
                          {calories}
                          <Flame className="h-4 w-4 text-orange-500" />
                        </div>
                        <div className="text-xs text-muted-foreground">Calories</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Widget: Timer */}
              {widget.id === 'timer' && (
                <Card className="rounded-2xl shadow-sm overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center">
                      <motion.div
                        key={elapsedTime}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl font-bold tracking-wider text-center font-mono"
                      >
                        {elapsedTime}
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Widget: Map */}
              {widget.id === 'map' && (
                <Card className="rounded-2xl shadow-sm overflow-hidden">
                  <div className="bg-gray-100 rounded-lg h-52 flex items-center justify-center relative">
                    {isTracking ? (
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-forest/5 to-forest/20 flex items-center justify-center">
                        <div className="text-center p-4">
                          <MapPin className="h-8 w-8 mx-auto mb-2 text-forest animate-pulse" />
                          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2">
                            <p className="font-semibold">Suivi Actif</p>
                            <p className="text-sm text-forest">{distance}km parcourus</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <MapPin className="h-8 w-8 mx-auto mb-2" />
                        <p>La vue carte apparaîtra ici</p>
                        <p className="text-sm">Commencez le suivi pour voir votre itinéraire</p>
                      </div>
                    )}
                  </div>
                </Card>
              )}
              
              {/* Widget: Team Partners */}
              {widget.id === 'partners' && (
                <Card className="rounded-2xl shadow-sm overflow-hidden">
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Users className="h-4 w-4 text-sky" />
                      Partenaires d'Équipe
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {teamMembers.map((member) => (
                        <div key={member.id} className="flex flex-col items-center min-w-[70px]">
                          <div className="relative">
                            <div className="h-12 w-12 rounded-full bg-sky/10 flex items-center justify-center">
                              <User className="h-6 w-6 text-sky" />
                            </div>
                            <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                              member.online ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                          </div>
                          <div className="text-sm font-medium mt-1">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.lastActivity}</div>
                        </div>
                      ))}
                      <div className="flex flex-col items-center justify-center min-w-[70px]">
                        <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                          <Users className="h-5 w-5" />
                        </Button>
                        <div className="text-sm mt-1">Inviter</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Widget: Goals */}
              {widget.id === 'goals' && (
                <Card className="rounded-2xl shadow-sm overflow-hidden">
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      Objectifs du Jour
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      <div className="bg-muted/50 rounded-xl p-3">
                        <div className="flex justify-between items-center mb-1">
                          <div className="font-medium text-sm">Objectif Distance</div>
                          <div className="text-xs font-medium">{distance}/5.0 km</div>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-forest rounded-full" 
                            style={{ width: `${(parseFloat(distance) / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 rounded-xl p-3">
                        <div className="flex justify-between items-center mb-1">
                          <div className="font-medium text-sm">Temps d'Entraînement</div>
                          <div className="text-xs font-medium">{elapsedTime}/00:30:00</div>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-sky rounded-full" 
                            style={{ width: `${(elapsedSeconds / 1800) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        <div className="pt-4">
          {isTracking ? (
            <div className="grid grid-cols-2 gap-3">
              <Button 
                className={`py-6 text-lg rounded-2xl ${isPaused ? 'bg-forest' : 'bg-amber-500'}`}
                onClick={handleStartTracking}
              >
                {isPaused ? (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    Reprendre
                  </>
                ) : (
                  <>
                    <Pause className="h-5 w-5 mr-2" />
                    Pause
                  </>
                )}
              </Button>
              <Button 
                className="bg-destructive py-6 text-lg rounded-2xl"
                onClick={handleStopTracking}
              >
                <Timer className="h-5 w-5 mr-2" />
                Terminer
              </Button>
            </div>
          ) : (
            <Button 
              className="w-full py-6 text-lg bg-forest rounded-2xl"
              onClick={handleStartTracking}
            >
              <Play className="h-5 w-5 mr-2" />
              Commencer le Suivi
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackPage;

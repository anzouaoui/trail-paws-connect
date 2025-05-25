
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsPanel from "@/components/StatsPanel";
import DogAvatar from "@/components/DogAvatar";
import { ActivityType } from "@/components/ActivityCard";
import { motion } from "framer-motion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Trophy, Zap, Heart, Sparkles, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const StatsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month">("week");
  
  // Sample data for stats
  const weeklyData = [
    { date: "Lun", distance: 3.2, duration: 25, pace: 7.8, heartRate: 135 },
    { date: "Mar", distance: 0, duration: 0, pace: 0, heartRate: 0 },
    { date: "Mer", distance: 4.5, duration: 32, pace: 7.1, heartRate: 142 },
    { date: "Jeu", distance: 2.8, duration: 22, pace: 7.9, heartRate: 138 },
    { date: "Ven", distance: 0, duration: 0, pace: 0, heartRate: 0 },
    { date: "Sam", distance: 6.7, duration: 45, pace: 6.7, heartRate: 151 },
    { date: "Dim", distance: 5.3, duration: 38, pace: 7.2, heartRate: 145 }
  ];

  const monthlyData = [
    { date: "Sem 1", distance: 15.4, duration: 125, pace: 7.5, heartRate: 140 },
    { date: "Sem 2", distance: 18.7, duration: 145, pace: 7.3, heartRate: 143 },
    { date: "Sem 3", distance: 12.8, duration: 95, pace: 7.8, heartRate: 138 },
    { date: "Sem 4", distance: 21.3, duration: 160, pace: 7.0, heartRate: 147 }
  ];

  const activityTypes = [
    { type: "canicross" as ActivityType, count: 12 },
    { type: "cani-hiking" as ActivityType, count: 8 },
    { type: "cani-MTB" as ActivityType, count: 5 }
  ];

  const dogs = [
    { name: "Max", breed: "Border Collie", achievements: ["Maître des Montagnes", "Spécialiste Sprint"], energy: 92, health: 95 },
    { name: "Bella", breed: "Husky", achievements: ["Pro Endurance", "Explorateur de Sentiers"], energy: 88, health: 91 }
  ];

  // Achievements cards
  const achievements = [
    { title: "Club 100km", description: "Complété 100km d'activités suivies", icon: <Trophy className="h-5 w-5 text-sunny" />, progress: 75 },
    { title: "Lève-tôt", description: "Complété 10 séances matinales", icon: <Zap className="h-5 w-5 text-sky" />, progress: 90 },
    { title: "Chef de Meute", description: "Invité 5 amis à rejoindre l'app", icon: <Heart className="h-5 w-5 text-earth" />, progress: 40 }
  ];

  return (
    <div className="px-4 py-6 pb-24 space-y-6">
      <header className="mb-2">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-bold"
        >
          Vos Performances
        </motion.h1>
        <p className="text-muted-foreground">Suivez vos progrès et réussites</p>
      </header>
      
      <div className="mb-4">
        <Tabs defaultValue="you" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-2xl p-1 h-14">
            <TabsTrigger 
              value="you" 
              className="rounded-xl text-base data-[state=active]:bg-forest data-[state=active]:text-white"
            >
              Vous
            </TabsTrigger>
            {dogs.map((dog, index) => (
              <TabsTrigger 
                key={index} 
                value={dog.name.toLowerCase()}
                className="rounded-xl text-base data-[state=active]:bg-forest data-[state=active]:text-white"
              >
                {dog.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="you" className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant={selectedPeriod === "week" ? "default" : "outline"} 
                onClick={() => setSelectedPeriod("week")}
                className="rounded-xl h-12 font-medium"
              >
                Cette Semaine
              </Button>
              <Button 
                variant={selectedPeriod === "month" ? "default" : "outline"} 
                onClick={() => setSelectedPeriod("month")}
                className="rounded-xl h-12 font-medium"
              >
                Ce Mois
              </Button>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <StatsPanel 
                weeklyData={weeklyData} 
                monthlyData={monthlyData} 
                activityTypes={activityTypes} 
              />
            </motion.div>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">Aperçus Santé</h2>
              <div className="grid grid-cols-2 gap-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Heart className="h-5 w-5 text-forest" />
                          FC Moyenne
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-forest">143 BPM</div>
                        <p className="text-sm text-muted-foreground">Zone saine</p>
                      </CardContent>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 p-4 rounded-2xl">
                    <div className="space-y-2">
                      <h4 className="font-medium">Analyse Fréquence Cardiaque</h4>
                      <p className="text-sm">Votre fréquence cardiaque moyenne pendant les activités est dans la zone aérobie saine, améliorant la condition cardiovasculaire.</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Zap className="h-5 w-5 text-sky" />
                          Taux de Récupération
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-sky">85%</div>
                        <p className="text-sm text-muted-foreground">Bonne condition</p>
                      </CardContent>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 p-4 rounded-2xl">
                    <div className="space-y-2">
                      <h4 className="font-medium">Analyse de Récupération</h4>
                      <p className="text-sm">Votre corps récupère bien entre les activités, permettant une amélioration constante des performances.</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </section>
            
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Réussites</h2>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-forest">
                  Voir Tout <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card className="w-full rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer">
                          <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="rounded-full bg-muted p-2">
                                {achievement.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{achievement.title}</h3>
                                <p className="text-xs text-muted-foreground">{achievement.description}</p>
                              </div>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center relative">
                              <div 
                                className="absolute inset-0 rounded-full border-4 border-forest"
                                style={{ 
                                  clipPath: `circle(${achievement.progress}% at 50% 50%)` 
                                }}
                              />
                              <span className="text-sm font-bold">{achievement.progress}%</span>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="rounded-2xl sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {achievement.icon}
                            {achievement.title}
                          </DialogTitle>
                          <DialogDescription>
                            Continuez comme ça ! Vous progressez vers cette réussite.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <p className="text-sm">Complétez les activités restantes pour débloquer ce badge et gagner des récompenses spéciales !</p>
                          <div className="bg-muted h-2 rounded-full w-full">
                            <div 
                              className="bg-forest h-2 rounded-full" 
                              style={{ width: `${achievement.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-right text-muted-foreground">{achievement.progress}% terminé</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </motion.div>
                ))}
              </div>
            </section>
          </TabsContent>
          
          {dogs.map((dog, index) => (
            <TabsContent key={index} value={dog.name.toLowerCase()} className="mt-6 space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center mb-6"
              >
                <DogAvatar name={dog.name} size="lg" showBadge breed={dog.breed} />
                <h2 className="text-xl font-bold mt-3">{dog.name}</h2>
                <p className="text-muted-foreground">{dog.breed}</p>
                <div className="flex gap-2 mt-2">
                  {dog.achievements.map((achievement, i) => (
                    <Badge key={i} variant="outline" className="rounded-full bg-muted/50">
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <StatsPanel 
                  weeklyData={weeklyData.map(d => ({ ...d, distance: d.distance * 0.8 }))} 
                  monthlyData={monthlyData.map(d => ({ ...d, distance: d.distance * 0.8 }))} 
                  activityTypes={activityTypes.map(a => ({ ...a, count: Math.floor(a.count * 0.8) }))} 
                />
              </motion.div>
              
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Aperçus Santé</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-forest" />
                        Niveau d'Énergie
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold text-earth">{dog.energy}%</div>
                      <p className="text-sm text-muted-foreground">Au-dessus de la moyenne</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Heart className="h-5 w-5 text-forest" />
                        Score Santé
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold text-forest">{dog.health}/100</div>
                      <p className="text-sm text-muted-foreground">Excellente condition</p>
                    </CardContent>
                  </Card>
                </div>
              </section>
              
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Activités Récentes</h2>
                <Card className="overflow-hidden rounded-2xl shadow-sm">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {[1, 2, 3].map((_, i) => (
                        <div key={i} className="flex items-center gap-3 pb-3 border-b last:border-none last:pb-0">
                          <Avatar className="h-10 w-10 rounded-xl">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-muted rounded-xl">
                              {dog.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium">{i === 0 ? "Course Matinale" : i === 1 ? "Aventure Sentier" : "Promenade du Soir"}</h4>
                            <p className="text-xs text-muted-foreground">{i === 0 ? "3.2km • 25min" : i === 1 ? "5.8km • 48min" : "2.1km • 30min"}</p>
                          </div>
                          <Badge variant={i === 0 ? "default" : i === 1 ? "outline" : "secondary"} className="rounded-full">
                            {i === 0 ? "Canicross" : i === 1 ? "Randonnée" : "Promenade"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default StatsPage;

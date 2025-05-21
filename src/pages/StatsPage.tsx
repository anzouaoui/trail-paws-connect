
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
    { date: "Mon", distance: 3.2, duration: 25, pace: 7.8, heartRate: 135 },
    { date: "Tue", distance: 0, duration: 0, pace: 0, heartRate: 0 },
    { date: "Wed", distance: 4.5, duration: 32, pace: 7.1, heartRate: 142 },
    { date: "Thu", distance: 2.8, duration: 22, pace: 7.9, heartRate: 138 },
    { date: "Fri", distance: 0, duration: 0, pace: 0, heartRate: 0 },
    { date: "Sat", distance: 6.7, duration: 45, pace: 6.7, heartRate: 151 },
    { date: "Sun", distance: 5.3, duration: 38, pace: 7.2, heartRate: 145 }
  ];

  const monthlyData = [
    { date: "Week 1", distance: 15.4, duration: 125, pace: 7.5, heartRate: 140 },
    { date: "Week 2", distance: 18.7, duration: 145, pace: 7.3, heartRate: 143 },
    { date: "Week 3", distance: 12.8, duration: 95, pace: 7.8, heartRate: 138 },
    { date: "Week 4", distance: 21.3, duration: 160, pace: 7.0, heartRate: 147 }
  ];

  const activityTypes = [
    { type: "canicross" as ActivityType, count: 12 },
    { type: "cani-hiking" as ActivityType, count: 8 },
    { type: "cani-MTB" as ActivityType, count: 5 }
  ];

  const dogs = [
    { name: "Max", breed: "Border Collie", achievements: ["Mountain Master", "Sprint Specialist"], energy: 92, health: 95 },
    { name: "Bella", breed: "Husky", achievements: ["Endurance Pro", "Trail Explorer"], energy: 88, health: 91 }
  ];

  // Achievements cards
  const achievements = [
    { title: "100km Club", description: "Completed 100km of tracked activities", icon: <Trophy className="h-5 w-5 text-sunny" />, progress: 75 },
    { title: "Early Bird", description: "Completed 10 morning sessions", icon: <Zap className="h-5 w-5 text-sky" />, progress: 90 },
    { title: "Pack Leader", description: "Invited 5 friends to the app", icon: <Heart className="h-5 w-5 text-earth" />, progress: 40 }
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
          Your Performance
        </motion.h1>
        <p className="text-muted-foreground">Track your progress & achievements</p>
      </header>
      
      <div className="mb-4">
        <Tabs defaultValue="you" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-2xl p-1 h-14">
            <TabsTrigger 
              value="you" 
              className="rounded-xl text-base data-[state=active]:bg-forest data-[state=active]:text-white"
            >
              You
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
                This Week
              </Button>
              <Button 
                variant={selectedPeriod === "month" ? "default" : "outline"} 
                onClick={() => setSelectedPeriod("month")}
                className="rounded-xl h-12 font-medium"
              >
                This Month
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
              <h2 className="text-xl font-semibold">Health Insights</h2>
              <div className="grid grid-cols-2 gap-4">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Heart className="h-5 w-5 text-forest" />
                          Avg. Heart Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-forest">143 BPM</div>
                        <p className="text-sm text-muted-foreground">Healthy zone</p>
                      </CardContent>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 p-4 rounded-2xl">
                    <div className="space-y-2">
                      <h4 className="font-medium">Heart Rate Analysis</h4>
                      <p className="text-sm">Your average heart rate during activities is in the healthy aerobic zone, improving cardiovascular fitness.</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Zap className="h-5 w-5 text-sky" />
                          Recovery Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-2xl font-bold text-sky">85%</div>
                        <p className="text-sm text-muted-foreground">Good condition</p>
                      </CardContent>
                    </Card>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 p-4 rounded-2xl">
                    <div className="space-y-2">
                      <h4 className="font-medium">Recovery Analysis</h4>
                      <p className="text-sm">Your body is recovering well between activities, allowing for consistent performance improvement.</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </section>
            
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Achievements</h2>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 text-forest">
                  View All <ChevronRight className="h-4 w-4" />
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
                            Keep up the great work! You're making progress toward this achievement.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <p className="text-sm">Complete the remaining activities to unlock this badge and earn special rewards!</p>
                          <div className="bg-muted h-2 rounded-full w-full">
                            <div 
                              className="bg-forest h-2 rounded-full" 
                              style={{ width: `${achievement.progress}%` }}
                            />
                          </div>
                          <p className="text-xs text-right text-muted-foreground">{achievement.progress}% complete</p>
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
                <h2 className="text-xl font-semibold">Health Insights</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-forest" />
                        Energy Level
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold text-earth">{dog.energy}%</div>
                      <p className="text-sm text-muted-foreground">Above average</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Heart className="h-5 w-5 text-forest" />
                        Health Score
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="text-2xl font-bold text-forest">{dog.health}/100</div>
                      <p className="text-sm text-muted-foreground">Excellent condition</p>
                    </CardContent>
                  </Card>
                </div>
              </section>
              
              <section className="space-y-4">
                <h2 className="text-xl font-semibold">Recent Activities</h2>
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
                            <h4 className="font-medium">{i === 0 ? "Morning Run" : i === 1 ? "Trail Adventure" : "Evening Walk"}</h4>
                            <p className="text-xs text-muted-foreground">{i === 0 ? "3.2km • 25min" : i === 1 ? "5.8km • 48min" : "2.1km • 30min"}</p>
                          </div>
                          <Badge variant={i === 0 ? "default" : i === 1 ? "outline" : "secondary"} className="rounded-full">
                            {i === 0 ? "Canicross" : i === 1 ? "Hiking" : "Walk"}
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

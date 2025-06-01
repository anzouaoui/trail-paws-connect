
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart, MapPin, Heart, Flame, Users, User, Zap
} from "lucide-react";
import { Widget, TrackingData, TeamMember } from "@/types/tracking";

interface TrackingWidgetsProps {
  widgets: Widget[];
  trackingData: TrackingData;
  isTracking: boolean;
  isCustomizingWidgets: boolean;
  teamMembers: TeamMember[];
}

const TrackingWidgets: React.FC<TrackingWidgetsProps> = ({
  widgets,
  trackingData,
  isTracking,
  isCustomizingWidgets,
  teamMembers
}) => {
  const visibleWidgets = widgets
    .filter(widget => widget.visible || isCustomizingWidgets)
    .sort((a, b) => a.position - b.position);

  return (
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
                      <div className="text-2xl font-bold">{trackingData.distance} km</div>
                      <div className="text-xs text-muted-foreground">Distance</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold">{trackingData.speed} km/h</div>
                      <div className="text-xs text-muted-foreground">Vitesse</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold flex items-center justify-center gap-1">
                        {trackingData.heartRate}
                        <Heart className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="text-xs text-muted-foreground">Rythme Cardiaque</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-3 text-center">
                      <div className="text-2xl font-bold flex items-center justify-center gap-1">
                        {trackingData.calories}
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
                      key={trackingData.elapsedTime}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-4xl font-bold tracking-wider text-center font-mono"
                    >
                      {trackingData.elapsedTime}
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
                          <p className="text-sm text-forest">{trackingData.distance}km parcourus</p>
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
                        <div className="text-xs font-medium">{trackingData.distance}/5.0 km</div>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-forest rounded-full" 
                          style={{ width: `${(parseFloat(trackingData.distance) / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 rounded-xl p-3">
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-medium text-sm">Temps d'Entraînement</div>
                        <div className="text-xs font-medium">{trackingData.elapsedTime}/00:30:00</div>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-sky rounded-full" 
                          style={{ width: `${(trackingData.elapsedSeconds / 1800) * 100}%` }}
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
    </div>
  );
};

export default TrackingWidgets;

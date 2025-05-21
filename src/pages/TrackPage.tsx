
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, Timer, MapPin } from "lucide-react";
import DogAvatar from "@/components/DogAvatar";

const TrackPage = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [distance, setDistance] = useState("0.0");
  
  // Sample dogs
  const dogs = [
    { name: "Max", breed: "Border Collie" },
    { name: "Bella", breed: "Husky" }
  ];

  const handleStartTracking = () => {
    setIsTracking(true);
    // Here you would start actual GPS tracking logic
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    // Here you would stop tracking and save the activity
  };

  return (
    <div className="px-4 py-6 pb-24">
      <h1 className="text-2xl font-bold mb-6">Track Activity</h1>
      
      <Tabs defaultValue="activity" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="mb-4">
                <Label htmlFor="activity-type">Activity Type</Label>
                <Select defaultValue="canicross">
                  <SelectTrigger id="activity-type" className="mt-1">
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="canicross">Canicross</SelectItem>
                    <SelectItem value="cani-hiking">Cani-hiking</SelectItem>
                    <SelectItem value="cani-MTB">Cani-MTB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-4">
                <Label>Dog Partner</Label>
                <div className="flex space-x-3 mt-2">
                  {dogs.map((dog, index) => (
                    <div key={index} className={`p-2 border rounded-lg cursor-pointer transition-all ${index === 0 ? 'bg-forest-light/20 border-forest' : ''}`}>
                      <DogAvatar name={dog.name} size="sm" />
                      <span className="block text-center text-sm mt-1">{dog.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <Switch id="auto-pause" />
                <Label htmlFor="auto-pause">Auto-pause when stopped</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Voice Feedback</Label>
                  <p className="text-sm text-muted-foreground">Receive audio updates during activity</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>GPS Accuracy</Label>
                  <p className="text-sm text-muted-foreground">High precision mode (uses more battery)</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Screen Always On</Label>
                  <p className="text-sm text-muted-foreground">Keep display active during tracking</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div>
                <Label htmlFor="update-frequency">Update Frequency</Label>
                <Select defaultValue="3">
                  <SelectTrigger id="update-frequency" className="mt-1">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 second</SelectItem>
                    <SelectItem value="3">3 seconds</SelectItem>
                    <SelectItem value="5">5 seconds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="activity-card">
        <div className="bg-gray-100 rounded-lg h-52 mb-4 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p>Map view will appear here</p>
            <p className="text-sm">Start tracking to see your route</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="stats-card h-24 justify-center items-center">
            <Timer className="h-6 w-6 text-forest mb-1" />
            <span className="text-2xl font-semibold">{elapsedTime}</span>
            <span className="text-xs text-muted-foreground">Duration</span>
          </div>
          <div className="stats-card h-24 justify-center items-center">
            <MapPin className="h-6 w-6 text-sky mb-1" />
            <span className="text-2xl font-semibold">{distance} km</span>
            <span className="text-xs text-muted-foreground">Distance</span>
          </div>
        </div>
        
        <Button 
          className={`w-full py-6 text-lg ${isTracking ? 'bg-destructive' : 'bg-forest'}`}
          onClick={isTracking ? handleStopTracking : handleStartTracking}
        >
          {isTracking ? (
            <>
              <Pause className="h-5 w-5 mr-2" />
              Stop Activity
            </>
          ) : (
            <>
              <Play className="h-5 w-5 mr-2" />
              Start Tracking
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default TrackPage;

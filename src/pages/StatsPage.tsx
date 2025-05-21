
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsPanel from "@/components/StatsPanel";
import DogAvatar from "@/components/DogAvatar";

const StatsPage = () => {
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
    { type: "canicross", count: 12 },
    { type: "cani-hiking", count: 8 },
    { type: "cani-MTB", count: 5 }
  ];

  const dogs = [
    { name: "Max", breed: "Border Collie" },
    { name: "Bella", breed: "Husky" }
  ];

  return (
    <div className="px-4 py-6 pb-24">
      <h1 className="text-2xl font-bold mb-6">Your Performance</h1>
      
      <div className="mb-4">
        <Tabs defaultValue="you" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="you">You</TabsTrigger>
            {dogs.map((dog, index) => (
              <TabsTrigger key={index} value={dog.name.toLowerCase()}>
                {dog.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="you" className="mt-4">
            <StatsPanel 
              weeklyData={weeklyData} 
              monthlyData={monthlyData} 
              activityTypes={activityTypes} 
            />
            
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-3">Health Insights</h2>
              <div className="grid grid-cols-2 gap-3">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Avg. Heart Rate</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="text-2xl font-bold text-forest">143 BPM</div>
                    <p className="text-sm text-muted-foreground">Healthy zone</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Recovery Rate</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="text-2xl font-bold text-sky">85%</div>
                    <p className="text-sm text-muted-foreground">Good condition</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {dogs.map((dog, index) => (
            <TabsContent key={index} value={dog.name.toLowerCase()} className="mt-4">
              <div className="flex justify-center mb-4">
                <DogAvatar name={dog.name} size="lg" showBadge breed={dog.breed} />
              </div>
              
              <StatsPanel 
                weeklyData={weeklyData.map(d => ({ ...d, distance: d.distance * 0.8 }))} 
                monthlyData={monthlyData.map(d => ({ ...d, distance: d.distance * 0.8 }))} 
                activityTypes={activityTypes.map(a => ({ ...a, count: Math.floor(a.count * 0.8) }))} 
              />
              
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-3">Health Insights</h2>
                <div className="grid grid-cols-2 gap-3">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">Rest Time</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="text-2xl font-bold text-forest">11.4 hrs</div>
                      <p className="text-sm text-muted-foreground">Daily average</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">Energy Level</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="text-2xl font-bold text-earth">92%</div>
                      <p className="text-sm text-muted-foreground">Above average</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default StatsPage;


import React from "react";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityType } from "./ActivityCard";

interface StatsData {
  date: string;
  distance: number;
  duration: number;
  pace: number;
  heartRate?: number;
}

interface StatsPanelProps {
  weeklyData: StatsData[];
  monthlyData: StatsData[];
  activityTypes: {
    type: ActivityType;
    count: number;
  }[];
}

const StatsPanel = ({ weeklyData, monthlyData, activityTypes }: StatsPanelProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg">Performance Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="space-y-4">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value}km`}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="distance" 
                    stroke="#2D6A4F" 
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="stats-card">
                <span className="text-sm text-muted-foreground">Total Distance</span>
                <span className="text-xl font-semibold text-forest">
                  {weeklyData.reduce((acc, curr) => acc + curr.distance, 0).toFixed(1)} km
                </span>
              </div>
              <div className="stats-card">
                <span className="text-sm text-muted-foreground">Average Pace</span>
                <span className="text-xl font-semibold text-sky">
                  {(weeklyData.reduce((acc, curr) => acc + curr.pace, 0) / weeklyData.length).toFixed(1)} min/km
                </span>
              </div>
              <div className="stats-card">
                <span className="text-sm text-muted-foreground">Activities</span>
                <span className="text-xl font-semibold text-earth">
                  {weeklyData.length}
                </span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly" className="space-y-4">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value}km`}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="distance" 
                    stroke="#1A85FF" 
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityTypes}>
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2D6A4F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StatsPanel;

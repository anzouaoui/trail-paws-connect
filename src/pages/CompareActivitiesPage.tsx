
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for activities
const availableActivities = [
  { 
    id: "1", 
    title: "Morning Run with Rex", 
    date: "May 20, 2023", 
    distance: 5.2, 
    duration: "45:32", 
    pace: "8:45",
    dog: "Rex",
    color: "#2D6A4F"
  },
  { 
    id: "2", 
    title: "Evening Jog with Bella", 
    date: "May 18, 2023", 
    distance: 3.7, 
    duration: "32:15", 
    pace: "8:42",
    dog: "Bella",
    color: "#1A85FF"
  },
  { 
    id: "3", 
    title: "Park Loop with Max", 
    date: "May 15, 2023", 
    distance: 4.5, 
    duration: "41:10", 
    pace: "9:08",
    dog: "Max",
    color: "#FF5A5F"
  },
  { 
    id: "4", 
    title: "Trail Run with Rex", 
    date: "May 12, 2023", 
    distance: 6.1, 
    duration: "58:45", 
    pace: "9:38",
    dog: "Rex",
    color: "#2D6A4F"
  },
  { 
    id: "5", 
    title: "Beach Run with Bella", 
    date: "May 8, 2023", 
    distance: 4.2, 
    duration: "38:20", 
    pace: "9:07",
    dog: "Bella",
    color: "#1A85FF"
  }
];

// Mock comparison data
const paceComparisonData = [
  { distance: 0, act1: 0, act2: 0, act3: 0 },
  { distance: 1, act1: 8.8, act2: 8.5, act3: 9.1 },
  { distance: 2, act1: 8.7, act2: 8.7, act3: 9.2 },
  { distance: 3, act1: 8.5, act2: 9.0, act3: 9.4 },
  { distance: 4, act1: 8.9, act2: 8.8, act3: 9.6 },
  { distance: 5, act1: 9.2, act2: null, act3: null }
];

const heartRateComparisonData = [
  { distance: 0, act1: 110, act2: 115, act3: 112 },
  { distance: 1, act1: 145, act2: 152, act3: 148 },
  { distance: 2, act1: 155, act2: 158, act3: 150 },
  { distance: 3, act1: 160, act2: 162, act3: 155 },
  { distance: 4, act1: 158, act2: 160, act3: 152 },
  { distance: 5, act1: 152, act2: null, act3: null }
];

const CompareActivitiesPage = () => {
  const navigate = useNavigate();
  const [selectedActivities, setSelectedActivities] = useState<typeof availableActivities>([]);
  const [showActivitySelector, setShowActivitySelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredActivities = availableActivities.filter(activity => 
    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    activity.dog.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSelectActivity = (activity: typeof availableActivities[0]) => {
    if (selectedActivities.length < 3 && !selectedActivities.find(a => a.id === activity.id)) {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };
  
  const handleRemoveActivity = (activityId: string) => {
    setSelectedActivities(selectedActivities.filter(a => a.id !== activityId));
  };
  
  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Compare Activities</h1>
          <div className="flex-1"></div>
          <Button variant="outline" onClick={() => setSelectedActivities([])}>
            Clear All
          </Button>
        </div>
        
        {/* Selected Activities Display */}
        <div className="px-4 pb-3 flex overflow-x-auto gap-2">
          {selectedActivities.map((activity, index) => (
            <Badge 
              key={activity.id} 
              className="whitespace-nowrap px-3 py-1.5 flex items-center"
              style={{ backgroundColor: activity.color + '20', color: activity.color }}
            >
              <span>{activity.title}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-5 w-5 p-0 ml-1 rounded-full"
                onClick={() => handleRemoveActivity(activity.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          
          {selectedActivities.length < 3 && (
            <Button 
              variant="outline" 
              size="sm"
              className="whitespace-nowrap"
              onClick={() => setShowActivitySelector(true)}
            >
              + Add Activity
            </Button>
          )}
        </div>
      </div>

      <div className="p-4">
        {selectedActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 rounded-full bg-muted p-6">
              <Calendar className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">No Activities Selected</h3>
            <p className="mb-6 text-sm text-muted-foreground max-w-xs">
              Select up to 3 activities to compare their metrics side by side
            </p>
            <Button onClick={() => setShowActivitySelector(true)}>
              Select Activities
            </Button>
          </div>
        ) : (
          <>
            {/* Statistics Comparison */}
            <Card className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Statistics Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Activity</TableHead>
                        <TableHead>Distance</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Avg Pace</TableHead>
                        <TableHead>Dog</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedActivities.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: activity.color }}
                              ></div>
                              {activity.title}
                            </div>
                          </TableCell>
                          <TableCell>{activity.distance} km</TableCell>
                          <TableCell>{activity.duration}</TableCell>
                          <TableCell>{activity.pace} min/km</TableCell>
                          <TableCell>{activity.dog}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            {/* Chart Comparisons */}
            <Tabs defaultValue="pace" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="pace">Pace</TabsTrigger>
                <TabsTrigger value="heartrate">Heart Rate</TabsTrigger>
                <TabsTrigger value="elevation">Elevation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pace" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Pace Comparison (min/km)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={paceComparisonData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="distance" label={{ value: "Distance (km)", position: "insideBottom", offset: -5 }} />
                          <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} label={{ value: "Pace (min/km)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          {selectedActivities.map((activity, index) => (
                            <Line
                              key={activity.id}
                              type="monotone"
                              dataKey={`act${index + 1}`}
                              name={activity.title}
                              stroke={activity.color}
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                              connectNulls
                            />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-muted/20">
                      <h4 className="font-medium text-sm mb-1">Analysis</h4>
                      <p className="text-xs text-muted-foreground">
                        The park loop run shows a faster pace throughout, with a significant speed increase in the middle section.
                        The trail run shows a more consistent pace but slows during elevation changes.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="heartrate" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Heart Rate Comparison (bpm)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={heartRateComparisonData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="distance" label={{ value: "Distance (km)", position: "insideBottom", offset: -5 }} />
                          <YAxis domain={[100, 180]} label={{ value: "Heart Rate (bpm)", angle: -90, position: "insideLeft" }} />
                          <Tooltip />
                          {selectedActivities.map((activity, index) => (
                            <Line
                              key={activity.id}
                              type="monotone"
                              dataKey={`act${index + 1}`}
                              name={activity.title}
                              stroke={activity.color}
                              strokeWidth={2}
                              dot={{ r: 3 }}
                              activeDot={{ r: 5 }}
                              connectNulls
                            />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-muted/20">
                      <h4 className="font-medium text-sm mb-1">Analysis</h4>
                      <p className="text-xs text-muted-foreground">
                        Heart rate patterns are similar across activities, with peak exertion around the 3km mark.
                        The evening jog shows higher heart rate throughout, possibly due to warmer temperatures.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="elevation" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Elevation Profiles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-center p-8">
                      <div className="text-muted-foreground">
                        <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>Select activities with elevation data to compare profiles</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
      
      {/* Activity Selector Dialog */}
      <Dialog open={showActivitySelector} onOpenChange={setShowActivitySelector}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Select Activities</DialogTitle>
            <DialogDescription>
              Choose up to 3 activities to compare
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {filteredActivities.map(activity => (
                <div 
                  key={activity.id}
                  className={`p-3 rounded-lg border cursor-pointer hover:bg-muted/20 ${
                    selectedActivities.find(a => a.id === activity.id) ? 'bg-muted/20 border-primary' : ''
                  }`}
                  onClick={() => handleSelectActivity(activity)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      <p className="text-xs text-muted-foreground">{activity.date} • {activity.distance} km</p>
                    </div>
                    <Badge variant="outline">{activity.dog}</Badge>
                  </div>
                </div>
              ))}
              
              {filteredActivities.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  No activities found matching your search
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={() => setShowActivitySelector(false)}>Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CompareActivitiesPage;

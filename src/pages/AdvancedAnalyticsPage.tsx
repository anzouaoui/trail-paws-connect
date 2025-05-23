
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart, 
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Mock data for charts
const speedData = [
  { date: "Mon", speed: 8.2, avgSpeed: 7.5, elevation: 45 },
  { date: "Tue", speed: 7.8, avgSpeed: 7.5, elevation: 30 },
  { date: "Wed", speed: 8.5, avgSpeed: 7.5, elevation: 60 },
  { date: "Thu", speed: 8.9, avgSpeed: 7.5, elevation: 25 },
  { date: "Fri", speed: 9.1, avgSpeed: 7.5, elevation: 40 },
  { date: "Sat", speed: 8.7, avgSpeed: 7.5, elevation: 50 },
  { date: "Sun", speed: 8.3, avgSpeed: 7.5, elevation: 35 }
];

const cadenceData = [
  { date: "Mon", cadence: 165, avgCadence: 170, heartRate: 142 },
  { date: "Tue", cadence: 168, avgCadence: 170, heartRate: 145 },
  { date: "Wed", cadence: 172, avgCadence: 170, heartRate: 151 },
  { date: "Thu", cadence: 175, avgCadence: 170, heartRate: 148 },
  { date: "Fri", cadence: 171, avgCadence: 170, heartRate: 152 },
  { date: "Sat", cadence: 169, avgCadence: 170, heartRate: 146 },
  { date: "Sun", cadence: 170, avgCadence: 170, heartRate: 144 }
];

const dogHealthData = [
  { date: "Mon", heartRate: 120, restingRate: 80, activity: 85 },
  { date: "Tue", heartRate: 125, restingRate: 80, activity: 90 },
  { date: "Wed", heartRate: 130, restingRate: 80, activity: 95 },
  { date: "Thu", heartRate: 128, restingRate: 80, activity: 88 },
  { date: "Fri", heartRate: 122, restingRate: 80, activity: 82 },
  { date: "Sat", heartRate: 118, restingRate: 80, activity: 75 },
  { date: "Sun", heartRate: 121, restingRate: 80, activity: 80 }
];

const chartConfig = {
  speed: {
    label: "Speed (km/h)",
    theme: {
      light: "#2D6A4F",
      dark: "#2D6A4F"
    }
  },
  avgSpeed: {
    label: "Avg Speed",
    theme: {
      light: "#95D5B2",
      dark: "#95D5B2"
    }
  },
  cadence: {
    label: "Cadence (spm)",
    theme: {
      light: "#1A85FF",
      dark: "#1A85FF"
    }
  },
  avgCadence: {
    label: "Avg Cadence",
    theme: {
      light: "#A0C4FF",
      dark: "#A0C4FF"
    }
  },
  heartRate: {
    label: "Heart Rate (bpm)",
    theme: {
      light: "#FF5A5F",
      dark: "#FF5A5F"
    }
  },
  restingRate: {
    label: "Resting Rate",
    theme: {
      light: "#FFB2B2",
      dark: "#FFB2B2"
    }
  },
  elevation: {
    label: "Elevation (m)",
    theme: {
      light: "#876800",
      dark: "#876800"
    }
  },
  activity: {
    label: "Activity (%)",
    theme: {
      light: "#52B788",
      dark: "#52B788"
    }
  }
};

const AdvancedAnalyticsPage = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("week");
  const [selectedDog, setSelectedDog] = useState("all");

  const dogs = [
    { id: "all", name: "All Dogs" },
    { id: "rex", name: "Rex" },
    { id: "bella", name: "Bella" },
    { id: "max", name: "Max" }
  ];

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
          <h1 className="text-xl font-bold">Advanced Analytics</h1>
          <div className="flex-1"></div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mr-2 flex items-center"
            asChild
          >
            <div>
              <Calendar className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Last 7 days</span>
              <ChevronDown className="h-3 w-3 ml-1" />
            </div>
          </Button>
        </div>
        <div className="px-4 pb-2 flex items-center justify-between">
          <div>
            <Select value={selectedDog} onValueChange={setSelectedDog}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select Dog" />
              </SelectTrigger>
              <SelectContent>
                {dogs.map(dog => (
                  <SelectItem key={dog.id} value={dog.id}>{dog.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {timeRange === "week" ? "Weekly" : timeRange === "month" ? "Monthly" : "All Time"}
                  <ChevronDown className="ml-2 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTimeRange("week")}>Weekly</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange("month")}>Monthly</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeRange("all")}>All Time</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="elevation">Elevation</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
          </TabsList>
          
          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Speed & Pace</span>
                  <Button variant="outline" size="sm" onClick={() => navigate("/analytics/speed")}>Details</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={speedData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="speed" 
                          name="speed" 
                          stroke="var(--color-speed)" 
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="avgSpeed" 
                          name="avgSpeed" 
                          stroke="var(--color-avgSpeed)"
                          strokeDasharray="5 5" 
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="mt-2">
                    <ChartContainer config={chartConfig}>
                      <ChartLegendContent 
                        payload={[
                          { value: 'Speed (km/h)', id: 'speed', dataKey: 'speed', color: '#2D6A4F' },
                          { value: 'Avg Speed', id: 'avgSpeed', dataKey: 'avgSpeed', color: '#95D5B2' }
                        ]}
                      />
                    </ChartContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Cadence</span>
                  <Button variant="outline" size="sm" onClick={() => navigate("/analytics/cadence")}>Details</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={cadenceData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="cadence" 
                          name="cadence" 
                          stroke="var(--color-cadence)" 
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="avgCadence" 
                          name="avgCadence" 
                          stroke="var(--color-avgCadence)"
                          strokeDasharray="5 5"
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="mt-2">
                    <ChartContainer config={chartConfig}>
                      <ChartLegendContent 
                        payload={[
                          { value: 'Cadence (spm)', id: 'cadence', dataKey: 'cadence', color: '#1A85FF' },
                          { value: 'Avg Cadence', id: 'avgCadence', dataKey: 'avgCadence', color: '#A0C4FF' }
                        ]}
                      />
                    </ChartContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Elevation Tab */}
          <TabsContent value="elevation" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Elevation Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={speedData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="elevation" 
                          name="elevation" 
                          stroke="var(--color-elevation)" 
                          fill="var(--color-elevation)" 
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="mt-2">
                    <ChartContainer config={chartConfig}>
                      <ChartLegendContent 
                        payload={[
                          { value: 'Elevation (m)', id: 'elevation', dataKey: 'elevation', color: '#876800' }
                        ]}
                      />
                    </ChartContainer>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="bg-muted/20 p-3 rounded-lg text-center">
                    <div className="text-lg font-semibold text-forest">542m</div>
                    <div className="text-xs text-muted-foreground">Total Ascent</div>
                  </div>
                  <div className="bg-muted/20 p-3 rounded-lg text-center">
                    <div className="text-lg font-semibold text-red-500">489m</div>
                    <div className="text-xs text-muted-foreground">Total Descent</div>
                  </div>
                  <div className="bg-muted/20 p-3 rounded-lg text-center">
                    <div className="text-lg font-semibold">78m</div>
                    <div className="text-xs text-muted-foreground">Max Elevation</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Health Tab */}
          <TabsContent value="health" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center justify-between">
                  <span>Dog Heart Rate</span>
                  <Button variant="outline" size="sm" onClick={() => navigate("/analytics/health")}>Details</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dogHealthData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="heartRate" 
                          name="heartRate" 
                          stroke="var(--color-heartRate)" 
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="restingRate" 
                          name="restingRate" 
                          stroke="var(--color-restingRate)"
                          strokeDasharray="5 5"
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="mt-2">
                    <ChartContainer config={chartConfig}>
                      <ChartLegendContent 
                        payload={[
                          { value: 'Heart Rate (bpm)', id: 'heartRate', dataKey: 'heartRate', color: '#FF5A5F' },
                          { value: 'Resting Rate', id: 'restingRate', dataKey: 'restingRate', color: '#FFB2B2' }
                        ]}
                      />
                    </ChartContainer>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg border-l-4 border-amber-400 bg-amber-50">
                  <div className="text-sm font-medium">Health Alert</div>
                  <div className="text-xs text-muted-foreground">Rex's heart rate peaked above normal range on Wednesday. Consider checking with your vet.</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Activity Level</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dogHealthData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="activity" name="activity" fill="var(--color-activity)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                  <div className="mt-2">
                    <ChartContainer config={chartConfig}>
                      <ChartLegendContent 
                        payload={[
                          { value: 'Activity (%)', id: 'activity', dataKey: 'activity', color: '#52B788' }
                        ]}
                      />
                    </ChartContainer>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg border-l-4 border-green-400 bg-green-50">
                  <div className="text-sm font-medium">Weekly Goal</div>
                  <div className="text-xs text-muted-foreground">Your dogs have reached 87% of their weekly activity goal. Keep it up!</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsPage;

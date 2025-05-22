
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Smartphone, 
  Watch, 
  Wifi, 
  Check, 
  X, 
  Plus,
  ChevronRight,
  Power,
  Battery,
  CreditCard,
  WifiOff
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data for devices
const humanDevices = [
  {
    id: "1",
    name: "Apple Watch Series 8",
    type: "watch",
    brand: "Apple",
    status: "connected",
    lastSync: "5 minutes ago",
    batteryLevel: 68,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=200&auto=format&fit=crop",
    metrics: ["heart_rate", "steps", "calories", "distance", "elevation"]
  },
  {
    id: "2",
    name: "Garmin Forerunner 945",
    type: "watch",
    brand: "Garmin",
    status: "disconnected",
    lastSync: "2 days ago",
    batteryLevel: 42,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=200&auto=format&fit=crop",
    metrics: ["heart_rate", "steps", "calories", "distance", "elevation", "sleep"]
  },
  {
    id: "3",
    name: "iPhone 14 Pro",
    type: "phone",
    brand: "Apple",
    status: "connected",
    lastSync: "2 minutes ago",
    batteryLevel: 85,
    image: "https://images.unsplash.com/photo-1606041011872-596597976b25?q=80&w=200&auto=format&fit=crop",
    metrics: ["steps", "distance"]
  }
];

const dogDevices = [
  {
    id: "4",
    name: "FitBark GPS",
    type: "tracker",
    brand: "FitBark",
    status: "connected",
    lastSync: "10 minutes ago",
    batteryLevel: 72,
    dog: "Rex",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=200&auto=format&fit=crop",
    metrics: ["location", "activity", "sleep", "calories"]
  },
  {
    id: "5",
    name: "Whistle Go Explore",
    type: "tracker",
    brand: "Whistle",
    status: "low_battery",
    lastSync: "30 minutes ago",
    batteryLevel: 15,
    dog: "Bella",
    image: "https://images.unsplash.com/photo-1567361428548-c694bb39b266?q=80&w=200&auto=format&fit=crop",
    metrics: ["location", "activity", "sleep", "calories", "scratching", "licking"]
  }
];

// Available devices to add
const availableDevices = [
  {
    id: "add1",
    name: "Apple Watch",
    type: "watch",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "add2",
    name: "Garmin",
    type: "watch",
    brand: "Garmin",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "add3",
    name: "Fitbit",
    type: "watch",
    brand: "Fitbit",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b3?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "add4",
    name: "FitBark",
    type: "dog_tracker",
    brand: "FitBark",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "add5",
    name: "Whistle",
    type: "dog_tracker",
    brand: "Whistle",
    image: "https://images.unsplash.com/photo-1567361428548-c694bb39b266?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "add6",
    name: "Tractive",
    type: "dog_tracker",
    brand: "Tractive",
    image: "https://images.unsplash.com/photo-1546421845-6471bdcf3edf?q=80&w=200&auto=format&fit=crop"
  }
];

interface DeviceCardProps {
  device: any;
  onToggle?: () => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onToggle }) => {
  return (
    <Card className="mb-3">
      <CardContent className="p-3">
        <div className="flex items-center">
          <Avatar className="h-14 w-14 mr-3 rounded-md">
            <AvatarImage src={device.image} alt={device.name} className="object-cover" />
            <AvatarFallback className="rounded-md">
              {device.type === "watch" ? (
                <Watch className="h-6 w-6" />
              ) : device.type === "phone" ? (
                <Smartphone className="h-6 w-6" />
              ) : (
                <Wifi className="h-6 w-6" />
              )}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{device.name}</h3>
                <p className="text-xs text-muted-foreground">{device.brand}</p>
              </div>
              {device.dog && (
                <Badge variant="outline">{device.dog}</Badge>
              )}
            </div>
            
            <div className="flex items-center mt-1.5 justify-between">
              <div className="flex items-center">
                {device.status === "connected" ? (
                  <>
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 flex items-center gap-1 mr-2">
                      <Wifi className="h-3 w-3" />
                      Connected
                    </Badge>
                    <span className="text-xs text-muted-foreground">Last sync: {device.lastSync}</span>
                  </>
                ) : device.status === "low_battery" ? (
                  <>
                    <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 flex items-center gap-1 mr-2">
                      <Battery className="h-3 w-3" />
                      Low Battery
                    </Badge>
                    <span className="text-xs text-muted-foreground">Last sync: {device.lastSync}</span>
                  </>
                ) : (
                  <>
                    <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 flex items-center gap-1 mr-2">
                      <WifiOff className="h-3 w-3" />
                      Disconnected
                    </Badge>
                    <span className="text-xs text-muted-foreground">Last sync: {device.lastSync}</span>
                  </>
                )}
              </div>
              <Switch checked={device.status !== "disconnected"} onCheckedChange={onToggle} />
            </div>
            
            {device.batteryLevel && (
              <div className="flex items-center mt-2">
                <div className="text-xs text-muted-foreground mr-2">
                  {device.batteryLevel}%
                </div>
                <Progress 
                  value={device.batteryLevel} 
                  max={100} 
                  className={`h-1.5 flex-1 ${
                    device.batteryLevel < 20 ? "bg-red-100" : 
                    device.batteryLevel < 50 ? "bg-amber-100" : 
                    "bg-gray-100"
                  }`}
                />
                <Battery className={`h-3.5 w-3.5 ml-2 ${
                  device.batteryLevel < 20 ? "text-red-500" : 
                  device.batteryLevel < 50 ? "text-amber-500" : 
                  "text-gray-500"
                }`} />
              </div>
            )}
          </div>
        </div>
        
        {device.metrics && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex flex-wrap gap-1">
              {device.metrics.map((metric: string) => (
                <Badge key={metric} variant="secondary" className="text-xs">
                  {metric.replace('_', ' ')}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DeviceIntegrationPage = () => {
  const navigate = useNavigate();
  const [showAddDeviceDialog, setShowAddDeviceDialog] = useState(false);
  const [localHumanDevices, setLocalHumanDevices] = useState(humanDevices);
  const [localDogDevices, setLocalDogDevices] = useState(dogDevices);
  
  const toggleDeviceStatus = (deviceList: string, deviceId: string) => {
    if (deviceList === "human") {
      setLocalHumanDevices(localHumanDevices.map(device => 
        device.id === deviceId 
          ? { 
              ...device, 
              status: device.status === "connected" ? "disconnected" : "connected",
              lastSync: device.status === "disconnected" ? "Just now" : device.lastSync
            } 
          : device
      ));
    } else {
      setLocalDogDevices(localDogDevices.map(device => 
        device.id === deviceId 
          ? { 
              ...device, 
              status: device.status === "connected" || device.status === "low_battery" ? "disconnected" : "connected",
              lastSync: device.status === "disconnected" ? "Just now" : device.lastSync
            } 
          : device
      ));
    }
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
          <h1 className="text-xl font-bold">Devices</h1>
          <div className="flex-1"></div>
          <Button 
            variant="outline" 
            onClick={() => setShowAddDeviceDialog(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="dog" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="dog">Dog Devices</TabsTrigger>
            <TabsTrigger value="human">Your Devices</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dog" className="space-y-4">
            <Card className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Dog Device Settings</CardTitle>
                <CardDescription>Configure how dog devices sync with the app</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Real-time Location</p>
                      <p className="text-sm text-muted-foreground">Update location every 2 minutes</p>
                    </div>
                    <Switch id="real-time-location" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Health Metrics</p>
                      <p className="text-sm text-muted-foreground">Sync activity and health data hourly</p>
                    </div>
                    <Switch id="health-metrics" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Low Battery Alerts</p>
                      <p className="text-sm text-muted-foreground">Notify when battery below 20%</p>
                    </div>
                    <Switch id="battery-alerts" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div>
              <h3 className="font-medium text-sm pl-1 mb-3">Connected Devices</h3>
              
              {localDogDevices.length > 0 ? (
                localDogDevices.map((device) => (
                  <DeviceCard 
                    key={device.id} 
                    device={device} 
                    onToggle={() => toggleDeviceStatus("dog", device.id)} 
                  />
                ))
              ) : (
                <div className="text-center py-10 bg-muted/20 rounded-lg border border-dashed">
                  <Wifi className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="font-medium mb-1">No Dog Devices</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto">
                    Connect a GPS tracker or activity monitor for your dog
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddDeviceDialog(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Dog Device
                  </Button>
                </div>
              )}
              
              {localDogDevices.length > 0 && (
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-dashed"
                  onClick={() => setShowAddDeviceDialog(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Device
                </Button>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="human" className="space-y-4">
            <Card className="mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Your Device Settings</CardTitle>
                <CardDescription>Configure how your devices sync with the app</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-Sync Workouts</p>
                      <p className="text-sm text-muted-foreground">Import runs from your devices</p>
                    </div>
                    <Switch id="auto-sync" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sync Heart Rate</p>
                      <p className="text-sm text-muted-foreground">Include heart rate data in activities</p>
                    </div>
                    <Switch id="heart-rate" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-Start Detection</p>
                      <p className="text-sm text-muted-foreground">Detect when you start running</p>
                    </div>
                    <Switch id="auto-start" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div>
              <h3 className="font-medium text-sm pl-1 mb-3">Connected Devices</h3>
              
              {localHumanDevices.length > 0 ? (
                localHumanDevices.map((device) => (
                  <DeviceCard 
                    key={device.id} 
                    device={device} 
                    onToggle={() => toggleDeviceStatus("human", device.id)} 
                  />
                ))
              ) : (
                <div className="text-center py-10 bg-muted/20 rounded-lg border border-dashed">
                  <Watch className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="font-medium mb-1">No Devices Connected</h3>
                  <p className="text-sm text-muted-foreground mb-4 max-w-xs mx-auto">
                    Connect your smartwatch or fitness device to track your runs
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddDeviceDialog(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your Device
                  </Button>
                </div>
              )}
              
              {localHumanDevices.length > 0 && (
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-dashed"
                  onClick={() => setShowAddDeviceDialog(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Device
                </Button>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add Device Dialog */}
      <Dialog open={showAddDeviceDialog} onOpenChange={setShowAddDeviceDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Device</DialogTitle>
            <DialogDescription>
              Connect a new wearable or GPS tracking device
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Tabs defaultValue="device" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="device">Select Device</TabsTrigger>
                <TabsTrigger value="scan">Scan for Device</TabsTrigger>
              </TabsList>
              
              <TabsContent value="device" className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {availableDevices.map((device) => (
                    <Card 
                      key={device.id} 
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() => {
                        // In a real app, this would open a device-specific connection flow
                        // Here we'll just close the dialog
                        setShowAddDeviceDialog(false);
                      }}
                    >
                      <CardContent className="p-3 flex flex-col items-center text-center">
                        <Avatar className="h-16 w-16 mb-2 mt-2">
                          <AvatarImage src={device.image} alt={device.name} className="object-cover" />
                          <AvatarFallback>
                            {device.type === "watch" ? (
                              <Watch className="h-6 w-6" />
                            ) : (
                              <Wifi className="h-6 w-6" />
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-medium">{device.name}</h3>
                        <p className="text-xs text-muted-foreground">{device.brand}</p>
                        <Badge 
                          variant="outline" 
                          className="mt-2"
                        >
                          {device.type === "dog_tracker" ? "Dog Tracker" : "Wearable"}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setShowAddDeviceDialog(false);
                  }}
                >
                  Don't see your device? Add manually
                </Button>
              </TabsContent>
              
              <TabsContent value="scan" className="space-y-4">
                <div className="text-center py-10">
                  <div className="animate-pulse mb-4">
                    <Wifi className="h-12 w-12 mx-auto text-forest" />
                  </div>
                  <h3 className="font-medium mb-2">Scanning for Devices...</h3>
                  <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                    Make sure your device is in pairing mode and nearby
                  </p>
                  <Button variant="outline" onClick={() => setShowAddDeviceDialog(false)}>
                    Cancel
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeviceIntegrationPage;

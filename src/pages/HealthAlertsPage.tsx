
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Heart, 
  Calendar, 
  AlertCircle, 
  Bell, 
  Pill, 
  Check,
  ChevronRight,
  Plus,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";

// Mock reminder data
const reminders = [
  {
    id: "1",
    title: "Annual Vet Checkup",
    description: "Comprehensive health examination for Rex",
    date: "2023-06-15",
    time: "10:00",
    dog: "Rex",
    type: "vet",
    priority: "high",
    status: "upcoming"
  },
  {
    id: "2",
    title: "Heartworm Medication",
    description: "Monthly preventative for Bella",
    date: "2023-05-28",
    time: "09:00",
    dog: "Bella",
    type: "medication",
    priority: "medium",
    status: "upcoming"
  },
  {
    id: "3",
    title: "Rabies Vaccination",
    description: "3-year vaccination for Max",
    date: "2023-07-03",
    time: "14:30",
    dog: "Max",
    type: "vaccination",
    priority: "high",
    status: "upcoming"
  },
  {
    id: "4",
    title: "Dental Cleaning",
    description: "Annual dental exam and cleaning for Rex",
    date: "2023-08-20",
    time: "11:15",
    dog: "Rex",
    type: "dental",
    priority: "medium",
    status: "upcoming"
  }
];

// Mock alerts data
const healthAlerts = [
  {
    id: "1",
    title: "Elevated Heart Rate",
    description: "Rex's heart rate peaked above 160bpm on your last activity",
    date: "2023-05-19",
    dog: "Rex",
    type: "heart-rate",
    priority: "medium",
    status: "unread"
  },
  {
    id: "2",
    title: "Activity Reduction",
    description: "Bella's weekly activity has decreased by 35% from last week",
    date: "2023-05-18",
    dog: "Bella",
    type: "activity",
    priority: "low",
    status: "unread"
  },
  {
    id: "3",
    title: "Weight Change Alert",
    description: "Max has gained 3.2 lbs in the past month",
    date: "2023-05-15",
    dog: "Max",
    type: "weight",
    priority: "high",
    status: "read"
  },
  {
    id: "4",
    title: "Recovery Time Increased",
    description: "Rex is taking longer to recover after intense activities",
    date: "2023-05-10",
    dog: "Rex",
    type: "recovery",
    priority: "medium",
    status: "read"
  }
];

interface ReminderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (reminder: any) => void;
}

const ReminderDialog: React.FC<ReminderDialogProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [dog, setDog] = useState("");
  const [type, setType] = useState("vet");
  const [priority, setPriority] = useState("medium");

  const handleSave = () => {
    if (!title || !dog || !date) {
      alert("Please fill in all required fields.");
      return;
    }

    const formatted = date ? date.toISOString().split('T')[0] : '';
    
    onSave({
      id: Date.now().toString(),
      title,
      description,
      date: formatted,
      time: time || "09:00",
      dog,
      type,
      priority,
      status: "upcoming"
    });

    setTitle("");
    setDescription("");
    setDate(undefined);
    setTime("");
    setDog("");
    setType("vet");
    setPriority("medium");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Health Reminder</DialogTitle>
          <DialogDescription>
            Create a new health reminder for your dog
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title*
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="Vet appointment"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Annual checkup"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Date*</Label>
            <div className="col-span-3">
              <DatePicker date={date} setDate={setDate} />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dog" className="text-right">
              Dog*
            </Label>
            <Select value={dog} onValueChange={setDog}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a dog" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rex">Rex</SelectItem>
                <SelectItem value="Bella">Bella</SelectItem>
                <SelectItem value="Max">Max</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vet">Vet Appointment</SelectItem>
                <SelectItem value="medication">Medication</SelectItem>
                <SelectItem value="vaccination">Vaccination</SelectItem>
                <SelectItem value="grooming">Grooming</SelectItem>
                <SelectItem value="dental">Dental Care</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Reminder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const HealthAlertsPage = () => {
  const navigate = useNavigate();
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [localReminders, setLocalReminders] = useState(reminders);
  
  const handleAddReminder = (newReminder: any) => {
    setLocalReminders([newReminder, ...localReminders]);
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
          <h1 className="text-xl font-bold">Health Alerts</h1>
          <div className="flex-1"></div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowReminderDialog(true)}
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="alerts">Health Alerts</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Alert Settings</CardTitle>
                <CardDescription>Configure health monitoring thresholds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Heart Rate Monitoring</p>
                      <p className="text-sm text-muted-foreground">Alert when above normal range</p>
                    </div>
                    <Switch id="heart-rate-monitoring" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Activity Level Changes</p>
                      <p className="text-sm text-muted-foreground">Alert on significant decreases</p>
                    </div>
                    <Switch id="activity-monitoring" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Weight Changes</p>
                      <p className="text-sm text-muted-foreground">Alert on weight gain/loss</p>
                    </div>
                    <Switch id="weight-monitoring" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Recovery Time</p>
                      <p className="text-sm text-muted-foreground">Alert on extended recovery periods</p>
                    </div>
                    <Switch id="recovery-monitoring" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-3">
              <h3 className="font-medium text-sm pl-1">Recent Alerts</h3>
              
              {healthAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`border p-3 rounded-lg ${
                    alert.status === "unread" ? "bg-muted/20" : ""
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`
                      p-2 rounded-full mr-3 mt-0.5
                      ${alert.type === "heart-rate" ? "bg-red-100 text-red-500" : 
                        alert.type === "activity" ? "bg-amber-100 text-amber-500" :
                        alert.type === "weight" ? "bg-blue-100 text-blue-500" :
                        "bg-purple-100 text-purple-500"}
                    `}>
                      {alert.type === "heart-rate" ? <Heart className="h-4 w-4" /> : 
                        alert.type === "activity" ? <AlertCircle className="h-4 w-4" /> :
                        alert.type === "weight" ? <Pill className="h-4 w-4" /> :
                        <Clock className="h-4 w-4" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{alert.title}</h4>
                        <Badge variant="outline" className="ml-2">{alert.dog}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{alert.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">{alert.date}</span>
                        <div className="flex items-center">
                          <Badge 
                            variant="outline"
                            className={`
                              text-xs mr-2
                              ${alert.priority === "high" ? "border-red-200 bg-red-50 text-red-700" : 
                                alert.priority === "medium" ? "border-amber-200 bg-amber-50 text-amber-700" :
                                "border-green-200 bg-green-50 text-green-700"}
                            `}
                          >
                            {alert.priority.charAt(0).toUpperCase() + alert.priority.slice(1)}
                          </Badge>
                          {alert.status === "unread" && (
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Check className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reminders" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Reminder Preferences</CardTitle>
                <CardDescription>Customize how you receive health reminders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive reminders on your device</p>
                    </div>
                    <Switch id="push-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Advance Notice</p>
                      <p className="text-sm text-muted-foreground">Send reminders 3 days in advance</p>
                    </div>
                    <Switch id="advance-notice" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Calendar Integration</p>
                      <p className="text-sm text-muted-foreground">Add reminders to your calendar</p>
                    </div>
                    <Switch id="calendar-integration" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-3">
              <h3 className="font-medium text-sm pl-1">Upcoming Health Events</h3>
              
              {localReminders.map((reminder) => (
                <div 
                  key={reminder.id}
                  className="border p-3 rounded-lg"
                >
                  <div className="flex items-start">
                    <div className={`
                      p-2 rounded-full mr-3 mt-0.5
                      ${reminder.type === "vet" ? "bg-blue-100 text-blue-500" : 
                        reminder.type === "medication" ? "bg-purple-100 text-purple-500" :
                        reminder.type === "vaccination" ? "bg-green-100 text-green-500" :
                        reminder.type === "dental" ? "bg-cyan-100 text-cyan-500" :
                        "bg-amber-100 text-amber-500"}
                    `}>
                      {reminder.type === "vet" ? <Heart className="h-4 w-4" /> : 
                        reminder.type === "medication" ? <Pill className="h-4 w-4" /> :
                        reminder.type === "vaccination" ? <Pill className="h-4 w-4" /> :
                        reminder.type === "dental" ? <Pill className="h-4 w-4" /> :
                        <Calendar className="h-4 w-4" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{reminder.title}</h4>
                        <Badge variant="outline" className="ml-2">{reminder.dog}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{reminder.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          {reminder.date} • {reminder.time}
                        </span>
                        <Badge 
                          variant="outline"
                          className={`
                            text-xs
                            ${reminder.priority === "high" ? "border-red-200 bg-red-50 text-red-700" : 
                              reminder.priority === "medium" ? "border-amber-200 bg-amber-50 text-amber-700" :
                              "border-green-200 bg-green-50 text-green-700"}
                          `}
                        >
                          {reminder.priority.charAt(0).toUpperCase() + reminder.priority.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full mt-4 border-dashed"
                onClick={() => setShowReminderDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Health Reminder
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add Reminder Dialog */}
      <ReminderDialog 
        isOpen={showReminderDialog}
        onClose={() => setShowReminderDialog(false)}
        onSave={handleAddReminder}
      />
    </div>
  );
};

export default HealthAlertsPage;

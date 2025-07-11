import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, Edit, Trash2, Share, Clock, MapPin, 
  Flame, HeartPulse, BarChart3, Trophy, ArrowUpRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import DogAvatar from "@/components/DogAvatar";
import { ActivityType } from "@/components/ActivityCard";

// Mock activity data - in a real app would come from a database
const mockActivities = [
  {
    id: "1",
    title: "Morning Run with Max",
    type: "canicross" as ActivityType,
    date: "2025-05-21T08:30:00",
    duration: "45:32",
    distance: 5.7,
    location: "Central Park Trail",
    dogName: "Max",
    dogImage: undefined,
    dogBreed: "Border Collie",
    calories: 450,
    heartRate: { avg: 145, max: 172 },
    dogHeartRate: { avg: 125, max: 160 },
    elevation: { gain: 82, loss: 78 },
    pace: { avg: "5:12", best: "4:45" },
    notes: "Great morning run. Max was very energetic today. Weather was perfect with a slight breeze.",
    route: {
      startPoint: { lat: 40.7812, lng: -73.9665 },
      endPoint: { lat: 40.7712, lng: -73.9765 },
      // Would contain full route data in production
    },
    photos: [],
    likes: 14,
    achievements: [
      { title: "Early Bird", icon: "sunrise" },
      { title: "5K Club", icon: "award" }
    ]
  },
  {
    id: "2",
    title: "Hill Training",
    type: "cani-hiking" as ActivityType,
    date: "2025-05-19T15:20:00",
    duration: "1:12:05",
    distance: 7.3,
    location: "Mountain View Path",
    dogName: "Bella",
    dogImage: undefined,
    dogBreed: "Golden Retriever",
    calories: 720,
    heartRate: { avg: 155, max: 182 },
    dogHeartRate: { avg: 130, max: 165 },
    elevation: { gain: 245, loss: 240 },
    pace: { avg: "9:52", best: "8:15" },
    notes: "Challenging hike with steep inclines. Bella did amazing on the uphill sections.",
    route: {
      startPoint: { lat: 37.3861, lng: -122.0839 },
      endPoint: { lat: 37.4011, lng: -122.1089 },
      // Would contain full route data in production
    },
    photos: [],
    likes: 23,
    achievements: [
      { title: "Mountain Goat", icon: "mountain" },
      { title: "Consistent Pace", icon: "activity" }
    ]
  }
];

const ActivityDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Find the activity based on ID
  const activity = mockActivities.find(a => a.id === id);

  if (!activity) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">Activity Not Found</h2>
        <p className="text-muted-foreground mb-8">The activity you're looking for doesn't exist or has been deleted.</p>
        <Button onClick={() => navigate("/profile")}>Go Back to Profile</Button>
      </div>
    );
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const handleEdit = () => {
    navigate(`/activity/${id}/edit`);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    // Simulate deletion
    setTimeout(() => {
      toast({
        title: "Activity Deleted",
        description: "Activity has been successfully deleted",
      });
      navigate("/profile");
    }, 1000);
  };

  const handleShare = async () => {
    try {
      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share({
          title: activity.title,
          text: `Check out my ${activity.type} activity: ${activity.distance}km in ${activity.duration}!`,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        toast({
          title: "Share",
          description: "Sharing options would appear here",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        variant: "destructive",
        title: "Share Failed",
        description: "Unable to share this activity",
      });
    }
  };

  const activityColors = {
    "canicross": "bg-forest text-white",
    "cani-hiking": "bg-earth text-white",
    "cani-MTB": "bg-sky text-white"
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold flex-1">Activity Details</h1>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleEdit}
            >
              <Edit className="h-5 w-5 text-forest" />
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  disabled={isDeleting}
                >
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Activity</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your activity record.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleShare}
            >
              <Share className="h-5 w-5 text-sky" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 space-y-6">
        {/* Activity Title and Basic Info */}
        <div>
          <h2 className="text-2xl font-bold mb-1">{activity.title}</h2>
          <div className="flex items-center text-muted-foreground">
            <span>{formatDateTime(activity.date)}</span>
            <span className="mx-2">•</span>
            <Badge className={activityColors[activity.type]}>
              {activity.type}
            </Badge>
          </div>
        </div>

        {/* Map Section */}
        <Card className="overflow-hidden">
          <div className="h-48 bg-muted relative">
            {/* This would be replaced with an actual map component in production */}
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-forest" />
              <p className="ml-2">Route map would display here</p>
            </div>
          </div>
        </Card>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-gradient-to-br from-forest/5 to-forest/10 border-forest/20">
            <CardContent className="p-3 text-center">
              <Clock className="h-5 w-5 mx-auto mb-1 text-forest" />
              <div className="font-semibold">{activity.duration}</div>
              <div className="text-xs text-muted-foreground">Duration</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-sky/5 to-sky/10 border-sky/20">
            <CardContent className="p-3 text-center">
              <MapPin className="h-5 w-5 mx-auto mb-1 text-sky" />
              <div className="font-semibold">{activity.distance} km</div>
              <div className="text-xs text-muted-foreground">Distance</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-500/5 to-amber-500/10 border-amber-500/20">
            <CardContent className="p-3 text-center">
              <BarChart3 className="h-5 w-5 mx-auto mb-1 text-amber-500" />
              <div className="font-semibold">{activity.pace.avg}</div>
              <div className="text-xs text-muted-foreground">Avg Pace</div>
            </CardContent>
          </Card>
        </div>

        {/* Dog Performance */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center mb-4">
              <DogAvatar name={activity.dogName} size="md" />
              <div className="ml-3">
                <h3 className="font-semibold">{activity.dogName}</h3>
                <p className="text-sm text-muted-foreground">{activity.dogBreed}</p>
              </div>
              <Badge className="ml-auto bg-green-100 text-green-800">Great Performance</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Heart Rate</div>
                <div className="flex items-baseline">
                  <span className="text-lg font-semibold">{activity.dogHeartRate.avg}</span>
                  <span className="text-xs text-muted-foreground ml-1">bpm avg</span>
                </div>
                <div className="text-xs text-muted-foreground flex items-center">
                  Peak: {activity.dogHeartRate.max} bpm
                  <ArrowUpRight className="h-3 w-3 ml-1 text-red-500" />
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground">Energy Level</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1.5 mb-1">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <div className="text-xs text-green-700">85% - Excellent</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">YOUR PERFORMANCE</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <HeartPulse className="h-5 w-5 text-red-500 mr-2" />
                  <div>
                    <div className="text-sm">Heart Rate</div>
                    <div className="flex items-baseline">
                      <span className="font-semibold">{activity.heartRate.avg}</span>
                      <span className="text-xs text-muted-foreground ml-1">bpm avg</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Flame className="h-5 w-5 text-orange-500 mr-2" />
                  <div>
                    <div className="text-sm">Calories</div>
                    <div className="flex items-baseline">
                      <span className="font-semibold">{activity.calories}</span>
                      <span className="text-xs text-muted-foreground ml-1">kcal</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <ArrowUpRight className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <div className="text-sm">Elevation Gain</div>
                    <div className="flex items-baseline">
                      <span className="font-semibold">{activity.elevation.gain}</span>
                      <span className="text-xs text-muted-foreground ml-1">m</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                  <div>
                    <div className="text-sm">Best Pace</div>
                    <div className="flex items-baseline">
                      <span className="font-semibold">{activity.pace.best}</span>
                      <span className="text-xs text-muted-foreground ml-1">min/km</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">LOCATION</h3>
              <p className="text-sm">{activity.location}</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">NOTES</h3>
              <p className="text-sm">{activity.notes}</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">ACHIEVEMENTS</h3>
              <div className="flex space-x-3">
                {activity.achievements.map((achievement, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-amber-500" />
                    </div>
                    <span className="text-xs mt-1">{achievement.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityDetailPage;

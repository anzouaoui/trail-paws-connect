
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, User, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

// Mock user data - would be fetched from a database in a real app
const mockUserProfile = {
  name: "John Doe",
  bio: "Trail enthusiast & dog lover",
  location: "Boulder, CO",
  fitnessGoals: "Complete a trail marathon with my dog",
  preferredActivities: ["canicross", "cani-hiking"],
  runningLevel: "intermediate",
  imageUrl: ""
};

const availableActivities = [
  { id: "canicross", label: "Canicross" },
  { id: "cani-hiking", label: "Cani-hiking" },
  { id: "bikejoring", label: "Bikejoring" },
  { id: "skijoring", label: "Skijoring" },
  { id: "scootering", label: "Scootering" }
];

const runnerFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().max(160, "Bio cannot exceed 160 characters"),
  location: z.string().optional(),
  fitnessGoals: z.string().optional(),
  runningLevel: z.string().optional()
});

type RunnerFormValues = z.infer<typeof runnerFormSchema>;

const RunnerProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // State for profile image and activities
  const [profileImage, setProfileImage] = useState<string | undefined>(mockUserProfile.imageUrl);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(mockUserProfile.preferredActivities);

  // Initialize form with existing user data
  const form = useForm<RunnerFormValues>({
    resolver: zodResolver(runnerFormSchema),
    defaultValues: {
      name: mockUserProfile.name,
      bio: mockUserProfile.bio,
      location: mockUserProfile.location,
      fitnessGoals: mockUserProfile.fitnessGoals,
      runningLevel: mockUserProfile.runningLevel
    }
  });

  const onSubmit = (data: RunnerFormValues) => {
    // In a real app, this would save to a database
    const updatedProfile = {
      ...data,
      preferredActivities: selectedActivities
    };
    
    console.log("Saving runner profile:", updatedProfile);
    
    toast({
      title: "Profile updated!",
      description: "Your runner profile has been updated successfully."
    });
    
    navigate("/profile");
  };

  const handleImageChange = () => {
    // This would open the device camera or file picker in a real app
    setProfileImage("/placeholder.svg");
    toast({
      title: "Feature coming soon",
      description: "Image upload functionality will be available soon."
    });
  };

  const toggleActivity = (activityId: string) => {
    setSelectedActivities(current => 
      current.includes(activityId)
        ? current.filter(id => id !== activityId)
        : [...current, activityId]
    );
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/profile")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Edit Runner Profile</h1>
          <div className="flex-1"></div>
          <Button 
            variant="ghost"
            size="icon"
            onClick={form.handleSubmit(onSubmit)}
            className="text-forest"
          >
            <Save className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile avatar/image */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-forest">
                  <AvatarImage src={profileImage} alt="Profile" />
                  <AvatarFallback className="bg-forest text-white">
                    {form.watch("name")?.split(" ")
                      .map(name => name[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  type="button"
                  size="icon"
                  className="absolute -bottom-2 -right-2 rounded-full bg-forest h-8 w-8"
                  onClick={handleImageChange}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Basic information */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Write a short bio"
                      className="resize-none"
                      {...field}
                      maxLength={160}
                    />
                  </FormControl>
                  <div className="text-xs text-muted-foreground text-right">
                    {field.value?.length || 0}/160
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="fitnessGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fitness Goals</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What are your fitness goals?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <p className="text-sm font-medium mb-2">Preferred Activities</p>
              <div className="flex flex-wrap gap-2">
                {availableActivities.map(activity => (
                  <Badge
                    key={activity.id}
                    variant={selectedActivities.includes(activity.id) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedActivities.includes(activity.id) 
                        ? "bg-forest hover:bg-forest/80" 
                        : "hover:bg-forest/10"
                    }`}
                    onClick={() => toggleActivity(activity.id)}
                  >
                    {activity.label}
                  </Badge>
                ))}
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="runningLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Running Experience</FormLabel>
                  <div className="grid grid-cols-4 gap-2">
                    {["beginner", "intermediate", "advanced", "elite"].map(level => (
                      <Button
                        key={level}
                        type="button"
                        variant={field.value === level ? "default" : "outline"}
                        className={field.value === level ? "bg-forest" : ""}
                        onClick={() => field.onChange(level)}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-forest text-white mt-6"
            >
              Save Profile
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RunnerProfilePage;

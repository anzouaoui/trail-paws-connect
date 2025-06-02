
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ActivityType } from "@/components/ActivityCard";
import ActivityFormHeader from "@/components/activity/ActivityFormHeader";
import GeneralInfoForm from "@/components/activity/GeneralInfoForm";
import PerformanceStatsForm from "@/components/activity/PerformanceStatsForm";
import DogPerformanceForm from "@/components/activity/DogPerformanceForm";
import ActivityNotesForm from "@/components/activity/ActivityNotesForm";

// Mock activity data - same as ActivityDetailPage
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
    },
    photos: [],
    likes: 23,
    achievements: [
      { title: "Mountain Goat", icon: "mountain" },
      { title: "Consistent Pace", icon: "activity" }
    ]
  }
];

interface ActivityFormData {
  title: string;
  type: ActivityType;
  distance: number;
  location: string;
  notes: string;
}

const EditActivityPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Simulate premium user status - in real app this would come from auth context
  const isPremiumUser = false; // Change to true to test premium features
  
  // Find the activity based on ID
  const activity = mockActivities.find(a => a.id === id);

  const form = useForm<ActivityFormData>({
    defaultValues: {
      title: activity?.title || "",
      type: activity?.type || "canicross",
      distance: activity?.distance || 0,
      location: activity?.location || "",
      notes: activity?.notes || "",
    },
  });

  if (!activity) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">Activité non trouvée</h2>
        <p className="text-muted-foreground mb-8">L'activité que vous cherchez n'existe pas ou a été supprimée.</p>
        <Button onClick={() => navigate("/profile")}>Retour au profil</Button>
      </div>
    );
  }

  const onSubmit = async (data: ActivityFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Données modifiées:", data);
      
      toast({
        title: "Activité modifiée",
        description: "Vos modifications ont été enregistrées avec succès",
      });
      
      setIsLoading(false);
      navigate(`/activity/${id}`);
    }, 1000);
  };

  const handleCancel = () => {
    navigate(`/activity/${id}`);
  };

  return (
    <div className="pb-24">
      <ActivityFormHeader
        isLoading={isLoading}
        isPremiumUser={isPremiumUser}
        activityId={id!}
        onCancel={handleCancel}
        onSave={form.handleSubmit(onSubmit)}
      />

      <div className="px-4 py-6 space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <GeneralInfoForm form={form} activity={activity} />
            <PerformanceStatsForm activity={activity} />
            <DogPerformanceForm activity={activity} />
            <ActivityNotesForm form={form} />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditActivityPage;

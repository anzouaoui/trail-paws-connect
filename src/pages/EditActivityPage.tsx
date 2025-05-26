
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ActivityType } from "@/components/ActivityCard";

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

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Format for datetime-local input
  };

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
          <h1 className="text-xl font-bold flex-1">Modifier l'activité</h1>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleCancel}
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-1" />
              Annuler
            </Button>
            <Button 
              size="sm"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isLoading}
              className="bg-forest"
            >
              <Save className="h-4 w-4 mr-1" />
              {isLoading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Informations générales */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations générales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre de l'activité</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Course matinale avec Max"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type d'activité</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="canicross">Canicross</SelectItem>
                          <SelectItem value="cani-hiking">Cani-randonnée</SelectItem>
                          <SelectItem value="cani-MTB">Cani-VTT</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date et heure</Label>
                    <Input
                      id="date"
                      type="datetime-local"
                      defaultValue={formatDateForInput(activity.date)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Durée</Label>
                    <Input
                      id="duration"
                      placeholder="Ex: 45:32"
                      defaultValue={activity.duration}
                      className="mt-1"
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="distance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distance (km)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          step="0.1"
                          placeholder="Ex: 5.7"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lieu</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Central Park Trail"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Statistiques de performance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistiques de performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="calories">Calories brûlées</Label>
                    <Input
                      id="calories"
                      type="number"
                      defaultValue={activity.calories}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="avgPace">Allure moyenne</Label>
                    <Input
                      id="avgPace"
                      placeholder="Ex: 5:12"
                      defaultValue={activity.pace.avg}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="avgHeartRate">Fréquence cardiaque moyenne</Label>
                    <Input
                      id="avgHeartRate"
                      type="number"
                      defaultValue={activity.heartRate.avg}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxHeartRate">Fréquence cardiaque max</Label>
                    <Input
                      id="maxHeartRate"
                      type="number"
                      defaultValue={activity.heartRate.max}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="elevationGain">Dénivelé positif (m)</Label>
                    <Input
                      id="elevationGain"
                      type="number"
                      defaultValue={activity.elevation.gain}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="elevationLoss">Dénivelé négatif (m)</Label>
                    <Input
                      id="elevationLoss"
                      type="number"
                      defaultValue={activity.elevation.loss}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performances du chien */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performances de {activity.dogName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dogAvgHeartRate">Fréquence cardiaque moyenne</Label>
                    <Input
                      id="dogAvgHeartRate"
                      type="number"
                      defaultValue={activity.dogHeartRate.avg}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dogMaxHeartRate">Fréquence cardiaque max</Label>
                    <Input
                      id="dogMaxHeartRate"
                      type="number"
                      defaultValue={activity.dogHeartRate.max}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commentaires sur l'activité</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Décrivez votre activité, les conditions météo, les performances de votre chien..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditActivityPage;

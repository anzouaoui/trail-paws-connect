
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Camera, Dog, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
} from "@/components/ui/select";
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

// Mock dog data - would be fetched from a database in a real app
const mockDogs = {
  "1": {
    id: "1",
    name: "Max",
    breed: "Border Collie",
    age: 3,
    weight: 18,
    weightUnit: "kg",
    imageSrc: undefined,
    sportPreference: "Canicross",
    level: "intermediate"
  },
  "2": {
    id: "2",
    name: "Bella",
    breed: "Golden Retriever",
    age: 2,
    weight: 25,
    weightUnit: "kg",
    imageSrc: undefined,
    sportPreference: "Cani-hiking",
    level: "beginner"
  }
};

const dogFormSchema = z.object({
  name: z.string().min(1, "Dog name is required"),
  breed: z.string().min(1, "Breed is required"),
  age: z.coerce.number().min(0).max(30, "Age must be between 0-30 years"),
  weight: z.coerce.number().min(0, "Weight must be a positive number"),
  weightUnit: z.string().default("kg"),
  sportPreference: z.string().optional(),
  level: z.enum(["beginner", "intermediate", "advanced", "professional"]).default("beginner"),
});

type DogFormValues = z.infer<typeof dogFormSchema>;

const DogProfileFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNewDog = id === "new";
  
  // State for dog image
  const [dogImage, setDogImage] = useState<string | undefined>(
    !isNewDog && id ? mockDogs[id]?.imageSrc : undefined
  );

  // Initialize form with existing dog data or defaults
  const form = useForm<DogFormValues>({
    resolver: zodResolver(dogFormSchema),
    defaultValues: !isNewDog && id && mockDogs[id] 
      ? {
          name: mockDogs[id].name,
          breed: mockDogs[id].breed,
          age: mockDogs[id].age,
          weight: mockDogs[id].weight,
          weightUnit: mockDogs[id].weightUnit,
          sportPreference: mockDogs[id].sportPreference,
          level: mockDogs[id].level as "beginner" | "intermediate" | "advanced" | "professional",
        }
      : {
          name: "",
          breed: "",
          age: 0,
          weight: 0,
          weightUnit: "kg",
          sportPreference: "",
          level: "beginner",
        }
  });

  const onSubmit = (data: DogFormValues) => {
    // In a real app, this would save to a database
    console.log("Saving dog profile:", data);
    
    toast({
      title: isNewDog ? "Dog profile created!" : "Dog profile updated!",
      description: `${data.name}'s profile has been ${isNewDog ? "created" : "updated"} successfully.`,
    });
    
    navigate("/dogs");
  };

  const handleDelete = () => {
    if (!isNewDog && id) {
      // In a real app, this would delete from a database
      console.log("Deleting dog profile:", id);
      
      toast({
        title: "Dog profile deleted",
        description: "The dog profile has been removed successfully.",
      });
      
      navigate("/dogs");
    }
  };

  const handleImageChange = () => {
    // This would open the device camera or file picker in a real app
    // For now, we'll just set a placeholder image
    setDogImage("/placeholder.svg");
    toast({
      title: "Feature coming soon",
      description: "Image upload functionality will be available soon."
    });
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/dogs")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">{isNewDog ? "Add New Dog" : "Edit Dog"}</h1>
          <div className="flex-1"></div>
          {!isNewDog && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleDelete}
              className="text-destructive"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Dog avatar/image */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-2 border-forest">
                  <AvatarImage src={dogImage} alt="Dog profile" />
                  <AvatarFallback className="bg-forest text-white">
                    <Dog className="h-12 w-12" />
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
                  <FormLabel>Dog Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your dog's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Breed</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your dog's breed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age (years)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter your dog's age" 
                      {...field} 
                      onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Weight" 
                        {...field} 
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="weightUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="lbs">lbs</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="sportPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Sport</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred sport" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Canicross">Canicross</SelectItem>
                      <SelectItem value="Cani-hiking">Cani-hiking</SelectItem>
                      <SelectItem value="Bikejoring">Bikejoring</SelectItem>
                      <SelectItem value="Skijoring">Skijoring</SelectItem>
                      <SelectItem value="Scootering">Scootering</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Level</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-forest text-white mt-6"
            >
              {isNewDog ? "Add Dog" : "Save Changes"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DogProfileFormPage;

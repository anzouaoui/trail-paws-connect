
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ActivityType } from "@/components/ActivityCard";

interface ActivityFormData {
  title: string;
  type: ActivityType;
  distance: number;
  location: string;
  notes: string;
}

interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  date: string;
  duration: string;
  distance: number;
  location: string;
  notes: string;
}

interface GeneralInfoFormProps {
  form: UseFormReturn<ActivityFormData, any, undefined>;
  activity: Activity;
}

const GeneralInfoForm = ({ form, activity }: GeneralInfoFormProps) => {
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };

  return (
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
  );
};

export default GeneralInfoForm;

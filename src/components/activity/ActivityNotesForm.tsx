
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
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

interface ActivityNotesFormProps {
  form: UseFormReturn<ActivityFormData, any, undefined>;
}

const ActivityNotesForm = ({ form }: ActivityNotesFormProps) => {
  return (
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
  );
};

export default ActivityNotesForm;

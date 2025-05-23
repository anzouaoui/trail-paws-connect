
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MessageSquare, 
  Activity, 
  Award, 
  Heart, 
  Calendar,
  BellOff
} from "lucide-react";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

// Form schema
const notificationFormSchema = z.object({
  messages: z.boolean().default(true),
  health: z.boolean().default(true),
  achievements: z.boolean().default(true),
  social: z.boolean().default(true),
  events: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  emailNotifications: z.boolean().default(false),
  doNotDisturb: z.boolean().default(false),
});

type NotificationFormValues = z.infer<typeof notificationFormSchema>;

const NotificationSettingsPage = () => {
  const navigate = useNavigate();
  
  // Default values
  const defaultValues: NotificationFormValues = {
    messages: true,
    health: true,
    achievements: true,
    social: true,
    events: true,
    pushNotifications: true,
    emailNotifications: false,
    doNotDisturb: false,
  };
  
  // Form
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues,
  });
  
  // Submit handler
  const onSubmit = (data: NotificationFormValues) => {
    console.log("Notification settings updated:", data);
    toast.success("Notification preferences saved", {
      description: "Your notification preferences have been updated",
    });
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background p-4 flex items-center border-b">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2"
          onClick={() => navigate("/notifications")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Notification Settings</h1>
      </div>

      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Notification Categories</h2>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="messages"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0">
                        <div className="flex items-center">
                          <MessageSquare className="h-4 w-4 text-blue-500 mr-2" />
                          <FormLabel>Messages</FormLabel>
                        </div>
                        <FormDescription className="text-xs">
                          Notifications for new messages and group chats
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="health"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0">
                        <div className="flex items-center">
                          <Activity className="h-4 w-4 text-red-500 mr-2" />
                          <FormLabel>Health Reminders</FormLabel>
                        </div>
                        <FormDescription className="text-xs">
                          Vaccination reminders and health alerts
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="achievements"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0">
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-amber-500 mr-2" />
                          <FormLabel>Achievements</FormLabel>
                        </div>
                        <FormDescription className="text-xs">
                          Badges, milestones, and achievements
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="social"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0">
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 text-pink-500 mr-2" />
                          <FormLabel>Social Interactions</FormLabel>
                        </div>
                        <FormDescription className="text-xs">
                          Likes, comments, and mentions
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="events"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="space-y-0">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-green-500 mr-2" />
                          <FormLabel>Events</FormLabel>
                        </div>
                        <FormDescription className="text-xs">
                          Upcoming events and activities
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h2 className="text-lg font-semibold mb-4">General Settings</h2>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="pushNotifications"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div>
                        <FormLabel>Push Notifications</FormLabel>
                        <FormDescription className="text-xs">
                          Receive notifications on your device
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div>
                        <FormLabel>Email Notifications</FormLabel>
                        <FormDescription className="text-xs">
                          Receive email digests and alerts
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="doNotDisturb"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <BellOff className="h-4 w-4 text-slate-500 mr-2" />
                          <FormLabel>Do Not Disturb</FormLabel>
                        </div>
                        <FormDescription className="text-xs">
                          Mute all notifications temporarily
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full">Save Preferences</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NotificationSettingsPage;

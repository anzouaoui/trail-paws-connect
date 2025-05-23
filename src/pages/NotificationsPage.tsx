
import React, { useState } from "react";
import { 
  Bell, 
  MessageSquare, 
  Heart, 
  Award, 
  Calendar, 
  Settings,
  Check,
  Filter
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import NotificationItem from "@/components/NotificationItem";
import { Separator } from "@/components/ui/separator";

// Notification type definition
export type NotificationType = 
  | "message" 
  | "health" 
  | "achievement" 
  | "social" 
  | "event";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  avatar?: string;
  avatarFallback?: string;
}

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("all");
  
  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "message",
      title: "New message from Sarah",
      description: "How's Max doing after the run?",
      timestamp: "10 min ago",
      read: false,
      actionUrl: "/messages/2",
      avatarFallback: "SJ"
    },
    {
      id: "2",
      type: "message",
      title: "Trail Runners Club",
      description: "See you all at the park tomorrow at 7am!",
      timestamp: "1 hour ago",
      read: false,
      actionUrl: "/messages/1",
      avatarFallback: "TR"
    },
    {
      id: "3",
      type: "health",
      title: "Vaccination Due",
      description: "Max's annual rabies vaccination is due next week",
      timestamp: "Yesterday",
      read: true,
      actionUrl: "/health-records",
      avatarFallback: "🩺"
    },
    {
      id: "4",
      type: "achievement",
      title: "New Badge Earned!",
      description: "You've earned the '10K Runner' badge",
      timestamp: "2 days ago",
      read: true,
      actionUrl: "/profile",
      avatarFallback: "🏅"
    },
    {
      id: "5",
      type: "social",
      title: "Jessica liked your activity",
      description: "Morning Run with Max",
      timestamp: "2 days ago",
      read: true,
      actionUrl: "/activity/1",
      avatarFallback: "JW"
    },
    {
      id: "6",
      type: "event",
      title: "New Event Nearby",
      description: "Summer Trail Challenge is starting soon",
      timestamp: "3 days ago",
      read: true,
      actionUrl: "/explore",
      avatarFallback: "🗓️"
    }
  ]);

  // Function to mark notifications as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Function to mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  // Function to handle notification click
  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  // Filter notifications based on active tab
  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : notifications.filter(notif => notif.type === activeTab);

  // Count unread notifications
  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold flex items-center">
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </h1>
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={markAllAsRead}
              className="flex items-center gap-1"
            >
              <Check className="h-4 w-4" />
              Mark all read
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/notification-settings")}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Tabs for filtering notifications */}
        <Tabs 
          defaultValue="all" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="px-4">
            <TabsList className="grid grid-cols-6 w-full">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="message" className="text-xs">
                <MessageSquare className="h-3 w-3 mr-1" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="health" className="text-xs">Health</TabsTrigger>
              <TabsTrigger value="achievement" className="text-xs">Badges</TabsTrigger>
              <TabsTrigger value="social" className="text-xs">Social</TabsTrigger>
              <TabsTrigger value="event" className="text-xs">Events</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
      </div>

      {/* Notifications list */}
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y">
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={() => handleNotificationClick(notification)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg">No notifications</h3>
              <p className="text-muted-foreground max-w-xs mt-2">
                {activeTab === "all" 
                  ? "You don't have any notifications right now."
                  : `You don't have any ${activeTab} notifications.`}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotificationsPage;

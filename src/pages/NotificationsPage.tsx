
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
      title: "Nouveau message de Sarah",
      description: "Comment va Max après la course ?",
      timestamp: "il y a 10 min",
      read: false,
      actionUrl: "/messages/2",
      avatarFallback: "SJ"
    },
    {
      id: "2",
      type: "message",
      title: "Club Trail Runners",
      description: "Rendez-vous tous au parc demain à 7h !",
      timestamp: "il y a 1 heure",
      read: false,
      actionUrl: "/messages/1",
      avatarFallback: "TR"
    },
    {
      id: "3",
      type: "health",
      title: "Vaccination à prévoir",
      description: "Le vaccin antirabique annuel de Max est dû la semaine prochaine",
      timestamp: "Hier",
      read: true,
      actionUrl: "/health-records",
      avatarFallback: "🩺"
    },
    {
      id: "4",
      type: "achievement",
      title: "Nouveau badge obtenu !",
      description: "Vous avez obtenu le badge 'Coureur 10K'",
      timestamp: "il y a 2 jours",
      read: true,
      actionUrl: "/profile",
      avatarFallback: "🏅"
    },
    {
      id: "5",
      type: "social",
      title: "Jessica a aimé votre activité",
      description: "Course matinale avec Max",
      timestamp: "il y a 2 jours",
      read: true,
      actionUrl: "/activity/1",
      avatarFallback: "JW"
    },
    {
      id: "6",
      type: "event",
      title: "Nouvel événement à proximité",
      description: "Le Défi Trail d'Été commence bientôt",
      timestamp: "il y a 3 jours",
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
                {unreadCount} nouveau{unreadCount > 1 ? 'x' : ''}
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
              Tout marquer lu
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
              <TabsTrigger value="all" className="text-xs">Tout</TabsTrigger>
              <TabsTrigger value="message" className="text-xs">
                <MessageSquare className="h-3 w-3 mr-1" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="health" className="text-xs">Santé</TabsTrigger>
              <TabsTrigger value="achievement" className="text-xs">Badges</TabsTrigger>
              <TabsTrigger value="social" className="text-xs">Social</TabsTrigger>
              <TabsTrigger value="event" className="text-xs">Événements</TabsTrigger>
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
              <h3 className="font-medium text-lg">Aucune notification</h3>
              <p className="text-muted-foreground max-w-xs mt-2">
                {activeTab === "all" 
                  ? "Vous n'avez aucune notification pour le moment."
                  : `Vous n'avez aucune notification ${
                      activeTab === "message" ? "de message" :
                      activeTab === "health" ? "de santé" :
                      activeTab === "achievement" ? "de badge" :
                      activeTab === "social" ? "sociale" :
                      activeTab === "event" ? "d'événement" : ""
                    }.`}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NotificationsPage;


import React from "react";
import { 
  MessageSquare, 
  Heart, 
  Award, 
  Calendar, 
  Activity
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Notification } from "@/pages/NotificationsPage";

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

const NotificationItem = ({ notification, onClick }: NotificationItemProps) => {
  // Function to get icon based on notification type
  const getNotificationIcon = () => {
    switch (notification.type) {
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "health":
        return <Activity className="h-4 w-4" />;
      case "achievement":
        return <Award className="h-4 w-4" />;
      case "social":
        return <Heart className="h-4 w-4" />;
      case "event":
        return <Calendar className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Function to get color based on notification type
  const getTypeColor = () => {
    switch (notification.type) {
      case "message":
        return "text-blue-500 bg-blue-100";
      case "health":
        return "text-red-500 bg-red-100";
      case "achievement":
        return "text-amber-500 bg-amber-100";
      case "social":
        return "text-pink-500 bg-pink-100";
      case "event":
        return "text-green-500 bg-green-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 py-4 cursor-pointer",
        !notification.read && "bg-muted/50"
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0">
        <Avatar>
          {notification.avatar && (
            <AvatarImage src={notification.avatar} alt={notification.title} />
          )}
          <AvatarFallback className={cn(
            notification.type === "message" ? "bg-blue-500" : 
            notification.type === "health" ? "bg-red-500" : 
            notification.type === "achievement" ? "bg-amber-500" : 
            notification.type === "social" ? "bg-pink-500" : 
            notification.type === "event" ? "bg-green-500" : "bg-gray-500",
            "text-white"
          )}>
            {notification.avatarFallback}
          </AvatarFallback>
        </Avatar>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <h3 className={cn("font-medium", !notification.read && "font-semibold")}>
            {notification.title}
          </h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
            {notification.timestamp}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {notification.description}
        </p>
      </div>
      
      {!notification.read && (
        <div className="w-2 h-2 rounded-full bg-destructive flex-shrink-0 mt-2"></div>
      )}
    </div>
  );
};

export default NotificationItem;

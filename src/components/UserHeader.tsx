
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserHeaderProps {
  unreadNotifications: number;
  unreadFriendRequests: number;
}

const UserHeader = ({ unreadNotifications, unreadFriendRequests }: UserHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src="" alt="Utilisateur" />
          <AvatarFallback className="bg-forest text-white">JD</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-lg font-semibold">Salut, John!</h1>
          <p className="text-sm text-muted-foreground">Prêt pour une nouvelle aventure ?</p>
        </div>
      </div>
      <div className="flex space-x-1">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Search className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full relative"
          onClick={() => navigate('/friend-requests')}
        >
          <Users className="h-5 w-5" />
          {unreadFriendRequests > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadFriendRequests}
            </Badge>
          )}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full relative"
          onClick={() => navigate('/notifications')}
        >
          <Bell className="h-5 w-5" />
          {unreadNotifications > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadNotifications > 9 ? '9+' : unreadNotifications}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
};

export default UserHeader;

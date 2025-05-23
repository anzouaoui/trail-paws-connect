
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, X, Users } from "lucide-react";

interface FriendRequest {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  mutualFriends: number;
  date: string;
  status: "pending" | "accepted" | "rejected";
}

interface FriendRequestItemProps {
  request: FriendRequest;
  onAccept: () => void;
  onReject: () => void;
}

const FriendRequestItem = ({ request, onAccept, onReject }: FriendRequestItemProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-start">
        <Avatar className="h-12 w-12 mr-3">
          <AvatarImage src={request.avatar} alt={request.name} />
          <AvatarFallback className="bg-forest text-white">
            {request.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold">{request.name}</h3>
            <span className="text-xs text-muted-foreground">{request.date}</span>
          </div>
          <p className="text-xs flex items-center mt-1">
            <Users className="h-3 w-3 mr-1" />
            {request.mutualFriends} mutual {request.mutualFriends === 1 ? 'friend' : 'friends'}
          </p>
          
          <div className="flex justify-end space-x-2 mt-3">
            <Button 
              variant="outline" 
              size="sm"
              className="border-destructive text-destructive hover:bg-destructive/10"
              onClick={onReject}
            >
              <X className="h-4 w-4 mr-1" />
              Reject
            </Button>
            <Button 
              size="sm"
              onClick={onAccept}
            >
              <Check className="h-4 w-4 mr-1" />
              Accept
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FriendRequestItem;

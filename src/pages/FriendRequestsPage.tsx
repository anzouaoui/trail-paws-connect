
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, UserPlus, Check, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FriendRequestItem from "@/components/FriendRequestItem";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

// Sample friend request data
const initialRequests = [
  {
    id: "fr1",
    userId: "user4",
    name: "Alex Johnson",
    avatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    mutualFriends: 3,
    date: "2025-05-21",
    status: "pending" as const
  },
  {
    id: "fr2",
    userId: "user5",
    name: "Lisa Chen",
    avatar: "",
    mutualFriends: 1,
    date: "2025-05-20",
    status: "pending" as const
  }
];

// Sample friends data
const initialFriends = [
  {
    id: "user1",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    lastActive: "Il y a 2 heures",
    status: "online" as const
  },
  {
    id: "user3",
    name: "Emma Wilson",
    avatar: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    lastActive: "Il y a 1 jour",
    status: "offline" as const
  }
];

// Sample suggested friends data
const suggestedFriends = [
  {
    id: "user6",
    name: "James Smith",
    avatar: "",
    mutualFriends: 4,
    status: "suggested" as const
  },
  {
    id: "user7",
    name: "Olivia Davis",
    avatar: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    mutualFriends: 2,
    status: "suggested" as const
  },
  {
    id: "user8",
    name: "Noah Brown",
    avatar: "",
    mutualFriends: 5,
    status: "suggested" as const
  }
];

const FriendRequestsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingRequests, setPendingRequests] = useState(initialRequests);
  const [friends, setFriends] = useState(initialFriends);
  const [suggestions] = useState(suggestedFriends);
  
  const handleAcceptRequest = (requestId: string) => {
    const request = pendingRequests.find(r => r.id === requestId);
    if (!request) return;
    
    setPendingRequests(pendingRequests.filter(r => r.id !== requestId));
    setFriends([...friends, {
      id: request.userId,
      name: request.name,
      avatar: request.avatar,
      lastActive: "À l'instant",
      status: "online" as const
    }]);
    
    toast(`Vous êtes maintenant ami avec ${request.name}`);
  };
  
  const handleRejectRequest = (requestId: string) => {
    setPendingRequests(pendingRequests.filter(r => r.id !== requestId));
    toast("Demande d'ami refusée");
  };
  
  const handleSendRequest = (userId: string, name: string) => {
    toast(`Demande d'ami envoyée à ${name}`);
  };
  
  const handleRemoveFriend = (userId: string, name: string) => {
    setFriends(friends.filter(f => f.id !== userId));
    toast(`${name} a été retiré de votre liste d'amis`);
  };
  
  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pb-24">
      <header className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Amis</h1>
        </div>
      </header>
      
      <div className="p-4">
        <div className="flex mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Rechercher des amis" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requests" className="relative">
              Demandes
              {pendingRequests.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {pendingRequests.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="friends">Amis</TabsTrigger>
            <TabsTrigger value="suggested">Suggestions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="requests" className="mt-4">
            {pendingRequests.length > 0 ? (
              <div className="space-y-4">
                {pendingRequests.map(request => (
                  <FriendRequestItem
                    key={request.id}
                    request={request}
                    onAccept={() => handleAcceptRequest(request.id)}
                    onReject={() => handleRejectRequest(request.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Aucune demande d'ami en attente</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="friends" className="mt-4">
            {filteredFriends.length > 0 ? (
              <div className="space-y-4">
                {filteredFriends.map(friend => (
                  <div key={friend.id} className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={friend.avatar} alt={friend.name} />
                        <AvatarFallback className="bg-forest text-white">
                          {friend.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{friend.name}</h3>
                        <div className="flex items-center">
                          <span 
                            className={cn(
                              "w-2 h-2 rounded-full mr-1", 
                              friend.status === "online" ? "bg-green-500" : "bg-gray-400"
                            )}
                          />
                          <p className="text-xs text-muted-foreground">
                            {friend.status === "online" ? "En ligne" : friend.lastActive}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/messages/${friend.id}`)}
                      >
                        Message
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFriend(friend.id, friend.name)}
                        className="text-destructive border-destructive hover:bg-destructive/10"
                      >
                        Retirer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Aucun ami ne correspond à votre recherche</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Vous n'avez pas encore ajouté d'amis</p>
                <Button 
                  className="mt-4" 
                  onClick={() => navigate('/explore')}
                >
                  Trouver des Amis
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="suggested" className="mt-4">
            <div className="space-y-4">
              {suggestions.map(friend => (
                <div key={friend.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={friend.avatar} alt={friend.name} />
                      <AvatarFallback className="bg-forest text-white">
                        {friend.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{friend.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {friend.mutualFriends} ami{friend.mutualFriends === 1 ? '' : 's'} en commun
                      </p>
                    </div>
                  </div>
                  <Button 
                    className="flex items-center gap-1" 
                    size="sm"
                    onClick={() => handleSendRequest(friend.id, friend.name)}
                  >
                    <UserPlus className="h-4 w-4" />
                    Ajouter
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FriendRequestsPage;


import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

type Chat = {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isGroup: boolean;
};

const MessagesPage = () => {
  const navigate = useNavigate();
  
  // Mock data for conversations
  const chats: Chat[] = [
    {
      id: "1",
      name: "Club de Trail",
      avatar: undefined,
      lastMessage: "Rendez-vous demain au parc à 7h !",
      timestamp: "10:23",
      unread: 3,
      isGroup: true
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: undefined,
      lastMessage: "Comment va Max après la course ?",
      timestamp: "Hier",
      unread: 0,
      isGroup: false
    },
    {
      id: "3",
      name: "Mike Peterson",
      avatar: undefined,
      lastMessage: "J'ai partagé notre carte de sentier",
      timestamp: "Hier",
      unread: 1,
      isGroup: false
    },
    {
      id: "4",
      name: "Propriétaires de Chiens",
      avatar: undefined,
      lastMessage: "Regardez ce nouveau harnais pour Luna",
      timestamp: "Lundi",
      unread: 0,
      isGroup: true
    },
    {
      id: "5",
      name: "Jessica Williams",
      avatar: undefined,
      lastMessage: "Ravi de vous avoir vus avec Buddy !",
      timestamp: "Lundi",
      unread: 0,
      isGroup: false
    }
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleChatClick = (id: string) => {
    navigate(`/messages/${id}`);
  };

  return (
    <div className="pb-20">
      <div className="sticky top-0 z-10 bg-background p-4 border-b">
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>
      
      <ScrollArea className="h-[calc(100vh-140px)]">
        <div>
          {chats.map(chat => (
            <div 
              key={chat.id} 
              className="chat-list-item"
              onClick={() => handleChatClick(chat.id)}
            >
              <Avatar className="h-12 w-12">
                {chat.avatar && <AvatarImage src={chat.avatar} alt={chat.name} />}
                <AvatarFallback className={chat.isGroup ? "bg-sky" : "bg-forest"}>
                  {getInitials(chat.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium truncate">{chat.name}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {chat.timestamp}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground truncate pr-4">
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <Badge className="bg-forest text-white rounded-full h-5 min-w-5 flex items-center justify-center p-1">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessagesPage;

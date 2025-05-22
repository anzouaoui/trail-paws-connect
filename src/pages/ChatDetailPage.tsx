import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Phone, MoreVertical } from "lucide-react";
import Message, { MessageProps, MessageStatus, MessageType } from "@/components/Message";
import MessageInput from "@/components/MessageInput";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

const ChatDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Omit<MessageProps, 'isSender'>[]>([]);
  const [currentUser] = useState({ id: 'current-user', name: 'You', avatar: undefined });
  const [chat, setChat] = useState<{ 
    id: string;
    name: string;
    avatar?: string;
    isGroup: boolean;
    members?: { id: string; name: string; }[];
  } | null>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Mock data loading
    const mockChat = {
      id: id || '1',
      name: id === "1" ? "Trail Runners Club" : id === "2" ? "Sarah Johnson" : "Mike Peterson",
      avatar: undefined,
      isGroup: id === "1" || id === "4",
      members: id === "1" || id === "4" ? [
        { id: 'user1', name: 'Sarah Johnson' },
        { id: 'user2', name: 'Mike Peterson' },
        { id: 'user3', name: 'Jessica Williams' },
        { id: 'current-user', name: 'You' }
      ] : undefined
    };
    
    setChat(mockChat);
    
    // Load mock messages with proper typing
    const mockMessages: Omit<MessageProps, 'isSender'>[] = [
      {
        id: '1',
        content: 'Hey everyone! How did your morning runs go?',
        timestamp: '10:00 AM',
        sender: { 
          id: 'user1', 
          name: 'Sarah Johnson', 
          avatar: undefined 
        },
        status: 'seen' as MessageStatus
      },
      {
        id: '2',
        content: 'Great! I took Max to the trail by the lake.',
        timestamp: '10:05 AM',
        sender: { 
          id: 'user2', 
          name: 'Mike Peterson', 
          avatar: undefined 
        },
        status: 'seen' as MessageStatus
      },
      {
        id: '3',
        content: 'We did 5km in about 30 minutes.',
        timestamp: '10:06 AM',
        sender: {
          id: 'current-user',
          name: 'You',
          avatar: undefined
        },
        status: 'seen' as MessageStatus,
        attachmentType: 'activity' as MessageType,
        attachmentUrl: 'activity-summary'
      },
      {
        id: '4',
        content: 'Here\'s our route if anyone wants to try it!',
        timestamp: '10:15 AM',
        sender: {
          id: 'user3',
          name: 'Jessica Williams',
          avatar: undefined
        },
        status: 'seen' as MessageStatus,
        attachmentType: 'route' as MessageType,
        attachmentUrl: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=500&auto=format&fit=crop'
      },
      {
        id: '5',
        content: 'See you all at the park tomorrow at 7am!',
        timestamp: '10:23 AM',
        sender: {
          id: 'user1',
          name: 'Sarah Johnson',
          avatar: undefined
        },
        status: 'seen' as MessageStatus
      }
    ];
    
    setMessages(mockMessages);
  }, [id]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string, attachmentType?: string, attachmentUrl?: string) => {
    const newMessage: Omit<MessageProps, 'isSender'> = {
      id: `msg-${Date.now()}`,
      content,
      timestamp: 'Just now',
      sender: currentUser,
      status: 'sending' as MessageStatus,
      ...(attachmentType && { 
        attachmentType: attachmentType as MessageType, 
        attachmentUrl 
      })
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate message status change
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'sent' as MessageStatus } 
            : msg
        )
      );
      
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: 'delivered' as MessageStatus } 
              : msg
          )
        );
        
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === newMessage.id 
                ? { ...msg, status: 'seen' as MessageStatus } 
                : msg
            )
          );
        }, 1500);
      }, 1000);
    }, 800);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  if (!chat) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-3 p-4 border-b bg-background">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full" 
          onClick={() => navigate('/messages')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <Avatar className="h-10 w-10">
          {chat.avatar ? (
            <AvatarImage src={chat.avatar} alt={chat.name} />
          ) : (
            <AvatarFallback className={chat.isGroup ? "bg-sky" : "bg-forest"}>
              {getInitials(chat.name)}
            </AvatarFallback>
          )}
        </Avatar>
        
        <div className="flex-1">
          <h2 className="font-medium">{chat.name}</h2>
          {chat.isGroup && (
            <p className="text-xs text-muted-foreground">
              {chat.members?.length} members
            </p>
          )}
        </div>
        
        <Button variant="ghost" size="icon" className="rounded-full">
          <Phone className="h-5 w-5" />
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{chat.name}</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              {chat.isGroup && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Group Members</h3>
                  <div className="space-y-2">
                    {chat.members?.map(member => (
                      <div key={member.id} className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-forest">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          {member.name}
                          {member.id === currentUser.id && " (You)"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="space-y-2 pt-2 border-t">
                <Button variant="outline" className="w-full justify-start">
                  Search in conversation
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  Share contact
                </Button>
                
                {chat.isGroup && (
                  <Button variant="outline" className="w-full justify-start">
                    Leave group
                  </Button>
                )}
                
                <Button variant="destructive" className="w-full justify-start">
                  Block {chat.isGroup ? "group" : "user"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {messages.map(message => (
            <Message
              key={message.id}
              {...message}
              isSender={message.sender.id === currentUser.id}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Message Input */}
      <div className="p-2 pb-[70px] border-t">
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatDetailPage;

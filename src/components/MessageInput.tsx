
import React, { useState } from "react";
import { Send, Paperclip, Image } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

interface MessageInputProps {
  onSendMessage: (content: string, attachmentType?: string, attachmentUrl?: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState<{
    type: string;
    url: string;
  } | null>(null);

  const handleSend = () => {
    if (!message.trim() && !attachment) return;
    
    onSendMessage(
      message,
      attachment?.type,
      attachment?.url
    );
    
    setMessage("");
    setAttachment(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachImage = () => {
    // Mock image selection
    const mockImage = "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=500&auto=format&fit=crop";
    
    setAttachment({
      type: "image",
      url: mockImage
    });
    
    toast({
      title: "Image attached",
      description: "Ready to send with your message",
    });
  };

  const handleAttachActivity = () => {
    setAttachment({
      type: "activity",
      url: "activity-summary"
    });
    
    toast({
      title: "Activity attached",
      description: "Ready to send with your message",
    });
  };

  const handleAttachRoute = () => {
    const mockRoute = "https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=500&auto=format&fit=crop";
    
    setAttachment({
      type: "route",
      url: mockRoute
    });
    
    toast({
      title: "Route map attached",
      description: "Ready to send with your message",
    });
  };

  return (
    <div className="chat-input">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Paperclip className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48">
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleAttachImage}
            >
              <Image className="mr-2 h-4 w-4" />
              Image
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleAttachActivity}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 18H21M8 12H21M8 6H21M3 18L4 17L5 18L6 17M3 12L4 11L5 12L6 11M3 6L4 5L5 6L6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Activity
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={handleAttachRoute}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6L9 3L15 6L21 3V18L15 21L9 18L3 21V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 3V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 6V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Route Map
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {attachment && (
        <div className="relative bg-muted/50 rounded-md px-2 py-1 flex items-center gap-2 text-xs">
          {attachment.type === "image" && <Image className="h-4 w-4" />}
          {attachment.type === "activity" && (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 18H21M8 12H21M8 6H21M3 18L4 17L5 18L6 17M3 12L4 11L5 12L6 11M3 6L4 5L5 6L6 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {attachment.type === "route" && (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6L9 3L15 6L21 3V18L15 21L9 18L3 21V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 3V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 6V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          <span>{attachment.type} attached</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 rounded-full p-0"
            onClick={() => setAttachment(null)}
          >
            &times;
          </Button>
        </div>
      )}

      <div className="flex-1">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="rounded-full"
        />
      </div>

      <Button
        onClick={handleSend}
        disabled={!message.trim() && !attachment}
        className="rounded-full"
        size="icon"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MessageInput;

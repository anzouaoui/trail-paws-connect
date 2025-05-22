import React from "react";
import { Clock, Check } from "lucide-react";

export type MessageStatus = "sending" | "sent" | "delivered" | "seen";
export type MessageType = "text" | "image" | "activity" | "route";

export interface MessageProps {
  id: string;
  content: string;
  timestamp: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  isSender: boolean;
  status: MessageStatus;
  attachmentType?: MessageType;
  attachmentUrl?: string;
}

const Message: React.FC<MessageProps> = ({
  content,
  timestamp,
  isSender,
  status,
  attachmentType,
  attachmentUrl
}) => {
  const renderStatus = () => {
    switch (status) {
      case "sending":
        return <Clock className="h-3 w-3 text-gray-400" />;
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />;
      case "delivered":
        return (
          <div className="flex">
            <Check className="h-3 w-3 text-gray-400" />
            <Check className="h-3 w-3 text-gray-400 -ml-1" />
          </div>
        );
      case "seen":
        return (
          <div className="flex">
            <Check className="h-3 w-3 text-sky" />
            <Check className="h-3 w-3 text-sky -ml-1" />
          </div>
        );
      default:
        return null;
    }
  };

  const renderAttachment = () => {
    if (!attachmentType || !attachmentUrl) return null;

    switch (attachmentType) {
      case "image":
        return (
          <div className="message-attachment mb-2">
            <img 
              src={attachmentUrl} 
              alt="Attachment" 
              className="rounded-lg w-full max-h-48 object-cover" 
            />
          </div>
        );
      case "activity":
        return (
          <div className="message-attachment mb-2 p-3 bg-muted/50">
            <div className="text-sm font-medium">Activity Summary</div>
            <p className="text-xs text-muted-foreground">Morning Run with Rex • 5.2 km</p>
          </div>
        );
      case "route":
        return (
          <div className="message-attachment mb-2">
            <img 
              src={attachmentUrl} 
              alt="Route Map" 
              className="rounded-lg w-full h-32 object-cover" 
            />
            <div className="p-2 text-xs">
              <p className="font-medium">Park Loop Trail</p>
              <p className="text-muted-foreground">5.2 km • 45 min</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`flex flex-col mb-4 ${isSender ? 'items-end' : 'items-start'}`}>
      {renderAttachment()}
      
      <div className={`message-bubble ${isSender ? 'sent' : 'received'}`}>
        <p>{content}</p>
      </div>
      
      <div className={`flex items-center ${isSender ? 'justify-end' : 'justify-start'}`}>
        <span className="message-time">{timestamp}</span>
        {isSender && <span className="message-status">{renderStatus()}</span>}
      </div>
    </div>
  );
};

export default Message;

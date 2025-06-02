
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Paperclip, Smile, MoreVertical, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isFromUser: boolean;
  isTyping?: boolean;
}

const LiveChatPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Bonjour ! Je suis Lisa de l'équipe support DogRunner. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
      isFromUser: false
    }
  ]);
  const [isAgentTyping, setIsAgentTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: message.trim(),
        timestamp: new Date(),
        isFromUser: true
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage("");
      
      // Simulate agent typing and response
      setIsAgentTyping(true);
      setTimeout(() => {
        setIsAgentTyping(false);
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Merci pour votre message. Je regarde votre demande et vous réponds dans quelques instants.",
          timestamp: new Date(),
          isFromUser: false
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-3"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Support DogRunner</h1>
                <p className="text-sm text-green-600">En ligne</p>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isFromUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end max-w-xs lg:max-w-md ${msg.isFromUser ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.isFromUser ? 'bg-forest ml-2' : 'bg-gray-300 mr-2'}`}>
                {msg.isFromUser ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-gray-600" />
                )}
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  msg.isFromUser
                    ? 'bg-forest text-white rounded-br-sm'
                    : 'bg-white border rounded-bl-sm'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.isFromUser ? 'text-green-100' : 'text-gray-500'}`}>
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isAgentTyping && (
          <div className="flex justify-start">
            <div className="flex items-end max-w-xs lg:max-w-md">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 mr-2">
                <Bot className="h-4 w-4 text-gray-600" />
              </div>
              <div className="px-4 py-2 bg-white border rounded-lg rounded-bl-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <Separator />

      {/* Chat Info */}
      <div className="bg-blue-50 p-3">
        <p className="text-xs text-blue-700 text-center">
          Support disponible Lun-Ven 9h-18h • Temps de réponse moyen : 2 minutes
        </p>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4">
        <div className="flex items-end space-x-2">
          <Button variant="ghost" size="icon" className="mb-1">
            <Paperclip className="h-5 w-5 text-gray-500" />
          </Button>
          
          <div className="flex-1 bg-gray-100 rounded-lg border">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message..."
              className="w-full bg-transparent p-3 resize-none focus:outline-none max-h-20"
              rows={1}
            />
          </div>

          <Button variant="ghost" size="icon" className="mb-1">
            <Smile className="h-5 w-5 text-gray-500" />
          </Button>

          <Button 
            onClick={sendMessage}
            disabled={!message.trim()}
            className="bg-forest hover:bg-forest/90 mb-1"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LiveChatPage;

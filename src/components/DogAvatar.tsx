
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface DogAvatarProps {
  name: string;
  imageSrc?: string;
  breed?: string;
  size?: "sm" | "md" | "lg";
  showBadge?: boolean;
}

const DogAvatar = ({ 
  name, 
  imageSrc, 
  breed, 
  size = "md", 
  showBadge = false 
}: DogAvatarProps) => {
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24"
  };

  const initials = name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="relative">
      <Avatar className={`${sizeClasses[size]} border-2 border-forest-light`}>
        <AvatarImage src={imageSrc} alt={name} />
        <AvatarFallback className="bg-forest text-white font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>
      {showBadge && breed && (
        <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-forest text-white text-xs">
          {breed}
        </Badge>
      )}
    </div>
  );
};

export default DogAvatar;

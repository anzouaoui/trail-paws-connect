
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, BarChart2, Home, User, PlusCircle, MessageCircle } from "lucide-react";

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm py-2 px-6 z-10">
      <div className="flex justify-between items-center">
        <Link 
          to="/home" 
          className={`nav-link ${currentPath === "/home" ? "active" : ""}`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>
        
        <Link 
          to="/explore" 
          className={`nav-link ${currentPath === "/explore" ? "active" : ""}`}
        >
          <MapPin className="h-6 w-6" />
          <span className="text-xs">Explore</span>
        </Link>
        
        <Link 
          to="/track" 
          className="flex flex-col items-center"
        >
          <div className="bg-forest rounded-full p-3 -mt-8 shadow-lg">
            <PlusCircle className="h-6 w-6 text-white" />
          </div>
          <span className="text-xs text-muted-foreground mt-1">Track</span>
        </Link>
        
        <Link 
          to="/stats" 
          className={`nav-link ${currentPath === "/stats" ? "active" : ""}`}
        >
          <BarChart2 className="h-6 w-6" />
          <span className="text-xs">Stats</span>
        </Link>
        
        <Link 
          to="/messages" 
          className={`nav-link ${currentPath === "/messages" ? "active" : ""}`}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs">Messages</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`nav-link ${currentPath === "/profile" ? "active" : ""}`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;

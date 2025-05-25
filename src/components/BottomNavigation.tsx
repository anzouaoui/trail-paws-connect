
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, BarChart2, Home, User, PlusCircle, MessageCircle, Users } from "lucide-react";

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm py-2 px-4 z-10">
      <div className="flex justify-between items-center">
        <Link 
          to="/home" 
          className={`nav-link ${currentPath === "/home" ? "text-primary font-medium" : "text-muted-foreground"} flex flex-col items-center`}
        >
          <Home className={`h-5 w-5 ${currentPath === "/home" ? "text-primary" : ""}`} />
          <span className="text-xs mt-1">Accueil</span>
        </Link>
        
        <Link 
          to="/explore" 
          className={`nav-link ${currentPath === "/explore" ? "text-primary font-medium" : "text-muted-foreground"} flex flex-col items-center`}
        >
          <MapPin className={`h-5 w-5 ${currentPath === "/explore" ? "text-primary" : ""}`} />
          <span className="text-xs mt-1">Explorer</span>
        </Link>
        
        <Link 
          to="/track" 
          className="flex flex-col items-center"
        >
          <div className="bg-forest rounded-full p-3 -mt-8 shadow-lg">
            <PlusCircle className="h-5 w-5 text-white" />
          </div>
          <span className="text-xs text-muted-foreground mt-1">Tracker</span>
        </Link>
        
        <Link 
          to="/stats" 
          className={`nav-link ${currentPath === "/stats" ? "text-primary font-medium" : "text-muted-foreground"} flex flex-col items-center`}
        >
          <BarChart2 className={`h-5 w-5 ${currentPath === "/stats" ? "text-primary" : ""}`} />
          <span className="text-xs mt-1">Stats</span>
        </Link>
        
        <Link 
          to="/friend-requests" 
          className={`nav-link ${currentPath === "/friend-requests" ? "text-primary font-medium" : "text-muted-foreground"} flex flex-col items-center relative`}
        >
          <Users className={`h-5 w-5 ${currentPath === "/friend-requests" ? "text-primary" : ""}`} />
          <span className="text-xs mt-1">Amis</span>
        </Link>
        
        <Link 
          to="/messages" 
          className={`nav-link ${currentPath === "/messages" ? "text-primary font-medium" : "text-muted-foreground"} flex flex-col items-center`}
        >
          <MessageCircle className={`h-5 w-5 ${currentPath === "/messages" ? "text-primary" : ""}`} />
          <span className="text-xs mt-1">Messages</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`nav-link ${currentPath === "/profile" ? "text-primary font-medium" : "text-muted-foreground"} flex flex-col items-center`}
        >
          <User className={`h-5 w-5 ${currentPath === "/profile" ? "text-primary" : ""}`} />
          <span className="text-xs mt-1">Profil</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;

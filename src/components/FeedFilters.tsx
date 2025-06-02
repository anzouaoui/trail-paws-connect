
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, MapPin } from "lucide-react";

interface FeedFiltersProps {
  feedFilter: string;
  setFeedFilter: (filter: string) => void;
}

const FeedFilters = ({ feedFilter, setFeedFilter }: FeedFiltersProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Fil d'Activité</h2>
      <div className="flex space-x-1">
        <Button 
          variant={feedFilter === "friends" ? "default" : "outline"} 
          size="sm" 
          onClick={() => setFeedFilter("friends")}
          className="text-xs px-2"
        >
          Amis
        </Button>
        <Button 
          variant={feedFilter === "nearby" ? "default" : "outline"} 
          size="sm" 
          onClick={() => setFeedFilter("nearby")}
          className="text-xs px-2"
        >
          <MapPin className="h-3 w-3 mr-1" /> Proche
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center"
          onClick={() => setFeedFilter(feedFilter === "all" ? "canicross" : feedFilter === "canicross" ? "hiking" : "all")}
        >
          <Filter className="h-4 w-4 mr-1" />
          {feedFilter === "all" ? "Tout" : feedFilter === "canicross" ? "Canicross" : feedFilter === "hiking" ? "Rando" : "Filtre"}
        </Button>
      </div>
    </div>
  );
};

export default FeedFilters;

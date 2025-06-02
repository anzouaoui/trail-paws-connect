import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { ActivityType } from "@/components/ActivityCard";
import ActivityFilters, { FilterOptions } from "@/components/ActivityFilters";

const ExplorePage = () => {
  const navigate = useNavigate();
  
  // Sample events data
  const initialEvents = [
    {
      id: "1",
      title: "Weekend Canicross Meetup",
      date: "May 25, 2025",
      location: "Central Park",
      attendees: 14,
      distance: "5 km",
      type: "canicross" as ActivityType,
      difficulty: "beginner",
      elevation: "low",
      eventType: "meetup"
    },
    {
      id: "2",
      title: "Mountain Trail Challenge",
      date: "June 5, 2025",
      location: "Blue Ridge Mountains",
      attendees: 27,
      distance: "12 km",
      type: "cani-hiking" as ActivityType,
      difficulty: "advanced",
      elevation: "high",
      eventType: "competition"
    },
    {
      id: "3",
      title: "Spring Bike Trail",
      date: "May 30, 2025",
      location: "Riverside Path",
      attendees: 8,
      distance: "15 km",
      type: "cani-MTB" as ActivityType,
      difficulty: "intermediate",
      elevation: "medium",
      eventType: "training"
    },
    {
      id: "4",
      title: "Urban Park Run",
      date: "May 26, 2025",
      location: "Downtown Park",
      attendees: 22,
      distance: "3 km",
      type: "canicross" as ActivityType,
      difficulty: "beginner",
      elevation: "low",
      eventType: "training"
    },
    {
      id: "5",
      title: "Mountain Biking Race",
      date: "June 12, 2025",
      location: "Forest Hills",
      attendees: 15,
      distance: "18 km",
      type: "cani-MTB" as ActivityType,
      difficulty: "expert",
      elevation: "high",
      eventType: "competition"
    }
  ];

  // Sample trails data
  const initialTrails = [
    {
      id: "1",
      name: "Woodland Path",
      distance: "3.8 km",
      difficulty: "beginner",
      terrain: "flat",
      type: "canicross" as ActivityType,
      elevation: "low"
    },
    {
      id: "2",
      name: "Mountain View Trail",
      distance: "7.2 km",
      difficulty: "intermediate",
      terrain: "hilly",
      type: "cani-hiking" as ActivityType,
      elevation: "medium"
    },
    {
      id: "3",
      name: "River Valley Circuit",
      distance: "12.5 km",
      difficulty: "advanced",
      terrain: "mixed",
      type: "cani-MTB" as ActivityType,
      elevation: "high"
    },
    {
      id: "4",
      name: "Lakeside Loop",
      distance: "4.5 km",
      difficulty: "beginner",
      terrain: "flat",
      type: "canicross" as ActivityType,
      elevation: "low"
    },
    {
      id: "5",
      name: "Alpine Challenge",
      distance: "9.8 km",
      difficulty: "expert",
      terrain: "steep",
      type: "cani-hiking" as ActivityType,
      elevation: "high"
    }
  ];

  const [events, setEvents] = useState(initialEvents);
  const [trails, setTrails] = useState(initialTrails);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPremiumUser] = useState(true); // Simulating a premium user
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    activityType: 'all',
    dateRange: {},
    locationOption: '',
    difficulty: '',
    distance: '',
    elevation: '',
    eventType: '',
    isPremiumUser: isPremiumUser
  });

  // Apply filters to events and trails
  const applyFilters = () => {
    // Filter events
    const filteredEvents = initialEvents.filter(event => {
      // Activity Type filter
      if (filterOptions.activityType !== 'all' && event.type !== filterOptions.activityType) {
        return false;
      }
      
      // Difficulty filter
      if (filterOptions.difficulty && event.difficulty !== filterOptions.difficulty) {
        return false;
      }
      
      // Distance filter
      if (filterOptions.distance) {
        const distance = parseFloat(event.distance.split(' ')[0]);
        
        if (filterOptions.distance === 'short' && distance >= 5) {
          return false;
        } else if (filterOptions.distance === 'medium' && (distance < 5 || distance > 15)) {
          return false;
        } else if (filterOptions.distance === 'long' && distance <= 15) {
          return false;
        }
      }
      
      // Elevation filter
      if (filterOptions.elevation && event.elevation !== filterOptions.elevation) {
        return false;
      }
      
      // Event Type filter
      if (filterOptions.eventType && event.eventType !== filterOptions.eventType) {
        return false;
      }
      
      // Search query
      if (searchQuery && 
          !event.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !event.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
    
    // Filter trails
    const filteredTrails = initialTrails.filter(trail => {
      // Activity Type filter
      if (filterOptions.activityType !== 'all' && trail.type !== filterOptions.activityType) {
        return false;
      }
      
      // Difficulty filter
      if (filterOptions.difficulty && trail.difficulty !== filterOptions.difficulty) {
        return false;
      }
      
      // Distance filter
      if (filterOptions.distance) {
        const distance = parseFloat(trail.distance.split(' ')[0]);
        
        if (filterOptions.distance === 'short' && distance >= 5) {
          return false;
        } else if (filterOptions.distance === 'medium' && (distance < 5 || distance > 15)) {
          return false;
        } else if (filterOptions.distance === 'long' && distance <= 15) {
          return false;
        }
      }
      
      // Elevation filter
      if (filterOptions.elevation && trail.elevation !== filterOptions.elevation) {
        return false;
      }
      
      // Search query
      if (searchQuery && 
          !trail.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
    
    setEvents(filteredEvents);
    setTrails(filteredTrails);
  };

  // Apply filters when search query changes
  useEffect(() => {
    applyFilters();
  }, [searchQuery]);

  const handleEventClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  const handleTrailClick = (trailId: string) => {
    navigate(`/trail/${trailId}`);
  };

  const difficultyColors = {
    "beginner": "bg-green-100 text-green-800",
    "intermediate": "bg-yellow-100 text-yellow-800",
    "advanced": "bg-orange-100 text-orange-800",
    "expert": "bg-red-100 text-red-800"
  };

  const typeColors = {
    "canicross": "bg-forest text-white",
    "cani-hiking": "bg-earth text-white",
    "cani-MTB": "bg-sky text-white"
  };

  return (
    <div className="px-4 py-6 pb-24">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      
      <div className="flex space-x-2 mb-4">
        <Input 
          placeholder="Search events, trails, or users" 
          className="border-gray-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button size="icon" className="bg-forest text-white">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <ActivityFilters 
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        onApplyFilters={applyFilters}
        resultCount={events.length + trails.length}
        isPremiumUser={isPremiumUser}
      />
      
      <section className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          <Button variant="link" className="text-forest">
            View all
          </Button>
        </div>
        
        {events.length > 0 ? (
          <div className="space-y-4">
            {events.map(event => (
              <Card 
                key={event.id} 
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleEventClick(event.id)}
              >
                <div className="border-l-4 border-forest">
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-semibold">{event.title}</h3>
                      <Badge className={typeColors[event.type]}>
                        {event.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mt-2 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge className={difficultyColors[event.difficulty as keyof typeof difficultyColors]}>
                        {event.difficulty}
                      </Badge>
                      <Badge variant="outline">{event.eventType}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{event.attendees} attending</span>
                      </div>
                      <Button size="sm" className="bg-forest text-white">
                        Join
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground border border-dashed rounded-md">
            <p>No events match your filters</p>
          </div>
        )}
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Popular Trails</h2>
          <Button variant="link" className="text-forest">
            View map
          </Button>
        </div>
        
        {trails.length > 0 ? (
          <div className="space-y-4">
            {trails.map(trail => (
              <Card 
                key={trail.id} 
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleTrailClick(trail.id)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{trail.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{trail.distance}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-forest" />
                  </div>
                  
                  <div className="flex flex-wrap space-x-2 mt-3">
                    <Badge className={difficultyColors[trail.difficulty as keyof typeof difficultyColors]}>
                      {trail.difficulty}
                    </Badge>
                    <Badge variant="outline">{trail.terrain}</Badge>
                    <Badge className={typeColors[trail.type]}>
                      {trail.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground border border-dashed rounded-md">
            <p>No trails match your filters</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ExplorePage;

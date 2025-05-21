
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, MapPin, Calendar, ArrowUpRight } from "lucide-react";

const ExplorePage = () => {
  // Sample events data
  const events = [
    {
      id: "1",
      title: "Weekend Canicross Meetup",
      date: "May 25, 2025",
      location: "Central Park",
      attendees: 14,
      distance: "5 km",
      type: "canicross"
    },
    {
      id: "2",
      title: "Mountain Trail Challenge",
      date: "June 5, 2025",
      location: "Blue Ridge Mountains",
      attendees: 27,
      distance: "12 km",
      type: "cani-hiking"
    },
    {
      id: "3",
      title: "Spring Bike Trail",
      date: "May 30, 2025",
      location: "Riverside Path",
      attendees: 8,
      distance: "15 km",
      type: "cani-MTB"
    }
  ];

  // Sample trails data
  const trails = [
    {
      id: "1",
      name: "Woodland Path",
      distance: "3.8 km",
      difficulty: "easy",
      terrain: "flat",
      type: "canicross"
    },
    {
      id: "2",
      name: "Mountain View Trail",
      distance: "7.2 km",
      difficulty: "moderate",
      terrain: "hilly",
      type: "cani-hiking"
    },
    {
      id: "3",
      name: "River Valley Circuit",
      distance: "12.5 km",
      difficulty: "challenging",
      terrain: "mixed",
      type: "cani-MTB"
    }
  ];

  const difficultyColors = {
    "easy": "bg-green-100 text-green-800",
    "moderate": "bg-yellow-100 text-yellow-800",
    "challenging": "bg-red-100 text-red-800"
  };

  const typeColors = {
    "canicross": "bg-forest text-white",
    "cani-hiking": "bg-earth text-white",
    "cani-MTB": "bg-sky text-white"
  };

  return (
    <div className="px-4 py-6 pb-24">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>
      
      <div className="flex space-x-2 mb-6">
        <Input 
          placeholder="Search events, trails, or users" 
          className="border-gray-300" 
          prefix={<Search className="h-4 w-4 text-gray-400" />}
        />
        <Button size="icon" className="bg-forest text-white">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <section className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          <Button variant="link" className="text-forest">
            View all
          </Button>
        </div>
        
        <div className="space-y-4">
          {events.map(event => (
            <Card key={event.id} className="overflow-hidden">
              <div className="border-l-4 border-forest">
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <Badge className={typeColors[event.type as keyof typeof typeColors]}>
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
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Popular Trails</h2>
          <Button variant="link" className="text-forest">
            View map
          </Button>
        </div>
        
        <div className="space-y-4">
          {trails.map(trail => (
            <Card key={trail.id} className="overflow-hidden">
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
                
                <div className="flex space-x-2 mt-3">
                  <Badge className={difficultyColors[trail.difficulty as keyof typeof difficultyColors]}>
                    {trail.difficulty}
                  </Badge>
                  <Badge variant="outline">{trail.terrain}</Badge>
                  <Badge className={typeColors[trail.type as keyof typeof typeColors]}>
                    {trail.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;

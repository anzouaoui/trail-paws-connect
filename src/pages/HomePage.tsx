
import React from "react";
import ActivityCard from "@/components/ActivityCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Bell, Filter } from "lucide-react";

const HomePage = () => {
  // Sample data
  const recentActivities = [
    {
      id: "1",
      title: "Morning Run with Max",
      type: "canicross" as const,
      date: "2025-05-21",
      duration: "45:32",
      distance: "5.7 km",
      location: "Central Park Trail",
      dogName: "Max",
      dogImage: undefined,
      likes: 14
    },
    {
      id: "2",
      title: "Hill Training",
      type: "cani-hiking" as const,
      date: "2025-05-19",
      duration: "1:12:05",
      distance: "7.3 km",
      location: "Mountain View Path",
      dogName: "Bella",
      dogImage: undefined,
      likes: 23
    },
    {
      id: "3",
      title: "Weekend Adventure",
      type: "cani-MTB" as const,
      date: "2025-05-18",
      duration: "58:14",
      distance: "12.8 km",
      location: "River Valley Trail",
      dogName: "Rocky",
      dogImage: undefined,
      likes: 31
    }
  ];

  const handleActivityClick = (id: string) => {
    console.log(`Clicked activity ${id}`);
    // Navigate to activity detail
  };

  return (
    <div className="pb-24">
      <header className="px-4 pt-4 pb-2">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-forest text-white">JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold">Hi, John!</h1>
              <p className="text-sm text-muted-foreground">Ready for a new adventure?</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Activity Feed</h2>
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
        </div>
      </header>

      <section className="px-4 space-y-4">
        {recentActivities.map(activity => (
          <ActivityCard 
            key={activity.id}
            {...activity}
            onClick={() => handleActivityClick(activity.id)}
          />
        ))}
      </section>

      <section className="mt-8 px-4">
        <h2 className="text-xl font-semibold mb-4">Upcoming Challenges</h2>
        <div className="activity-card bg-gradient-to-r from-forest to-forest-dark text-white">
          <h3 className="text-lg font-semibold">Summer Trail Challenge</h3>
          <p className="text-sm opacity-90 mb-3">Complete 50km in the next 14 days</p>
          <div className="flex justify-between items-center">
            <span className="text-sm">23 participants</span>
            <Button size="sm" variant="secondary" className="bg-white text-forest hover:bg-gray-100">
              Join Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


import { RecommendedActivity } from "@/types/recommendations";

export const MOCK_RECOMMENDATIONS: RecommendedActivity[] = [
  {
    id: "rec1",
    title: "Sunrise Trail Run",
    type: "canicross",
    description: "Based on your recent runs, this moderate trail would be perfect for improving your endurance.",
    duration: "40-50 min",
    distance: "5.2 km",
    location: "Woodland Park Trails",
    elevation: "150m",
    rating: 3,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
    dogNames: ["Max"]
  },
  {
    id: "rec2",
    title: "Highland Loop",
    type: "cani-hiking",
    description: "Given your preference for hills and your dog's energy levels, this challenging hike is recommended.",
    duration: "1h 30min",
    distance: "8.4 km",
    location: "Mountain Ridge Path",
    elevation: "320m",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
    dogNames: ["Luna", "Rocky"]
  },
  {
    id: "rec3",
    title: "River Valley Ride",
    type: "cani-MTB",
    description: "Perfect for you and Bella based on your recent biking activity patterns and her running speed.",
    duration: "55-65 min",
    distance: "11.8 km",
    location: "Riverside Trail Network",
    elevation: "90m",
    rating: 3.5,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306",
    dogNames: ["Bella"]
  }
];

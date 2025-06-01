
import { ActivityType } from "@/components/ActivityCard";

export interface RecommendedActivity {
  id: string;
  title: string;
  type: ActivityType;
  description: string;
  duration: string;
  distance: string;
  location: string;
  elevation: string;
  rating: number;
  image?: string;
  dogNames: string[];
}

export interface ActivityRecommendationsProps {
  isPremium?: boolean;
}

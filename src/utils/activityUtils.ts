
import { ActivityType } from "@/components/ActivityCard";

export const getActivityTypeLabel = (type: ActivityType) => {
  switch(type) {
    case "canicross": return "Course";
    case "cani-hiking": return "Randonnée";
    case "cani-MTB": return "Vélo";
    default: return type;
  }
};

export const getDifficultyColor = (rating: number) => {
  if (rating >= 4.5) return "bg-red-500/20 text-red-700";
  if (rating >= 3.5) return "bg-orange-500/20 text-orange-700";
  if (rating >= 2.5) return "bg-yellow-500/20 text-yellow-700";
  return "bg-green-500/20 text-green-700";
};

export const getDifficultyText = (rating: number) => {
  if (rating >= 4.5) return "Expert";
  if (rating >= 3.5) return "Avancé";
  if (rating >= 2.5) return "Intermédiaire";
  if (rating >= 1.5) return "Débutant";
  return "Facile";
};

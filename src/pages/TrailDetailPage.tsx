
import React from "react";
import { useParams } from "react-router-dom";
import TrailHeader from "@/components/trail/TrailHeader";
import TrailDescription from "@/components/trail/TrailDescription";
import TrailInfo from "@/components/trail/TrailInfo";
import TrailRating from "@/components/trail/TrailRating";
import TrailFeatures from "@/components/trail/TrailFeatures";
import TrailTips from "@/components/trail/TrailTips";
import TrailActions from "@/components/trail/TrailActions";

const TrailDetailPage = () => {
  const { id } = useParams();

  // Simulate premium user status - in real app this would come from auth context
  const isPremiumUser = false; // Change to true to test premium features

  // Sample trail data - normally this would come from an API
  const trail = {
    id: id,
    name: "Woodland Path",
    distance: "3.8 km",
    difficulty: "beginner",
    terrain: "flat",
    type: "canicross",
    elevation: "low",
    description: "Un magnifique sentier forestier parfait pour débuter en canicross. Le parcours serpente à travers une forêt de chênes centenaires avec un terrain plat et bien entretenu. Idéal pour une première expérience avec votre chien.",
    location: "Forêt de Fontainebleau",
    duration: "45 min",
    elevationGain: "50m",
    surface: "Terre battue",
    rating: 4.5,
    reviews: 23,
    features: [
      "Point d'eau disponible",
      "Parking gratuit",
      "Accessible toute l'année",
      "Toilettes publiques"
    ],
    tips: [
      "Meilleure période: tôt le matin",
      "Éviter les week-ends en été",
      "Prévoir de l'eau pour le chien"
    ]
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <TrailHeader trail={trail} />

      <div className="p-4 space-y-6">
        <TrailDescription description={trail.description} />
        <TrailInfo trail={trail} />
        <TrailRating rating={trail.rating} reviews={trail.reviews} />
        <TrailFeatures features={trail.features} />
        <TrailTips tips={trail.tips} />
        <TrailActions trailId={trail.id || ""} isPremiumUser={isPremiumUser} />
      </div>
    </div>
  );
};

export default TrailDetailPage;

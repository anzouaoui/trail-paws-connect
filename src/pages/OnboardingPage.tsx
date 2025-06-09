
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "@/hooks/useOnboarding";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import OnboardingSlide from "@/components/OnboardingSlide";

const slides = [
  {
    title: "Découvrez de nouveaux sentiers",
    description: "Découvrez de nouveaux sentiers et suivez vos aventures avec votre compagnon canin.",
    imageSrc: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&h=600",
    imageAlt: "Chien et propriétaire explorant un sentier en forêt",
  },
  {
    title: "Surveillez santé et performance",
    description: "Surveillez la santé et les performances de votre chien pour garantir un bien-être optimal.",
    imageSrc: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=600&h=600",
    imageAlt: "Chien portant un tracker d'activité pendant l'exercice en plein air",
  },
  {
    title: "Connectez-vous à la communauté",
    description: "Connectez-vous avec une communauté de passionnés de sports canins et partagez vos expériences.",
    imageSrc: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=600&h=600",
    imageAlt: "Groupe de propriétaires de chiens avec leurs animaux lors d'un événement en plein air",
  },
];

const OnboardingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { completeOnboarding } = useOnboarding();
  const { user } = useFirebaseAuth();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleSkip = () => {
    navigate("/login");
  };

  const handleGetStarted = () => {
    completeOnboarding();
    navigate("/signup");
  };

  const handleComplete = () => {
    completeOnboarding();
    navigate("/signup");
  };

  return (
    <div className="relative h-screen bg-background overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        {slides.map((slide, index) => (
          <OnboardingSlide
            key={index}
            {...slide}
            index={index}
            isActive={currentSlide === index}
            totalSlides={slides.length}
            onNext={handleNext}
            onSkip={handleSkip}
            onComplete={handleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingPage;

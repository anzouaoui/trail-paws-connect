
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import OnboardingSlide from "@/components/OnboardingSlide";

const slides = [
  {
    title: "Discover New Trails",
    description: "Discover new trails and track your adventures with your canine companion.",
    imageSrc: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&h=600",
    imageAlt: "Dog and owner exploring a trail in the forest",
  },
  {
    title: "Monitor Health & Performance",
    description: "Monitor your dog's health and performance to ensure optimal well-being.",
    imageSrc: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=600&h=600",
    imageAlt: "Dog wearing activity tracker during outdoor exercise",
  },
  {
    title: "Connect With Community",
    description: "Connect with a community of fellow dog sport enthusiasts and share your experiences.",
    imageSrc: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=600&h=600",
    imageAlt: "Group of dog owners with their pets at an outdoor event",
  },
];

const OnboardingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleSkip = () => {
    navigate("/home");
  };

  const handleComplete = () => {
    // In a real app, you might want to store that the user has completed onboarding
    // localStorage.setItem("onboardingCompleted", "true");
    navigate("/home");
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

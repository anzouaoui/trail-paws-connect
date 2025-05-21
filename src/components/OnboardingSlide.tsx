
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface OnboardingSlideProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  index: number;
  isActive: boolean;
  totalSlides: number;
  onNext: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

const OnboardingSlide = ({
  title,
  description,
  imageSrc,
  imageAlt,
  index,
  isActive,
  totalSlides,
  onNext,
  onSkip,
  onComplete,
}: OnboardingSlideProps) => {
  const isLastSlide = index === totalSlides - 1;

  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <motion.div
      className={`absolute inset-0 flex flex-col p-6 ${isActive ? "block" : "hidden"}`}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      exit="exit"
      variants={slideVariants}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={onSkip}>
          Skip
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8 py-8">
        <div className="relative w-full aspect-square max-w-xs mx-auto mb-4">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover rounded-3xl shadow-lg"
          />
        </div>

        <div className="text-center space-y-3 max-w-xs mx-auto">
          <h2 className="text-2xl font-bold text-forest">{title}</h2>
          <p className="text-base text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-forest" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        <Button 
          className="w-full"
          onClick={isLastSlide ? onComplete : onNext}
        >
          {isLastSlide ? "Get Started" : "Continue"}
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};

export default OnboardingSlide;

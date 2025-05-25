
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Star, Heart, CheckCircle, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DogAvatar from "@/components/DogAvatar";

interface MoodTag {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

const MOOD_TAGS: MoodTag[] = [
  { id: "fun", label: "Amusant", emoji: "🎉", color: "bg-yellow-100 text-yellow-800" },
  { id: "challenging", label: "Exigeant", emoji: "💪", color: "bg-orange-100 text-orange-800" },
  { id: "peaceful", label: "Paisible", emoji: "🧘", color: "bg-green-100 text-green-800" },
  { id: "energetic", label: "Énergique", emoji: "⚡", color: "bg-blue-100 text-blue-800" },
  { id: "scenic", label: "Panoramique", emoji: "🌄", color: "bg-purple-100 text-purple-800" },
  { id: "muddy", label: "Boueux", emoji: "🦶", color: "bg-amber-100 text-amber-800" },
  { id: "social", label: "Social", emoji: "👥", color: "bg-pink-100 text-pink-800" },
  { id: "technical", label: "Technique", emoji: "🎯", color: "bg-red-100 text-red-800" }
];

const ActivityRatingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock activity data
  const activity = {
    title: "Aventure en Forêt",
    type: "canicross",
    date: "Aujourd'hui",
    distance: "5,2 km",
    duration: "32 min",
    dogName: "Max"
  };

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleMoodToggle = (moodId: string) => {
    setSelectedMoods(prev => 
      prev.includes(moodId) 
        ? prev.filter(id => id !== moodId)
        : [...prev, moodId]
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Note requise",
        description: "Veuillez sélectionner une note avant de valider.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: "Avis soumis ! 🎉",
      description: `Merci d'avoir partagé votre expérience ${rating} étoiles avec ${activity.dogName} !`
    });

    // Navigate back after a delay
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 1: return "Pas terrible 😕";
      case 2: return "Peut mieux faire 🤔";
      case 3: return "Plutôt bien ! 😊";
      case 4: return "Vraiment sympa ! 😄";
      case 5: return "Aventure incroyable ! 🤩";
      default: return "Comment était votre course ?";
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest/5 to-sky/5 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
            className="mb-4"
          >
            <CheckCircle className="h-20 w-20 text-forest mx-auto" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Merci !</h2>
          <p className="text-muted-foreground mb-4">
            Votre avis aide la communauté à trouver de superbes aventures
          </p>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-4xl"
          >
            🐕
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest/5 to-sky/5 pb-24">
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-50">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold">Évaluez votre aventure</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Activity Summary */}
        <Card className="overflow-hidden border-none shadow-sm bg-white/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <DogAvatar name={activity.dogName} size="md" />
              <div>
                <h3 className="font-semibold">{activity.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {activity.distance} • {activity.duration} • {activity.date}
                </p>
              </div>
            </div>
            <Badge className="bg-forest/10 text-forest">
              {activity.type}
            </Badge>
          </CardContent>
        </Card>

        {/* Rating Section */}
        <Card className="border-none shadow-sm bg-white/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">
              {getRatingText(hoveredRating || rating)}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Aidez les autres à choisir la bonne aventure ! 🌟
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-2 rounded-full hover:bg-yellow-50 transition-colors"
                >
                  <Star
                    className={`h-10 w-10 transition-all duration-200 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {rating > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {/* Mood Tags */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">
                      Comment décririez-vous cette aventure ? (Optionnel)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {MOOD_TAGS.map((mood) => (
                        <motion.button
                          key={mood.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleMoodToggle(mood.id)}
                          className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
                            selectedMoods.includes(mood.id)
                              ? mood.color + " ring-2 ring-offset-1 ring-current"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          <span className="mr-1">{mood.emoji}</span>
                          {mood.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Review Text Area */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">
                      Parlez-nous de votre expérience (Optionnel)
                    </h4>
                    <Textarea
                      placeholder={`Dites-nous ce que vous et ${activity.dogName} avez pensé du sentier... Était-il boueux ? Parfait pour les débutants ? Belle vue ? Des conseils pour d'autres coureurs ?`}
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      className="min-h-[100px] resize-none border-2 focus:border-forest transition-colors"
                      maxLength={500}
                    />
                    <p className="text-xs text-muted-foreground mt-1 text-right">
                      {review.length}/500
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Premium Feature Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-dashed border-forest/30 bg-gradient-to-r from-forest/5 to-sky/5">
            <CardContent className="p-4 text-center">
              <Sparkles className="h-8 w-8 mx-auto mb-2 text-forest" />
              <p className="text-sm text-muted-foreground">
                Vos avis alimentent les recommandations IA pour les utilisateurs premium !
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className="w-full h-14 text-lg bg-forest hover:bg-forest-dark rounded-2xl"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Heart className="h-5 w-5" />
                </motion.div>
                Partage de votre expérience...
              </div>
            ) : (
              <>
                <Star className="h-5 w-5 mr-2" />
                Partagez votre expérience
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ActivityRatingPage;

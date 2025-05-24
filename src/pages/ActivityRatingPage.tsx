
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
  { id: "fun", label: "Fun", emoji: "🎉", color: "bg-yellow-100 text-yellow-800" },
  { id: "challenging", label: "Challenging", emoji: "💪", color: "bg-orange-100 text-orange-800" },
  { id: "peaceful", label: "Peaceful", emoji: "🧘", color: "bg-green-100 text-green-800" },
  { id: "energetic", label: "Energetic", emoji: "⚡", color: "bg-blue-100 text-blue-800" },
  { id: "scenic", label: "Scenic", emoji: "🌄", color: "bg-purple-100 text-purple-800" },
  { id: "muddy", label: "Muddy", emoji: "🦶", color: "bg-amber-100 text-amber-800" },
  { id: "social", label: "Social", emoji: "👥", color: "bg-pink-100 text-pink-800" },
  { id: "technical", label: "Technical", emoji: "🎯", color: "bg-red-100 text-red-800" }
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
    title: "Woodland Trail Adventure",
    type: "canicross",
    date: "Today",
    distance: "5.2 km",
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
        title: "Rating Required",
        description: "Please select a star rating before submitting.",
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
      title: "Review Submitted! 🎉",
      description: `Thanks for sharing your ${rating}-star experience with ${activity.dogName}!`
    });

    // Navigate back after a delay
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 1: return "Not great 😕";
      case 2: return "Could be better 🤔";
      case 3: return "Pretty good! 😊";
      case 4: return "Really enjoyed it! 😄";
      case 5: return "Amazing adventure! 🤩";
      default: return "How was your run?";
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
          <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
          <p className="text-muted-foreground mb-4">
            Your review helps the community find great adventures
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
          <h1 className="font-semibold">Rate Your Adventure</h1>
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
              Help others choose the right adventure! 🌟
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
                      How would you describe this adventure? (Optional)
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
                      Tell us more about your experience (Optional)
                    </h4>
                    <Textarea
                      placeholder={`Tell us what you and ${activity.dogName} thought of the trail... Was it muddy? Perfect for beginners? Great views? Any tips for other runners?`}
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
                Your reviews help power AI recommendations for premium users!
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
                Sharing your experience...
              </div>
            ) : (
              <>
                <Star className="h-5 w-5 mr-2" />
                Share Your Experience
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ActivityRatingPage;

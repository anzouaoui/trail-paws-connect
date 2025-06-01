
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { TrackingData, Dog } from "@/types/tracking";

export const useTracking = (dogs: Dog[], selectedDogIndex: number) => {
  const { toast } = useToast();
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [distance, setDistance] = useState("0.0");
  const [speed, setSpeed] = useState("0.0");
  const [heartRate, setHeartRate] = useState("--");
  const [calories, setCalories] = useState("0");
  const [isPaused, setIsPaused] = useState(false);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Format time for display
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0'),
    ].join(':');
  };

  // Update timer and simulate activity data
  useEffect(() => {
    if (isTracking && !isPaused) {
      const interval = setInterval(() => {
        setElapsedSeconds(prev => {
          const newTime = prev + 1;
          setElapsedTime(formatTime(newTime));
          return newTime;
        });
        
        // Simulate changing values for distance and other metrics
        if (elapsedSeconds % 5 === 0) {
          const currentDistance = parseFloat(distance);
          const newDistance = (currentDistance + 0.01).toFixed(1);
          setDistance(newDistance);
          
          // Random speed between 8-12 km/h
          const newSpeed = (8 + Math.random() * 4).toFixed(1);
          setSpeed(newSpeed);
          
          // Random heart rate for dog (120-180 bpm)
          const newHeartRate = Math.floor(120 + Math.random() * 60).toString();
          setHeartRate(newHeartRate);
          
          // Increment calories
          const newCalories = (parseInt(calories) + 2).toString();
          setCalories(newCalories);
        }
      }, 1000);
      
      setTimerInterval(interval);
      return () => clearInterval(interval);
    }
  }, [isTracking, isPaused, elapsedSeconds, distance, calories]);

  const handleStartTracking = () => {
    if (!isTracking) {
      // Starting a new activity
      setIsTracking(true);
      setIsPaused(false);
      toast({
        title: "Activité Commencée",
        description: `Suivi commencé avec ${dogs[selectedDogIndex].name}`,
      });
    } else if (isPaused) {
      // Resuming
      setIsPaused(false);
      toast({
        description: "Activité reprise",
      });
    } else {
      // Pausing
      setIsPaused(true);
      if (timerInterval) clearInterval(timerInterval);
      toast({
        description: "Activité en pause",
      });
    }
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    setIsPaused(false);
    if (timerInterval) clearInterval(timerInterval);
    
    // Would normally save the activity here
    toast({
      title: "Activité Terminée",
      description: `Vous avez parcouru ${distance}km en ${elapsedTime}`,
      variant: "default",
    });
    
    // Reset values for next activity
    setTimeout(() => {
      setElapsedTime("00:00:00");
      setElapsedSeconds(0);
      setDistance("0.0");
      setSpeed("0.0");
      setHeartRate("--");
      setCalories("0");
    }, 2000);
  };

  const trackingData: TrackingData = {
    elapsedTime,
    elapsedSeconds,
    distance,
    speed,
    heartRate,
    calories
  };

  return {
    isTracking,
    isPaused,
    trackingData,
    handleStartTracking,
    handleStopTracking
  };
};


import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Timer } from "lucide-react";

interface TrackingControlsProps {
  isTracking: boolean;
  isPaused: boolean;
  onStartTracking: () => void;
  onStopTracking: () => void;
}

const TrackingControls: React.FC<TrackingControlsProps> = ({
  isTracking,
  isPaused,
  onStartTracking,
  onStopTracking
}) => {
  return (
    <div className="pt-4">
      {isTracking ? (
        <div className="grid grid-cols-2 gap-3">
          <Button 
            className={`py-6 text-lg rounded-2xl ${isPaused ? 'bg-forest' : 'bg-amber-500'}`}
            onClick={onStartTracking}
          >
            {isPaused ? (
              <>
                <Play className="h-5 w-5 mr-2" />
                Reprendre
              </>
            ) : (
              <>
                <Pause className="h-5 w-5 mr-2" />
                Pause
              </>
            )}
          </Button>
          <Button 
            className="bg-destructive py-6 text-lg rounded-2xl"
            onClick={onStopTracking}
          >
            <Timer className="h-5 w-5 mr-2" />
            Terminer
          </Button>
        </div>
      ) : (
        <Button 
          className="w-full py-6 text-lg bg-forest rounded-2xl"
          onClick={onStartTracking}
        >
          <Play className="h-5 w-5 mr-2" />
          Commencer le Suivi
        </Button>
      )}
    </div>
  );
};

export default TrackingControls;

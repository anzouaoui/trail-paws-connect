
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Activity {
  calories: number;
  pace: { avg: string; best: string };
  heartRate: { avg: number; max: number };
  elevation: { gain: number; loss: number };
}

interface PerformanceStatsFormProps {
  activity: Activity;
}

const PerformanceStatsForm = ({ activity }: PerformanceStatsFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Statistiques de performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="calories">Calories brûlées</Label>
            <Input
              id="calories"
              type="number"
              defaultValue={activity.calories}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="avgPace">Allure moyenne</Label>
            <Input
              id="avgPace"
              placeholder="Ex: 5:12"
              defaultValue={activity.pace.avg}
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="avgHeartRate">Fréquence cardiaque moyenne</Label>
            <Input
              id="avgHeartRate"
              type="number"
              defaultValue={activity.heartRate.avg}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="maxHeartRate">Fréquence cardiaque max</Label>
            <Input
              id="maxHeartRate"
              type="number"
              defaultValue={activity.heartRate.max}
              className="mt-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="elevationGain">Dénivelé positif (m)</Label>
            <Input
              id="elevationGain"
              type="number"
              defaultValue={activity.elevation.gain}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="elevationLoss">Dénivelé négatif (m)</Label>
            <Input
              id="elevationLoss"
              type="number"
              defaultValue={activity.elevation.loss}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceStatsForm;

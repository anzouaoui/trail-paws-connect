
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Activity {
  dogName: string;
  dogHeartRate: { avg: number; max: number };
}

interface DogPerformanceFormProps {
  activity: Activity;
}

const DogPerformanceForm = ({ activity }: DogPerformanceFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Performances de {activity.dogName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="dogAvgHeartRate">Fréquence cardiaque moyenne</Label>
            <Input
              id="dogAvgHeartRate"
              type="number"
              defaultValue={activity.dogHeartRate.avg}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="dogMaxHeartRate">Fréquence cardiaque max</Label>
            <Input
              id="dogMaxHeartRate"
              type="number"
              defaultValue={activity.dogHeartRate.max}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DogPerformanceForm;

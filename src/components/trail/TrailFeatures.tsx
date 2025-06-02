
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrailFeaturesProps {
  features: string[];
}

const TrailFeatures = ({ features }: TrailFeaturesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Équipements disponibles</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <div className="w-2 h-2 bg-forest rounded-full mr-3" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TrailFeatures;

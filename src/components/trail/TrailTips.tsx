
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TrailTipsProps {
  tips: string[];
}

const TrailTips = ({ tips }: TrailTipsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conseils</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3" />
              <span className="text-sm">{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default TrailTips;

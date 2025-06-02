
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

interface EventRequirementsProps {
  requirements: string[];
}

const EventRequirements = ({ requirements }: EventRequirementsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Matériel requis</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {requirements.map((requirement, index) => (
            <li key={index} className="flex items-center">
              <Award className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm">{requirement}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default EventRequirements;

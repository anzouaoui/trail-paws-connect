
import React from 'react';
import { Watch, Heart, MapPin, Smartphone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface DeviceType {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: 'human' | 'dog';
  description: string;
}

export const deviceTypes: DeviceType[] = [
  {
    id: 'smartwatch',
    name: 'Montre connectée',
    icon: <Watch className="h-6 w-6" />,
    category: 'human',
    description: 'Apple Watch, Garmin, Fitbit, etc.'
  },
  {
    id: 'heart_rate',
    name: 'Capteur cardiaque',
    icon: <Heart className="h-6 w-6" />,
    category: 'human',
    description: 'Ceinture pectorale, brassard'
  },
  {
    id: 'smartphone',
    name: 'Smartphone',
    icon: <Smartphone className="h-6 w-6" />,
    category: 'human',
    description: 'iPhone, Android'
  },
  {
    id: 'dog_gps',
    name: 'GPS pour chien',
    icon: <MapPin className="h-6 w-6" />,
    category: 'dog',
    description: 'Tractive, Weenect, etc.'
  }
];

interface DeviceTypeSelectorProps {
  selectedType: string;
  onTypeSelect: (typeId: string) => void;
  showAllOption?: boolean;
  variant?: 'grid' | 'detailed';
}

export const DeviceTypeSelector: React.FC<DeviceTypeSelectorProps> = ({
  selectedType,
  onTypeSelect,
  showAllOption = false,
  variant = 'grid'
}) => {
  if (variant === 'detailed') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Type d'Appareil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {deviceTypes.map((device) => (
              <div
                key={device.id}
                onClick={() => onTypeSelect(device.id)}
                className={`p-4 border rounded-xl cursor-pointer transition-all ${
                  selectedType === device.id 
                    ? 'border-forest bg-forest/5' 
                    : 'border-border hover:border-forest/50'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-2 rounded-lg mb-2 ${
                    selectedType === device.id ? 'bg-forest text-white' : 'bg-muted'
                  }`}>
                    {device.icon}
                  </div>
                  <h3 className="font-medium text-sm">{device.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{device.description}</p>
                  <Badge 
                    variant="outline" 
                    className="mt-2 text-xs"
                  >
                    {device.category === 'human' ? 'Humain' : 'Chien'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtrer par Type (Optionnel)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {showAllOption && (
            <Button
              variant={selectedType === '' ? 'default' : 'outline'}
              onClick={() => onTypeSelect('')}
              className="h-auto p-3"
            >
              Tous les appareils
            </Button>
          )}
          {deviceTypes.map((device) => (
            <Button
              key={device.id}
              variant={selectedType === device.id ? 'default' : 'outline'}
              onClick={() => onTypeSelect(device.id)}
              className="h-auto p-3 flex flex-col items-center"
            >
              {device.icon}
              <span className="text-xs mt-1">{device.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

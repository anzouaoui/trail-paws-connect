
import React from 'react';
import { Bluetooth } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface BluetoothStatusProps {
  bluetoothEnabled: boolean;
  onBluetoothToggle: (enabled: boolean) => void;
}

export const BluetoothStatus: React.FC<BluetoothStatusProps> = ({
  bluetoothEnabled,
  onBluetoothToggle
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bluetooth className="h-5 w-5" />
            Bluetooth
          </div>
          <Switch 
            checked={bluetoothEnabled}
            onCheckedChange={onBluetoothToggle}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {bluetoothEnabled 
            ? "Bluetooth activé - Recherchez des appareils à proximité"
            : "Activez le Bluetooth pour rechercher des appareils"
          }
        </p>
      </CardContent>
    </Card>
  );
};


import React from 'react';
import { Bluetooth, BluetoothConnected } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export interface BluetoothDevice {
  id: string;
  name: string;
  type: string;
  signal: number;
  paired: boolean;
}

interface BluetoothScannerProps {
  isScanning: boolean;
  bluetoothDevices: BluetoothDevice[];
  selectedBluetoothDevice: BluetoothDevice | null;
  isConnecting: boolean;
  bluetoothEnabled: boolean;
  selectedType: string;
  onStartScan: () => void;
  onStopScan: () => void;
  onConnect: (device: BluetoothDevice) => void;
}

const mockBluetoothDevices: BluetoothDevice[] = [
  { id: '1', name: 'Apple Watch Series 8', type: 'smartwatch', signal: 85, paired: false },
  { id: '2', name: 'Garmin Forerunner 945', type: 'smartwatch', signal: 72, paired: false },
  { id: '3', name: 'Polar H10', type: 'heart_rate', signal: 68, paired: false },
  { id: '4', name: 'FitBark GPS', type: 'dog_gps', signal: 91, paired: false },
  { id: '5', name: 'iPhone de Marc', type: 'smartphone', signal: 95, paired: true }
];

export const BluetoothScanner: React.FC<BluetoothScannerProps> = ({
  isScanning,
  bluetoothDevices,
  selectedBluetoothDevice,
  isConnecting,
  bluetoothEnabled,
  selectedType,
  onStartScan,
  onStopScan,
  onConnect
}) => {
  const { toast } = useToast();

  const getSignalIcon = (signal: number) => {
    if (signal >= 80) return "🟢";
    if (signal >= 60) return "🟡";
    return "🔴";
  };

  const handleScanStart = () => {
    if (!bluetoothEnabled) {
      toast({
        title: "Bluetooth désactivé",
        description: "Veuillez activer le Bluetooth pour rechercher des appareils.",
        variant: "destructive"
      });
      return;
    }
    onStartScan();
  };

  return (
    <>
      {/* Recherche Bluetooth */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Recherche Bluetooth</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          {isScanning ? (
            <div>
              <div className="animate-pulse mb-4">
                <Bluetooth className="h-12 w-12 mx-auto text-blue-500" />
              </div>
              <h3 className="font-medium mb-2">Recherche en cours...</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Assurez-vous que votre appareil est détectable
              </p>
              <Button variant="outline" onClick={onStopScan}>
                Annuler
              </Button>
            </div>
          ) : (
            <div>
              <Bluetooth className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-medium mb-2">Rechercher des Appareils</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Trouvez des appareils Bluetooth à proximité
              </p>
              <Button 
                onClick={handleScanStart} 
                className="bg-blue-500 hover:bg-blue-600"
                disabled={!bluetoothEnabled}
              >
                <Bluetooth className="h-4 w-4 mr-2" />
                Lancer la Recherche
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Liste des appareils trouvés */}
      {bluetoothDevices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Appareils Trouvés</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {bluetoothDevices.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {device.paired ? (
                      <BluetoothConnected className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Bluetooth className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="text-sm">{getSignalIcon(device.signal)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{device.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">Signal: {device.signal}%</p>
                      {device.paired && (
                        <Badge variant="outline" className="text-xs">Déjà associé</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => onConnect(device)}
                  disabled={isConnecting || selectedBluetoothDevice?.id === device.id}
                  variant={selectedBluetoothDevice?.id === device.id ? "default" : "outline"}
                >
                  {isConnecting && selectedBluetoothDevice?.id === device.id ? (
                    "Connexion..."
                  ) : selectedBluetoothDevice?.id === device.id ? (
                    "Connecté"
                  ) : device.paired ? (
                    "Reconnecter"
                  ) : (
                    "Connecter"
                  )}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export { mockBluetoothDevices };

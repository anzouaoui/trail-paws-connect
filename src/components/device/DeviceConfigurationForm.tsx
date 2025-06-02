
import React from 'react';
import { BluetoothConnected } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { BluetoothDevice } from './BluetoothScanner';
import { DeviceType } from './DeviceTypeSelector';

export const brands = {
  smartwatch: ['Apple', 'Garmin', 'Fitbit', 'Samsung', 'Polar', 'Suunto', 'Amazfit'],
  heart_rate: ['Polar', 'Garmin', 'Wahoo', 'Scosche', 'Mio'],
  smartphone: ['Apple', 'Samsung', 'Google', 'Autre'],
  dog_gps: ['Tractive', 'Weenect', 'FitBark', 'Whistle', 'Garmin', 'Autre']
};

export interface FormData {
  name: string;
  brand: string;
  model: string;
  dogName: string;
  autoSync: boolean;
  notifications: boolean;
}

interface DeviceConfigurationFormProps {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  selectedDevice?: DeviceType;
  selectedBluetoothDevice?: BluetoothDevice | null;
  selectedType: string;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isBluetoothMode?: boolean;
}

export const DeviceConfigurationForm: React.FC<DeviceConfigurationFormProps> = ({
  formData,
  onFormDataChange,
  selectedDevice,
  selectedBluetoothDevice,
  selectedType,
  onSubmit,
  onCancel,
  isBluetoothMode = false
}) => {
  const updateFormData = (updates: Partial<FormData>) => {
    onFormDataChange({ ...formData, ...updates });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {isBluetoothMode && selectedBluetoothDevice ? (
              <>
                <BluetoothConnected className="h-5 w-5 text-blue-500" />
                Configuration - {selectedBluetoothDevice.name}
              </>
            ) : (
              <>
                {selectedDevice?.icon}
                Configuration - {selectedDevice?.name}
              </>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isBluetoothMode && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand">Marque *</Label>
                <Select value={formData.brand} onValueChange={(value) => updateFormData({ brand: value })}>
                  <SelectTrigger id="brand" className="mt-1">
                    <SelectValue placeholder="Sélectionnez la marque" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands[selectedType as keyof typeof brands]?.map((brand) => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="model">Modèle</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => updateFormData({ model: e.target.value })}
                  placeholder="ex: Series 8, Forerunner 945"
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {isBluetoothMode && selectedBluetoothDevice && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brand">Marque</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => updateFormData({ brand: e.target.value })}
                  placeholder="Auto-détectée"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="model">Modèle</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => updateFormData({ model: e.target.value })}
                  placeholder="Auto-détecté"
                  className="mt-1"
                />
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="name">Nom de l'appareil *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData({ name: e.target.value })}
              placeholder="ex: Ma montre, GPS de Rex"
              className="mt-1"
            />
          </div>

          {((selectedDevice?.category === 'dog') || (selectedBluetoothDevice?.type === 'dog_gps')) && (
            <div>
              <Label htmlFor="dogName">Nom du chien</Label>
              <Input
                id="dogName"
                value={formData.dogName}
                onChange={(e) => updateFormData({ dogName: e.target.value })}
                placeholder="ex: Rex, Bella"
                className="mt-1"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Paramètres de Synchronisation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Synchronisation automatique</p>
              <p className="text-sm text-muted-foreground">
                Importer automatiquement les données d'activité
              </p>
            </div>
            <Switch 
              checked={formData.autoSync}
              onCheckedChange={(checked) => updateFormData({ autoSync: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-muted-foreground">
                Recevoir des alertes de l'appareil
              </p>
            </div>
            <Switch 
              checked={formData.notifications}
              onCheckedChange={(checked) => updateFormData({ notifications: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button 
          type="button" 
          variant="outline" 
          className="flex-1"
          onClick={onCancel}
        >
          Annuler
        </Button>
        <Button 
          type="submit" 
          className="flex-1 bg-forest"
        >
          Ajouter l'Appareil
        </Button>
      </div>
    </form>
  );
};

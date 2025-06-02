
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Watch, Heart, MapPin, Smartphone, Search, Bluetooth, BluetoothConnected, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DeviceType {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: 'human' | 'dog';
  description: string;
}

interface BluetoothDevice {
  id: string;
  name: string;
  type: string;
  signal: number;
  paired: boolean;
}

const deviceTypes: DeviceType[] = [
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

const brands = {
  smartwatch: ['Apple', 'Garmin', 'Fitbit', 'Samsung', 'Polar', 'Suunto', 'Amazfit'],
  heart_rate: ['Polar', 'Garmin', 'Wahoo', 'Scosche', 'Mio'],
  smartphone: ['Apple', 'Samsung', 'Google', 'Autre'],
  dog_gps: ['Tractive', 'Weenect', 'FitBark', 'Whistle', 'Garmin', 'Autre']
};

// Mock Bluetooth devices
const mockBluetoothDevices: BluetoothDevice[] = [
  { id: '1', name: 'Apple Watch Series 8', type: 'smartwatch', signal: 85, paired: false },
  { id: '2', name: 'Garmin Forerunner 945', type: 'smartwatch', signal: 72, paired: false },
  { id: '3', name: 'Polar H10', type: 'heart_rate', signal: 68, paired: false },
  { id: '4', name: 'FitBark GPS', type: 'dog_gps', signal: 91, paired: false },
  { id: '5', name: 'iPhone de Marc', type: 'smartphone', signal: 95, paired: true }
];

const AddDevicePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [bluetoothDevices, setBluetoothDevices] = useState<BluetoothDevice[]>([]);
  const [selectedBluetoothDevice, setSelectedBluetoothDevice] = useState<BluetoothDevice | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    model: '',
    dogName: '',
    autoSync: true,
    notifications: true
  });

  const handleDeviceTypeSelect = (typeId: string) => {
    setSelectedType(typeId);
    setFormData({ ...formData, name: '', brand: '', model: '' });
    setSelectedBluetoothDevice(null);
  };

  const handleBluetoothScan = () => {
    if (!bluetoothEnabled) {
      toast({
        title: "Bluetooth désactivé",
        description: "Veuillez activer le Bluetooth pour rechercher des appareils.",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);
    setBluetoothDevices([]);
    
    // Simuler la recherche Bluetooth
    setTimeout(() => {
      const filteredDevices = selectedType 
        ? mockBluetoothDevices.filter(device => device.type === selectedType)
        : mockBluetoothDevices;
      
      setBluetoothDevices(filteredDevices);
      setIsScanning(false);
      
      toast({
        title: "Recherche terminée",
        description: `${filteredDevices.length} appareil(s) trouvé(s)`,
      });
    }, 3000);
  };

  const handleBluetoothConnect = async (device: BluetoothDevice) => {
    setIsConnecting(true);
    setSelectedBluetoothDevice(device);
    
    // Simuler la connexion Bluetooth
    setTimeout(() => {
      setIsConnecting(false);
      
      // Mettre à jour les données du formulaire avec les informations de l'appareil
      setFormData({
        ...formData,
        name: device.name,
        brand: device.name.split(' ')[0], // Extraire la marque du nom
        model: device.name.split(' ').slice(1).join(' ') // Extraire le modèle
      });
      
      toast({
        title: "Appareil connecté",
        description: `${device.name} connecté avec succès via Bluetooth`,
      });
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedType || !formData.name || !formData.brand) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Appareil ajouté",
      description: `${formData.name} a été ajouté avec succès !`,
    });
    
    navigate('/devices');
  };

  const selectedDevice = deviceTypes.find(type => type.id === selectedType);

  const getSignalIcon = (signal: number) => {
    if (signal >= 80) return "🟢";
    if (signal >= 60) return "🟡";
    return "🔴";
  };

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Ajouter un Appareil</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        <Tabs defaultValue="bluetooth" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bluetooth">Bluetooth</TabsTrigger>
            <TabsTrigger value="manual">Configuration Manuelle</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bluetooth" className="space-y-4">
            {/* État Bluetooth */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bluetooth className="h-5 w-5" />
                    Bluetooth
                  </div>
                  <Switch 
                    checked={bluetoothEnabled}
                    onCheckedChange={setBluetoothEnabled}
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

            {/* Sélection du type d'appareil pour filtrer */}
            <Card>
              <CardHeader>
                <CardTitle>Filtrer par Type (Optionnel)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={selectedType === '' ? 'default' : 'outline'}
                    onClick={() => setSelectedType('')}
                    className="h-auto p-3"
                  >
                    Tous les appareils
                  </Button>
                  {deviceTypes.map((device) => (
                    <Button
                      key={device.id}
                      variant={selectedType === device.id ? 'default' : 'outline'}
                      onClick={() => handleDeviceTypeSelect(device.id)}
                      className="h-auto p-3 flex flex-col items-center"
                    >
                      {device.icon}
                      <span className="text-xs mt-1">{device.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

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
                    <Button variant="outline" onClick={() => setIsScanning(false)}>
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
                      onClick={handleBluetoothScan} 
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
                        onClick={() => handleBluetoothConnect(device)}
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

            {/* Formulaire de configuration après connexion */}
            {selectedBluetoothDevice && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BluetoothConnected className="h-5 w-5 text-blue-500" />
                      Configuration - {selectedBluetoothDevice.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nom de l'appareil *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="ex: Ma montre, GPS de Rex"
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="brand">Marque</Label>
                        <Input
                          id="brand"
                          value={formData.brand}
                          onChange={(e) => setFormData({...formData, brand: e.target.value})}
                          placeholder="Auto-détectée"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="model">Modèle</Label>
                        <Input
                          id="model"
                          value={formData.model}
                          onChange={(e) => setFormData({...formData, model: e.target.value})}
                          placeholder="Auto-détecté"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    {selectedBluetoothDevice.type === 'dog_gps' && (
                      <div>
                        <Label htmlFor="dogName">Nom du chien</Label>
                        <Input
                          id="dogName"
                          value={formData.dogName}
                          onChange={(e) => setFormData({...formData, dogName: e.target.value})}
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
                        onCheckedChange={(checked) => setFormData({...formData, autoSync: checked})}
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
                        onCheckedChange={(checked) => setFormData({...formData, notifications: checked})}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate('/devices')}
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
            )}
          </TabsContent>
          
          <TabsContent value="manual" className="space-y-4">
            {/* Configuration manuelle existante */}
            <Card>
              <CardHeader>
                <CardTitle>Type d'Appareil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {deviceTypes.map((device) => (
                    <div
                      key={device.id}
                      onClick={() => handleDeviceTypeSelect(device.id)}
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

            {/* Formulaire de configuration manuelle */}
            {selectedType && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {selectedDevice?.icon}
                      Configuration - {selectedDevice?.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="brand">Marque *</Label>
                        <Select value={formData.brand} onValueChange={(value) => setFormData({...formData, brand: value})}>
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
                          onChange={(e) => setFormData({...formData, model: e.target.value})}
                          placeholder="ex: Series 8, Forerunner 945"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="name">Nom de l'appareil *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="ex: Ma montre, GPS de Rex"
                        className="mt-1"
                      />
                    </div>

                    {selectedDevice?.category === 'dog' && (
                      <div>
                        <Label htmlFor="dogName">Nom du chien</Label>
                        <Input
                          id="dogName"
                          value={formData.dogName}
                          onChange={(e) => setFormData({...formData, dogName: e.target.value})}
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
                        onCheckedChange={(checked) => setFormData({...formData, autoSync: checked})}
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
                        onCheckedChange={(checked) => setFormData({...formData, notifications: checked})}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => navigate('/devices')}
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
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AddDevicePage;

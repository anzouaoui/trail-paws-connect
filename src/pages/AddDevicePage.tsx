
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Watch, Heart, MapPin, Smartphone, Search } from "lucide-react";
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

const AddDevicePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
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
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simuler la recherche
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "Appareil détecté",
        description: "Apple Watch Series 8 trouvée. Appuyez pour connecter.",
      });
    }, 3000);
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
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Configuration Manuelle</TabsTrigger>
            <TabsTrigger value="scan">Recherche Automatique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scan" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Recherche d'Appareils</CardTitle>
              </CardHeader>
              <CardContent className="text-center py-8">
                {isScanning ? (
                  <div>
                    <div className="animate-pulse mb-4">
                      <Search className="h-12 w-12 mx-auto text-forest" />
                    </div>
                    <h3 className="font-medium mb-2">Recherche en cours...</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Assurez-vous que votre appareil est en mode appairage
                    </p>
                    <Button variant="outline" onClick={() => setIsScanning(false)}>
                      Annuler
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-medium mb-2">Rechercher des Appareils</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Trouvez automatiquement les appareils à proximité
                    </p>
                    <Button onClick={handleScan} className="bg-forest">
                      <Search className="h-4 w-4 mr-2" />
                      Lancer la Recherche
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="manual" className="space-y-4">
            {/* Sélection du type d'appareil */}
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

            {/* Formulaire de configuration */}
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

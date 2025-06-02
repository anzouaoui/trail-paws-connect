
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BluetoothStatus } from "@/components/device/BluetoothStatus";
import { DeviceTypeSelector, deviceTypes } from "@/components/device/DeviceTypeSelector";
import { BluetoothScanner, BluetoothDevice, mockBluetoothDevices } from "@/components/device/BluetoothScanner";
import { DeviceConfigurationForm, FormData } from "@/components/device/DeviceConfigurationForm";

const AddDevicePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);
  const [bluetoothDevices, setBluetoothDevices] = useState<BluetoothDevice[]>([]);
  const [selectedBluetoothDevice, setSelectedBluetoothDevice] = useState<BluetoothDevice | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [formData, setFormData] = useState<FormData>({
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
            <BluetoothStatus 
              bluetoothEnabled={bluetoothEnabled}
              onBluetoothToggle={setBluetoothEnabled}
            />

            <DeviceTypeSelector
              selectedType={selectedType}
              onTypeSelect={handleDeviceTypeSelect}
              showAllOption={true}
              variant="grid"
            />

            <BluetoothScanner
              isScanning={isScanning}
              bluetoothDevices={bluetoothDevices}
              selectedBluetoothDevice={selectedBluetoothDevice}
              isConnecting={isConnecting}
              bluetoothEnabled={bluetoothEnabled}
              selectedType={selectedType}
              onStartScan={handleBluetoothScan}
              onStopScan={() => setIsScanning(false)}
              onConnect={handleBluetoothConnect}
            />

            {selectedBluetoothDevice && (
              <DeviceConfigurationForm
                formData={formData}
                onFormDataChange={setFormData}
                selectedBluetoothDevice={selectedBluetoothDevice}
                selectedType={selectedType}
                onSubmit={handleSubmit}
                onCancel={() => navigate('/devices')}
                isBluetoothMode={true}
              />
            )}
          </TabsContent>
          
          <TabsContent value="manual" className="space-y-4">
            <DeviceTypeSelector
              selectedType={selectedType}
              onTypeSelect={handleDeviceTypeSelect}
              variant="detailed"
            />

            {selectedType && (
              <DeviceConfigurationForm
                formData={formData}
                onFormDataChange={setFormData}
                selectedDevice={selectedDevice}
                selectedType={selectedType}
                onSubmit={handleSubmit}
                onCancel={() => navigate('/devices')}
                isBluetoothMode={false}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AddDevicePage;

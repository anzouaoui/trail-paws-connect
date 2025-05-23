
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Plus, 
  Syringe, 
  FileText, 
  Pill, 
  Heart,
  Calendar,
  Upload,
  Filter,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DogAvatar from "@/components/DogAvatar";

// Mock health records data
const healthRecords = {
  vaccinations: [
    {
      id: "1",
      dogId: "1",
      dogName: "Max",
      vaccineName: "Rabies",
      administrationDate: "2023-03-15",
      nextDue: "2024-03-15",
      veterinarian: "Dr. Smith",
      clinic: "Happy Paws Clinic",
      status: "current"
    },
    {
      id: "2",
      dogId: "1",
      dogName: "Max",
      vaccineName: "DHPP",
      administrationDate: "2023-04-10",
      nextDue: "2024-04-10",
      veterinarian: "Dr. Johnson",
      clinic: "City Animal Hospital",
      status: "due-soon"
    }
  ],
  vetReports: [
    {
      id: "1",
      dogId: "1",
      dogName: "Max",
      visitDate: "2023-05-20",
      visitType: "Annual Checkup",
      veterinarian: "Dr. Smith",
      clinic: "Happy Paws Clinic",
      diagnosis: "Healthy",
      treatment: "Routine examination, all vitals normal",
      recommendations: "Continue current diet and exercise routine",
      fileUrl: "/reports/max-checkup-2023.pdf"
    }
  ],
  medications: [
    {
      id: "1",
      dogId: "1",
      dogName: "Max",
      medicationName: "Heartgard Plus",
      dosage: "25mg",
      frequency: "Monthly",
      startDate: "2023-01-01",
      endDate: "2023-12-31",
      prescribedBy: "Dr. Smith",
      purpose: "Heartworm prevention",
      status: "active"
    }
  ],
  surgeries: [
    {
      id: "1",
      dogId: "1",
      dogName: "Max",
      surgeryDate: "2022-08-15",
      procedure: "Neutering",
      surgeon: "Dr. Johnson",
      clinic: "City Animal Hospital",
      notes: "Routine procedure, recovery excellent",
      complications: "None",
      recoveryPeriod: "2 weeks"
    }
  ]
};

const DogHealthRecordsPage = () => {
  const navigate = useNavigate();
  const [selectedDog, setSelectedDog] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("vaccinations");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current": return "bg-green-100 text-green-800";
      case "due-soon": return "bg-amber-100 text-amber-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "active": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
          <h1 className="text-xl font-bold">Health Records</h1>
          <div className="flex-1"></div>
          <Button size="icon" className="bg-forest text-white">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* Filters */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search health records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedDog} onValueChange={setSelectedDog}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Filter by dog" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dogs</SelectItem>
              <SelectItem value="1">Max</SelectItem>
              <SelectItem value="2">Bella</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="p-2 bg-green-100 rounded-full mr-3">
                <Syringe className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vaccinations</p>
                <p className="text-lg font-semibold">12</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="p-2 bg-amber-100 rounded-full mr-3">
                <Calendar className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Soon</p>
                <p className="text-lg font-semibold">2</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Records Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="vaccinations">
              <Syringe className="h-4 w-4 mr-1" />
              Vaccines
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileText className="h-4 w-4 mr-1" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="medications">
              <Pill className="h-4 w-4 mr-1" />
              Meds
            </TabsTrigger>
            <TabsTrigger value="surgeries">
              <Heart className="h-4 w-4 mr-1" />
              Surgery
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vaccinations" className="space-y-3">
            {healthRecords.vaccinations.map((vaccination) => (
              <Card key={vaccination.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-full mr-3">
                        <Syringe className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{vaccination.vaccineName}</h3>
                          <Badge variant="outline">{vaccination.dogName}</Badge>
                          <Badge className={getStatusColor(vaccination.status)}>
                            {vaccination.status.replace("-", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Given: {vaccination.administrationDate} • Next due: {vaccination.nextDue}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {vaccination.veterinarian} at {vaccination.clinic}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reports" className="space-y-3">
            {healthRecords.vetReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="p-2 bg-green-100 rounded-full mr-3">
                        <FileText className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{report.visitType}</h3>
                          <Badge variant="outline">{report.dogName}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {report.visitDate} • {report.veterinarian} at {report.clinic}
                        </p>
                        <p className="text-sm mb-1"><strong>Diagnosis:</strong> {report.diagnosis}</p>
                        <p className="text-sm mb-1"><strong>Treatment:</strong> {report.treatment}</p>
                        <p className="text-sm"><strong>Recommendations:</strong> {report.recommendations}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="medications" className="space-y-3">
            {healthRecords.medications.map((medication) => (
              <Card key={medication.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-100 rounded-full mr-3">
                        <Pill className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{medication.medicationName}</h3>
                          <Badge variant="outline">{medication.dogName}</Badge>
                          <Badge className={getStatusColor(medication.status)}>
                            {medication.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {medication.dosage} • {medication.frequency}
                        </p>
                        <p className="text-sm mb-1">
                          <strong>Period:</strong> {medication.startDate} to {medication.endDate}
                        </p>
                        <p className="text-sm mb-1">
                          <strong>Purpose:</strong> {medication.purpose}
                        </p>
                        <p className="text-sm">
                          <strong>Prescribed by:</strong> {medication.prescribedBy}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="surgeries" className="space-y-3">
            {healthRecords.surgeries.map((surgery) => (
              <Card key={surgery.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="p-2 bg-red-100 rounded-full mr-3">
                        <Heart className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{surgery.procedure}</h3>
                          <Badge variant="outline">{surgery.dogName}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {surgery.surgeryDate} • {surgery.surgeon} at {surgery.clinic}
                        </p>
                        <p className="text-sm mb-1">
                          <strong>Recovery:</strong> {surgery.recoveryPeriod}
                        </p>
                        <p className="text-sm mb-1">
                          <strong>Complications:</strong> {surgery.complications}
                        </p>
                        <p className="text-sm">
                          <strong>Notes:</strong> {surgery.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DogHealthRecordsPage;

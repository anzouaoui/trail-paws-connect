
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { X, MapPin } from "lucide-react";

interface Trail {
  id: string;
  name: string;
  distance: string;
  difficulty: string;
  terrain: string;
  type: string;
  elevation: string;
  coordinates?: [number, number];
}

interface TrailMapProps {
  trails: Trail[];
  onClose: () => void;
  onTrailClick: (trailId: string) => void;
}

const TrailMap: React.FC<TrailMapProps> = ({ trails, onClose, onTrailClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);

  // Mock coordinates for trails (in a real app, these would come from your data)
  const trailsWithCoordinates = trails.map((trail, index) => ({
    ...trail,
    coordinates: [
      -73.935242 + (index * 0.1), // Longitude (varied for demo)
      40.730610 + (index * 0.05)   // Latitude (varied for demo)
    ] as [number, number]
  }));

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [-73.935242, 40.730610], // Default center (NYC area)
      zoom: 10
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers for each trail
    trailsWithCoordinates.forEach((trail) => {
      const marker = new mapboxgl.Marker({
        color: '#22c55e' // Green color for trail markers
      })
        .setLngLat(trail.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-semibold">${trail.name}</h3>
                <p class="text-sm text-gray-600">${trail.distance} • ${trail.difficulty}</p>
                <button 
                  onclick="window.selectTrail('${trail.id}')" 
                  class="mt-2 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  Voir les détails
                </button>
              </div>
            `)
        )
        .addTo(map.current!);
    });

    // Global function to handle trail selection from popup
    (window as any).selectTrail = (trailId: string) => {
      const trail = trailsWithCoordinates.find(t => t.id === trailId);
      setSelectedTrail(trail || null);
    };

    // Cleanup
    return () => {
      map.current?.remove();
      delete (window as any).selectTrail;
    };
  }, [mapboxToken, trailsWithCoordinates]);

  const handleTrailSelect = (trail: Trail) => {
    if (map.current && trail.coordinates) {
      map.current.flyTo({
        center: trail.coordinates,
        zoom: 15,
        essential: true
      });
      setSelectedTrail(trail);
    }
  };

  if (!mapboxToken) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-96 max-w-[90vw]">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Configuration de la carte</h3>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Entrez votre token Mapbox public pour afficher la carte. Vous pouvez l'obtenir sur{' '}
              <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-forest underline">
                mapbox.com
              </a>
            </p>
            <Input
              type="text"
              placeholder="Votre token Mapbox public"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="mb-4"
            />
            <Button 
              onClick={() => {
                if (mapboxToken.trim()) {
                  // Token will be used in the useEffect
                }
              }}
              className="w-full bg-forest text-white"
              disabled={!mapboxToken.trim()}
            >
              Afficher la carte
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-50">
      {/* Header */}
      <div className="bg-forest text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Carte des parcours</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar with trail list */}
        <div className="w-80 bg-gray-50 overflow-y-auto">
          <div className="p-4">
            <h3 className="font-semibold mb-4">Parcours populaires</h3>
            <div className="space-y-2">
              {trailsWithCoordinates.map((trail) => (
                <Card 
                  key={trail.id}
                  className={`cursor-pointer transition-colors ${
                    selectedTrail?.id === trail.id ? 'ring-2 ring-forest' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => handleTrailSelect(trail)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{trail.name}</h4>
                        <p className="text-sm text-muted-foreground">{trail.distance}</p>
                        <p className="text-xs text-muted-foreground">{trail.difficulty} • {trail.terrain}</p>
                      </div>
                      <MapPin className="h-4 w-4 text-forest flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Map container */}
        <div className="flex-1 relative">
          <div ref={mapContainer} className="absolute inset-0" />
          
          {/* Selected trail info */}
          {selectedTrail && (
            <Card className="absolute top-4 left-4 w-64 z-10">
              <CardContent className="p-4">
                <h4 className="font-semibold">{selectedTrail.name}</h4>
                <p className="text-sm text-muted-foreground">{selectedTrail.distance} • {selectedTrail.difficulty}</p>
                <p className="text-xs text-muted-foreground mb-3">{selectedTrail.terrain}</p>
                <Button 
                  size="sm" 
                  className="w-full bg-forest text-white"
                  onClick={() => onTrailClick(selectedTrail.id)}
                >
                  Voir les détails
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrailMap;

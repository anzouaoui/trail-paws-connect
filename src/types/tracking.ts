
import React from "react";

export interface Dog {
  id: string;
  name: string;
  breed: string;
  energy: number;
  status: string;
  avatar: undefined;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: undefined;
  online: boolean;
  lastActivity: string;
}

export interface Widget {
  id: string;
  type: 'stats' | 'timer' | 'map' | 'partners' | 'goals';
  title: string;
  position: number;
  visible: boolean;
  icon: React.ReactNode;
}

export interface TrackingData {
  elapsedTime: string;
  elapsedSeconds: number;
  distance: string;
  speed: string;
  heartRate: string;
  calories: string;
}

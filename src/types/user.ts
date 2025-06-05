export interface User {
  id: string;
  photoURL: string;
  firstName: string;
  lastName: string;
  location: string;
  mainActivity: 'canicross' | 'canirandonee' | 'canivtt';
  bio: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  weight: number;
  restingHeartRate: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

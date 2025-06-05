export interface Dog {
  id: string;
  userId: string;
  photoURL: string;
  name: string;
  breed: string;
  otherBreed?: string;
  sex: 'male' | 'female';
  birthDate: string;
  weight: number;
  height: number;
  restingHeartRate: number;
  achievements?: string;
  healthInfo?: string;
  microchip?: string;
  createdAt: Date;
  updatedAt: Date;
}

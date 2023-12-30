export interface IPet {
  id: string;
  name: string;
  age: number;
  bio?: string | null;
  profilePictureURL: string;
  isCastrated: boolean;
  isVaccinated: boolean;
  requireMedicalAttention: boolean;
  size: 'Small' | 'Medium' | 'Big';
  energyLevel: 'VeryLow' | 'Low' | 'Medium' | 'High' | 'VeryHigh';
  createdAt: Date;
}

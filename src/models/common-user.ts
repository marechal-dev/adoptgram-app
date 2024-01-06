export interface ICommonUser {
  id: string;
  name: string;
  email: string;
  profilePictureURL?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

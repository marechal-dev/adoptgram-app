import { IPet } from './pet';
import { IPost } from './post';

export interface IOrganizationProfile {
  id: string;
  title: string;
  bio?: string | null;
  cnpj: string;
  followersCount: number;
  representativeName: string;
  whatsapp: string;
  telephone?: string | null;
  pixKey?: string | null;
  profilePictureUrl?: string | null;
  posts: IPost[];
  availablePets: IPet[];
}

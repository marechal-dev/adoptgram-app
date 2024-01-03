export interface IOrganization {
  id: string;
  username: string;
  title: string;
  bio?: string | null;
  cnpj: string;
  representativeName: string;
  whatsapp: string;
  telephone?: string | null;
  pixKey?: string | null;
  profilePictureURL?: string | null;
  address: string;
  cep: string;
  city: 'RG' | 'PEL';
  state: 'RS';
}

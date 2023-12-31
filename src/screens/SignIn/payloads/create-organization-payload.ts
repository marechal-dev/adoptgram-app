export type CreateOrganizationPayload = {
  username: string;
  email: string;
  password: string;
  title: string;
  representativeName: string;
  cnpj: string;
  whatsapp: string;
  residentialPhone?: string;
  address: string;
  cep: string;
  city: 'RG' | 'PEL';
  state: 'RS';
  pixKey?: string;
};

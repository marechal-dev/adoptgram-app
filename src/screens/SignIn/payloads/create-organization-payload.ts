export type CreateOrganizationPayload = {
  username: string
  email: string
  password: string
  title: string
  representativeName: string
  whatsapp: string
  residentialPhone?: string
  address: {
    firstLine: string
    secondLine?: string
    number: string
    cep: string
    neighborhood: string
    city: string
    state: string
  }
  pixKey?: string
}

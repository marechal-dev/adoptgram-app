import axios, { AxiosInstance } from 'axios';

import { env } from '@Constants/env';
import { CreateOrganizationPayload } from '@Screens/SignIn/payloads/create-organization-payload';
import { RegisterOrganizationFormData } from '@Screens/SignIn/schemas/register-organization-schema';

export class OrganizationService {
  private readonly axios: AxiosInstance;

  public readonly CREATE_ENDPOINT = '/organizations';

  public readonly FIND_BY_ID_ENDPOINT = '/organizations/:id';

  public constructor() {
    this.axios = axios.create({
      baseURL: env.EXPO_PUBLIC_SOCIAL_API_URL,
    });
  }

  public createOrganization(data: RegisterOrganizationFormData) {
    const payload = this.mapRegisterOrganizationDataToHttpPayload(data);

    return this.axios.post(this.CREATE_ENDPOINT, payload);
  }

  private mapRegisterOrganizationDataToHttpPayload(
    data: RegisterOrganizationFormData,
  ): CreateOrganizationPayload {
    return {
      username: data.username,
      email: data.email,
      password: data.password,
      title: data.title,
      representativeName: data.representativeName,
      address: {
        cep: data.cep,
        firstLine: data.firstLine,
        secondLine: data.secondLine,
        city: data.city,
        neighborhood: data.neighborhood,
        number: data.number,
        state: data.state,
      },
      whatsapp: data.whatsapp,
      pixKey: data.pixKey,
      residentialPhone: data.residentialPhone,
    };
  }

  public fetchOneById(id: string) {
    return this.axios.get(this.FIND_BY_ID_ENDPOINT.replace(':id', id));
  }
}

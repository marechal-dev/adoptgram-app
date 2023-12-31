import { axiosSocialApiClient } from '@Lib/axios';
import { IOrganizationProfile } from '@Models/organization-profile';
import { CreateOrganizationPayload } from '@Screens/SignIn/payloads/create-organization-payload';
import { RegisterOrganizationFormData } from '@Screens/SignIn/schemas/register-organization-schema';

export class OrganizationService {
  public static RESOURCE_ENDPOINT = '/organizations';
  public static FIND_BY_ID_ENDPOINT = '/organizations/:id';
  public static FIND_PROFILE_BY_USERNAME = '/organizations/:username/profile';

  public static createOrganization(data: RegisterOrganizationFormData) {
    const payload = this.mapDataToHttpPayload(data);

    return axiosSocialApiClient.post(this.RESOURCE_ENDPOINT, payload);
  }

  private static mapDataToHttpPayload(
    data: RegisterOrganizationFormData,
  ): CreateOrganizationPayload {
    return {
      username: data.username,
      email: data.email,
      password: data.password,
      title: data.title,
      representativeName: data.representativeName,
      address: data.address,
      cep: data.cep,
      city: data.city,
      state: data.state,
      whatsapp: data.whatsapp,
      cnpj: data.cnpj,
      pixKey: data.pixKey,
      residentialPhone: data.residentialPhone,
    };
  }

  public static fetchOneById(id: string) {
    return axiosSocialApiClient.get(
      this.FIND_BY_ID_ENDPOINT.replace(':id', id),
    );
  }

  public static fetchProfileByUsername(username: string) {
    return axiosSocialApiClient.get<IOrganizationProfile>(
      this.FIND_PROFILE_BY_USERNAME.replace(':username', username),
    );
  }

  public static searchMany(searchTerm: string) {
    return axiosSocialApiClient.get(
      `${this.RESOURCE_ENDPOINT}?query=${searchTerm}`,
    );
  }
}

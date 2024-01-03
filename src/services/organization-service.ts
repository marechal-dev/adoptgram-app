import { axiosSocialApiClient } from '@Lib/axios';
import { IOrganization } from '@Models/organization';
import { IOrganizationProfile } from '@Models/organization-profile';
import { CreateOrganizationPayload } from '@Screens/SignIn/payloads/create-organization-payload';
import { RegisterOrganizationFormData } from '@Screens/SignIn/schemas/register-organization-schema';

interface ISearchManyOrganizationsResponse {
  queryResult: IOrganization[];
}

interface IFetchDetailsResponse {
  details: IOrganizationProfile;
}

export class OrganizationService {
  public static RESOURCE_ENDPOINT = '/organizations';
  public static TEXT_SEARCH_ENDPOINT = '/organizations/text-search';
  public static FIND_BY_ID_ENDPOINT = '/organizations/:id';
  public static FIND_DETAILS_BY_USERNAME = '/organizations/:username/details';

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
    return axiosSocialApiClient.get<IFetchDetailsResponse>(
      this.FIND_DETAILS_BY_USERNAME.replace(':username', username),
    );
  }

  public static searchMany(searchTerm: string) {
    return axiosSocialApiClient.get<ISearchManyOrganizationsResponse>(
      `${this.TEXT_SEARCH_ENDPOINT}?query=${searchTerm}`,
    );
  }
}

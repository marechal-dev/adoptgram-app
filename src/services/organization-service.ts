import { axiosSocialApiClient } from '@Lib/axios';
import { CreateOrganizationPayload } from '@Screens/SignIn/payloads/create-organization-payload';
import { RegisterOrganizationFormData } from '@Screens/SignIn/schemas/register-organization-schema';

export class OrganizationService {
  public static CREATE_ENDPOINT = '/organizations';

  public static FIND_BY_ID_ENDPOINT = '/organizations/:id';

  public static createOrganization(data: RegisterOrganizationFormData) {
    const payload = this.mapDataToHttpPayload(data);

    return axiosSocialApiClient.post(this.CREATE_ENDPOINT, payload);
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

  public static fetchOneById(id: string) {
    return axiosSocialApiClient.get(
      this.FIND_BY_ID_ENDPOINT.replace(':id', id),
    );
  }
}

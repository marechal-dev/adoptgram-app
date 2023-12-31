import { axiosSocialApiClient } from '@Lib/axios';
import { IPet } from '@Models/pet';
import { CreatePetFormData } from '@Screens/CreatePet/forms/CreatePetForm';

export class PetService {
  public static readonly PETS_RESOURCE_ENDPOINT = '/pets';
  public static readonly SPECIFIC_PET_ENDPOINT = '/pets/:id';

  public static create(payload: CreatePetFormData) {
    return axiosSocialApiClient.post<IPet>(
      this.PETS_RESOURCE_ENDPOINT,
      payload,
    );
  }

  public static delete(petID: string) {
    const parsedEndpoint = this.SPECIFIC_PET_ENDPOINT.replace(':id', petID);

    return axiosSocialApiClient.delete(parsedEndpoint);
  }

  public static edit(petID: string, payload: Partial<IPet>) {
    const parsedEndpoint = this.SPECIFIC_PET_ENDPOINT.replace(':id', petID);

    return axiosSocialApiClient.put(parsedEndpoint, payload);
  }
}

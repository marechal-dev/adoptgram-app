import { axiosFilesApiClient } from '@Lib/axios';

export class UploadService {
  public static UPLOAD_FILES_ENDPOINT = '/medias/upload';

  public static uploadFiles() {
    return axiosFilesApiClient.post(this.UPLOAD_FILES_ENDPOINT);
  }
}

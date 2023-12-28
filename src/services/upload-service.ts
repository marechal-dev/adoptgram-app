import { axiosFilesApiClient } from '@Lib/axios';

export class UploadService {
  public static BULK_UPLOAD_ENDPOINT = '/medias/bulk-upload';

  public static SINGLE_FILE_UPLOAD_ENDPOINT = '/medias/upload';

  public static uploadSingleFile(formData: FormData) {
    return axiosFilesApiClient.postForm(
      this.SINGLE_FILE_UPLOAD_ENDPOINT,
      formData,
    );
  }

  public static bulkUploadFiles(formData: FormData) {
    return axiosFilesApiClient.postForm(this.BULK_UPLOAD_ENDPOINT, formData);
  }
}

import { axiosFilesApiClient } from '@Lib/axios';

interface IUploadSingleFileResponse {
  url: string;
}

interface IUploadBulkUploadFilesResponse {
  urls: string[];
}

export class UploadService {
  public static SINGLE_FILE_UPLOAD_ENDPOINT = '/media/upload';
  public static BULK_UPLOAD_ENDPOINT = '/media/bulk-upload';

  public static uploadSingleFile(formData: FormData) {
    return axiosFilesApiClient.postForm<IUploadSingleFileResponse>(
      this.SINGLE_FILE_UPLOAD_ENDPOINT,
      formData,
    );
  }

  public static bulkUploadFiles(formData: FormData) {
    return axiosFilesApiClient.postForm<IUploadBulkUploadFilesResponse>(
      this.BULK_UPLOAD_ENDPOINT,
      formData,
    );
  }
}

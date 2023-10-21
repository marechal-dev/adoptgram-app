import axios from 'axios';

import { env } from '@Constants/env';

export const axiosSocialApiClient = axios.create({
  baseURL: env.EXPO_PUBLIC_SOCIAL_API_URL,
});

export const axiosFilesApiClient = axios.create({
  baseURL: env.EXPO_PUBLIC_FILES_API_URL,
});

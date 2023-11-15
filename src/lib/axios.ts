import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { env } from '@Constants/env';

export const axiosSocialApiClient = axios.create({
  baseURL: env.EXPO_PUBLIC_SOCIAL_API_URL,
});

axiosSocialApiClient.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem('adoptgram:authToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export const axiosFilesApiClient = axios.create({
  baseURL: env.EXPO_PUBLIC_FILES_API_URL,
});

axiosFilesApiClient.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem('adoptgram:authToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

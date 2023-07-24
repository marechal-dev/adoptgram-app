import axios from "axios"

import { socialApiBaseUrl } from "../constants"

export const axiosSocialApiClient = axios.create({
  baseURL: socialApiBaseUrl,
})

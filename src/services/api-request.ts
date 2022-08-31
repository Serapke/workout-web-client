import { getToken, isAuthenticated } from "./auth";
import { ApiResponse } from "./types";
import runtimeEnv from '@mars/heroku-js-runtime-env';

export const apiRequest: (url: string, options?: RequestInit) => Promise<any> = (url, options) => {

  const headers = {
    'Content-Type': 'application/json',
    Authorization: undefined
  };

  const env = runtimeEnv();

  if (isAuthenticated()) {
    headers.Authorization = 'Bearer ' + getToken();
  }

  const mode: RequestMode = "cors";
  const credentials: RequestCredentials = "include";

  const defaultOptions = { headers, mode, credentials };
  const updatedOptions = { ...defaultOptions, ...options };

  return fetch(`${env.REACT_APP_API_URL}/${url}`, updatedOptions)
    .then(response => {
      return response.json().then((json: ApiResponse<any>) => {
        if (response.status === 401) {
          window.location.href = '/login';
        } else if (!response.ok) {
          throw new Error(json.errors[0].message);
        }
        return json;
      })
    })
}
import { ACCESS_TOKEN } from "../constants";
import { User } from "./types";
import { apiRequest } from "./api-request";

export interface SuccessfulLoginResponse {
  accessToken: string
}

export interface Error {
  code: string,
  message: string
}

export interface FailureLoginResponse {
  url: string
  errors: Error[]
}

type LoginResponse = SuccessfulLoginResponse & FailureLoginResponse

export const login: (email: string, password: string) => Promise<void> = async (email, password) => {
  const request = { email, password };
  return fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request)
  }).then(response => {
    return response.json().then(json => {
      const { accessToken, errors }: LoginResponse = json;

      if (response.status !== 200) {
        throw new Error(errors[0].message);
      }

      localStorage.setItem(ACCESS_TOKEN, accessToken);
    })
  });
}

export const logout = () => {
  localStorage.removeItem('email')
  localStorage.removeItem('firstName')
  localStorage.removeItem('lastName')
}

export const getCurrentUser: () => Promise<User> = async () => {
  return apiRequest(`user/me`)
    .then((user: User) => {
      localStorage.setItem('email', user.email);
      localStorage.setItem('firstName', user.firstName);
      localStorage.setItem('lastName', user.lastName);
      return user;
    });
}

export const getUser = () => {
  if (!localStorage.getItem('email')) {
    return null;
  }

  return {
    email: localStorage.getItem('email'),
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName')
  }
}

export const isAuthenticated = () => {
  return localStorage.getItem(ACCESS_TOKEN) != null;
}

export const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
}
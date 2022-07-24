import { ApiResponse } from "./types";
import { Workout } from "../store/types";
import { apiRequest } from "./api-request";

export const getWorkouts: () => Promise<Workout[]> = async () => {
  return apiRequest(`workout`);
};

export const getWorkout: (id: string) => Promise<Workout> = async (id) => {
  return apiRequest(`workout/${id}`);
};

export const createWorkout: (workout: Workout) => Promise<ApiResponse> = async (workout) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/workout/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workout),
  });
  return response.json();
};

export const updateWorkout: (workout: Workout) => Promise<ApiResponse> = async (workout) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/workout/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workout),
  });
  return response.json();
};

export const deleteWorkout: (id: string) => Promise<any> = async (id) => {
  fetch(`${process.env.REACT_APP_API_URL}/workout/${id}`, {
    method: 'DELETE'
  });
}
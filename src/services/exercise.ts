import { ApiResponse } from "./types";
import { Exercise, BodyPart } from "../store/types";
import { apiRequest } from "./api-request";

export const getExercises: () => Promise<Exercise[]> = async () => {
  return apiRequest(`exercise`);
};

export const getExercise: (id: string) => Promise<Exercise> = async (id) => {
  return apiRequest(`exercise/${id}`);
}

export const getBodyParts: () => Promise<BodyPart[]> = async () => {
  return apiRequest(`exercise/body-parts`);
};

export const createExercise: (exercise: Exercise) => Promise<ApiResponse> = async (exercise) => {
  return apiRequest(`exercise/create`, {
    method: "POST",
    body: JSON.stringify(exercise),
  });
};

export const updateExercise: (exercise: Exercise) => Promise<ApiResponse> = async (exercise) => {
  return apiRequest(`exercise/update`, {
    method: "PUT",
    body: JSON.stringify(exercise),
  });
}

export const deleteExercise: (id: string) => Promise<any> = async (id) => {
  return apiRequest(`exercise/${id}`, {
    method: 'DELETE'
  });
}

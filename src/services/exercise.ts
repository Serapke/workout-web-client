import { ApiResponse } from "./types";
import { BodyPart, Exercise } from "../store/types";
import { apiRequest } from "./api-request";

export function getExercises(): Promise<Exercise[]> {
  return apiRequest(`exercise`).then((response: ApiResponse<ExercisesResponse>) => response.data.exercises);
}

export function getExercise(id: string): Promise<Exercise> {
  return apiRequest(`exercise/${id}`).then((response: ApiResponse<Exercise>) => response.data);
}

export const getBodyParts: () => Promise<BodyPart[]> = async () => {
  return apiRequest(`exercise/body-parts`);
};

export const createExercise: (exercise: Exercise) => Promise<ApiResponse<any>> = async (exercise) => {
  return apiRequest(`exercise/create`, {
    method: "POST",
    body: JSON.stringify(exercise),
  });
};

export const updateExercise: (exercise: Exercise) => Promise<ApiResponse<any>> = async (exercise) => {
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

interface ExercisesResponse {
  exercises: Exercise[]
}

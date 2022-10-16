import { ApiResponse } from "./types";
import { BodyPart, Difficulty, Equipment, Exercise, ExerciseDescription, MeasurementType, Type } from "../store/types";
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
  const request: ExerciseCreateRequest = {
    title: exercise.title,
    description: exercise.description,
    defaultQuantity: exercise.defaultQuantity,
    bothSided: exercise.bothSided,
    type: exercise.type,
    measurementType: exercise.measurementType,
    difficulty: exercise.difficulty,
    bodyParts: exercise.bodyParts,
    equipment: exercise.equipment,
  };

  return apiRequest(`exercise`, {
    method: "POST",
    body: JSON.stringify(request),
  });
};

export const updateExercise: (exercise: Exercise) => Promise<ApiResponse<any>> = async (exercise) => {
  const request: ExerciseUpdateRequest = {
    title: exercise.title,
    description: exercise.description,
    defaultQuantity: exercise.defaultQuantity,
    bothSided: exercise.bothSided,
    type: exercise.type,
    measurementType: exercise.measurementType,
    difficulty: exercise.difficulty,
    bodyParts: exercise.bodyParts,
    equipment: exercise.equipment,
  };

  return apiRequest(`exercise/${exercise.id}`, {
    method: "PUT",
    body: JSON.stringify(request),
  });
}

export const deleteExercise: (id: string) => Promise<any> = async (id) => {
  return apiRequest(`exercise/${id}`, {
    method: 'DELETE'
  });
}

interface ExerciseCreateRequest {
  title: string,
  description: ExerciseDescription;
  defaultQuantity: number;
  bothSided: boolean;
  type: Type;
  measurementType: MeasurementType;
  difficulty: Difficulty;
  bodyParts: BodyPart[];
  equipment: Equipment[];
}

interface ExerciseUpdateRequest {
  title: string,
  description: ExerciseDescription;
  defaultQuantity: number;
  bothSided: boolean;
  type: Type;
  measurementType: MeasurementType;
  difficulty: Difficulty;
  bodyParts: BodyPart[];
  equipment: Equipment[];
}

interface ExercisesResponse {
  exercises: Exercise[]
}

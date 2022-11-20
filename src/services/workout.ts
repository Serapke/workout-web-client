import { ApiResponse } from "./types";
import { Workout } from "../store/types";
import { apiRequest } from "./api-request";

export function fetchWorkoutsData(): Promise<ApiResponse<MyWorkoutsResponse>> {
  return apiRequest(`workout`);
}

export const getWorkout: (id: string) => Promise<Workout> = async (id) => {
  return apiRequest(`workout/${id}`).then((response: ApiResponse<Workout>) => response.data);
};

export function fetchWorkoutData(id: string): Promise<ApiResponse<Workout>> {
  return apiRequest(`workout/${id}`);
}

export const createWorkout: (workout: Workout) => Promise<ApiResponse<WorkoutCreateResponse>> = async (workout) => {
  const request: WorkoutCreateRequest = {
    title: workout.title,
    restPeriodInSeconds: workout.restPeriodInSeconds,
    cycles: workout.cycles,
    tasks: workout.tasks.map(task => ({
      id: task.id,
      exerciseId: task.exercise.id,
      sets: task.sets
    }))
  }
  return apiRequest(`workout`, {
    method: "POST",
    body: JSON.stringify(request)
  });
};

export const updateWorkout: (workout: Workout) => Promise<ApiResponse<Workout>> = async (workout) => {
  const request: WorkoutUpdateRequest = {
    title: workout.title,
    restPeriodInSeconds: workout.restPeriodInSeconds,
    cycles: workout.cycles,
    tasks: workout.tasks.map(task => ({
      id: task.id,
      exerciseId: task.exercise.id,
      sets: task.sets,
      weight: task.weight
    }))
  };

  return apiRequest(`workout/${workout.id}`, {
    method: "PUT",
    body: JSON.stringify(request)
  });
};

export const deleteWorkout: (id: string) => Promise<void> = async (id) => {
  return apiRequest(`workout/${id}`, { method: "DELETE" })
    .then((response: ApiResponse<void>) => response.data);
}

export interface MyWorkoutsResponse {
  workouts: Workout[]
}

interface WorkoutCreateResponse {
  id: number
}

interface WorkoutCreateRequest {
  title: string,
  restPeriodInSeconds: number,
  cycles: number,
  tasks: WorkoutUpdateTask[]
}

interface WorkoutUpdateRequest {
  title: string,
  restPeriodInSeconds: number,
  cycles: number,
  tasks: WorkoutUpdateTask[]
}

interface WorkoutUpdateTask {
  id: number,
  exerciseId: number,
  sets: number[]
}
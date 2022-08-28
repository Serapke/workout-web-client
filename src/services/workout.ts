import { ApiResponse } from "./types";
import { Workout } from "../store/types";
import { apiRequest } from "./api-request";

export const getWorkouts: () => Promise<Workout[]> = async () => {
  return apiRequest(`workout`).then((response: ApiResponse<MyWorkoutsResponse>) => response.data.workouts);
};

export const getWorkout: (id: string) => Promise<Workout> = async (id) => {
  return apiRequest(`workout/${id}`).then((response: ApiResponse<Workout>) => response.data);
};

export const createWorkout: (workout: Workout) => Promise<ApiResponse<WorkoutCreateResponse>> = async (workout) => {
  const request: WorkoutCreateRequest = {
    title: workout.title,
    restPeriodInSeconds: workout.restPeriodInSeconds,
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
    tasks: workout.tasks.map(task => ({
      id: task.id,
      exerciseId: task.exercise.id,
      sets: task.sets
    }))
  }

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

export interface WorkoutCreateResponse {
  id: number
}

interface WorkoutCreateRequest {
  title: string,
  restPeriodInSeconds: number,
  tasks: WorkoutUpdateTask[]
}

interface WorkoutUpdateRequest {
  title: string,
  restPeriodInSeconds: number,
  tasks: WorkoutUpdateTask[]
}

interface WorkoutUpdateTask {
  id: number,
  exerciseId: number,
  sets: number[]
}
import { ApiResponse, WorkoutStatus } from './types';
import { apiRequest } from "./api-request";

export const getActiveWorkoutStatus: (id: string) => Promise<WorkoutStatus> = async (id) => {
  return apiRequest(`live-workout/start?workoutId=${id}`, { method: "POST" })
    .then((response: ApiResponse<WorkoutStatus>) => response.data);
}

export const continueWorkout: (id: number, sets: number[]) => Promise<WorkoutStatus> = async (id, sets) => {
  const request: LiveWorkoutContinueRequest = {
    sets
  }
  return apiRequest(`live-workout/continue?id=${id}`, {
    method: "POST",
    body: JSON.stringify(request),
  }).then((response: ApiResponse<WorkoutStatus>) => response.data);
}

export const finishWorkout: (id: number, sets: number[]) => Promise<void> = async (id, sets) => {
  const request: LiveWorkoutContinueRequest = {
    sets
  }
  return apiRequest(`live-workout/finish?id=${id}`, {
    method: "POST",
    body: JSON.stringify(request),
  }).then((response: ApiResponse<void>) => response.data);
}

export const discardWorkout: (id: number) => Promise<void> = async (id) => {
  return apiRequest(`live-workout/discard?id=${id}`, {
    method: "POST",
  }).then((response: ApiResponse<void>) => response.data);
}

export const updateWorkoutDuration: (id: number, durationInSeconds: number) => Promise<void> = async (id, durationInSeconds) => {
  return apiRequest(`live-workout/update-duration?id=${id}&duration=${durationInSeconds}`, {
    method: "POST"
  }).then((response: ApiResponse<void>) => response.data);
}

interface LiveWorkoutContinueRequest {
  sets: number[]
}
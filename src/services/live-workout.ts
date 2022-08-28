import { ApiResponse, WorkoutStatus } from './types';
import { apiRequest } from "./api-request";

export const getActiveWorkoutStatus: (id: string) => Promise<WorkoutStatus> = async (workoutId) => {
  return apiRequest(`live-workout/start?workoutId=${workoutId}`, { method: "POST" })
    .then((response: ApiResponse<WorkoutStatus>) => response.data);
}

export const continueWorkout: (id: number, sets: number[]) => Promise<WorkoutStatus> = async (id, sets) => {
  const request: LiveWorkoutContinueRequest = {
    sets
  }
  return apiRequest(`live-workout/${id}/continue`, {
    method: "PUT",
    body: JSON.stringify(request),
  }).then((response: ApiResponse<WorkoutStatus>) => response.data);
}

export const finishWorkout: (id: number, sets: number[]) => Promise<void> = async (id, sets) => {
  const request: LiveWorkoutContinueRequest = {
    sets
  }
  return apiRequest(`live-workout/${id}/finish`, {
    method: "PUT",
    body: JSON.stringify(request),
  }).then((response: ApiResponse<void>) => response.data);
}

export const discardWorkout: (id: number) => Promise<void> = async (id) => {
  return apiRequest(`live-workout/${id}/discard`, {
    method: "PUT",
  }).then((response: ApiResponse<void>) => response.data);
}

export const updateWorkoutDuration: (id: number, durationInSeconds: number) => Promise<void> = async (id, durationInSeconds) => {
  const request: UpdateLiveWorkoutDurationRequest = {
    duration: durationInSeconds
  }
  return apiRequest(`live-workout/${id}/update-duration`, {
    method: "PUT",
    body: JSON.stringify(request)
  }).then((response: ApiResponse<void>) => response.data);
}

interface LiveWorkoutContinueRequest {
  sets: number[]
}

interface UpdateLiveWorkoutDurationRequest {
  duration: number
}
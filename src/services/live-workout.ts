import { ApiResponse, LiveWorkout } from './types';
import { apiRequest } from "./api-request";

export const getActiveWorkoutStatus: (id: string) => Promise<LiveWorkout> = async (workoutId) => {
  return apiRequest(`live-workout/start?workoutId=${workoutId}`, { method: "POST" })
    .then((response: ApiResponse<LiveWorkout>) => response.data);
}

export const continueWorkout: (id: number, sets: number[]) => Promise<LiveWorkout> = async (id, sets) => {
  const request: LiveWorkoutContinueRequest = {
    sets
  }
  return apiRequest(`live-workout/${id}/continue`, {
    method: "PUT",
    body: JSON.stringify(request),
  }).then((response: ApiResponse<LiveWorkout>) => response.data);
}

export function finishWorkout(id: number, sets: number[], durationInSeconds: number): Promise<void> {
  const request: LiveWorkoutFinishRequest = {
    sets,
    durationInSeconds
  }
  return apiRequest(`live-workout/${id}/finish`, {
    method: "PUT",
    body: JSON.stringify(request),
  }).then((response: ApiResponse<void>) => response.data);
}

export const discardWorkout: (id: number) => Promise<void> = async (id) => {
  return apiRequest(`live-workout/${id}`, {
    method: "DELETE",
  }).then((response: ApiResponse<void>) => response.data);
}

export const updateWorkoutDuration: (id: number, durationInSeconds: number) => Promise<void> = async (id, durationInSeconds) => {
  const request: UpdateLiveWorkoutDurationRequest = {
    durationInSeconds
  }
  return apiRequest(`live-workout/${id}/update-duration`, {
    method: "PUT",
    body: JSON.stringify(request)
  }).then((response: ApiResponse<void>) => response.data);
}

interface LiveWorkoutContinueRequest {
  sets: number[]
}

interface LiveWorkoutFinishRequest {
  sets: number[],
  durationInSeconds: number
}

interface UpdateLiveWorkoutDurationRequest {
  durationInSeconds: number
}
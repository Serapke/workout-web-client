import { WorkoutStatus } from './types';
import { apiRequest } from "./api-request";

export const getActiveWorkoutStatus: (id: string) => Promise<WorkoutStatus> = async (id) => {
  return apiRequest(`live-workout/start?workoutId=${id}`, { method: "POST" });
}

export const continueWorkout: (id: number, sets: number[]) => Promise<WorkoutStatus> = async (id, sets) => {
  return apiRequest(`live-workout/continue?id=${id}`, {
    method: "POST",
    body: JSON.stringify(sets),
  });
}

export const finishWorkout: (id: number, sets: number[]) => Promise<any> = async (id, sets) => {
  return apiRequest(`live-workout/finish?id=${id}`, {
    method: "POST",
    body: JSON.stringify(sets),
  });
}

export const discardWorkout: (id: number) => Promise<any> = async (id) => {
  return apiRequest(`live-workout/discard?id=${id}`, {
    method: "POST",
  });
}

export const updateWorkoutDuration: (id: number, durationInSeconds: number) => Promise<any> = async (id, durationInSeconds) => {
  return apiRequest(`live-workout/update-duration?id=${id}&duration=${durationInSeconds}`, {
    method: "POST"
  });
}
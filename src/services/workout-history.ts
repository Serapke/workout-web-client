import { WorkoutHistory, Emotion } from './types';
import { apiRequest } from "./api-request";

export const getWorkoutHistories: () => Promise<WorkoutHistory[]> = () => {
  return apiRequest(`workout-history`);
}

export const getWorkoutHistory: (id: string) => Promise<WorkoutHistory> = async (id) => {
  return apiRequest(`workout-history/${id}`);
};

export const updateWorkoutEmotion: (id: number, emotion: Emotion) => Promise<any> = async (id, emotion) => {
  return apiRequest(`workout-history/update-emotion?id=${id}&emotion=${emotion}`, {
    method: "POST"
  });
}
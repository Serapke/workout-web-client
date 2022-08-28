import { WorkoutHistory, Emotion, ApiResponse } from './types';
import { apiRequest } from "./api-request";

export const getWorkoutHistories: () => Promise<WorkoutHistory[]> = () => {
  return apiRequest(`workout-history`).then((response: ApiResponse<MyWorkoutHistoriesResponse>) => response.data.workoutHistories);
}

export const getWorkoutHistory: (id: string) => Promise<WorkoutHistory> = async (id) => {
  return apiRequest(`workout-history/${id}`).then((response: ApiResponse<WorkoutHistory>) => response.data);
};

export const updateWorkoutEmotion: (id: number, emotion: Emotion) => Promise<any> = async (id, emotion) => {
  const request: UpdateWorkoutHistoryEmotionRequest = {
    emotion
  }
  return apiRequest(`workout-history/${id}/update-emotion`, {
    method: "PUT",
    body: JSON.stringify(request)
  });
}

interface MyWorkoutHistoriesResponse {
  workoutHistories: WorkoutHistory[]
}

interface UpdateWorkoutHistoryEmotionRequest {
  emotion: Emotion
}
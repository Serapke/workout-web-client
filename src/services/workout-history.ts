import { WorkoutHistory, Emotion } from './types';

export const getWorkoutHistories: () => Promise<WorkoutHistory[]> = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/workout-history`).then(checkStatus);
  return response.json();
}

export const getWorkoutHistory: (id: string) => Promise<WorkoutHistory> = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/workout-history/${id}`).then(checkStatus);
  return response.json();
};

export const updateWorkoutEmotion: (id: number, emotion: Emotion) => Promise<any> = async (id, emotion) => {
  return fetch(`${process.env.REACT_APP_API_URL}/workout-history/update-emotion?id=${id}&emotion=${emotion}`, {
    method: "POST"
  });
}

const checkStatus = async (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const errorMessage = await response.json();
    throw new Error(errorMessage.errors[0].message)
  }
}
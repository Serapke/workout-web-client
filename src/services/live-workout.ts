import { WorkoutStatus } from './types';

export const getActiveWorkoutStatus: (id: string) => Promise<WorkoutStatus> = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/live-workout/start?workoutId=${id}`, {
    method: "POST",
  });
  return response.json();
}

export const continueWorkout: (id: number, sets: number[]) => Promise<WorkoutStatus> = async (id, sets) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/live-workout/continue?id=${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sets),
  });
  return response.json();
}

export const finishWorkout: (id: number, sets: number[]) => Promise<any> = async (id, sets) => {
  return fetch(`${process.env.REACT_APP_API_URL}/live-workout/finish?id=${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sets),
  });
}

export const discardWorkout: (id: number) => Promise<any> = async (id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/live-workout/discard?id=${id}`, {
    method: "POST",
  });
}

export const updateWorkoutDuration: (id: number, durationInSeconds: number) => Promise<any> = async (id, durationInSeconds) => {
  return fetch(`${process.env.REACT_APP_API_URL}/live-workout/update-duration?id=${id}&duration=${durationInSeconds}`, {
    method: "POST"
  });
}
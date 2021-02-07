import { ApiResponse, WorkoutStatus, Emotion } from "./types";
import { Workout } from "../store/types";

export const getAllWorkouts: () => Promise<Workout[]> = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/workout`);
  return response.json();
};

export const getWorkout: (id: string) => Promise<Workout> = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/workout/${id}`);
  return response.json();
};

export const getActiveWorkoutStatus: (id: string) => Promise<WorkoutStatus> = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/workout/startWorkout?workoutId=${id}`, {
    method: "POST",
  });
  return response.json();
}

export const continueWorkout: (workoutStatusId: number, sets: number[]) => Promise<WorkoutStatus> = async (workoutStatusId, sets) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/workout/continueWorkout?workoutStatusId=${workoutStatusId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sets),
  });
  return response.json();
}

export const finishWorkout: (workoutStatusId: number, sets: number[]) => Promise<WorkoutStatus> = async (workoutStatusId, sets) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/workout/finishWorkout?workoutStatusId=${workoutStatusId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sets),
  });
  return response.json();
}

export const updateWorkoutEmotion: (workoutStatusId: number, emotion: Emotion) => Promise<any> = async (workoutStatusId, emotion) => {
  return fetch(`${process.env.REACT_APP_API_URL}/workout/updateWorkoutEmotion?workoutStatusId=${workoutStatusId}&emotion=${emotion}`, {
    method: "POST"
  });
}

export const updateWorkoutDuration: (workoutStatusId: number, durationInSeconds: number) => Promise<any> = async (workoutStatusId, durationInSeconds) => {
  return fetch(`${process.env.REACT_APP_API_URL}/workout/updateDuration?workoutStatusId=${workoutStatusId}&durationInSeconds=${durationInSeconds}`, {
    method: "POST"
  });
}

export const createWorkout: (workout: Workout) => Promise<ApiResponse> = async (workout) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/workout/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workout),
  });
  return response.json();
};

export const updateWorkout: (workout: Workout) => Promise<ApiResponse> = async (workout) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/workout/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workout),
  });
  return response.json();
};

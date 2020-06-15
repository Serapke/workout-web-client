import { ApiResponse } from "./types";
import { Workout } from "../store/types";

export const getAllWorkouts: () => Promise<Workout[]> = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/workout`);
  return response.json();
};

export const getWorkout: (id: string) => Promise<Workout> = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/workout/${id}`);
  return response.json();
};

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

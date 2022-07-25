import { Exercise } from 'store/types';

export interface Error {
  code: string,
  message: string
}

export interface ApiResponse<T> {
  status: string;
  id: number;
  errors?: Error[];
  data?: T
}

export interface User {
  id: number;
  email: string
  firstName: string
  lastName: string
}

export interface WorkoutStatus {
  id: number;
  currentTask: TaskStatus;
  nextTask: TaskStatus;
  rest: number;
  duration: number;
}

export interface TaskStatus {
  id: number;
  exercise: Exercise;
  order: number;
  setsGoal: number[];
  setsDone: number[];
}

export interface WorkoutHistory {
  id: number;
  title: string;
  workoutId: number;
  duration: number;
  endTime: string;
  emotion: Emotion;
  tasks: TaskStatus[];
  rest: number;
}

export interface TaskHistory {
  id: number;
  exercise: Exercise;
  order: number;
  setsGoal: number[];
  setsDone: number[];
}

export enum Emotion {
  STRONG,
  WEAK,
  MOTIVATED
}
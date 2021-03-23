import { Exercise } from 'store/types';

export interface ApiResponse {
  status: string;
  errors?: any;
  id: number;
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
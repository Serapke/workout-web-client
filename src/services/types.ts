import { Exercise, Task } from 'store/types';

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

export interface LiveWorkout {
  id: number;
  workoutHistoryId: number;
  currentTask: Task;
  nextTask: Task;
  nextTaskOnNewCycle: boolean;
  rest: number;
  duration: number;
  currentCycle: number;
  cycles: number;
}

export interface WorkoutHistory {
  id: number;
  title: string;
  workoutId: number;
  duration: number;
  endTime: string;
  emotion: Emotion;
  tasks: TaskHistory[][];
  rest: number;
  editable: boolean;
}

export interface TaskHistory {
  id: number;
  exercise: Exercise;
  setsGoal: number[];
  setsDone: number[];
}

export enum Emotion {
  STRONG,
  WEAK,
  MOTIVATED
}
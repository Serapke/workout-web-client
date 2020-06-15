export interface Routine {
  id: number;
  title: string;
  workouts: Workout[];
}

export interface Workout {
  id: number;
  title: string;
  restPeriodInSeconds: number;
  tasks: Task[];
}

export interface Task {
  id: number;
  exercise: Exercise;
  sets: number[];
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  bodyParts: BodyPart[];
  defaultReps: number;
  type: "TIMED" | "QUANTITATIVE";
}

export type BodyPart = "SHOULDERS" | "ARMS" | "CHEST" | "ABS" | "BACK" | "BUTT" | "LEGS";

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
  id: number;
  title: string;
  description: {
    startingPosition: string;
    steps: string[];
  };
  type: Type;
  defaultQuantity: number;
  measurementType: MeasurementType;
  bodyParts: BodyPart[];
  equipment: Equipment[];
  difficulty: Difficulty;
  bothSided: boolean;
}

export enum MeasurementType {
  TIMED = "TIMED",
  QUANTITATIVE = "QUANTITATIVE"
}

export enum Type {
  AEROBIC = "AEROBIC",
  STRENGTH = "STRENGTH",
  STRETCHING = "STRETCHING",
  BALANCE = "BALANCE",
}

export enum BodyPart {
  ABS = "ABS",
  BACK = "BACK",
  BICEPS = "BICEPS",
  CHEST = "CHEST",
  FOREARM = "FOREARM",
  GLUTES = "GLUTES",
  SHOULDERS = "SHOULDERS",
  TRICEPS = "TRICEPS",
  UPPER_LEGS = "UPPER_LEGS",
  LOWER_LEGS = "LOWER_LEGS",
}

export enum Equipment {
  BODY_ONLY = "BODY ONLY",
  DUMBBELL = "DUMBBELL",
  PULL_BAR = "PULL BAR"
}

export enum Difficulty {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  EXPERT = "EXPERT"
}




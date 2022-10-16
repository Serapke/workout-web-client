export interface Routine {
  id: number;
  title: string;
  workouts: Workout[];
}

export interface Workout {
  id?: number;
  title: string;
  restPeriodInSeconds: number;
  cycles: number;
  tasks: Task[];
}

export interface Task {
  id?: number;
  draggableId: string;
  exercise: Exercise;
  sets: number[];
}

export interface Exercise {
  id: number;
  title: string;
  description: ExerciseDescription;
  defaultQuantity: number;
  bothSided: boolean;

  type: Type;
  measurementType: MeasurementType;
  difficulty: Difficulty;

  imageUrl: string;

  bodyParts: BodyPart[];
  equipment: Equipment[];
}

export interface ExerciseDescription {
  startingPosition: string;
  steps: string[];
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
  UPPER_TRAPEZIUS = "UPPER_TRAPEZIUS",
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




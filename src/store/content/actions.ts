import { ActionCreator } from "redux";
import {
  ContentActionType,
  RoutinesListUpdatedAction,
  WorkoutsListUpdatedAction,
  BodyPartListUpdatedAction,
  ExerciseListUpdatedAction,
} from "./types";
import { Routine, Workout, Exercise, BodyPart } from "../types";

export const updateRoutineList: ActionCreator<RoutinesListUpdatedAction> = (routines: Routine[]) => ({
  type: ContentActionType.ROUTINES_LIST_UPDATED,
  routines,
});

export const updateWorkoutList: ActionCreator<WorkoutsListUpdatedAction> = (workouts: Workout[]) => ({
  type: ContentActionType.WORKOUTS_LIST_UPDATED,
  workouts,
});

export const updateExerciseList: ActionCreator<ExerciseListUpdatedAction> = (exercises: Exercise[]) => ({
  type: ContentActionType.EXERCISE_LIST_UPDATED,
  exercises,
});

export const updateBodyPartList: ActionCreator<BodyPartListUpdatedAction> = (bodyParts: BodyPart[]) => ({
  type: ContentActionType.BODY_PART_LIST_UPDATED,
  bodyParts,
});

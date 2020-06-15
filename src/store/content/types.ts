import { Action } from "redux";
import { Routine, Workout, Exercise, BodyPart } from "../types";

export interface ContentState {
  routines: Routine[];
  workouts: Workout[];
  exercises: Exercise[];
  bodyParts: BodyPart[];
}

export enum ContentActionType {
  ROUTINES_LIST_UPDATED = "@@content/ROUTINES_LIST_UPDATED",
  WORKOUTS_LIST_UPDATED = "@@content/WORKOUTS_LIST_UPDATED",
  EXERCISE_LIST_UPDATED = "@@content/EXERCISE_LIST_UPDATED",
  BODY_PART_LIST_UPDATED = "@@content/BODY_PART_LIST_UPDATED",
}

export interface RoutinesListUpdatedAction extends Action {
  type: ContentActionType.ROUTINES_LIST_UPDATED;
  routines: Routine[];
}

export interface WorkoutsListUpdatedAction extends Action {
  type: ContentActionType.WORKOUTS_LIST_UPDATED;
  workouts: Workout[];
}

export interface ExerciseListUpdatedAction extends Action {
  type: ContentActionType.EXERCISE_LIST_UPDATED;
  exercises: Exercise[];
}

export interface BodyPartListUpdatedAction extends Action {
  type: ContentActionType.BODY_PART_LIST_UPDATED;
  bodyParts: BodyPart[];
}

export type ContentActions =
  | RoutinesListUpdatedAction
  | WorkoutsListUpdatedAction
  | BodyPartListUpdatedAction
  | ExerciseListUpdatedAction;

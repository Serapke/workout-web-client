import { ActionCreator } from "redux";
import { ActiveWorkoutUpdatedAction, ActiveItemActionType, ActiveWorkoutTaskUpdatedAction } from "./types";
import { Workout } from "../types";

export const updateActiveWorkout: ActionCreator<ActiveWorkoutUpdatedAction> = (workout: Workout) => ({
  type: ActiveItemActionType.WORKOUT_UPDATED,
  workout,
});

export const updateTask: ActionCreator<ActiveWorkoutTaskUpdatedAction> = (task) => ({
  type: ActiveItemActionType.TASK_UPDATED,
  task,
});

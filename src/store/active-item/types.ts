import { Action } from "redux";
import { Routine, Workout, Task } from "../types";

export interface ActiveItemState {
  routine: Routine;
  workout: Workout;
}

export enum ActiveItemActionType {
  WORKOUT_UPDATED = "@@active-item/WORKOUT_UPDATED",
  TASK_UPDATED = "@@active-item/TASK_UPDATED",
}

export interface ActiveWorkoutUpdatedAction extends Action {
  type: ActiveItemActionType.WORKOUT_UPDATED;
  workout: Workout;
}

export interface ActiveWorkoutTaskUpdatedAction extends Action {
  type: ActiveItemActionType.TASK_UPDATED;
  task: Task;
}

export type ActiveItemActions = ActiveWorkoutUpdatedAction | ActiveWorkoutTaskUpdatedAction;

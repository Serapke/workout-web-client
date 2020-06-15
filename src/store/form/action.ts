import { ActionCreator } from "redux";
import {
  FormStateActionType,
  Field,
  WorkoutFormUpdatedAction,
  WorkoutFormSetupAction,
  WorkoutFormState,
} from "./types";

export const setupWorkoutForm: ActionCreator<WorkoutFormSetupAction> = (form: WorkoutFormState) => ({
  type: FormStateActionType.WORKOUT_FORM_SETUP,
  form,
});

export const updateWorkoutForm: ActionCreator<WorkoutFormUpdatedAction> = (field: Field) => ({
  type: FormStateActionType.WORKOUT_FORM_UPDATED,
  field,
});

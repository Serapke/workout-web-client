import { Action } from "redux";

export interface FormState {
  workout: WorkoutFormState;
}

export interface WorkoutForm {
  title: FieldState;
  tasks: FieldState;
  restPeriodInSeconds: FieldState;
}

export interface WorkoutFormState {
  id?: number;
  form: WorkoutForm;
}

export interface FieldState {
  value: any;
  error?: string;
}

export interface Field {
  name: keyof WorkoutForm;
  state: FieldState;
}

export enum FormStateActionType {
  WORKOUT_FORM_UPDATED = "@@form-state/WORKOUT_FORM_UPDATED",
  WORKOUT_FORM_SETUP = "@@form-state/WORKOUT_FORM_SETUP",
}

export interface WorkoutFormSetupAction extends Action {
  type: FormStateActionType.WORKOUT_FORM_SETUP;
  form: WorkoutFormState;
}

export interface WorkoutFormUpdatedAction extends Action {
  type: FormStateActionType.WORKOUT_FORM_UPDATED;
  field: Field;
}

export type FormStateActions = WorkoutFormUpdatedAction | WorkoutFormSetupAction;

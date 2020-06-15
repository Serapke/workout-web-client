import { ThunkAction } from "redux-thunk";
import { Field, FormStateActions } from "./types";
import { ApplicationState } from "..";
import { updateWorkoutForm, setupWorkoutForm } from "./action";
import { emptyWorkoutFormState, workoutToForm } from "./utils";
import { getWorkout } from "../../services/workout";
import { Task } from "../types";
import { updateIdentifiableObjectInArray } from "../../utils/immutable";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ApplicationState, unknown, FormStateActions>;

export const fetchWorkoutRequest = (id: string): AppThunk => async (dispatch) => {
  const workout = await getWorkout(id);
  const form = workoutToForm(workout);
  dispatch(setupWorkoutForm(form));
};

export const clearWorkoutFormRequest = (): AppThunk => (dispatch) => {
  dispatch(setupWorkoutForm(emptyWorkoutFormState));
};

export const updateWorkoutFormRequest = (field: Field): AppThunk => (dispatch) => {
  dispatch(updateWorkoutForm(field));
};

export const addExercisesToWorkoutRequest = (exerciseIDs: string[]): AppThunk => async (dispatch, getState) => {
  const state = getState();
  const newTasks = exerciseIDs.map((exerciseID) => mapExerciseIDToTask(exerciseID, state));
  const oldTasks = state.form.workout.form.tasks.value;
  const tasks = [...oldTasks, ...newTasks].map(reindexTasks);
  dispatch(updateWorkoutForm({ name: "tasks", state: { value: tasks } }));
};

export const updateTasksRequest = (tasks: Task[]): AppThunk => (dispatch) => {
  dispatch(updateWorkoutForm({ name: "tasks", state: { value: tasks } }));
};

export const updateTaskRequest = (task: Task): AppThunk => async (dispatch, getState) => {
  const workout = getState().form.workout.form;
  const tasks = updateIdentifiableObjectInArray(workout.tasks.value, task);
  dispatch(updateWorkoutForm({ name: "tasks", state: { value: tasks } }));
};

const mapExerciseIDToTask = (exerciseID: string, state: ApplicationState): Task => {
  const exercise = state.content.exercises.find((exercise) => exercise.id === exerciseID);
  return { id: null, exercise: exercise, sets: [exercise.defaultReps] };
};

const reindexTasks = (task: Task, index: number) => {
  return { ...task, id: index };
};

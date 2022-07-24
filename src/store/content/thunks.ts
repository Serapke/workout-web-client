import { ThunkAction } from "redux-thunk";

import { ContentActions } from "./types";
import { ApplicationState } from "..";
import { getRoutines } from "../../services/routine";
import { updateRoutineList, updateWorkoutList, updateExerciseList, updateBodyPartList } from "./actions";
import { getWorkouts } from "../../services/workout";
import { getExercises, getBodyParts } from "../../services/exercise";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ApplicationState, unknown, ContentActions>;

export const fetchRoutinesRequest = (): AppThunk => async (dispatch) => {
  const routines = await getRoutines();
  dispatch(updateRoutineList(routines));
};

export const fetchWorkoutsRequest = (): AppThunk => async (dispatch) => {
  const workouts = await getWorkouts();
  dispatch(updateWorkoutList(workouts));
};

export const fetchExercisesRequest = (): AppThunk => async (dispatch) => {
  const exercises = await getExercises();
  dispatch(updateExerciseList(exercises));
};

export const fetchBodyPartsRequest = (): AppThunk => async (dispatch) => {
  const bodyParts = await getBodyParts();
  dispatch(updateBodyPartList(bodyParts));
};

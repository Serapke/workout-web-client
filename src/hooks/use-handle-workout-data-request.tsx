import { Workout } from "../store/types";
import { useCallback, useEffect, useState } from "react";
import { fetchWorkoutData } from "../services/workout";
import useRequest, { RequestState } from "./useRequest";
import { setDraggableId } from "../utils/common";

export function useHandleWorkoutDataRequest(workoutId: string): WorkoutRequestState {
  const [workout, setWorkout] = useState<Workout | undefined>();
  const {requestState, beginRequest} = useRequest<Workout>(
    () => fetchWorkoutData(workoutId)
  );

  const refresh = useCallback(() => {
    beginRequest()
      .then((workout) => {
        setWorkout({ ...workout, tasks: workout.tasks.map(setDraggableId) });
      })
      .catch(error => {
        console.error(error);
      })
  }, [workoutId]);

  useEffect(() => {
    refresh();
  }, [workoutId]);

  return {
    requestState,
    workout
  };
}

export interface WorkoutRequestState {
  requestState: RequestState;
  workout?: Workout;
}
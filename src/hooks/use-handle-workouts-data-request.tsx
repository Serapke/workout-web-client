import useRequest, { RequestState } from "./useRequest";
import { Workout } from "../store/types";
import { useCallback, useEffect, useState } from "react";
import { fetchWorkoutsData, MyWorkoutsResponse } from "../services/workout";

export function useHandleWorkoutsDataRequest(): WorkoutsRequestState {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { requestState, beginRequest } = useRequest<MyWorkoutsResponse>(
    () => fetchWorkoutsData()
  );

  const refresh = useCallback(() => {
    beginRequest()
      .then((response) => {
        setWorkouts(response.workouts);
      })
      .catch(error => {
        console.error(error);
      })
  }, []);

  useEffect(() => {
    refresh();
  }, []);

  return {
    requestState,
    workouts
  }
}

export interface WorkoutsRequestState {
  requestState: RequestState;
  workouts: Workout[];
}
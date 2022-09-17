import useRequest, { RequestState } from "./useRequest";
import { Routine } from "../store/types";
import { useCallback, useEffect, useState } from "react";
import { fetchRoutinesData, MyRoutinesResponse } from "../services/routine";

export function useHandleRoutinesDataRequest(): RoutinesRequestState {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const { requestState, beginRequest } = useRequest<MyRoutinesResponse>(
    () => fetchRoutinesData()
  );

  const refresh = useCallback(() => {
    beginRequest()
      .then((response) => {
        setRoutines(response.routines);
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
    routines
  }
}

export interface RoutinesRequestState {
  requestState: RequestState;
  routines: Routine[];
}
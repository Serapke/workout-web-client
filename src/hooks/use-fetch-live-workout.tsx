import { LiveWorkoutContextType, LiveWorkoutPageState } from "../context/live-workout-context";
import { useParams } from "react-router";
import { fetchActiveWorkoutOrStartNew } from "../services/live-workout";
import useRequest from "./useRequest";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { LiveWorkout } from "../services/types";
import useIsMounted from "./useIsMounted";

export function useFetchLiveWorkout(): LiveWorkoutContextType {
  const {id} = useParams<string>();
  const [navigationPathname, setNavigationPathname] = React.useState<string>(null);
  const [liveWorkout, setLiveWorkout] = useState<LiveWorkout | undefined>();
  const [inExitState, setInExitState] = React.useState<boolean>(false);
  const [paused, setPaused] = React.useState<boolean>(false);
  const [duration, setDuration] = React.useState<number>();
  const [currentSetIndex, setCurrentSetIndex] = React.useState<number>(0);
  const [completedSets, setCompletedSets] = React.useState<number[]>([]);
  const [pageState, setPageState] = React.useState<LiveWorkoutPageState>(LiveWorkoutPageState.EXERCISE);
  const isMounted = useIsMounted();

  const {beginRequest, requestState} = useRequest(
    () => fetchActiveWorkoutOrStartNew(id)
  );

  const refresh = useCallback(() => {
    beginRequest().then((data) => {
      if (isMounted()) {
        setLiveWorkout(data);
      }
    }).catch((e) => {
      console.error(e);
    });
  }, [beginRequest, isMounted]);

  useEffect(() => {
    if (liveWorkout?.workoutId !== Number(id)) {
      refresh();
    }
  }, [id, liveWorkout, refresh]);

  return {
    requestState,
    navigationPathname,
    setNavigationPathname,
    liveWorkout,
    setLiveWorkout,
    inExitState,
    setInExitState,
    paused,
    setPaused,
    duration,
    setDuration,
    pageState,
    setPageState,
    currentSetIndex,
    setCurrentSetIndex,
    completedSets,
    setCompletedSets,
  };
}
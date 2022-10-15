import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { RequestState } from "../hooks/useRequest";
import { LiveWorkout } from "../services/types";
import { useFetchLiveWorkout } from "../hooks/use-fetch-live-workout";

export enum LiveWorkoutPageState {
  EXERCISE,
  REST,
  CYCLE_REST
}

interface OwnProps {
  children: ReactNode;
}

export default function LiveWorkoutContextProvider({ children }: OwnProps) {
  const value = useFetchLiveWorkout();
  return (
    <LiveWorkoutContext.Provider value={value}>
      {children}
    </LiveWorkoutContext.Provider>
  )
}

export interface LiveWorkoutContextType {
  requestState: RequestState;
  navigationPathname: string;
  setNavigationPathname: Dispatch<SetStateAction<string>>;
  liveWorkout: LiveWorkout;
  setLiveWorkout: (liveWorkout: LiveWorkout) => void;
  paused: boolean;
  setPaused: Dispatch<SetStateAction<boolean>>;
  inExitState: boolean;
  setInExitState: Dispatch<SetStateAction<boolean>>;
  duration: number;
  setDuration: (duration: number) => void;
  pageState: LiveWorkoutPageState;
  setPageState: (pageState: LiveWorkoutPageState) => void;
  currentSetIndex: number;
  setCurrentSetIndex: (currentSetIndex: number) => void;
  completedSets: number[];
  setCompletedSets: (completedSets: number[]) => void;
}

export const LiveWorkoutContext = React.createContext<LiveWorkoutContextType>({} as LiveWorkoutContextType)
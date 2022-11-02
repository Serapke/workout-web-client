import React, { useContext } from 'react';
import ExerciseState from './workout-exercise-state';
import WorkoutRestState from './workout-rest-state';
import { Box } from '@material-ui/core';
import WorkoutTime from './components/workout-time';
import Button from './components/button';
import ExitLiveWorkoutDialog from './components/exit-live-workout-dialog';
import { usePrompt } from "../../../hooks/usePrompt";
import WorkoutCycleRestState from "./workout-cycle-rest-state";
import { LiveWorkoutContext, LiveWorkoutPageState } from "context/live-workout-context";
import { useProgressWorkout } from "../../../hooks/use-progress-workout";
import StartTimer from "./components/start-timer";

const WorkoutLivePage: React.FunctionComponent = () => {
  const {
    setNavigationPathname,
    liveWorkout,
    currentSetIndex,
    setInExitState,
    paused,
    setPaused,
    pageState,
  } = useContext(LiveWorkoutContext);
  const [showStartTimer, setShowStartTimer] = React.useState<boolean>(true);


  const {
    onRestDone,
    onExerciseDone,
    isSubmitting
  } = useProgressWorkout();

  usePrompt((tx) => {
    if (tx.action === "POP") {
      setNavigationPathname(tx.location.pathname);
      setInExitState(true);
      setPaused(true);
      return false;
    } else {
      return true;
    }
  });

  if (!liveWorkout) return <div/>;

  const onNextClick = () => {
    if (pageState === LiveWorkoutPageState.EXERCISE) {
      onExerciseDone();
    } else {
      onRestDone();
    }
  }

  let stateComponent: JSX.Element;

  if (pageState === LiveWorkoutPageState.EXERCISE) {
    stateComponent = <ExerciseState/>
  } else if (pageState === LiveWorkoutPageState.CYCLE_REST) {
    stateComponent = <WorkoutCycleRestState rest={60}/>
  } else {
    stateComponent = <WorkoutRestState/>
  }

  const hasMoreSets = liveWorkout.nextTask || currentSetIndex !== liveWorkout.currentTask.sets.length - 1;

  function onStartTimerEnd() {
    setShowStartTimer(false);
  }

  return (
    <Box>
      {
        showStartTimer
          ? <StartTimer onEnd={onStartTimerEnd}/>
          : (
            <>
              <WorkoutTime/>
              {stateComponent}
              <Button disabled={paused || isSubmitting} onClick={onNextClick}>{hasMoreSets ? `Next` : `Finish`}</Button>
              <ExitLiveWorkoutDialog/>
            </>
          )
      }
    </Box>
  );
}

export default WorkoutLivePage;
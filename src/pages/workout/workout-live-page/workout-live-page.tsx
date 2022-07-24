import * as React from "react";

import { WorkoutStatus } from 'services/types';
import ExerciseState from './workout-exercise-state';
import WorkoutRestState from './workout-rest-state';
import { Box } from '@material-ui/core';
import WorkoutTime from './components/workout-time';
import Button from './components/button';
import {
  continueWorkout,
  discardWorkout,
  finishWorkout,
  getActiveWorkoutStatus,
  updateWorkoutDuration
} from 'services/live-workout';
import ExitLiveWorkoutDialog from './components/exit-live-workout-dialog';
import { useParams } from "react-router";
import { usePrompt } from "../../../hooks/usePrompt";
import { useNavigate } from "react-router-dom";

enum WorkoutPageState {
  EXERCISE,
  REST
}

const WorkoutLivePage: React.FunctionComponent = () => {
  const [status, updateStatus] = React.useState<WorkoutStatus>();
  const [setIndex, updateSetIndex] = React.useState<number>();
  const [setsDone, updateSetsDone] = React.useState<number[]>([]);
  const [pageState, updatePageState] = React.useState<WorkoutPageState>(WorkoutPageState.EXERCISE);
  const [paused, setPaused] = React.useState<boolean>(false);
  const [duration, setDuration] = React.useState<number>();
  const [navigationPathname, setNavigationPathname] = React.useState<string>(null);

  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    getActiveWorkoutStatus(id).then((status) => updateStatus(status));
    updateSetIndex(0);
  }, [id]);

  usePrompt((tx) => {
    if (tx.action === "POP") {
      setNavigationPathname(tx.location.pathname);
      setPaused(true);
      return false;
    } else {
      return true;
    }
  });

  // React.useEffect(() => {
  //   //   const unblock = history.block((tx, action) => {
  //   //     if (action === "POP") {
  //   //       setNavigationPathname(tx.pathname);
  //   //       setPaused(true);
  //   //       return false;
  //   //     }
  //   //   });
  //   //
  //   //   return () => {
  //   //     unblock();
  //   //   };
  //   // }, [history]
  // );

  if (!status) return <div/>;

  const togglePause = () => {
    setPaused(prevState => !prevState);
  }

  const updateDuration = (duration: number) => {
    if (duration !== 0 && duration % 10 === 0) {
      updateWorkoutDuration(status.id, duration);
    } else {
      setDuration(duration);
    }
  }

  const onExerciseStateNextClick = () => {
    let setsCount = status.currentTask.setsGoal.length;
    setsDone[setIndex] = status.currentTask.setsGoal[setIndex];
    updateSetsDone(setsDone);
    if (setIndex + 1 < setsCount) {
      updateSetIndex(setIndex + 1);
    } else if (status.nextTask) {
      updatePageState(WorkoutPageState.REST);
    } else {
      updateWorkoutDuration(status.id, duration);
      finishWorkout(status.id, setsDone).then(() => {
        navigate(`/workout/${id}/result/${status.id}`);
      })
    }
  }

  const onExerciseResultStateNextClick = () => {
    continueWorkout(status.id, setsDone).then((status) => {
      updatePageState(WorkoutPageState.EXERCISE);
      updateStatus(status);
      updateSetsDone([]);
      updateSetIndex(0);
    });
  }

  const onNextClick = () => {
    if (pageState === WorkoutPageState.EXERCISE) {
      onExerciseStateNextClick();
    } else {
      onExerciseResultStateNextClick();
    }
  }

  const onContinueClick = () => {
    setNavigationPathname(null);
    setPaused(false);
  }

  const onExitClick = () => {
    discardWorkout(status.id).then(() => {
      // remove live workout link from history, so it won't be impossible to start using "back" button
      navigate(navigationPathname ? navigationPathname : `/favorites`)
    });
  }

  let stateComponent: JSX.Element;

  if (pageState === WorkoutPageState.EXERCISE) {
    stateComponent =
      <ExerciseState task={status.currentTask} setIndex={setIndex} paused={paused} togglePause={togglePause}/>
  } else {
    stateComponent = <WorkoutRestState rest={status.rest} nextTask={status.nextTask} paused={paused}/>
  }

  const hasMoreSets = status.nextTask || setIndex !== status.currentTask.setsGoal.length - 1;

  return (
    <Box>
      <WorkoutTime
        duration={status.duration}
        paused={paused}
        onPauseClick={togglePause}
        updateDuration={updateDuration}
      />
      {stateComponent}
      <Button disabled={paused} onClick={onNextClick}>{hasMoreSets ? `Next` : `Finish`}</Button>
      <ExitLiveWorkoutDialog open={paused} onContinue={onContinueClick} onExit={onExitClick}/>
    </Box>
  );
}

export default WorkoutLivePage;
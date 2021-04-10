import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { WorkoutStatus } from 'services/types';
import ExerciseState from './workout-exercise-state';
import WorkoutRestState from './workout-rest-state';
import { Box } from '@material-ui/core';
import WorkoutTime from './components/workout-time';
import Button from './components/button';
import { getActiveWorkoutStatus, updateWorkoutDuration, finishWorkout, continueWorkout } from 'services/live-workout';

interface RouteParams {
  id: string;
}

enum WorkoutPageState {
  EXERCISE,
  REST
}

type AllProps = RouteComponentProps<RouteParams>;


const WorkoutLivePage: React.FunctionComponent<AllProps> = ({ match, history }) => {
  const [status, updateStatus] = React.useState<WorkoutStatus>();
  const [setIndex, updateSetIndex] = React.useState<number>();
  const [setsDone, updateSetsDone] = React.useState<number[]>([]);
  const [pageState, updatePageState] = React.useState<WorkoutPageState>(WorkoutPageState.EXERCISE);
  const [paused, setPaused] = React.useState<boolean>(false);
  const [duration, setDuration] = React.useState<number>();

  React.useEffect(() => {
    getActiveWorkoutStatus(match.params.id).then((status) => updateStatus(status));
    updateSetIndex(0);
  }, [match.params.id]);

  if (!status) return <div></div>;

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
        history.push(`/workout/${match.params.id}/result/${status.id}`);
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

  let stateComponent: JSX.Element;

  if (pageState === WorkoutPageState.EXERCISE) {
    stateComponent = <ExerciseState task={status.currentTask} setIndex={setIndex} paused={paused} togglePause={togglePause} />
  } else {
    stateComponent = <WorkoutRestState rest={status.rest} nextTask={status.nextTask} paused={paused} />
  }

  return (
    <Box>
      <WorkoutTime duration={status.duration} paused={paused} onPauseClick={togglePause} updateDuration={updateDuration} />
      {stateComponent}
      <Button disabled={paused} onClick={onNextClick}>{status.nextTask ? `Next` : `Finish`}</Button>
    </Box>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutLivePage);
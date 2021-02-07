import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { ApplicationState } from "../../../store";
import { getActiveWorkoutStatus, continueWorkout, finishWorkout } from 'services/workout';
import { WorkoutStatus } from 'services/types';
import ExerciseState from './exercise-state';
import WorkoutRestState from './workout-rest-state';
import { Box } from '@material-ui/core';
import WorkoutTime from './components/workout-time';
import Button from './components/button';

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

  React.useEffect(() => {
    getActiveWorkoutStatus(match.params.id).then((status) => updateStatus(status));
    updateSetIndex(0);
  }, [match.params.id]);

  if (!status) return <div></div>;

  const pauseWorkout = () => {
    setPaused(prevState => !prevState);
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
      finishWorkout(status.workoutStatusId, setsDone).then(() => {
        history.push(`/workout/${match.params.id}/result/${status.workoutStatusId}`);
      })
    }
  }

  const onExerciseResultStateNextClick = () => {
    continueWorkout(status.workoutStatusId, setsDone).then((status) => {
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
    stateComponent = <ExerciseState
      startTime={status.startTime}
      title={status.currentTask.exercise.title}
      goal={status.currentTask.setsGoal[setIndex]}
      currentCountNo={setIndex + 1}
      setsCount={status.currentTask.setsGoal.length}
      onClick={onExerciseStateNextClick}
    />
  } else {
    stateComponent = <WorkoutRestState
      startTime={status.startTime}
      rest={status.rest}
      currentTask={status.currentTask}
      setsDone={setsDone}
      nextTask={status.nextTask}
      paused={paused}
    />
  }

  return (
    <Box>
      <WorkoutTime paused={paused} onPauseClick={pauseWorkout} />
      {stateComponent}
      <Button disabled={paused} onClick={onNextClick}>Next</Button>
    </Box>
  );
}

const mapStateToProps = ({ form }: ApplicationState) => ({
  form: form.workout.form,
  id: form.workout.id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutLivePage);
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { ApplicationState } from "../../../store";
import { getActiveWorkoutStatus, continueWorkout, finishWorkout } from 'services/workout';
import { WorkoutStatus } from 'services/types';
import ExerciseState from './exercise-state';
import ExerciseResultState from './exercise-result-state';

interface RouteParams {
  id: string;
}

enum WorkoutPageState {
  EXERCISE,
  EXERCISE_RESULT,
  WORKOUT_DONE
}

type AllProps = RouteComponentProps<RouteParams>;

const WorkoutLivePage: React.FunctionComponent<AllProps> = ({ match, history }) => {
  const [status, updateStatus] = React.useState<WorkoutStatus>();
  const [setIndex, updateSetIndex] = React.useState<number>();
  const [setsDone, updateSetsDone] = React.useState<number[]>([]);
  const [pageState, updatePageState] = React.useState<WorkoutPageState>(WorkoutPageState.EXERCISE);

  React.useEffect(() => {
    getActiveWorkoutStatus(match.params.id).then((status) => updateStatus(status));
    updateSetIndex(0);
  }, [match.params.id]);

  if (!status) return <div>Loading...</div>;

  const onExerciseStateNextClick = () => {
    let setsCount = status.currentTask.setsGoal.length;
    setsDone[setIndex] = status.currentTask.setsGoal[setIndex];
    updateSetsDone(setsDone);
    if (setIndex + 1 < setsCount) {
      updateSetIndex(setIndex + 1);
    } else {
      updatePageState(WorkoutPageState.EXERCISE_RESULT);
    }
  }

  const onExerciseResultStateNextClick = () => {
    if (status.nextTask) {
      continueWorkout(status.workoutStatusId, setsDone).then((status) => {
        updatePageState(WorkoutPageState.EXERCISE);
        updateStatus(status);
        updateSetsDone([]);
        updateSetIndex(0);
      });
    } else {
      finishWorkout(status.workoutStatusId, setsDone).then(() => {
        history.push(`/workout/${match.params.id}/result/${status.workoutStatusId}`);
      })
    }
  }

  if (pageState === WorkoutPageState.EXERCISE) {
    return <ExerciseState
      startTime={status.startTime}
      title={status.currentTask.exercise.title}
      goal={status.currentTask.setsGoal[setIndex]}
      currentCountNo={setIndex + 1}
      setsCount={status.currentTask.setsGoal.length}
      onClick={onExerciseStateNextClick}
    />
  } else if (pageState === WorkoutPageState.EXERCISE_RESULT) {
    return <ExerciseResultState
      startTime={status.startTime}
      rest={status.rest}
      currentTask={status.currentTask}
      setsDone={setsDone}
      nextTask={status.nextTask}
      onClick={onExerciseResultStateNextClick}
    />
  }

  return null;
}

const mapStateToProps = ({ form }: ApplicationState) => ({
  form: form.workout.form,
  id: form.workout.id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutLivePage);
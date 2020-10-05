import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { ApplicationState } from "../../../store";
import { getActiveWorkoutStatus } from 'services/workout';
import { WorkoutStatus } from 'services/types';
import ExerciseState from './exercise-state';

interface RouteParams {
  id: string;
}

type WorkoutPageState = "exercise" | "exercise-result";

type AllProps = RouteComponentProps<RouteParams>;

const WorkoutLivePage: React.FunctionComponent<AllProps> = ({ match }) => {
  const [status, updateStatus] = React.useState<WorkoutStatus>();
  const [setIndex, updateSetIndex] = React.useState<number>();
  const [setsDone, updateSetsDone] = React.useState<number[]>([]);
  const [pageState, updatePageState] = React.useState<WorkoutPageState>("exercise");

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
      updatePageState("exercise-result");
    }
  }

  if (pageState === "exercise") {
    return <ExerciseState
      startTime={status.startTime}
      title={status.currentTask.exercise.title}
      goal={status.currentTask.setsGoal[setIndex]}
      currentCountNo={setIndex + 1}
      setsCount={status.currentTask.setsGoal.length}
      onClick={onExerciseStateNextClick}
    />
  } else if (pageState === "exercise-result") {
    return (
      <div>exercise-result</div>
    )
  }

  return null;
}

const mapStateToProps = ({ form }: ApplicationState) => ({
  form: form.workout.form,
  id: form.workout.id,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutLivePage);
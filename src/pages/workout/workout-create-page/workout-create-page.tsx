import * as React from "react";
import { createWorkout } from "../../../services/workout";
import { useNavigate } from "react-router-dom";
import WorkoutForm from "../workout-edit-page/components/workout-edit-form";
import { Workout } from "../../../store/types";

const EMPTY_WORKOUT = {title: undefined, restPeriodInSeconds: 0, cycles: 0, tasks: []};

const WorkoutCreatePage = () => {
  const navigate = useNavigate();

  function handleSubmit(workout: Workout) {
    createWorkout(workout).then((res) => {
      if (res.errors) {
        console.error(res.errors);
      } else {
        // TODO: FE-0033 - Show Snackbar with created workout title
        navigate(`/workout/${res.data.id}`)
      }
    })
  }

  return (
    <div>
      <WorkoutForm workout={EMPTY_WORKOUT} onSubmit={handleSubmit}/>
    </div>
  );
};

export default WorkoutCreatePage;

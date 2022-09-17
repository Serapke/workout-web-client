import * as React from "react";
import { useParams } from "react-router";
import { useHandleWorkoutDataRequest } from "../../../hooks/use-handle-workout-data-request";
import { RequestState } from "../../../hooks/useRequest";
import WorkoutEditForm from "./components/workout-edit-form";
import LoadingPlaceHolder from "../../../components/loading-placeholder";
import { updateWorkout } from "../../../services/workout";
import { useNavigate } from "react-router-dom";
import { Workout } from "../../../store/types";

const WorkoutEditPage = () => {
  const { id } = useParams();
  const workoutRequestData = useHandleWorkoutDataRequest(id);
  const navigate = useNavigate();

  function handleSubmit(workout: Workout) {
    updateWorkout(workout).then((res) => {
      if (res.errors) {
        console.error(res.errors);
      } else {
        navigate(`/workout/${workout.id}`);
      }
    })
  }

  return (
    <LoadingPlaceHolder isLoading={workoutRequestData.requestState === RequestState.FETCHING}>
      <WorkoutEditForm workout={workoutRequestData.workout} onSubmit={handleSubmit}/>
    </LoadingPlaceHolder>
  );
};

export default WorkoutEditPage;

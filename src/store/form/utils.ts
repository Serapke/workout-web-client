import { WorkoutFormState, WorkoutForm } from "./types";
import { Workout, Task } from "../types";

export const emptyWorkoutFormState: WorkoutFormState = {
  form: {
    title: { value: "", error: null },
    restPeriodInSeconds: { value: "", error: null },
    tasks: { value: [], error: null },
  },
};

export const formToWorkout = (state: WorkoutForm, id?: number): Workout => ({
  title: state.title.value,
  restPeriodInSeconds: state.restPeriodInSeconds.value,
  tasks: state.tasks.value.map((task: Task) => ({ ...task, id: null } as Task)),
  id,
});

export const workoutToForm = (workout: Workout): WorkoutFormState => ({
  id: workout.id,
  form: {
    title: { value: workout.title },
    restPeriodInSeconds: { value: workout.restPeriodInSeconds },
    tasks: { value: workout.tasks },
  },
});

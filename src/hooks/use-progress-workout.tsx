import useIsMounted from "./useIsMounted";
import { useCallback, useContext, useState } from "react";
import { continueWorkout, finishWorkout } from "../services/live-workout";
import { LiveWorkoutContext, LiveWorkoutPageState } from "../context/live-workout-context";
import { useNavigate } from "react-router-dom";

function hasMoreSets(currentSetIndex, setsCount): boolean {
  return currentSetIndex + 1 < setsCount;
}

export function useProgressWorkout(): WorkoutRequestState {
  const isMounted = useIsMounted();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    liveWorkout,
    setLiveWorkout,
    duration,
    setPageState,
    completedSets,
    setCompletedSets,
    currentSetIndex,
    setCurrentSetIndex
  } = useContext(LiveWorkoutContext);
  const navigate = useNavigate();

  const onRestDone = useCallback(() => {
    if (isMounted()) {
      setIsSubmitting(true);
    }

    continueWorkout(liveWorkout.id, completedSets)
      .then((liveWorkout) => {
        setTimeout(() => {
          if (isMounted()) {
            setIsSubmitting(false);
          }

          setPageState(LiveWorkoutPageState.EXERCISE);
          setLiveWorkout(liveWorkout);
          setCompletedSets([]);
          setCurrentSetIndex(0);
        }, 100)
      })
      .catch((error) => {
        if (isMounted()) {
          setIsSubmitting(false);
        }
        console.error(error);
      });
  }, [liveWorkout, completedSets, isMounted, setLiveWorkout, setPageState, setCompletedSets, setCurrentSetIndex]);

  const onExerciseDone = useCallback(() => {
    const setsCount = liveWorkout.currentTask.sets.length;
    completedSets[currentSetIndex] = liveWorkout.currentTask.sets[currentSetIndex];
    setCompletedSets(completedSets);

    if (hasMoreSets(currentSetIndex, setsCount)) {
      setCurrentSetIndex(currentSetIndex + 1);
    } else if (liveWorkout.nextTask && liveWorkout.nextTaskOnNewCycle) {
      setPageState(LiveWorkoutPageState.CYCLE_REST);
    } else if (liveWorkout.nextTask) {
      setPageState(LiveWorkoutPageState.REST);
    } else {
      if (isMounted()) {
        setIsSubmitting(true);
      }

      finishWorkout(liveWorkout.id, completedSets, duration)
        .then(() => {
          setTimeout(() => {
            if (isMounted()) {
              setIsSubmitting(false);
            }
            navigate(`/workout/${liveWorkout.id}/result/${liveWorkout.workoutHistoryId}`);
          }, 100)
        })
        .catch((error) => {
          if (isMounted()) {
            setIsSubmitting(false);
          }
          console.error(error);
        });
    }
  }, [liveWorkout, navigate, isMounted, currentSetIndex, completedSets, setCompletedSets, duration, setCurrentSetIndex, setPageState])

  return {
    onRestDone,
    onExerciseDone,
    isSubmitting,
  }
}

export interface WorkoutRequestState {
  onRestDone: () => void;
  onExerciseDone: () => void;
  isSubmitting: boolean;
}
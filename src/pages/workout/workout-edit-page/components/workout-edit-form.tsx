import { Exercise, Task, Workout } from "../../../../store/types";
import { Button, createStyles, InputAdornment, makeStyles, TextField, Theme } from "@material-ui/core";
import { fabKeyboardStyles, onInputBlurShowFab, onInputFocusHideFab } from "../../../../utils/ui-utils";
import { Add } from "@material-ui/icons";
import TaskList from "../../../../components/task-list";
import ExerciseSelectDialog from "../../../../components/exercise/exercise-select-dialog";
import * as React from "react";
import { useEffect, useState } from "react";
import { setDraggableId } from "../../../../utils/common";

export default function WorkoutEditForm({ workout, onSubmit }: OwnProps) {
  const [exerciseSelectDialogOpen, setExerciseSelectDialogOpen] = useState<boolean>(false);
  const [workoutUpdate, setWorkoutUpdate] = useState<Workout>(workout);

  useEffect(() => {
    setWorkoutUpdate(workout);
  }, [workout]);

  const classes = useStyles();
  const fabClass = fabKeyboardStyles();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(workoutUpdate);
    onSubmit(workoutUpdate);
  }

  function onTextFieldChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.id as keyof Workout;
    const value = event.target.value;
    setWorkoutUpdate((prevState) => ({ ...prevState, [name]: value }));
  }

  function onTasksChange(tasks: Task[]) {
    console.log(tasks);
    setWorkoutUpdate((prevState) => ({ ...prevState, tasks }));
  }

  function onAddExerciseButtonClick() {
    setExerciseSelectDialogOpen(true);
  }

  function onCloseDialogClick() {
    setExerciseSelectDialogOpen(false);
  }

  function onSelectExercisesClick(exercises: Exercise[]) {
    const newTasks: Task[] = exercises.map(exercise => ({
      draggableId: null,
      exercise,
      sets: [exercise.defaultQuantity]
    }));
    setWorkoutUpdate((prevState) => ({ ...prevState, tasks: [...prevState.tasks, ...newTasks].map(setDraggableId) }));
    setExerciseSelectDialogOpen(false);
  }

  return (
    <div>
      {workoutUpdate && <>
          <form className={classes.container} onSubmit={handleSubmit}>
              <TextField
                  className={classes.textField}
                  id="title"
                  label="Title"
                  color="secondary"
                  value={workoutUpdate.title}
                  onChange={onTextFieldChange}
              />
              <TextField
                  className={classes.textField}
                  id="restPeriodInSeconds"
                  label="Rest between sets"
                  color="secondary"
                  type="number"
                  value={workoutUpdate.restPeriodInSeconds}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Sec</InputAdornment>,
                    onFocus: () => onInputFocusHideFab(fabClass.keyboardStyle),
                    onBlur: () => onInputBlurShowFab(fabClass.keyboardStyle),
                  }}
                  onChange={onTextFieldChange}
                  fullWidth
              />
              <TextField
                className={classes.textField}
                id="cycles"
                label="Cycles"
                color="secondary"
                value={workoutUpdate.cycles}
                onChange={onTextFieldChange}
                type="number"
              />
              <Button
                  className={classes.button}
                  size="large"
                  color="secondary"
                  variant="contained"
                  onClick={() => onAddExerciseButtonClick()}
              >
                  <Add fontSize="large"/>
              </Button>
              <div className={classes.tasks}>
                  <TaskList tasks={workoutUpdate.tasks} updateTasks={onTasksChange}/>
              </div>
              <Button id="fab" className={classes.cta} color="secondary" variant="contained" type="submit">
                  Save
              </Button>
          </form>
          <ExerciseSelectDialog
              open={exerciseSelectDialogOpen}
              handleClose={() => onCloseDialogClick()}
              onSelect={onSelectExercisesClick}
          />
      </>}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    title: {
      marginBottom: "10px",
    },
    textField: {
      margin: theme.spacing(2, 0),
    },
    tasks: {
      overflow: "scroll",
      width: "100%",
      marginBottom: theme.spacing(8),
    },
    button: {
      position: "sticky",
      top: theme.spacing(2),
      zIndex: 1,
      marginBottom: theme.spacing(2),
      width: "100%",
    },
    cta: {
      position: "fixed",
      bottom: theme.spacing(2),
      left: "50%",
      transform: "translateX(-50%)",
      width: "200px",
    },
  })
);

interface OwnProps {
  workout: Workout;
  onSubmit: (workout: Workout) => void;
}
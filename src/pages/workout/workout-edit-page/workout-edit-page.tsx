import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, Link } from "react-router-dom";
import { Add } from "@material-ui/icons";
import { makeStyles, Theme, createStyles, Button, TextField, InputAdornment, Typography } from "@material-ui/core";
import { WorkoutForm } from "../../../store/form/types";
import {
  fetchWorkoutRequest,
  updateTasksRequest,
  updateWorkoutFormRequest,
  clearWorkoutFormRequest,
} from "../../../store/form/thunks";
import { showModalRequest } from "../../../store/modal/thunks";
import { fabKeyboardStyles, onInputFocusHideFab, onInputBlurShowFab } from "../../../utils/ui-utils";
import { ModalType } from "../../../components/modal/modal";
import { formToWorkout } from "../../../store/form/utils";
import { updateWorkout } from "../../../services/workout";
import TaskList from "../../../components/task-list";
import { ApplicationState } from "../../../store";

interface RouteParams {
  id: string;
}

interface PropsFromState {
  form: WorkoutForm;
  id: number;
}

interface PropsFromDispatch {
  fetchWorkout: typeof fetchWorkoutRequest;
  updateTasks: typeof updateTasksRequest;
  showModal: typeof showModalRequest;
  updateForm: typeof updateWorkoutFormRequest;
  clearForm: typeof clearWorkoutFormRequest;
}

type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps<RouteParams>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    title: {
      marginBottom: "10px",
    },
    textfield: {
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

const WorkoutEditPage: React.FunctionComponent<AllProps> = ({
  id,
  form,
  location,
  history,
  match,
  fetchWorkout,
  showModal,
  updateTasks,
  updateForm,
  clearForm,
}) => {
  const classes = useStyles();
  const fabClass = fabKeyboardStyles();
  React.useEffect(() => {
    if (id !== parseInt(match.params.id)) {
      fetchWorkout(match.params.id);
    }
  }, [fetchWorkout, id, match.params.id]);

  if (!form) return <div>Loading...</div>;

  const onTitleClick = () => {
    showModal({ type: ModalType.WorkoutTitleEditingDialog });
  };

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.id as keyof WorkoutForm;
    const state = { value: event.target.value, error: "" };
    updateForm({ name, state });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const workout = formToWorkout(form, id);
    updateWorkout(workout).then((res) => {
      if (res.errors) {
        console.log(res.errors);
      } else {
        clearForm();
        history.push(`/workout/${match.params.id}`);
      }
    });
  };

  return (
    <div>
      <form className={classes.container} onSubmit={handleSubmit}>
        <Typography variant="h4" onClick={onTitleClick}>
          {form.title.value}
        </Typography>
        <TextField
          className={classes.textfield}
          id="restPeriodInSeconds"
          name="restPeriodInSeconds"
          label="Rest between sets"
          color="secondary"
          type="number"
          value={form.restPeriodInSeconds.value}
          InputProps={{
            endAdornment: <InputAdornment position="end">Sec</InputAdornment>,
            onFocus: () => onInputFocusHideFab(fabClass.keyboardStyle),
            onBlur: () => onInputBlurShowFab(fabClass.keyboardStyle),
          }}
          onChange={onTextFieldChange}
          fullWidth
        />
        <Button
          className={classes.button}
          size="large"
          color="secondary"
          variant="contained"
          component={Link}
          to={{ pathname: "/exercise/select", state: { from: location } }}
        >
          <Add fontSize="large" />
        </Button>
        <div className={classes.tasks}>
          <TaskList tasks={form.tasks.value} editable showModal={showModal} updateTasks={updateTasks} />
        </div>
        <Button id="fab" className={classes.cta} color="secondary" variant="contained" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ form }: ApplicationState) => ({
  form: form.workout.form,
  id: form.workout.id,
});

const mapDispatchToProps = {
  fetchWorkout: fetchWorkoutRequest,
  updateTasks: updateTasksRequest,
  showModal: showModalRequest,
  updateForm: updateWorkoutFormRequest,
  clearForm: clearWorkoutFormRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutEditPage);

import * as React from "react";
import { connect } from "react-redux";
import { StaticContext } from "react-router";
import { TextField, makeStyles, createStyles, Theme, Button, InputAdornment, Snackbar } from "@material-ui/core";
import { Link, RouteComponentProps } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { Add } from "@material-ui/icons";
import { WorkoutForm } from "../../../store/form/types";
import { showModalRequest } from "../../../store/modal/thunks";
import { updateTasksRequest, updateWorkoutFormRequest, clearWorkoutFormRequest } from "../../../store/form/thunks";
import { fabKeyboardStyles, onInputFocusHideFab, onInputBlurShowFab } from "../../../utils/ui-utils";
import { formToWorkout } from "../../../store/form/utils";
import { createWorkout } from "../../../services/workout";
import TaskList from "../../../components/task-list";
import { ApplicationState } from "../../../store";

interface LocationState {
  new: boolean;
}

interface PropsFromState {
  form: WorkoutForm;
}

interface PropsFromDispatch {
  showModal: typeof showModalRequest;
  updateTasks: typeof updateTasksRequest;
  updateForm: typeof updateWorkoutFormRequest;
  clearForm: typeof clearWorkoutFormRequest;
}

type OwnProps = PropsFromState & PropsFromDispatch & RouteComponentProps<{}, StaticContext, LocationState>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    textfield: {
      margin: theme.spacing(2, 0),
    },
    tasks: {
      minHeight: theme.spacing(20),
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

const validate = (form: WorkoutForm) => {
  if (!form.tasks.value.length) {
    return false;
  }
  return true;
};

const WorkoutCreatePage = ({ form, location, history, showModal, updateTasks, updateForm, clearForm }: OwnProps) => {
  const classes = useStyles();
  const fabClass = fabKeyboardStyles();
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    if (location.state && location.state.new) {
      clearForm();
    }
  }, [clearForm, location.state]);

  const onTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.id as keyof WorkoutForm;
    const state = { value: event.target.value, error: "" };
    updateForm({ name, state });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate(form)) {
      setError("Come on! Add at least one exercise...");
      return;
    }
    const workout = formToWorkout(form);
    createWorkout(workout).then((res) => {
      if (res.errors) {
        Object.keys(res.errors).forEach((name) => {
          const _name = name as keyof WorkoutForm;
          updateForm({ name: _name, state: { value: form[_name].value, error: res.errors[name] } });
        });
      } else {
        clearForm();
        history.push("/favorites");
      }
    });
  };

  return (
    <div>
      <form className={classes.container} onSubmit={handleSubmit}>
        <TextField
          id="title"
          name="workout-title"
          label="Title"
          color="secondary"
          value={form.title.value}
          error={!!form.title.error}
          helperText={form.title.error}
          InputProps={{
            onFocus: () => onInputFocusHideFab(fabClass.keyboardStyle),
            onBlur: () => onInputBlurShowFab(fabClass.keyboardStyle),
          }}
          onChange={onTextFieldChange}
          fullWidth
          required
        />
        <TextField
          className={classes.textfield}
          id="restPeriodInSeconds"
          name="restPeriodInSeconds"
          label="Rest between sets"
          color="secondary"
          type="number"
          value={form.restPeriodInSeconds.value}
          error={!!form.restPeriodInSeconds.error}
          helperText={form.restPeriodInSeconds.error}
          InputProps={{
            endAdornment: <InputAdornment position="end">Sec</InputAdornment>,
            onFocus: () => onInputFocusHideFab(fabClass.keyboardStyle),
            onBlur: () => onInputBlurShowFab(fabClass.keyboardStyle),
          }}
          onChange={onTextFieldChange}
          fullWidth
          required
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
          Create
        </Button>
      </form>
      <Snackbar open={!!error} autoHideDuration={5000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

const mapStateToProps = ({ form }: ApplicationState) => ({
  form: form.workout.form,
});

const mapDispatchToProps = {
  showModal: showModalRequest,
  updateTasks: updateTasksRequest,
  updateForm: updateWorkoutFormRequest,
  clearForm: clearWorkoutFormRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutCreatePage);

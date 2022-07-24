import * as React from "react";
import { connect } from "react-redux";
import { Button, createStyles, InputAdornment, makeStyles, Snackbar, TextField, Theme } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { WorkoutForm } from "../../../store/form/types";
import { showModalRequest } from "../../../store/modal/thunks";
import { clearWorkoutFormRequest, updateTasksRequest, updateWorkoutFormRequest } from "../../../store/form/thunks";
import { fabKeyboardStyles, onInputBlurShowFab, onInputFocusHideFab } from "../../../utils/ui-utils";
import { formToWorkout } from "../../../store/form/utils";
import { createWorkout } from "../../../services/workout";
import TaskList from "../../../components/task-list";
import { ApplicationState } from "../../../store";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Add } from "@material-ui/icons";

interface PropsFromState {
  form: WorkoutForm;
}

interface PropsFromDispatch {
  showModal: typeof showModalRequest;
  updateTasks: typeof updateTasksRequest;
  updateForm: typeof updateWorkoutFormRequest;
  clearForm: typeof clearWorkoutFormRequest;
}

type OwnProps = PropsFromState & PropsFromDispatch;

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
  return form.tasks.value.length;
};

const WorkoutCreatePage = ({ form, showModal, updateTasks, updateForm, clearForm }: OwnProps) => {
  const fabClass = fabKeyboardStyles();
  const [error, setError] = React.useState<string>();

  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { new: boolean };

  React.useEffect(() => {
    if (state && state.new) {
      clearForm();
    }
  }, [clearForm, state]);

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
        navigate("/favorites");
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
          to="/exercise/select"
          state={{ from: location }}
        >
          <Add fontSize="large"/>
        </Button>
        <div className={classes.tasks}>
          <TaskList tasks={form.tasks.value} editable showModal={showModal} updateTasks={updateTasks}/>
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

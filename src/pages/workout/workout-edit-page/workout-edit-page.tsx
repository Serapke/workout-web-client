import * as React from "react";
import { connect } from "react-redux";
import { Button, createStyles, InputAdornment, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import { WorkoutForm } from "../../../store/form/types";
import {
  clearWorkoutFormRequest,
  fetchWorkoutRequest,
  updateTasksRequest,
  updateWorkoutFormRequest,
} from "../../../store/form/thunks";
import { showModalRequest } from "../../../store/modal/thunks";
import { fabKeyboardStyles, onInputBlurShowFab, onInputFocusHideFab } from "../../../utils/ui-utils";
import { ModalType } from "../../../components/modal/modal";
import { formToWorkout } from "../../../store/form/utils";
import { updateWorkout } from "../../../services/workout";
import TaskList from "../../../components/task-list";
import { ApplicationState } from "../../../store";
import { useParams } from "react-router";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Add } from "@material-ui/icons";

interface PropsFromState {
  form: WorkoutForm;
}

interface PropsFromDispatch {
  fetchWorkout: typeof fetchWorkoutRequest;
  updateTasks: typeof updateTasksRequest;
  showModal: typeof showModalRequest;
  updateForm: typeof updateWorkoutFormRequest;
  clearForm: typeof clearWorkoutFormRequest;
}

type AllProps = PropsFromState & PropsFromDispatch;


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
                                                              form,
                                                              fetchWorkout,
                                                              showModal,
                                                              updateTasks,
                                                              updateForm,
                                                              clearForm,
                                                            }) => {
  const classes = useStyles();
  const fabClass = fabKeyboardStyles();

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    fetchWorkout(id);
  }, [fetchWorkout, id]);

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
    const workout = formToWorkout(form, parseInt(id));
    updateWorkout(workout).then((res) => {
      if (res.errors) {
        console.log(res.errors);
      } else {
        clearForm();
        navigate(`/workout/${id}`);
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
          state={{ from: location }}
          to="/exercise/select"
        >
          <Add fontSize="large"/>
        </Button>
        <div className={classes.tasks}>
          <TaskList tasks={form.tasks.value} editable showModal={showModal} updateTasks={updateTasks}/>
        </div>
        <Button id="fab" className={classes.cta} color="secondary" variant="contained" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ form }: ApplicationState) => ({
  form: form.workout.form
});

const mapDispatchToProps = {
  fetchWorkout: fetchWorkoutRequest,
  updateTasks: updateTasksRequest,
  showModal: showModalRequest,
  updateForm: updateWorkoutFormRequest,
  clearForm: clearWorkoutFormRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutEditPage);

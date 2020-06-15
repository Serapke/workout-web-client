import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Workout } from "../../../../store/types";
import { makeStyles, Box } from "@material-ui/core";

type OwnProps = RouteComponentProps & {
  item: Workout;
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    height: "100px",
    textAlign: "center",
    background: theme.palette.primary.main,
    color: "white",
  },
}));

const WorkoutSliderItem: React.FC<OwnProps> = ({ item, history }) => {
  const classes = useStyles();
  const handleOnClick = () => {
    history.push(`/workout/${item.id}`);
  };
  return (
    <Box
      className={classes.container}
      display="flex"
      justifyContent="center"
      alignItems="center"
      onClick={handleOnClick}
    >
      {item.title}
    </Box>
  );
};

export default withRouter(WorkoutSliderItem);

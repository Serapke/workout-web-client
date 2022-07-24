import * as React from "react";
import { Workout } from "../../../../store/types";
import { makeStyles, Box } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

interface OwnProps {
  item: Workout
}

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

const WorkoutSliderItem: React.FC<OwnProps> = ({ item }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/workout/${item.id}`)
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

export default WorkoutSliderItem;

import * as React from "react";
import { makeStyles, createStyles, Theme, Typography, Box } from '@material-ui/core';

interface OwnProps {
  startTime: string;
  title: string;
  goal: number;
  currentCountNo: number;
  setsCount: number;
  onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    exercise: {
      color: "#666",
    },
    cta: {
      position: "fixed",
      bottom: theme.spacing(2),
      left: "50%",
      transform: "translateX(-50%)",
      width: "200px",
      fontSize: "20px"
    },
  })
);

const ExerciseState = ({ title, goal, currentCountNo, setsCount }: OwnProps) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" flexDirection="column" alignItems="center" marginTop={15}>
        <Typography variant="h3" gutterBottom>{goal}</Typography>
        <Typography variant="h4" className={classes.exercise}>{title}</Typography>
        <Typography variant="h6" color="secondary">{currentCountNo}/{setsCount} sets</Typography>
      </Box>
    </Box>
  )
}

export default ExerciseState;
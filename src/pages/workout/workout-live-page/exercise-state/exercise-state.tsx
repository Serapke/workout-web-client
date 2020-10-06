import * as React from "react";
import { Button, makeStyles, createStyles, Theme, Typography, Box } from '@material-ui/core';

import Timer, { TimerType } from 'components/timer/timer';

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

const ExerciseState = ({ startTime, title, goal, currentCountNo, setsCount, onClick }: OwnProps) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box borderRadius={16} bgcolor="secondary.main" py={1.5} px={3}>
        <Timer date={startTime} type={TimerType.STOPWATCH} />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" marginTop={15}>
        <Typography variant="h3" gutterBottom>{goal}</Typography>
        <Typography variant="h4" className={classes.exercise}>{title}</Typography>
        <Typography variant="h6" color="secondary">{currentCountNo}/{setsCount} sets</Typography>
      </Box>
      <Button size="large" id="fab" className={classes.cta} color="secondary" variant="contained" type="button" onClick={onClick}>
        Next
      </Button>
    </Box>
  )
}

export default ExerciseState;
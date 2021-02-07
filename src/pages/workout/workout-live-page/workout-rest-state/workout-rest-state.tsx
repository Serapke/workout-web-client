import * as React from "react";
import { Box, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import Timer from 'components/timer';
import { TaskStatus } from 'services/types';
import CircleItem from 'components/circle-item';


interface OwnProps {
  startTime: string;
  rest: number;
  currentTask: TaskStatus;
  setsDone: number[];
  nextTask: TaskStatus;
  paused: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nextUp: {
      color: "#777",
    },
    setBox: {
      "&>*": {
        margin: "0 4px",
      }
    },
  })
)

const WorkoutRestState = ({ paused, nextTask }: OwnProps) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      {nextTask &&
        <React.Fragment>
          <Box mt={3}>
            <Timer title="Rest" seconds={5} paused={paused} increaseBy={5} />
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" marginTop={3}>
            <Typography variant="subtitle1" className={classes.nextUp}>Next up</Typography>
            <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
              <Typography variant="h4">{nextTask.exercise.title}</Typography>
              <Box display="flex" mt={1} className={classes.setBox}>
                {nextTask.setsGoal.map((setGoal, sIndex) => <CircleItem key={`set-goal-${sIndex}`} color="secondary">{setGoal}{nextTask.exercise.type === "TIMED" ? "s" : "x"}</CircleItem>)}
              </Box>
            </Box>
          </Box>
        </React.Fragment>
      }
    </Box>
  )
}

export default WorkoutRestState;
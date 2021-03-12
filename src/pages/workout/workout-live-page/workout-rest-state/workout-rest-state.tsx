import * as React from "react";
import { Box, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import Timer from 'components/timer';
import { TaskStatus } from 'services/types';
import CircleItem from 'components/circle-item';
import { exerciseMeasurementTypeToLetter } from 'utils/common';


interface OwnProps {
  rest: number;
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

const WorkoutRestState = ({ paused, nextTask, rest }: OwnProps) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-evenly" width={200} height={200} borderRadius="50%" border="6px solid" borderColor="secondary.main">
        <Timer title="Rest" seconds={rest} paused={paused} increaseBy={5} />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" marginTop={3}>
        <Typography variant="subtitle1" className={classes.nextUp}>Next up</Typography>
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          <Typography variant="h4">{nextTask.exercise.title}</Typography>
          <Box display="flex" mt={1} className={classes.setBox}>
            {nextTask.setsGoal.map((setGoal, sIndex) => <CircleItem key={`set-goal-${sIndex}`} size="medium" color="secondary">{setGoal}{exerciseMeasurementTypeToLetter(nextTask.exercise.measurementType)}</CircleItem>)}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default WorkoutRestState;
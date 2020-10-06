import * as React from "react";
import { makeStyles, Theme, createStyles, Box, Button } from '@material-ui/core';
import Timer from 'components/timer';
import CircleItem from 'components/circle-item';
import { TaskStatus } from 'services/types';
import { TimerType } from 'components/timer/timer';

interface OwnProps {
  startTime: string;
  rest: number;
  currentTask: TaskStatus;
  setsDone: number[];
  nextTask: TaskStatus;
  onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    noSelect: {
      "-webkit-touch-callout": "none",
      "-webkit-user-select": "none",
      "-khtml-user-select": "none",
      "-moz-user-select": "none",
      "-ms-user-select": "none",
      "user-select": "none"
    },
    setBox: {
      "&>*": {
        margin: "8px",
      },
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

const ExerciseResultState = ({ startTime, rest, currentTask, setsDone, nextTask, onClick }: OwnProps) => {
  const classes = useStyles();

  const calculateNewRestUntil = (baseDate: Date, diff: number) => {
    let newRestUntil = baseDate;
    newRestUntil.setSeconds(newRestUntil.getSeconds() + diff);
    return newRestUntil.toISOString();
  }

  const [restUntil, updateRestUntil] = React.useState<string>(calculateNewRestUntil(new Date(), rest));

  const increaseRest = (diff: number) => {
    let newRestUntil = calculateNewRestUntil(new Date(restUntil), diff);
    updateRestUntil(newRestUntil);
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" className={classes.noSelect}>
      <Box borderRadius={16} bgcolor="secondary.main" py={1.5} px={3}>
        <Timer date={startTime} type={TimerType.STOPWATCH} />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" marginTop={3.5}>
        <Box fontSize={20} fontWeight={600}>Finished exercise</Box>
        <Box fontSize={20} color="#666">{currentTask.exercise.title}</Box>
        <Box display="flex" flexWrap="wrap" className={classes.setBox}>
          {setsDone.map((setDone, sIndex) => <CircleItem key={`set-done-${sIndex}`} color="secondary" size="medium">{setDone}{currentTask.exercise.type === "TIMED" ? "s" : "x"}</CircleItem>)}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" mt={3}>
        <Box borderRadius="50%" bgcolor="secondary.main" width={40} height={40} lineHeight="40px" textAlign="center" mr={1} className={classes.noSelect} onClick={() => increaseRest(-5)}>-5</Box>
        <Box borderRadius="50%" bgcolor="secondary.main" width={100} height={100} lineHeight="100px" textAlign="center">
          <Timer date={restUntil} onEnd={onClick} />
        </Box>
        <Box borderRadius="50%" bgcolor="secondary.main" width={40} height={40} lineHeight="40px" textAlign="center" ml={1} className={classes.noSelect} onClick={() => increaseRest(5)}>+5</Box>
      </Box>
      {nextTask &&
        <Box display="flex" flexDirection="column" alignItems="center" marginTop={3}>
          <Box fontSize={20} fontWeight={600}>Next exercise</Box>
          <Box fontSize={20} color="#666">{nextTask.exercise.title}</Box>
          <Box display="flex" flexWrap="wrap" className={classes.setBox}>
            {nextTask.setsGoal.map((setGoal, sIndex) => <CircleItem key={`set-goal-${sIndex}`} color="secondary" size="large">{setGoal}{nextTask.exercise.type === "TIMED" ? "s" : "x"}</CircleItem>)}
          </Box>
        </Box>
      }
      <Button size="large" id="fab" className={classes.cta} color="secondary" variant="contained" type="button" onClick={onClick}>
        Next
      </Button>
    </Box>
  )
}

export default ExerciseResultState;
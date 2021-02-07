import { Box, makeStyles, Theme, createStyles } from '@material-ui/core';
import React from 'react';

interface OwnProps {
  startCounter?: number;
  paused: boolean;
  format?: boolean;
  doOnEverySecond?: (duration: number) => void;
}

interface Time {
  timeString: string;
  counter: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@keyframes flicker': {
      from: {
        opacity: 1,
      },
      to: {
        opacity: 0,
      },
    },
    flicker: {
      animationName: '$flicker',
      animationDuration: '700ms',
      animationIterationCount: 'infinite',
      animationDirection: 'alternate',
      animationTimingFunction: 'linear',
    },
  })
)

const formatTwoDigits = (n: number, hideOnZero: boolean = false): string => {
  if (hideOnZero && n === 0) {
    return null;
  }
  return n < 10 ? '0' + n : '' + n;
}

const formatTime = (timeElapsed: number): string => {
  if (timeElapsed > 0) {
    let hours = formatTwoDigits(Math.floor((timeElapsed / 60 / 60) % 24), true);
    let minutes = formatTwoDigits(Math.floor((timeElapsed / 60) % 60));
    let seconds = formatTwoDigits(Math.floor((timeElapsed) % 60));

    return `${hours ? `${hours}:` : ''}${minutes}:${seconds}`;
  }
  return '00:00';
};

const Stopwatch = ({ startCounter = 0, paused, doOnEverySecond, format = true }: OwnProps) => {
  const classes = useStyles();
  const [time, setTime] = React.useState<Time>({ timeString: format ? formatTime(startCounter) : `${startCounter}`, counter: startCounter });

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!paused) {
      intervalId = setInterval(() => {
        setTime(prevState => ({
          timeString: format ? formatTime(prevState.counter + 1) : `${prevState.counter + 1}`,
          counter: prevState.counter + 1
        }))
      }, 1000)
      if (doOnEverySecond) {
        doOnEverySecond(time.counter);
      }
    }

    return () => clearInterval(intervalId);
  }, [doOnEverySecond, format, paused, time]);

  return (
    <Box className={paused ? classes.flicker : ''}>{time.timeString}</Box>
  );
}

export default Stopwatch;
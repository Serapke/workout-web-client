import { Box } from '@material-ui/core';
import React from 'react';

interface OwnProps {
  paused: boolean;
}

interface Time {
  timeString: string;
  counter: number;
}

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

const Stopwatch = ({ paused }: OwnProps) => {
  const [time, setTime] = React.useState<Time>({ timeString: '00:00', counter: 0 });

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!paused) {
      intervalId = setInterval(() => {
        setTime(prevState => ({
          timeString: formatTime(prevState.counter + 1),
          counter: prevState.counter + 1
        }))
      }, 1000)
    }

    return () => clearInterval(intervalId);
  }, [paused, time]);

  return (
    <Box fontSize={20} borderRadius={4} bgcolor="secondary.main" py={1} px={1.5} width="fit-content" height="fit-content">{time.timeString}</Box>
  );
}

export default Stopwatch;
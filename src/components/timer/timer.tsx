import * as React from "react";
import { Box } from '@material-ui/core';

interface OwnProps {
  startTime: string
}

interface Time {
  hours: string;
  minutes: string;
  seconds: string;
}

const formatTwoDigits = (n: number): string => {
  if (n === 0) {
    return '';
  }
  return n < 10 ? '0' + n : '' + n;
}

const Timer = ({ startTime }: OwnProps) => {
  const calculateTimeSpent = (): Time => {
    const difference = +new Date() - +new Date(startTime);
    let timeSpent = { hours: '', minutes: '00', seconds: '00' };

    if (difference > 0) {
      timeSpent = {
        hours: formatTwoDigits(Math.floor((difference / 1000 / 60 / 60) % 24)),
        minutes: formatTwoDigits(Math.floor((difference / 1000 / 60) % 60)),
        seconds: formatTwoDigits(Math.floor((difference / 1000) % 60)),
      };
    }

    return timeSpent;
  };

  const [timeSpent, setTimeSpent] = React.useState<Time>(calculateTimeSpent());

  React.useEffect(() => {
    let timer = setTimeout(() => {
      setTimeSpent(calculateTimeSpent());
    }, 1000);
    return () => {
      clearTimeout(timer);
    }
  });

  return (
    <Box fontSize={24}>{timeSpent.hours}:{timeSpent.minutes}:{timeSpent.seconds}</Box>
  )
}

export default Timer;
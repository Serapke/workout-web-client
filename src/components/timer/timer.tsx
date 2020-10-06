import * as React from "react";
import { Box } from '@material-ui/core';

export enum TimerType {
  STOPWATCH,
  TIMER
}

interface OwnProps {
  date: string;
  type?: TimerType;
  onEnd?: () => void;
}

interface Time {
  hours: string;
  minutes: string;
  seconds: string;
}

const formatTwoDigits = (n: number, hideOnZero: boolean = false): string => {
  if (hideOnZero && n === 0) {
    return null;
  }
  return n < 10 ? '0' + n : '' + n;
}

const Timer = ({ date, type = TimerType.TIMER, onEnd = () => { } }: OwnProps) => {
  const calculateDiff = () => {
    return type === TimerType.TIMER ? +new Date(date) - +new Date() : +new Date() - +new Date(date);
  }


  const [diff, setDiff] = React.useState<number>(calculateDiff());

  React.useEffect(() => {
    let interval = null;
    if (diff > 0) {
      interval = setInterval(() => {
        setDiff(type === TimerType.TIMER ? +new Date(date) - +new Date() : +new Date() - +new Date(date));
      }, 1000);
    } else {
      onEnd();
    }

    return () => clearInterval(interval);
  }, [date, diff, type, onEnd]);

  const formatTime = (): string => {
    if (diff > 0) {
      let hours = formatTwoDigits(Math.floor((diff / 1000 / 60 / 60) % 24), true);
      let minutes = formatTwoDigits(Math.floor((diff / 1000 / 60) % 60));
      let seconds = formatTwoDigits(Math.floor((diff / 1000) % 60));

      return `${hours ? `${hours}:` : ''}${minutes}:${seconds}`;
    }
    return '00:00';
  };


  return (
    <Box fontSize={24}>{formatTime()}</Box>
  )
}

export default Timer;
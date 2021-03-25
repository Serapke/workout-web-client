import * as React from "react";
import { Button, Typography } from '@material-ui/core';

import completionSound from "./../../sounds/completion-sound.wav";
import useTimer from 'hooks/useTimer';

interface OwnProps {
  title?: string;
  seconds: number;
  paused: boolean;
  increaseBy?: number;
  onEnd?: () => void;
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

const Timer = ({ title, seconds, paused, increaseBy, onEnd = () => { } }: OwnProps) => {
  const [value, setValue] = React.useState<number>();

  const { start, pause, resume, stop } = useTimer({
    delay: 1000, startImmediately: true, callback: () => {
      if (value === 4) {
        playSound(new Audio(completionSound));
      }
      else if (value === 0) {
        stop();
        onEnd();
      }
      setValue(prevState => prevState - 1);
    }
  });

  React.useEffect(() => {
    setValue(seconds);
  }, [seconds])

  React.useEffect(() => {
    if (paused) {
      pause();
    } else {
      resume();
    }
  }, [pause, paused, resume]);

  const playSound = (audioFile: HTMLAudioElement) => {
    audioFile.play();
  };

  const addTime = () => {
    setValue(prevState => prevState + increaseBy);
    console.log(value);
    if (value <= 0) {
      start();
    }
  }

  return (
    <React.Fragment>
      {title && <Typography variant="subtitle1">{title}</Typography>}
      <Typography variant="h4">{formatTime(value)}</Typography>
      {increaseBy && <Button size="large" color="secondary" onClick={addTime}>+{increaseBy}</Button>}
    </React.Fragment>
  )
}

export default Timer;
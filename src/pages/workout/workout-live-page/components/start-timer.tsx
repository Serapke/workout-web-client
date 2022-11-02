import React, { useEffect } from "react";
import useTimer from "../../../../hooks/useTimer";
import { Box, Typography } from "@material-ui/core";

import startCountDown from "../../../../sounds/start-count-down.wav";

const StartTimer = ({ onEnd = () => {} } : OwnProps) => {
  const [value, setValue] = React.useState<number>(5);

  useEffect(() => {
    new Audio(startCountDown).play()
      .catch(error => console.error(error));
  }, [])

  const { stop } = useTimer({
    delay: 1000,
    startImmediately: true,
    callback: () => {
      if (value === 0) {
        stop();
        onEnd();
      }
      setValue(prevState => prevState - 1);
    }
  });

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 144px)">
      <Typography variant="h1" style={{ fontWeight: 400 }}>{value ? value : 'GO !'}</Typography>
    </Box>
  )
}

interface OwnProps {
  onEnd?: () => void;
}

export default StartTimer;
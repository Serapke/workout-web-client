import React from 'react';

interface TimerOptions {
  delay?: number;
  callback?: () => void;
  runOnce?: boolean;
  startImmediately?: boolean;
}

const NEVER = Number.MAX_SAFE_INTEGER;

export default function useTimer(options: TimerOptions) {
  const now = new Date().getTime();
  const [firstRun, setFirstRun] = React.useState(true);
  const [, setCheckTime] = React.useState(now);
  const [nextFireTime, setNextFireTime] = React.useState(NEVER);
  const [started, setStarted] = React.useState(false);
  const [startTime, setStartTime] = React.useState(NEVER);
  const [pauseTime, setPauseTime] = React.useState(NEVER);
  const [periodElapsedPauseTime, setPeriodElapsedPauseTime] = React.useState(0);
  const [totalElapsedPauseTime, setTotalElapsedPauseTime] = React.useState(0);

  const isStarted = React.useCallback((): boolean => {
    return started;
  }, [started]);

  const isPaused = React.useCallback((): boolean => {
    return isStarted() && pauseTime !== NEVER;
  }, [isStarted, pauseTime]);

  const isRunning = React.useCallback((): boolean => {
    return isStarted() && !isPaused();
  }, [isPaused, isStarted]);

  const getElapsedRunningTime = React.useCallback((): number => {
    if (isStarted()) {
      if (isPaused()) {
        return pauseTime - startTime - totalElapsedPauseTime;
      } else {
        return new Date().getTime() - startTime - totalElapsedPauseTime;
      }
    }
    return 0;
  }, [totalElapsedPauseTime, isPaused, isStarted, pauseTime, startTime]);

  const getRemainingTime = React.useCallback((): number => {
    const currentTime = new Date().getTime();
    if (isStarted() && !!options.delay) {
      if (isRunning()) {
        return Math.max(0, nextFireTime - currentTime);
      } else if (isPaused()) {
        return Math.max(0, options.delay - (pauseTime - startTime - periodElapsedPauseTime));
      }
    }
    return 0;
  }, [isPaused, isRunning, isStarted, nextFireTime, options.delay, pauseTime, periodElapsedPauseTime, startTime])

  const start = React.useCallback((): void => {
    const currentTime = new Date().getTime();
    const newNextFireTime = options.delay ? Math.max(currentTime, currentTime + options.delay) : NEVER;
    setStartTime(currentTime);
    setNextFireTime(newNextFireTime);
    setPauseTime(NEVER);
    setPeriodElapsedPauseTime(0);
    setTotalElapsedPauseTime(0);
    setStarted(true);
  }, [options.delay]);

  const stop = React.useCallback((): void => {
    setStartTime(NEVER);
    setNextFireTime(NEVER);
    setPauseTime(NEVER);
    setPeriodElapsedPauseTime(0);
    setTotalElapsedPauseTime(0);
    setStarted(false);
  }, []);

  const pause = React.useCallback((): void => {
    if (isRunning()) {
      setPauseTime(new Date().getTime());
    }
  }, [isRunning]);

  const resume = React.useCallback((): void => {
    if (isStarted() && isPaused()) {
      const currentTime = new Date().getTime();
      setTotalElapsedPauseTime(totalElapsedPauseTime + (currentTime - pauseTime));
      setPeriodElapsedPauseTime(periodElapsedPauseTime + (currentTime - pauseTime));
      setNextFireTime(currentTime + getRemainingTime());
      setPauseTime(NEVER);
    }
  }, [getRemainingTime, isPaused, isStarted, pauseTime, periodElapsedPauseTime, totalElapsedPauseTime])

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (options.delay && !isPaused() && isStarted()) {
      if (now >= nextFireTime) {
        options.callback();
        setPeriodElapsedPauseTime(0);
        if (!options.runOnce) {
          const newFireTime = Math.max(now, nextFireTime + options.delay);
          setNextFireTime(newFireTime);
          timeout = setTimeout(() => {
            setCheckTime(new Date().getTime());
          }, Math.max(newFireTime - new Date().getTime(), 1));
        } else {
          stop();
        }
      } else if (nextFireTime < NEVER) {
        timeout = setTimeout(() => {
          setCheckTime(new Date().getTime());
        }, Math.max(nextFireTime - new Date().getTime(), 1));
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [now, nextFireTime, options.runOnce, options.delay, pauseTime, stop, isPaused, options, isStarted])

  React.useEffect(() => {
    if (firstRun) {
      setFirstRun(false);
      if (options.startImmediately) {
        start();
      }
    }
  }, [firstRun, options.startImmediately, start]);

  return {
    pause,
    resume,
    stop,
    getRemainingTime,   // needed for timer
    getElapsedRunningTime,    // needed for stopwatch
  }
}
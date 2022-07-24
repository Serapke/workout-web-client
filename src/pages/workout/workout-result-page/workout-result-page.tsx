import * as React from "react";
import { Box, Typography } from '@material-ui/core';
import { Emotion, WorkoutHistory } from 'services/types';
import { getWorkoutHistory, updateWorkoutEmotion } from 'services/workout-history';
import EmotionSelector from './components/emotion-selector';
import TaskHistoryList from './components/task-history-list';
import { useParams } from "react-router";

type AllProps = {};

const durationToString = (duration: number) => {
  if (!duration) return "";
  return new Date(duration * 1000).toISOString().substr(11, 8);
}

const WorkoutResultStatistics = ({ duration }: { duration: number }) => {
  return (
    <Box display="flex" justifyContent="space-between" width="100%" py={3}>
      <Typography variant="h5">Time</Typography>
      <Typography variant="h5">{durationToString(duration)}</Typography>
    </Box>
  )
}

const WorkoutResultPage: React.FunctionComponent<AllProps> = () => {
  const [result, updateResult] = React.useState<WorkoutHistory>();
  const { resultId } = useParams();

  React.useEffect(() => {
    getWorkoutHistory(resultId)
      .then((history) => updateResult(history))
      .catch(ex => console.log(ex));
  }, [resultId]);

  if (!result) return <div/>;

  const onEmotionClick = (emotion: Emotion) => {
    if (result.emotion) {
      return;
    }

    updateWorkoutEmotion(+resultId, emotion);
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4">Results</Typography>
      <WorkoutResultStatistics duration={result.duration}/>
      <EmotionSelector emotion={result.emotion} onEmotionClick={onEmotionClick}/>
      <TaskHistoryList tasks={result.tasks}/>
    </Box>
  )
}

export default WorkoutResultPage;
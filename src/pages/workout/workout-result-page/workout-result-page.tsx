import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom"
import { Typography, Box } from '@material-ui/core';
import { WorkoutHistory, Emotion } from 'services/types';
import { getWorkoutHistory, updateWorkoutEmotion } from 'services/workout-history';
import EmotionSelector from './components/emotion-selector';
import TaskHistoryList from './components/task-history-list';

interface RouteParams {
  id: string;
  result_id: string;
}

type AllProps = RouteComponentProps<RouteParams>;

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

const WorkoutResultPage: React.FunctionComponent<AllProps> = ({ match, history }) => {
  const [result, updateResult] = React.useState<WorkoutHistory>();

  React.useEffect(() => {
    getWorkoutHistory(match.params.result_id)
      .then((history) => updateResult(history))
      .catch(ex => console.log(ex));
  }, [match.params.result_id]);

  if (!result) return <div></div>;

  const onEmotionClick = (emotion: Emotion) => {
    if (result.emotion) return;

    updateWorkoutEmotion(+match.params.result_id, emotion);
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4">Results</Typography>
      <WorkoutResultStatistics duration={result.duration} />
      <EmotionSelector emotion={result.emotion} onEmotionClick={onEmotionClick} />
      <TaskHistoryList tasks={result.tasks} />
    </Box>
  )
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutResultPage);
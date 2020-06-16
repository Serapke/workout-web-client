import * as React from "react";
import { connect } from "react-redux";
import { Routine, Workout } from "../../store/types";
import { fetchRoutinesRequest, fetchWorkoutsRequest } from "../../store/content/thunks";
import SliderSection, { ItemType } from "../../components/slider/slider-section";
import { ApplicationState } from "../../store";

interface PropsFromState {
  routines: Routine[];
  workouts: Workout[];
}

interface PropsFromDispatch {
  fetchRoutines: typeof fetchRoutinesRequest;
  fetchWorkouts: typeof fetchWorkoutsRequest;
}

interface OwnProps { }

type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

const FavoritesPage: React.FunctionComponent<AllProps> = ({ routines, workouts, fetchRoutines, fetchWorkouts }) => {
  React.useEffect(() => {
    fetchRoutines();
    fetchWorkouts();
  }, [fetchRoutines, fetchWorkouts]);
  return (
    <div>
      <SliderSection
        title="Plans"
        addHref="/plan/create"
        addTitle="+ NEW PLAN"
        items={routines}
        type={ItemType.ROUTINE}
      />
      <SliderSection
        title="Workouts"
        addHref="/workout/create"
        addTitle="+ NEW WORKOUT"
        items={workouts}
        type={ItemType.WORKOUT}
      />
    </div>
  );
};

const mapStateToProps = ({ content }: ApplicationState) => ({
  routines: content.routines,
  workouts: content.workouts,
});

const mapDispatchToProps = {
  fetchRoutines: fetchRoutinesRequest,
  fetchWorkouts: fetchWorkoutsRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);

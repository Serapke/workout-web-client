import * as React from "react";
import SliderSection, { ItemType } from "../../components/slider/slider-section";
import { useHandleRoutinesDataRequest } from "../../hooks/use-handle-routines-data-request";
import { useHandleWorkoutsDataRequest } from "../../hooks/use-handle-workouts-data-request";

const FavoritesPage = () => {
  const routinesRequestState = useHandleRoutinesDataRequest();
  const workoutsRequestState = useHandleWorkoutsDataRequest();

  return (
    <div>
      <SliderSection
        title="Plans"
        addHref="/plan/create"
        addTitle="+ NEW PLAN"
        items={routinesRequestState.routines}
        type={ItemType.ROUTINE}
      />
      <SliderSection
        title="Workouts"
        addHref="/workout/create"
        addTitle="+ NEW WORKOUT"
        items={workoutsRequestState.workouts}
        type={ItemType.WORKOUT}
      />
    </div>
  );
};

export default FavoritesPage;

import { Reducer } from "redux";
import { ActiveItemState, ActiveItemActions, ActiveItemActionType } from "./types";
import { updateIdentifiableObjectInArray } from "../../utils/immutable";

export const initialState: ActiveItemState = {
  routine: null,
  workout: null,
};

const reducer: Reducer<ActiveItemState> = (state: ActiveItemState = initialState, action: ActiveItemActions) => {
  switch (action.type) {
    case ActiveItemActionType.WORKOUT_UPDATED:
      return { ...state, workout: action.workout };
    case ActiveItemActionType.TASK_UPDATED:
      return {
        ...state,
        workout: {
          ...state.workout,
          tasks: updateIdentifiableObjectInArray(state.workout.tasks, action.task),
        },
      };
    default:
      return state;
  }
};

export default reducer;

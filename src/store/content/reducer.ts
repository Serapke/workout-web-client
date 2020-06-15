import { Reducer } from "redux";
import { ContentState, ContentActions, ContentActionType } from "./types";

export const initialState: ContentState = {
  routines: [],
  workouts: [],
  exercises: [],
  bodyParts: [],
};

const reducer: Reducer<ContentState> = (state: ContentState = initialState, action: ContentActions) => {
  switch (action.type) {
    case ContentActionType.ROUTINES_LIST_UPDATED:
      return { ...state, routines: action.routines };
    case ContentActionType.WORKOUTS_LIST_UPDATED:
      return { ...state, workouts: action.workouts };
    case ContentActionType.EXERCISE_LIST_UPDATED:
      return { ...state, exercises: action.exercises };
    case ContentActionType.BODY_PART_LIST_UPDATED:
      return { ...state, bodyParts: action.bodyParts };
    default:
      return state;
  }
};

export default reducer;

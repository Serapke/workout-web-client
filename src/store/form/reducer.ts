import { Reducer } from "redux";
import { FormState, FormStateActionType, FormStateActions } from "./types";

export const initialState: FormState = {
  workout: null,
};

const reducer: Reducer<FormState> = (state: FormState = initialState, action: FormStateActions) => {
  switch (action.type) {
    case FormStateActionType.WORKOUT_FORM_SETUP:
      return {
        ...state,
        workout: action.form,
      };
    case FormStateActionType.WORKOUT_FORM_UPDATED:
      return {
        ...state,
        workout: {
          ...state.workout,
          form: {
            ...state.workout.form,
            [action.field.name]: { ...action.field.state },
          },
        },
      };
    default:
      return state;
  }
};

export default reducer;

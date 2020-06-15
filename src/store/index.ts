import { combineReducers, Reducer } from "redux";
import { ContentState } from "./content/types";
import { ActiveItemState } from "./active-item/types";
import { ModalState } from "./modal/types";
import { FormState } from "./form/types";
import contentReducer from "./content/reducer";
import activeItemReducer from "./active-item/reducer";
import modalReducer from "./modal/reducer";
import formReducer from "./form/reducer";

export interface ApplicationState {
  content: ContentState;
  activeItem: ActiveItemState;
  modal: ModalState;
  form: FormState;
}
export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  content: contentReducer,
  activeItem: activeItemReducer,
  modal: modalReducer,
  form: formReducer,
});

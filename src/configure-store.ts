import { createStore, applyMiddleware, Store } from "redux";
import reduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { ApplicationState, reducers } from "./store";

export function configureStore(initialState: ApplicationState): Store<ApplicationState> {
  const composeEnhancers = composeWithDevTools({});
  const middlewares = [reduxThunk];
  return createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middlewares)));
}

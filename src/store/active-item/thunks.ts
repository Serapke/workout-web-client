import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "..";
import { ActiveItemActions } from "./types";

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, ApplicationState, unknown, ActiveItemActions>;

import { Routine} from "../store/types";
import { apiRequest } from "./api-request";
import { ApiResponse } from "./types";

export const getRoutines: () => Promise<Routine[]> = async () => {
  return apiRequest(`routine`).then((response: ApiResponse<MyRoutinesResponse>) => response.data.routines);
};

export interface MyRoutinesResponse {
  routines: Routine[]
}

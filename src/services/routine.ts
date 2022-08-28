import { Routine} from "../store/types";
import { apiRequest } from "./api-request";
import { ApiResponse } from "./types";

export const getRoutines: () => Promise<Routine[]> = async () => {
  return apiRequest(`routine`).then((response: ApiResponse<MyRoutinesResponse>) => response.data.routines);
};

interface MyRoutinesResponse {
  routines: Routine[]
}

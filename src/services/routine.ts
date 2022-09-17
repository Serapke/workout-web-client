import { Routine } from "../store/types";
import { apiRequest } from "./api-request";
import { ApiResponse } from "./types";

export function fetchRoutinesData(): Promise<ApiResponse<MyRoutinesResponse>> {
  return apiRequest(`routine`);
}

export interface MyRoutinesResponse {
  routines: Routine[]
}

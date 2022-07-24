import { Routine } from "../store/types";
import { apiRequest } from "./api-request";

export const getRoutines: () => Promise<Routine[]> = async () => {
  return apiRequest(`routine`);
};

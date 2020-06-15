import { Routine } from "../store/types";

export const getAllRoutines: () => Promise<Routine[]> = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/routine`);
  return response.json();
};

import { MeasurementType, Task } from 'store/types';

export const exerciseMeasurementTypeToLetter = (type: MeasurementType) => {
  return type === MeasurementType.TIMED ? "s" : "x";
}

export const exerciseTypeToWord = (type, reps: number) => {
  let word = type === "TIMED" ? "second" : "rep";
  if (reps === 1) {
    return word;
  } else {
    return word + "s";
  }
}

export function setDraggableId(task: Task, index: number) {
  return { ...task, draggableId: "task_" + index };
}
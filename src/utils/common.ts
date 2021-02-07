export const exerciseTypeToLetter = (type) => {
  return type === "TIMED" ? "s" : "x";
}

export const exerciseTypeToWord = (type, reps: number) => {
  let word = type === "TIMED" ? "second" : "rep";
  if (reps === 1) {
    return word;
  } else {
    return word + "s";
  }
}
export const uniqueArray = (array: string[]) => {
  // @ts-ignore
  return [...new Set(array)];
}
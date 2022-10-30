export function uniqueArray(array: string[]): string[] {
  // @ts-ignore
  return [...new Set(array)];
}
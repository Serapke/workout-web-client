export function isObjectEmpty(object: Record<any, any> | undefined) {
  return !object || Object.keys(object).length === 0;
}

export function isObjectNotEmpty(object: Record<any, any> | undefined) {
  return !isObjectEmpty(object);
}
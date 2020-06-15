export function updateObjectInArray<T>(array: T[], action: { item: T; index: number }) {
  return array.map((item, index) => {
    if (index !== action.index) {
      return item;
    }

    return action.item;
  });
}

interface Identifiable extends Object {
  id: number;
}

export function updateIdentifiableObjectInArray<T extends Identifiable>(array: T[], target: T) {
  return array.map((item) => {
    if (item.id !== target.id) {
      return item;
    }

    return target;
  });
}

export function removeItem<T>(array: T[], action: { index: number }) {
  return [...array.slice(0, action.index), ...array.slice(action.index + 1)];
}

export function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

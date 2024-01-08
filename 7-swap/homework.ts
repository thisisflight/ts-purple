type objectTypeEntering = { [key: string]: number };
type objectTypeExiting = { [key: number]: string };

function swapKeysAndValues<T extends objectTypeEntering>(
  obj: T
): objectTypeExiting {
  const result: objectTypeExiting = {};
  const entries = Object.entries(obj);
  for (const [key, value] of entries) {
    result[value] = key;
  }
  return result;
}

const objToSwap = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
console.log(swapKeysAndValues(objToSwap));

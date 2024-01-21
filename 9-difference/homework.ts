type ExcludeKeys<T, U> = {
  [K in Exclude<keyof T, keyof U>]: T[K];
};

function difference<T, U extends object>(x: T, y: U): ExcludeKeys<T, U> {
  const result = {} as ExcludeKeys<T, U>;
  for (const key in x) {
    if (!(key in y)) {
      Object.assign(result, { [key]: x[key] });
    }
  }
  return result;
}

const a = { a: 5, b: "" },
  b = { a: 10, c: true };
const res = difference(a, b);

interface IUser {
  name: string;
  age: number;
  skills: string[];
}

type possibleKeyType = string | number | symbol;

type pickedProperties<T, K extends keyof T> = { [P in K]: T[P] };

function pickObjectKeys<
  // укажем какой тип ожидаем для T
  T extends Record<possibleKeyType, any>,
  // нас интересуют только существующие в переданном T ключи
  K extends keyof T
>(obj: T, keys: K[]): pickedProperties<T, K> {
  const result: pickedProperties<T, K> = {} as pickedProperties<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

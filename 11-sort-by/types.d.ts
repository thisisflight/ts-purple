declare module "sort-by" {
  export function sortBy<T>(...args: readonly string[]): (a: T, b: T) => number;
}

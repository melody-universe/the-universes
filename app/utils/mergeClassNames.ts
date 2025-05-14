export function mergeClassNames(...classNames: (string | undefined)[]): string {
  return classNames
    .filter((className) => className !== undefined)
    .map((className) => className.trim())
    .filter((className) => className.length > 0)
    .join(" ");
}

export function prefixClassName(prefix: string, className: string): string {
  return className
    .split(/\s+/)
    .map((c) => `${prefix}${c}`)
    .join(" ");
}

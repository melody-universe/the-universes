export type UnionFromTuple<TTuple extends unknown[]> = {
  [Index in keyof TTuple & number]: TTuple[Index];
}[keyof TTuple & number];

import { findInvalid, test } from "./puzzle17.ts";

export function testForSum(numbers: number[], sum: number): number {
  const set: number[] = [];

  for (let i = 0; i < numbers.length; i++) {
    set.push(numbers[i]);
    const result = set.reduce((acc, cur) => acc + cur, 0);
    if (result === sum) {
      return Math.min(...set) + Math.max(...set);
    }
    if (result > sum) {
      return -1;
    }
  }

  return 0;
}

export function findSet(inputNumbers: number[], sum: number): number {
  const numbers = [...inputNumbers];

  while (numbers.length > 0) {
    const result = testForSum(numbers, sum);
    if (result > 0) {
      return result;
    }
    numbers.shift();
  }

  return -1;
}

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");

  const numbers = puzzle
    .split("\n")
    .filter(Boolean)
    .map(Number);

  const invalid = findInvalid(
    numbers,
    25,
  );

  console.log(
    findSet(numbers, invalid),
  );
}

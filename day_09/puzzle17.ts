export const test = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
`;

export function getAllCombinations(numbers: number[]): number[] {
  const combinations: number[] = [];

  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      combinations.push(numbers[i] + numbers[j]);
    }
  }

  return combinations;
}

export function findInvalid(
  numbers: number[],
  preambleLength: number,
): number {
  for (let i = 0; i < numbers.length - preambleLength - 1; i++) {
    if (
      !getAllCombinations(numbers.slice(i, i + preambleLength)).includes(
        numbers[i + preambleLength],
      )
    ) {
      return numbers[i + preambleLength];
    }
  }
  return -1;
}

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync('input.txt');

  console.log(
    findInvalid(
      puzzle
        .split("\n")
        .filter(Boolean)
        .map(Number),
      25
    )
  );
}

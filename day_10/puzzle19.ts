export const test = `16
10
15
5
1
11
7
19
6
12
4
`;

interface Diffs {
  [prop: number]: number;
}

export function countDiffs(sortedInput: number[]): Diffs {
  const diffs: Diffs = {};

  const jolts = [...sortedInput]

  const max = Math.max(...jolts)

  jolts.unshift(0)
  jolts.push(max+3)

  for (let i = 1; i < jolts.length; i++) {
    const diff = jolts[i] - jolts[i - 1];
    if (diffs[diff]) {
      diffs[diff]++;
    } else {
      diffs[diff] = 1;
    }
  }

  return diffs;
}

export function testAdapters(diffs: Diffs): number {
  return diffs[1] * diffs[3];
}

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");

  const diffs = countDiffs(
    puzzle
      .split("\n")
      .filter(Boolean)
      .map(Number)
      .sort((a, b) => a - b),
  );
  console.log(diffs);
  console.log(testAdapters(diffs));
}

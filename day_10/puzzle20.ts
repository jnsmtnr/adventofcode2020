const test = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3
`;

export function splitToGroups(input: number[]): number[][] {
  const groups: number[][] = [[]];

  const max = Math.max(...input);

  const sorted = [...input].sort((a, b) => a - b);

  sorted.unshift(0);
  sorted.push(max+3);

  let gi = 0;

  groups[gi].push(sorted[0]);

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1] + 1) {
      groups[gi].push(sorted[i]);
    } else {
      groups.push([]);
      gi++;
      groups[gi].push(sorted[i]);
    }
  }

  return groups;
}

export function getNumberOfCombination(input: number[]): number {
  if (input.length === 1 || input.length === 2) {
    return 1
  }
  if (input.length === 3) {
    return 2
  }
  if (input.length === 4) {
    return 4
  }
  if (input.length === 5) {
    return 7
  }
  return Infinity;
}

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");

  const input = puzzle
    .split("\n")
    .filter(Boolean)
    .map(Number);

  console.log(
    splitToGroups(input)
      .map(getNumberOfCombination)
      .reduce((acc, value) => acc * value, 1)
  );
}

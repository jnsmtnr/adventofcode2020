export const test = `abc

a
b
c

ab
ac

a
a
a
a

b`;

export function splitToGroups(answers: string): string[] {
  return answers
    .split("\n\n")
    .filter(Boolean)
    .map((group) => group.replaceAll("\n", ""));
}

export function groupAnswers(group: string): object {
  const answers: any = {};

  for (const answer of group) {
    if (answers[answer]) {
      answers[answer]++;
    } else {
      answers[answer] = 1;
    }
  }

  return answers;
}

export function countAnswers(answers: any): number {
  return Object.keys(answers).length;
}

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");

  console.log(
    splitToGroups(puzzle)
      .map(groupAnswers)
      .map(countAnswers)
      .reduce((acc, value) => acc + value),
  );
}

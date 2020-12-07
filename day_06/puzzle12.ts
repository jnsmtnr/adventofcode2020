import { test } from "./puzzle11.ts";

export function splitToPeople(answers: string): string[][] {
  return answers
    .split("\n\n")
    .filter(Boolean)
    .map((group) => group.split("\n").filter(Boolean));
}

export function countPeople(group: string[]): number {
  return group.length;
}

export function countAnswers(group: string[]): object {
  const answers: any = {};

  for (const person of group) {
    for (const answer of person) {
      if (answers[answer]) {
        answers[answer]++;
      } else {
        answers[answer] = 1;
      }
    }
  }

  return answers;
}

export function getCommonAnswers(size: number, answers: any): string[] {
  const commonAnswers: string[] = [];

  for (const answer in answers) {
    if (answers[answer] === size) {
      commonAnswers.push(answer);
    }
  }

  return commonAnswers;
}

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");

  console.log(
    splitToPeople(puzzle)
      .map((group) => {
        const size = countPeople(group);
        const answers = countAnswers(group);
        return getCommonAnswers(size, answers);
      })
      .reduce((acc, answers) => acc + answers.length, 0)
  );
}


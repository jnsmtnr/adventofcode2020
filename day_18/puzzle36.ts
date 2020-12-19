import { calcAll } from "./puzzle35.ts";

function calc(input: string): string {
  return input.split(" * ").reduce((acc, cur) => acc * add(cur), 1).toString();
}

function add(input: string): number {
  return input.split(" + ").reduce((acc, cur) => acc + +cur, 0);
}

const puzzle = Deno.readTextFileSync("input.txt").split("\n").filter(Boolean);

const sum = puzzle.reduce((acc, cur) => acc + calcAll(cur, calc), 0);

console.log(sum);

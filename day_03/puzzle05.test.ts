import { assertEquals, assertNotEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";

export const test = [
  "..##.......",
  "#...#...#..",
  ".#....#..#.",
  "..#.#...#.#",
  ".#...##..#.",
  "..#.##.....",
  ".#.#.#....#",
  ".#........#",
  "#.##...#...",
  "#...##....#",
  ".#..#...#.#",
];

import { checkCoordinate, countTrees } from "./puzzle05.ts";

Deno.test("checkCoordinate", () => {
  assertEquals(checkCoordinate(test, 0, 0), ".");
  assertEquals(checkCoordinate(test, 1, 0), "#");
  assertEquals(checkCoordinate(test, 2, 1), "#");
});

Deno.test("countTrees", () => {
  assertEquals(countTrees(test), 7);
  assertNotEquals(countTrees(test), 5);
})

import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { expensesFilter as expensesFilter1 } from './puzzle01.ts';
import { expensesFilter as expensesFilter2 } from './puzzle02.ts';

const testInput = [
  1721,
  979,
  366,
  299,
  675,
  1456,
];

Deno.test("expensesFilter function from puzzle01.ts", () => {
  const testAnswer = expensesFilter1(testInput);

  assertEquals(testAnswer, 514579);
});

Deno.test("expensesFilter function from puzzle02.ts", () => {
  const testAnswer = expensesFilter2(testInput);

  assertEquals(testAnswer, 241861950);
});

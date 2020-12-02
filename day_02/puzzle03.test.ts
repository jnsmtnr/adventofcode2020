import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { lineSplitter, pwdChecker, validPwdSearcher } from "./puzzle03.ts";

const testInput = [
  "1-3 a: abcde",
  "1-3 b: cdefg",
  "2-9 c: ccccccccc",
];

Deno.test("lineSplitter function", () => {
  assertEquals(
    lineSplitter(testInput[0]),
    {
      password: "abcde",
      policy: {
        max: 3,
        min: 1,
        char: "a",
      },
    },
  );
});

Deno.test("pwdChecker function", () => {
  assertEquals(
    pwdChecker(lineSplitter(testInput[0])),
    true,
  );

  assertEquals(
    pwdChecker(lineSplitter(testInput[1])),
    false,
  );

  assertEquals(
    pwdChecker(lineSplitter(testInput[2])),
    true,
  );
});

Deno.test("validPwdSearcher function", () => {
  assertEquals(validPwdSearcher(testInput), 2);
});

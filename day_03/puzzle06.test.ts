import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";

import { test } from "./puzzle05.test.ts";

import {
  countTreesOnEveryTrack,
  countTreesOnTrack,
  tracks,
} from "./puzzle06.ts";

Deno.test("countTreesOnTrack", () => {
  assertEquals(countTreesOnTrack(test, tracks[0].x, tracks[0].y), 2);
});

Deno.test("countTreesOnEveryTrack", () => {
  assertEquals(countTreesOnEveryTrack(test, tracks), 336);
});

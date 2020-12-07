import { getSeatId } from "./puzzle09.ts";

export function getAllSeatIds(seats: string[]): number[] {
  const ids: number[] = [];

  for (const seat of seats) {
    ids.push(getSeatId(seat));
  }

  return ids;
}

export function getMySeatId(seats: string[]): number {
  const ids = getAllSeatIds(seats);
  const prevId = ids.sort((a, b) => a - b).find((id, index) =>
    id + 2 === ids[index + 1]
  );
  return prevId ? prevId + 1 : -1;
}

if (import.meta.main) {
  const puzzle = Deno
    .readTextFileSync("input.txt")
    .split("\n")
    .filter(Boolean);

  console.log(getMySeatId(puzzle));
}

const test = "FBFBBFFRLR";

export function findRow(input: string): number {
  let min = 0;
  let max = 127;

  for (const l of input) {
    const range = max - min + 1;
    if (l === "F") {
      max = max - range / 2;
    } else {
      min = min + range / 2;
    }
  }

  return min;
}

export function findCol(input: string): number {
  let min = 0;
  let max = 7;

  for (const l of input) {
    const range = max - min + 1;
    if (l === "L") {
      max = max - range / 2;
    } else {
      min = min + range / 2;
    }
  }

  return min;
}

export function calcSeatId(row: number, col: number): number {
  return row * 8 + col;
}

export function getSeatId(seat: string): number {
  const row = findRow(seat.slice(0, 7));
  const col = findCol(seat.slice(7));
  const id = calcSeatId(row, col);

  return id;
}

export function findHighestSeatId(seats: string[]): number {
  let highestSeatId = 0;

  for (const seat of seats) {
    const row = findRow(seat.slice(0, 7));
    const col = findCol(seat.slice(7));
    const id = calcSeatId(row, col);
    if (id > highestSeatId) {
      highestSeatId = id;
    }
  }

  return highestSeatId;
}

if (import.meta.main) {
  const puzzle = Deno
    .readTextFileSync("input.txt")
    .split("\n")
    .filter(Boolean);

  console.log(findHighestSeatId(puzzle));
}

import { getRowLength, getRowNumber, mapSeats, SeatMap, simulate, test } from "./puzzle21.ts";

export function checkDirection(
  seats: SeatMap,
  x: number,
  y: number,
  dx: number,
  dy: number,
): boolean {
  for (let i = 1; i < Infinity; i++) {
    const seat = seats[`${x + i * dx}/${y + i * dy}`];
    if (seat === "L" || !seat) return false;
    if (seat === "#") return true;
  }
  return false;
}

export function countOccupiedSeats(
  seats: SeatMap,
  x: number,
  y: number,
): number {
  let occupied = 0;

  checkDirection(seats, x, y, -1, -1) && occupied++;
  checkDirection(seats, x, y, 0, -1) && occupied++;
  checkDirection(seats, x, y, 1, -1) && occupied++;
  checkDirection(seats, x, y, 1, 0) && occupied++;
  checkDirection(seats, x, y, 1, 1) && occupied++;
  checkDirection(seats, x, y, 0, 1) && occupied++;
  checkDirection(seats, x, y, -1, 1) && occupied++;
  checkDirection(seats, x, y, -1, 0) && occupied++;

  return occupied;
}

export function changeSeat(seats: SeatMap, x: number, y: number) {
  if (seats[`${x}/${y}`] === 'L') {
    return countOccupiedSeats(seats, x, y) === 0 ? '#' : 'L';
  } else if (seats[`${x}/${y}`] === '#') {
    return countOccupiedSeats(seats, x, y) < 5 ? '#' : 'L';
  }

  return '.';
}

if (import.meta.main) {
  const start = new Date();
  const puzzle = Deno.readTextFileSync("input.txt");

  const rowNumber = getRowNumber(puzzle);
  const rowLength = getRowLength(puzzle);
  const seats = mapSeats(puzzle, rowLength);

  console.log(simulate(seats, rowNumber, rowLength, changeSeat));
  const end = new Date();
  console.log(end.getTime() - start.getTime());
}

export const test = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
`;

export interface SeatMap {
  [prop: string]: string;
}

export function getRowLength(input: string): number {
  return input.split("\n")[0].length;
}

export function getRowNumber(input: string): number {
  return input.split("\n").filter(Boolean).length;
}

export function getCoordKey(i: number, length: number): string {
  return `${i % length}/${Math.floor(i / length)}`;
}

export function mapSeats(input: string, length: number): SeatMap {
  const seats: SeatMap = {};

  const seatsString = input.replaceAll("\n", "");

  for (let i = 0; i < seatsString.length; i++) {
    const coord = getCoordKey(i, length);

    seats[coord] = seatsString[i];
  }

  return seats;
}

export function changeSeat(seats: SeatMap, x: number, y: number) {
  if (seats[`${x}/${y}`] === "L") {
    if (
      seats[`${x - 1}/${y + 1}`] !== "#" &&
      seats[`${x}/${y + 1}`] !== "#" &&
      seats[`${x + 1}/${y + 1}`] !== "#" &&
      seats[`${x - 1}/${y}`] !== "#" &&
      seats[`${x + 1}/${y}`] !== "#" &&
      seats[`${x - 1}/${y - 1}`] !== "#" &&
      seats[`${x}/${y - 1}`] !== "#" &&
      seats[`${x + 1}/${y - 1}`] !== "#"
    ) {
      return "#";
    } else {
      return "L";
    }
  } else if (seats[`${x}/${y}`] === "#") {
    let occupied = 0;
    if (seats[`${x - 1}/${y + 1}`] === "#") occupied++;
    if (seats[`${x}/${y + 1}`] === "#") occupied++;
    if (seats[`${x + 1}/${y + 1}`] === "#") occupied++;
    if (seats[`${x - 1}/${y}`] === "#") occupied++;
    if (seats[`${x + 1}/${y}`] === "#") occupied++;
    if (seats[`${x - 1}/${y - 1}`] === "#") occupied++;
    if (seats[`${x}/${y - 1}`] === "#") occupied++;
    if (seats[`${x + 1}/${y - 1}`] === "#") occupied++;

    return occupied < 4 ? "#" : "L";
  }

  return ".";
}

export function simulate(
  seats: SeatMap,
  rowsNumber: number,
  rowLength: number,
  seatChanger: Function
) {
  let changed = true;

  let oldSeats = { ...seats };

  while (changed) {
    changed = false;

    const newSeats: SeatMap = {};

    for (let x = 0; x < rowLength; x++) {
      for (let y = 0; y < rowsNumber; y++) {
        const oldSeat = oldSeats[`${x}/${y}`]
        const newSeat = seatChanger(oldSeats, x, y);
        if (oldSeat !== newSeat) {
          changed = true;
        }
        newSeats[`${x}/${y}`] = newSeat;
      }
    }

    oldSeats = { ...newSeats }
  }

  return Object.values(oldSeats).reduce((acc, seat) => acc + (seat === '#' ? 1 : 0), 0);
}

if (import.meta.main) {
  const start = new Date()
  const puzzle = Deno.readTextFileSync("input.txt")

  const rowNumber = getRowNumber(puzzle);
  const rowLength = getRowLength(puzzle);

  const seats = mapSeats(puzzle, rowLength);

  console.log(simulate(seats, rowNumber, rowLength, changeSeat));
  const end = new Date()
  console.log(end.getTime() - start.getTime());
}

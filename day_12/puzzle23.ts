export const test = `F10
N3
F7
R90
F11`;

export interface Command {
  direction: string;
  distance: number;
}

export interface Position {
  x: number;
  y: number;
  direction?: string;
}

export function move(command: Command, position: Position): void {
  if (
    command.direction === "N" ||
    (command.direction === "F" && position.direction === "N")
  ) {
    position.y += command.distance;
  } else if (
    command.direction === "E" ||
    (command.direction === "F" && position.direction === "E")
  ) {
    position.x += command.distance;
  } else if (
    command.direction === "S" ||
    (command.direction === "F" && position.direction === "S")
  ) {
    position.y -= command.distance;
  } else if (
    command.direction === "W" ||
    (command.direction === "F" && position.direction === "W")
  ) {
    position.x -= command.distance;
  } else {
    throw new Error(
      "invalid move direction: " + command.direction + " " + position.direction,
    );
  }
}

export function newIndex(oldIndex: number, diff: number): number {
  const newIndex = oldIndex + diff
  if (newIndex > 3) {
    return newIndex - 4
  } else if (newIndex < 0) {
    return newIndex + 4
  } else {
    return newIndex
  }
}

export function rotate(command: Command, position: Position): void {
  const directions = ["N", "E", "S", "W"];

  const index = directions.indexOf(position.direction!);

  if (command.direction === "R") {
    position.direction = directions[newIndex(index, command.distance / 90)];
  } else if (command.direction === "L") {
    position.direction = directions[newIndex(index, -command.distance / 90)];
  } else {
    throw new Error("invalid rotate direction: " + command.direction);
  }
}

export function run(commands: Command[]): Position {
  const position: Position = {
    x: 0,
    y: 0,
    direction: "E",
  };

  for (const command of commands) {
    switch (command.direction) {
      case "N":
      case "S":
      case "W":
      case "E":
      case "F":
        move(command, position);
        console.log("after move", position);
        break;
      case "L":
      case "R":
        rotate(command, position);
        console.log("after rotate", position);
        break;
      default:
        throw new Error("invalid command: " + command.direction);
    }
  }

  return position;
}

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");

  const commands = puzzle
    .split("\n")
    .filter(Boolean)
    .map((command) => ({
      direction: command[0],
      distance: +command.slice(1),
    }));

  console.log(run(commands));
}

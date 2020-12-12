import { Command, Position, test } from "./puzzle23.ts";

export function moveWaypoint(command: Command, position: Position): Position {
  const waypoint = { ...position };

  switch (command.direction) {
    case "N":
      waypoint.y += command.distance;
      break;
    case "S":
      waypoint.y -= command.distance;
      break;
    case "E":
      waypoint.x += command.distance;
      break;
    case "W":
      waypoint.x -= command.distance;
      break;
    default:
      throw new Error("invalid move waypoint command");
  }
  return waypoint;
}

export function rotateWaypoint(command: Command, position: Position): Position {
  switch (`${command.direction}${command.distance}`) {
    case "R90":
    case "L270":
      return {
        x: +position.y,
        y: -position.x,
      };
    case "L90":
    case "R270":
      return {
        x: -position.y,
        y: +position.x,
      };
    case "L180":
    case "R180":
      return {
        x: -position.x,
        y: -position.y,
      };
    default:
      throw new Error("invalid rotate waypoint command");
  }
}

export function moveShip(
  command: Command,
  position: Position,
  waypoint: Position,
): Position {
  const { distance } = command;
  return {
    x: position.x + waypoint.x * distance,
    y: position.y + waypoint.y * distance,
  };
}

export function run(commands: Command[]): Position {
  let position: Position = {
    x: 0,
    y: 0,
  };
  let waypoint: Position = {
    x: 10,
    y: 1,
  };

  for (const command of commands) {
    if (
      command.direction === "N" || command.direction === "S" ||
      command.direction === "E" || command.direction === "W"
    ) {
      waypoint = moveWaypoint(command, waypoint);
    } else if (
      command.direction === "R" || command.direction === "L"
    ) {
      waypoint = rotateWaypoint(command, waypoint);
    } else if (command.direction === "F") {
      position = moveShip(command, position, waypoint);
    } else {
      throw new Error("invalid command");
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

  const position = run(commands);

  console.log(Math.abs(position.x)+Math.abs(position.y));
}

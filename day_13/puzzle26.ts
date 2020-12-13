const test1 = `17,x,13,19`; // 3417
const test2 = `67,7,59,61`; // 754018
const test3 = `1789,37,47,1889`;

interface Bus {
  id: number;
  dt: number;
}

export function getBuses(input: string): Bus[] {
  return input
    .split(",")
    .map((bus, i) => {
      if (bus === "x") {
        return {
          id: 0,
          dt: 0,
        };
      }
      return {
        id: +bus,
        dt: i,
      };
    })
    .filter((bus) => bus.id);
}

export function getStartStamp(bus1: Bus, bus2: Bus): number {
  for (let i = 0; i < Infinity; i++) {
    if ((i + bus1.dt) % bus1.id === 0 && (i + bus2.dt) % bus2.id === 0) {
      return i;
    }
  }

  return -1;
}

export function getTimestamp(buses: Bus[], start: number, di: number): number {
  for (let i = start; i < Infinity; i += di) {
    let good = true;
    for (let x = 0; x < buses.length; x++) {
      if ((i + buses[x].dt) % buses[x].id !== 0) {
        good = false;
        break;
      }
    }
    if (good) {
      return i;
    }
  }

  return -1;
}

if (import.meta.main) {
  const puzzle = Deno
    .readTextFileSync("robi.txt")
    .split("\n")[1];

  const buses = getBuses(puzzle).sort((a, b) => b.id - a.id);

  // console.log(buses);

  const start = getStartStamp(buses[0], buses[1]);
  console.log("start:", start);

  const di = buses[0].id * buses[1].id;
  console.log("di:", di);

  console.log(
    getTimestamp(buses, start, di),
  );
}

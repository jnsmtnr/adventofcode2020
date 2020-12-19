export interface Space {
  [p: string]: boolean;
}

export interface Coords {
  x: number;
  y: number;
  z: number;
  w?: number;
}

export interface BoundingCoords {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
  zmin: number;
  zmax: number;
  wmin?: number;
  wmax?: number;
}

export function getCoords(coords: string): Coords {
  return {
    x: +coords.split("/")[0],
    y: +coords.split("/")[1],
    z: +coords.split("/")[2],
    w: coords.split("/")[3] ? +coords.split("/")[3] : undefined,
  };
}

export function toCoords(x: number, y: number, z: number, w?: number): string {
  if (w !== undefined) {
    return `${x}/${y}/${z}/${w}`;
  } else {
    return `${x}/${y}/${z}`;
  }
}

function mapInitialState(input: string): Space {
  const state: Space = {};

  const rows = input.split("\n").filter(Boolean);

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (rows[y][x] === "#") {
        state[toCoords(x, y, 0)] = true;
      }
    }
  }

  return state;
}

function countActiveNeighbors(state: Space, coords: string): number {
  const { x, y, z } = getCoords(coords);

  let active = 0;

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (
          state[toCoords(x + dx, y + dy, z + dz)] &&
          !(dx === 0 && dy === 0 && dz === 0)
        ) {
          active++;
        }
      }
    }
  }

  return active;
}

export function changeCube(state: Space, coords: string): boolean {
  if (state[coords]) {
    return countActiveNeighbors(state, coords) === 3 ||
      countActiveNeighbors(state, coords) === 2;
  } else {
    return countActiveNeighbors(state, coords) === 3;
  }
}

function getBoundingCoords(state: Space): BoundingCoords {
  const boundingCoords = {
    xmin: 0,
    xmax: 0,
    ymin: 0,
    ymax: 0,
    zmin: 0,
    zmax: 0,
  };

  for (const coords in state) {
    if (state[coords]) {
      const { x, y, z, w } = getCoords(coords);
      if (x < boundingCoords.xmin) boundingCoords.xmin = x;
      if (x > boundingCoords.xmax) boundingCoords.xmax = x;
      if (y < boundingCoords.ymin) boundingCoords.ymin = y;
      if (y > boundingCoords.ymax) boundingCoords.ymax = y;
      if (z < boundingCoords.zmin) boundingCoords.zmin = z;
      if (z > boundingCoords.zmax) boundingCoords.zmax = z;
    }
  }

  return boundingCoords;
}

function cycle(state: Space): Space {
  const newState: Space = {};
  const { xmin, xmax, ymin, ymax, zmin, zmax } = getBoundingCoords(state);

  for (let x = xmin - 1; x <= xmax + 1; x++) {
    for (let y = ymin - 1; y <= ymax + 1; y++) {
      for (let z = zmin - 1; z <= zmax + 1; z++) {
        newState[toCoords(x, y, z)] = changeCube(state, toCoords(x, y, z));
      }
    }
  }

  return newState;
}

function boot(initialState: Space): Space {
  let state = { ...initialState };

  for (let i = 0; i < 6; i++) {
    state = cycle(state);
  }

  return state;
}

export function countActiveCubes(state: Space): number {
  return Object.values(state).filter(Boolean).length;
}

export const test = `
.#.
..#
###
`;

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");

  const initialState = mapInitialState(puzzle);

  console.log(
    countActiveCubes(
      boot(initialState),
    ),
  );
}

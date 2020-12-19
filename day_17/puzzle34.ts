import {
  BoundingCoords,
  countActiveCubes,
  getCoords,
  Space,
  test,
  toCoords,
} from "./puzzle33.ts";

function mapInitialState(input: string): Space {
  const state: Space = {};

  const rows = input.split("\n").filter(Boolean);

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (rows[y][x] === "#") {
        state[toCoords(x, y, 0, 0)] = true;
      }
    }
  }

  return state;
}

function countActiveNeighbors(state: Space, coords: string): number {
  const { x, y, z, w } = getCoords(coords);

  let active = 0;

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        for (let dw = -1; dw <= 1; dw++) {
          if (
            state[toCoords(x + dx, y + dy, z + dz, w! + dw)] &&
            !(dx === 0 && dy === 0 && dz === 0 && dw === 0)
          ) {
            active++;
          }
        }
      }
    }
  }

  return active;
}

function changeCube(state: Space, coords: string): boolean {
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
    wmin: 0,
    wmax: 0,
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
      if (w! < boundingCoords.wmin) boundingCoords.wmin = w!;
      if (w! > boundingCoords.wmax) boundingCoords.wmax = w!;
    }
  }

  return boundingCoords;
}

export function cycle(state: Space): Space {
  const newState: Space = {};
  const { xmin, xmax, ymin, ymax, zmin, zmax, wmin, wmax } = getBoundingCoords(
    state,
  );

  for (let x = xmin - 1; x <= xmax + 1; x++) {
    for (let y = ymin - 1; y <= ymax + 1; y++) {
      for (let z = zmin - 1; z <= zmax + 1; z++) {
        for (let w = wmin! - 1; w <= wmax! + 1; w++) {
          newState[toCoords(x, y, z, w)] = changeCube(
            state,
            toCoords(x, y, z, w),
          );
        }
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

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");

  const initialState = mapInitialState(puzzle);

  console.log(
    countActiveCubes(
      boot(initialState),
    ),
  );
}

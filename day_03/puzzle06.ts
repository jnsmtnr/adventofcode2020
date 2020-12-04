import { checkCoordinate } from './puzzle05.ts';

export function countTreesOnTrack(map: Array<string>, x: number, y: number) {
  let totalTrees = 0;

  for (let i = 0; i < map.length; i += y) {
    if (checkCoordinate(map, i, i * x) === '#') {
      totalTrees++
    }
  }

  return totalTrees;
}

interface Track {
  x: number,
  y: number
}

export const tracks: Array<Track> = [
  { x: 1, y: 1},
  { x: 3, y: 1},
  { x: 5, y: 1},
  { x: 7, y: 1},
  { x: 0.5, y: 2},
]

export function countTreesOnEveryTrack(map: Array<string>, tracks: Array<Track>): number {
  let totalTrees = 1;

  tracks.forEach(track => {
    totalTrees *= countTreesOnTrack(map, track.x, track.y);
  })

  return totalTrees;
}

if (import.meta.main) {
  const puzzle = Deno
    .readTextFileSync('input.txt')
    .split('\n')
    .filter(Boolean)
  
  console.log(countTreesOnEveryTrack(puzzle, tracks));
}

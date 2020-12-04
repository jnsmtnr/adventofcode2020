export function checkCoordinate(map: Array<string>, row: number, col: number): string {
  const offset = map[0].length;

  return map[row][col % offset];
}

export function countTrees(map: Array<string>): number {
  let totalTrees = 0;

  for (let i = 0; i < map.length; i++) {
    if (checkCoordinate(map, i, i * 3) === '#') {
      totalTrees++
    }
  }

  return totalTrees;
}

if (import.meta.main) {
  const puzzle = Deno
    .readTextFileSync('input.txt')
    .split('\n')
    .filter(Boolean)
  
  console.log(countTrees(puzzle));
}

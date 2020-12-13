export const test = `939
7,13,x,x,59,x,31,19
`;

export function analyzeInput(input: string): { depart: number, buses: number[]} {
  const splitted = input.split('\n').filter(Boolean)

  return {
    depart: +splitted[0],
    buses: splitted[1].split(',').filter(bus => bus !== 'x').map(Number)
  }
}

export function findEarliest(buses: number[], depart: number): number {
  const earliest = {
    wait: Infinity,
    id: 0
  }

  for (const bus of buses) {
    const departIn = Math.ceil(depart / bus) * bus - depart;
    if (departIn < earliest.wait) {
      earliest.wait = departIn;
      earliest.id = bus
    }
  }

  return earliest.wait * earliest.id
}

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");

  const { depart, buses } = analyzeInput(puzzle);

  console.log(findEarliest(buses, depart));
}
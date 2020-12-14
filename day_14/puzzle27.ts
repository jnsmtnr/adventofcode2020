export interface Mask {
  [prop: number]: string;
}

export interface Write {
  address: number;
  value: number;
}

export interface Memory {
  [props: number]: number;
}

export function getMask(input: string): Mask {
  const mask: Mask = {};

  for (let i = 0; i < input.length; i++) {
    if (input[i] !== "X") {
      mask[i] = input[i];
    }
  }

  return mask;
}

export function applyMask(mask: Mask, bin: string): string {
  const binArray = bin.split("");

  for (const bit in mask) {
    binArray[bit] = mask[bit];
  }

  return binArray.join("");
}

export function decToBin(input: number): string {
  const zeros = "000000000000000000000000000000000000";
  const bin = input.toString(2);
  return zeros.slice(bin.length) + bin;
}

export function init(program: Array<Mask | Write>): Memory {
  const memory: Memory = {};
  let mask: Mask = {};

  for (const line of program) {
    if (line.hasOwnProperty("address")) {
      const { address, value } = line as Write;
      const bin = decToBin(value);
      memory[address] = parseInt(applyMask(mask, bin), 2);
    } else {
      mask = line as Mask;
    }
  }

  return memory;
}

export function testMemory(memory: Memory): number {
  return Object.values(memory).reduce((acc, cur) => acc + cur, 0);
}

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");

  const program = puzzle.split("\n").filter(Boolean).map((line) => {
    if (line.includes("mask")) {
      return getMask(line.split(" = ")[1]);
    } else {
      const splitted = line.split(" = ");
      return {
        address: +splitted[0].replace("mem[", "").replace("]", ""),
        value: +splitted[1],
      };
    }
  });

  const memory = init(program);

  console.log(testMemory(memory));
}

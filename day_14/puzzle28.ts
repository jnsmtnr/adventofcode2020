import { decToBin, Mask, Memory, testMemory, Write } from "./puzzle27.ts";

export function getMask(input: string): Mask {
  const mask: Mask = {};

  for (let i = 0; i < input.length; i++) {
    mask[i] = input[i];
  }

  return mask;
}

export function applyMask(mask: Mask, bin: string): string {
  const binArray = bin.split('');

  for (const bit in mask) {
    if (mask[bit] !== '0') {
      binArray[bit] = mask[bit];
    }
  }

  return binArray.join('');
}

export function getAddresses(maskedAddress: string): string[] {
  let run = true;
  let addresses: string[] = [maskedAddress];

  while (run) {
    run = false;
    const newAddresses: string[] = [];
    for (const address of addresses) {
      if (address.includes('X')) {
        newAddresses.push(address.replace('X', '0'));
        newAddresses.push(address.replace('X', '1'));
      }
    }
    if (newAddresses.length > 0) {
      run = true;
      addresses = newAddresses;
    }
  }

  return addresses;
}

export function init(program: Array<Mask | Write>): Memory {
  const memory: Memory = {};
  let mask: Mask = {};

  for (const line of program) {
    if (line.hasOwnProperty('address')) {
      const { address, value } = line as Write;
      const maskedAddress = applyMask(mask, decToBin(address));
      const addresses = getAddresses(maskedAddress).map(address => parseInt(address, 2));
      for (const addr of addresses) {
        memory[addr] = value;
      }
    } else {
      mask = line as Mask;
    }
  }

  return memory;
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
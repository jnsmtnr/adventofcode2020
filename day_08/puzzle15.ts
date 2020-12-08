export const test = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`;

export interface Inst {
  command: string;
  value: number;
}

export function readInstruction(inst: string): Inst {
  return {
    command: inst.split(" ")[0],
    value: parseInt(inst.split(" ")[1]),
  };
}

export function runInstructions(
  insts: Inst[],
): { success: boolean; acc: number } {
  let acc = 0;
  let index = 0;
  const executed: { [prop: number]: boolean } = {};

  while (!executed[index]) {
    if (index === insts.length) {
      return { success: true, acc };
    } else if (insts[index].command === "acc") {
      acc += insts[index].value;
      executed[index] = true;
      index++;
    } else if (insts[index].command === "jmp") {
      executed[index] = true;
      index += insts[index].value;
    } else {
      executed[index] = true;
      index++;
    }
  }

  return { success: false, acc };
}

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");

  const instructions = puzzle.split("\n").filter(Boolean).map(readInstruction);

  console.log(runInstructions(instructions));
}

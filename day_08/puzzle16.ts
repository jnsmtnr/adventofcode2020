import { Inst, readInstruction, runInstructions, test } from "./puzzle15.ts";

export function changeInstruction(inst: Inst): Inst {
  let { command, value } = inst;

  if (command === "jmp") {
    command = "nop";
  } else if (command === "nop") {
    command = "jmp";
  }

  return {
    value,
    command,
  };
}

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");

  const instructions = puzzle.split("\n").filter(Boolean).map(readInstruction);
  
  console.log(
    instructions
      .map((inst, index, insts) => {
        const newInsts = [...insts];
        newInsts[index] = changeInstruction(inst);
  
        return runInstructions(newInsts);
      })
      .filter(result => result.success),
  );
}


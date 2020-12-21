import { getRules, getMessages, generate } from './puzzle37.ts';

function splitMessage(message: string, size: number): string[] {
  const result: string[] = [];

  for (let i = 0; i < message.length; i += size) {
    result.push(message.slice(i, i+size));
  }

  return result;
}

function testChunks(message: string, vars1: string[], vars2: string[]): string[] {
  const chunks = splitMessage(message, vars1[0].length);

  return chunks.map((chunk) => {
    if (vars1.includes(chunk)) return "a";
    if (vars2.includes(chunk)) return "b";
    return "x"
  })
}

function testMessage(message: string, vars1: string[], vars2: string[]): boolean {
  const chunks = testChunks(message, vars1, vars2);

  let a = 0;
  let b = 0;

  for (let i = 0; i < chunks.length; i++) {
    if (chunks[i] === "a" && chunks[i-1] === "b") return false;
    if (chunks[i] === "x") return false;
    if (chunks[i] === "a") a++;
    if (chunks[i] === "b") b++;
  }

  return a > b && b > 0;
}

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");
  
  const rules = getRules(puzzle);
  const messages = getMessages(puzzle);
  
  const variations42 = generate(rules, '42');
  const variations31 = generate(rules, '31');
  
  const valid = messages.filter(message => testMessage(message, variations42, variations31));
  
  console.log(valid.length);
}

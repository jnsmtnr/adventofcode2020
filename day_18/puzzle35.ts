function calc(input: string): string {
  const left: Array<number | string> = input.split(" ");
  let result = +left.shift()!;

  while (left.length > 0) {
    const operator = left.shift();
    const value = +left.shift()!;
    if (operator === "+") {
      result = result += value;
    } else {
      result = result *= value;
    }
  }

  return result.toString();
}

export function calcAll(input: string, calc: Function): number {
  let left = input;

  while (left.includes("(")) {
    let start = 0;
    let end = 0;

    for (let i = 0; i < left.length; i++) {
      if (left[i] === "(") {
        start = i;
      } else if (left[i] === ")") {
        end = i;
        break;
      }
    }

    const sub = left.slice(start, end + 1);
    const subResult = calc(sub.slice(1, -1));
    left = left.replace(sub, subResult);
  }

  return +calc(left);
}

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt").split('\n').filter(Boolean);
  
  const sum = puzzle.reduce((acc, cur) => acc + calcAll(cur, calc), 0);
  
  console.log(sum);
}

export {};

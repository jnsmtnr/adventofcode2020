export function processInput(input: number[]): { [p: number]: number[] } {
  const processed: { [p: number]: number[] } = {};

  for (const index in input) {
    processed[input[+index]] = [+index + 1];
  }

  return processed;
}

export function playGame(input: number[], lastTurn: number) {
  const spoken = processInput(input);

  let last: number = input.slice(-1)[0];
  let turn: number = input.length + 1;

  while (turn <= lastTurn) {
    if (spoken[last].length === 1) {
      last = 0;
      spoken[last].push(turn);
    } else {
      const lastturns = spoken[last].slice(-2);
      last = lastturns[1] - lastturns[0];
      if (spoken[last]) {
        spoken[last].push(turn);
      } else {
        spoken[last] = [turn];
      }
    }
    turn++;
  }
  return last;
}

console.log(playGame([0, 3, 1, 6, 7, 5], 2020));
console.log(playGame([0, 3, 1, 6, 7, 5], 30000000));

interface Processed {
  [p: number]: {
    prev?: number;
    last: number;
  };
}

function processInput(input: number[]): Processed {
  const processed: Processed = {};

  for (const index in input) {
    processed[input[+index]] = { last: +index + 1 };
  }

  return processed;
}

export function playGame(input: number[], lastTurn: number) {
  const spoken = processInput(input);

  let last: number = input.slice(-1)[0];
  let turn: number = input.length + 1;

  while (turn <= lastTurn) {
    if (!spoken[last].prev && spoken[last].last) {
      last = 0;
      spoken[last].prev = spoken[last].last;
      spoken[last].last = turn;
    } else {
      last = spoken[last].last - spoken[last].prev!;
      if (spoken[last]) {
        spoken[last].prev = spoken[last].last
        spoken[last].last = turn;
      } else {
        spoken[last] = {last: turn};
      }
    }
    turn++;
  }
  return last;
}

console.log(playGame([0, 3, 1, 6, 7, 5], 2020));
console.log(playGame([0, 3, 1, 6, 7, 5], 30000000));
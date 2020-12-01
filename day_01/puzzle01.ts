function expensesFilter(expenses: number[]): number {
  for (let i = 0; i < expenses.length; i++) {
    for (let j = i + 1; j < expenses.length; j++) {
      if (expenses[i] + expenses[j] === 2020) {
        return expenses[i] * expenses[j];
      }
    }
  }
  return -1;
}

const puzzleInput = Deno
  .readTextFileSync("input.txt")
  .split("\n")
  .map(Number);

console.log(expensesFilter(puzzleInput));

export {};

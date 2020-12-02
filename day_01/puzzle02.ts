export function expensesFilter(expenses: number[]): number {
  for (let a = 0; a < expenses.length; a++) {
    for (let b = a + 1; b < expenses.length; b++) {
      for (let c = b + 1; c < expenses.length; c++) {
        if (expenses[a] + expenses[b] + expenses[c] === 2020) {
          return expenses[a] * expenses[b] * expenses[c];
        }
      }
    }
  }
  return -1;
}

if (import.meta.main) {
  const puzzleInput = Deno
    .readTextFileSync("input.txt")
    .split("\n")
    .map(Number);
  
  console.log(expensesFilter(puzzleInput));
}
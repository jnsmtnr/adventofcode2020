const test = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.
`;

import { getRule, Rule, searchForRule } from "./puzzle13.ts";

export function getNumberOfBags(
  nr: number,
  bag: string,
  rules: Rule[],
): number {
  const rule = searchForRule(rules, bag)!;

  if (rule.contains.length === 0) {
    return nr;
  }

  return nr + nr *
      rule.contains.reduce(
        (total, bag) =>
          total +
          getNumberOfBags(
            +bag.split(" ")[0],
            bag.split(" ").slice(1).join(" "),
            rules,
          ),
        0,
      );
}

const puzzle = Deno.readTextFileSync('input.txt');

const rules = puzzle
  .split("\n")
  .filter(Boolean)
  .map(getRule);

console.log(getNumberOfBags(1, "shiny gold", rules) - 1);

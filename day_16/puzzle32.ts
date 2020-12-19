export const test = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9
`;

const puzzle = Deno.readTextFileSync("input.txt");

const fieldRules = puzzle
  .split("\n\n")[0]
  .split("\n")
  .filter(Boolean)
  .map((rule) => {
    const [field, intervals] = rule.split(": ");
    const rules = intervals.split(" or ").map((rule) => ({
      min: +rule.split("-")[0],
      max: +rule.split("-")[1],
    }));
    return {
      field,
      rules,
    };
  });

import { filterTicket } from "./puzzle31.ts";

const tickets = puzzle
  .split("\n\n")[2]
  .split("\n")
  .filter(Boolean)
  .slice(1)
  .map((ticket) =>
    ticket.split(",")
      .map(Number)
  )
  .filter((ticket) => filterTicket(ticket, fieldRules));

function getValuesFromSameField(tickets: number[][]) {
  const values: number[][] = [];

  for (let i = 0; i < tickets[0].length; i++) {
    values.push([]);
    for (let j = 0; j < tickets.length; j++) {
      values[i].push(tickets[j][i]);
    }
  }

  return values;
}

function testValueForRule(
  value: number,
  rule: { field: string; rules: { min: number; max: number }[] },
) {
  return (rule.rules[0].min <= value && rule.rules[0].max >= value) ||
    (rule.rules[1].min <= value && rule.rules[1].max >= value);
}

function testValuesForRule(
  values: number[],
  rule: { field: string; rules: { min: number; max: number }[] },
) {
  return values.every((value) => testValueForRule(value, rule));
}

function findRulesForValues(
  values: number[],
  rules: { field: string; rules: { min: number; max: number }[] }[],
) {
  return rules.filter((rule) => testValuesForRule(values, rule));
}

function findRulesForAllValues(
  allValues: number[][],
  rules: { field: string; rules: { min: number; max: number }[] }[],
) {
  const foundRules: any = [];

  let leftAllValues = [...allValues];
  let leftRules = [...rules];

  while (leftRules.length > 0) {
    for (let i = 0; i < leftAllValues.length; i++) {
      const validRules = findRulesForValues(leftAllValues[i], leftRules);
      if (validRules.length === 1) {
        foundRules.push({
          i,
          field: validRules[0].field,
        });
        const indexOfRule = leftRules.indexOf(validRules[0]);
        leftRules.splice(indexOfRule, 1);
        // leftAllValues.splice(i, 1);
        break;
      }
    }
  }

  return foundRules;
}

const values = getValuesFromSameField(tickets);

console.log(findRulesForAllValues(values, fieldRules).sort((a: any, b: any) => a.i - b.i));

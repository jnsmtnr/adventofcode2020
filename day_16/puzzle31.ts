interface Interval {
  min: number;
  max: number;
}

interface FieldRule {
  field: string;
  rules: Interval[];
}

function checkValue(value: number, fieldRules: FieldRule[]) {
  const rules = fieldRules.map(rule => rule.rules);
  return rules.some(intervals => {
    return (intervals[0].min <= value && intervals[0].max >= value) || (intervals[1].min <= value && intervals[1].max >= value);
  })
}

function scanTickets(tickets: number[][], rules: FieldRule[]) {
  const ticketsValues = tickets.reduce((acc, cur) => acc.concat(cur), []);

  const invalidValues = ticketsValues.filter((value => !checkValue(value, rules)))

  return invalidValues.reduce((acc, cur) => acc + cur, 0);
}

export function filterTicket(ticket: number[], rules: FieldRule[]) {
  return ticket.every(value => checkValue(value, rules));
}

export const test = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12
`;

// const puzzle = Deno.readTextFileSync("input.txt")

const fieldRules = test
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

const tickets = test
  .split("\n\n")[2]
  .split("\n")
  .filter(Boolean)
  .slice(1)
  .map((ticket) =>
    ticket.split(",")
      .map(Number)
  );
  
if (import.meta.main) {

  console.log(tickets.filter(ticket => filterTicket(ticket, fieldRules)));
}


// console.log(scanTickets(tickets, fieldRules));

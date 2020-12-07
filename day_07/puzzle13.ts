const test = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

export interface Rule {
  name: string;
  contains: string[];
}

export function getRule(rawRule: string): Rule {
  const [name, rule] = rawRule.replace(".", "").split(" bags contain ");

  return {
    name,
    contains: rule
      .split(", ")
      .filter((rule) => rule !== "no other bags")
      .map((bag) =>
        bag
          .split(" ")
          .splice(0, 3)
          .join(" ")
      ),
  };
}

export function searchForRule(rules: Rule[], bag: string): Rule {
  return rules.find((rule) => bag.includes(rule.name))!;
}

export function checkForShiny(rule: Rule, rules: Rule[]): boolean {
  if (rule.contains.length === 0) {
    return false;
  }
  if (rule.contains.join(" ").includes("shiny gold")) {
    return true;
  }

  return rule.contains.map((bag) =>
    checkForShiny(searchForRule(rules, bag), rules)
  ).some(Boolean);
}

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");
  
  console.log(
    puzzle
      .split("\n")
      .filter(Boolean)
      .map(getRule)
      .map((rule, _, rules) => {
        return checkForShiny(rule, rules);
      })
      .filter(Boolean)
      .length,
  );
}

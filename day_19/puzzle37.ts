type Rule = string[];

interface Rules {
  [p: string]: Array<Rule>;
}

export function getRules(input: string): Rules {
  const rules: Rules = {};

  input.split("\n\n")[0].replaceAll('"', "").split("\n").filter(Boolean)
    .forEach((row) => {
      const [key, rule] = row.split(": ");
      rules[key] = rule.includes("|")
        ? rule.split(" | ").map((subrule) => subrule.split(" "))
        : [rule.split(" ")];
    });

  return rules;
}

export function getMessages(input: string): string[] {
  return input.split("\n\n")[1].split("\n").filter(Boolean);
}

export function generate(rules: Rules, rule?: string): any {
  let variations: any = [];

  if (rule) {
    variations.push([rule])
  } else {
    variations.push(...rules[0]);
  }

  let changed = true;

  while (changed) {
    changed = false;
    const newVariations = [];

    for (const toChange of variations) {
      for (let i = 0; i < toChange.length; i++) {
        if (toChange[i] === "a" || toChange[i] === "b") {
          if (i === toChange.length - 1) {
            newVariations.push(toChange);
          }
          continue;
        }
        if (rules[toChange[i]].length === 1) {
          toChange.splice(i, 1, ...rules[toChange[i]][0]);
          newVariations.push(toChange);
          changed = true;
          break;
        }
        const toChange1 = [...toChange];
        const toChange2 = [...toChange];
        toChange1.splice(i, 1, ...rules[toChange[i]][0]);
        toChange2.splice(i, 1, ...rules[toChange[i]][1]);
        newVariations.push(toChange1, toChange2);
        changed = true;
        break;
      }
    }
    variations = [...newVariations];
  }

  return variations.map((variation: string[]) => variation.join(""));
}

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");

  const rules = getRules(puzzle);
  const messages = getMessages(puzzle);

  const variations = generate(rules);

  console.log(
    messages.filter((message) => variations.includes(message)).length,
  );
}

export function processPassport(pass: string): any {
  const passObj: any = {};

  pass.split(" ").filter(Boolean).forEach((field) => {
    const [key, value] = field.split(":");
    if (key !== "cid") {
      passObj[key] = value;
    }
  });

  return passObj;
}

export function splitToPassports(input: string) {
  return input
    .split("\n\n")
    .map((pwd) => pwd.replaceAll("\n", " "))
    .map(processPassport);
}

export function countFields(passport: object): number {
  return Object.keys(passport).length;
}

export function countvalidPassports(passports: string): number {
  return splitToPassports(passports)
    .map(countFields)
    .filter((fieldCount) => fieldCount === 7)
    .length;
}

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");
  
  console.log(countvalidPassports(puzzle));
}

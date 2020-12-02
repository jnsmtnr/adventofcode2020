interface PwdLine {
  password: string;
  policy: Policy;
}

interface Policy {
  max: number;
  min: number;
  char: string;
}

export function lineSplitter(line: string): PwdLine {
  const splittedLine = line
    .replace(":", "")
    .replace("-", " ")
    .split(" ");

  return {
    password: splittedLine[3],
    policy: {
      max: Number(splittedLine[1]),
      min: Number(splittedLine[0]),
      char: splittedLine[2],
    },
  };
}

export function pwdChecker(line: PwdLine): boolean {
  const { password, policy } = line;
  const filteredPwd = password.split("").filter((chr) => chr === policy.char);
  return filteredPwd.length >= policy.min && filteredPwd.length <= policy.max;
}

export function validPwdSearcher(passwords: Array<string>): number {
  return passwords
    .map(lineSplitter)
    .map(pwdChecker)
    .filter(Boolean)
    .length;
}

if (import.meta.main) {
  const input = Deno
    .readTextFileSync("input.txt")
    .split("\n")
    .filter(Boolean);

  console.log(validPwdSearcher(input));
}

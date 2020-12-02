interface PwdLine {
  password: string;
  policy: Policy;
}

interface Policy {
  pos1: number;
  pos2: number;
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
      pos1: Number(splittedLine[0]) - 1,
      pos2: Number(splittedLine[1]) - 1,
      char: splittedLine[2],
    },
  };
}

export function pwdChecker(line: PwdLine): boolean {
  const { password, policy } = line;
  const { char, pos1, pos2 } = policy;
  if (password[pos1] === password[pos2]) {
    return false;
  } else if (password[pos1] === char || password[pos2] === char) {
    return true;
  } else {
    return false;
  }
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

interface PwdLine {
  password: string;
  policy: Policy;
}

interface Policy {
  max: number;
  min: number;
  char: string;
}

function lineSplitter(line: string): PwdLine {
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

function pwdChecker(line: PwdLine): boolean {
  const { password, policy } = line;
  const filteredPwd = password.split("").filter((chr) => chr === policy.char);
  return filteredPwd.length >= policy.min && filteredPwd.length <= policy.max;
}

const answer = Deno
  .readTextFileSync("input.txt")
  .split("\n")
  .filter(Boolean)
  .map(lineSplitter)
  .map(pwdChecker)
  .filter(Boolean)
  .length;

console.log(answer);

export {};

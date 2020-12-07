import { countFields, splitToPassports } from "./puzzle07.ts";

export function validateByr(byr: string): boolean {
  const convertedByr = Number(byr);

  return convertedByr >= 1920 && convertedByr <= 2002;
}

export function validateIyr(iyr: string): boolean {
  const convertedIyr = Number(iyr);

  return convertedIyr >= 2010 && convertedIyr <= 2020;
}

export function validateEyr(eyr: string): boolean {
  const convertedEyr = Number(eyr);

  return convertedEyr >= 2020 && convertedEyr <= 2030;
}

export function validateHgt(hgt: string): boolean {
  if (!hgt.includes("in") && !hgt.includes("cm")) {
    return false;
  }

  const hgtValue = Number(hgt.replace("cm", "").replace("in", ""));

  if (hgt.includes("cm") && hgtValue >= 150 && hgtValue <= 193) {
    return true;
  }

  if (hgt.includes("in") && hgtValue >= 59 && hgtValue <= 76) {
    return true;
  }

  return false;
}

export function validateHcl(hcl: string): boolean {
  const re =
    /(#)([a-f]|[0-9])([a-f]|[0-9])([a-f]|[0-9])([a-f]|[0-9])([a-f]|[0-9])([a-f]|[0-9])/;

  return hcl.length === 7 && re.test(hcl);
}

export function validateEcl(ecl: string): boolean {
  return ecl === "amb" || ecl === "blu" || ecl === "brn" || ecl === "gry" ||
    ecl === "grn" || ecl === "hzl" || ecl === "oth";
}

export function validatePid(pid: string): boolean {
  const re = /([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])([0-9])/;

  return pid.length === 9 && re.test(pid);
}

export function validatePassport(password: any): boolean {
  const { byr, iyr, eyr, hgt, hcl, ecl, pid } = password;
  return countFields(password) === 7 &&
    validateByr(byr) &&
    validateIyr(iyr) &&
    validateEyr(eyr) &&
    validateHgt(hgt) &&
    validateHcl(hcl) &&
    validateEcl(ecl) &&
    validatePid(pid);
}

export function countPassportsWithValidFields(passwords: string): number {
  return splitToPassports(passwords).map(validatePassport).filter(Boolean).length
}

const invalids = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007
`;

console.log('invalids (should be 0):', countPassportsWithValidFields(invalids));

const valids = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719
`;

console.log('invalids (should be 4):', countPassportsWithValidFields(valids));

if (import.meta.main) {
  const puzzle = Deno.readTextFileSync("input.txt");
  
  console.log(countPassportsWithValidFields(puzzle));
}

export function partOne(input: string) {
  return Array.from(input.matchAll(/mul\((\d{1,3},\d{1,3})\)/gm))
    .map((match) => match[1].split(",").map(Number))
    .reduce((acc, [a, b]) => acc + a * b, 0);
}

export function partTwo(input: string) {
  let enabled = true;
  return Array.from(input.matchAll(/(?:mul\((\d{1,3},\d{1,3})\)|(don't|do))/gm))
    .filter((match) => {
      if (match[2] === "don't") {
        enabled = false;
        return false;
      }
      if (match[2] === "do") {
        enabled = true;
        return false;
      }
      return enabled;
    })
    .map((match) => match[1].split(",").map(Number))
    .reduce((acc, [a, b]) => acc + a * b, 0);
}

import { assertEquals } from "@std/assert";

Deno.test("Part One", () => {
  const result = Deno.readTextFileSync(`data/examples/day03.txt`);
  assertEquals(partOne(result), 161); // Replace null with expected result for Part One
});

Deno.test("Part Two", () => {
  const result = Deno.readTextFileSync(`data/examples/day03.txt`);
  assertEquals(partTwo(result), 48); // Replace null with expected result for Part Two
});

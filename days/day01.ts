export function parseInput(input: string) {
  return input.split("\n").map((line) => {
    const [first, second] = line.trim().split(/\s+/).map(Number);
    return { first: first || 0, second: second || 0 };
  });
}

export function partOne(input: string) {
  const lists = parseInput(input);
  const leftList = lists.map((entry) => entry.first).toSorted((a, b) => a - b);
  const rightList = lists
    .map((entry) => entry.second)
    .toSorted((a, b) => a - b);
  return leftList.reduce(
    (acc, val, i) => acc + Math.abs(val - rightList[i]),
    0
  );
}

export function partTwo(input: string) {
  const lists = parseInput(input);
  const leftList = lists.map((entry) => entry.first).toSorted((a, b) => a - b);
  const rightList = lists
    .map((entry) => entry.second)
    .toSorted((a, b) => a - b);
  return leftList.reduce(
    (acc, val) => acc + val * rightList.filter((v) => v === val).length,
    0
  );
}

import { assertEquals } from "@std/assert";

Deno.test("Part One", () => {
  const result = Deno.readTextFileSync(`data/examples/day01.txt`);
  assertEquals(partOne(result), 11); // Replace null with expected result for Part One
});

Deno.test("Part Two", () => {
  const result = Deno.readTextFileSync(`data/examples/day01.txt`);
  assertEquals(partTwo(result), 31); // Replace null with expected result for Part Two
});

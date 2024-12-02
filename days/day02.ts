export function parseInput(input: string) {
  return input.split("\n").map((line) => {
    return line.trim().split(/\s+/).map(Number) || [];
  });
}

function reportIsValid(report: number[]) {
  const slopeIsPositive = report[0] < report[report.length - 1] ? true : false;
  for (let i = 1; i < report.length; i++) {
    if (
      report[i - 1] < report[i] !== slopeIsPositive ||
      Math.abs(report[i - 1] - report[i]) < 1 ||
      Math.abs(report[i - 1] - report[i]) > 3
    ) {
      return false;
    }
  }
  return true;
}

export function partOne(input: string) {
  const reports = parseInput(input);
  return reports.filter((report) => reportIsValid(report)).length;
}

export function partTwo(input: string) {
  const reports = parseInput(input);
  // Generate all possible dampened reports by removing one element and check if they are valid
  return reports.filter((report) =>
    report
      .map((_, i) => report.filter((_, j) => j !== i))
      .some((dampenedReport) => reportIsValid(dampenedReport))
  ).length;
}

import { assertEquals } from "@std/assert";

Deno.test("Part One", () => {
  const result = Deno.readTextFileSync(`data/examples/day02.txt`);
  assertEquals(partOne(result), 2); // Replace null with expected result for Part One
});

Deno.test("Part Two", () => {
  const result = Deno.readTextFileSync(`data/examples/day02.txt`);
  assertEquals(partTwo(result), 4); // Replace null with expected result for Part Two
});

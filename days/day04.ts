export function parseInput(input: string) {
  return input.split("\n").map((line) => {
    return line.trim().split("") || [];
  });
}

function findWord(
  grid: string[][],
  word: string[],
  coordinates: { x: number; y: number },
  direction: readonly [number, number]
): number {
  let { x, y } = coordinates;
  const [dx, dy] = direction;
  for (const char of word) {
    if (
      x < 0 ||
      x >= grid[0].length ||
      y < 0 ||
      y >= grid.length ||
      grid[y][x] !== char
    ) {
      return 0;
    }
    x += dx;
    y += dy;
  }
  return 1;
}

export function partOne(input: string) {
  const grid = parseInput(input);
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1]
  ] as const;
  const word = "XMAS".split("");
  let count = 0;
  grid.forEach((row, y) => {
    row.forEach((char, x) => {
      if (char === "X") {
        for (const direction of directions) {
          count += findWord(grid, word, { x, y }, direction);
        }
      }
    });
  });

  return count;
}

export function partTwo(input: string) {
  function generateView(grid: string[][], y: number, x: number) {
    const offSets = [
      [0, 0],
      [0, 2],
      [1, 1],
      [2, 0],
      [2, 2]
    ];
    return offSets.map(([dy, dx]) => grid[y + dy][x + dx]).join("");
  }

  const grid = parseInput(input);
  const validViews = [`MSAMS`, `SSAMM`, `MMASS`, `SMASM`];

  return grid.slice(0, -2).flatMap((row, y) =>
    row
      .slice(0, -2)
      .map((_, x) => generateView(grid, y, x))
      .filter((view) => validViews.includes(view))
  ).length;
}

import { assertEquals } from "@std/assert";

Deno.test("Part One", () => {
  const result = Deno.readTextFileSync(`data/examples/day04.txt`);
  assertEquals(partOne(result), 18); // Replace null with expected result for Part One
});

Deno.test("Part Two", () => {
  const result = Deno.readTextFileSync(`data/examples/day04.txt`);
  assertEquals(partTwo(result), 9); // Replace null with expected result for Part Two
});

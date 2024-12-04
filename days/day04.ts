export function parseInput(input: string) {
  return input.split("\n").map((line) => {
    return line.trim().split("") || [];
  });
}

export function partOne(input: string) {
  function findWord(
    grid: string[][],
    word: string[],
    coordinates: { x: number; y: number },
    direction: [number, number]
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

  const grid = parseInput(input);
  const directions: [number, number][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1]
  ];
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
    return [
      grid[y][x],
      grid[y][x + 2],
      grid[y + 1][x + 1],
      grid[y + 2][x],
      grid[y + 2][x + 2]
    ].join("");
  }
  const validViews = [`MSAMS`, `SSAMM`, `MMASS`, `SMASM`];
  const grid = parseInput(input);

  let count = 0;
  grid.slice(0, -3).forEach((row, y) => {
    row.slice(0, -3).forEach((_, x) => {
      const view = generateView(grid, y, x);
      for (const validView of validViews) {
        if (view === validView) {
          count++;
          break;
        }
      }
    });
  });
  return count;
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

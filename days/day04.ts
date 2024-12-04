export function parseInput(input: string) {
  return input.split("\n").map((line) => {
    return line.trim().split("") || [];
  });
}

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

export function partOne(input: string) {
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

const validXmases = [
  `
M.S
.A.
M.S
`,
  `
S.S
.A.
M.M
`,
  `
M.M
.A.
S.S
`,
  `
S.M
.A.
S.M
`
];

function generateView(grid: string[][], j: number, i: number) {
  return [
    [grid[j][i], ".", grid[j][i + 2]].join(""),
    [".", grid[j + 1][i + 1], "."].join(""),
    [grid[j + 2][i], ".", grid[j + 2][i + 2]].join("")
  ]
    .join("\n")
    .trim();
}

export function partTwo(input: string) {
  const grid = parseInput(input);
  let count = 0;
  for (let i = 0; i < grid.length - 2; i++) {
    for (let j = 0; j < grid[i].length - 2; j++) {
      const view = generateView(grid, j, i);
      for (const xmas of validXmases) {
        if (view === xmas.trim()) {
          count++;
          break;
        }
      }
    }
  }
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

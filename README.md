# 🎅🏽🦖 Advent of Code 2024, solved using Deno and TypeScript

## 👋🏽 Information

Solutions in this repository are written in TypeScript and run using Deno. The `aoc` CLI tool is used to fetch inputs and run solutions.

Solutions can be found in the `days/` directory, with each day having its own file. Inputs and puzzle descriptions have been omitted.

Generated from the [Deno AOC 2024 template](https://github.com/magnusrodseth/aoc-2024) by [@magnusrodseth](https://github.com/magnusrodseth)

## 📦 Setup

1. Install [Deno](https://deno.land/).
2. Install the `aoc` CLI tool ([documentation](https://github.com/scarvalhojr/aoc-cli)).
3. Create a session cookie file at `~/.adventofcode.session` for fetching inputs.

## 🛠️ Tasks

This project uses `deno task` to simplify common workflows:

- `scaffold <day>`: Create boilerplate files for a given day.
- `download <day>`: Download input and puzzle files for a specific day.
- `solve <day>`: Run the solution for a specific day.

### Example Commands

```bash
# Scaffold a new day
deno task scaffold 1

# Download inputs for day 1
deno task download 1

# Solve puzzles for day 1
deno task solve 1

# Run tests for day 1
deno task test days/day01.ts
```

## 📂 Folder Structure

```bash
├── days/                  # Solutions for each day
│   ├── day01.ts           # Day 1 solution
│   ├── day02.ts           # Day 2 solution
│   └── ...
├── data/                  # Input and example data
│   ├── inputs/            # Puzzle inputs
│   ├── examples/          # Example inputs
│   └── puzzles/           # Puzzle descriptions
├── scripts/               # Helper scripts
│   ├── scaffold.ts        # Scaffolding script
│   ├── download.ts        # Download script
│   ├── solve.ts           # Solve script
│   └── _template.ts       # Template for scaffolding
└── deno.json              # Deno configuration
```

## 🌟 How It Works

- Use `scaffold` to create a solution template for a specific day.
- Use `download` to fetch inputs and puzzles.
- Write and test your solutions in the generated files.
- Use `solve` to run and verify your answers.
- Use `test` to run tests on example data for a specific day.

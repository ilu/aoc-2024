function parseInput(input: string) {
  const data = input.split("\n\n") || [[], []];
  const rules = data[0].split("\n").map((line) => line.split("|").map(Number));
  const pageLists = data[1]
    .split("\n")
    .map((line) => line.split(",").map(Number));
  return [rules, pageLists];
}

function createOrderingGraph(rules: number[][]) {
  const graph = new Map<number, number[]>();
  rules.forEach((rule) => {
    const existingRules = graph.get(rule[0]) ?? [];
    graph.set(rule[0], [...existingRules, rule[1]]);
  });
  return graph;
}

function createPageListCollection(
  pageLists: number[][],
  orderingGraph: Map<number, number[]>
) {
  return pageLists.map((pageList) => {
    const sortedPageList = [...pageList].sort((a, b) => {
      const aOrder = orderingGraph.get(a) ?? [];
      const bOrder = orderingGraph.get(b) ?? [];
      if (aOrder.includes(b)) return -1; // a comes before b
      if (bOrder.includes(a)) return 1; // b comes before a
      return 0;
    });
    return { pageList, sortedPageList };
  });
}

export function partOne(input: string) {
  const [rules, pageLists] = parseInput(input);
  const orderingGraph = createOrderingGraph(rules);
  // There is a cycle in the ordering graph, so we can't use topological sort.
  // Instead, we sort each page list individually based on the graph.
  // There is no universal ordering.
  const pageListsCollection = createPageListCollection(
    pageLists,
    orderingGraph
  );
  return pageListsCollection
    .filter(
      ({ pageList, sortedPageList }) =>
        pageList.toString() === sortedPageList.toString()
    )
    .reduce(
      (acc, { pageList }) => acc + pageList[Math.floor(pageList.length / 2)],
      0
    );
}

export function partTwo(input: string) {
  const [rules, pageLists] = parseInput(input);
  const orderingGraph = createOrderingGraph(rules);
  const pageListsCollection = createPageListCollection(
    pageLists,
    orderingGraph
  );
  return pageListsCollection
    .filter(
      ({ pageList, sortedPageList }) =>
        pageList.toString() !== sortedPageList.toString()
    )
    .reduce(
      (acc, { sortedPageList }) =>
        acc + sortedPageList[Math.floor(sortedPageList.length / 2)],
      0
    );
}

import { assertEquals } from "@std/assert";

Deno.test("Part One", () => {
  const result = Deno.readTextFileSync(`data/examples/day05.txt`);
  assertEquals(partOne(result), 143); // Replace null with expected result for Part One
});

Deno.test("Part Two", () => {
  const result = Deno.readTextFileSync(`data/examples/day05.txt`);
  assertEquals(partTwo(result), 123); // Replace null with expected result for Part Two
});

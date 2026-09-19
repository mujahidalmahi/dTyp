import { Component } from "@dtyp/types";
import { generateAlgoSortSearchFullPrograms } from "./algo-full-programs-sort-search.js";
import { generateAlgoGraphsDpFullPrograms } from "./algo-full-programs-graphs-dp.js";
import { generateAlgoGreedyBacktrackStringsFullPrograms } from "./algo-full-programs-greedy-backtrack-strings.js";

export function generateAlgorithmsFullProgramsComponents(): Component[] {
  return [
    ...generateAlgoSortSearchFullPrograms(),
    ...generateAlgoGraphsDpFullPrograms(),
    ...generateAlgoGreedyBacktrackStringsFullPrograms(),
  ];
}

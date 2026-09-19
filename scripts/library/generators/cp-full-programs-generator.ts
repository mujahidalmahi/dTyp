import { Component } from "@dtyp/types";
import { generateCpTechniquesFullPrograms } from "./cp-full-programs-techniques.js";
import { generateCpStructuresFullPrograms } from "./cp-full-programs-structures.js";
import { generateCpGraphsFullPrograms } from "./cp-full-programs-graphs.js";

export function generateCpFullProgramsComponents(): Component[] {
  return [
    ...generateCpTechniquesFullPrograms(),
    ...generateCpStructuresFullPrograms(),
    ...generateCpGraphsFullPrograms(),
  ];
}

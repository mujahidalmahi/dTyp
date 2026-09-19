import { Component } from "@dtyp/types";
import { generateCpTechniquesFullPrograms } from "./cp-full-programs-techniques.js";
import { generateCpStructuresFullPrograms } from "./cp-full-programs-structures.js";
import { generateCpGraphsFullPrograms } from "./cp-full-programs-graphs.js";
import { generateCpProgramsStlStructures } from "./cp-programs-stl-structures.js";
import { generateCpProgramsPtrsBsDp } from "./cp-programs-ptrs-bs-dp.js";
import { generateCpProgramsGraphsStringsMath } from "./cp-programs-graphs-strings-math.js";

export function generateCpFullProgramsComponents(): Component[] {
  return [
    ...generateCpTechniquesFullPrograms(),
    ...generateCpStructuresFullPrograms(),
    ...generateCpGraphsFullPrograms(),
    ...generateCpProgramsStlStructures(),
    ...generateCpProgramsPtrsBsDp(),
    ...generateCpProgramsGraphsStringsMath(),
  ];
}

import { Component } from "@dtyp/types";
import { generateBoilerPlateSnippets } from "./boiler-plate-snippets.js";
import { generateBoilerPlateCorePrograms } from "./boiler-plate-full-programs-core.js";
import { generateBoilerPlateStructuresIoPrograms } from "./boiler-plate-full-programs-structures-io.js";
import { generateBoilerPlateComplexPrograms } from "./boiler-plate-full-programs-complex.js";

export function generateBoilerPlateComponents(): Component[] {
  return [
    ...generateBoilerPlateSnippets(),
    ...generateBoilerPlateCorePrograms(),
    ...generateBoilerPlateStructuresIoPrograms(),
    ...generateBoilerPlateComplexPrograms()
  ];
}

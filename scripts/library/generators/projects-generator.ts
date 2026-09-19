import { Component } from "@dtyp/types";
import { generateProjectsMgmtParsersNet } from "./projects-mgmt-parsers-net.js";
import { generateProjectsStorageToolsSystems } from "./projects-storage-tools-systems.js";

export function generateProjectsComponents(): Component[] {
  return [
    ...generateProjectsMgmtParsersNet(),
    ...generateProjectsStorageToolsSystems()
  ];
}

const fs = require("node:fs");
const path = require("node:path");

const wasmSource = require.resolve("sql.js/dist/sql-wasm.wasm");
const distDir = path.resolve(__dirname, "..", "dist");
const libraryDir = path.resolve(__dirname, "..", "library");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}
if (!fs.existsSync(libraryDir)) {
  fs.mkdirSync(libraryDir, { recursive: true });
}

fs.copyFileSync(wasmSource, path.join(distDir, "sql-wasm.wasm"));
fs.copyFileSync(wasmSource, path.join(libraryDir, "sql-wasm.wasm"));

console.log("[dTyp] Successfully copied sql-wasm.wasm to dist/ and library/");

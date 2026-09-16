import * as fs from "node:fs";
import * as path from "node:path";

const PACKAGE_FILES = [
  "package.json",
  "apps/vscode/package.json",
  "packages/types/package.json",
  "packages/utilities/package.json",
  "packages/validation/package.json",
  "packages/typing-engine/package.json",
  "packages/library-engine/package.json",
];

function bumpVersion(current: string, type: string): string {
  const parts = current.split(".").map((p) => parseInt(p, 10));
  if (parts.length !== 3 || parts.some(isNaN)) {
    throw new Error(`Invalid semver version: ${current}`);
  }
  let [major, minor, patch] = parts;
  switch (type.toLowerCase()) {
    case "major":
      return `${major + 1}.0.0`;
    case "minor":
      return `${major}.${minor + 1}.0`;
    case "patch":
      return `${major}.${minor}.${patch + 1}`;
    default:
      if (/^\d+\.\d+\.\d+$/.test(type)) {
        return type;
      }
      throw new Error(`Unknown bump type: ${type}. Expected 'patch', 'minor', 'major', or 'x.y.z'`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const bumpType = args.find((a) => !a.startsWith("--")) || "patch";
  const isDryRun = args.includes("--dry-run");

  const rootPkgPath = path.resolve(process.cwd(), "package.json");
  const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf8"));
  const currentVersion = rootPkg.version || "2.0.0";
  const nextVersion = bumpVersion(currentVersion, bumpType);

  console.log(`[dTyp Version Bump] ${currentVersion} -> ${nextVersion} (${bumpType}) ${isDryRun ? "[DRY RUN]" : ""}`);

  for (const relPath of PACKAGE_FILES) {
    const fullPath = path.resolve(process.cwd(), relPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`  Warning: File not found ${relPath}`);
      continue;
    }
    const content = JSON.parse(fs.readFileSync(fullPath, "utf8"));
    const oldV = content.version;
    content.version = nextVersion;

    if (!isDryRun) {
      fs.writeFileSync(fullPath, JSON.stringify(content, null, 2) + "\n", "utf8");
    }
    console.log(`  ✓ ${relPath}: ${oldV} -> ${nextVersion}`);
  }

  console.log(`\nSuccessfully synchronized version ${nextVersion} across ${PACKAGE_FILES.length} packages!`);
}

main().catch((err) => {
  console.error("Error bumping versions:", err.message);
  process.exit(1);
});

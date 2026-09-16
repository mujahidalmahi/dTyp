import * as fs from "node:fs";
import * as path from "node:path";

export const ensureDirectoryExists = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

export const safeReadTextFile = (filePath: string, encoding: BufferEncoding = "utf-8"): string => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  return fs.readFileSync(filePath, encoding);
};

export const safeWriteJsonFile = <T>(filePath: string, data: T): void => {
  ensureDirectoryExists(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

export const safeReadJsonFile = <T>(filePath: string, fallback: T): T => {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

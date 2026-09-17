import { TypingAction } from "@dtyp/types";

export const QWERTY_PROXIMITY_MAP: Record<string, string[]> = {
  a: ["s", "q", "z", "w"],
  b: ["v", "g", "h", "n"],
  c: ["x", "d", "f", "v"],
  d: ["s", "e", "r", "f", "c", "x"],
  e: ["w", "r", "s", "d"],
  f: ["d", "r", "t", "g", "v", "c"],
  g: ["f", "t", "y", "h", "b", "v"],
  h: ["g", "y", "u", "j", "n", "b"],
  i: ["u", "o", "k", "j"],
  j: ["h", "u", "i", "k", "m", "n"],
  k: ["j", "i", "o", "l", "m"],
  l: ["k", "o", "p", ";"],
  m: ["n", "j", "k"],
  n: ["b", "h", "j", "m"],
  o: ["i", "p", "l", "k"],
  p: ["o", "[", ";", "l"],
  q: ["w", "a"],
  r: ["e", "t", "f", "d"],
  s: ["a", "w", "e", "d", "x", "z"],
  t: ["r", "y", "g", "f"],
  u: ["y", "i", "j", "h"],
  v: ["c", "f", "g", "b"],
  w: ["q", "e", "s", "a"],
  x: ["z", "s", "d", "c"],
  y: ["t", "u", "h", "g"],
  z: ["a", "s", "x"],
  ",": [".", "m", "k"],
  ".": [",", "/", "l"],
  "-": ["=", "0", "p"],
  "=": ["-", "+", "["],
  ";": ["l", "p", "'"],
};

export const C_COMPOUND_OPERATORS = new Set([
  "->", "==", "!=", "<=", ">=", "&&", "||",
  "++", "--", "+=", "-=", "*=", "/=", "%=",
  "<<", ">>", "/*", "*/", "//",
]);

export const C_BURST_KEYWORDS = new Set([
  "int", "char", "float", "double", "void", "return", "if", "else",
  "for", "while", "do", "switch", "case", "break", "continue", "default",
  "struct", "typedef", "enum", "union", "sizeof", "static", "const",
  "unsigned", "signed", "long", "short", "extern", "auto", "register",
  "volatile", "goto", "printf", "scanf", "sprintf", "snprintf", "fprintf",
  "malloc", "calloc", "realloc", "free", "memset", "memcpy", "memmove", "memcmp",
  "strlen", "strcpy", "strncpy", "strcat", "strncat", "strcmp", "strncmp",
  "strchr", "strstr", "fopen", "fclose", "fread", "fwrite", "fgets", "fputs", "perror",
  "qsort", "bsearch", "abs", "rand", "srand", "exit", "time", "clock",
  "NULL", "bool", "true", "false", "size_t", "ssize_t", "uintptr_t", "ptrdiff_t",
  "int8_t", "int16_t", "int32_t", "int64_t", "uint8_t", "uint16_t", "uint32_t", "uint64_t",
  "FILE", "stdin", "stdout", "stderr", "main", "argc", "argv",
  "include", "define", "ifndef", "endif", "pragma",
]);

const SHIFTED_CHARS = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+{}|:\"<>?~".split(""));

export interface HumanCadenceOptions {
  baseDelayMs: number;
  jitterMs?: number;
  enableTypoSimulation?: boolean;
  typoRate?: number;
}

export class HumanCadence {
  constructor(private options: HumanCadenceOptions) {}

  public isBurstWord(word: string): boolean {
    return C_BURST_KEYWORDS.has(word);
  }

  public getAdjacentKey(char: string): string | null {
    const lower = char.toLowerCase();
    const adjacent = QWERTY_PROXIMITY_MAP[lower];
    if (!adjacent || adjacent.length === 0) return null;
    const picked = adjacent[Math.floor(Math.random() * adjacent.length)];
    return char === char.toUpperCase() && char !== lower ? picked.toUpperCase() : picked;
  }

  public calculateStrokeDelay(char: string, inBurstWord: boolean, prevChar?: string): number {
    const base = this.options.baseDelayMs;
    const jitter = this.options.jitterMs ?? 5;
    const scale = Math.max(0.02, base / 30);
    let delay = base;

    // 1. Compound operator second stroke (e.g. '->', '==', '!=') is a reflex stroke
    if (prevChar && C_COMPOUND_OPERATORS.has(prevChar + char)) {
      delay = Math.max(1, base * (0.3 + Math.random() * 0.15));
      const jitterOffset = (Math.random() * 2 - 1) * Math.min(jitter, delay * 0.3);
      return Math.max(1, Math.round(delay + jitterOffset));
    }

    // 2. Keyword burst speed (muscle memory is 40%-65% faster)
    if (inBurstWord) {
      delay = Math.max(1, base * (0.4 + Math.random() * 0.25));
    }

    // 3. Shift key mechanical preparation (holding shift for capital or symbol)
    const isShifted = SHIFTED_CHARS.has(char);
    const prevWasShifted = prevChar ? SHIFTED_CHARS.has(prevChar) : false;
    if (isShifted && !prevWasShifted) {
      delay += (25 + Math.random() * 30) * scale;
    }

    // 4. Number row distance hesitation
    if (/[0-9]/.test(char)) {
      delay *= 1.2;
    }

    // 5. Cognitive hesitations scaled to base delay
    if (char === "{") {
      delay += (90 + Math.random() * 110) * scale;
    } else if (char === "\n") {
      delay += (80 + Math.random() * 100) * scale;
    } else if (char === ";") {
      delay += (60 + Math.random() * 80) * scale;
    } else if (char === ",") {
      delay += (30 + Math.random() * 50) * scale;
    } else if (char === " ") {
      if (prevChar === ";") {
        delay += (50 + Math.random() * 70) * scale;
      } else {
        delay += (15 + Math.random() * 25) * scale;
      }
    }

    // 6. Add Gaussian/uniform jitter
    const jitterOffset = (Math.random() * 2 - 1) * Math.min(jitter, base * 0.5);
    return Math.max(1, Math.round(delay + jitterOffset));
  }

  public createTypoSequence(correctChar: string, typoChar: string): TypingAction[] {
    const base = this.options.baseDelayMs;
    const scale = Math.max(0.02, base / 30);
    return [
      {
        type: "type",
        char: typoChar,
        delayMs: Math.max(1, Math.round(base * 0.85)),
        description: `typo: '${typoChar}' instead of '${correctChar}'`,
      },
      {
        type: "pause",
        delayMs: Math.max(1, Math.round((60 + Math.random() * 60) * scale)),
        description: "visual typo recognition pause",
      },
      {
        type: "backspace",
        delayMs: Math.max(1, Math.round((35 + Math.random() * 30) * scale)),
        description: "backspace correction",
      },
      {
        type: "type",
        char: correctChar,
        delayMs: Math.max(1, Math.round(base * 1.1)),
        description: `corrected stroke: '${correctChar}'`,
      },
    ];
  }
}

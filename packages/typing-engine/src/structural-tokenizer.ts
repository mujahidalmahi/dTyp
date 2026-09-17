import { TypingAction, TypingModel } from "@dtyp/types";
import { HumanCadence, C_BURST_KEYWORDS } from "./human-cadence.js";
import { CStructuralDecomposer } from "./c-structural-decomposer.js";
import { NonlinearAuthoringPlanner } from "./nonlinear-authoring-planner.js";

export interface TokenizerOptions {
  model: TypingModel;
  baseDelayMs: number;
  jitterMs?: number;
  enableTypoSimulation?: boolean;
  typoRate?: number;
  preserveNewlines?: boolean;
  preserveTabs?: boolean;
}

const OPEN_TO_CLOSE: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
};

export class StructuralTokenizer {
  private cadence: HumanCadence;

  constructor(private options: TokenizerOptions) {
    this.cadence = new HumanCadence({
      baseDelayMs: options.baseDelayMs,
      jitterMs: options.jitterMs,
      enableTypoSimulation: options.enableTypoSimulation,
      typoRate: options.typoRate,
    });
  }

  /**
   * Tokenizes C source code into an executable sequence of humanized TypingActions.
   * If the code is a full C program and the model is nonlinear/humanized, it scaffolds
   * headers and main() first, moves above main() for helper functions, and returns into main().
   */
  public tokenize(source: string): TypingAction[] {
    const isNonlinear = this.options.model === "nonlinear" || this.options.model === "humanized";
    if (isNonlinear) {
      const decomposed = CStructuralDecomposer.decompose(source);
      if (decomposed.isFullProgram) {
        const steps = NonlinearAuthoringPlanner.plan(decomposed, source);
        const actions: TypingAction[] = [];

        for (const step of steps) {
          if (step.cursorMoveBefore) {
            actions.push({
              type: "cursor_move",
              targetLineOffset: step.cursorMoveBefore.lineOffset,
              targetColumn: step.cursorMoveBefore.column,
              targetLandmark: step.cursorMoveBefore.landmark,
              delayMs: 150,
              description: step.description,
            });
          }

          if (step.pauseBeforeMs && step.pauseBeforeMs > 0) {
            actions.push({
              type: "pause",
              delayMs: step.pauseBeforeMs,
              description: "thinking hesitation",
            });
          }

          const stepActions = this.tokenizeLinear(step.code);
          actions.push(...stepActions);

          if (step.pauseAfterMs && step.pauseAfterMs > 0) {
            actions.push({
              type: "pause",
              delayMs: step.pauseAfterMs,
              description: "post-step cognitive hesitation",
            });
          }
        }

        return actions;
      }
    }

    return this.tokenizeLinear(source);
  }

  /**
   * Tokenizes C source code linearly character by character with burst keywords,
   * auto-close simulation, and realistic typos.
   */
  public tokenizeLinear(source: string): TypingAction[] {
    const actions: TypingAction[] = [];
    const isHumanized = this.options.model === "humanized" || this.options.model === "nonlinear";
    const enableTypos = this.options.enableTypoSimulation ?? true;
    const typoRate = this.options.typoRate ?? 0.015;

    // Normalize newlines and tabs according to options
    let normalized = source;
    if (this.options.preserveNewlines !== false) {
      normalized = normalized.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    } else {
      normalized = normalized.replace(/\r?\n/g, " ");
    }
    if (this.options.preserveTabs === false) {
      normalized = normalized.replace(/\t/g, "    ");
    }

    // Pass 1: Identify burst keywords for muscle-memory speedup
    const wordsInText: Array<{ start: number; end: number; word: string; isBurst: boolean }> = [];
    const wordRegex = /[a-zA-Z_][a-zA-Z0-9_]*/g;
    let match: RegExpExecArray | null;
    while ((match = wordRegex.exec(normalized)) !== null) {
      const word = match[0];
      wordsInText.push({
        start: match.index,
        end: match.index + word.length,
        word,
        isBurst: C_BURST_KEYWORDS.has(word),
      });
    }

    let wordIdx = 0;
    let prevChar = "";
    const delimiterStack: string[] = [];
    let inString = false;
    let inChar = false;
    let escaped = false;

    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i];

      // Determine if current char is part of a keyword burst
      while (wordIdx < wordsInText.length && wordsInText[wordIdx].end <= i) {
        wordIdx++;
      }
      let inBurst = false;
      if (wordIdx < wordsInText.length && i >= wordsInText[wordIdx].start && i < wordsInText[wordIdx].end) {
        inBurst = wordsInText[wordIdx].isBurst;
      }

      const strokeDelay = this.cadence.calculateStrokeDelay(char, inBurst, prevChar);

      // Handle escaped characters inside strings / chars
      if (escaped) {
        escaped = false;
        actions.push({ type: "type", char, delayMs: strokeDelay });
        prevChar = char;
        continue;
      }

      if ((inString || inChar) && char === "\\") {
        escaped = true;
        actions.push({ type: "type", char, delayMs: strokeDelay });
        prevChar = char;
        continue;
      }

      // Handle string literals: double quotes `"`
      if (char === '"' && !inChar) {
        if (!inString) {
          inString = true;
          delimiterStack.push('"');
          actions.push({
            type: "type",
            char,
            autoClose: '"',
            delayMs: strokeDelay,
            description: 'open quote with autoClose \'"\'',
          });
        } else {
          inString = false;
          if (delimiterStack.length > 0 && delimiterStack[delimiterStack.length - 1] === '"') {
            delimiterStack.pop();
            actions.push({
              type: "overtype",
              char,
              delayMs: Math.max(1, strokeDelay),
              description: 'overtype string quote \'"\'',
            });
          } else {
            actions.push({ type: "type", char, delayMs: strokeDelay });
          }
        }
        prevChar = char;
        continue;
      }

      // Handle character literals: single quotes `'`
      if (char === "'" && !inString) {
        if (!inChar) {
          inChar = true;
          delimiterStack.push("'");
          actions.push({
            type: "type",
            char,
            autoClose: "'",
            delayMs: strokeDelay,
            description: "open char literal with autoClose \"'\"",
          });
        } else {
          inChar = false;
          if (delimiterStack.length > 0 && delimiterStack[delimiterStack.length - 1] === "'") {
            delimiterStack.pop();
            actions.push({
              type: "overtype",
              char,
              delayMs: Math.max(1, strokeDelay),
              description: "overtype char quote \"'\"",
            });
          } else {
            actions.push({ type: "type", char, delayMs: strokeDelay });
          }
        }
        prevChar = char;
        continue;
      }

      // Outside strings/chars: handle brackets `(`, `[`, `{` and matching `)`, `]`, `}`
      if (!inString && !inChar) {
        if (char in OPEN_TO_CLOSE) {
          const closer = OPEN_TO_CLOSE[char];
          delimiterStack.push(closer);
          actions.push({
            type: "type",
            char,
            autoClose: closer,
            delayMs: strokeDelay,
            description: `open bracket '${char}' with autoClose '${closer}'`,
          });
          prevChar = char;
          continue;
        }

        if (char === ")" || char === "]" || char === "}") {
          if (delimiterStack.length > 0 && delimiterStack[delimiterStack.length - 1] === char) {
            delimiterStack.pop();
            actions.push({
              type: "overtype",
              char,
              delayMs: Math.max(1, strokeDelay),
              description: `overtype delimiter '${char}'`,
            });
          } else {
            actions.push({ type: "type", char, delayMs: strokeDelay });
          }
          prevChar = char;
          continue;
        }
      }

      // Chance to simulate realistic human typo on alphabetic characters and common punctuation
      const isAlpha = /[a-zA-Z]/.test(char);
      const isPunct = char === "." || char === "," || char === ";";
      const shouldTypo =
        isHumanized &&
        enableTypos &&
        (isAlpha || isPunct) &&
        !inBurst &&
        Math.random() < typoRate;

      if (shouldTypo) {
        const adjacent = this.cadence.getAdjacentKey(char);
        if (adjacent && adjacent !== char) {
          const typoSeq = this.cadence.createTypoSequence(char, adjacent);
          actions.push(...typoSeq);
        } else {
          actions.push({ type: "type", char, delayMs: strokeDelay });
        }
      } else {
        actions.push({ type: "type", char, delayMs: strokeDelay });
      }

      prevChar = char;
    }

    return actions;
  }
}

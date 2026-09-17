import { TypingAction, TypingModel } from "@dtyp/types";
import { HumanCadence, C_BURST_KEYWORDS } from "./human-cadence.js";

export interface TokenizerOptions {
  model: TypingModel;
  baseDelayMs: number;
  jitterMs?: number;
  enableTypoSimulation?: boolean;
  typoRate?: number;
}

const CLOSING_PAIRS = new Set([")", "}", "]", '"', "'"]);

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
   */
  public tokenize(source: string): TypingAction[] {
    const actions: TypingAction[] = [];
    const isHumanized = this.options.model === "humanized";
    const enableTypos = this.options.enableTypoSimulation ?? true;
    const typoRate = this.options.typoRate ?? 0.015;

    // Track active word for burst detection
    let currentWord = "";
    const wordsInText: Array<{ start: number; end: number; word: string; isBurst: boolean }> = [];
    
    // Pass 1: Identify burst keywords
    const wordRegex = /[a-zA-Z_][a-zA-Z0-9_]*/g;
    let match: RegExpExecArray | null;
    while ((match = wordRegex.exec(source)) !== null) {
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

    for (let i = 0; i < source.length; i++) {
      const char = source[i];
      
      // Determine if current char is part of a keyword burst
      let inBurst = false;
      while (wordIdx < wordsInText.length && wordsInText[wordIdx].end <= i) {
        wordIdx++;
      }
      if (wordIdx < wordsInText.length && i >= wordsInText[wordIdx].start && i < wordsInText[wordIdx].end) {
        inBurst = wordsInText[wordIdx].isBurst;
      }

      const strokeDelay = this.cadence.calculateStrokeDelay(char, inBurst, prevChar);

      // Check if closing delimiter should be overtyped
      const isClosingDelimiter = CLOSING_PAIRS.has(char);

      if (isClosingDelimiter) {
        // Overtype action: VS Code may have auto-inserted this partner
        actions.push({
          type: "overtype",
          char,
          delayMs: Math.max(1, strokeDelay),
          description: `overtype delimiter '${char}'`,
        });
      } else {
        // Chance to simulate human typo on standard alphabetic characters
        const isAlpha = /[a-zA-Z]/.test(char);
        const shouldTypo = isHumanized && enableTypos && isAlpha && !inBurst && Math.random() < typoRate;

        if (shouldTypo) {
          const adjacent = this.cadence.getAdjacentKey(char);
          if (adjacent && adjacent !== char) {
            const typoSeq = this.cadence.createTypoSequence(char, adjacent);
            actions.push(...typoSeq);
          } else {
            actions.push({
              type: "type",
              char,
              delayMs: strokeDelay,
            });
          }
        } else {
          actions.push({
            type: "type",
            char,
            delayMs: strokeDelay,
          });
        }
      }

      prevChar = char;
    }

    return actions;
  }
}

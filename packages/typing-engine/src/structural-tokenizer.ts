import { TypingAction, TypingModel, CognitivePauseIntensity } from "@dtyp/types";
import { HumanCadence, C_BURST_KEYWORDS } from "./human-cadence.js";
import { CStructuralDecomposer } from "./c-structural-decomposer.js";
import { NonlinearAuthoringPlanner } from "./nonlinear-authoring-planner.js";
import { CognitivePauseModel } from "./cognitive-pause-model.js";
import { StaminaRenewal } from "./stamina-renewal.js";

export interface TokenizerOptions {
  model: TypingModel;
  baseDelayMs: number;
  jitterMs?: number;
  enableTypoSimulation?: boolean;
  typoRate?: number;
  preserveNewlines?: boolean;
  preserveTabs?: boolean;
  cognitivePauseIntensity?: CognitivePauseIntensity;
  enableFatigueRenewal?: boolean;
  enableFalseStarts?: boolean;
  falseStartRate?: number;
}

const OPEN_TO_CLOSE: Record<string, string> = {
  "(": ")",
  "[": "]",
  "{": "}",
};

const CONTROL_FLOW_KEYWORDS = new Set(["if", "while", "for", "switch", "do"]);

export class StructuralTokenizer {
  private cadence: HumanCadence;
  private pauseModel: CognitivePauseModel;
  private stamina: StaminaRenewal;

  constructor(private options: TokenizerOptions) {
    this.cadence = new HumanCadence({
      baseDelayMs: options.baseDelayMs,
      jitterMs: options.jitterMs,
      enableTypoSimulation: options.enableTypoSimulation,
      typoRate: options.typoRate,
    });
    this.pauseModel = new CognitivePauseModel({
      intensity: options.cognitivePauseIntensity,
      baseDelayMs: options.baseDelayMs,
    });
    this.stamina = new StaminaRenewal();
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
      const steps = NonlinearAuthoringPlanner.plan(decomposed, source);
      if (steps.length > 1 || steps[0].kind !== "raw") {
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

    // Normalize newlines and enforce tab-only indentation
    let normalized = source;
    if (this.options.preserveNewlines !== false) {
      normalized = normalized.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    } else {
      normalized = normalized.replace(/\r?\n/g, " ");
    }

    // Ensure all line-leading indentation strictly uses tabs '\t' (no space characters for indentation)
    normalized = normalized.replace(/^[ \t]+/gm, (leading) => {
      const spaceCount = leading.replace(/\t/g, "    ").length;
      const tabs = Math.max(1, Math.round(spaceCount / 4));
      return "\t".repeat(tabs);
    });

    // Pass 1: Identify burst keywords and identifier frequencies for muscle memory
    const wordsInText: Array<{ start: number; end: number; word: string; isBurst: boolean; isFamiliar: boolean }> = [];
    const identifierCounts = new Map<string, number>();
    const wordRegex = /[a-zA-Z_][a-zA-Z0-9_]*/g;
    let match: RegExpExecArray | null;
    while ((match = wordRegex.exec(normalized)) !== null) {
      const word = match[0];
      const isBurst = C_BURST_KEYWORDS.has(word);
      const prevCount = identifierCounts.get(word) ?? 0;
      identifierCounts.set(word, prevCount + 1);
      const isFamiliar = !isBurst && prevCount >= 1; // seen at least once prior

      wordsInText.push({
        start: match.index,
        end: match.index + word.length,
        word,
        isBurst,
        isFamiliar,
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

      // Determine if current char is part of a keyword burst or familiar identifier
      while (wordIdx < wordsInText.length && wordsInText[wordIdx].end <= i) {
        wordIdx++;
      }
      let inBurst = false;
      let isFamiliar = false;
      if (wordIdx < wordsInText.length && i >= wordsInText[wordIdx].start && i < wordsInText[wordIdx].end) {
        inBurst = wordsInText[wordIdx].isBurst;
        isFamiliar = wordsInText[wordIdx].isFamiliar;
      }

      // 1. Cognitive pause before control flow keywords (if, while, for, switch, do)
      if (
        isHumanized &&
        wordIdx < wordsInText.length &&
        i === wordsInText[wordIdx].start &&
        CONTROL_FLOW_KEYWORDS.has(wordsInText[wordIdx].word) &&
        !inString &&
        !inChar
      ) {
        actions.push({
          type: "pause",
          pauseKind: "control_flow",
          delayMs: this.pauseModel.getPauseDuration("control_flow"),
          description: `cognitive pause formulating ${wordsInText[wordIdx].word} condition`,
        });
        this.stamina.renew();
      }

      // 2. Cognitive hesitation before pointer dereference ->
      if (
        isHumanized &&
        char === "-" &&
        i + 1 < normalized.length &&
        normalized[i + 1] === ">" &&
        !inString &&
        !inChar
      ) {
        actions.push({
          type: "pause",
          pauseKind: "pointer_nav",
          delayMs: this.pauseModel.getPauseDuration("pointer_nav"),
          description: "pointer dereference verification pause",
        });
      }

      // 3. Check for periodic fatigue micro-rest
      if (isHumanized) {
        const microRest = this.pauseModel.registerStroke();
        if (microRest) {
          actions.push(microRest);
          this.stamina.renew();
        }
      }

      let strokeDelay = this.cadence.calculateStrokeDelay(char, inBurst, prevChar, isFamiliar);
      if (isHumanized && this.options.enableFatigueRenewal !== false) {
        strokeDelay = Math.max(1, Math.round(strokeDelay * this.stamina.getDelayMultiplier()));
        this.stamina.recordKeystroke();
        if (char === "\n") {
          this.stamina.renew();
        }
      }

      // Inter-block pause on double newline
      if (isHumanized && char === "\n" && prevChar === "\n") {
        actions.push({
          type: "pause",
          pauseKind: "inter_block",
          delayMs: this.pauseModel.getPauseDuration("inter_block"),
          description: "inter-block conceptual pause",
        });
      }

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

      // Comma parameter pause when followed by space outside strings/chars
      if (!inString && !inChar && char === "," && i + 1 < normalized.length && normalized[i + 1] === " ") {
        actions.push({ type: "type", char: ",", delayMs: strokeDelay });
        actions.push({ type: "type", char: " ", delayMs: Math.max(1, Math.round(strokeDelay * 0.9)) });
        if (isHumanized) {
          actions.push({
            type: "pause",
            pauseKind: "comma_parameter",
            delayMs: this.pauseModel.getPauseDuration("comma_parameter"),
            description: "parameter inspection hesitation",
          });
        }
        prevChar = " ";
        i++; // skip the space since it was emitted
        continue;
      }

      // Smart Block Expansion for '{' followed by newline
      if (!inString && !inChar && char === "{" && isHumanized) {
        const restOfLine = normalized.slice(i + 1);
        const matchNewline = restOfLine.match(/^([ \t]*)\r?\n/);
        if (matchNewline) {
          const prevNlIdx = normalized.lastIndexOf("\n", i);
          const currentLineLeading = normalized.slice(prevNlIdx + 1, i).match(/^[ \t]*/);
          const baseIndent = currentLineLeading ? currentLineLeading[0] : "";

          const afterNewline = restOfLine.slice(matchNewline[0].length);
          const nextLineIndentMatch = afterNewline.match(/^([ \t]*)/);
          let blockIndent = (nextLineIndentMatch && nextLineIndentMatch[1].length > 0)
            ? nextLineIndentMatch[1]
            : baseIndent + "\t";
          if (blockIndent.length <= baseIndent.length) {
            blockIndent = baseIndent + "\t";
          }

          delimiterStack.push("}");
          actions.push({
            type: "type",
            char: "{",
            autoClose: "}",
            delayMs: strokeDelay,
            description: "open block brace with autoClose '}'",
          });
          actions.push({
            type: "enter_block",
            baseIndent,
            blockIndent,
            delayMs: Math.max(1, Math.round(strokeDelay * 0.8)),
            description: "auto-expand block braces with indentation",
          });

          const actualIndentToSkip = afterNewline.startsWith(blockIndent)
            ? blockIndent.length
            : (nextLineIndentMatch ? nextLineIndentMatch[1].length : 0);
          const skipCount = matchNewline[0].length + actualIndentToSkip;
          i += skipCount;
          prevChar = " ";
          continue;
        }
      }

      // Smart step over closing brace on block line
      if (!inString && !inChar && char === "\n" && isHumanized && delimiterStack.length > 0 && delimiterStack[delimiterStack.length - 1] === "}") {
        const ahead = normalized.slice(i);
        const matchClose = ahead.match(/^\r?\n([ \t]*)\}/);
        if (matchClose) {
          delimiterStack.pop();
          actions.push({
            type: "overtype",
            char: "}",
            delayMs: Math.max(1, strokeDelay),
            description: "overtype closing brace on block line",
          });
          actions.push({
            type: "pause",
            pauseKind: "block_close",
            delayMs: this.pauseModel.getPauseDuration("block_close"),
            description: "block scope review pause",
          });
          this.stamina.renew();
          i += matchClose[0].length - 1;
          prevChar = "}";
          continue;
        }
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

          if (isHumanized && char === "}") {
            actions.push({
              type: "pause",
              pauseKind: "block_close",
              delayMs: this.pauseModel.getPauseDuration("block_close"),
              description: "block scope review pause",
            });
            this.stamina.renew();
          }

          prevChar = char;
          continue;
        }

        // Statement termination pause on semicolon
        if (isHumanized && char === ";") {
          actions.push({ type: "type", char, delayMs: strokeDelay });
          actions.push({
            type: "pause",
            pauseKind: "syntax_statement",
            delayMs: this.pauseModel.getPauseDuration("syntax_statement"),
            description: "statement syntax completion pause",
          });
          if (i + 1 < normalized.length && normalized[i + 1] === "\n") {
            actions.push({
              type: "pause",
              pauseKind: "post_statement",
              delayMs: this.pauseModel.getPauseDuration("post_statement"),
              description: "post-statement line break pause",
            });
          }
          this.stamina.renew();
          prevChar = char;
          continue;
        }
      }

      // Chance to simulate mid-thought retraction & false start on identifier or variable beginnings
      const isWordStart = wordIdx < wordsInText.length && i === wordsInText[wordIdx].start;
      const enableFalseStarts = this.options.enableFalseStarts ?? false;
      const falseStartRate = this.options.falseStartRate ?? 0.01;
      const shouldFalseStart =
        isHumanized &&
        enableFalseStarts &&
        isWordStart &&
        /[a-zA-Z]/.test(char) &&
        Math.random() < falseStartRate;

      if (shouldFalseStart) {
        const falseChar = this.cadence.getAdjacentKey(char) || (char === "i" ? "j" : "tmp"[Math.floor(Math.random() * 3)]);
        const falseSeq = this.createFalseStartSequence(char, falseChar, strokeDelay);
        actions.push(...falseSeq);
        prevChar = char;
        continue;
      }

      // Chance to simulate realistic human typo on alphabetic characters, digits, and common symbols
      const isTypoEligible = /[a-zA-Z0-9.,;:\-_=+[\]]/.test(char);
      const shouldTypo =
        isHumanized &&
        enableTypos &&
        isTypoEligible &&
        !inBurst &&
        Math.random() < typoRate;

      if (shouldTypo) {
        const adjacent = this.cadence.getAdjacentKey(char);
        if (adjacent && adjacent !== char) {
          if (
            /[a-zA-Z]/.test(char) &&
            i + 1 < normalized.length &&
            /[a-zA-Z0-9]/.test(normalized[i + 1]) &&
            Math.random() < 0.5
          ) {
            const overshootChar = normalized[i + 1];
            const delayedSeq = this.cadence.createDelayedTypoSequence(char, adjacent, overshootChar);
            actions.push(...delayedSeq);
            i++;
            prevChar = overshootChar;
            continue;
          } else {
            const typoSeq = this.cadence.createTypoSequence(char, adjacent);
            actions.push(...typoSeq);
          }
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

  public createFalseStartSequence(targetChar: string, falseChar: string, strokeDelay: number): TypingAction[] {
    const base = this.options.baseDelayMs;
    const scale = Math.max(0.02, base / 30);
    return [
      {
        type: "type",
        char: falseChar,
        delayMs: Math.max(1, Math.round(strokeDelay * 0.9)),
        description: `false start: typed '${falseChar}' before reconsideration`,
      },
      {
        type: "pause",
        delayMs: Math.max(1, Math.round((180 + Math.random() * 150) * scale)),
        description: "mid-thought cognitive pivot & pause",
      },
      {
        type: "backspace",
        delayMs: Math.max(1, Math.round((45 + Math.random() * 30) * scale)),
        description: "retracting false start token",
      },
      {
        type: "type",
        char: targetChar,
        delayMs: Math.max(1, Math.round(strokeDelay * 1.15)),
        description: `resumed correct stroke '${targetChar}'`,
      },
    ];
  }
}

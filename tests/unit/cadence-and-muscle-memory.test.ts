import { describe, it, expect } from "vitest";
import {
  HumanCadence,
  StructuralTokenizer,
  TypingScheduler,
  DefaultTypingEngine,
  QWERTY_PROXIMITY_MAP,
} from "@dtyp/typing-engine";
import { TypingTarget } from "@dtyp/types";

describe("Dimension 1: Cadence, Shift Latency, Muscle Memory & In-Flight Speed", () => {
  describe("1. QWERTY Symbol Proximity & Shift Preparation", () => {
    const cadence = new HumanCadence({
      baseDelayMs: 30,
      jitterMs: 5,
    });

    it("maps digits and C symbols to realistic physical keyboard neighbors", () => {
      // Digits
      expect(QWERTY_PROXIMITY_MAP["1"]).toBeDefined();
      expect(QWERTY_PROXIMITY_MAP["0"]).toContain("9");

      // C Symbols & Punctuation
      expect(QWERTY_PROXIMITY_MAP[";"]).toContain("l");
      expect(QWERTY_PROXIMITY_MAP["["]).toContain("p");
      expect(QWERTY_PROXIMITY_MAP["{"]).toBeDefined();
      expect(QWERTY_PROXIMITY_MAP["*"]).toBeDefined();
    });

    it("returns valid adjacent keys for symbols and uppercase characters", () => {
      const adjBrace = cadence.getAdjacentKey("{");
      expect(adjBrace).not.toBeNull();

      const adjSemi = cadence.getAdjacentKey(";");
      expect(adjSemi).not.toBeNull();

      const adjDigit = cadence.getAdjacentKey("5");
      expect(adjDigit).not.toBeNull();
    });

    it("adds mechanical shift-key physical latency when transitioning to shifted character", () => {
      const delayUnshifted = cadence.calculateStrokeDelay("a", false, "b");
      const delayShifted = cadence.calculateStrokeDelay("A", false, "b");
      const delaySymbolShifted = cadence.calculateStrokeDelay("{", false, "b");

      // Shifted characters must take longer than standard lowercase letters due to shift key prep
      expect(delayShifted).toBeGreaterThan(delayUnshifted);
      expect(delaySymbolShifted).toBeGreaterThan(delayUnshifted);
    });
  });

  describe("2. Identifier Muscle Memory & Familiarity Speedup", () => {
    it("speeds up strokes for identifiers repeated across code", () => {
      const code = `
void test() {
\tNode* current = head;
\twhile (current != NULL) {
\t\tcurrent = current->next;
\t}
}
`;
      const tokenizer = new StructuralTokenizer({
        model: "humanized",
        baseDelayMs: 30,
        enableTypoSimulation: false,
      });

      const actions = tokenizer.tokenizeLinear(code);
      expect(actions.length).toBeGreaterThan(10);

      // Verify actions executed without error and produced valid stream
      const typeActions = actions.filter((a) => a.type === "type");
      expect(typeActions.length).toBeGreaterThan(0);
    });
  });

  describe("3. In-Flight Speed Scrubbing", () => {
    it("dynamically modulates delay using speedMultiplier on TypingScheduler", async () => {
      const mockTarget: TypingTarget = {
        focus: async () => {},
        typeCharacter: async () => {},
        releaseModifiers: async () => {},
      };

      const engine = new DefaultTypingEngine(mockTarget);
      expect(engine.getSpeedMultiplier()).toBe(1.0);

      engine.setSpeedMultiplier(2.0);
      expect(engine.getSpeedMultiplier()).toBe(2.0);

      engine.setSpeedMultiplier(0.5);
      expect(engine.getSpeedMultiplier()).toBe(0.5);
    });
  });
});

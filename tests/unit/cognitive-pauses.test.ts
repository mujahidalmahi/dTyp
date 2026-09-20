import { describe, it, expect } from "vitest";
import {
  CognitivePauseModel,
  StaminaRenewal,
  StructuralTokenizer,
} from "@dtyp/typing-engine";

describe("Cognitive Pauses & Stamina Renewal Engines", () => {
  describe("CognitivePauseModel", () => {
    it("generates positive log-normal pause durations within expected ranges", () => {
      const model = new CognitivePauseModel({ baseDelayMs: 20, intensity: "natural" });

      for (let i = 0; i < 20; i++) {
        const controlPause = model.getPauseDuration("control_flow");
        expect(controlPause).toBeGreaterThan(100);
        expect(controlPause).toBeLessThan(1800);

        const syntaxPause = model.getPauseDuration("syntax_statement");
        expect(syntaxPause).toBeGreaterThan(50);
        expect(syntaxPause).toBeLessThan(1000);

        const restPause = model.getPauseDuration("fatigue_rest");
        expect(restPause).toBeGreaterThan(400);
        expect(restPause).toBeLessThan(6000);
      }
    });

    it("respects cognitive pause intensity configurations", () => {
      const subtleModel = new CognitivePauseModel({ baseDelayMs: 20, intensity: "subtle" });
      const deliberateModel = new CognitivePauseModel({ baseDelayMs: 20, intensity: "deliberate" });

      let subtleSum = 0;
      let deliberateSum = 0;
      for (let i = 0; i < 50; i++) {
        subtleSum += subtleModel.getPauseDuration("control_flow");
        deliberateSum += deliberateModel.getPauseDuration("control_flow");
      }

      expect(deliberateSum).toBeGreaterThan(subtleSum);
    });

    it("triggers organic fatigue micro-rests periodically during sustained typing", () => {
      const model = new CognitivePauseModel({ baseDelayMs: 20 });
      let microRestCount = 0;

      // Simulate 500 keystrokes
      for (let s = 0; s < 500; s++) {
        const rest = model.registerStroke();
        if (rest) {
          expect(rest.type).toBe("pause");
          expect(rest.pauseKind).toBe("fatigue_rest");
          expect(rest.delayMs).toBeGreaterThan(500);
          microRestCount++;
        }
      }

      expect(microRestCount).toBeGreaterThanOrEqual(3);
    });
  });

  describe("StaminaRenewal", () => {
    it("decays stamina on continuous strokes and renews to 1.0 on pause/newline", () => {
      const stamina = new StaminaRenewal();
      expect(stamina.stamina).toBe(1.0);

      for (let i = 0; i < 50; i++) {
        stamina.recordKeystroke();
      }

      expect(stamina.stamina).toBeLessThan(1.0);
      expect(stamina.getDelayMultiplier()).toBeGreaterThan(1.0);

      // Stamina renewal
      stamina.renew();
      expect(stamina.stamina).toBe(1.0);
      expect(stamina.getDelayMultiplier()).toBe(1.0);
    });
  });

  describe("StructuralTokenizer Cognitive Pause Integration", () => {
    const CODE_WITH_FLOW = `int calculate(int x) {
    if (x > 0) {
        return x * 2;
    }
    while (x < 0) {
        x++;
    }
    return 0;
}`;

    it("injects control_flow, syntax_statement, and block_close pauses", () => {
      const tokenizer = new StructuralTokenizer({
        model: "humanized",
        baseDelayMs: 15,
        enableTypoSimulation: false,
      });

      const actions = tokenizer.tokenize(CODE_WITH_FLOW);
      const pauses = actions.filter((a) => a.type === "pause");

      expect(pauses.some((p) => p.pauseKind === "control_flow")).toBe(true);
      expect(pauses.some((p) => p.pauseKind === "syntax_statement")).toBe(true);
      expect(pauses.some((p) => p.pauseKind === "block_close")).toBe(true);
    });
  });
});

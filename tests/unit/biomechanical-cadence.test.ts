import { describe, it, expect } from "vitest";
import { HumanCadence, getHandForKey, LEFT_HAND_KEYS, RIGHT_HAND_KEYS, StructuralTokenizer } from "@dtyp/typing-engine";

describe("Biomechanical Left/Right Hand Cadence & False Starts", () => {
	it("correctly identifies hand layout for QWERTY keys", () => {
		expect(getHandForKey("a")).toBe("left");
		expect(getHandForKey("w")).toBe("left");
		expect(getHandForKey("f")).toBe("left");
		expect(getHandForKey("1")).toBe("left");
		expect(getHandForKey("E")).toBe("left");

		expect(getHandForKey("j")).toBe("right");
		expect(getHandForKey("o")).toBe("right");
		expect(getHandForKey("l")).toBe("right");
		expect(getHandForKey("9")).toBe("right");
		expect(getHandForKey(";")).toBe("right");
	});

	it("applies same-hand latency penalty vs alternating-hand acceleration", () => {
		const cadence = new HumanCadence({ baseDelayMs: 40, jitterMs: 0 });

		// 'd' (left) then 'e' (left) -> same hand
		const sameHandDelay = cadence.calculateStrokeDelay("e", false, "d");

		// 'd' (left) then 'k' (right) -> alternating hand
		const altHandDelay = cadence.calculateStrokeDelay("k", false, "d");

		// Same hand should take significantly longer than alternating hand
		expect(sameHandDelay).toBeGreaterThan(altHandDelay);
		// Delay ratio should be approximately (1.25 / 0.85) ~ 1.47
		expect(sameHandDelay / altHandDelay).toBeGreaterThan(1.3);
	});

	it("generates organic false start sequence when enabled", () => {
		const tokenizer = new StructuralTokenizer({
			model: "humanized",
			baseDelayMs: 20,
			jitterMs: 0,
			enableTypoSimulation: false,
			enableFalseStarts: true,
			falseStartRate: 1.0, // Force false start for testing
		});

		const actions = tokenizer.tokenizeLinear("count");
		// Should contain false start actions: type, pause, backspace, type
		const backspaces = actions.filter((a) => a.type === "backspace");
		expect(backspaces.length).toBeGreaterThan(0);
		expect(backspaces[0].description).toContain("retracting false start");
	});

	it("does not generate false starts when disabled", () => {
		const tokenizer = new StructuralTokenizer({
			model: "humanized",
			baseDelayMs: 20,
			jitterMs: 0,
			enableTypoSimulation: false,
			enableFalseStarts: false,
			falseStartRate: 0,
		});

		const actions = tokenizer.tokenizeLinear("count");
		const backspaces = actions.filter((a) => a.type === "backspace");
		expect(backspaces.length).toBe(0);
	});
});

import { describe, it, expect, vi } from "vitest";

vi.mock("vscode", () => ({
	window: {
		showQuickPick: vi.fn(),
		showTextDocument: vi.fn(),
		setStatusBarMessage: vi.fn(),
	},
	workspace: {
		openTextDocument: vi.fn(),
	},
}));

import { ContestScaffolder } from "../../apps/vscode/src/command/contest-scaffolder.js";

describe("Competitive Programming Contest Scaffolder", () => {
	it("generates fast I/O template with pure tabs", () => {
		const code = ContestScaffolder.generateFastIOTemplate("Two Pointers");
		expect(code).toContain("fast_read_int");
		expect(code).toContain("fast_write_int");
		expect(code).toContain("getchar_unlocked");
		expect(code).toContain("Two Pointers");

		const lines = code.split("\n");
		const indented = lines.filter((l) => l.startsWith("\t"));
		expect(indented.length).toBeGreaterThanOrEqual(10);

		// No 4-space indentations
		const spaceIndented = lines.filter((l) => l.startsWith("    "));
		expect(spaceIndented.length).toBe(0);
	});

	it("generates memory bump arena template with pure tabs", () => {
		const code = ContestScaffolder.generateArenaTemplate();
		expect(code).toContain("arena_alloc");
		expect(code).toContain("arena_reset");
		expect(code).toContain("ARENA_CAPACITY_BYTES");

		const lines = code.split("\n");
		const spaceIndented = lines.filter((l) => l.startsWith("    "));
		expect(spaceIndented.length).toBe(0);
	});

	it("generates automated stress test comparator harness", () => {
		const code = ContestScaffolder.generateStressTestTemplate();
		expect(code).toContain("solve_brute");
		expect(code).toContain("solve_optimized");
		expect(code).toContain("generate_random_test");
		expect(code).toContain("Discrepancy found");
	});
});

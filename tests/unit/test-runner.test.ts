import { describe, it, expect, vi } from "vitest";

vi.mock("vscode", () => ({
	window: {
		activeTextEditor: null,
		showInformationMessage: vi.fn(),
		showWarningMessage: vi.fn(),
		showErrorMessage: vi.fn(),
	},
}));

import { PRESET_TEST_CASES } from "../../apps/vscode/src/command/test-runner.js";

describe("Multi-Test Case Sandbox Runner", () => {
	it("provides comprehensive preset test suites for university C algorithms", () => {
		expect(PRESET_TEST_CASES["Sorting & Arrays"]).toBeDefined();
		expect(PRESET_TEST_CASES["Sorting & Arrays"].length).toBeGreaterThanOrEqual(3);

		expect(PRESET_TEST_CASES["Palindrome & String"]).toBeDefined();
		expect(PRESET_TEST_CASES["Binary Search"]).toBeDefined();
		expect(PRESET_TEST_CASES["Two Sum"]).toBeDefined();
		expect(PRESET_TEST_CASES["GCD (Greatest Common Divisor)"]).toBeDefined();
	});

	it("contains valid test case structure with input and expectedOutput", () => {
		const sortCases = PRESET_TEST_CASES["Sorting & Arrays"];
		for (const tc of sortCases) {
			expect(tc.id).toBeDefined();
			expect(tc.name).toBeDefined();
			expect(tc.input).toBeDefined();
			expect(tc.expectedOutput).toBeDefined();
		}
	});
});

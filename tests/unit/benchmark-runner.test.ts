import { describe, it, expect, vi } from "vitest";

vi.mock("vscode", () => ({
	window: {
		activeTextEditor: null,
		showInformationMessage: vi.fn(),
		showWarningMessage: vi.fn(),
		showErrorMessage: vi.fn(),
	},
}));

import { BenchmarkRunner } from "../../apps/vscode/src/command/benchmark-runner.js";

describe("Empirical Time & Memory Complexity Benchmarker", () => {
	it("detects quadratic O(N^2) asymptotic complexity from empirical scaling", () => {
		// Bubble Sort / Selection Sort scaling: 100 -> 0.05ms, 1000 -> 5.0ms (10x N -> 100x time)
		const points = [
			{ n: 100, timeMs: 0.05 },
			{ n: 200, timeMs: 0.20 },
			{ n: 500, timeMs: 1.25 },
			{ n: 1000, timeMs: 5.00 },
			{ n: 2000, timeMs: 20.00 },
		];

		const { fit, explanation } = BenchmarkRunner.determineFit(points);
		expect(fit).toBe("O(N^2)");
		expect(explanation).toContain("Quadratic");
	});

	it("detects constant O(1) complexity when runtime is flat across sizes", () => {
		// Hash table lookup / Array index access
		const points = [
			{ n: 100, timeMs: 0.005 },
			{ n: 1000, timeMs: 0.005 },
			{ n: 10000, timeMs: 0.006 },
			{ n: 50000, timeMs: 0.005 },
		];

		const { fit, explanation } = BenchmarkRunner.determineFit(points);
		expect(fit).toBe("O(1)");
		expect(explanation).toContain("Constant time");
	});

	it("generates complete, valid SVG chart containing coordinates and fit indicator", () => {
		const points = [
			{ n: 100, timeMs: 0.1 },
			{ n: 500, timeMs: 0.5 },
			{ n: 1000, timeMs: 1.0 },
		];

		const svg = BenchmarkRunner.generateSvgChart(points, "O(N)");
		expect(svg).toContain("<svg");
		expect(svg).toContain("</svg>");
		expect(svg).toContain("polyline");
		expect(svg).toContain("Fit: O(N)");
		expect(svg).toContain("Input Size (N)");
		expect(svg).toContain("Elapsed Time (ms)");
	});
});

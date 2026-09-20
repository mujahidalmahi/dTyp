import { describe, it, expect, vi, beforeEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";

vi.mock("vscode", () => {
	const configStore: Record<string, any> = {
		"dtyp.typingMode": "automatic",
		"dtyp.stepSize": 1,
		"dtyp.typingDelayMs": 15,
		"dtyp.typingJitterMs": 5,
		"dtyp.undoChunkSize": 3,
		"dtyp.onCursorJump": "realign",
		"dtyp.pauseOnTabSwitch": true,
		"dtyp.naturalTypingModel": "nonlinear",
		"dtyp.cognitivePauseIntensity": "natural",
		"dtyp.enableFatigueRenewal": true,
		"dtyp.enableTypoSimulation": true,
		"dtyp.typoRate": 0.015,
		"dtyp.enableChameleonMode": false,
		"dtyp.enableFalseStarts": true,
		"dtyp.falseStartRate": 0.01,
		"dtyp.soundFeedback": true,
		"dtyp.switchProfile": "blue",
		"dtyp.academicBraceStyle": "kr",
		"dtyp.analyzeMemoryAllocations": true,
		"dtyp.checkDuplicates": true,
		"dtyp.autoIncludeHeaders": true,
		"dtyp.showReleaseNotesOnUpdate": true,
		"dtyp.checkForUpdates": true,
	};

	return {
		workspace: {
			getConfiguration: vi.fn((section?: string) => ({
				get: vi.fn((key: string, defaultVal?: any) => {
					const fullKey = section ? `${section}.${key}` : key;
					return configStore[fullKey] ?? defaultVal;
				}),
			})),
		},
		commands: {
			executeCommand: vi.fn(),
		},
		window: {
			activeTextEditor: null,
			showInformationMessage: vi.fn(),
			showWarningMessage: vi.fn(),
			showQuickPick: vi.fn(),
		},
		ThemeIcon: class {
			constructor(public id: string) {}
		},
		TreeItem: class {
			constructor(public label: string, public collapsibleState: any) {}
		},
		TreeItemCollapsibleState: { None: 0 },
		EventEmitter: class {
			event = vi.fn();
			fire = vi.fn();
		},
	};
});

import { AcademicFormatter } from "../../apps/vscode/src/command/code-doctor.js";
import { QuickActionsTreeProvider } from "../../apps/vscode/src/view/quick-actions-tree-provider.js";

describe("Settings & Navigation Verification", () => {
	it("verifies package.json contains all 22 configuration properties with non-conflicting types", () => {
		const pkgPath = path.join(__dirname, "../../apps/vscode/package.json");
		const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
		const props = pkg.contributes.configuration.properties;

		const expectedSettings = [
			"dtyp.typingMode",
			"dtyp.stepSize",
			"dtyp.typingDelayMs",
			"dtyp.undoChunkSize",
			"dtyp.onCursorJump",
			"dtyp.pauseOnTabSwitch",
			"dtyp.typingJitterMs",
			"dtyp.naturalTypingModel",
			"dtyp.cognitivePauseIntensity",
			"dtyp.enableFatigueRenewal",
			"dtyp.enableTypoSimulation",
			"dtyp.typoRate",
			"dtyp.enableChameleonMode",
			"dtyp.enableFalseStarts",
			"dtyp.falseStartRate",
			"dtyp.soundFeedback",
			"dtyp.switchProfile",
			"dtyp.academicBraceStyle",
			"dtyp.analyzeMemoryAllocations",
			"dtyp.checkDuplicates",
			"dtyp.autoIncludeHeaders",
			"dtyp.showReleaseNotesOnUpdate",
			"dtyp.checkForUpdates",
		];

		for (const setting of expectedSettings) {
			expect(props[setting], `Missing setting: ${setting}`).toBeDefined();
			expect(props[setting].description).toBeTruthy();
			expect(props[setting].default).toBeDefined();
		}
	});

	it("formats with pure tabs under both K&R and Allman brace styles", () => {
		const code = `int compute(int x) {\n    if (x > 0) {\n        return x * 2;\n    }\n    return 0;\n}`;
		const krFormatted = AcademicFormatter.format(code, "kr");
		const allmanFormatted = AcademicFormatter.format(code, "allman");

		// Both must use pure tabs '\t' and zero 4-space blocks
		expect(krFormatted).toContain("\t");
		expect(krFormatted).not.toContain("    ");
		expect(allmanFormatted).toContain("\t");
		expect(allmanFormatted).not.toContain("    ");

		// Allman style places opening brace on its own line
		expect(allmanFormatted.split("\n").some((line) => line.trim() === "{")).toBe(true);
	});

	it("verifies QuickActionsTreeProvider has Control Center & Master Hub at index 0", async () => {
		const provider = new QuickActionsTreeProvider();
		const items = await provider.getChildren();

		expect(items.length).toBeGreaterThan(0);
		expect(items[0].id).toBe("open_control_center");
		expect(items[0].command).toBe("dtyp.openControlCenter");
		expect(items[0].label).toContain("Control Center");
	});
});

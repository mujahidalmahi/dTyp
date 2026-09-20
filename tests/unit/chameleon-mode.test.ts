import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("vscode", () => {
	class Position {
		constructor(public line: number, public character: number) {}
		isEqual(other: Position) {
			return this.line === other.line && this.character === other.character;
		}
	}
	class Selection {
		constructor(public anchor: Position, public active: Position) {}
	}
	class Range {
		constructor(public start: Position, public end: Position) {}
	}

	return {
		Position,
		Selection,
		Range,
		window: {
			activeTextEditor: null,
			showInformationMessage: vi.fn(),
			showWarningMessage: vi.fn(),
			showErrorMessage: vi.fn(),
			setStatusBarMessage: vi.fn(),
		},
		workspace: {
			getConfiguration: vi.fn().mockReturnValue({
				get: (key: string, def: any) => {
					if (key === "stepSize") return 1;
					if (key === "typingMode") return "manual";
					return def;
				},
			}),
		},
		commands: {
			executeCommand: vi.fn(),
		},
	};
});

import * as vscode from "vscode";
import { AutoTypeEngine } from "../../apps/vscode/src/engine/auto-type-engine.js";
import { DefaultTypingEngine } from "@dtyp/typing-engine";
import { VSCodeTypingTarget } from "../../apps/vscode/src/adapter/vscode-typing-target.js";

describe("Chameleon Ghost-Typing Mode", () => {
	let autoTypeEngine: AutoTypeEngine;
	let typingEngine: DefaultTypingEngine;
	let typingTarget: VSCodeTypingTarget;

	beforeEach(() => {
		vi.clearAllMocks();
		typingTarget = new VSCodeTypingTarget();
		typingEngine = new DefaultTypingEngine(typingTarget);
		autoTypeEngine = new AutoTypeEngine(typingEngine, typingTarget);
	});

	it("initializes with Chameleon mode disabled", () => {
		expect(autoTypeEngine.isChameleonEnabled()).toBe(false);
		expect(autoTypeEngine.isChameleonActive()).toBe(false);
	});

	it("toggles Chameleon mode on and off", () => {
		const newState = autoTypeEngine.toggleChameleonMode();
		expect(newState).toBe(true);
		expect(autoTypeEngine.isChameleonEnabled()).toBe(true);
		expect(vscode.commands.executeCommand).toHaveBeenCalledWith("setContext", "dtyp.chameleonMode", true);

		const turnedOff = autoTypeEngine.toggleChameleonMode();
		expect(turnedOff).toBe(false);
		expect(autoTypeEngine.isChameleonEnabled()).toBe(false);
		expect(vscode.commands.executeCommand).toHaveBeenCalledWith("setContext", "dtyp.chameleonMode", false);
	});

	it("isChameleonActive is true only when both enabled AND queued characters exist", async () => {
		autoTypeEngine.setChameleonMode(true);
		// Queue is empty -> false
		expect(autoTypeEngine.isChameleonActive()).toBe(false);

		// Queue a manual insertion
		const mockEditor: any = {
			selection: { active: new (vscode as any).Position(0, 0) },
			document: { uri: { toString: () => "file:///test.c" } },
		};

		await autoTypeEngine.startInsertion("test_comp", "TestComp", "int x = 0;", mockEditor, "manual");

		// Queue has characters and chameleon is enabled -> true
		expect(autoTypeEngine.isChameleonActive()).toBe(true);

		// Toggle off chameleon mode -> false
		autoTypeEngine.setChameleonMode(false);
		expect(autoTypeEngine.isChameleonActive()).toBe(false);
	});
});

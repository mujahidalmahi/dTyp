import { describe, it, expect, vi } from "vitest";

vi.mock("vscode", () => ({
	window: {
		activeTextEditor: null,
		showWarningMessage: vi.fn(),
		showInformationMessage: vi.fn(),
		showErrorMessage: vi.fn(),
		setStatusBarMessage: vi.fn(),
		createTerminal: vi.fn(),
	},
	commands: {
		executeCommand: vi.fn(),
	},
}));

import { ValgrindParser } from "../../apps/vscode/src/command/valgrind-runner.js";

describe("Valgrind Memory Leak Parser", () => {
	it("parses leak summary and error counts accurately", () => {
		const rawLog = `
==12345== Memcheck, a memory error detector
==12345== 
==12345== 40 bytes in 1 blocks are definitely lost in loss record 1 of 2
==12345==    at 0x4C29F73: malloc (vg_replace_malloc.c:309)
==12345==    by 0x4005C3: create_node (linked_list.c:14)
==12345==    by 0x400615: main (linked_list.c:28)
==12345== 
==12345== LEAK SUMMARY:
==12345==    definitely lost: 40 bytes in 1 blocks
==12345==    indirectly lost: 16 bytes in 1 blocks
==12345==      possibly lost: 0 bytes in 0 blocks
==12345==    still reachable: 1,024 bytes in 1 blocks
==12345==         suppressed: 0 bytes in 0 blocks
==12345== 
==12345== ERROR SUMMARY: 2 errors from 2 contexts (suppressed: 0 from 0)
`;

		const report = ValgrindParser.parse(rawLog, "linked_list.c");
		expect(report.definitelyLostBytes).toBe(40);
		expect(report.indirectlyLostBytes).toBe(16);
		expect(report.stillReachableBytes).toBe(1024);
		expect(report.totalErrors).toBe(2);

		expect(report.leaks.length).toBeGreaterThanOrEqual(1);
		expect(report.leaks[0].bytes).toBe(40);
	});

	it("returns zero lost bytes on clean execution without leaks", () => {
		const cleanLog = `
==12345== All heap blocks were freed -- no leaks are possible
==12345== 
==12345== ERROR SUMMARY: 0 errors from 0 contexts
`;
		const report = ValgrindParser.parse(cleanLog);
		expect(report.definitelyLostBytes).toBe(0);
		expect(report.indirectlyLostBytes).toBe(0);
		expect(report.totalErrors).toBe(0);
		expect(report.leaks.length).toBe(0);
	});
});

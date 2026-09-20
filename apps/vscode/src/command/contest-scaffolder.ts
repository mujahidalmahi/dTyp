import * as vscode from "vscode";

export type ContestTemplateType = "fast_io" | "arena" | "stress_test";

export class ContestScaffolder {
	/**
	 * Generates competition-ready C contest boilerplate with fast I/O and zero machine overhead.
	 */
	public static generateFastIOTemplate(problemName = "Problem Solution"): string {
		return [
			`/**`,
			` * dTyp Competitive Programming Template: ${problemName}`,
			` * Standard: C11 (-O3)`,
			` * Fast I/O: getchar_unlocked / putchar_unlocked (~5x faster than scanf/printf)`,
			` */`,
			``,
			`#include <stdio.h>`,
			`#include <stdlib.h>`,
			`#include <stdbool.h>`,
			`#include <string.h>`,
			`#include <stdint.h>`,
			``,
			`#if defined(_WIN32) || defined(_WIN64)`,
			`#define getchar_unlocked _getchar_nolock`,
			`#define putchar_unlocked _putchar_nolock`,
			`#endif`,
			``,
			`/* Fast Integer Input Reader */`,
			`static inline int64_t fast_read_int(void) {`,
			`\tint64_t val = 0;`,
			`\tint ch = getchar_unlocked();`,
			`\tbool negative = false;`,
			`\twhile (ch <= ' ' && ch != EOF) ch = getchar_unlocked();`,
			`\tif (ch == '-') { negative = true; ch = getchar_unlocked(); }`,
			`\twhile (ch >= '0' && ch <= '9') {`,
			`\t\tval = (val << 3) + (val << 1) + (ch - '0');`,
			`\t\tch = getchar_unlocked();`,
			`\t}`,
			`\treturn negative ? -val : val;`,
			`}`,
			``,
			`/* Fast Integer Output Writer */`,
			`static inline void fast_write_int(int64_t n) {`,
			`\tif (n < 0) { putchar_unlocked('-'); n = -n; }`,
			`\tchar buf[24];`,
			`\tint idx = 0;`,
			`\tdo {`,
			`\t\tbuf[idx++] = (char)('0' + (n % 10));`,
			`\t\tn /= 10;`,
			`\t} while (n > 0);`,
			`\twhile (idx > 0) putchar_unlocked(buf[--idx]);`,
			`}`,
			``,
			`static inline void fast_write_char(char c) {`,
			`\tputchar_unlocked(c);`,
			`}`,
			``,
			`void solve(void) {`,
			`\tint64_t n = fast_read_int();`,
			`\t/* TODO: Implement competitive solution logic */`,
			`\tfast_write_int(n);`,
			`\tfast_write_char('\\n');`,
			`}`,
			``,
			`int main(void) {`,
			`\tint test_cases = 1;`,
			`\t/* Uncomment for multiple test cases: test_cases = (int)fast_read_int(); */`,
			`\twhile (test_cases-- > 0) {`,
			`\t\tsolve();`,
			`\t}`,
			`\treturn 0;`,
			`}`,
			``,
		].join("\n");
	}

	/**
	 * Generates static memory bump allocator arena template.
	 */
	public static generateArenaTemplate(problemName = "Graph / Tree Contest Solution"): string {
		return [
			`/**`,
			` * dTyp Memory Bump Arena Template: ${problemName}`,
			` * Allocates from a static 64MB buffer in O(1) time without malloc/heap overhead.`,
			` */`,
			``,
			`#include <stdio.h>`,
			`#include <stdlib.h>`,
			`#include <stdint.h>`,
			`#include <stddef.h>`,
			``,
			`#define ARENA_CAPACITY_BYTES (64 * 1024 * 1024)`,
			``,
			`static uint8_t g_arena_buffer[ARENA_CAPACITY_BYTES];`,
			`static size_t g_arena_offset = 0;`,
			``,
			`/* O(1) Bump Memory Allocator */`,
			`void* arena_alloc(size_t size) {`,
			`\t/* 8-byte alignment */`,
			`\tsize_t aligned = (size + 7) & ~((size_t)7);`,
			`\tif (g_arena_offset + aligned > ARENA_CAPACITY_BYTES) {`,
			`\t\tfprintf(stderr, "Arena memory limit exceeded!\\n");`,
			`\t\texit(1);`,
			`\t}`,
			`\tvoid* ptr = (void*)&g_arena_buffer[g_arena_offset];`,
			`\tg_arena_offset += aligned;`,
			`\treturn ptr;`,
			`}`,
			``,
			`void arena_reset(void) {`,
			`\tg_arena_offset = 0;`,
			`}`,
			``,
			`typedef struct Node {`,
			`\tint val;`,
			`\tstruct Node* next;`,
			`} Node;`,
			``,
			`Node* create_node(int val) {`,
			`\tNode* n = (Node*)arena_alloc(sizeof(Node));`,
			`\tn->val = val;`,
			`\tn->next = NULL;`,
			`\treturn n;`,
			`}`,
			``,
			`int main(void) {`,
			`\tNode* head = create_node(100);`,
			`\thead->next = create_node(200);`,
			`\tprintf("Allocated in arena at %p and %p\\n", (void*)head, (void*)head->next);`,
			`\tarena_reset();`,
			`\treturn 0;`,
			`}`,
			``,
		].join("\n");
	}

	/**
	 * Generates automated stress-test comparator framework.
	 */
	public static generateStressTestTemplate(problemName = "Stress Tester"): string {
		return [
			`/**`,
			` * dTyp Automated Stress-Tester: ${problemName}`,
			` * Compares solve_brute() O(N^2) against solve_optimized() O(N log N) across random inputs.`,
			` */`,
			``,
			`#include <stdio.h>`,
			`#include <stdlib.h>`,
			`#include <stdbool.h>`,
			`#include <time.h>`,
			``,
			`/* 1. Naive / Brute-Force Solution (Guaranteed Correct) */`,
			`int64_t solve_brute(int arr[], int n) {`,
			`\tint64_t max_sum = -1e18;`,
			`\tfor (int i = 0; i < n; i++) {`,
			`\t\tint64_t current = 0;`,
			`\t\tfor (int j = i; j < n; j++) {`,
			`\t\t\tcurrent += arr[j];`,
			`\t\t\tif (current > max_sum) max_sum = current;`,
			`\t\t}`,
			`\t}`,
			`\treturn max_sum;`,
			`}`,
			``,
			`/* 2. Optimized Solution (To Verify) */`,
			`int64_t solve_optimized(int arr[], int n) {`,
			`\tint64_t max_so_far = arr[0];`,
			`\tint64_t current_max = arr[0];`,
			`\tfor (int i = 1; i < n; i++) {`,
			`\t\tcurrent_max = (arr[i] > current_max + arr[i]) ? arr[i] : current_max + arr[i];`,
			`\t\tif (current_max > max_so_far) max_so_far = current_max;`,
			`\t}`,
			`\treturn max_so_far;`,
			`}`,
			``,
			`/* 3. Random Test Generator */`,
			`void generate_random_test(int arr[], int* n) {`,
			`\t*n = 2 + rand() % 20;`,
			`\tfor (int i = 0; i < *n; i++) {`,
			`\t\tarr[i] = (rand() % 200) - 100;`,
			`\t}`,
			`}`,
			``,
			`int main(void) {`,
			`\tsrand((unsigned int)time(NULL));`,
			`\tint arr[100];`,
			`\tint n;`,
			`\tint trials = 5000;`,
			`\tprintf("Running %d stress test trials...\\n", trials);`,
			``,
			`\tfor (int t = 1; t <= trials; t++) {`,
			`\t\tgenerate_random_test(arr, &n);`,
			`\t\tint64_t ans_brute = solve_brute(arr, n);`,
			`\t\tint64_t ans_opt = solve_optimized(arr, n);`,
			``,
			`\t\tif (ans_brute != ans_opt) {`,
			`\t\t\tprintf("❌ Discrepancy found at trial #%d!\\n", t);`,
			`\t\t\tprintf("Input size: %d\\nArray: ", n);`,
			`\t\t\tfor (int i = 0; i < n; i++) printf("%d ", arr[i]);`,
			`\t\t\tprintf("\\nBrute-force answer: %lld\\nOptimized answer:   %lld\\n", (long long)ans_brute, (long long)ans_opt);`,
			`\t\t\treturn 1;`,
			`\t\t}`,
			`\t}`,
			``,
			`\tprintf("✅ All %d stress tests matched perfectly!\\n", trials);`,
			`\treturn 0;`,
			`}`,
			``,
		].join("\n");
	}

	/**
	 * VS Code Command: Prompts user to pick template and opens in editor.
	 */
	public static async scaffold(editor?: vscode.TextEditor): Promise<void> {
		const items = [
			{
				label: "$(zap) Fast I/O Contest Template",
				description: "getchar_unlocked & putchar_unlocked",
				detail: "Ultra-fast integer reading and writing for high-frequency input judges.",
				type: "fast_io" as ContestTemplateType,
			},
			{
				label: "$(package) Static Memory Bump Arena",
				description: "arena_alloc() without malloc/heap overhead",
				detail: "64MB static memory pool with constant O(1) allocation time.",
				type: "arena" as ContestTemplateType,
			},
			{
				label: "$(beaker) Automated Stress-Test Framework",
				description: "Brute-force vs Optimized differential comparator",
				detail: "Random input generator that runs thousands of trials to catch edge cases.",
				type: "stress_test" as ContestTemplateType,
			},
		];

		const picked = await vscode.window.showQuickPick(items, {
			placeHolder: "Select Competitive Programming Scaffolding Template...",
		});
		if (!picked) return;

		let code = "";
		if (picked.type === "fast_io") code = this.generateFastIOTemplate();
		else if (picked.type === "arena") code = this.generateArenaTemplate();
		else if (picked.type === "stress_test") code = this.generateStressTestTemplate();

		const doc = await vscode.workspace.openTextDocument({
			language: "c",
			content: code,
		});
		await vscode.window.showTextDocument(doc);
		vscode.window.setStatusBarMessage(`$(check) dTyp: Scaffolding ${picked.label} ready!`, 3500);
	}
}

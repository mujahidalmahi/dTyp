import { describe, it, expect, vi } from "vitest";

vi.mock("vscode", () => ({
	window: {
		activeTextEditor: null,
		showWarningMessage: vi.fn(),
		showInformationMessage: vi.fn(),
		showErrorMessage: vi.fn(),
		showTextDocument: vi.fn(),
	},
	workspace: {
		openTextDocument: vi.fn(),
	},
	Uri: {
		file: (f: string) => ({ fsPath: f }),
	},
}));

import { AcademicModularizer } from "../../apps/vscode/src/command/modularize-command.js";

describe("Academic Modularizer & Makefile Generator", () => {
	const sampleCProgram = `
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
	int data;
	struct Node* next;
} Node;

Node* create_node(int val) {
	Node* n = (Node*)malloc(sizeof(Node));
	n->data = val;
	n->next = NULL;
	return n;
}

void print_list(Node* head) {
	Node* curr = head;
	while (curr != NULL) {
		printf("%d -> ", curr->data);
		curr = curr->next;
	}
	printf("NULL\\n");
}

int main(int argc, char* argv[]) {
	Node* head = create_node(10);
	head->next = create_node(20);
	print_list(head);
	return 0;
}
`;

	it("extracts header with header guards and function prototypes", () => {
		const result = AcademicModularizer.modularize(sampleCProgram, "linked_list");

		expect(result.headerFile.name).toBe("linked_list.h");
		expect(result.headerFile.content).toContain("#ifndef LINKED_LIST_H");
		expect(result.headerFile.content).toContain("#define LINKED_LIST_H");
		expect(result.headerFile.content).toContain("typedef struct Node");
		expect(result.headerFile.content).toContain("Node* create_node(int val);");
		expect(result.headerFile.content).toContain("void print_list(Node* head);");
		expect(result.headerFile.content).not.toContain("int main");
	});

	it("extracts implementations to module.c", () => {
		const result = AcademicModularizer.modularize(sampleCProgram, "linked_list");

		expect(result.implFile.name).toBe("linked_list.c");
		expect(result.implFile.content).toContain('#include "linked_list.h"');
		expect(result.implFile.content).toContain("create_node(int val)");
		expect(result.implFile.content).toContain("print_list(Node* head)");
		expect(result.implFile.content).not.toContain("int main");
	});

	it("extracts main driver to main.c", () => {
		const result = AcademicModularizer.modularize(sampleCProgram, "linked_list");

		expect(result.mainFile.name).toBe("main.c");
		expect(result.mainFile.content).toContain('#include "linked_list.h"');
		expect(result.mainFile.content).toContain("int main(int argc, char* argv[])");
	});

	it("generates university Makefile where all recipes strictly use real tabs '\\t'", () => {
		const result = AcademicModularizer.modularize(sampleCProgram, "linked_list");

		expect(result.makefile.name).toBe("Makefile");
		const lines = result.makefile.content.split("\n");

		// Check recipes under targets
		const recipeLines = lines.filter((l) => l.startsWith("\t"));
		expect(recipeLines.length).toBeGreaterThanOrEqual(4);

		// STRICT REQUIREMENT: No recipe line begins with 4 spaces
		const invalidSpaceRecipes = lines.filter((l) => l.startsWith("    $(CC)") || l.startsWith("    rm -f") || l.startsWith("    ./"));
		expect(invalidSpaceRecipes.length).toBe(0);

		// Verify key targets
		expect(result.makefile.content).toContain("all: $(TARGET)");
		expect(result.makefile.content).toContain("clean:");
		expect(result.makefile.content).toContain("run: $(TARGET)");
	});
});

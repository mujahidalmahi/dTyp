import { describe, it, expect } from "vitest";
import {
  CStructuralDecomposer,
  NonlinearAuthoringPlanner,
  StructuralTokenizer,
  CharacterQueue,
} from "@dtyp/typing-engine";

const SAMPLE_C_PROGRAM = `#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 100

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* createNode(int value) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (newNode == NULL) return NULL;
    newNode->data = value;
    newNode->next = NULL;
    return newNode;
}

void printList(Node* head) {
    Node* current = head;
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\\n");
}

int main(void) {
    Node* head = createNode(10);
    head->next = createNode(20);
    printList(head);
    return 0;
}
`;

const SAMPLE_SNIPPET = `void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}`;

describe("Nonlinear Authoring Engine: Structural Decomposition & Realistic Sequencing", () => {
  describe("CStructuralDecomposer", () => {
    it("identifies full C programs with main() and helpers", () => {
      const decomposed = CStructuralDecomposer.decompose(SAMPLE_C_PROGRAM);
      expect(decomposed.isFullProgram).toBe(true);
      expect(decomposed.headers).toContain("#include <stdio.h>");
      expect(decomposed.headers).toContain("#include <stdlib.h>");
      expect(decomposed.macros).toContain("#define MAX_SIZE 100");
      expect(decomposed.types.length).toBe(1);
      expect(decomposed.types[0]).toContain("typedef struct Node");
      expect(decomposed.helperFunctions.length).toBe(2);
      expect(decomposed.helperFunctions[0].name).toBe("createNode");
      expect(decomposed.helperFunctions[1].name).toBe("printList");
      expect(decomposed.mainFunction).toBeDefined();
      expect(decomposed.mainFunction?.signature).toBe("int main(void)");
      expect(decomposed.mainFunction?.returnStatement).toBe("return 0;");
      expect(decomposed.mainFunction?.driverStatements).toContain("Node* head = createNode(10);");
    });

    it("gracefully falls back for standalone snippets without main()", () => {
      const decomposed = CStructuralDecomposer.decompose(SAMPLE_SNIPPET);
      expect(decomposed.isFullProgram).toBe(false);
      expect(decomposed.mainFunction).toBeNull();
      expect(decomposed.helperFunctions.length).toBe(1);
      expect(decomposed.helperFunctions[0].name).toBe("swap");
    });
  });

  describe("NonlinearAuthoringPlanner", () => {
    it("creates a 4-phase human authoring plan for full C programs", () => {
      const decomposed = CStructuralDecomposer.decompose(SAMPLE_C_PROGRAM);
      const steps = NonlinearAuthoringPlanner.plan(decomposed, SAMPLE_C_PROGRAM);

      expect(steps.length).toBeGreaterThanOrEqual(4);

      // Phase 1: Headers & main scaffold
      const scaffoldStep = steps[0];
      expect(scaffoldStep.kind).toBe("main_scaffold");
      expect(scaffoldStep.code).toContain("#include <stdio.h>");
      expect(scaffoldStep.code).toContain("int main(void) {");
      expect(scaffoldStep.code).toContain("return 0;");

      // Phase 2: Structs/Types with cursor jump above main
      const typeStep = steps.find((s) => s.kind === "types");
      expect(typeStep).toBeDefined();
      expect(typeStep?.cursorMoveBefore).toBeDefined();
      expect(typeStep?.cursorMoveBefore?.landmark).toBe("above_main");
      expect(typeStep?.code).toContain("typedef struct Node");

      // Phase 3: Helper functions
      const helperSteps = steps.filter((s) => s.kind === "helper_function");
      expect(helperSteps.length).toBe(2);
      expect(helperSteps[0].code).toContain("createNode");
      expect(helperSteps[1].code).toContain("printList");

      // Phase 4: Main driver logic with cursor jump inside main
      const driverStep = steps.find((s) => s.kind === "main_driver");
      expect(driverStep).toBeDefined();
      expect(driverStep?.cursorMoveBefore).toBeDefined();
      expect(driverStep?.cursorMoveBefore?.landmark).toBe("inside_main");
      expect(driverStep?.code).toContain("Node* head = createNode(10);");
    });

    it("returns a single raw step for non-program snippets", () => {
      const decomposed = CStructuralDecomposer.decompose(SAMPLE_SNIPPET);
      const steps = NonlinearAuthoringPlanner.plan(decomposed, SAMPLE_SNIPPET);

      expect(steps.length).toBe(1);
      expect(steps[0].kind).toBe("raw");
      expect(steps[0].code).toBe(SAMPLE_SNIPPET);
    });
  });

  describe("StructuralTokenizer with Nonlinear Model", () => {
    it("produces cursor_move actions for full C programs", () => {
      const tokenizer = new StructuralTokenizer({
        model: "nonlinear",
        baseDelayMs: 10,
        enableTypoSimulation: false,
      });

      const actions = tokenizer.tokenize(SAMPLE_C_PROGRAM);
      const cursorMoves = actions.filter((a) => a.type === "cursor_move");

      expect(cursorMoves.length).toBeGreaterThanOrEqual(2);
      expect(cursorMoves.some((m) => m.targetLandmark === "above_main")).toBe(true);
      expect(cursorMoves.some((m) => m.targetLandmark === "inside_main")).toBe(true);
    });

    it("produces only linear actions when model is linear", () => {
      const tokenizer = new StructuralTokenizer({
        model: "linear",
        baseDelayMs: 10,
      });

      const actions = tokenizer.tokenize(SAMPLE_C_PROGRAM);
      const cursorMoves = actions.filter((a) => a.type === "cursor_move");
      expect(cursorMoves.length).toBe(0);
    });
  });

  describe("CharacterQueue Action Loading", () => {
    it("correctly preserves targetLandmark, targetLineOffset, and targetColumn", () => {
      const queue = new CharacterQueue();
      queue.loadActions([
        {
          type: "cursor_move",
          targetLineOffset: -3,
          targetColumn: 0,
          targetLandmark: "above_main",
          delayMs: 150,
        },
        {
          type: "type",
          char: "v",
          delayMs: 20,
        },
      ]);

      expect(queue.length).toBe(2);
      const first = queue.dequeue();
      expect(first?.action).toBe("cursor_move");
      expect(first?.targetLineOffset).toBe(-3);
      expect(first?.targetLandmark).toBe("above_main");

      const second = queue.dequeue();
      expect(second?.action).toBe("type");
      expect(second?.char).toBe("v");
    });
  });
});

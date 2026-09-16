import * as path from "node:path";
import { Component, Snippet, Template } from "@dtyp/types";
import { safeWriteJsonFile, ensureDirectoryExists, defaultLogger } from "@dtyp/utilities";
import { createSnippet, createTemplate } from "./category-builders.js";
import { getPart1Components } from "./categories/part1-basics.js";
import { getPart2Components } from "./categories/part2-memory-structs.js";
import { getPart3Components } from "./categories/part3-data-structures.js";
import { getPart4Components } from "./categories/part4-algorithms-numerical.js";

const logger = defaultLogger.child("LibraryGenerator");

export const generateLibrary = async (): Promise<{
  components: Component[];
  snippets: Snippet[];
  templates: Template[];
}> => {
  logger.info("Starting dTyp Academic C Library generation...");

  const allComponents: Component[] = [
    ...getPart1Components(),
    ...getPart2Components(),
    ...getPart3Components(),
    ...getPart4Components(),
  ];

  logger.info(`Total components gathered: ${allComponents.length}`);

  // Generate Snippets
  const snippets: Snippet[] = [
    createSnippet("snip_ll_node", "dtyp.ll.node", "Node* ${1:node} = createNode(${2:0});", "Instantiate a new linked list node", "linked-list", "linkedList.createNode"),
    createSnippet("snip_stack_create", "dtyp.stack.basic", "ArrayStack* ${1:stack} = createStack(${2:100});", "Create fixed size stack", "stack", "stack.createStack"),
    createSnippet("snip_queue_create", "dtyp.queue.basic", "ArrayQueue* ${1:queue} = createQueue(${2:100});", "Create circular queue", "queue", "queue.createQueue"),
    createSnippet("snip_quick_sort", "dtyp.sort.quick", "quickSort(${1:arr}, 0, ${2:n} - 1);", "Invoke quicksort on array slice", "sorting", "sorting.quickSort"),
    createSnippet("snip_binary_search", "dtyp.search.binary", "int ${1:idx} = binarySearch(${2:arr}, ${3:n}, ${4:target});", "Binary search invocation", "searching", "searching.binarySearch"),
    createSnippet("snip_bst_insert", "dtyp.bst.insert", "${1:root} = insert(${1:root}, ${2:val});", "Insert into BST", "bst", "bst.insert"),
    createSnippet("snip_dijkstra", "dtyp.graph.dijkstra", "dijkstra(${1:g}, ${2:0}, ${3:dist});", "Run Dijkstra algorithm", "graph", "graph.dijkstra"),
    createSnippet("snip_knapsack", "dtyp.dp.knapsack", "int ${1:maxVal} = knapsack01(${2:W}, ${3:wt}, ${4:val}, ${5:n});", "0/1 Knapsack solution", "dynamic-programming", "dp.knapsack01"),
    createSnippet("snip_bisection", "dtyp.num.bisection", "double ${1:root} = bisectionMethod(${2:f}, ${3:a}, ${4:b}, ${5:1e-6});", "Root finding bisection", "numerical-methods", "numerical.bisectionMethod"),
    createSnippet("snip_print_array", "dtyp.array.print", "printArray(${1:arr}, ${2:n});", "Print array elements to stdout", "arrays", "arrays.printArray"),
  ];

  // Generate Templates
  const templates: Template[] = [
    createTemplate(
      "c_starter_main",
      "Standard C Program Boilerplate",
      "fundamentals",
      `#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main(int argc, char* argv[]) {\n    printf("dTyp C Environment Initialized\\n");\n    return 0;\n}`,
      "Standard academic C boilerplate with headers and main entrypoint"
    ),
    createTemplate(
      "linked_list_complete",
      "Complete Singly Linked List Implementation",
      "linked-list",
      `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node* next;\n} Node;\n\nNode* createNode(int data) {\n    Node* n = (Node*)malloc(sizeof(Node));\n    n->data = data;\n    n->next = NULL;\n    return n;\n}\n\nvoid printList(Node* head) {\n    while (head) {\n        printf("%d -> ", head->data);\n        head = head->next;\n    }\n    printf("NULL\\n");\n}`,
      "Ready-to-run linked list program with node allocation and display"
    ),
    createTemplate(
      "binary_tree_complete",
      "Complete BST Program",
      "bst",
      `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct TreeNode {\n    int val;\n    struct TreeNode* left;\n    struct TreeNode* right;\n} TreeNode;\n\nTreeNode* createTreeNode(int val) {\n    TreeNode* n = (TreeNode*)malloc(sizeof(TreeNode));\n    n->val = val;\n    n->left = n->right = NULL;\n    return n;\n}`,
      "Complete binary search tree starter with traversals"
    ),
    createTemplate(
      "graph_dijkstra_complete",
      "Complete Graph Dijkstra Program",
      "graph",
      `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct GraphAdjNode {\n    int dest;\n    int weight;\n    struct GraphAdjNode* next;\n} GraphAdjNode;\n\ntypedef struct GraphAdjList {\n    int numVertices;\n    GraphAdjNode** adjLists;\n} GraphAdjList;`,
      "Complete graph data structure and shortest path runner"
    ),
  ];

  // Write files to library-source/
  const baseSourceDir = path.resolve(process.cwd(), "library-source");
  const categoriesDir = path.join(baseSourceDir, "categories");
  const snippetsDir = path.join(baseSourceDir, "snippets");
  const templatesDir = path.join(baseSourceDir, "templates");

  ensureDirectoryExists(categoriesDir);
  ensureDirectoryExists(snippetsDir);
  ensureDirectoryExists(templatesDir);

  // Group by category
  const categoryGroups = new Map<string, Component[]>();
  for (const comp of allComponents) {
    if (!categoryGroups.has(comp.category)) {
      categoryGroups.set(comp.category, []);
    }
    categoryGroups.get(comp.category)!.push(comp);
  }

  for (const [cat, items] of categoryGroups.entries()) {
    const filePath = path.join(categoriesDir, `${cat}.json`);
    safeWriteJsonFile(filePath, items);
  }

  // Also write all-in-one components.json for easy lookup
  safeWriteJsonFile(path.join(baseSourceDir, "all-components.json"), allComponents);
  safeWriteJsonFile(path.join(snippetsDir, "snippets.json"), snippets);
  safeWriteJsonFile(path.join(templatesDir, "templates.json"), templates);

  logger.info(`Successfully generated:`);
  logger.info(`- ${allComponents.length} components across ${categoryGroups.size} categories`);
  logger.info(`- ${snippets.length} snippets`);
  logger.info(`- ${templates.length} templates`);

  return { components: allComponents, snippets, templates };
};

// Execute if run directly
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}`) {
  generateLibrary()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("Library generation failed:", err);
      process.exit(1);
    });
}

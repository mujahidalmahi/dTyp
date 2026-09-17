import * as path from "node:path";
import { Category } from "@dtyp/types";
import { safeWriteJsonFile, ensureDirectoryExists, defaultLogger } from "@dtyp/utilities";

const logger = defaultLogger.child("TaxonomyBuilder");

export interface TaxonomyNode {
  name: string;
  slug: string;
  type?: string;
  description?: string;
  children?: TaxonomyNode[];
}

export function flattenTaxonomy(
  nodes: TaxonomyNode[],
  parentId: string | null = null,
  parentPath = "",
  depth = 0,
  startSort = 0
): Category[] {
  const result: Category[] = [];
  let sortOrder = startSort;

  for (const node of nodes) {
    const currentPath = parentPath ? `${parentPath}/${node.slug}` : node.slug;
    const id = currentPath.replace(/\//g, ".");

    const cat: Category = {
      id,
      parentId,
      name: node.name,
      slug: node.slug,
      path: currentPath,
      depth,
      type: node.type || (depth === 0 ? "primary" : depth === 1 ? "family" : "topic"),
      description: node.description || `${node.name} hierarchy node`,
      sortOrder: sortOrder++,
    };
    result.push(cat);

    if (node.children && node.children.length > 0) {
      const childCategories = flattenTaxonomy(node.children, id, currentPath, depth + 1);
      result.push(...childCategories);
    }
  }

  return result;
}

export function getFullTaxonomyHierarchy(): Record<string, TaxonomyNode[]> {
  return {
    "boiler-plate": [
      {
        name: "Boiler Plate",
        slug: "boiler-plate",
        children: [
          { name: "Main Entrypoint", slug: "main" },
          { name: "Memory Allocators", slug: "memory" },
          { name: "File Streams", slug: "file" },
          { name: "Testing & Assertions", slug: "testing" },
          { name: "Headers & Modules", slug: "headers" },
        ],
      },
    ],
    "c-basics": [
      {
        name: "C Basics",
        slug: "c-basics",
        children: [
          {
            name: "Syntax",
            slug: "syntax",
            children: [
              { name: "Statements", slug: "statements" },
              { name: "Expressions", slug: "expressions" },
              { name: "Blocks", slug: "blocks" },
              { name: "Declarations", slug: "declarations" },
              { name: "Definitions", slug: "definitions" },
            ],
          },
          {
            name: "Variables",
            slug: "variables",
            children: [
              { name: "Declaration", slug: "declaration" },
              { name: "Initialization", slug: "initialization" },
              { name: "Assignment", slug: "assignment" },
              { name: "Scope", slug: "scope" },
              { name: "Lifetime", slug: "lifetime" },
            ],
          },
          {
            name: "Data Types",
            slug: "data-types",
            children: [
              { name: "Integer", slug: "integer" },
              { name: "Floating Point", slug: "floating-point" },
              { name: "Character", slug: "character" },
              { name: "Boolean", slug: "boolean" },
              { name: "Signed", slug: "signed" },
              { name: "Unsigned", slug: "unsigned" },
            ],
          },
          {
            name: "Operators",
            slug: "operators",
            children: [
              { name: "Arithmetic", slug: "arithmetic" },
              { name: "Relational", slug: "relational" },
              { name: "Logical", slug: "logical" },
              { name: "Assignment", slug: "assignment" },
              { name: "Increment", slug: "increment" },
              { name: "Bitwise", slug: "bitwise" },
            ],
          },
          {
            name: "Control Flow",
            slug: "control-flow",
            children: [
              { name: "Conditions", slug: "conditions" },
              { name: "Switch", slug: "switch" },
              { name: "Loops For", slug: "loops-for" },
              { name: "Loops While", slug: "loops-while" },
              { name: "Loops Do While", slug: "loops-do-while" },
            ],
          },
          {
            name: "Functions",
            slug: "functions",
            children: [
              { name: "Basics", slug: "basics" },
              { name: "Recursion", slug: "recursion" },
              { name: "Parameters", slug: "parameters" },
            ],
          },
          {
            name: "Arrays",
            slug: "arrays",
            children: [
              { name: "One Dimensional", slug: "1d" },
              { name: "Two Dimensional", slug: "2d" },
              { name: "Operations", slug: "operations" },
            ],
          },
          {
            name: "Strings",
            slug: "strings",
            children: [
              { name: "Basics", slug: "basics" },
              { name: "Manipulation", slug: "manipulation" },
              { name: "Searching", slug: "searching" },
            ],
          },
        ],
      },
    ],
    "c-intermediate": [
      {
        name: "C Intermediate",
        slug: "c-intermediate",
        children: [
          {
            name: "Pointers",
            slug: "pointers",
            children: [
              { name: "Basic Pointers", slug: "basics" },
              { name: "Pointer Arithmetic", slug: "arithmetic" },
              { name: "Double Pointers", slug: "pointer-to-pointer" },
              { name: "Array Pointers", slug: "array-pointers" },
              { name: "Function Pointers", slug: "function-pointers" },
              { name: "Void Pointers", slug: "void-pointers" },
            ],
          },
          {
            name: "Structures",
            slug: "structures",
            children: [
              { name: "Declaration", slug: "declaration" },
              { name: "Nested", slug: "nested" },
              { name: "Self Referencing", slug: "self-referencing" },
              { name: "Typedef", slug: "typedef" },
            ],
          },
          {
            name: "Unions & Enums",
            slug: "unions-enums",
            children: [
              { name: "Unions", slug: "unions" },
              { name: "Tagged Unions", slug: "tagged-unions" },
              { name: "Enums", slug: "enums" },
            ],
          },
          {
            name: "Dynamic Memory",
            slug: "dynamic-memory",
            children: [
              { name: "Malloc", slug: "malloc" },
              { name: "Calloc", slug: "calloc" },
              { name: "Realloc", slug: "realloc" },
              { name: "Free", slug: "free" },
              { name: "Dynamic 2D Arrays", slug: "2d-dynamic" },
            ],
          },
          {
            name: "File Handling",
            slug: "file-handling",
            children: [
              { name: "Text Files", slug: "text-files" },
              { name: "Binary Files", slug: "binary-files" },
              { name: "Buffered IO", slug: "buffered-io" },
              { name: "Record IO", slug: "record-io" },
            ],
          },
          {
            name: "Preprocessor",
            slug: "preprocessor",
            children: [
              { name: "Macros", slug: "macros" },
              { name: "Conditional", slug: "conditional" },
              { name: "Header Guards", slug: "header-guards" },
            ],
          },
        ],
      },
    ],
    "c-advanced": [
      {
        name: "C Advanced",
        slug: "c-advanced",
        children: [
          {
            name: "Advanced Pointers",
            slug: "advanced-pointers",
            children: [
              { name: "Callbacks", slug: "callbacks" },
              { name: "Generic Voids", slug: "generic-void" },
              { name: "Dispatch Tables", slug: "dispatch-tables" },
            ],
          },
          {
            name: "Generic Programming",
            slug: "generic-programming",
            children: [
              { name: "Generic Keyword", slug: "c11-generic" },
              { name: "Macro Templates", slug: "macro-templates" },
            ],
          },
          {
            name: "Variadic Functions",
            slug: "variadic",
            children: [
              { name: "Stdarg", slug: "stdarg" },
              { name: "Custom Printf", slug: "custom-printf" },
            ],
          },
          {
            name: "Bit Manipulation",
            slug: "bit-manipulation",
            children: [
              { name: "Bit Fields", slug: "bit-fields" },
              { name: "Bit Hacks", slug: "bit-hacks" },
              { name: "Bitmasking", slug: "bitmasking" },
            ],
          },
          {
            name: "Memory Management",
            slug: "memory-management",
            children: [
              { name: "Memory Arena", slug: "arena" },
              { name: "Memory Pool", slug: "pool" },
              { name: "Custom Allocator", slug: "custom-allocator" },
            ],
          },
          {
            name: "Safety & Portability",
            slug: "safety-portability",
            children: [
              { name: "UB Guards", slug: "ub-guards" },
              { name: "Overflow Guards", slug: "overflow-guards" },
              { name: "Alignment", slug: "alignment" },
            ],
          },
        ],
      },
    ],
    "data-structures": [
      {
        name: "Data Structures",
        slug: "data-structures",
        children: [
          {
            name: "Linked Lists",
            slug: "linked-lists",
            children: [
              {
                name: "Singly",
                slug: "singly",
                children: [
                  { name: "Node", slug: "node" },
                  { name: "Insertion", slug: "insertion" },
                  { name: "Deletion", slug: "deletion" },
                  { name: "Traversal", slug: "traversal" },
                  { name: "Search", slug: "search" },
                  { name: "Reversal", slug: "reversal" },
                  { name: "Sorting", slug: "sorting" },
                  { name: "Cycle Detection", slug: "cycle-detection" },
                ],
              },
              {
                name: "Doubly",
                slug: "doubly",
                children: [
                  { name: "Node", slug: "node" },
                  { name: "Insertion", slug: "insertion" },
                  { name: "Deletion", slug: "deletion" },
                  { name: "Traversal", slug: "traversal" },
                  { name: "Search", slug: "search" },
                  { name: "Reversal", slug: "reversal" },
                  { name: "Sorting", slug: "sorting" },
                  { name: "Cycle Detection", slug: "cycle-detection" },
                ],
              },
              {
                name: "Circular Singly",
                slug: "circular-singly",
                children: [
                  { name: "Node", slug: "node" },
                  { name: "Insertion", slug: "insertion" },
                  { name: "Deletion", slug: "deletion" },
                  { name: "Traversal", slug: "traversal" },
                  { name: "Search", slug: "search" },
                  { name: "Reversal", slug: "reversal" },
                  { name: "Sorting", slug: "sorting" },
                  { name: "Cycle Detection", slug: "cycle-detection" },
                ],
              },
              {
                name: "Circular Doubly",
                slug: "circular-doubly",
                children: [
                  { name: "Node", slug: "node" },
                  { name: "Insertion", slug: "insertion" },
                  { name: "Deletion", slug: "deletion" },
                  { name: "Traversal", slug: "traversal" },
                  { name: "Search", slug: "search" },
                  { name: "Reversal", slug: "reversal" },
                  { name: "Sorting", slug: "sorting" },
                  { name: "Cycle Detection", slug: "cycle-detection" },
                ],
              },
            ],
          },
          {
            name: "Stack",
            slug: "stack",
            children: [
              { name: "Fixed Array", slug: "fixed-array" },
              { name: "Dynamic Array", slug: "dynamic-array" },
              { name: "Linked Stack", slug: "linked" },
              { name: "Generic Stack", slug: "generic" },
              { name: "Min Stack", slug: "min-stack" },
              { name: "Monotonic Stack", slug: "monotonic" },
            ],
          },
          {
            name: "Queue",
            slug: "queue",
            children: [
              { name: "Linear Array", slug: "linear-array" },
              { name: "Circular Queue", slug: "circular" },
              { name: "Linked Queue", slug: "linked" },
              { name: "Deque", slug: "deque" },
              { name: "Priority Queue", slug: "priority-queue" },
              { name: "Monotonic Queue", slug: "monotonic" },
            ],
          },
          {
            name: "Hash Tables",
            slug: "hash-tables",
            children: [
              { name: "Chaining", slug: "chaining" },
              { name: "Linear Probing", slug: "linear-probing" },
              { name: "Quadratic Probing", slug: "quadratic-probing" },
              { name: "Double Hashing", slug: "double-hashing" },
            ],
          },
          {
            name: "Trees",
            slug: "trees",
            children: [
              { name: "Binary Tree", slug: "binary-tree" },
              { name: "Binary Search Tree", slug: "bst" },
              { name: "AVL Tree", slug: "avl" },
              { name: "Red Black Tree", slug: "red-black" },
              { name: "Min Heap", slug: "min-heap" },
              { name: "Max Heap", slug: "max-heap" },
              { name: "Trie", slug: "trie" },
              { name: "Segment Tree", slug: "segment-tree" },
              { name: "Fenwick Tree", slug: "fenwick" },
              { name: "Disjoint Set Union", slug: "dsu" },
            ],
          },
          {
            name: "Graph",
            slug: "graph",
            children: [
              { name: "Adjacency List", slug: "adj-list" },
              { name: "Adjacency Matrix", slug: "adj-matrix" },
              { name: "Edge List", slug: "edge-list" },
            ],
          },
        ],
      },
    ],
    "algorithms": [
      {
        name: "Algorithms",
        slug: "algorithms",
        children: [
          {
            name: "Searching",
            slug: "searching",
            children: [
              { name: "Binary Search", slug: "binary-search" },
              { name: "Ternary Search", slug: "ternary-search" },
              { name: "Exponential Search", slug: "exponential" },
              { name: "Jump Search", slug: "jump" },
              { name: "Interpolation Search", slug: "interpolation" },
            ],
          },
          {
            name: "Sorting",
            slug: "sorting",
            children: [
              { name: "Quick Sort", slug: "quick-sort" },
              { name: "Merge Sort", slug: "merge-sort" },
              { name: "Heap Sort", slug: "heap-sort" },
              { name: "Radix Sort", slug: "radix-sort" },
              { name: "Counting Sort", slug: "counting-sort" },
              { name: "Insertion Sort", slug: "insertion-sort" },
              { name: "Selection Sort", slug: "selection-sort" },
              { name: "Shell Sort", slug: "shell-sort" },
            ],
          },
          {
            name: "Graph Algorithms",
            slug: "graph-algorithms",
            children: [
              { name: "BFS", slug: "bfs" },
              { name: "DFS", slug: "dfs" },
              { name: "Dijkstra", slug: "dijkstra" },
              { name: "Bellman Ford", slug: "bellman-ford" },
              { name: "Floyd Warshall", slug: "floyd-warshall" },
              { name: "Prim MST", slug: "prim" },
              { name: "Kruskal MST", slug: "kruskal" },
              { name: "Topological Sort", slug: "topological-sort" },
              { name: "Tarjan SCC", slug: "tarjan" },
            ],
          },
          {
            name: "Dynamic Programming",
            slug: "dynamic-programming",
            children: [
              { name: "Knapsack", slug: "knapsack" },
              { name: "LCS", slug: "lcs" },
              { name: "LIS", slug: "lis" },
              { name: "Matrix Chain", slug: "matrix-chain" },
              { name: "Coin Change", slug: "coin-change" },
              { name: "Edit Distance", slug: "edit-distance" },
              { name: "Subset Sum", slug: "subset-sum" },
            ],
          },
          {
            name: "Greedy",
            slug: "greedy",
            children: [
              { name: "Activity Selection", slug: "activity-selection" },
              { name: "Huffman Coding", slug: "huffman" },
              { name: "Job Sequencing", slug: "job-sequencing" },
            ],
          },
          {
            name: "Recursion & Backtracking",
            slug: "backtracking",
            children: [
              { name: "N Queens", slug: "n-queens" },
              { name: "Sudoku", slug: "sudoku" },
              { name: "Permutations", slug: "permutations" },
              { name: "Subsets", slug: "subsets" },
              { name: "Knights Tour", slug: "knights-tour" },
            ],
          },
        ],
      },
    ],
    "numerical-methods": [
      {
        name: "Numerical Methods",
        slug: "numerical-methods",
        children: [
          {
            name: "Root Finding",
            slug: "root-finding",
            children: [
              { name: "Bisection", slug: "bisection" },
              { name: "False Position", slug: "false-position" },
              { name: "Newton Raphson", slug: "newton-raphson" },
              { name: "Secant Method", slug: "secant" },
              { name: "Fixed Point", slug: "fixed-point" },
            ],
          },
          {
            name: "Linear Systems",
            slug: "linear-systems",
            children: [
              { name: "Gauss Elimination", slug: "gauss-elimination" },
              { name: "Gauss Jordan", slug: "gauss-jordan" },
              { name: "LU Decomposition", slug: "lu-decomposition" },
              { name: "Jacobi Iteration", slug: "jacobi" },
              { name: "Gauss Seidel", slug: "gauss-seidel" },
            ],
          },
          {
            name: "Interpolation",
            slug: "interpolation",
            children: [
              { name: "Lagrange", slug: "lagrange" },
              { name: "Newton Forward", slug: "newton-forward" },
              { name: "Newton Backward", slug: "newton-backward" },
              { name: "Divided Difference", slug: "divided-difference" },
            ],
          },
          {
            name: "Numerical Differentiation",
            slug: "differentiation",
            children: [
              { name: "Finite Difference", slug: "finite-difference" },
              { name: "Central Difference", slug: "central-difference" },
            ],
          },
          {
            name: "Numerical Integration",
            slug: "integration",
            children: [
              { name: "Trapezoidal", slug: "trapezoidal" },
              { name: "Simpson 1/3", slug: "simpson-1-3" },
              { name: "Simpson 3/8", slug: "simpson-3-8" },
              { name: "Romberg", slug: "romberg" },
              { name: "Boole's Rule", slug: "boole" },
              { name: "Gauss Legendre", slug: "gauss-legendre" },
            ],
          },
          {
            name: "Differential Equations",
            slug: "differential-equations",
            children: [
              { name: "Euler Method", slug: "euler" },
              { name: "Modified Euler", slug: "modified-euler" },
              { name: "Runge Kutta 2", slug: "rk2" },
              { name: "Runge Kutta 4", slug: "rk4" },
              { name: "Heun's Method", slug: "heun" },
              { name: "Leapfrog Integration", slug: "leapfrog" },
            ],
          },
          {
            name: "Curve Fitting",
            slug: "curve-fitting",
            children: [
              { name: "Linear Regression", slug: "linear-regression" },
              { name: "Polynomial Fit", slug: "polynomial-fit" },
            ],
          },
        ],
      },
    ],
    "programming-patterns": [
      {
        name: "Programming Patterns",
        slug: "programming-patterns",
        children: [
          { name: "Two Pointers", slug: "two-pointers" },
          { name: "Sliding Window", slug: "sliding-window" },
          { name: "Fast Slow Pointers", slug: "fast-slow" },
          { name: "Prefix Sum", slug: "prefix-sum" },
          { name: "Difference Array", slug: "difference-array" },
          { name: "Monotonic Queue Stack", slug: "monotonic" },
          { name: "Coordinate Compression", slug: "coordinate-compression" },
          { name: "State Machine", slug: "state-machine" },
        ],
      },
    ],
    "competitive-programming": [
      {
        name: "Competitive Programming",
        slug: "competitive-programming",
        children: [
          { name: "Fast IO", slug: "fast-io" },
          { name: "Modular Arithmetic", slug: "modular-arithmetic" },
          { name: "Number Theory", slug: "number-theory" },
          { name: "Primes & Sieve", slug: "primes-sieve" },
          { name: "Combinatorics", slug: "combinatorics" },
          { name: "Segment Tree Template", slug: "segment-tree-template" },
          { name: "Fenwick Tree Template", slug: "fenwick-template" },
          { name: "DSU Template", slug: "dsu-template" },
          { name: "Binary Lifting LCA", slug: "binary-lifting-lca" },
        ],
      },
    ],
    "academic-programming": [
      {
        name: "Academic Programming",
        slug: "academic-programming",
        children: [
          { name: "Signals & FFT", slug: "signals-fft" },
          { name: "Circuit Analysis", slug: "circuits" },
          { name: "Physics & Mechanics", slug: "physics" },
          { name: "Discrete Math", slug: "discrete-math" },
          { name: "Statistics", slug: "statistics" },
          { name: "University Lab Tasks", slug: "lab-tasks" },
        ],
      },
    ],
    "projects": [
      {
        name: "C Projects",
        slug: "projects",
        children: [
          { name: "Student Management", slug: "student-management" },
          { name: "Banking System", slug: "banking-system" },
          { name: "Library System", slug: "library-system" },
          { name: "CLI Shell", slug: "cli-shell" },
          { name: "File Database", slug: "file-database" },
          { name: "Expression Calculator", slug: "calculator" },
          { name: "Quiz Engine", slug: "quiz-engine" },
        ],
      },
    ],
    "utilities": [
      {
        name: "Utilities & Templates",
        slug: "utilities",
        children: [
          { name: "Memory Leak Tracker", slug: "memory-tracker" },
          { name: "High Res Timer", slug: "timer" },
          { name: "String Builder", slug: "string-builder" },
          { name: "CLI Arg Parser", slug: "arg-parser" },
          { name: "CSV Tokenizer", slug: "csv-tokenizer" },
          { name: "Logger", slug: "logger" },
          { name: "Safe Memory Ops", slug: "safe-ops" },
          { name: "Bit Array", slug: "bit-array" },
        ],
      },
    ],
  };
}

export function buildAllTaxonomyCategories(): Category[] {
  const tree = getFullTaxonomyHierarchy();
  const allCategories: Category[] = [];

  for (const [key, nodes] of Object.entries(tree)) {
    const flat = flattenTaxonomy(nodes);
    allCategories.push(...flat);
  }

  return allCategories;
}

export function exportTaxonomyFiles(): void {
  const baseDir = path.resolve(process.cwd(), "taxonomy");
  ensureDirectoryExists(baseDir);

  const tree = getFullTaxonomyHierarchy();
  for (const [key, nodes] of Object.entries(tree)) {
    const flat = flattenTaxonomy(nodes);
    const targetFile = path.join(baseDir, `${key}.json`);
    safeWriteJsonFile(targetFile, flat);
    logger.info(`Exported taxonomy ${key}.json (${flat.length} categories)`);
  }

  const all = buildAllTaxonomyCategories();
  safeWriteJsonFile(path.join(baseDir, "all-categories.json"), all);
  logger.info(`Exported full taxonomy all-categories.json (${all.length} total categories)`);
}

if (process.argv[1] && process.argv[1].includes('taxonomy-builder')) { exportTaxonomyFiles(); }

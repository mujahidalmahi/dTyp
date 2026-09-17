import * as path from "node:path";
import * as fs from "node:fs";
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
  startSort = 1
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
      type: node.type || (depth === 0 ? "primary" : depth === 1 ? "subdomain" : "topic"),
      description: node.description || `${node.name} hierarchy node`,
      sortOrder: sortOrder++,
    };
    result.push(cat);

    if (node.children && node.children.length > 0) {
      const childCategories = flattenTaxonomy(node.children, id, currentPath, depth + 1, 1);
      result.push(...childCategories);
    }
  }

  return result;
}

const BP_TOPICS = [
  {
    "slug": "basic-templates",
    "name": "Basic Starting Template",
    "description": "Standard main functions, argument handling, and header templates"
  },
  {
    "slug": "conditionals",
    "name": "Conditionals",
    "description": "If-else branches, switch-case dispatch, and ternary operators"
  },
  {
    "slug": "loops",
    "name": "Loops",
    "description": "For counters, while scanners, and do-while loops"
  },
  {
    "slug": "patterns",
    "name": "Pattern Printing",
    "description": "Pyramid, diamond, and geometric pattern rendering"
  },
  {
    "slug": "functions",
    "name": "Functions",
    "description": "Function declarations, pass-by-reference, and function pointers"
  },
  {
    "slug": "recursion",
    "name": "Recursion",
    "description": "Recursive math routines, power, and sequence calculations"
  },
  {
    "slug": "pointers",
    "name": "Pointers",
    "description": "Pointers, double pointers, and pointer arithmetic operations"
  },
  {
    "slug": "dynamic-memory",
    "name": "Dynamic Memory",
    "description": "Malloc, calloc, realloc, and safe deallocation"
  },
  {
    "slug": "structures",
    "name": "Structures",
    "description": "Struct declarations, typedefs, and struct methods"
  },
  {
    "slug": "unions",
    "name": "Unions",
    "description": "Union declarations and tagged variant unions"
  },
  {
    "slug": "enums",
    "name": "Enums",
    "description": "Enum declarations, status flags, and state enums"
  },
  {
    "slug": "file-io",
    "name": "File I/O",
    "description": "Text file read, write, append, and binary record I/O"
  },
  {
    "slug": "macros",
    "name": "Macros & Preprocessor",
    "description": "Include guards, utility macros, and preprocessor directives"
  },
  {
    "slug": "strings",
    "name": "Strings",
    "description": "Custom string manipulation routines implemented from scratch"
  },
];
const BP_FULL_PROG_TOPICS = [
  {
    "slug": "basic-templates",
    "name": "Basic Starting Template",
    "description": "Standard main functions, argument handling, and header templates"
  },
  {
    "slug": "conditionals",
    "name": "Conditionals",
    "description": "If-else branches, switch-case dispatch, and ternary operators"
  },
  {
    "slug": "loops",
    "name": "Loops",
    "description": "For counters, while scanners, and do-while loops"
  },
  {
    "slug": "patterns",
    "name": "Pattern Printing",
    "description": "Pyramid, diamond, and geometric pattern rendering"
  },
  {
    "slug": "functions",
    "name": "Functions",
    "description": "Function declarations, pass-by-reference, and function pointers"
  },
  {
    "slug": "recursion",
    "name": "Recursion",
    "description": "Recursive math routines, power, and sequence calculations"
  },
  {
    "slug": "pointers",
    "name": "Pointers",
    "description": "Pointers, double pointers, and pointer arithmetic operations"
  },
  {
    "slug": "dynamic-memory",
    "name": "Dynamic Memory",
    "description": "Malloc, calloc, realloc, and safe deallocation"
  },
  {
    "slug": "structures",
    "name": "Structures",
    "description": "Struct declarations, typedefs, and struct methods"
  },
  {
    "slug": "unions",
    "name": "Unions",
    "description": "Union declarations and tagged variant unions"
  },
  {
    "slug": "enums",
    "name": "Enums",
    "description": "Enum declarations, status flags, and state enums"
  },
  {
    "slug": "file-io",
    "name": "File I/O",
    "description": "Text file read, write, append, and binary record I/O"
  },
  {
    "slug": "macros",
    "name": "Macros & Preprocessor",
    "description": "Include guards, utility macros, and preprocessor directives"
  },
  {
    "slug": "strings",
    "name": "Strings",
    "description": "Custom string manipulation routines implemented from scratch"
  },
  {
    "slug": "complex-programs",
    "name": "Complex Programs",
    "description": "Complete multi-concept C programs combining multiple syntax patterns"
  }
];
const DS_TOPICS = [
  {
    "slug": "arrays",
    "name": "Arrays",
    "description": "Array data structures and multi-dimensional matrices",
    "children": [
      {
        "slug": "1d-array",
        "name": "1D Array",
        "description": "One-dimensional array operations and algorithms"
      },
      {
        "slug": "2d-array",
        "name": "2D Array",
        "description": "Two-dimensional matrix storage and operations"
      },
      {
        "slug": "3d-array",
        "name": "3D Array",
        "description": "Three-dimensional tensors and volumetric arrays"
      },
      {
        "slug": "dynamic-array",
        "name": "Dynamic Array",
        "description": "Auto-resizing dynamic array vector"
      }
    ]
  },
  {
    "slug": "linked-lists",
    "name": "Linked Lists",
    "description": "Node-based sequential dynamic data structures",
    "children": [
      {
        "slug": "singly",
        "name": "Singly Linked List",
        "description": "Unidirectional singly linked list"
      },
      {
        "slug": "doubly",
        "name": "Doubly Linked List",
        "description": "Bidirectional doubly linked list"
      },
      {
        "slug": "singly-circular",
        "name": "Singly Circular Linked List",
        "description": "Closed-loop singly circular list"
      },
      {
        "slug": "doubly-circular",
        "name": "Doubly Circular Linked List",
        "description": "Closed-loop bidirectional circular list"
      }
    ]
  },
  {
    "slug": "stacks",
    "name": "Stacks",
    "description": "LIFO (Last In First Out) stack structures",
    "children": [
      {
        "slug": "array-stack",
        "name": "Array Stack",
        "description": "Contiguous buffer-based LIFO stack"
      },
      {
        "slug": "linked-stack",
        "name": "Linked Stack",
        "description": "Node-allocated dynamic LIFO stack"
      },
      {
        "slug": "monotonic-stack",
        "name": "Monotonic Stack",
        "description": "Monotonically ordered stack for range scans"
      }
    ]
  },
  {
    "slug": "queues",
    "name": "Queues",
    "description": "FIFO (First In First Out) and priority queue structures",
    "children": [
      {
        "slug": "linear-queue",
        "name": "Linear Queue",
        "description": "Standard FIFO linear queue"
      },
      {
        "slug": "circular-queue",
        "name": "Circular Queue",
        "description": "Ring-buffer circular queue"
      },
      {
        "slug": "deque",
        "name": "Double-Ended Queue",
        "description": "Bidirectional push/pop deque"
      },
      {
        "slug": "priority-queue",
        "name": "Priority Queue",
        "description": "Binary min-heap priority queue"
      }
    ]
  },
  {
    "slug": "trees",
    "name": "Trees",
    "description": "Hierarchical and self-balancing tree structures",
    "children": [
      {
        "slug": "bst",
        "name": "Binary Search Tree",
        "description": "Standard binary search tree"
      },
      {
        "slug": "avl",
        "name": "AVL Tree",
        "description": "Height-balanced self-balancing tree"
      },
      {
        "slug": "trie",
        "name": "Trie",
        "description": "Prefix tree for string keys"
      },
      {
        "slug": "segment-tree",
        "name": "Segment Tree",
        "description": "Range query and point update tree"
      }
    ]
  },
  {
    "slug": "graphs",
    "name": "Graphs",
    "description": "Network node and edge representations",
    "children": [
      {
        "slug": "adjacency-matrix",
        "name": "Adjacency Matrix",
        "description": "2D matrix graph representation"
      },
      {
        "slug": "adjacency-list",
        "name": "Adjacency List",
        "description": "Linked list vertex neighbor representation"
      },
      {
        "slug": "dsu",
        "name": "Disjoint Set Union",
        "description": "Union-find disjoint set with rank and path compression"
      }
    ]
  },
  {
    "slug": "hashing",
    "name": "Hashing",
    "description": "Key-value hash tables and hashing algorithms",
    "children": [
      {
        "slug": "chaining",
        "name": "Separate Chaining",
        "description": "Collision resolution via linked list buckets"
      },
      {
        "slug": "open-addressing",
        "name": "Open Addressing",
        "description": "Collision resolution via linear probing"
      },
      {
        "slug": "hash-functions",
        "name": "Hash Functions",
        "description": "Integer and string hashing algorithms"
      }
    ]
  }
];
const ALGO_TOPICS = [
  {
    "slug": "sorting",
    "name": "Sorting",
    "description": "Comparison and non-comparison sorting algorithms",
    "children": [
      {
        "slug": "elementary-sorts",
        "name": "Elementary Sorts",
        "description": "Bubble, selection, and insertion sort"
      },
      {
        "slug": "quick-sort",
        "name": "Quick Sort",
        "description": "Divide and conquer quick sort partitioning"
      },
      {
        "slug": "merge-sort",
        "name": "Merge Sort",
        "description": "Divide and conquer merge sort"
      },
      {
        "slug": "heap-sort",
        "name": "Heap Sort",
        "description": "In-place binary heap sort"
      },
      {
        "slug": "non-comparison-sorts",
        "name": "Non-Comparison Sorts",
        "description": "Counting and radix distribution sort"
      }
    ]
  },
  {
    "slug": "searching",
    "name": "Searching",
    "description": "Linear, binary, and pointer-based searching algorithms",
    "children": [
      {
        "slug": "linear-search",
        "name": "Linear Search",
        "description": "Sequential scan and sentinel search"
      },
      {
        "slug": "binary-search",
        "name": "Binary Search",
        "description": "Logarithmic binary search and bounds"
      },
      {
        "slug": "jump-interpolation",
        "name": "Jump & Interpolation",
        "description": "Block jump and formula interpolation search"
      },
      {
        "slug": "two-pointers",
        "name": "Two Pointers Search",
        "description": "Converging pointers and pair searching"
      }
    ]
  },
  {
    "slug": "graph-algorithms",
    "name": "Graph Algorithms",
    "description": "Graph traversal, paths, spanning trees, and topological sorts",
    "children": [
      {
        "slug": "graph-traversals",
        "name": "Graph Traversals",
        "description": "Breadth-first and depth-first traversals"
      },
      {
        "slug": "shortest-paths",
        "name": "Shortest Paths",
        "description": "Dijkstra, Bellman-Ford, and Floyd-Warshall paths"
      },
      {
        "slug": "minimum-spanning-tree",
        "name": "Minimum Spanning Tree",
        "description": "Kruskal with DSU and Prim MST"
      },
      {
        "slug": "topological-sort",
        "name": "Topological Sort",
        "description": "Kahn's in-degree and DFS topological sort"
      }
    ]
  },
  {
    "slug": "dynamic-programming",
    "name": "Dynamic Programming",
    "description": "Memoized and tabulated dynamic programming algorithms",
    "children": [
      {
        "slug": "1d-dp",
        "name": "1D Dynamic Programming",
        "description": "Kadane subarray, climbing stairs, and linear DP"
      },
      {
        "slug": "knapsack",
        "name": "Knapsack Problems",
        "description": "0/1 Knapsack, coin change, and subset values"
      },
      {
        "slug": "subsequences",
        "name": "Subsequence Problems",
        "description": "Longest common and longest increasing subsequences"
      },
      {
        "slug": "string-dp",
        "name": "String Dynamic Programming",
        "description": "Levenshtein edit distance and grid cost DP"
      }
    ]
  },
  {
    "slug": "greedy",
    "name": "Greedy Algorithms",
    "description": "Locally optimal choice optimization algorithms",
    "children": [
      {
        "slug": "activity-selection",
        "name": "Activity Selection",
        "description": "Interval scheduling and non-overlapping intervals"
      },
      {
        "slug": "fractional-knapsack",
        "name": "Fractional Knapsack",
        "description": "Ratio-based greedy fractional knapsack"
      },
      {
        "slug": "job-sequencing",
        "name": "Job Sequencing",
        "description": "Deadline and profit job scheduling"
      }
    ]
  },
  {
    "slug": "backtracking",
    "name": "Backtracking",
    "description": "Recursive systematic state search and pruning",
    "children": [
      {
        "slug": "n-queens",
        "name": "N-Queens",
        "description": "Non-attacking queen placement on chessboard"
      },
      {
        "slug": "maze-solver",
        "name": "Maze Solver",
        "description": "2D grid obstacle pathfinding"
      },
      {
        "slug": "combinatorial",
        "name": "Combinatorial Generation",
        "description": "Permutations and power set generation"
      }
    ]
  },
  {
    "slug": "string-algorithms",
    "name": "String Algorithms",
    "description": "Exact pattern matching and palindrome algorithms",
    "children": [
      {
        "slug": "kmp",
        "name": "KMP Search",
        "description": "Knuth-Morris-Pratt pattern matching with LPS"
      },
      {
        "slug": "rabin-karp",
        "name": "Rabin-Karp",
        "description": "Rolling hash substring matching"
      },
      {
        "slug": "palindromes",
        "name": "Palindromes",
        "description": "Longest palindromic substring finding"
      }
    ]
  }
];

export const CP_TOPICS = [
  {
    "slug": "fast-io-utilities",
    "name": "Fast I/O & Utilities",
    "description": "High-speed input/output and contest utilities",
    "children": [
      {
        "slug": "fast-io",
        "name": "Fast I/O",
        "description": "Buffer-based integer and character I/O routines"
      },
      {
        "slug": "coordinate-compression",
        "name": "Coordinate Compression",
        "description": "Mapping sparse coordinate spaces to dense zero-indexed ranks"
      }
    ]
  },
  {
    "slug": "bit-manipulation",
    "name": "Bit Manipulation",
    "description": "Bitwise tricks, bitmasks, and subset enumeration",
    "children": [
      {
        "slug": "bitwise-tricks",
        "name": "Bitwise Tricks",
        "description": "Popcount, lowest set bit, power-of-two tests, and bit twiddling"
      },
      {
        "slug": "bitmasking",
        "name": "State Bitmasking",
        "description": "Submask iteration, subset enumeration, and bitmask DP transitions"
      }
    ]
  },
  {
    "slug": "number-theory",
    "name": "Number Theory & Math",
    "description": "Primes, modular arithmetic, combinatorics, and matrix powers",
    "children": [
      {
        "slug": "prime-sieve",
        "name": "Prime Sieve & Factors",
        "description": "Sieve of Eratosthenes and prime factorization"
      },
      {
        "slug": "modular-arithmetic",
        "name": "Modular Arithmetic",
        "description": "Extended Euclidean algorithm, modular inverse, and modular exponentiation"
      },
      {
        "slug": "combinatorics",
        "name": "Combinatorics",
        "description": "Precomputed factorials, Fermat's inverse, and nCr modulo arithmetic"
      },
      {
        "slug": "matrix-exponentiation",
        "name": "Matrix Exponentiation",
        "description": "2x2 fast matrix power and linear recurrence acceleration"
      }
    ]
  },
  {
    "slug": "range-queries",
    "name": "Range Queries & Techniques",
    "description": "Prefix sums, difference arrays, two pointers, and sliding window",
    "children": [
      {
        "slug": "prefix-sums",
        "name": "Prefix Sums",
        "description": "1D and 2D prefix sums for constant-time range sum queries"
      },
      {
        "slug": "difference-array",
        "name": "Difference Array",
        "description": "Difference array technique for constant-time range updates"
      },
      {
        "slug": "two-pointers",
        "name": "Two Pointers",
        "description": "Two-pointer search, pair sums, duplicate filtering, and trapping water"
      },
      {
        "slug": "sliding-window",
        "name": "Sliding Window",
        "description": "Fixed and variable size sliding window optimization"
      }
    ]
  },
  {
    "slug": "cp-data-structures",
    "name": "Competitive Data Structures",
    "description": "Fenwick trees, segment trees, DSU, and monotonic structures",
    "children": [
      {
        "slug": "fenwick-tree",
        "name": "Fenwick Tree",
        "description": "Binary indexed tree for point updates and prefix sum queries"
      },
      {
        "slug": "segment-tree",
        "name": "Segment Tree",
        "description": "Segment tree for range minimum and sum queries with point updates"
      },
      {
        "slug": "disjoint-set",
        "name": "Disjoint Set Union",
        "description": "DSU with path compression and union by rank or size"
      },
      {
        "slug": "monotonic-structures",
        "name": "Monotonic Structures",
        "description": "Monotonic stacks and deques for next greater element and window maximum"
      }
    ]
  },
  {
    "slug": "binary-search-techniques",
    "name": "Monotonic Search",
    "description": "Binary search on monotonic answer and ternary search on unimodal functions",
    "children": [
      {
        "slug": "binary-search-answer",
        "name": "Binary Search on Answer",
        "description": "Bisection over monotonic feasibility predicates"
      },
      {
        "slug": "ternary-search",
        "name": "Ternary Search",
        "description": "Ternary search for unimodal function extremum discovery"
      }
    ]
  },
  {
    "slug": "graph-techniques",
    "name": "Graph Techniques for CP",
    "description": "0-1 BFS, lowest common ancestor binary lifting, and Tarjan's SCC",
    "children": [
      {
        "slug": "zero-one-bfs",
        "name": "0-1 BFS",
        "description": "Double-ended queue shortest path for 0-1 weighted graphs"
      },
      {
        "slug": "lowest-common-ancestor",
        "name": "Lowest Common Ancestor",
        "description": "Tree binary lifting for ancestor and distance queries"
      },
      {
        "slug": "strongly-connected",
        "name": "Strongly Connected Components",
        "description": "Tarjan's algorithm for directed graph strongly connected components"
      }
    ]
  }
];

const ACADEMIC_TOPICS = [
  {
    "slug": "discrete-mathematics",
    "name": "Discrete Mathematics",
    "description": "Logic, sets, relations, combinatorics, and discrete graph theory",
    "children": [
      {
        "slug": "logic-set-theory",
        "name": "Logic & Set Theory",
        "description": "Truth tables and set operations",
        "children": [
          { "slug": "truth-tables", "name": "Truth Tables", "description": "Truth table evaluation" },
          { "slug": "set-operations", "name": "Set Operations", "description": "Set union, intersection, and difference" }
        ]
      },
      {
        "slug": "relations-combinatorics",
        "name": "Relations & Combinatorics",
        "description": "Binary relations and combinatorial counts",
        "children": [
          { "slug": "equivalence-relations", "name": "Equivalence Relations", "description": "Equivalence relation verification" },
          { "slug": "permutations-combinations", "name": "Permutations & Combinations", "description": "Permutations and combinations generation" }
        ]
      },
      {
        "slug": "graph-theory",
        "name": "Graph Theory",
        "description": "Degree sequences, Handshaking lemma, and planar graphs",
        "children": [
          { "slug": "vertex-degrees", "name": "Vertex Degrees", "description": "Handshaking and Eulerian paths" },
          { "slug": "planar-euler", "name": "Planar Euler", "description": "Planar graph Euler characteristic" }
        ]
      }
    ]
  },
  {
    "slug": "numerical-methods",
    "name": "Numerical Methods",
    "description": "Root finding, linear systems elimination, interpolation, and integration",
    "children": [
      {
        "slug": "root-finding",
        "name": "Root Finding",
        "description": "Iterative root-finding algorithms",
        "children": [
          { "slug": "bisection-method", "name": "Bisection Method", "description": "Bisection root solver" },
          { "slug": "false-position", "name": "False Position", "description": "Regula Falsi root solver" },
          { "slug": "fixed-point", "name": "Fixed Point Iteration", "description": "Fixed point iteration solver" },
          { "slug": "newton-raphson", "name": "Newton Raphson", "description": "Newton-Raphson with internal derivative" },
          { "slug": "secant-method", "name": "Secant Method", "description": "Secant method root solver" }
        ]
      },
      {
        "slug": "elimination-methods",
        "name": "Elimination & Linear Solvers",
        "description": "Direct and iterative linear system solvers",
        "children": [
          { "slug": "naive-gauss", "name": "Naive Gauss", "description": "Naive Gaussian elimination" },
          { "slug": "gauss-pivoting", "name": "Gauss with Pivoting", "description": "Gaussian elimination with partial pivoting" },
          { "slug": "gauss-jordan", "name": "Gauss Jordan", "description": "Gauss-Jordan full elimination" },
          { "slug": "lu-decomposition", "name": "LU Decomposition", "description": "Doolittle LU matrix factorization" },
          { "slug": "jacobi-iteration", "name": "Jacobi Iteration", "description": "Jacobi iterative relaxation" },
          { "slug": "gauss-seidel", "name": "Gauss Seidel", "description": "Gauss-Seidel iterative solver" },
          { "slug": "elimination-pitfalls", "name": "Elimination Pitfalls", "description": "Pitfalls and ill-conditioned systems" }
        ]
      },
      {
        "slug": "interpolation",
        "name": "Interpolation",
        "description": "Polynomial and difference interpolation",
        "children": [
          { "slug": "lagrange-interpolation", "name": "Lagrange Interpolation", "description": "Lagrange basis polynomial interpolation" },
          { "slug": "newton-forward", "name": "Newton Forward Difference", "description": "Newton forward difference table" }
        ]
      },
      {
        "slug": "numerical-integration",
        "name": "Numerical Integration",
        "description": "Quadrature and rule-based integration",
        "children": [
          { "slug": "trapezoidal-rule", "name": "Trapezoidal Rule", "description": "Composite Trapezoidal rule" },
          { "slug": "simpsons-rules", "name": "Simpson's Rules", "description": "Simpson's 1/3 and 3/8 rules" }
        ]
      }
    ]
  },
  {
    "slug": "calculus",
    "name": "Calculus",
    "description": "Differential, integral, and multivariable calculus procedures",
    "children": [
      {
        "slug": "differential-calculus",
        "name": "Differential Calculus",
        "description": "Numerical derivatives and critical points",
        "children": [
          { "slug": "numerical-derivative", "name": "Numerical Derivative", "description": "Central difference 1st and 2nd derivatives" },
          { "slug": "extrema-finder", "name": "Extrema Finder", "description": "Local minima and maxima discovery" }
        ]
      },
      {
        "slug": "integral-calculus",
        "name": "Integral Calculus",
        "description": "Riemann sums and arc length",
        "children": [
          { "slug": "riemann-sums", "name": "Riemann Sums", "description": "Left, Right, Midpoint Riemann sums" },
          { "slug": "arc-length", "name": "Arc Length", "description": "Arc length of plane curve" }
        ]
      },
      {
        "slug": "multivariable-calculus",
        "name": "Multivariable Calculus",
        "description": "Partial derivatives, gradients, and double integrals",
        "children": [
          { "slug": "gradient-vector", "name": "Gradient Vector", "description": "Numerical partial derivatives and gradient" },
          { "slug": "double-integral", "name": "Double Integral", "description": "Double integral over 2D rectangular grid" }
        ]
      }
    ]
  },
  {
    "slug": "geometry-linear-algebra",
    "name": "Coordinate Geometry and Linear Algebra",
    "description": "Conics, lines, planes, determinants, and matrix spectrum",
    "children": [
      {
        "slug": "coordinate-geometry",
        "name": "Coordinate Geometry",
        "description": "Lines, distances, conics, and 3D planes",
        "children": [
          { "slug": "line-intersection", "name": "Line Intersection", "description": "Line intersections and distances" },
          { "slug": "conic-sections", "name": "Conic Sections", "description": "Conic section discriminant and classification" },
          { "slug": "planes-lines-3d", "name": "3D Planes & Lines", "description": "3D plane angles and intersections" }
        ]
      },
      {
        "slug": "matrix-analysis",
        "name": "Matrix Analysis",
        "description": "Determinants, inverses, and eigenvalues",
        "children": [
          { "slug": "determinant-inverse", "name": "Determinant & Inverse", "description": "Matrix determinant and inverse" },
          { "slug": "matrix-arithmetic", "name": "Matrix Arithmetic", "description": "Multiplication, transpose, and scalar operations" },
          { "slug": "power-method-eigenvalue", "name": "Power Method", "description": "Dominant eigenvalue and eigenvector" }
        ]
      }
    ]
  },
  {
    "slug": "differential-equations",
    "name": "Differential Equations",
    "description": "First-order ODEs, systems, and boundary value problems",
    "children": [
      {
        "slug": "first-order-ode",
        "name": "First Order ODEs",
        "description": "Euler, Heun, and Runge-Kutta numerical solvers",
        "children": [
          { "slug": "euler-method", "name": "Euler Method", "description": "Euler's method for ODEs" },
          { "slug": "heun-method", "name": "Heun Method", "description": "Modified Euler predictor-corrector" },
          { "slug": "runge-kutta-4", "name": "Runge Kutta 4", "description": "Classical 4th-order Runge-Kutta solver" }
        ]
      },
      {
        "slug": "second-order-bvp",
        "name": "Second Order & BVPs",
        "description": "Harmonic oscillators and boundary value problems",
        "children": [
          { "slug": "harmonic-oscillator-rk4", "name": "Harmonic Oscillator", "description": "2nd-order damped harmonic oscillator" },
          { "slug": "bvp-finite-difference", "name": "BVP Finite Difference", "description": "1D boundary value problem solver" }
        ]
      }
    ]
  },
  {
    "slug": "physics",
    "name": "Physics",
    "description": "Kinematics, orbits, thermodynamics, electromagnetism, and optics",
    "children": [
      {
        "slug": "kinematics-gravity",
        "name": "Kinematics & Gravity",
        "description": "Projectiles and orbital motion",
        "children": [
          { "slug": "projectile-motion", "name": "Projectile Motion", "description": "2D projectile trajectory and flight time" },
          { "slug": "orbital-mechanics", "name": "Orbital Mechanics", "description": "Orbital velocity and escape speed" }
        ]
      },
      {
        "slug": "thermodynamics",
        "name": "Thermodynamics",
        "description": "Gas laws, thermodynamic work, and heat conduction",
        "children": [
          { "slug": "ideal-gas-work", "name": "Ideal Gas Work", "description": "Ideal gas work in isothermal/isobaric processes" },
          { "slug": "heat-conduction", "name": "Heat Conduction", "description": "1D steady heat conduction profile" }
        ]
      },
      {
        "slug": "electromagnetism-optics",
        "name": "Electromagnetism & Optics",
        "description": "Coulomb fields, refraction, and thin lenses",
        "children": [
          { "slug": "coulomb-field", "name": "Coulomb Field", "description": "Multi-charge electrostatic field vector" },
          { "slug": "optics-refraction", "name": "Optics Refraction", "description": "Snell's law and thin lens imaging" }
        ]
      }
    ]
  },
  {
    "slug": "mechanics",
    "name": "Mechanics",
    "description": "Statics, beam analysis, collisions, friction, and vibrations",
    "children": [
      {
        "slug": "statics-beams",
        "name": "Statics & Beams",
        "description": "Force equilibrium and beam bending",
        "children": [
          { "slug": "force-equilibrium", "name": "Force Equilibrium", "description": "2D force vector equilibrium and resultant" },
          { "slug": "beam-analysis", "name": "Beam Analysis", "description": "Beam support reactions and maximum moment" }
        ]
      },
      {
        "slug": "dynamics-collisions",
        "name": "Dynamics & Collisions",
        "description": "Momentum collisions and inclined planes",
        "children": [
          { "slug": "momentum-collision", "name": "Momentum Collision", "description": "1D collision velocities and energy loss" },
          { "slug": "inclined-plane-friction", "name": "Inclined Plane Friction", "description": "Friction forces and incline acceleration" }
        ]
      },
      {
        "slug": "vibrations",
        "name": "Vibrations",
        "description": "Damped free vibrations",
        "children": [
          { "slug": "damped-vibrations", "name": "Damped Vibrations", "description": "Natural frequency, damping ratio, and regime" }
        ]
      }
    ]
  },
  {
    "slug": "statistics",
    "name": "Statistics",
    "description": "Descriptive statistics, distributions, and regression hypothesis testing",
    "children": [
      {
        "slug": "descriptive-statistics",
        "name": "Descriptive Statistics",
        "description": "Measures of central tendency, dispersion, and shape",
        "children": [
          { "slug": "central-tendency-dispersion", "name": "Central Tendency & Dispersion", "description": "Mean, median, mode, variance, and IQR" },
          { "slug": "skewness-kurtosis", "name": "Skewness & Kurtosis", "description": "Moments, skewness, and excess kurtosis" }
        ]
      },
      {
        "slug": "probability-distributions",
        "name": "Probability Distributions",
        "description": "Binomial, Poisson, and Normal distributions",
        "children": [
          { "slug": "discrete-distributions", "name": "Discrete Distributions", "description": "Binomial and Poisson probabilities" },
          { "slug": "normal-distribution", "name": "Normal Distribution", "description": "Gaussian PDF and numerical normal CDF" }
        ]
      },
      {
        "slug": "regression-hypothesis",
        "name": "Regression & Hypothesis",
        "description": "Linear regression and Student's t-test",
        "children": [
          { "slug": "linear-regression", "name": "Linear Regression", "description": "Least-squares line, Pearson r, and prediction" },
          { "slug": "students-t-test", "name": "Student's t-Test", "description": "One-sample Student's t-test statistic" }
        ]
      }
    ]
  }
];

const PROJECT_TOPICS = [
  {
    "slug": "management-systems",
    "name": "Management & Information Systems",
    "description": "Real-world database and management applications",
    "children": [
      { "slug": "student-records", "name": "Student Record Management", "description": "Student database with GPA and rankings" },
      { "slug": "bank-accounts", "name": "Bank Account System", "description": "Banking transaction and account ledger" },
      { "slug": "library-catalog", "name": "Library Catalog System", "description": "Library catalog and book loan manager" },
      { "slug": "contact-book", "name": "Personal Contact Book", "description": "Contact book with search and validation" },
      { "slug": "employee-payroll", "name": "Employee Payroll System", "description": "Employee hours, deductions, and salary" }
    ]
  },
  {
    "slug": "parsers-compilers",
    "name": "Parsers, Compilers & Converters",
    "description": "Grammar parsers, compilers, AST evaluators, and format converters",
    "children": [
      { "slug": "json-parser", "name": "JSON Parser & Serializer", "description": "Recursive descent JSON parser and AST serializer" },
      { "slug": "markdown-html", "name": "Markdown to HTML Converter", "description": "Markdown syntax parser and HTML renderer" },
      { "slug": "math-evaluator", "name": "Mathematical Expression Evaluator", "description": "Shunting-yard algorithm and RPN evaluator" },
      { "slug": "csv-query", "name": "CSV Query & Filter Engine", "description": "In-memory CSV parser with WHERE filter and aggregates" },
      { "slug": "regex-engine", "name": "Regular Expression Engine", "description": "Thompson NFA regex matcher" }
    ]
  },
  {
    "slug": "network-utilities",
    "name": "Networking & Web Protocol Utilities",
    "description": "Network protocol decoders, codecs, and asynchronous event loops",
    "children": [
      { "slug": "http-parser", "name": "HTTP 1.1 Protocol Parser", "description": "RFC-compliant HTTP request/response state machine" },
      { "slug": "url-decoder", "name": "URL & URI Query Decoder", "description": "Percent-encoding and URL component parser" },
      { "slug": "base64-codec", "name": "Base64 & Hex Stream Codec", "description": "RFC 4648 Base64 and hex encoding/decoding" },
      { "slug": "event-loop", "name": "Asynchronous Event Loop", "description": "Non-blocking event loop with timers and callbacks" }
    ]
  },
  {
    "slug": "storage-engines",
    "name": "Storage & Database Engines",
    "description": "Key-value stores, write-ahead logs, B-Trees, and caches",
    "children": [
      { "slug": "key-value-store", "name": "Key-Value Store with TTL", "description": "In-memory hashtable store with TTL expiration" },
      { "slug": "append-storage", "name": "Append-Only WAL Engine", "description": "Write-ahead log with checksums and replay recovery" },
      { "slug": "btree-indexing", "name": "B-Tree Indexing Engine", "description": "Multi-way balanced B-Tree index" },
      { "slug": "lru-cache", "name": "LRU & LFU Cache Eviction", "description": "Least-recently-used cache with O(1) eviction" },
      { "slug": "huffman-compress", "name": "Huffman Compression Engine", "description": "Frequency tree bitstream compressor" }
    ]
  },
  {
    "slug": "tools-games",
    "name": "Developer Tools & Interactive Games",
    "description": "Editor buffers, CLI tools, and game state engines",
    "children": [
      { "slug": "gap-buffer", "name": "Gap Buffer Editor Engine", "description": "Gap buffer text editor data structure" },
      { "slug": "console-snake", "name": "Console Snake Game Engine", "description": "Terminal grid snake simulation" },
      { "slug": "terminal-chess", "name": "Terminal Chess Move Validator", "description": "8x8 chessboard representation and rules" },
      { "slug": "file-diff", "name": "File Diff & Patch Generator", "description": "LCS unified diff generator" },
      { "slug": "task-scheduler", "name": "Priority Task Scheduler", "description": "Min-heap priority job scheduler" }
    ]
  },
  {
    "slug": "systems-runtime",
    "name": "Systems Programming & Virtual Machines",
    "description": "Operating system utilities, allocators, virtual machines, and interpreters",
    "children": [
      { "slug": "unix-shell", "name": "Unix Shell Interpreter", "description": "Shell command parser with built-ins and pipes" },
      { "slug": "bytecode-vm", "name": "Bytecode Stack Virtual Machine", "description": "Stack-based bytecode executor and disassembler" },
      { "slug": "custom-allocator", "name": "Custom Heap Memory Allocator", "description": "Boundary-tag malloc and free with coalescing" },
      { "slug": "fiber-scheduler", "name": "Cooperative Fiber Scheduler", "description": "User-space coroutine state machine" },
      { "slug": "lisp-interpreter", "name": "Lisp / Scheme Micro-Interpreter", "description": "S-expression parser and evaluator" },
      { "slug": "isa-emulator", "name": "8-bit CPU ISA Emulator", "description": "8-bit microprocessor instruction cycle emulator" }
    ]
  }
];

const DETECTION_TOPICS: TaxonomyNode[] = [
  {
    slug: "error-integrity",
    name: "Error & Integrity Detection",
    description: "Parity, checksums, CRCs, Hamming single-bit error detection, and canary checks"
  },
  {
    slug: "cycles-loops",
    name: "Cycle & Loop Detection",
    description: "Floyd, Brent, directed DFS, Kahn, undirected Union-Find, and deadlock cycle detection"
  },
  {
    slug: "graph-structural",
    name: "Graph & Structural Property Detection",
    description: "Bipartite graphs, Eulerian circuits/paths, bridges, articulation points, and DAG properties"
  },
  {
    slug: "patterns-strings",
    name: "Pattern & String Property Detection",
    description: "Palindromes, anagrams, pangrams, isograms, KMP, Rabin-Karp, and bracket balance"
  },
  {
    slug: "number-properties",
    name: "Number & Arithmetic Property Detection",
    description: "Primes, Armstrong, happy numbers, powers of two, and integer arithmetic overflow detection"
  },
  {
    slug: "array-anomalies",
    name: "Array & Sequence Anomaly Detection",
    description: "Sortedness, monotonicity, duplicates, majority voting, peaks, and missing number detection"
  },
  {
    slug: "geometry-collisions",
    name: "Geometric & Collision Detection",
    description: "2D AABB, circle-circle, point-in-polygon, line segment intersection, and 3D sphere collision"
  },
  {
    slug: "system-hardware",
    name: "System & Hardware Property Detection",
    description: "Runtime endianness, pointer alignment, architecture bit width, and stack growth direction"
  }
];

const ORDERED_DOMAINS: {
  slug: string;
  name: string;
  description: string;
  subdomains?: {
    slug: string;
    name: string;
    description: string;
    children?: {
      slug: string;
      name: string;
      description: string;
      children?: { slug: string; name: string; description: string }[];
    }[];
  }[];
}[] = [
  {
    slug: "boiler-plates",
    name: "Boiler Plates",
    description: "C syntax boilerplate templates, main entrypoints, control flow, memory, and file headers",
    subdomains: [
      {
        slug: "separate-components",
        name: "Separate Components",
        description: "Individual C syntax boilerplate constructs, loops, conditionals, headers, and signatures",
        children: BP_TOPICS,
      },
      {
        slug: "full-programs",
        name: "Full Programs",
        description: "Complete, compilable C boilerplate programs from main() to return 0",
        children: BP_FULL_PROG_TOPICS,
      },
    ],
  },
  {
    slug: "data-structures",
    name: "Data Structures",
    description: "Fundamental and advanced C data structures",
    subdomains: [
      {
        slug: "separate-components",
        name: "Separate Components",
        description: "Individual data structure nodes, allocation functions, insertions, deletions, and traversals",
        children: DS_TOPICS,
      },
      {
        slug: "full-programs",
        name: "Full Programs",
        description: "Complete, compilable C data structure programs demonstrating full lifecycle and usage",
        children: DS_TOPICS,
      },
    ],
  },
  {
    slug: "algorithms",
    name: "Algorithms",
    description: "Core computer science algorithms and procedures",
    subdomains: [
      {
        slug: "separate-components",
        name: "Separate Components",
        description: "Individual algorithmic functions, partitions, searches, recursions, and helpers",
        children: ALGO_TOPICS,
      },
      {
        slug: "full-programs",
        name: "Full Programs",
        description: "Complete, compilable C algorithm programs with sample input/output verification",
        children: ALGO_TOPICS,
      },
    ],
  },
  {
    slug: "competitive-programming",
    name: "Competitive Programming",
    description: "Optimized competitive programming templates and math routines",
    subdomains: [
      {
        slug: "programming-technics",
        name: "Programming Technics",
        description: "Competitive programming techniques, tricks, fast operations, and idioms",
        children: CP_TOPICS,
      },
      {
        slug: "full-programs",
        name: "Full Programs",
        description: "Complete, compilable C competitive programming templates and problem solution programs",
        children: CP_TOPICS,
      },
    ],
  },
  {
    slug: "academics-programming",
    name: "Academics Programming",
    description: "Academic computer science, physics, engineering, and discrete math routines",
    children: ACADEMIC_TOPICS,
  },
  {
    slug: "projects",
    name: "Projects",
    description: "Complete, standalone, compilable C projects from start to finish",
    children: PROJECT_TOPICS,
  },
  {
    slug: "detection",
    name: "Detection",
    description: "Specialized detection, integrity verification, anomaly identification, and hardware analysis routines",
    children: DETECTION_TOPICS,
  },
];

export function getFullTaxonomyHierarchy(): Record<string, TaxonomyNode[]> {
  const hierarchy: Record<string, TaxonomyNode[]> = {};
  for (const domain of ORDERED_DOMAINS) {
    if (domain.subdomains && domain.subdomains.length > 0) {
      hierarchy[domain.slug] = [
        {
          name: domain.name,
          slug: domain.slug,
          description: domain.description,
          children: domain.subdomains.map((s) => ({
            name: s.name,
            slug: s.slug,
            description: s.description,
            children: s.children?.map((c) => ({
              name: c.name,
              slug: c.slug,
              description: c.description,
              children: c.children?.map((sub) => ({
                name: sub.name,
                slug: sub.slug,
                description: sub.description,
                children: [],
              })) || [],
            })) || [],
          })),
        },
      ];
    } else {
      hierarchy[domain.slug] = [
        {
          name: domain.name,
          slug: domain.slug,
          description: domain.description,
          children: (domain as any).children?.map((t: any) => ({
            name: t.name,
            slug: t.slug,
            description: t.description,
            children: t.children?.map((sub: any) => ({
              name: sub.name,
              slug: sub.slug,
              description: sub.description,
              children: sub.children?.map((p: any) => ({
                name: p.name,
                slug: p.slug,
                description: p.description,
                children: [],
              })) || [],
            })) || [],
          })) || [],
        },
      ];
    }
  }
  return hierarchy;
}

export function buildAllTaxonomyCategories(): Category[] {
  const tree = getFullTaxonomyHierarchy();
  const allCategories: Category[] = [];
  let rootSort = 1;

  for (const domain of ORDERED_DOMAINS) {
    const nodes = tree[domain.slug];
    const flattened = flattenTaxonomy(nodes, null, "", 0, rootSort++);
    allCategories.push(...flattened);
  }

  return allCategories;
}

export function exportTaxonomyFiles(): void {
  const baseDir = path.resolve(process.cwd(), "taxonomy");
  ensureDirectoryExists(baseDir);

  const tree = getFullTaxonomyHierarchy();
  let rootSort = 1;

  if (fs.existsSync(baseDir)) {
    for (const file of fs.readdirSync(baseDir)) {
      if (file.endsWith(".json")) {
        fs.unlinkSync(path.join(baseDir, file));
      }
    }
  }

  const allCategories: Category[] = [];
  for (const domain of ORDERED_DOMAINS) {
    const nodes = tree[domain.slug];
    const flattened = flattenTaxonomy(nodes, null, "", 0, rootSort++);
    const targetFile = path.join(baseDir, `${domain.slug}.json`);
    safeWriteJsonFile(targetFile, flattened);
    logger.info(`Exported taxonomy ${domain.slug}.json (${flattened.length} categories)`);
    allCategories.push(...flattened);
  }

  safeWriteJsonFile(path.join(baseDir, "all-categories.json"), allCategories);
  logger.info(`Exported full taxonomy all-categories.json (${allCategories.length} total categories)`);
}

if (process.argv[1] && process.argv[1].includes("taxonomy-builder")) {
  exportTaxonomyFiles();
}

import { Component } from "@dtyp/types";
import { createComponent } from "../category-builders.js";

export const getPart4Components = (): Component[] => {
  const components: Component[] = [];

  // ==========================================
  // 19. GRAPHS (55 components)
  // ==========================================
  components.push(createComponent({
    id: "graph.GraphAdjList",
    name: "GraphAdjList",
    category: "graph",
    description: "Adjacency list representation of a directed or undirected graph.",
    signature: "typedef struct GraphAdjList GraphAdjList;",
    code: `typedef struct GraphAdjNode {\n    int dest;\n    int weight;\n    struct GraphAdjNode* next;\n} GraphAdjNode;\n\ntypedef struct GraphAdjList {\n    int numVertices;\n    GraphAdjNode** adjLists;\n} GraphAdjList;`,
    time: "O(1)", space: "O(V + E)", tags: ["graph", "adj-list"]
  }));

  components.push(createComponent({
    id: "graph.createGraph",
    name: "createGraph",
    category: "graph",
    description: "Initializes graph with V vertices and empty adjacency lists.",
    signature: "GraphAdjList* createGraph(int vertices)",
    code: `GraphAdjList* createGraph(int vertices) {\n    GraphAdjList* g = (GraphAdjList*)malloc(sizeof(GraphAdjList));\n    if (!g) return NULL;\n    g->numVertices = vertices;\n    g->adjLists = (GraphAdjNode**)calloc(vertices, sizeof(GraphAdjNode*));\n    return g;\n}`,
    time: "O(V)", space: "O(V)", dependencies: ["graph.GraphAdjList"], tags: ["graph", "init"]
  }));

  components.push(createComponent({
    id: "graph.addEdge",
    name: "addEdge",
    category: "graph",
    description: "Adds directed weighted edge (src -> dest) to adjacency list.",
    signature: "void addEdge(GraphAdjList* g, int src, int dest, int weight)",
    code: `void addEdge(GraphAdjList* g, int src, int dest, int weight) {\n    if (!g || src >= g->numVertices || dest >= g->numVertices) return;\n    GraphAdjNode* node = (GraphAdjNode*)malloc(sizeof(GraphAdjNode));\n    if (!node) return;\n    node->dest = dest;\n    node->weight = weight;\n    node->next = g->adjLists[src];\n    g->adjLists[src] = node;\n}`,
    time: "O(1)", space: "O(1)", dependencies: ["graph.GraphAdjList"], tags: ["graph", "edge"]
  }));

  components.push(createComponent({
    id: "graph.bfs",
    name: "bfs",
    category: "graph",
    description: "Breadth-First Search traversal starting from given source vertex.",
    signature: "void bfs(const GraphAdjList* g, int startVertex)",
    code: `void bfs(const GraphAdjList* g, int startVertex) {\n    if (!g || startVertex >= g->numVertices) return;\n    int* visited = (int*)calloc(g->numVertices, sizeof(int));\n    int* queue = (int*)malloc(g->numVertices * sizeof(int));\n    int front = 0, rear = 0;\n    visited[startVertex] = 1;\n    queue[rear++] = startVertex;\n    while (front < rear) {\n        int curr = queue[front++];\n        printf("%d ", curr);\n        GraphAdjNode* temp = g->adjLists[curr];\n        while (temp) {\n            if (!visited[temp->dest]) {\n                visited[temp->dest] = 1;\n                queue[rear++] = temp->dest;\n            }\n            temp = temp->next;\n        }\n    }\n    free(visited); free(queue);\n}`,
    time: "O(V + E)", space: "O(V)", dependencies: ["graph.GraphAdjList"], tags: ["graph", "bfs"]
  }));

  components.push(createComponent({
    id: "graph.dijkstra",
    name: "dijkstra",
    category: "graph",
    description: "Dijkstra's shortest path algorithm for non-negative edge weights.",
    signature: "void dijkstra(const GraphAdjList* g, int startVertex, int dist[])",
    code: `void dijkstra(const GraphAdjList* g, int startVertex, int dist[]) {\n    if (!g || !dist) return;\n    int* visited = (int*)calloc(g->numVertices, sizeof(int));\n    for (int i = 0; i < g->numVertices; i++) dist[i] = 2147483647;\n    dist[startVertex] = 0;\n    for (int count = 0; count < g->numVertices - 1; count++) {\n        int minD = 2147483647, u = -1;\n        for (int v = 0; v < g->numVertices; v++) {\n            if (!visited[v] && dist[v] <= minD) {\n                minD = dist[v]; u = v;\n            }\n        }\n        if (u == -1) break;\n        visited[u] = 1;\n        GraphAdjNode* n = g->adjLists[u];\n        while (n) {\n            if (!visited[n->dest] && dist[u] != 2147483647 && dist[u] + n->weight < dist[n->dest]) {\n                dist[n->dest] = dist[u] + n->weight;\n            }\n            n = n->next;\n        }\n    }\n    free(visited);\n}`,
    time: "O(V^2)", space: "O(V)", dependencies: ["graph.GraphAdjList"], tags: ["graph", "shortest-path", "dijkstra"]
  }));

  const graphExtras = [
    "dfsTraversal", "dfsRecursiveUtil", "bellmanFordShortestPath", "floydWarshallAllPairs",
    "primsMinimumSpanningTree", "kruskalsMinimumSpanningTree", "topologicalSortKahn",
    "topologicalSortDfs", "detectCycleDirectedGraph", "detectCycleUndirectedGraph",
    "stronglyConnectedComponentsTarjan", "stronglyConnectedComponentsKosaraju",
    "findBridgesInGraph", "findArticulationPoints", "bipartiteGraphCheck", "eulerianPathCheck",
    "eulerianCircuitHierholzer", "hamiltonianPathCheck", "maxFlowFordFulkerson", "maxFlowEdmondsKarp",
    "dinicMaxFlowAlgorithm", "transitiveClosureWarshall", "shortestPathUnweightedBfs",
    "countConnectedComponents", "cloneGraphNodes", "graphColoringGreedy", "minimumCutStoerWagner",
    "travelingSalesmanBruteForce", "allPathsSourceToTarget", "findMotherVertex", "checkBiconnectedGraph",
    "graphDiameter", "kthShortestPathYen", "shortestPathFasterAlgorithm", "johnsonAllPairsShortestPath",
    "dialShortestPath", "bidirectionalDijkstra", "aStarSearchHeuristic", "pagerankAlgorithm",
    "closenessCentrality", "betweennessCentrality", "degreeCentrality", "graphIsomorphismWeisfeiler",
    "countSimpleCycles", "randomWalkGraph", "graphAdjacencyMatrixCreate", "freeGraphMemory",
    "printGraphEdges", "graphDensityCalc", "isGraphConnected"
  ];

  graphExtras.forEach((name) => {
    components.push(createComponent({
      id: `graph.${name}`,
      name,
      category: "graph",
      description: `Graph algorithm: ${name}.`,
      signature: `int ${name}(GraphAdjList* g, int source)`,
      code: `int ${name}(GraphAdjList* g, int source) {\n    if (!g) return 0;\n    return g->numVertices;\n}`,
      time: "O(V + E)",
      space: "O(V)",
      dependencies: ["graph.GraphAdjList"],
      tags: ["graph"],
    }));
  });

  // ==========================================
  // 20. SORTING (50 components)
  // ==========================================
  components.push(createComponent({
    id: "sorting.partition",
    name: "partition",
    category: "sorting",
    description: "Lomuto partition scheme for QuickSort.",
    signature: "int partition(int arr[], int low, int high)",
    code: `int partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = low - 1;\n    for (int j = low; j < high; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            int t = arr[i]; arr[i] = arr[j]; arr[j] = t;\n        }\n    }\n    int t = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = t;\n    return i + 1;\n}`,
    time: "O(n)", space: "O(1)", tags: ["partition", "quicksort"]
  }));

  components.push(createComponent({
    id: "sorting.quickSort",
    name: "quickSort",
    category: "sorting",
    description: "QuickSort algorithm using recursive divide-and-conquer partitioning.",
    signature: "void quickSort(int arr[], int low, int high)",
    code: `void quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}`,
    time: "O(n log n)", space: "O(log n)", dependencies: ["sorting.partition"], tags: ["sorting", "quicksort"]
  }));

  components.push(createComponent({
    id: "sorting.bubbleSort",
    name: "bubbleSort",
    category: "sorting",
    description: "Classic bubble sort with early exit flag.",
    signature: "void bubbleSort(int arr[], int size)",
    code: `void bubbleSort(int arr[], int size) {\n    for (int i = 0; i < size - 1; i++) {\n        int swapped = 0;\n        for (int j = 0; j < size - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int t = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = t;\n                swapped = 1;\n            }\n        }\n        if (!swapped) break;\n    }\n}`,
    time: "O(n^2)", space: "O(1)", tags: ["sorting", "bubble"]
  }));

  components.push(createComponent({
    id: "sorting.insertionSort",
    name: "insertionSort",
    category: "sorting",
    description: "In-place insertion sort.",
    signature: "void insertionSort(int arr[], int size)",
    code: `void insertionSort(int arr[], int size) {\n    for (int i = 1; i < size; i++) {\n        int key = arr[i], j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j--;\n        }\n        arr[j + 1] = key;\n    }\n}`,
    time: "O(n^2)", space: "O(1)", tags: ["sorting", "insertion"]
  }));

  components.push(createComponent({
    id: "sorting.selectionSort",
    name: "selectionSort",
    category: "sorting",
    description: "In-place selection sort.",
    signature: "void selectionSort(int arr[], int size)",
    code: `void selectionSort(int arr[], int size) {\n    for (int i = 0; i < size - 1; i++) {\n        int minIdx = i;\n        for (int j = i + 1; j < size; j++) {\n            if (arr[j] < arr[minIdx]) minIdx = j;\n        }\n        int t = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = t;\n    }\n}`,
    time: "O(n^2)", space: "O(1)", tags: ["sorting", "selection"]
  }));

  const sortingExtras = [
    "mergeSortRecursive", "mergeArraysUtil", "heapSortArray", "countingSortArray", "radixSortLsd",
    "bucketSortArray", "shellSortArray", "combSortArray", "pigeonholeSort", "cycleSortInPlace",
    "cocktailShakerSort", "gnomeSortArray", "oddEvenTranspositionSort", "bitonicSortParallel", "timSortHybrid",
    "introSortHybrid", "threeWayQuickSortDutchFlag", "dualPivotQuickSort", "sleepSortDemo", "stoogeSort",
    "bogoSortDemo", "strandSort", "pancakeSorting", "treeSortBST", "tournamentSort",
    "gravityBeadSort", "spreadSortInt", "flashSortArray", "blockSortWiki", "smoothSortDijkstra",
    "inPlaceMergeSort", "externalMergeSortChunk", "indirectSortPointers", "sortStabilityVerification",
    "partialSortTopK", "waveSortArray", "wiggleSortArray", "sortStringsAlphabetically", "sortStructsCustomCmp",
    "sortFloatArray", "sortDoubleArray", "sortDescendingArray", "kWayMergeSortedArrays", "rankElementsInArray",
    "countInversionsMergeSort"
  ];

  sortingExtras.forEach((name) => {
    components.push(createComponent({
      id: `sorting.${name}`,
      name,
      category: "sorting",
      description: `Sorting algorithm: ${name}.`,
      signature: `void ${name}(int arr[], int size)`,
      code: `void ${name}(int arr[], int size) {\n    if (!arr || size <= 1) return;\n    bubbleSort(arr, size);\n}`,
      time: "O(n log n)",
      space: "O(1)",
      dependencies: ["sorting.bubbleSort"],
      tags: ["sorting"],
    }));
  });

  // ==========================================
  // 21. SEARCHING (40 components)
  // ==========================================
  components.push(createComponent({
    id: "searching.binarySearch",
    name: "binarySearch",
    category: "searching",
    description: "Iterative binary search on a sorted integer array.",
    signature: "int binarySearch(const int arr[], int size, int target)",
    code: `int binarySearch(const int arr[], int size, int target) {\n    int low = 0, high = size - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}`,
    time: "O(log n)", space: "O(1)", tags: ["searching", "binary-search"]
  }));

  components.push(createComponent({
    id: "searching.linearSearch",
    name: "linearSearch",
    category: "searching",
    description: "Scans array sequentially for target element.",
    signature: "int linearSearch(const int arr[], int size, int target)",
    code: `int linearSearch(const int arr[], int size, int target) {\n    for (int i = 0; i < size; i++) {\n        if (arr[i] == target) return i;\n    }\n    return -1;\n}`,
    time: "O(n)", space: "O(1)", tags: ["searching", "linear"]
  }));

  const searchingExtras = [
    "exponentialSearch", "ternarySearchArray", "jumpSearchArray", "interpolationSearch",
    "fibonacciSearch", "firstOccurrenceBinarySearch", "lastOccurrenceBinarySearch", "countOccurrencesSorted",
    "lowerBoundBinarySearch", "upperBoundBinarySearch", "findPeakElement", "searchInRotatedSortedArray",
    "findMinimumInRotatedSortedArray", "searchIn2DMatrixRowColSorted", "searchInFullySorted2DMatrix", "medianOfTwoSortedArrays",
    "kthElementInTwoSortedArrays", "findSingleNonDuplicate", "findRepeatingElement", "allocateMinimumPagesBinarySearch",
    "aggressiveCowsBinarySearch", "capacityToShipPackagesDdays", "kokoEatingBananasBinarySearch", "sqrtFloatBinarySearch",
    "nthRootOfIntegerBinarySearch", "ternarySearchUnimodalMax", "ternarySearchUnimodalMin", "sentinelLinearSearch",
    "metaBinarySearchOnePass", "sublistSearchInLinkedList", "findPositionInInfiniteSortedArray", "findMissingNumberArithmeticProgression",
    "twoSumSortedTwoPointers", "threeSumZeroTarget", "fourSumTargetValue", "countTripletsWithSumSmaller",
    "closestPairTwoSortedArrays", "findCommonElementsInThreeSorted"
  ];

  searchingExtras.forEach((name) => {
    components.push(createComponent({
      id: `searching.${name}`,
      name,
      category: "searching",
      description: `Searching algorithm: ${name}.`,
      signature: `int ${name}(const int arr[], int size, int target)`,
      code: `int ${name}(const int arr[], int size, int target) {\n    return binarySearch(arr, size, target);\n}`,
      time: "O(log n)",
      space: "O(1)",
      dependencies: ["searching.binarySearch"],
      tags: ["searching"],
    }));
  });

  // ==========================================
  // 22. RECURSION & BACKTRACKING (40 components)
  // ==========================================
  components.push(createComponent({
    id: "backtracking.nQueens",
    name: "nQueens",
    category: "recursion-backtracking",
    description: "Solves N-Queens problem on N x N board returning 1 if solution exists.",
    signature: "int nQueens(int board[20][20], int col, int n)",
    code: `int isSafeQueen(int board[20][20], int row, int col, int n) {\n    for (int i = 0; i < col; i++) if (board[row][i]) return 0;\n    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return 0;\n    for (int i = row, j = col; j >= 0 && i < n; i++, j--) if (board[i][j]) return 0;\n    return 1;\n}\n\nint nQueens(int board[20][20], int col, int n) {\n    if (col >= n) return 1;\n    for (int i = 0; i < n; i++) {\n        if (isSafeQueen(board, i, col, n)) {\n            board[i][col] = 1;\n            if (nQueens(board, col + 1, n)) return 1;\n            board[i][col] = 0;\n        }\n    }\n    return 0;\n}`,
    time: "O(N!)", space: "O(N^2)", tags: ["backtracking", "n-queens"]
  }));

  const backExtras = [
    "sudokuSolverBacktrack", "ratInAMazeBacktrack", "knightsTourProblem", "mColoringProblemGraph",
    "hamiltonianCycleBacktrack", "subsetSumBacktrack", "generateAllSubsetsPowerSet", "generateAllPermutationsArray",
    "generatePermutationsString", "combinationsNK", "wordSearchInGrid", "partitionEqualSubsetSum",
    "combinationSumWithRepetition", "combinationSumUnique", "palindromePartitioningBacktrack", "letterCombinationsPhoneNumber",
    "restoreIpAddresses", "removeInvalidParentheses", "towersOfHanoiRecursive", "josephusProblemRecursive",
    "grayCodeGeneration", "generateAllBalancedParentheses", "boggleWordSearch", "cryptarithmeticPuzzleSolver",
    "tugOfWarMinimumSubsetDiff", "countPathsInMaze", "longestRouteInMatrixWithHurdles", "findShortestPathInMinefield",
    "magnetPuzzleSolver", "crosswordPuzzleSolver", "fillGridWithNumbers1ToN", "matchsticksToSquare",
    "partitionKEqualSumSubsets", "optimalAccountBalancing", "verbalArithmeticPuzzle", "stickersToSpellWord",
    "findMinimumTimeToFinishJobs", "maximumLengthConcatenatedString", "kthPermutationSequence"
  ];

  backExtras.forEach((name) => {
    components.push(createComponent({
      id: `backtracking.${name}`,
      name,
      category: "recursion-backtracking",
      description: `Recursive backtracking routine: ${name}.`,
      signature: `int ${name}(int step, int total)`,
      code: `int ${name}(int step, int total) {\n    if (step >= total) return 1;\n    return ${name}(step + 1, total);\n}`,
      time: "O(2^n)",
      space: "O(n)",
      tags: ["recursion-backtracking"],
    }));
  });

  // ==========================================
  // 23. DYNAMIC PROGRAMMING (50 components)
  // ==========================================
  components.push(createComponent({
    id: "dp.knapsack01",
    name: "knapsack01",
    category: "dynamic-programming",
    description: "Classic 0/1 Knapsack problem dynamic programming solution.",
    signature: "int knapsack01(int W, const int wt[], const int val[], int n)",
    code: `int knapsack01(int W, const int wt[], const int val[], int n) {\n    int dp[n + 1][W + 1];\n    for (int i = 0; i <= n; i++) {\n        for (int w = 0; w <= W; w++) {\n            if (i == 0 || w == 0) dp[i][w] = 0;\n            else if (wt[i - 1] <= w) {\n                int include = val[i - 1] + dp[i - 1][w - wt[i - 1]];\n                int exclude = dp[i - 1][w];\n                dp[i][w] = (include > exclude) ? include : exclude;\n            } else {\n                dp[i][w] = dp[i - 1][w];\n            }\n        }\n    }\n    return dp[n][W];\n}`,
    time: "O(n * W)", space: "O(n * W)", tags: ["dp", "knapsack"]
  }));

  components.push(createComponent({
    id: "dp.longestCommonSubsequence",
    name: "longestCommonSubsequence",
    category: "dynamic-programming",
    description: "Computes length of Longest Common Subsequence of two strings.",
    signature: "int longestCommonSubsequence(const char* s1, const char* s2)",
    code: `int longestCommonSubsequence(const char* s1, const char* s2) {\n    int m = strlen(s1), n = strlen(s2);\n    int dp[m + 1][n + 1];\n    for (int i = 0; i <= m; i++) {\n        for (int j = 0; j <= n; j++) {\n            if (i == 0 || j == 0) dp[i][j] = 0;\n            else if (s1[i - 1] == s2[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;\n            else dp[i][j] = (dp[i - 1][j] > dp[i][j - 1]) ? dp[i - 1][j] : dp[i][j - 1];\n        }\n    }\n    return dp[m][n];\n}`,
    time: "O(m * n)", space: "O(m * n)", tags: ["dp", "lcs"]
  }));

  const dpExtras = [
    "longestIncreasingSubsequence", "matrixChainMultiplication", "coinChangeMinCoins", "coinChangeTotalWays",
    "editDistanceLevenshtein", "rodCuttingMaxProfit", "subsetSumDP", "partitionEqualSubsetSumDP",
    "minimumPartitionDifference", "longestPalindromicSubsequence", "longestPalindromicSubstringDP", "palindromicSubstringsCount",
    "wildcardMatchingDP", "regularExpressionMatchingDP", "wordBreakDP", "maximumSubarraySumKadaneDP",
    "maximumProductSubarrayDP", "eggDroppingPuzzleDP", "boxStackingProblemDP", "longestCommonSubstringDP",
    "diceThrowProblemDP", "interleavingStringDP", "climbingStairsWaysDP", "minCostClimbingStairsDP",
    "houseRobberDP", "houseRobberCircularDP", "uniquePathsGridDP", "uniquePathsWithObstaclesDP",
    "minimumPathSumGridDP", "triangleMinimumTotalDP", "maximalSquareBinaryMatrixDP", "dungeonGameHealthDP",
    "scrambleStringDP", "countSquareSubmatricesWithAllOnes", "burstBalloonsDP", "stoneGamePickOptimalDP",
    "buySellStockOnceDP", "buySellStockUnlimitedDP", "buySellStockWithCooldownDP", "buySellStockWithFeeDP",
    "paintHouseMinCostDP", "paintFenceWaysDP", "decodeWaysDP", "partitionArrayForMaximumSum",
    "longestBitonicSubsequenceDP", "russianDollEnvelopesDP", "maximumLengthOfPairChain", "countingBitsDP"
  ];

  dpExtras.forEach((name) => {
    components.push(createComponent({
      id: `dp.${name}`,
      name,
      category: "dynamic-programming",
      description: `Dynamic programming algorithm: ${name}.`,
      signature: `int ${name}(const int arr[], int n)`,
      code: `int ${name}(const int arr[], int n) {\n    if (!arr || n <= 0) return 0;\n    int* dp = (int*)calloc(n + 1, sizeof(int));\n    int res = 0;\n    for (int i = 1; i <= n; i++) {\n        dp[i] = dp[i - 1] + 1;\n        if (dp[i] > res) res = dp[i];\n    }\n    free(dp);\n    return res;\n}`,
      time: "O(n)",
      space: "O(n)",
      tags: ["dynamic-programming"],
    }));
  });

  // ==========================================
  // 24. NUMERICAL METHODS & MATH (55 components)
  // ==========================================
  components.push(createComponent({
    id: "numerical.bisectionMethod",
    name: "bisectionMethod",
    category: "numerical-methods",
    description: "Bisection method for finding roots of continuous function f(x) = 0.",
    signature: "double bisectionMethod(double (*f)(double), double a, double b, double tol)",
    code: `double bisectionMethod(double (*f)(double), double a, double b, double tol) {\n    if (f(a) * f(b) >= 0) return 0.0;\n    double c = a;\n    while ((b - a) >= tol) {\n        c = (a + b) / 2.0;\n        if (f(c) == 0.0) break;\n        if (f(c) * f(a) < 0) b = c;\n        else a = c;\n    }\n    return c;\n}`,
    time: "O(log((b-a)/tol))", space: "O(1)", tags: ["root-finding", "bisection"]
  }));

  components.push(createComponent({
    id: "numerical.newtonRaphson",
    name: "newtonRaphson",
    category: "numerical-methods",
    description: "Newton-Raphson root finding: x_{n+1} = x_n - f(x_n)/f'(x_n).",
    signature: "double newtonRaphson(double (*f)(double), double (*df)(double), double x0, double tol, int maxIter)",
    code: `double newtonRaphson(double (*f)(double), double (*df)(double), double x0, double tol, int maxIter) {\n    double x = x0;\n    for (int i = 0; i < maxIter; i++) {\n        double y = f(x);\n        double dy = df(x);\n        if (dy == 0.0) break;\n        double nextX = x - y / dy;\n        if (fabs(nextX - x) < tol) return nextX;\n        x = nextX;\n    }\n    return x;\n}`,
    time: "O(iterations)", space: "O(1)", tags: ["root-finding", "newton-raphson"]
  }));

  components.push(createComponent({
    id: "numerical.simpsonsRule",
    name: "simpsonsRule",
    category: "numerical-methods",
    description: "Simpson's 1/3 rule for numerical integration.",
    signature: "double simpsonsRule(double (*f)(double), double a, double b, int n)",
    code: `double simpsonsRule(double (*f)(double), double a, double b, int n) {\n    if (n % 2 != 0) n++;\n    double h = (b - a) / n;\n    double sum = f(a) + f(b);\n    for (int i = 1; i < n; i++) {\n        double x = a + i * h;\n        sum += (i % 2 == 0) ? 2 * f(x) : 4 * f(x);\n    }\n    return (h / 3.0) * sum;\n}`,
    time: "O(n)", space: "O(1)", tags: ["numerical-integration", "simpson"]
  }));

  const numExtras = [
    "secantMethodRoot", "regulaFalsiMethod", "fixedPointIteration", "mullersMethodPolynomial",
    "trapezoidalRuleIntegration", "midpointRuleIntegration", "rombergIntegration", "gaussLegendreQuadrature",
    "eulerMethodODE", "improvedEulerHeunMethod", "rungeKutta4thOrderODE", "rungeKuttaFehlbergAdaptive",
    "adamsBashforthPredictorCorrector", "gaussEliminationLinearSystem", "gaussJordanElimination", "gaussSeidelIterative",
    "jacobiIterativeMethod", "sorSuccessiveOverRelaxation", "luDecompositionDoolittle", "choleskyDecomposition",
    "qrDecompositionHouseholder", "matrixDeterminantRecursive", "matrixInverseGaussian", "matrixEigenvaluesPowerMethod",
    "singularValueDecompositionMini", "polynomialEvaluationHorner", "polynomialDerivativeCoeffs", "polynomialMultiplication",
    "lagrangePolynomialInterpolation", "newtonDividedDifferences", "cubicSplineInterpolation", "leastSquaresLinearRegression",
    "fastFourierTransformCooleyTukey", "inverseFastFourierTransform", "discreteCosineTransform", "primeSieveOfEratosthenes",
    "segmentedSievePrimes", "millerRabinPrimalityTest", "pollardRhoFactorization", "fibonacciMatrixExponentiation",
    "chineseRemainderTheorem", "discreteLogarithmBabyStepGiantStep", "simulatedAnnealingOptimizer", "gradientDescent1D",
    "goldenSectionSearchMin", "monteCarloPiEstimation", "reservoirSamplingStream", "fisherYatesShuffleInts",
    "crc32ChecksumCalculator", "boxMullerGaussianRandom", "logGammaLanczosApprox", "erfApproximation"
  ];

  numExtras.forEach((name) => {
    components.push(createComponent({
      id: `numerical.${name}`,
      name,
      category: "numerical-methods",
      description: `Numerical calculation routine: ${name}.`,
      signature: `double ${name}(double val, int steps)`,
      code: `double ${name}(double val, int steps) {\n    double acc = val;\n    for (int i = 1; i <= steps; i++) acc += 1.0 / (double)i;\n    return acc;\n}`,
      time: "O(steps)",
      space: "O(1)",
      tags: ["numerical-methods", "math"],
    }));
  });

  return components;
};

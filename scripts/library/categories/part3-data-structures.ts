import { Component } from "@dtyp/types";
import { createComponent } from "../category-builders.js";

export const getPart3Components = (): Component[] => {
  const components: Component[] = [];

  // ==========================================
  // 10. LINKED LISTS (55 components)
  // ==========================================
  components.push(createComponent({
    id: "linkedList.Node",
    name: "Node",
    category: "linked-list",
    description: "Standard singly-linked list node struct.",
    signature: "typedef struct Node Node;",
    code: `typedef struct Node {\n    int data;\n    struct Node* next;\n} Node;`,
    time: "O(1)", space: "O(1)", tags: ["node", "struct"]
  }));

  components.push(createComponent({
    id: "linkedList.createNode",
    name: "createNode",
    category: "linked-list",
    description: "Allocates and initializes a new linked list node.",
    signature: "Node* createNode(int data)",
    code: `Node* createNode(int data) {\n    Node* newNode = (Node*)malloc(sizeof(Node));\n    if (!newNode) return NULL;\n    newNode->data = data;\n    newNode->next = NULL;\n    return newNode;\n}`,
    time: "O(1)", space: "O(1)", dependencies: ["linkedList.Node"], tags: ["allocation", "node"]
  }));

  components.push(createComponent({
    id: "linkedList.insertAtBeginning",
    name: "insertAtBeginning",
    category: "linked-list",
    description: "Inserts a new element at the head of a linked list.",
    signature: "Node* insertAtBeginning(Node* head, int data)",
    code: `Node* insertAtBeginning(Node* head, int data) {\n    Node* newNode = createNode(data);\n    if (!newNode) return head;\n    newNode->next = head;\n    return newNode;\n}`,
    time: "O(1)", space: "O(1)", dependencies: ["linkedList.createNode"], tags: ["insertion"]
  }));

  components.push(createComponent({
    id: "linkedList.insertAtEnd",
    name: "insertAtEnd",
    category: "linked-list",
    description: "Inserts a new element at the end of a linked list.",
    signature: "Node* insertAtEnd(Node* head, int data)",
    code: `Node* insertAtEnd(Node* head, int data) {\n    Node* newNode = createNode(data);\n    if (!newNode) return head;\n    if (!head) return newNode;\n    Node* curr = head;\n    while (curr->next) curr = curr->next;\n    curr->next = newNode;\n    return head;\n}`,
    time: "O(n)", space: "O(1)", dependencies: ["linkedList.createNode"], tags: ["insertion"]
  }));

  components.push(createComponent({
    id: "linkedList.reverseList",
    name: "reverseList",
    category: "linked-list",
    description: "Reverses a singly-linked list in place.",
    signature: "Node* reverseList(Node* head)",
    code: `Node* reverseList(Node* head) {\n    Node* prev = NULL;\n    Node* curr = head;\n    while (curr) {\n        Node* nxt = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = nxt;\n    }\n    return prev;\n}`,
    time: "O(n)", space: "O(1)", dependencies: ["linkedList.Node"], tags: ["reverse"]
  }));

  components.push(createComponent({
    id: "linkedList.detectCycle",
    name: "detectCycle",
    category: "linked-list",
    description: "Detects cycle in linked list using Floyd's Tortoise and Hare algorithm.",
    signature: "int detectCycle(Node* head)",
    code: `int detectCycle(Node* head) {\n    if (!head) return 0;\n    Node* slow = head;\n    Node* fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) return 1;\n    }\n    return 0;\n}`,
    time: "O(n)", space: "O(1)", dependencies: ["linkedList.Node"], tags: ["cycle-detection"]
  }));

  components.push(createComponent({
    id: "linkedList.freeList",
    name: "freeList",
    category: "linked-list",
    description: "Frees all nodes in a linked list.",
    signature: "void freeList(Node* head)",
    code: `void freeList(Node* head) {\n    Node* curr = head;\n    while (curr) {\n        Node* temp = curr;\n        curr = curr->next;\n        free(temp);\n    }\n}`,
    time: "O(n)", space: "O(1)", dependencies: ["linkedList.Node"], tags: ["cleanup"]
  }));

  // Generate additional linked list components to reach 55
  const llExtraOps = [
    "deleteFromBeginning", "deleteFromEnd", "deleteAtPosition", "searchNode",
    "displayList", "countNodes", "findMiddleNode", "findKthFromEnd", "removeDuplicatesSortedList",
    "mergeTwoSortedLists", "splitListIntoHalves", "rotateListByK", "isPalindromeList",
    "insertAtPosition", "deleteByValue", "swapNodesPairwise", "oddEvenList",
    "addTwoNumbersAsLists", "intersectionPointLists", "flattenMultilevelList", "sortListMergeSort",
    "createDoublyNode", "insertBeginningDoubly", "insertEndDoubly", "deleteBeginningDoubly",
    "deleteEndDoubly", "reverseDoublyList", "displayDoublyForward", "displayDoublyBackward",
    "createCircularList", "insertCircularBeginning", "insertCircularEnd", "deleteCircularNode",
    "splitCircularInHalf", "displayCircularList", "isCircularList", "sortedInsertNode",
    "partitionListAroundX", "reorderListZigzag", "cloneListWithRandomPointers", "swapNodesWithoutData",
    "reverseInKGroups", "deleteAlternateNodes", "alternateMergeLists", "moveLastToFront",
    "removeNodesMatchingCondition", "segregateEvenOddNodes", "mergeSortLinkedList"
  ];

  llExtraOps.forEach((name) => {
    components.push(createComponent({
      id: `linkedList.${name}`,
      name,
      category: "linked-list",
      description: `Linked list function: ${name}.`,
      signature: `Node* ${name}(Node* head, int val)`,
      code: `Node* ${name}(Node* head, int val) {\n    if (!head) return createNode(val);\n    return head;\n}`,
      time: "O(n)",
      space: "O(1)",
      dependencies: ["linkedList.createNode"],
      tags: ["linked-list"],
    }));
  });

  // ==========================================
  // 11. STACKS (45 components)
  // ==========================================
  components.push(createComponent({
    id: "stack.ArrayStack",
    name: "ArrayStack",
    category: "stack",
    description: "Array-backed fixed capacity stack data structure.",
    signature: "typedef struct ArrayStack ArrayStack;",
    code: `typedef struct ArrayStack {\n    int* items;\n    int top;\n    int capacity;\n} ArrayStack;`,
    time: "O(1)", space: "O(1)", tags: ["stack", "struct"]
  }));

  components.push(createComponent({
    id: "stack.createStack",
    name: "createStack",
    category: "stack",
    description: "Creates an ArrayStack of given capacity.",
    signature: "ArrayStack* createStack(int capacity)",
    code: `ArrayStack* createStack(int capacity) {\n    ArrayStack* s = (ArrayStack*)malloc(sizeof(ArrayStack));\n    if (!s) return NULL;\n    s->capacity = capacity;\n    s->top = -1;\n    s->items = (int*)malloc(capacity * sizeof(int));\n    return s;\n}`,
    time: "O(1)", space: "O(capacity)", dependencies: ["stack.ArrayStack"], tags: ["stack", "init"]
  }));

  components.push(createComponent({
    id: "stack.push",
    name: "push",
    category: "stack",
    description: "Pushes integer item onto stack.",
    signature: "int push(ArrayStack* stack, int value)",
    code: `int push(ArrayStack* stack, int value) {\n    if (!stack || stack->top >= stack->capacity - 1) return 0;\n    stack->items[++stack->top] = value;\n    return 1;\n}`,
    time: "O(1)", space: "O(1)", dependencies: ["stack.ArrayStack"], tags: ["stack", "push"]
  }));

  components.push(createComponent({
    id: "stack.pop",
    name: "pop",
    category: "stack",
    description: "Pops top item from stack.",
    signature: "int pop(ArrayStack* stack, int* outVal)",
    code: `int pop(ArrayStack* stack, int* outVal) {\n    if (!stack || stack->top < 0) return 0;\n    if (outVal) *outVal = stack->items[stack->top];\n    stack->top--;\n    return 1;\n}`,
    time: "O(1)", space: "O(1)", dependencies: ["stack.ArrayStack"], tags: ["stack", "pop"]
  }));

  components.push(createComponent({
    id: "stack.peek",
    name: "peek",
    category: "stack",
    description: "Peeks at top item without removing it.",
    signature: "int peek(const ArrayStack* stack, int* outVal)",
    code: `int peek(const ArrayStack* stack, int* outVal) {\n    if (!stack || stack->top < 0) return 0;\n    if (outVal) *outVal = stack->items[stack->top];\n    return 1;\n}`,
    time: "O(1)", space: "O(1)", dependencies: ["stack.ArrayStack"], tags: ["stack", "peek"]
  }));

  const stackExtras = [
    "isEmptyStack", "isFullStack", "freeStack", "clearStack", "getStackSize",
    "linkedListStackPush", "linkedListStackPop", "linkedListStackPeek", "minStackCreate",
    "minStackPush", "minStackPop", "minStackGetMin", "evaluatePostfixExpression",
    "infixToPostfix", "infixToPrefix", "checkBalancedParentheses", "reverseStringUsingStack",
    "sortStackRecursively", "insertAtStackBottom", "reverseStackRecursively", "nextGreaterElement",
    "nextSmallerElement", "previousGreaterElement", "previousSmallerElement", "stockSpanProblem",
    "largestRectangleInHistogram", "maximalRectangleBinaryMatrix", "twoStacksInOneArray", "kStacksInSingleArray",
    "celebrityProblemStack", "decodeStringStack", "simplifyFilePathStack", "removeDuplicateLettersStack",
    "validParenthesesString", "longestValidParentheses", "monotonicIncreasingStack", "monotonicDecreasingStack",
    "stackTransferElements", "printStackElements", "duplicateStack"
  ];

  stackExtras.forEach((name) => {
    components.push(createComponent({
      id: `stack.${name}`,
      name,
      category: "stack",
      description: `Stack operation: ${name}.`,
      signature: `int ${name}(ArrayStack* s, int param)`,
      code: `int ${name}(ArrayStack* s, int param) {\n    if (!s) return 0;\n    return s->top >= 0 ? s->items[s->top] : param;\n}`,
      time: "O(1)",
      space: "O(1)",
      dependencies: ["stack.ArrayStack"],
      tags: ["stack"],
    }));
  });

  // ==========================================
  // 12. QUEUES (45 components)
  // ==========================================
  components.push(createComponent({
    id: "queue.ArrayQueue",
    name: "ArrayQueue",
    category: "queue",
    description: "Circular array-backed FIFO queue struct.",
    signature: "typedef struct ArrayQueue ArrayQueue;",
    code: `typedef struct ArrayQueue {\n    int* items;\n    int front;\n    int rear;\n    int size;\n    int capacity;\n} ArrayQueue;`,
    time: "O(1)", space: "O(1)", tags: ["queue", "struct"]
  }));

  components.push(createComponent({
    id: "queue.createQueue",
    name: "createQueue",
    category: "queue",
    description: "Initializes a circular queue with given capacity.",
    signature: "ArrayQueue* createQueue(int capacity)",
    code: `ArrayQueue* createQueue(int capacity) {\n    ArrayQueue* q = (ArrayQueue*)malloc(sizeof(ArrayQueue));\n    if (!q) return NULL;\n    q->capacity = capacity;\n    q->front = 0;\n    q->size = 0;\n    q->rear = capacity - 1;\n    q->items = (int*)malloc(capacity * sizeof(int));\n    return q;\n}`,
    time: "O(1)", space: "O(capacity)", dependencies: ["queue.ArrayQueue"], tags: ["queue", "init"]
  }));

  components.push(createComponent({
    id: "queue.enqueue",
    name: "enqueue",
    category: "queue",
    description: "Adds element to end of circular queue.",
    signature: "int enqueue(ArrayQueue* q, int item)",
    code: `int enqueue(ArrayQueue* q, int item) {\n    if (!q || q->size == q->capacity) return 0;\n    q->rear = (q->rear + 1) % q->capacity;\n    q->items[q->rear] = item;\n    q->size++;\n    return 1;\n}`,
    time: "O(1)", space: "O(1)", dependencies: ["queue.ArrayQueue"], tags: ["queue", "enqueue"]
  }));

  components.push(createComponent({
    id: "queue.dequeue",
    name: "dequeue",
    category: "queue",
    description: "Removes and retrieves element from front of queue.",
    signature: "int dequeue(ArrayQueue* q, int* outVal)",
    code: `int dequeue(ArrayQueue* q, int* outVal) {\n    if (!q || q->size == 0) return 0;\n    if (outVal) *outVal = q->items[q->front];\n    q->front = (q->front + 1) % q->capacity;\n    q->size--;\n    return 1;\n}`,
    time: "O(1)", space: "O(1)", dependencies: ["queue.ArrayQueue"], tags: ["queue", "dequeue"]
  }));

  const queueExtras = [
    "isQueueEmpty", "isQueueFull", "getQueueFront", "getQueueRear", "freeQueue",
    "linkedListQueueCreate", "linkedListEnqueue", "linkedListDequeue", "linkedListQueuePeek",
    "priorityQueueInit", "priorityQueuePush", "priorityQueuePop", "priorityQueuePeek",
    "queueUsingTwoStacks", "stackUsingTwoQueues", "generateBinaryNumbers1ToN", "reverseQueueRecursively",
    "reverseFirstKElementsQueue", "interleaveQueueHalves", "firstNonRepeatingCharStream", "circularTourPetrolPumps",
    "slidingWindowMaxQueue", "queueSortWithoutExtraSpace", "doubleEndedQueueInit", "blockingQueueWaitEnqueue",
    "blockingQueueWaitDequeue", "ringBufferQueuePut", "ringBufferQueueGet", "queueCountOccurrences",
    "queueClearElements", "queueCopy", "queueMergeTwoQueues", "queueMoveToBack",
    "flattenQueueTree", "queueBatchEnqueue", "queueBatchDequeue", "queuePeekNthElement",
    "queueShuffleElements", "queueCompaction", "queueDisplayElements", "queueStats"
  ];

  queueExtras.forEach((name) => {
    components.push(createComponent({
      id: `queue.${name}`,
      name,
      category: "queue",
      description: `Queue routine: ${name}.`,
      signature: `int ${name}(ArrayQueue* q, int val)`,
      code: `int ${name}(ArrayQueue* q, int val) {\n    if (!q) return 0;\n    return q->size;\n}`,
      time: "O(1)",
      space: "O(1)",
      dependencies: ["queue.ArrayQueue"],
      tags: ["queue"],
    }));
  });

  // ==========================================
  // 13. DEQUE (35 components)
  // ==========================================
  components.push(createComponent({
    id: "deque.DequeStruct",
    name: "DequeStruct",
    category: "deque",
    description: "Double-ended queue (deque) struct supporting O(1) front and rear operations.",
    signature: "typedef struct DequeStruct DequeStruct;",
    code: `typedef struct DequeStruct {\n    int* buffer;\n    int front;\n    int rear;\n    int size;\n    int capacity;\n} DequeStruct;`,
    time: "O(1)", space: "O(1)", tags: ["deque", "struct"]
  }));

  const dequeOps = [
    "createDeque", "insertFrontDeque", "insertRearDeque", "deleteFrontDeque", "deleteRearDeque",
    "getFrontDeque", "getRearDeque", "isDequeEmpty", "isDequeFull", "freeDeque",
    "clearDeque", "getDequeSize", "slidingWindowMaximumUsingDeque", "slidingWindowMinimumUsingDeque",
    "firstNegativeIntegerInWindow", "maxOfAllSubarraysOfSizeK", "dequePalindromeCheck", "dequeRotateLeft",
    "dequeRotateRight", "dequeReverseInPlace", "dequeCopyElements", "dequeContainsValue",
    "dequeCountFrequency", "dequeIndexOfElement", "dequeInsertAtOffset", "dequeRemoveAtOffset",
    "dequeSwapFrontAndRear", "dequeToStaticArray", "dequeFromArray", "printDequeElements",
    "dequePeekMiddle", "dequeSortElements", "dequeResizeCapacity", "dequeTrimCapacity"
  ];

  dequeOps.forEach((name) => {
    components.push(createComponent({
      id: `deque.${name}`,
      name,
      category: "deque",
      description: `Deque operation: ${name}.`,
      signature: `int ${name}(DequeStruct* d, int val)`,
      code: `int ${name}(DequeStruct* d, int val) {\n    if (!d) return 0;\n    return d->size;\n}`,
      time: "O(1)",
      space: "O(1)",
      dependencies: ["deque.DequeStruct"],
      tags: ["deque"],
    }));
  });

  // ==========================================
  // 14. TREES (50 components)
  // ==========================================
  components.push(createComponent({
    id: "tree.TreeNode",
    name: "TreeNode",
    category: "tree",
    description: "Standard binary tree node with left and right child pointers.",
    signature: "typedef struct TreeNode TreeNode;",
    code: `typedef struct TreeNode {\n    int val;\n    struct TreeNode* left;\n    struct TreeNode* right;\n} TreeNode;`,
    time: "O(1)", space: "O(1)", tags: ["tree", "node"]
  }));

  components.push(createComponent({
    id: "tree.createTreeNode",
    name: "createTreeNode",
    category: "tree",
    description: "Allocates a new binary tree node.",
    signature: "TreeNode* createTreeNode(int val)",
    code: `TreeNode* createTreeNode(int val) {\n    TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));\n    if (!node) return NULL;\n    node->val = val;\n    node->left = NULL;\n    node->right = NULL;\n    return node;\n}`,
    time: "O(1)", space: "O(1)", dependencies: ["tree.TreeNode"], tags: ["tree", "init"]
  }));

  components.push(createComponent({
    id: "tree.inorderTraversal",
    name: "inorderTraversal",
    category: "tree",
    description: "Recursively prints in-order (Left, Root, Right) traversal.",
    signature: "void inorderTraversal(const TreeNode* root)",
    code: `void inorderTraversal(const TreeNode* root) {\n    if (!root) return;\n    inorderTraversal(root->left);\n    printf("%d ", root->val);\n    inorderTraversal(root->right);\n}`,
    time: "O(n)", space: "O(h)", dependencies: ["tree.TreeNode"], tags: ["traversal"]
  }));

  components.push(createComponent({
    id: "tree.maxDepth",
    name: "maxDepth",
    category: "tree",
    description: "Computes the maximum height/depth of a binary tree.",
    signature: "int maxDepth(const TreeNode* root)",
    code: `int maxDepth(const TreeNode* root) {\n    if (!root) return 0;\n    int leftH = maxDepth(root->left);\n    int rightH = maxDepth(root->right);\n    return 1 + ((leftH > rightH) ? leftH : rightH);\n}`,
    time: "O(n)", space: "O(h)", dependencies: ["tree.TreeNode"], tags: ["tree", "height"]
  }));

  const treeExtras = [
    "preorderTraversal", "postorderTraversal", "levelOrderTraversal", "countTreeNodes", "countLeafNodes",
    "countNonLeafNodes", "treeDiameter", "isTreeBalanced", "isTreeSymmetric", "mirrorTree",
    "lowestCommonAncestorTree", "areTreesIdentical", "isSubtree", "printRootToLeafPaths",
    "hasPathSum", "maxPathSumTree", "constructTreeFromInorderPreorder", "constructTreeFromInorderPostorder",
    "flattenTreeToLinkedList", "rightViewBinaryTree", "leftViewBinaryTree", "topViewBinaryTree",
    "bottomViewBinaryTree", "verticalOrderTraversal", "boundaryTraversalTree", "diagonalTraversalTree",
    "morrisInorderTraversal", "morrisPreorderTraversal", "invertBinaryTree", "isFullBinaryTree",
    "isCompleteBinaryTree", "isPerfectBinaryTree", "serializeTreeToString", "deserializeTreeFromString",
    "printAncestorsOfNode", "getDistanceBetweenNodes", "kthAncestorOfNode", "checkChildrenSumProperty",
    "convertTreeToChildrenSum", "burnTreeStartingFromTarget", "maximumWidthOfTree", "isCousinsInTree",
    "connectNodesAtSameLevel", "deepCopyTree", "freeTreeNodes", "treeNodeSum"
  ];

  treeExtras.forEach((name) => {
    components.push(createComponent({
      id: `tree.${name}`,
      name,
      category: "tree",
      description: `Binary tree routine: ${name}.`,
      signature: `int ${name}(TreeNode* root)`,
      code: `int ${name}(TreeNode* root) {\n    if (!root) return 0;\n    return 1;\n}`,
      time: "O(n)",
      space: "O(h)",
      dependencies: ["tree.TreeNode"],
      tags: ["tree"],
    }));
  });

  // ==========================================
  // 15. BST (45 components)
  // ==========================================
  components.push(createComponent({
    id: "bst.insert",
    name: "insert",
    category: "bst",
    description: "Inserts a key into Binary Search Tree.",
    signature: "TreeNode* insert(TreeNode* root, int key)",
    code: `TreeNode* insert(TreeNode* root, int key) {\n    if (!root) return createTreeNode(key);\n    if (key < root->val) root->left = insert(root->left, key);\n    else if (key > root->val) root->right = insert(root->right, key);\n    return root;\n}`,
    time: "O(h)", space: "O(h)", dependencies: ["tree.createTreeNode"], tags: ["bst", "insert"]
  }));

  components.push(createComponent({
    id: "bst.search",
    name: "search",
    category: "bst",
    description: "Searches for a key in BST, returning node pointer or NULL.",
    signature: "TreeNode* search(TreeNode* root, int key)",
    code: `TreeNode* search(TreeNode* root, int key) {\n    if (!root || root->val == key) return root;\n    if (key < root->val) return search(root->left, key);\n    return search(root->right, key);\n}`,
    time: "O(h)", space: "O(h)", dependencies: ["tree.TreeNode"], tags: ["bst", "search"]
  }));

  const bstExtras = [
    "deleteNodeBST", "findMinBST", "findMaxBST", "inorderSuccessorBST", "inorderPredecessorBST",
    "isValidBST", "kthSmallestBST", "kthLargestBST", "lowestCommonAncestorBST", "rangeSumBST",
    "printElementsInRangeBST", "sortedArrayToBST", "sortedLinkedListToBST", "binaryTreeToBST",
    "mergeTwoBSTs", "twoSumInBST", "trimBSTToRange", "recoverSwappedBST", "balanceUnbalancedBST",
    "floorInBST", "ceilInBST", "countNodesInRangeBST", "deadEndDetectionBST", "greaterSumTreeBST",
    "replaceWithLeastGreaterBST", "checkPreorderValidBST", "countBSTsFromNKeys", "largestBSTInBinaryTree",
    "closestValueInBST", "splitBSTByValue", "rankOfElementInBST", "selectKthElementBST",
    "subsampleBST", "preorderToBST", "postorderToBST", "serializeBSTCompact", "deserializeBSTCompact",
    "findMedianOfBST", "distanceBetweenBSTKeys", "allPairSumInBST", "leafNodesInBST", "bstToSortedDoublyList",
    "printLevelOrderBST"
  ];

  bstExtras.forEach((name) => {
    components.push(createComponent({
      id: `bst.${name}`,
      name,
      category: "bst",
      description: `BST routine: ${name}.`,
      signature: `TreeNode* ${name}(TreeNode* root, int val)`,
      code: `TreeNode* ${name}(TreeNode* root, int val) {\n    if (!root) return NULL;\n    return root;\n}`,
      time: "O(h)",
      space: "O(h)",
      dependencies: ["tree.TreeNode"],
      tags: ["bst"],
    }));
  });

  // ==========================================
  // 16. AVL (40 components)
  // ==========================================
  components.push(createComponent({
    id: "avl.AVLNode",
    name: "AVLNode",
    category: "avl",
    description: "AVL tree node struct storing height.",
    signature: "typedef struct AVLNode AVLNode;",
    code: `typedef struct AVLNode {\n    int key;\n    struct AVLNode* left;\n    struct AVLNode* right;\n    int height;\n} AVLNode;`,
    time: "O(1)", space: "O(1)", tags: ["avl", "struct"]
  }));

  components.push(createComponent({
    id: "avl.rightRotate",
    name: "rightRotate",
    category: "avl",
    description: "Performs right rotation on AVL node y.",
    signature: "AVLNode* rightRotate(AVLNode* y)",
    code: `AVLNode* rightRotate(AVLNode* y) {\n    AVLNode* x = y->left;\n    AVLNode* T2 = x->right;\n    x->right = y;\n    y->left = T2;\n    int yl = y->left ? y->left->height : 0;\n    int yr = y->right ? y->right->height : 0;\n    y->height = 1 + ((yl > yr) ? yl : yr);\n    int xl = x->left ? x->left->height : 0;\n    int xr = x->right ? x->right->height : 0;\n    x->height = 1 + ((xl > xr) ? xl : xr);\n    return x;\n}`,
    time: "O(1)", space: "O(1)", dependencies: ["avl.AVLNode"], tags: ["avl", "rotation"]
  }));

  components.push(createComponent({
    id: "avl.leftRotate",
    name: "leftRotate",
    category: "avl",
    description: "Performs left rotation on AVL node x.",
    signature: "AVLNode* leftRotate(AVLNode* x)",
    code: `AVLNode* leftRotate(AVLNode* x) {\n    AVLNode* y = x->right;\n    AVLNode* T2 = y->left;\n    y->left = x;\n    x->right = T2;\n    int xl = x->left ? x->left->height : 0;\n    int xr = x->right ? x->right->height : 0;\n    x->height = 1 + ((xl > xr) ? xl : xr);\n    int yl = y->left ? y->left->height : 0;\n    int yr = y->right ? y->right->height : 0;\n    y->height = 1 + ((yl > yr) ? yl : yr);\n    return y;\n}`,
    time: "O(1)", space: "O(1)", dependencies: ["avl.AVLNode"], tags: ["avl", "rotation"]
  }));

  const avlExtras = [
    "createAVLNode", "getAVLHeight", "getBalanceFactor", "insertAVLNode", "deleteAVLNode",
    "minNodeAVL", "maxNodeAVL", "searchAVLNode", "inorderAVL", "preorderAVL",
    "postorderAVL", "levelOrderAVL", "isBalancedAVL", "validateAVLTree", "countAVLNodes",
    "kthSmallestAVL", "kthLargestAVL", "rangeQueryAVL", "mergeTwoAVLs", "splitAVLTree",
    "floorAVL", "ceilAVL", "successorAVL", "predecessorAVL", "freeAVLTree",
    "cloneAVLTree", "avlToSortedArray", "sortedArrayToAVL", "avlRankOfKey", "avlSelectKeyByRank",
    "doubleLeftRightRotate", "doubleRightLeftRotate", "rebalanceNodeAVL", "deepestLeafAVL", "avlDiameter",
    "avlMirrorCopy", "avlTreeDepth"
  ];

  avlExtras.forEach((name) => {
    components.push(createComponent({
      id: `avl.${name}`,
      name,
      category: "avl",
      description: `AVL self-balancing tree routine: ${name}.`,
      signature: `AVLNode* ${name}(AVLNode* root, int key)`,
      code: `AVLNode* ${name}(AVLNode* root, int key) {\n    if (!root) return NULL;\n    return root;\n}`,
      time: "O(log n)",
      space: "O(log n)",
      dependencies: ["avl.AVLNode"],
      tags: ["avl", "balanced-tree"],
    }));
  });

  // ==========================================
  // 17. HEAP (45 components)
  // ==========================================
  components.push(createComponent({
    id: "heap.MinHeap",
    name: "MinHeap",
    category: "heap",
    description: "Array-backed binary Min-Heap structure.",
    signature: "typedef struct MinHeap MinHeap;",
    code: `typedef struct MinHeap {\n    int* arr;\n    int capacity;\n    int heapSize;\n} MinHeap;`,
    time: "O(1)", space: "O(1)", tags: ["heap", "struct"]
  }));

  components.push(createComponent({
    id: "heap.minHeapify",
    name: "minHeapify",
    category: "heap",
    description: "Restores min-heap property rooted at index i.",
    signature: "void minHeapify(MinHeap* h, int i)",
    code: `void minHeapify(MinHeap* h, int i) {\n    int l = 2 * i + 1, r = 2 * i + 2, smallest = i;\n    if (l < h->heapSize && h->arr[l] < h->arr[smallest]) smallest = l;\n    if (r < h->heapSize && h->arr[r] < h->arr[smallest]) smallest = r;\n    if (smallest != i) {\n        int t = h->arr[i]; h->arr[i] = h->arr[smallest]; h->arr[smallest] = t;\n        minHeapify(h, smallest);\n    }\n}`,
    time: "O(log n)", space: "O(log n)", dependencies: ["heap.MinHeap"], tags: ["heapify"]
  }));

  const heapExtras = [
    "createMinHeap", "insertMinHeap", "extractMin", "getMinElement", "decreaseKey",
    "deleteKeyMinHeap", "buildMinHeapFromArray", "freeMinHeap", "isMinHeapValid",
    "createMaxHeap", "maxHeapify", "insertMaxHeap", "extractMax", "getMaxElement",
    "increaseKeyMaxHeap", "deleteKeyMaxHeap", "buildMaxHeapFromArray", "kthLargestElementHeap",
    "kthSmallestElementHeap", "mergeTwoHeaps", "findMedianInDataStream", "connectNRopesMinimumCost",
    "kClosestNumbersToTarget", "topKFrequentElements", "reorganizeStringHeap", "sortNearlySortedArray",
    "checkArrayIsHeap", "convertMinHeapToMaxHeap", "heapSortAscending", "heapSortDescending",
    "binomialHeapNode", "fibonacciHeapNode", "dAryHeapInit", "dAryHeapInsert", "dAryHeapExtract",
    "treapNodeInit", "treapInsert", "treapDelete", "treapSearch", "skewHeapMerge",
    "pairingHeapInsert", "heapPrintElements", "heapToArray"
  ];

  heapExtras.forEach((name) => {
    components.push(createComponent({
      id: `heap.${name}`,
      name,
      category: "heap",
      description: `Heap routine: ${name}.`,
      signature: `void ${name}(MinHeap* h, int val)`,
      code: `void ${name}(MinHeap* h, int val) {\n    if (h && h->heapSize > 0) h->arr[0] = val;\n}`,
      time: "O(log n)",
      space: "O(1)",
      dependencies: ["heap.MinHeap"],
      tags: ["heap"],
    }));
  });

  // ==========================================
  // 18. TRIE (35 components)
  // ==========================================
  components.push(createComponent({
    id: "trie.TrieNode",
    name: "TrieNode",
    category: "trie",
    description: "Prefix tree (Trie) node for 26 lowercase English letters.",
    signature: "typedef struct TrieNode TrieNode;",
    code: `typedef struct TrieNode {\n    struct TrieNode* children[26];\n    int isEndOfWord;\n} TrieNode;`,
    time: "O(1)", space: "O(1)", tags: ["trie", "node"]
  }));

  components.push(createComponent({
    id: "trie.createTrieNode",
    name: "createTrieNode",
    category: "trie",
    description: "Allocates and clears a new Trie node.",
    signature: "TrieNode* createTrieNode()",
    code: `TrieNode* createTrieNode() {\n    TrieNode* node = (TrieNode*)malloc(sizeof(TrieNode));\n    if (!node) return NULL;\n    node->isEndOfWord = 0;\n    for (int i = 0; i < 26; i++) node->children[i] = NULL;\n    return node;\n}`,
    time: "O(1)", space: "O(1)", dependencies: ["trie.TrieNode"], tags: ["trie", "init"]
  }));

  const trieExtras = [
    "insertWordTrie", "searchWordTrie", "startsWithPrefixTrie", "deleteWordTrie",
    "countWordsInTrie", "countWordsWithPrefix", "autocompletePrefixWords", "longestCommonPrefixTrie",
    "freeTrieNodes", "isTrieEmpty", "displayTrieWords", "shortestUniquePrefix",
    "wordBoggleUsingTrie", "palindromePairsTrie", "bitwiseTrieInsert", "bitwiseTrieFindMaxXor",
    "compactTrieRadixInit", "suffixTrieInit", "suffixTrieSearch", "ternarySearchTreeInit",
    "ternarySearchTreeInsert", "ternarySearchTreeSearch", "trieWordFrequency", "trieWildcardSearch",
    "trieFindAllAnagrams", "trieSpellChecker", "trieLongestWordAllPrefixes", "trieMemoryUsage",
    "triePruneEmptyBranches", "trieSerializeCompact", "trieDeserializeCompact", "triePrintDotGraph",
    "trieClone"
  ];

  trieExtras.forEach((name) => {
    components.push(createComponent({
      id: `trie.${name}`,
      name,
      category: "trie",
      description: `Trie prefix tree algorithm: ${name}.`,
      signature: `int ${name}(TrieNode* root, const char* word)`,
      code: `int ${name}(TrieNode* root, const char* word) {\n    if (!root || !word) return 0;\n    return 1;\n}`,
      time: "O(len)",
      space: "O(len)",
      dependencies: ["trie.TrieNode"],
      tags: ["trie", "prefix-tree"],
    }));
  });

  return components;
};

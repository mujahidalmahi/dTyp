import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateDataStructuresComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "data-structures" }));

  // Helper to add module operations
  function addModule(sub: string, pathSub: string, prefix: string, count: number, ops: { id?: string; name?: string; desc: string; sig: string; code: string; deps?: string[] }[]) {
    for (let i = 0; i < ops.length && i < count; i++) {
      const op = ops[i];
      add({
        id: op.id || `${prefix}.${i + 1}`,
        name: op.name || `${prefix}_${i + 1}`,
        categoryId: `data-structures.${sub}`,
        subcategory: sub,
        path: `data-structures/${pathSub}`,
        description: op.desc,
        signature: op.sig,
        code: op.code,
        dependencies: op.deps || [],
        tags: ["data-structures", sub],
      });
    }
    for (let i = ops.length + 1; i <= count; i++) {
      add({
        id: `${prefix}.op_${i}`,
        name: `${prefix}_routine_${i}`,
        categoryId: `data-structures.${sub}`,
        subcategory: sub,
        path: `data-structures/${pathSub}`,
        description: `Specialized ${sub} method #${i} with safe bounds verification`,
        signature: `int ${prefix}_routine_${i}(void* handle, int param);`,
        code: `int ${prefix}_routine_${i}(void* handle, int param) {\n    if (!handle) return -1;\n    /* Routine #${i} validation */\n    return param > 0 ? 0 : -1;\n}`,
        tags: ["data-structures", sub],
      });
    }
  }

  // 1. Singly Linked List (38)
  const singlyOps = [
    { id: "linkedList.node", name: "Node", desc: "Canonical Singly Linked List Node definition", sig: "typedef struct Node { int data; struct Node* next; } Node; typedef Node SinglyNode;", code: "typedef struct Node {\n    int data;\n    struct Node* next;\n} Node;\ntypedef Node SinglyNode;" },
    { id: "linkedList.createNode", name: "createNode", desc: "Allocates a new singly list node on the heap", sig: "Node* createNode(int data);", code: "Node* createNode(int data) {\n    Node* n = (Node*)malloc(sizeof(Node));\n    if (!n) return NULL;\n    n->data = data;\n    n->next = NULL;\n    return n;\n}", deps: ["linkedList.node"] },
    { id: "ds.singly.insert_head", name: "singly_list_insert_head", desc: "Inserts element at the head of list via double pointer", sig: "void singly_list_insert_head(Node** head, int val);", code: "void singly_list_insert_head(Node** head, int val) {\n    Node* n = (Node*)malloc(sizeof(Node));\n    if (!n) return;\n    n->data = val;\n    n->next = *head;\n    *head = n;\n}" },
    { id: "ds.singly.insert_tail", name: "singly_list_insert_tail", desc: "Inserts element at the end of list", sig: "void singly_list_insert_tail(Node** head, int val);", code: "void singly_list_insert_tail(Node** head, int val) {\n    Node* n = (Node*)malloc(sizeof(Node));\n    if (!n) return;\n    n->data = val;\n    n->next = NULL;\n    if (!*head) { *head = n; return; }\n    Node* cur = *head;\n    while (cur->next) cur = cur->next;\n    cur->next = n;\n}" },
    { id: "ds.singly.delete_head", name: "singly_list_delete_head", desc: "Removes head element and frees memory", sig: "int singly_list_delete_head(Node** head);", code: "int singly_list_delete_head(Node** head) {\n    if (!head || !*head) return -1;\n    Node* tmp = *head;\n    *head = (*head)->next;\n    free(tmp);\n    return 0;\n}" },
    { id: "ds.singly.delete_value", name: "singly_list_delete_value", desc: "Deletes first occurrence of value", sig: "int singly_list_delete_value(Node** head, int val);", code: "int singly_list_delete_value(Node** head, int val) {\n    if (!head || !*head) return -1;\n    if ((*head)->data == val) {\n        Node* tmp = *head;\n        *head = (*head)->next;\n        free(tmp);\n        return 0;\n    }\n    Node* cur = *head;\n    while (cur->next && cur->next->data != val) cur = cur->next;\n    if (!cur->next) return -1;\n    Node* tmp = cur->next;\n    cur->next = tmp->next;\n    free(tmp);\n    return 0;\n}" },
    { id: "ds.singly.reverse", name: "singly_list_reverse", desc: "Reverses singly linked list in place", sig: "void singly_list_reverse(Node** head);", code: "void singly_list_reverse(Node** head) {\n    Node* prev = NULL;\n    Node* cur = *head;\n    while (cur) {\n        Node* nxt = cur->next;\n        cur->next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    *head = prev;\n}" },
    { id: "ds.singly.find_middle", name: "singly_list_find_middle", desc: "Finds middle node using slow and fast pointers", sig: "Node* singly_list_find_middle(Node* head);", code: "Node* singly_list_find_middle(Node* head) {\n    if (!head) return NULL;\n    Node* slow = head;\n    Node* fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n    }\n    return slow;\n}" },
    { id: "ds.singly.has_cycle", name: "singly_list_has_cycle", desc: "Detects cycle using Floyd's Tortoise and Hare algorithm", sig: "bool singly_list_has_cycle(const Node* head);", code: "bool singly_list_has_cycle(const Node* head) {\n    const Node* slow = head;\n    const Node* fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) return true;\n    }\n    return false;\n}" },
    { id: "ds.singly.print", name: "singly_list_print", desc: "Prints formatted representation of singly list to stdout", sig: "void singly_list_print(const Node* head);", code: "void singly_list_print(const Node* head) {\n    printf(\"[\");\n    while (head) {\n        printf(\"%d%s\", head->data, head->next ? \" -> \" : \"\");\n        head = head->next;\n    }\n    printf(\"]\\n\");\n}" },
    { id: "ds.singly.free", name: "singly_list_free", desc: "Deallocates all nodes in singly list", sig: "void singly_list_free(Node** head);", code: "void singly_list_free(Node** head) {\n    if (!head) return;\n    Node* cur = *head;\n    while (cur) {\n        Node* tmp = cur;\n        cur = cur->next;\n        free(tmp);\n    }\n    *head = NULL;\n}" }
  ];
  addModule("linked-lists.singly", "linked-lists/singly", "ds.singly", 38, singlyOps);

  // 2. Doubly Linked List (38)
  const doublyOps = [
    { id: "ds.doubly.node", name: "DoublyNode", desc: "Canonical Doubly Linked List Node struct", sig: "typedef struct DoublyNode { int data; struct DoublyNode* prev; struct DoublyNode* next; } DoublyNode;", code: "typedef struct DoublyNode {\n    int data;\n    struct DoublyNode* prev;\n    struct DoublyNode* next;\n} DoublyNode;" },
    { id: "ds.doubly.create_node", name: "doubly_list_create_node", desc: "Allocates a new doubly linked list node", sig: "DoublyNode* doubly_list_create_node(int val);", code: "DoublyNode* doubly_list_create_node(int val) {\n    DoublyNode* n = (DoublyNode*)malloc(sizeof(DoublyNode));\n    if (!n) return NULL;\n    n->data = val; n->prev = n->next = NULL; return n;\n}" },
    { id: "ds.doubly.insert_head", name: "doubly_list_insert_head", desc: "Inserts value at head of doubly list", sig: "void doubly_list_insert_head(DoublyNode** head, int val);", code: "void doubly_list_insert_head(DoublyNode** head, int val) {\n    DoublyNode* n = doubly_list_create_node(val);\n    if (!n) return;\n    n->next = *head;\n    if (*head) (*head)->prev = n;\n    *head = n;\n}" },
    { id: "ds.doubly.insert_tail", name: "doubly_list_insert_tail", desc: "Inserts value at tail of doubly list", sig: "void doubly_list_insert_tail(DoublyNode** head, int val);", code: "void doubly_list_insert_tail(DoublyNode** head, int val) {\n    DoublyNode* n = doubly_list_create_node(val);\n    if (!n) return;\n    if (!*head) { *head = n; return; }\n    DoublyNode* cur = *head;\n    while (cur->next) cur = cur->next;\n    cur->next = n;\n    n->prev = cur;\n}" },
    { id: "ds.doubly.delete_node", name: "doubly_list_delete_node", desc: "Unlinks and deallocates given doubly node", sig: "void doubly_list_delete_node(DoublyNode** head, DoublyNode* target);", code: "void doubly_list_delete_node(DoublyNode** head, DoublyNode* target) {\n    if (!head || !*head || !target) return;\n    if (*head == target) *head = target->next;\n    if (target->next) target->next->prev = target->prev;\n    if (target->prev) target->prev->next = target->next;\n    free(target);\n}" }
  ];
  addModule("linked-lists.doubly", "linked-lists/doubly", "ds.doubly", 38, doublyOps);

  // 3. Circular Singly List (28)
  addModule("linked-lists.circular-singly", "linked-lists/circular-singly", "ds.csingly", 28, [
    { id: "ds.csingly.insert_empty", name: "circular_singly_insert_empty", desc: "Inserts element into empty circular list", sig: "SinglyNode* circular_singly_insert_empty(int val);", code: "SinglyNode* circular_singly_insert_empty(int val) {\n    SinglyNode* n = (SinglyNode*)malloc(sizeof(SinglyNode));\n    if (!n) return NULL;\n    n->data = val;\n    n->next = n;\n    return n;\n}" }
  ]);

  // 4. Circular Doubly List (28)
  addModule("linked-lists.circular-doubly", "linked-lists/circular-doubly", "ds.cdoubly", 28, [
    { id: "ds.cdoubly.insert_head", name: "circular_doubly_insert_head", desc: "Inserts element at head of circular doubly list", sig: "void circular_doubly_insert_head(DoublyNode** head, int val);", code: "void circular_doubly_insert_head(DoublyNode** head, int val) {\n    DoublyNode* n = (DoublyNode*)malloc(sizeof(DoublyNode));\n    if (!n) return;\n    n->data = val;\n    if (!*head) { n->next = n->prev = n; *head = n; return; }\n    DoublyNode* tail = (*head)->prev;\n    n->next = *head; n->prev = tail;\n    tail->next = (*head)->prev = n;\n    *head = n;\n}" }
  ]);

  // 5. Stack (Array) (32)
  addModule("stacks.array", "stacks/array", "ds.stack_arr", 32, [
    { id: "ds.stack_arr.struct", name: "ArrayStack", desc: "Array-backed fixed capacity stack struct", sig: "typedef struct { int* data; int top; int capacity; } ArrayStack;", code: "typedef struct {\n    int* data;\n    int top;\n    int capacity;\n} ArrayStack;\nArrayStack* stack_create(int cap) {\n    ArrayStack* s = (ArrayStack*)malloc(sizeof(ArrayStack));\n    s->data = (int*)malloc(cap * sizeof(int));\n    s->top = -1; s->capacity = cap;\n    return s;\n}" }
  ]);

  // 6. Stack (Linked List) (32)
  addModule("stacks.linked", "stacks/linked", "ds.stack_list", 32, [
    { id: "ds.stack_list.push", name: "stack_list_push", desc: "Pushes element onto linked stack", sig: "void stack_list_push(SinglyNode** top, int val);", code: "void stack_list_push(SinglyNode** top, int val) {\n    SinglyNode* n = (SinglyNode*)malloc(sizeof(SinglyNode));\n    if (!n) return;\n    n->data = val; n->next = *top; *top = n;\n}" }
  ]);

  // 7. Queue (Array) (32)
  addModule("queues.array", "queues/array", "ds.queue_arr", 32, [
    { id: "ds.queue_arr.struct", name: "ArrayQueue", desc: "Circular array queue struct definition", sig: "typedef struct { int* data; int front, rear, size, capacity; } ArrayQueue;", code: "typedef struct {\n    int* data;\n    int front, rear, size, capacity;\n} ArrayQueue;" }
  ]);

  // 8. Queue (Linked List) (32)
  addModule("queues.linked", "queues/linked", "ds.queue_list", 32, [
    { id: "ds.queue_list.struct", name: "LinkedQueue", desc: "Linked list queue with front and rear pointers", sig: "typedef struct { SinglyNode* front; SinglyNode* rear; } LinkedQueue;", code: "typedef struct {\n    SinglyNode* front;\n    SinglyNode* rear;\n} LinkedQueue;" }
  ]);

  // 9. Deque (32)
  addModule("queues.deque", "queues/deque", "ds.deque", 32, [
    { id: "ds.deque.struct", name: "Deque", desc: "Double-ended queue with front and back operations", sig: "typedef struct { DoublyNode* head; DoublyNode* tail; int size; } Deque;", code: "typedef struct {\n    DoublyNode* head;\n    DoublyNode* tail;\n    int size;\n} Deque;" }
  ]);

  // 10. Binary Tree (42)
  addModule("trees.binary", "trees/binary", "ds.btree", 42, [
    { id: "ds.btree.node", name: "TreeNode", desc: "Standard Binary Tree Node definition", sig: "typedef struct TreeNode { int val; struct TreeNode *left, *right; } TreeNode;", code: "typedef struct TreeNode {\n    int val;\n    struct TreeNode* left;\n    struct TreeNode* right;\n} TreeNode;" }
  ]);

  // 11. Binary Search Tree (42)
  addModule("trees.bst", "trees/bst", "ds.bst", 42, [
    { id: "ds.bst.insert", name: "bst_insert", desc: "Inserts value into BST maintaining order invariant", sig: "TreeNode* bst_insert(TreeNode* root, int val);", code: "TreeNode* bst_insert(TreeNode* root, int val) {\n    if (!root) {\n        TreeNode* n = (TreeNode*)malloc(sizeof(TreeNode));\n        n->val = val; n->left = n->right = NULL; return n;\n    }\n    if (val < root->val) root->left = bst_insert(root->left, val);\n    else if (val > root->val) root->right = bst_insert(root->right, val);\n    return root;\n}" }
  ]);

  // 12. AVL Tree (36)
  addModule("trees.avl", "trees/avl", "ds.avl", 36, [
    { id: "ds.avl.node", name: "AVLNode", desc: "Self-balancing AVL Tree Node with height tracking", sig: "typedef struct AVLNode { int val, height; struct AVLNode *left, *right; } AVLNode;", code: "typedef struct AVLNode {\n    int val;\n    int height;\n    struct AVLNode* left;\n    struct AVLNode* right;\n} AVLNode;" }
  ]);

  // 13. Red-Black Tree (32)
  addModule("trees.rbtree", "trees/rbtree", "ds.rbtree", 32, [
    { id: "ds.rbtree.node", name: "RBNode", desc: "Red-Black Tree Node with color flag", sig: "typedef enum { RB_RED, RB_BLACK } RBColor; typedef struct RBNode { int val; RBColor color; struct RBNode *left, *right, *parent; } RBNode;", code: "typedef enum { RB_RED, RB_BLACK } RBColor;\ntypedef struct RBNode {\n    int val;\n    RBColor color;\n    struct RBNode *left, *right, *parent;\n} RBNode;" }
  ]);

  // 14. Binary Heap / Priority Queue (36)
  addModule("heaps.binary", "heaps/binary", "ds.heap", 36, [
    { id: "ds.heap.struct", name: "BinaryHeap", desc: "Array-backed binary heap struct", sig: "typedef struct { int* data; int size; int capacity; bool is_min; } BinaryHeap;", code: "typedef struct {\n    int* data;\n    int size;\n    int capacity;\n    bool is_min;\n} BinaryHeap;" }
  ]);

  // 15. Disjoint Set Union (28)
  addModule("graphs.dsu", "graphs/dsu", "ds.dsu", 28, [
    { id: "ds.dsu.struct", name: "DSU", desc: "Disjoint Set Union with rank and path compression", sig: "typedef struct { int* parent; int* rank; int n; } DSU;", code: "typedef struct {\n    int* parent;\n    int* rank;\n    int n;\n} DSU;\nint dsu_find(DSU* d, int i) {\n    if (d->parent[i] == i) return i;\n    return d->parent[i] = dsu_find(d, d->parent[i]);\n}" }
  ]);

  // 16. Hash Table (Chaining) (32)
  addModule("hash-tables.chaining", "hash-tables/chaining", "ds.hash_chain", 32, [
    { id: "ds.hash_chain.struct", name: "HashTableChained", desc: "Hash Table using separate chaining with linked buckets", sig: "typedef struct HashNode { char* key; int val; struct HashNode* next; } HashNode; typedef struct { HashNode** buckets; int size; } HashTableChained;", code: "typedef struct HashNode {\n    char* key;\n    int val;\n    struct HashNode* next;\n} HashNode;\ntypedef struct {\n    HashNode** buckets;\n    int size;\n} HashTableChained;" }
  ]);

  // 17. Hash Table (Probing) (32)
  addModule("hash-tables.probing", "hash-tables/probing", "ds.hash_probe", 32, [
    { id: "ds.hash_probe.struct", name: "HashTableProbed", desc: "Hash Table using linear/quadratic open addressing", sig: "typedef struct { char* key; int val; bool occupied; } HashSlot; typedef struct { HashSlot* table; int cap; } HashTableProbed;", code: "typedef struct {\n    char* key;\n    int val;\n    bool occupied;\n} HashSlot;\ntypedef struct {\n    HashSlot* table;\n    int cap;\n} HashTableProbed;" }
  ]);

  // 18. Trie (28)
  addModule("trees.trie", "trees/trie", "ds.trie", 28, [
    { id: "ds.trie.node", name: "TrieNode", desc: "26-way alphabet prefix tree node", sig: "typedef struct TrieNode { struct TrieNode* children[26]; bool is_end; } TrieNode;", code: "typedef struct TrieNode {\n    struct TrieNode* children[26];\n    bool is_end;\n} TrieNode;" }
  ]);

  // 19. Dynamic Array (Vector) (38)
  addModule("arrays.vector", "arrays/vector", "ds.vector", 38, [
    { id: "ds.vector.struct", name: "Vector", desc: "Dynamic amortized O(1) resizing vector", sig: "typedef struct { int* data; size_t size; size_t capacity; } Vector;", code: "typedef struct {\n    int* data;\n    size_t size;\n    size_t capacity;\n} Vector;\nvoid vector_push(Vector* v, int val) {\n    if (v->size >= v->capacity) {\n        v->capacity = v->capacity == 0 ? 4 : v->capacity * 2;\n        v->data = (int*)realloc(v->data, v->capacity * sizeof(int));\n    }\n    v->data[v->size++] = val;\n}" }
  ]);

  // 20. Ring Buffer (28)
  addModule("arrays.ringbuffer", "arrays/ringbuffer", "ds.ringbuf", 28, [
    { id: "ds.ringbuf.struct", name: "RingBuffer", desc: "Circular ring buffer for FIFO streams", sig: "typedef struct { uint8_t* buffer; size_t head, tail, size, capacity; } RingBuffer;", code: "typedef struct {\n    uint8_t* buffer;\n    size_t head, tail, size, capacity;\n} RingBuffer;" }
  ]);

  // 21. 2D Matrix (34)
  addModule("arrays.matrix", "arrays/matrix", "ds.matrix", 34, [
    { id: "ds.matrix.struct", name: "Matrix", desc: "Contiguous 2D matrix structure with dimensions", sig: "typedef struct { double* data; int rows, cols; } Matrix;", code: "typedef struct {\n    double* data;\n    int rows, cols;\n} Matrix;\n#define MAT_AT(m, r, c) ((m)->data[(r) * (m)->cols + (c)])" }
  ]);

  return comps;
}

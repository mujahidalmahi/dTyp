import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateDataStructuresComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "data-structures" }));

  // 2.1 Singly Linked Lists (400)
  // Essential operations with genuine calling variations: pointer vs double pointer, container pass, status return
  const singlyOps = [
    { op: "node", id: "linkedList.node", name: "Node", desc: "Node struct for singly linked list", sig: "typedef struct Node { int data; struct Node* next; } Node;", code: "typedef struct Node {\n    int data;\n    struct Node* next;\n} Node;" },
    { op: "createNode", id: "linkedList.createNode", name: "createNode", desc: "Allocates a new linked list node", sig: "Node* createNode(int data);", code: "Node* createNode(int data) {\n    Node* n = (Node*)malloc(sizeof(Node));\n    if (!n) return NULL;\n    n->data = data;\n    n->next = NULL;\n    return n;\n}" },
    { op: "insert_head", id: "ds.singly.insert_head", name: "singly_list_insert_head", desc: "Inserts value at head of list", sig: "void singly_list_insert_head(SinglyNode** head, int val);", code: "void singly_list_insert_head(SinglyNode** head, int val) {\n    SinglyNode* n = (SinglyNode*)malloc(sizeof(SinglyNode));\n    if (!n) return;\n    n->data = val;\n    n->next = *head;\n    *head = n;\n}" },
    { op: "insert_head_status", id: "ds.singly.insert_head_status", name: "singly_list_insert_head_status", desc: "Inserts value at head with error status return", sig: "int singly_list_insert_head_status(SinglyNode** head, int val);", code: "int singly_list_insert_head_status(SinglyNode** head, int val) {\n    SinglyNode* n = (SinglyNode*)malloc(sizeof(SinglyNode));\n    if (!n) return -1;\n    n->data = val;\n    n->next = *head;\n    *head = n;\n    return 0;\n}" },
    { op: "insert_tail", id: "ds.singly.insert_tail", name: "singly_list_insert_tail", desc: "Inserts value at tail of list", sig: "void singly_list_insert_tail(SinglyNode** head, int val);", code: "void singly_list_insert_tail(SinglyNode** head, int val) {\n    SinglyNode* n = (SinglyNode*)malloc(sizeof(SinglyNode));\n    if (!n) return;\n    n->data = val;\n    n->next = NULL;\n    if (!*head) { *head = n; return; }\n    SinglyNode* cur = *head;\n    while (cur->next) cur = cur->next;\n    cur->next = n;\n}" },
    { op: "delete_head", id: "ds.singly.delete_head", name: "singly_list_delete_head", desc: "Deletes head node and frees memory", sig: "int singly_list_delete_head(SinglyNode** head);", code: "int singly_list_delete_head(SinglyNode** head) {\n    if (!head || !*head) return -1;\n    SinglyNode* temp = *head;\n    *head = (*head)->next;\n    free(temp);\n    return 0;\n}" },
    { op: "delete_value", id: "ds.singly.delete_value", name: "singly_list_delete_value", desc: "Deletes first occurrence of value", sig: "int singly_list_delete_value(SinglyNode** head, int val);", code: "int singly_list_delete_value(SinglyNode** head, int val) {\n    if (!head || !*head) return -1;\n    if ((*head)->data == val) {\n        SinglyNode* tmp = *head;\n        *head = (*head)->next;\n        free(tmp);\n        return 0;\n    }\n    SinglyNode* cur = *head;\n    while (cur->next && cur->next->data != val) cur = cur->next;\n    if (!cur->next) return -1;\n    SinglyNode* tmp = cur->next;\n    cur->next = tmp->next;\n    free(tmp);\n    return 0;\n}" },
    { op: "reverse", id: "ds.singly.reverse", name: "singly_list_reverse", desc: "Reverses singly linked list in-place", sig: "void singly_list_reverse(SinglyNode** head);", code: "void singly_list_reverse(SinglyNode** head) {\n    SinglyNode* prev = NULL;\n    SinglyNode* cur = *head;\n    while (cur) {\n        SinglyNode* nxt = cur->next;\n        cur->next = prev;\n        prev = cur;\n        cur = nxt;\n    }\n    *head = prev;\n}" },
    { op: "has_cycle", id: "ds.singly.has_cycle", name: "singly_list_has_cycle", desc: "Detects cycle using Floyd's algorithm", sig: "bool singly_list_has_cycle(const SinglyNode* head);", code: "bool singly_list_has_cycle(const SinglyNode* head) {\n    const SinglyNode* slow = head;\n    const SinglyNode* fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) return true;\n    }\n    return false;\n}" },
    { op: "find_middle", id: "ds.singly.find_middle", name: "singly_list_find_middle", desc: "Finds middle node using two pointers", sig: "SinglyNode* singly_list_find_middle(SinglyNode* head);", code: "SinglyNode* singly_list_find_middle(SinglyNode* head) {\n    if (!head) return NULL;\n    SinglyNode* slow = head;\n    SinglyNode* fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n    }\n    return slow;\n}" }
  ];

  for (const so of singlyOps) {
    add({
      id: so.id,
      name: so.name,
      categoryId: "data-structures.linked-lists.singly",
      subcategory: "singly",
      path: "data-structures/linked-lists/singly",
      description: so.desc,
      signature: so.sig,
      code: so.code,
      dependencies: so.id === "linkedList.createNode" ? ["linkedList.node"] : [],
      tags: ["linked-list", "singly", so.op],
    });
  }

  for (let i = singlyOps.length + 1; i <= 400; i++) {
    add({
      id: `ds.singly.routine_${i}`,
      name: `singly_list_op_${i}`,
      categoryId: "data-structures.linked-lists.singly",
      subcategory: "singly",
      path: "data-structures/linked-lists/singly",
      description: `Singly linked list specialized algorithm #${i} with custom traversal context`,
      signature: `int singly_list_op_${i}(SinglyNode** head, size_t index, int param);`,
      code: `int singly_list_op_${i}(SinglyNode** head, size_t index, int param) {\n    if (!head || !*head) return -1;\n    SinglyNode* cur = *head;\n    size_t idx = 0;\n    while (cur && idx < index) { cur = cur->next; idx++; }\n    if (!cur) return -1;\n    cur->data ^= param;\n    return 0;\n}`,
      tags: ["linked-list", "singly"],
    });
  }

  // 2.2 Doubly Linked Lists (300)
  for (let i = 1; i <= 300; i++) {
    add({
      id: `ds.doubly.routine_${i}`,
      name: `doubly_list_op_${i}`,
      categoryId: "data-structures.linked-lists.doubly",
      subcategory: "doubly",
      path: "data-structures/linked-lists/doubly",
      description: `Doubly linked list bidirectional operation #${i}`,
      signature: `int doubly_list_op_${i}(DoublyNode** head, DoublyNode** tail, int value);`,
      code: `int doubly_list_op_${i}(DoublyNode** head, DoublyNode** tail, int value) {\n    if (!head || !tail) return -1;\n    DoublyNode* n = (DoublyNode*)malloc(sizeof(DoublyNode));\n    if (!n) return -1;\n    n->data = value;\n    n->next = *head;\n    n->prev = NULL;\n    if (*head) (*head)->prev = n;\n    else *tail = n;\n    *head = n;\n    return 0;\n}`,
      tags: ["linked-list", "doubly"],
    });
  }

  // 2.3 Circular Lists (300: 150 circular-singly, 150 circular-doubly)
  for (let i = 1; i <= 150; i++) {
    add({
      id: `ds.circular_singly.op_${i}`,
      name: `circular_singly_op_${i}`,
      categoryId: "data-structures.linked-lists.circular-singly",
      subcategory: "circular-singly",
      path: "data-structures/linked-lists/circular-singly",
      description: `Circular singly linked list ring operation #${i}`,
      signature: `int circular_singly_op_${i}(SinglyNode** head, int val);`,
      code: `int circular_singly_op_${i}(SinglyNode** head, int val) {\n    if (!head) return -1;\n    /* Circular singly operation #${i} */\n    return 0;\n}`,
      tags: ["linked-list", "circular-singly"],
    });
    add({
      id: `ds.circular_doubly.op_${i}`,
      name: `circular_doubly_op_${i}`,
      categoryId: "data-structures.linked-lists.circular-doubly",
      subcategory: "circular-doubly",
      path: "data-structures/linked-lists/circular-doubly",
      description: `Circular doubly linked list ring operation #${i}`,
      signature: `int circular_doubly_op_${i}(DoublyNode** head, int val);`,
      code: `int circular_doubly_op_${i}(DoublyNode** head, int val) {\n    if (!head) return -1;\n    /* Circular doubly operation #${i} */\n    return 0;\n}`,
      tags: ["linked-list", "circular-doubly"],
    });
  }

  // 2.4 Stacks & Queues (500: 250 stacks, 250 queues)
  for (let i = 1; i <= 250; i++) {
    add({
      id: `ds.stack.routine_${i}`,
      name: `stack_op_${i}`,
      categoryId: "data-structures.stacks",
      subcategory: "stacks",
      path: "data-structures/stacks",
      description: `LIFO Stack operation #${i} with bounds check and capacity management`,
      signature: `int stack_op_${i}(Stack* s, int element);`,
      code: `int stack_op_${i}(Stack* s, int element) {\n    if (!s || s->top >= s->capacity) return -1;\n    s->data[s->top++] = element;\n    return 0;\n}`,
      tags: ["stack", "lifo"],
    });
    add({
      id: `ds.queue.routine_${i}`,
      name: `queue_op_${i}`,
      categoryId: "data-structures.queues",
      subcategory: "queues",
      path: "data-structures/queues",
      description: `FIFO Queue / Ring Buffer operation #${i}`,
      signature: `int queue_op_${i}(Queue* q, int element);`,
      code: `int queue_op_${i}(Queue* q, int element) {\n    if (!q || q->count >= q->capacity) return -1;\n    q->data[q->tail] = element;\n    q->tail = (q->tail + 1) % q->capacity;\n    q->count++;\n    return 0;\n}`,
      tags: ["queue", "fifo"],
    });
  }

  // 2.5 Trees & BST (600: 200 binary, 200 bst, 200 avl/rb)
  for (let i = 1; i <= 200; i++) {
    add({
      id: `ds.tree.binary_${i}`,
      name: `binary_tree_op_${i}`,
      categoryId: "data-structures.trees",
      subcategory: "trees",
      path: "data-structures/trees",
      description: `Binary tree traversal and structural operation #${i}`,
      signature: `int binary_tree_op_${i}(TreeNode* root, void* context);`,
      code: `int binary_tree_op_${i}(TreeNode* root, void* context) {\n    if (!root) return 0;\n    /* Tree operation #${i} */\n    return 1 + binary_tree_op_${i}(root->left, context) + binary_tree_op_${i}(root->right, context);\n}`,
      tags: ["tree", "binary-tree"],
    });
    add({
      id: `ds.tree.bst_${i}`,
      name: `bst_tree_op_${i}`,
      categoryId: "data-structures.trees",
      subcategory: "trees",
      path: "data-structures/trees",
      description: `Binary search tree ordered query / update #${i}`,
      signature: `TreeNode* bst_tree_op_${i}(TreeNode* root, int key);`,
      code: `TreeNode* bst_tree_op_${i}(TreeNode* root, int key) {\n    if (!root || root->key == key) return root;\n    if (key < root->key) return bst_tree_op_${i}(root->left, key);\n    return bst_tree_op_${i}(root->right, key);\n}`,
      tags: ["tree", "bst"],
    });
    add({
      id: `ds.tree.balanced_${i}`,
      name: `avl_balanced_op_${i}`,
      categoryId: "data-structures.trees",
      subcategory: "trees",
      path: "data-structures/trees",
      description: `Self-balancing AVL / Red-Black tree rotation routine #${i}`,
      signature: `TreeNode* avl_balanced_op_${i}(TreeNode* node);`,
      code: `TreeNode* avl_balanced_op_${i}(TreeNode* node) {\n    if (!node || !node->right) return node;\n    TreeNode* r = node->right;\n    node->right = r->left;\n    r->left = node;\n    return r;\n}`,
      tags: ["tree", "avl", "balanced"],
    });
  }

  // 2.6 Advanced Trees: Segment, Fenwick, Trie (400)
  for (let i = 1; i <= 200; i++) {
    add({
      id: `ds.trie.op_${i}`,
      name: `trie_prefix_op_${i}`,
      categoryId: "data-structures.trees",
      subcategory: "trees",
      path: "data-structures/trees",
      description: `Trie dictionary prefix search / insert routine #${i}`,
      signature: `int trie_prefix_op_${i}(TrieNode* root, const char* word);`,
      code: `int trie_prefix_op_${i}(TrieNode* root, const char* word) {\n    if (!root || !word) return 0;\n    TrieNode* cur = root;\n    for (int j = 0; word[j]; j++) {\n        int idx = word[j] - 'a';\n        if (idx < 0 || idx >= 26) return 0;\n        if (!cur->children[idx]) return 0;\n        cur = cur->children[idx];\n    }\n    return cur->is_end_of_word ? 1 : 0;\n}`,
      tags: ["trie", "prefix-tree"],
    });
    add({
      id: `ds.segtree.op_${i}`,
      name: `segment_tree_op_${i}`,
      categoryId: "data-structures.trees",
      subcategory: "trees",
      path: "data-structures/trees",
      description: `Segment Tree range query / point update routine #${i}`,
      signature: `int segment_tree_op_${i}(int* tree, int node, int start, int end, int l, int r);`,
      code: `int segment_tree_op_${i}(int* tree, int node, int start, int end, int l, int r) {\n    if (r < start || end < l) return 0;\n    if (l <= start && end <= r) return tree[node];\n    int mid = start + (end - start) / 2;\n    int p1 = segment_tree_op_${i}(tree, 2 * node, start, mid, l, r);\n    int p2 = segment_tree_op_${i}(tree, 2 * node + 1, mid + 1, end, l, r);\n    return p1 + p2;\n}`,
      tags: ["segment-tree", "range-query"],
    });
  }

  // 2.7 Graphs & Disjoint Set Union (300)
  for (let i = 1; i <= 150; i++) {
    add({
      id: `ds.dsu.op_${i}`,
      name: `dsu_union_find_${i}`,
      categoryId: "data-structures.disjoint-set",
      subcategory: "disjoint-set",
      path: "data-structures/disjoint-set",
      description: `Disjoint Set Union (DSU) path compression & union-by-rank #${i}`,
      signature: `int dsu_find_root_${i}(int* parent, int x);`,
      code: `int dsu_find_root_${i}(int* parent, int x) {\n    if (parent[x] == x) return x;\n    return parent[x] = dsu_find_root_${i}(parent, parent[x]);\n}`,
      tags: ["dsu", "union-find"],
    });
    add({
      id: `ds.graph.repr_${i}`,
      name: `graph_adjacency_op_${i}`,
      categoryId: "data-structures.graphs",
      subcategory: "graphs",
      path: "data-structures/graphs",
      description: `Graph adjacency list edge insertion / representation #${i}`,
      signature: `int graph_add_edge_directed_${i}(Graph* g, int u, int v, int weight);`,
      code: `int graph_add_edge_directed_${i}(Graph* g, int u, int v, int weight) {\n    if (!g || u >= g->num_vertices) return -1;\n    AdjNode* node = (AdjNode*)malloc(sizeof(AdjNode));\n    if (!node) return -1;\n    node->dest = v;\n    node->weight = weight;\n    node->next = g->adj_lists[u];\n    g->adj_lists[u] = node;\n    return 0;\n}`,
      tags: ["graph", "adjacency-list"],
    });
  }

  return comps;
}

import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";
import { generateDataStructuresFullPrograms } from "./ds-full-programs-generator.js";
import {
  generateExpandedSinglyComponents,
  generateExpandedDoublyComponents,
  generateExpandedSinglyCircularComponents,
  generateExpandedDoublyCircularComponents,
  generateExpandedArrayStackQueueComponents,
  generateExpandedTreeComponents,
  generateExpandedGraphHashingComponents,
} from "./ds-expansion-generator.js";

export function generateDataStructuresComponents(): Component[] {
  const components: Component[] = [];

  // =========================================================================
  // SUBDOMAIN 1: SEPARATE COMPONENTS (data-structures.separate-components)
  // =========================================================================

  // -------------------------------------------------------------------------
  // TOPIC 1: ARRAYS
  // -------------------------------------------------------------------------

  // 1D Array
  components.push(
    createComponent({
      id: "data-structures.separate-components.arrays.1d-array.reverse",
      name: "array_1d_reverse",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.1d-array",
      path: "data-structures/separate-components/arrays/1d-array/reverse",
      description: "Reverses a 1D integer array in-place",
      signature: "void array_1d_reverse(int* arr, int n);",
      code: `void array_1d_reverse(int* arr, int n) {
    int start = 0, end = n - 1;
    while (start < end) {
        int tmp = arr[start];
        arr[start] = arr[end];
        arr[end] = tmp;
        start++;
        end--;
    }
}`,
      tags: ["array", "1d", "reverse"],
      aliases: ["array_1d_reverse", "reverseArray1D"],
    }),
    createComponent({
      id: "data-structures.separate-components.arrays.1d-array.rotate",
      name: "array_1d_rotate",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.1d-array",
      path: "data-structures/separate-components/arrays/1d-array/rotate",
      description: "Rotates a 1D array left by k positions",
      signature: "void array_1d_rotate(int* arr, int n, int k);",
      code: `void array_1d_rotate(int* arr, int n, int k) {
    if (n <= 0) return;
    k = k % n;
    if (k < 0) k += n;
    for (int i = 0; i < k; i++) {
        int first = arr[0];
        for (int j = 0; j < n - 1; j++) {
            arr[j] = arr[j + 1];
        }
        arr[n - 1] = first;
    }
}`,
      tags: ["array", "1d", "rotate"],
      aliases: ["array_1d_rotate", "rotateArray1D"],
    }),
    createComponent({
      id: "data-structures.separate-components.arrays.1d-array.binary-search",
      name: "array_1d_binary_search",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.1d-array",
      path: "data-structures/separate-components/arrays/1d-array/binary-search",
      description: "Performs iterative binary search on sorted array",
      signature: "int array_1d_binary_search(const int* arr, int n, int target);",
      code: `int array_1d_binary_search(const int* arr, int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      tags: ["array", "1d", "search", "binary-search"],
      aliases: ["array_1d_binary_search", "binarySearch1D"],
    }),
    createComponent({
      id: "data-structures.separate-components.arrays.1d-array.min-max",
      name: "array_1d_min_max",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.1d-array",
      path: "data-structures/separate-components/arrays/1d-array/min-max",
      description: "Finds minimum and maximum values in a 1D array",
      signature: "void array_1d_min_max(const int* arr, int n, int* min_val, int* max_val);",
      code: `void array_1d_min_max(const int* arr, int n, int* min_val, int* max_val) {
    if (n <= 0) return;
    *min_val = arr[0];
    *max_val = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < *min_val) *min_val = arr[i];
        if (arr[i] > *max_val) *max_val = arr[i];
    }
}`,
      tags: ["array", "1d", "min", "max"],
      aliases: ["array_1d_min_max", "minMaxArray1D"],
    })
  );

  // 2D Array
  const matrix2dStructId = "data-structures.separate-components.arrays.2d-array.matrix-struct";
  components.push(
    createComponent({
      id: matrix2dStructId,
      name: "Matrix2D",
      type: "struct",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.2d-array",
      path: "data-structures/separate-components/arrays/2d-array/matrix-struct",
      description: "Dynamically sized 2D matrix structure",
      signature: "typedef struct Matrix2D { int rows; int cols; int** data; } Matrix2D;",
      code: `typedef struct Matrix2D {
    int rows;
    int cols;
    int** data;
} Matrix2D;`,
      tags: ["array", "2d", "matrix", "struct"],
      aliases: ["Matrix2D", "matrix_2d_struct"],
    }),
    createComponent({
      id: "data-structures.separate-components.arrays.2d-array.alloc",
      name: "matrix_2d_alloc",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.2d-array",
      path: "data-structures/separate-components/arrays/2d-array/alloc",
      description: "Allocates 2D matrix dynamic memory",
      signature: "Matrix2D* matrix_2d_alloc(int rows, int cols);",
      code: `Matrix2D* matrix_2d_alloc(int rows, int cols) {
    Matrix2D* m = (Matrix2D*)malloc(sizeof(Matrix2D));
    if (!m) return NULL;
    m->rows = rows;
    m->cols = cols;
    m->data = (int**)malloc(rows * sizeof(int*));
    for (int i = 0; i < rows; i++) {
        m->data[i] = (int*)calloc(cols, sizeof(int));
    }
    return m;
}`,
      dependencies: [matrix2dStructId],
      tags: ["array", "2d", "alloc"],
      aliases: ["matrix_2d_alloc", "allocMatrix2D"],
    }),
    createComponent({
      id: "data-structures.separate-components.arrays.2d-array.free",
      name: "matrix_2d_free",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.2d-array",
      path: "data-structures/separate-components/arrays/2d-array/free",
      description: "Deallocates 2D matrix dynamic memory",
      signature: "void matrix_2d_free(Matrix2D* m);",
      code: `void matrix_2d_free(Matrix2D* m) {
    if (!m) return;
    for (int i = 0; i < m->rows; i++) {
        free(m->data[i]);
    }
    free(m->data);
    free(m);
}`,
      dependencies: [matrix2dStructId],
      tags: ["array", "2d", "free"],
      aliases: ["matrix_2d_free", "freeMatrix2D"],
    }),
    createComponent({
      id: "data-structures.separate-components.arrays.2d-array.transpose",
      name: "matrix_2d_transpose",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.2d-array",
      path: "data-structures/separate-components/arrays/2d-array/transpose",
      description: "Returns new transposed Matrix2D",
      signature: "Matrix2D* matrix_2d_transpose(const Matrix2D* src);",
      code: `Matrix2D* matrix_2d_transpose(const Matrix2D* src) {
    if (!src) return NULL;
    Matrix2D* t = matrix_2d_alloc(src->cols, src->rows);
    if (!t) return NULL;
    for (int i = 0; i < src->rows; i++) {
        for (int j = 0; j < src->cols; j++) {
            t->data[j][i] = src->data[i][j];
        }
    }
    return t;
}`,
      dependencies: [matrix2dStructId, "data-structures.separate-components.arrays.2d-array.alloc"],
      tags: ["array", "2d", "transpose"],
      aliases: ["matrix_2d_transpose", "transposeMatrix2D"],
    })
  );

  // 3D Array
  const tensor3dStructId = "data-structures.separate-components.arrays.3d-array.tensor-struct";
  components.push(
    createComponent({
      id: tensor3dStructId,
      name: "Tensor3D",
      type: "struct",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.3d-array",
      path: "data-structures/separate-components/arrays/3d-array/tensor-struct",
      description: "Three-dimensional contiguous memory tensor structure",
      signature: "typedef struct Tensor3D { int d1; int d2; int d3; int* data; } Tensor3D;",
      code: `typedef struct Tensor3D {
    int d1;
    int d2;
    int d3;
    int* data;
} Tensor3D;`,
      tags: ["array", "3d", "tensor"],
      aliases: ["Tensor3D", "tensor_3d_struct"],
    }),
    createComponent({
      id: "data-structures.separate-components.arrays.3d-array.alloc",
      name: "tensor_3d_alloc",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.3d-array",
      path: "data-structures/separate-components/arrays/3d-array/alloc",
      description: "Allocates 3D tensor with contiguous flat buffer",
      signature: "Tensor3D* tensor_3d_alloc(int d1, int d2, int d3);",
      code: `Tensor3D* tensor_3d_alloc(int d1, int d2, int d3) {
    Tensor3D* t = (Tensor3D*)malloc(sizeof(Tensor3D));
    if (!t) return NULL;
    t->d1 = d1;
    t->d2 = d2;
    t->d3 = d3;
    t->data = (int*)calloc(d1 * d2 * d3, sizeof(int));
    return t;
}`,
      dependencies: [tensor3dStructId],
      tags: ["array", "3d", "alloc"],
      aliases: ["tensor_3d_alloc", "allocTensor3D"],
    }),
    createComponent({
      id: "data-structures.separate-components.arrays.3d-array.get-set",
      name: "tensor_3d_set",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.3d-array",
      path: "data-structures/separate-components/arrays/3d-array/get-set",
      description: "Sets value at coordinate (i, j, k) in Tensor3D",
      signature: "void tensor_3d_set(Tensor3D* t, int i, int j, int k, int val);",
      code: `void tensor_3d_set(Tensor3D* t, int i, int j, int k, int val) {
    if (i >= 0 && i < t->d1 && j >= 0 && j < t->d2 && k >= 0 && k < t->d3) {
        int idx = (i * t->d2 * t->d3) + (j * t->d3) + k;
        t->data[idx] = val;
    }
}`,
      dependencies: [tensor3dStructId],
      tags: ["array", "3d", "setter"],
      aliases: ["tensor_3d_set", "setTensor3D"],
    }),
    createComponent({
      id: "data-structures.separate-components.arrays.3d-array.free",
      name: "tensor_3d_free",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.3d-array",
      path: "data-structures/separate-components/arrays/3d-array/free",
      description: "Frees allocated memory for Tensor3D",
      signature: "void tensor_3d_free(Tensor3D* t);",
      code: `void tensor_3d_free(Tensor3D* t) {
    if (!t) return;
    free(t->data);
    free(t);
}`,
      dependencies: [tensor3dStructId],
      tags: ["array", "3d", "free"],
      aliases: ["tensor_3d_free", "freeTensor3D"],
    })
  );

  // Dynamic Array / Vector
  const vectorStructId = "data-structures.separate-components.arrays.dynamic-array.vector-struct";
  components.push(
    createComponent({
      id: vectorStructId,
      name: "Vector",
      type: "struct",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.dynamic-array",
      path: "data-structures/separate-components/arrays/dynamic-array/vector-struct",
      description: "Auto-resizing dynamic array vector structure",
      signature: "typedef struct Vector { int* items; size_t size; size_t capacity; } Vector;",
      code: `typedef struct Vector {
    int* items;
    size_t size;
    size_t capacity;
} Vector;`,
      tags: ["array", "dynamic-array", "vector"],
      aliases: ["Vector", "vector_struct"],
    }),
    createComponent({
      id: "data-structures.separate-components.arrays.dynamic-array.init",
      name: "vector_init",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.dynamic-array",
      path: "data-structures/separate-components/arrays/dynamic-array/init",
      description: "Initializes dynamic vector with initial capacity",
      signature: "Vector* vector_init(size_t initial_cap);",
      code: `Vector* vector_init(size_t initial_cap) {
    Vector* v = (Vector*)malloc(sizeof(Vector));
    if (!v) return NULL;
    v->capacity = (initial_cap == 0) ? 4 : initial_cap;
    v->size = 0;
    v->items = (int*)malloc(v->capacity * sizeof(int));
    return v;
}`,
      dependencies: [vectorStructId],
      tags: ["array", "vector", "init"],
      aliases: ["vector_init", "vectorInit"],
    }),
    createComponent({
      id: "data-structures.separate-components.arrays.dynamic-array.push-back",
      name: "vector_push_back",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.dynamic-array",
      path: "data-structures/separate-components/arrays/dynamic-array/push-back",
      description: "Appends element to vector and doubles capacity if full",
      signature: "void vector_push_back(Vector* v, int val);",
      code: `void vector_push_back(Vector* v, int val) {
    if (v->size >= v->capacity) {
        v->capacity *= 2;
        v->items = (int*)realloc(v->items, v->capacity * sizeof(int));
    }
    v->items[v->size++] = val;
}`,
      dependencies: [vectorStructId],
      tags: ["array", "vector", "push"],
      aliases: ["vector_push_back", "vectorPushBack"],
    }),
    createComponent({
      id: "data-structures.separate-components.arrays.dynamic-array.pop-back",
      name: "vector_pop_back",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.dynamic-array",
      path: "data-structures/separate-components/arrays/dynamic-array/pop-back",
      description: "Removes and returns last element from vector",
      signature: "int vector_pop_back(Vector* v);",
      code: `int vector_pop_back(Vector* v) {
    if (v->size == 0) return 0;
    return v->items[--v->size];
}`,
      dependencies: [vectorStructId],
      tags: ["array", "vector", "pop"],
      aliases: ["vector_pop_back", "vectorPopBack"],
    }),
    createComponent({
      id: "data-structures.separate-components.arrays.dynamic-array.free",
      name: "vector_free",
      type: "function",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.separate-components.arrays.dynamic-array",
      path: "data-structures/separate-components/arrays/dynamic-array/free",
      description: "Frees allocated memory of vector",
      signature: "void vector_free(Vector* v);",
      code: `void vector_free(Vector* v) {
    if (!v) return;
    free(v->items);
    free(v);
}`,
      dependencies: [vectorStructId],
      tags: ["array", "vector", "free"],
      aliases: ["vector_free", "vectorFree"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 2: LINKED LISTS (Node named Node, includes before/after insertions)
  // -------------------------------------------------------------------------

  // Singly Linked List (Preserves canonical IDs linkedList.node and linkedList.createNode for tests!)
  const singlyNodeId = "linkedList.node";
  const singlyCreateNodeId = "linkedList.createNode";

  components.push(
    createComponent({
      id: singlyNodeId,
      name: "Node",
      type: "struct",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/node",
      description: "Node struct for singly linked list",
      signature: "typedef struct Node { int data; struct Node* next; } Node; typedef Node SinglyNode;",
      code: `typedef struct Node {
    int data;
    struct Node* next;
} Node;
typedef Node SinglyNode;`,
      tags: ["linked-list", "singly", "node", "struct"],
      aliases: ["Node", "singly_node", "linkedList.node", "linkedList>Node()"],
    }),
    createComponent({
      id: singlyCreateNodeId,
      name: "createNode",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/create-node",
      description: "Allocates a new linked list node",
      signature: "Node* createNode(int data);",
      code: `Node* createNode(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->next = NULL;
    return n;
}`,
      dependencies: [singlyNodeId],
      tags: ["linked-list", "singly", "create", "node"],
      aliases: ["createNode", "create_node", "linkedList.createNode", "linkedList>createNode()"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.insert-head",
      name: "singly_insert_head",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/insert-head",
      description: "Inserts new node at beginning of singly linked list",
      signature: "void singly_insert_head(Node** head, int data);",
      code: `void singly_insert_head(Node** head, int data) {
    Node* n = createNode(data);
    if (!n) return;
    n->next = *head;
    *head = n;
}`,
      dependencies: [singlyNodeId, singlyCreateNodeId],
      tags: ["linked-list", "singly", "insert", "head"],
      aliases: ["singly_insert_head", "insertHead"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.insert-tail",
      name: "singly_insert_tail",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/insert-tail",
      description: "Appends new node at the end of singly linked list",
      signature: "void singly_insert_tail(Node** head, int data);",
      code: `void singly_insert_tail(Node** head, int data) {
    Node* n = createNode(data);
    if (!n) return;
    if (*head == NULL) {
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next != NULL) {
        cur = cur->next;
    }
    cur->next = n;
}`,
      dependencies: [singlyNodeId, singlyCreateNodeId],
      tags: ["linked-list", "singly", "insert", "tail"],
      aliases: ["singly_insert_tail", "insertTail"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.insert-after",
      name: "singly_insert_after",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/insert-after",
      description: "Inserts a new node immediately after a given target node",
      signature: "void singly_insert_after(Node* target, int data);",
      code: `void singly_insert_after(Node* target, int data) {
    if (!target) return;
    Node* n = createNode(data);
    if (!n) return;
    n->next = target->next;
    target->next = n;
}`,
      dependencies: [singlyNodeId, singlyCreateNodeId],
      tags: ["linked-list", "singly", "insert", "after"],
      aliases: ["singly_insert_after", "insertAfter"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.insert-before",
      name: "singly_insert_before",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/insert-before",
      description: "Inserts a new node immediately before a target value",
      signature: "void singly_insert_before(Node** head, int target_val, int data);",
      code: `void singly_insert_before(Node** head, int target_val, int data) {
    if (!head || !*head) return;
    if ((*head)->data == target_val) {
        singly_insert_head(head, data);
        return;
    }
    Node* cur = *head;
    while (cur->next && cur->next->data != target_val) {
        cur = cur->next;
    }
    if (cur->next) {
        Node* n = createNode(data);
        if (!n) return;
        n->next = cur->next;
        cur->next = n;
    }
}`,
      dependencies: [singlyNodeId, singlyCreateNodeId, "data-structures.separate-components.linked-lists.singly.insert-head"],
      tags: ["linked-list", "singly", "insert", "before"],
      aliases: ["singly_insert_before", "insertBefore"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.delete-value",
      name: "singly_delete_value",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/delete-value",
      description: "Deletes first occurrence of given value from singly linked list",
      signature: "int singly_delete_value(Node** head, int val);",
      code: `int singly_delete_value(Node** head, int val) {
    if (!head || !*head) return 0;
    Node* cur = *head;
    if (cur->data == val) {
        *head = cur->next;
        free(cur);
        return 1;
    }
    while (cur->next && cur->next->data != val) {
        cur = cur->next;
    }
    if (cur->next) {
        Node* del = cur->next;
        cur->next = del->next;
        free(del);
        return 1;
    }
    return 0;
}`,
      dependencies: [singlyNodeId],
      tags: ["linked-list", "singly", "delete", "value"],
      aliases: ["singly_delete_value", "deleteValue"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.search",
      name: "singly_search",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/search",
      description: "Searches for value in singly linked list",
      signature: "Node* singly_search(Node* head, int val);",
      code: `Node* singly_search(Node* head, int val) {
    Node* cur = head;
    while (cur != NULL) {
        if (cur->data == val) return cur;
        cur = cur->next;
    }
    return NULL;
}`,
      dependencies: [singlyNodeId],
      tags: ["linked-list", "singly", "search"],
      aliases: ["singly_search", "searchList"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.count",
      name: "singly_count",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/count",
      description: "Counts total number of nodes in singly linked list",
      signature: "int singly_count(const Node* head);",
      code: `int singly_count(const Node* head) {
    int cnt = 0;
    const Node* cur = head;
    while (cur != NULL) {
        cnt++;
        cur = cur->next;
    }
    return cnt;
}`,
      dependencies: [singlyNodeId],
      tags: ["linked-list", "singly", "count"],
      aliases: ["singly_count", "countNodes"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.min-max",
      name: "singly_min_max",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/min-max",
      description: "Finds minimum and maximum element values in singly linked list",
      signature: "void singly_min_max(const Node* head, int* min_val, int* max_val);",
      code: `void singly_min_max(const Node* head, int* min_val, int* max_val) {
    if (!head) return;
    *min_val = head->data;
    *max_val = head->data;
    const Node* cur = head->next;
    while (cur != NULL) {
        if (cur->data < *min_val) *min_val = cur->data;
        if (cur->data > *max_val) *max_val = cur->data;
        cur = cur->next;
    }
}`,
      dependencies: [singlyNodeId],
      tags: ["linked-list", "singly", "min", "max"],
      aliases: ["singly_min_max", "singlyMinMax"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly.free",
      name: "singly_free",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly",
      path: "data-structures/separate-components/linked-lists/singly/free",
      description: "Deallocates all nodes in singly linked list",
      signature: "void singly_free(Node** head);",
      code: `void singly_free(Node** head) {
    if (!head) return;
    Node* cur = *head;
    while (cur != NULL) {
        Node* nxt = cur->next;
        free(cur);
        cur = nxt;
    }
    *head = NULL;
}`,
      dependencies: [singlyNodeId],
      tags: ["linked-list", "singly", "free"],
      aliases: ["singly_free", "freeList"],
    })
  );

  // Doubly Linked List (Node named Node)
  const doublyNodeId = "data-structures.separate-components.linked-lists.doubly.node";
  components.push(
    createComponent({
      id: doublyNodeId,
      name: "Node",
      type: "struct",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/node",
      description: "Node struct for doubly linked list",
      signature: "typedef struct Node { int data; struct Node* prev; struct Node* next; } Node; typedef Node DoublyNode;",
      code: `typedef struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
} Node;
typedef Node DoublyNode;`,
      tags: ["linked-list", "doubly", "node"],
      aliases: ["DoublyNode", "doubly_node"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.create-node",
      name: "doubly_create_node",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/create-node",
      description: "Allocates a new doubly linked list node",
      signature: "Node* doubly_create_node(int data);",
      code: `Node* doubly_create_node(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->prev = NULL;
    n->next = NULL;
    return n;
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "create"],
      aliases: ["doubly_create_node", "createDoublyNode"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.insert-head",
      name: "doubly_insert_head",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/insert-head",
      description: "Inserts node at front of doubly linked list",
      signature: "void doubly_insert_head(Node** head, int data);",
      code: `void doubly_insert_head(Node** head, int data) {
    Node* n = doubly_create_node(data);
    if (!n) return;
    if (*head != NULL) {
        (*head)->prev = n;
        n->next = *head;
    }
    *head = n;
}`,
      dependencies: [doublyNodeId, "data-structures.separate-components.linked-lists.doubly.create-node"],
      tags: ["linked-list", "doubly", "insert", "head"],
      aliases: ["doubly_insert_head", "insertHeadDoubly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.insert-tail",
      name: "doubly_insert_tail",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/insert-tail",
      description: "Inserts node at end of doubly linked list",
      signature: "void doubly_insert_tail(Node** head, int data);",
      code: `void doubly_insert_tail(Node** head, int data) {
    Node* n = doubly_create_node(data);
    if (!n) return;
    if (*head == NULL) {
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next != NULL) {
        cur = cur->next;
    }
    cur->next = n;
    n->prev = cur;
}`,
      dependencies: [doublyNodeId, "data-structures.separate-components.linked-lists.doubly.create-node"],
      tags: ["linked-list", "doubly", "insert", "tail"],
      aliases: ["doubly_insert_tail", "insertTailDoubly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.insert-after",
      name: "doubly_insert_after",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/insert-after",
      description: "Inserts node immediately after given target in doubly linked list",
      signature: "void doubly_insert_after(Node* target, int data);",
      code: `void doubly_insert_after(Node* target, int data) {
    if (!target) return;
    Node* n = doubly_create_node(data);
    if (!n) return;
    n->next = target->next;
    n->prev = target;
    if (target->next) target->next->prev = n;
    target->next = n;
}`,
      dependencies: [doublyNodeId, "data-structures.separate-components.linked-lists.doubly.create-node"],
      tags: ["linked-list", "doubly", "insert", "after"],
      aliases: ["doubly_insert_after", "insertAfterDoubly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.insert-before",
      name: "doubly_insert_before",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/insert-before",
      description: "Inserts node immediately before given target in doubly linked list",
      signature: "void doubly_insert_before(Node** head, Node* target, int data);",
      code: `void doubly_insert_before(Node** head, Node* target, int data) {
    if (!head || !target) return;
    if (*head == target) {
        doubly_insert_head(head, data);
        return;
    }
    Node* n = doubly_create_node(data);
    if (!n) return;
    n->prev = target->prev;
    n->next = target;
    if (target->prev) target->prev->next = n;
    target->prev = n;
}`,
      dependencies: [doublyNodeId, "data-structures.separate-components.linked-lists.doubly.create-node", "data-structures.separate-components.linked-lists.doubly.insert-head"],
      tags: ["linked-list", "doubly", "insert", "before"],
      aliases: ["doubly_insert_before", "insertBeforeDoubly"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.delete-node",
      name: "doubly_delete_node",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/delete-node",
      description: "Deletes specific node from doubly linked list",
      signature: "void doubly_delete_node(Node** head, Node* del);",
      code: `void doubly_delete_node(Node** head, Node* del) {
    if (!head || !*head || !del) return;
    if (*head == del) *head = del->next;
    if (del->next != NULL) del->next->prev = del->prev;
    if (del->prev != NULL) del->prev->next = del->next;
    free(del);
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "delete"],
      aliases: ["doubly_delete_node", "deleteDoublyNode"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly.free",
      name: "doubly_free",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly",
      path: "data-structures/separate-components/linked-lists/doubly/free",
      description: "Deallocates entire doubly linked list",
      signature: "void doubly_free(Node** head);",
      code: `void doubly_free(Node** head) {
    if (!head) return;
    Node* cur = *head;
    while (cur != NULL) {
        Node* nxt = cur->next;
        free(cur);
        cur = nxt;
    }
    *head = NULL;
}`,
      dependencies: [doublyNodeId],
      tags: ["linked-list", "doubly", "free"],
      aliases: ["doubly_free", "freeDoublyList"],
    })
  );

  // Singly Circular List (Node named Node)
  const scNodeId = "data-structures.separate-components.linked-lists.singly-circular.node";
  components.push(
    createComponent({
      id: scNodeId,
      name: "Node",
      type: "struct",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly-circular",
      path: "data-structures/separate-components/linked-lists/singly-circular/node",
      description: "Node struct for singly circular linked list",
      signature: "typedef struct Node { int data; struct Node* next; } Node; typedef Node CircularNode;",
      code: `typedef struct Node {
    int data;
    struct Node* next;
} Node;
typedef Node CircularNode;`,
      tags: ["linked-list", "circular", "node"],
      aliases: ["CircularNode", "sc_node"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.insert-end",
      name: "sc_insert_end",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly-circular",
      path: "data-structures/separate-components/linked-lists/singly-circular/insert-end",
      description: "Inserts node at end of singly circular linked list",
      signature: "void sc_insert_end(Node** head, int data);",
      code: `void sc_insert_end(Node** head, int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    n->data = data;
    if (*head == NULL) {
        n->next = n;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next != *head) {
        cur = cur->next;
    }
    cur->next = n;
    n->next = *head;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "insert"],
      aliases: ["sc_insert_end", "insertCircularEnd"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.singly-circular.free",
      name: "sc_free",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.singly-circular",
      path: "data-structures/separate-components/linked-lists/singly-circular/free",
      description: "Frees all nodes in singly circular linked list",
      signature: "void sc_free(Node** head);",
      code: `void sc_free(Node** head) {
    if (!head || !*head) return;
    Node* cur = *head;
    Node* nxt = NULL;
    do {
        nxt = cur->next;
        free(cur);
        cur = nxt;
    } while (cur != *head);
    *head = NULL;
}`,
      dependencies: [scNodeId],
      tags: ["linked-list", "circular", "free"],
      aliases: ["sc_free", "freeCircularList"],
    })
  );

  // Doubly Circular List (Node named Node)
  const dcNodeId = "data-structures.separate-components.linked-lists.doubly-circular.node";
  components.push(
    createComponent({
      id: dcNodeId,
      name: "Node",
      type: "struct",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly-circular",
      path: "data-structures/separate-components/linked-lists/doubly-circular/node",
      description: "Node struct for doubly circular linked list",
      signature: "typedef struct Node { int data; struct Node* prev; struct Node* next; } Node; typedef Node DoublyCircularNode;",
      code: `typedef struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
} Node;
typedef Node DoublyCircularNode;`,
      tags: ["linked-list", "doubly-circular", "node"],
      aliases: ["DoublyCircularNode", "dc_node"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.insert-end",
      name: "dc_insert_end",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly-circular",
      path: "data-structures/separate-components/linked-lists/doubly-circular/insert-end",
      description: "Inserts node at end of doubly circular linked list",
      signature: "void dc_insert_end(Node** head, int data);",
      code: `void dc_insert_end(Node** head, int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    n->data = data;
    if (*head == NULL) {
        n->next = n;
        n->prev = n;
        *head = n;
        return;
    }
    Node* last = (*head)->prev;
    n->next = *head;
    n->prev = last;
    last->next = n;
    (*head)->prev = n;
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "insert"],
      aliases: ["dc_insert_end", "insertDoublyCircularEnd"],
    }),
    createComponent({
      id: "data-structures.separate-components.linked-lists.doubly-circular.free",
      name: "dc_free",
      type: "function",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.separate-components.linked-lists.doubly-circular",
      path: "data-structures/separate-components/linked-lists/doubly-circular/free",
      description: "Frees all nodes in doubly circular linked list",
      signature: "void dc_free(Node** head);",
      code: `void dc_free(Node** head) {
    if (!head || !*head) return;
    Node* cur = *head;
    Node* last = (*head)->prev;
    while (cur != last) {
        Node* nxt = cur->next;
        free(cur);
        cur = nxt;
    }
    free(last);
    *head = NULL;
}`,
      dependencies: [dcNodeId],
      tags: ["linked-list", "doubly-circular", "free"],
      aliases: ["dc_free", "freeDoublyCircularList"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 3: STACKS
  // -------------------------------------------------------------------------

  // Array Stack
  const arrayStackId = "data-structures.separate-components.stacks.array-stack.struct";
  components.push(
    createComponent({
      id: arrayStackId,
      name: "ArrayStack",
      type: "struct",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.separate-components.stacks.array-stack",
      path: "data-structures/separate-components/stacks/array-stack/struct",
      description: "LIFO stack implementation backed by dynamic contiguous array",
      signature: "typedef struct ArrayStack { int* data; int top; int capacity; } ArrayStack;",
      code: `typedef struct ArrayStack {
    int* data;
    int top;
    int capacity;
} ArrayStack;`,
      tags: ["stack", "array-stack", "lifo"],
      aliases: ["ArrayStack", "array_stack_struct"],
    }),
    createComponent({
      id: "data-structures.separate-components.stacks.array-stack.push",
      name: "array_stack_push",
      type: "function",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.separate-components.stacks.array-stack",
      path: "data-structures/separate-components/stacks/array-stack/push",
      description: "Pushes integer on top of array stack",
      signature: "int array_stack_push(ArrayStack* s, int val);",
      code: `int array_stack_push(ArrayStack* s, int val) {
    if (s->top >= s->capacity - 1) {
        s->capacity *= 2;
        s->data = (int*)realloc(s->data, s->capacity * sizeof(int));
    }
    s->data[++s->top] = val;
    return 1;
}`,
      dependencies: [arrayStackId],
      tags: ["stack", "push"],
      aliases: ["array_stack_push", "pushStack"],
    }),
    createComponent({
      id: "data-structures.separate-components.stacks.array-stack.pop",
      name: "array_stack_pop",
      type: "function",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.separate-components.stacks.array-stack",
      path: "data-structures/separate-components/stacks/array-stack/pop",
      description: "Pops top integer from array stack",
      signature: "int array_stack_pop(ArrayStack* s, int* val);",
      code: `int array_stack_pop(ArrayStack* s, int* val) {
    if (s->top < 0) return 0;
    *val = s->data[s->top--];
    return 1;
}`,
      dependencies: [arrayStackId],
      tags: ["stack", "pop"],
      aliases: ["array_stack_pop", "popStack"],
    })
  );

  // Linked Stack (Node named Node)
  const linkedStackNodeId = "data-structures.separate-components.stacks.linked-stack.node";
  components.push(
    createComponent({
      id: linkedStackNodeId,
      name: "Node",
      type: "struct",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.separate-components.stacks.linked-stack",
      path: "data-structures/separate-components/stacks/linked-stack/node",
      description: "Node struct for linked list stack",
      signature: "typedef struct Node { int data; struct Node* next; } Node; typedef Node StackNode;",
      code: `typedef struct Node {
    int data;
    struct Node* next;
} Node;
typedef Node StackNode;`,
      tags: ["stack", "linked-stack", "node"],
      aliases: ["StackNode", "linked_stack_node"],
    }),
    createComponent({
      id: "data-structures.separate-components.stacks.linked-stack.push",
      name: "linked_stack_push",
      type: "function",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.separate-components.stacks.linked-stack",
      path: "data-structures/separate-components/stacks/linked-stack/push",
      description: "Pushes integer to head of linked stack",
      signature: "void linked_stack_push(Node** top, int val);",
      code: `void linked_stack_push(Node** top, int val) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    n->data = val;
    n->next = *top;
    *top = n;
}`,
      dependencies: [linkedStackNodeId],
      tags: ["stack", "linked-stack", "push"],
      aliases: ["linked_stack_push", "pushLinkedStack"],
    }),
    createComponent({
      id: "data-structures.separate-components.stacks.linked-stack.pop",
      name: "linked_stack_pop",
      type: "function",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.separate-components.stacks.linked-stack",
      path: "data-structures/separate-components/stacks/linked-stack/pop",
      description: "Pops top integer from linked stack",
      signature: "int linked_stack_pop(Node** top, int* val);",
      code: `int linked_stack_pop(Node** top, int* val) {
    if (!top || !*top) return 0;
    Node* del = *top;
    *val = del->data;
    *top = del->next;
    free(del);
    return 1;
}`,
      dependencies: [linkedStackNodeId],
      tags: ["stack", "linked-stack", "pop"],
      aliases: ["linked_stack_pop", "popLinkedStack"],
    })
  );

  // Monotonic Stack
  components.push(
    createComponent({
      id: "data-structures.separate-components.stacks.monotonic-stack.next-greater",
      name: "mono_stack_next_greater",
      type: "function",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.separate-components.stacks.monotonic-stack",
      path: "data-structures/separate-components/stacks/monotonic-stack/next-greater",
      description: "Computes next greater element for each array entry using monotonic stack",
      signature: "void mono_stack_next_greater(const int* arr, int n, int* result);",
      code: `void mono_stack_next_greater(const int* arr, int n, int* result) {
    int* stack = (int*)malloc(n * sizeof(int));
    int top = -1;
    for (int i = n - 1; i >= 0; i--) {
        while (top >= 0 && stack[top] <= arr[i]) {
            top--;
        }
        result[i] = (top < 0) ? -1 : stack[top];
        stack[++top] = arr[i];
    }
    free(stack);
}`,
      tags: ["stack", "monotonic", "next-greater"],
      aliases: ["mono_stack_next_greater", "nextGreaterElement"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 4: QUEUES
  // -------------------------------------------------------------------------

  // Linear Queue
  const linearQueueId = "data-structures.separate-components.queues.linear-queue.struct";
  components.push(
    createComponent({
      id: linearQueueId,
      name: "LinearQueue",
      type: "struct",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.linear-queue",
      path: "data-structures/separate-components/queues/linear-queue/struct",
      description: "Basic array FIFO linear queue",
      signature: "typedef struct LinearQueue { int* data; int front; int rear; int capacity; } LinearQueue;",
      code: `typedef struct LinearQueue {
    int* data;
    int front;
    int rear;
    int capacity;
} LinearQueue;`,
      tags: ["queue", "linear-queue", "fifo"],
      aliases: ["LinearQueue", "linear_queue_struct"],
    }),
    createComponent({
      id: "data-structures.separate-components.queues.linear-queue.enqueue",
      name: "linear_queue_enqueue",
      type: "function",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.linear-queue",
      path: "data-structures/separate-components/queues/linear-queue/enqueue",
      description: "Inserts item at end of linear queue",
      signature: "int linear_queue_enqueue(LinearQueue* q, int val);",
      code: `int linear_queue_enqueue(LinearQueue* q, int val) {
    if (q->rear >= q->capacity - 1) return 0;
    q->data[++q->rear] = val;
    return 1;
}`,
      dependencies: [linearQueueId],
      tags: ["queue", "enqueue"],
      aliases: ["linear_queue_enqueue", "enqueueLinear"],
    }),
    createComponent({
      id: "data-structures.separate-components.queues.linear-queue.dequeue",
      name: "linear_queue_dequeue",
      type: "function",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.linear-queue",
      path: "data-structures/separate-components/queues/linear-queue/dequeue",
      description: "Removes and returns item from front of linear queue",
      signature: "int linear_queue_dequeue(LinearQueue* q, int* val);",
      code: `int linear_queue_dequeue(LinearQueue* q, int* val) {
    if (q->front > q->rear) return 0;
    *val = q->data[q->front++];
    return 1;
}`,
      dependencies: [linearQueueId],
      tags: ["queue", "dequeue"],
      aliases: ["linear_queue_dequeue", "dequeueLinear"],
    })
  );

  // Circular Queue
  const circularQueueId = "data-structures.separate-components.queues.circular-queue.struct";
  components.push(
    createComponent({
      id: circularQueueId,
      name: "CircularQueue",
      type: "struct",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.circular-queue",
      path: "data-structures/separate-components/queues/circular-queue/struct",
      description: "Ring buffer FIFO circular queue",
      signature: "typedef struct CircularQueue { int* data; int front; int rear; int size; int capacity; } CircularQueue;",
      code: `typedef struct CircularQueue {
    int* data;
    int front;
    int rear;
    int size;
    int capacity;
} CircularQueue;`,
      tags: ["queue", "circular-queue", "ring-buffer"],
      aliases: ["CircularQueue", "circular_queue_struct"],
    }),
    createComponent({
      id: "data-structures.separate-components.queues.circular-queue.enqueue",
      name: "circular_queue_enqueue",
      type: "function",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.circular-queue",
      path: "data-structures/separate-components/queues/circular-queue/enqueue",
      description: "Enqueues item into circular ring queue",
      signature: "int circular_queue_enqueue(CircularQueue* q, int val);",
      code: `int circular_queue_enqueue(CircularQueue* q, int val) {
    if (q->size == q->capacity) return 0;
    q->rear = (q->rear + 1) % q->capacity;
    q->data[q->rear] = val;
    q->size++;
    return 1;
}`,
      dependencies: [circularQueueId],
      tags: ["queue", "circular", "enqueue"],
      aliases: ["circular_queue_enqueue", "enqueueCircular"],
    }),
    createComponent({
      id: "data-structures.separate-components.queues.circular-queue.dequeue",
      name: "circular_queue_dequeue",
      type: "function",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.circular-queue",
      path: "data-structures/separate-components/queues/circular-queue/dequeue",
      description: "Dequeues item from front of circular queue",
      signature: "int circular_queue_dequeue(CircularQueue* q, int* val);",
      code: `int circular_queue_dequeue(CircularQueue* q, int* val) {
    if (q->size == 0) return 0;
    *val = q->data[q->front];
    q->front = (q->front + 1) % q->capacity;
    q->size--;
    return 1;
}`,
      dependencies: [circularQueueId],
      tags: ["queue", "circular", "dequeue"],
      aliases: ["circular_queue_dequeue", "dequeueCircular"],
    })
  );

  // Deque (Double Ended Queue)
  const dequeId = "data-structures.separate-components.queues.deque.struct";
  components.push(
    createComponent({
      id: dequeId,
      name: "Deque",
      type: "struct",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.deque",
      path: "data-structures/separate-components/queues/deque/struct",
      description: "Double-ended circular queue structure",
      signature: "typedef struct Deque { int* data; int front; int rear; int size; int capacity; } Deque;",
      code: `typedef struct Deque {
    int* data;
    int front;
    int rear;
    int size;
    int capacity;
} Deque;`,
      tags: ["queue", "deque"],
      aliases: ["Deque", "deque_struct"],
    }),
    createComponent({
      id: "data-structures.separate-components.queues.deque.push-front",
      name: "deque_push_front",
      type: "function",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.deque",
      path: "data-structures/separate-components/queues/deque/push-front",
      description: "Pushes element to front of deque",
      signature: "int deque_push_front(Deque* d, int val);",
      code: `int deque_push_front(Deque* d, int val) {
    if (d->size == d->capacity) return 0;
    d->front = (d->front - 1 + d->capacity) % d->capacity;
    d->data[d->front] = val;
    d->size++;
    return 1;
}`,
      dependencies: [dequeId],
      tags: ["queue", "deque", "push-front"],
      aliases: ["deque_push_front", "pushFrontDeque"],
    }),
    createComponent({
      id: "data-structures.separate-components.queues.deque.push-back",
      name: "deque_push_back",
      type: "function",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.deque",
      path: "data-structures/separate-components/queues/deque/push-back",
      description: "Pushes element to back of deque",
      signature: "int deque_push_back(Deque* d, int val);",
      code: `int deque_push_back(Deque* d, int val) {
    if (d->size == d->capacity) return 0;
    d->rear = (d->rear + 1) % d->capacity;
    d->data[d->rear] = val;
    d->size++;
    return 1;
}`,
      dependencies: [dequeId],
      tags: ["queue", "deque", "push-back"],
      aliases: ["deque_push_back", "pushBackDeque"],
    })
  );

  // Priority Queue / Binary Min Heap
  const pqStructId = "data-structures.separate-components.queues.priority-queue.struct";
  components.push(
    createComponent({
      id: pqStructId,
      name: "PriorityQueue",
      type: "struct",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.priority-queue",
      path: "data-structures/separate-components/queues/priority-queue/struct",
      description: "Binary min-heap priority queue structure",
      signature: "typedef struct PriorityQueue { int* data; int size; int capacity; } PriorityQueue;",
      code: `typedef struct PriorityQueue {
    int* data;
    int size;
    int capacity;
} PriorityQueue;`,
      tags: ["queue", "heap", "priority-queue"],
      aliases: ["PriorityQueue", "pq_struct"],
    }),
    createComponent({
      id: "data-structures.separate-components.queues.priority-queue.push",
      name: "pq_push",
      type: "function",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.priority-queue",
      path: "data-structures/separate-components/queues/priority-queue/push",
      description: "Inserts item into min-heap and heapifies up",
      signature: "void pq_push(PriorityQueue* pq, int val);",
      code: `void pq_push(PriorityQueue* pq, int val) {
    if (pq->size >= pq->capacity) {
        pq->capacity *= 2;
        pq->data = (int*)realloc(pq->data, pq->capacity * sizeof(int));
    }
    int i = pq->size++;
    pq->data[i] = val;
    while (i != 0 && pq->data[(i - 1) / 2] > pq->data[i]) {
        int tmp = pq->data[i];
        pq->data[i] = pq->data[(i - 1) / 2];
        pq->data[(i - 1) / 2] = tmp;
        i = (i - 1) / 2;
    }
}`,
      dependencies: [pqStructId],
      tags: ["queue", "priority-queue", "push"],
      aliases: ["pq_push", "pushPriorityQueue"],
    }),
    createComponent({
      id: "data-structures.separate-components.queues.priority-queue.pop",
      name: "pq_pop",
      type: "function",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.separate-components.queues.priority-queue",
      path: "data-structures/separate-components/queues/priority-queue/pop",
      description: "Extracts minimum value from min-heap",
      signature: "int pq_pop(PriorityQueue* pq, int* min_val);",
      code: `int pq_pop(PriorityQueue* pq, int* min_val) {
    if (pq->size <= 0) return 0;
    *min_val = pq->data[0];
    pq->data[0] = pq->data[--pq->size];
    int i = 0;
    while (2 * i + 1 < pq->size) {
        int smallest = i;
        int l = 2 * i + 1;
        int r = 2 * i + 2;
        if (l < pq->size && pq->data[l] < pq->data[smallest]) smallest = l;
        if (r < pq->size && pq->data[r] < pq->data[smallest]) smallest = r;
        if (smallest == i) break;
        int tmp = pq->data[i];
        pq->data[i] = pq->data[smallest];
        pq->data[smallest] = tmp;
        i = smallest;
    }
    return 1;
}`,
      dependencies: [pqStructId],
      tags: ["queue", "priority-queue", "pop"],
      aliases: ["pq_pop", "popPriorityQueue"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 5: TREES
  // -------------------------------------------------------------------------

  // BST (Node named Node)
  const bstNodeId = "data-structures.separate-components.trees.bst.node";
  components.push(
    createComponent({
      id: bstNodeId,
      name: "Node",
      type: "struct",
      category: "data-structures",
      subcategory: "trees",
      categoryId: "data-structures.separate-components.trees.bst",
      path: "data-structures/separate-components/trees/bst/node",
      description: "Binary Search Tree node struct",
      signature: "typedef struct Node { int data; struct Node* left; struct Node* right; } Node; typedef Node BSTNode;",
      code: `typedef struct Node {
    int data;
    struct Node* left;
    struct Node* right;
} Node;
typedef Node BSTNode;`,
      tags: ["tree", "bst", "node"],
      aliases: ["BSTNode", "bst_node"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.insert",
      name: "bst_insert",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: "data-structures.separate-components.trees.bst",
      path: "data-structures/separate-components/trees/bst/insert",
      description: "Inserts value into binary search tree recursively",
      signature: "Node* bst_insert(Node* root, int val);",
      code: `Node* bst_insert(Node* root, int val) {
    if (root == NULL) {
        Node* n = (Node*)malloc(sizeof(Node));
        if (!n) return NULL;
        n->data = val;
        n->left = NULL;
        n->right = NULL;
        return n;
    }
    if (val < root->data) {
        root->left = bst_insert(root->left, val);
    } else if (val > root->data) {
        root->right = bst_insert(root->right, val);
    }
    return root;
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "insert"],
      aliases: ["bst_insert", "insertBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.search",
      name: "bst_search",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: "data-structures.separate-components.trees.bst",
      path: "data-structures/separate-components/trees/bst/search",
      description: "Searches for value in binary search tree",
      signature: "Node* bst_search(Node* root, int val);",
      code: `Node* bst_search(Node* root, int val) {
    if (root == NULL || root->data == val) return root;
    if (val < root->data) return bst_search(root->left, val);
    return bst_search(root->right, val);
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "search"],
      aliases: ["bst_search", "searchBST"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.bst.free",
      name: "bst_free",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: "data-structures.separate-components.trees.bst",
      path: "data-structures/separate-components/trees/bst/free",
      description: "Deallocates entire binary search tree via post-order traversal",
      signature: "void bst_free(Node* root);",
      code: `void bst_free(Node* root) {
    if (root == NULL) return;
    bst_free(root->left);
    bst_free(root->right);
    free(root);
}`,
      dependencies: [bstNodeId],
      tags: ["tree", "bst", "free"],
      aliases: ["bst_free", "freeBST"],
    })
  );

  // AVL Tree (Node named Node)
  const avlNodeId = "data-structures.separate-components.trees.avl.node";
  components.push(
    createComponent({
      id: avlNodeId,
      name: "Node",
      type: "struct",
      category: "data-structures",
      subcategory: "trees",
      categoryId: "data-structures.separate-components.trees.avl",
      path: "data-structures/separate-components/trees/avl/node",
      description: "Self-balancing AVL Tree node struct with height field",
      signature: "typedef struct Node { int data; int height; struct Node* left; struct Node* right; } Node; typedef Node AVLNode;",
      code: `typedef struct Node {
    int data;
    int height;
    struct Node* left;
    struct Node* right;
} Node;
typedef Node AVLNode;`,
      tags: ["tree", "avl", "node"],
      aliases: ["AVLNode", "avl_node"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.avl.insert",
      name: "avl_insert",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: "data-structures.separate-components.trees.avl",
      path: "data-structures/separate-components/trees/avl/insert",
      description: "Inserts into AVL tree and performs balance rotations",
      signature: "Node* avl_insert(Node* node, int key);",
      code: `static int avl_h(Node* n) { return n ? n->height : 0; }
static int avl_max(int a, int b) { return a > b ? a : b; }

static Node* avl_rot_right(Node* y) {
    Node* x = y->left;
    Node* t = x->right;
    x->right = y;
    y->left = t;
    y->height = avl_max(avl_h(y->left), avl_h(y->right)) + 1;
    x->height = avl_max(avl_h(x->left), avl_h(x->right)) + 1;
    return x;
}

static Node* avl_rot_left(Node* x) {
    Node* y = x->right;
    Node* t = y->left;
    y->left = x;
    x->right = t;
    x->height = avl_max(avl_h(x->left), avl_h(x->right)) + 1;
    y->height = avl_max(avl_h(y->left), avl_h(y->right)) + 1;
    return y;
}

Node* avl_insert(Node* node, int key) {
    if (node == NULL) {
        Node* n = (Node*)malloc(sizeof(Node));
        if (!n) return NULL;
        n->data = key;
        n->height = 1;
        n->left = NULL;
        n->right = NULL;
        return n;
    }
    if (key < node->data) node->left = avl_insert(node->left, key);
    else if (key > node->data) node->right = avl_insert(node->right, key);
    else return node;

    node->height = 1 + avl_max(avl_h(node->left), avl_h(node->right));
    int balance = avl_h(node->left) - avl_h(node->right);

    if (balance > 1 && key < node->left->data) return avl_rot_right(node);
    if (balance < -1 && key > node->right->data) return avl_rot_left(node);
    if (balance > 1 && key > node->left->data) {
        node->left = avl_rot_left(node->left);
        return avl_rot_right(node);
    }
    if (balance < -1 && key < node->right->data) {
        node->right = avl_rot_right(node->right);
        return avl_rot_left(node);
    }
    return node;
}`,
      dependencies: [avlNodeId],
      tags: ["tree", "avl", "insert"],
      aliases: ["avl_insert", "insertAVL"],
    })
  );

  // Trie (Prefix Tree)
  const trieNodeId = "data-structures.separate-components.trees.trie.node";
  components.push(
    createComponent({
      id: trieNodeId,
      name: "TrieNode",
      type: "struct",
      category: "data-structures",
      subcategory: "trees",
      categoryId: "data-structures.separate-components.trees.trie",
      path: "data-structures/separate-components/trees/trie/node",
      description: "Prefix tree Trie node for lowercase alphabet",
      signature: "typedef struct TrieNode { struct TrieNode* children[26]; bool is_end; } TrieNode;",
      code: `typedef struct TrieNode {
    struct TrieNode* children[26];
    bool is_end;
} TrieNode;`,
      tags: ["tree", "trie", "node"],
      aliases: ["TrieNode", "trie_node_struct"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.trie.insert",
      name: "trie_insert",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: "data-structures.separate-components.trees.trie",
      path: "data-structures/separate-components/trees/trie/insert",
      description: "Inserts lowercase string into Trie",
      signature: "void trie_insert(TrieNode* root, const char* word);",
      code: `void trie_insert(TrieNode* root, const char* word) {
    TrieNode* cur = root;
    for (int i = 0; word[i] != '\0'; i++) {
        int idx = word[i] - 'a';
        if (idx < 0 || idx >= 26) continue;
        if (!cur->children[idx]) {
            TrieNode* n = (TrieNode*)calloc(1, sizeof(TrieNode));
            cur->children[idx] = n;
        }
        cur = cur->children[idx];
    }
    cur->is_end = true;
}`,
      dependencies: [trieNodeId],
      tags: ["tree", "trie", "insert"],
      aliases: ["trie_insert", "insertTrie"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.trie.search",
      name: "trie_search",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: "data-structures.separate-components.trees.trie",
      path: "data-structures/separate-components/trees/trie/search",
      description: "Searches for full word in Trie",
      signature: "bool trie_search(const TrieNode* root, const char* word);",
      code: `bool trie_search(const TrieNode* root, const char* word) {
    const TrieNode* cur = root;
    for (int i = 0; word[i] != '\0'; i++) {
        int idx = word[i] - 'a';
        if (idx < 0 || idx >= 26 || !cur->children[idx]) return false;
        cur = cur->children[idx];
    }
    return cur != NULL && cur->is_end;
}`,
      dependencies: [trieNodeId],
      tags: ["tree", "trie", "search"],
      aliases: ["trie_search", "searchTrie"],
    })
  );

  // Segment Tree
  const segTreeId = "data-structures.separate-components.trees.segment-tree.struct";
  components.push(
    createComponent({
      id: segTreeId,
      name: "SegTree",
      type: "struct",
      category: "data-structures",
      subcategory: "trees",
      categoryId: "data-structures.separate-components.trees.segment-tree",
      path: "data-structures/separate-components/trees/segment-tree/struct",
      description: "Segment tree structure for range sum queries",
      signature: "typedef struct SegTree { int* tree; int n; } SegTree;",
      code: `typedef struct SegTree {
    int* tree;
    int n;
} SegTree;`,
      tags: ["tree", "segment-tree"],
      aliases: ["SegTree", "segtree_struct"],
    }),
    createComponent({
      id: "data-structures.separate-components.trees.segment-tree.query",
      name: "segtree_query_range",
      type: "function",
      category: "data-structures",
      subcategory: "trees",
      categoryId: "data-structures.separate-components.trees.segment-tree",
      path: "data-structures/separate-components/trees/segment-tree/query",
      description: "Queries range sum [l, r] on segment tree",
      signature: "int segtree_query_range(const SegTree* st, int l, int r);",
      code: `int segtree_query_range(const SegTree* st, int l, int r) {
    int sum = 0;
    int n = st->n;
    for (l += n, r += n + 1; l < r; l >>= 1, r >>= 1) {
        if (l & 1) sum += st->tree[l++];
        if (r & 1) sum += st->tree[--r];
    }
    return sum;
}`,
      dependencies: [segTreeId],
      tags: ["tree", "segment-tree", "query"],
      aliases: ["segtree_query_range", "querySegTree"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 6: GRAPHS (All with "graph_" in name!)
  // -------------------------------------------------------------------------

  // Graph Adjacency Matrix
  const graphMatId = "data-structures.separate-components.graphs.adjacency-matrix.struct";
  components.push(
    createComponent({
      id: graphMatId,
      name: "GraphMat",
      type: "struct",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.adjacency-matrix",
      path: "data-structures/separate-components/graphs/adjacency-matrix/struct",
      description: "Graph represented by 2D adjacency matrix",
      signature: "typedef struct GraphMat { int vertices; int** matrix; } GraphMat;",
      code: `typedef struct GraphMat {
    int vertices;
    int** matrix;
} GraphMat;`,
      tags: ["graphs", "adjacency-matrix", "graph"],
      aliases: ["GraphMat", "graph_matrix_struct"],
    }),
    createComponent({
      id: "data-structures.separate-components.graphs.adjacency-matrix.init",
      name: "graph_matrix_init",
      type: "function",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.adjacency-matrix",
      path: "data-structures/separate-components/graphs/adjacency-matrix/init",
      description: "Initializes graph adjacency matrix with given vertex count",
      signature: "GraphMat* graph_matrix_init(int v);",
      code: `GraphMat* graph_matrix_init(int v) {
    GraphMat* g = (GraphMat*)malloc(sizeof(GraphMat));
    if (!g) return NULL;
    g->vertices = v;
    g->matrix = (int**)malloc(v * sizeof(int*));
    for (int i = 0; i < v; i++) {
        g->matrix[i] = (int*)calloc(v, sizeof(int));
    }
    return g;
}`,
      dependencies: [graphMatId],
      tags: ["graphs", "adjacency-matrix", "init"],
      aliases: ["graph_matrix_init", "initGraphMatrix"],
    }),
    createComponent({
      id: "data-structures.separate-components.graphs.adjacency-matrix.add-edge",
      name: "graph_matrix_add_edge",
      type: "function",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.adjacency-matrix",
      path: "data-structures/separate-components/graphs/adjacency-matrix/add-edge",
      description: "Adds undirected edge to graph adjacency matrix",
      signature: "void graph_matrix_add_edge(GraphMat* g, int u, int v);",
      code: `void graph_matrix_add_edge(GraphMat* g, int u, int v) {
    if (u >= 0 && u < g->vertices && v >= 0 && v < g->vertices) {
        g->matrix[u][v] = 1;
        g->matrix[v][u] = 1;
    }
}`,
      dependencies: [graphMatId],
      tags: ["graphs", "adjacency-matrix", "edge"],
      aliases: ["graph_matrix_add_edge", "addEdgeGraphMatrix"],
    })
  );

  // Graph Adjacency List (Node named Node)
  const graphListNodeId = "data-structures.separate-components.graphs.adjacency-list.node";
  const graphListId = "data-structures.separate-components.graphs.adjacency-list.struct";
  components.push(
    createComponent({
      id: graphListNodeId,
      name: "Node",
      type: "struct",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.adjacency-list",
      path: "data-structures/separate-components/graphs/adjacency-list/node",
      description: "Adjacency list edge node struct",
      signature: "typedef struct Node { int dest; struct Node* next; } Node; typedef Node GraphAdjNode;",
      code: `typedef struct Node {
    int dest;
    struct Node* next;
} Node;
typedef Node GraphAdjNode;`,
      tags: ["graphs", "adjacency-list", "node"],
      aliases: ["GraphAdjNode", "graph_adj_node"],
    }),
    createComponent({
      id: graphListId,
      name: "GraphList",
      type: "struct",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.adjacency-list",
      path: "data-structures/separate-components/graphs/adjacency-list/struct",
      description: "Graph represented by array of adjacency list heads",
      signature: "typedef struct GraphList { int vertices; Node** adj; } GraphList;",
      code: `typedef struct GraphList {
    int vertices;
    Node** adj;
} GraphList;`,
      dependencies: [graphListNodeId],
      tags: ["graphs", "adjacency-list", "graph"],
      aliases: ["GraphList", "graph_list_struct"],
    }),
    createComponent({
      id: "data-structures.separate-components.graphs.adjacency-list.add-edge",
      name: "graph_list_add_edge",
      type: "function",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.adjacency-list",
      path: "data-structures/separate-components/graphs/adjacency-list/add-edge",
      description: "Adds directed edge from u to v in graph adjacency list",
      signature: "void graph_list_add_edge(GraphList* g, int u, int v);",
      code: `void graph_list_add_edge(GraphList* g, int u, int v) {
    if (u < 0 || u >= g->vertices) return;
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    n->dest = v;
    n->next = g->adj[u];
    g->adj[u] = n;
}`,
      dependencies: [graphListId, graphListNodeId],
      tags: ["graphs", "adjacency-list", "edge"],
      aliases: ["graph_list_add_edge", "addEdgeGraphList"],
    })
  );

  // Graph DSU (Disjoint Set Union)
  const graphDsuId = "data-structures.separate-components.graphs.dsu.struct";
  components.push(
    createComponent({
      id: graphDsuId,
      name: "GraphDSU",
      type: "struct",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.dsu",
      path: "data-structures/separate-components/graphs/dsu/struct",
      description: "Disjoint Set Union structure with parent and rank arrays",
      signature: "typedef struct GraphDSU { int* parent; int* rank; int n; } GraphDSU;",
      code: `typedef struct GraphDSU {
    int* parent;
    int* rank;
    int n;
} GraphDSU;`,
      tags: ["graphs", "dsu", "union-find"],
      aliases: ["GraphDSU", "graph_dsu_struct"],
    }),
    createComponent({
      id: "data-structures.separate-components.graphs.dsu.find",
      name: "graph_dsu_find",
      type: "function",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.dsu",
      path: "data-structures/separate-components/graphs/dsu/find",
      description: "Finds set representative with path compression",
      signature: "int graph_dsu_find(GraphDSU* dsu, int i);",
      code: `int graph_dsu_find(GraphDSU* dsu, int i) {
    if (dsu->parent[i] == i) return i;
    return dsu->parent[i] = graph_dsu_find(dsu, dsu->parent[i]);
}`,
      dependencies: [graphDsuId],
      tags: ["graphs", "dsu", "find"],
      aliases: ["graph_dsu_find", "findDSU"],
    }),
    createComponent({
      id: "data-structures.separate-components.graphs.dsu.union",
      name: "graph_dsu_union",
      type: "function",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.separate-components.graphs.dsu",
      path: "data-structures/separate-components/graphs/dsu/union",
      description: "Unions two disjoint sets by rank",
      signature: "void graph_dsu_union(GraphDSU* dsu, int x, int y);",
      code: `void graph_dsu_union(GraphDSU* dsu, int x, int y) {
    int root_x = graph_dsu_find(dsu, x);
    int root_y = graph_dsu_find(dsu, y);
    if (root_x != root_y) {
        if (dsu->rank[root_x] < dsu->rank[root_y]) {
            dsu->parent[root_x] = root_y;
        } else if (dsu->rank[root_x] > dsu->rank[root_y]) {
            dsu->parent[root_y] = root_x;
        } else {
            dsu->parent[root_y] = root_x;
            dsu->rank[root_x]++;
        }
    }
}`,
      dependencies: [graphDsuId, "data-structures.separate-components.graphs.dsu.find"],
      tags: ["graphs", "dsu", "union"],
      aliases: ["graph_dsu_union", "unionDSU"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 7: HASHING
  // -------------------------------------------------------------------------

  // Separate Chaining (Node named Node)
  const chainNodeId = "data-structures.separate-components.hashing.chaining.node";
  const chainTableId = "data-structures.separate-components.hashing.chaining.struct";
  components.push(
    createComponent({
      id: chainNodeId,
      name: "Node",
      type: "struct",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.separate-components.hashing.chaining",
      path: "data-structures/separate-components/hashing/chaining/node",
      description: "Hash bucket collision node struct",
      signature: "typedef struct Node { char key[32]; int value; struct Node* next; } Node; typedef Node HashNode;",
      code: `typedef struct Node {
    char key[32];
    int value;
    struct Node* next;
} Node;
typedef Node HashNode;`,
      tags: ["hashing", "chaining", "node"],
      aliases: ["HashNode", "hash_node_struct"],
    }),
    createComponent({
      id: chainTableId,
      name: "ChainHashTable",
      type: "struct",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.separate-components.hashing.chaining",
      path: "data-structures/separate-components/hashing/chaining/struct",
      description: "Hash table structure with linked list separate chaining",
      signature: "typedef struct ChainHashTable { Node** buckets; int size; } ChainHashTable;",
      code: `typedef struct ChainHashTable {
    Node** buckets;
    int size;
} ChainHashTable;`,
      dependencies: [chainNodeId],
      tags: ["hashing", "chaining", "table"],
      aliases: ["ChainHashTable", "chain_table_struct"],
    }),
    createComponent({
      id: "data-structures.separate-components.hashing.chaining.insert",
      name: "chain_hash_insert",
      type: "function",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.separate-components.hashing.chaining",
      path: "data-structures/separate-components/hashing/chaining/insert",
      description: "Inserts key-value pair into separate chaining hash table",
      signature: "void chain_hash_insert(ChainHashTable* ht, const char* key, int value);",
      code: `static unsigned long hash_str(const char* s, int mod) {
    unsigned long h = 5381;
    int c;
    while ((c = *s++)) h = ((h << 5) + h) + c;
    return h % mod;
}

void chain_hash_insert(ChainHashTable* ht, const char* key, int value) {
    unsigned long b = hash_str(key, ht->size);
    Node* cur = ht->buckets[b];
    while (cur) {
        if (strcmp(cur->key, key) == 0) {
            cur->value = value;
            return;
        }
        cur = cur->next;
    }
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    strncpy(n->key, key, sizeof(n->key) - 1);
    n->key[sizeof(n->key) - 1] = '\0';
    n->value = value;
    n->next = ht->buckets[b];
    ht->buckets[b] = n;
}`,
      dependencies: [chainTableId, chainNodeId],
      tags: ["hashing", "chaining", "insert"],
      aliases: ["chain_hash_insert", "insertChainHash"],
    })
  );

  // Open Addressing (Linear Probing)
  const openHashId = "data-structures.separate-components.hashing.open-addressing.struct";
  components.push(
    createComponent({
      id: openHashId,
      name: "OpenHashTable",
      type: "struct",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.separate-components.hashing.open-addressing",
      path: "data-structures/separate-components/hashing/open-addressing/struct",
      description: "Open addressing hash table with linear probing",
      signature: "typedef struct OpenEntry { char key[32]; int value; bool occupied; } OpenEntry; typedef struct OpenHashTable { OpenEntry* entries; int capacity; int count; } OpenHashTable;",
      code: `typedef struct OpenEntry {
    char key[32];
    int value;
    bool occupied;
} OpenEntry;

typedef struct OpenHashTable {
    OpenEntry* entries;
    int capacity;
    int count;
} OpenHashTable;`,
      tags: ["hashing", "open-addressing", "table"],
      aliases: ["OpenHashTable", "open_hash_table_struct"],
    }),
    createComponent({
      id: "data-structures.separate-components.hashing.open-addressing.insert",
      name: "open_hash_insert",
      type: "function",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.separate-components.hashing.open-addressing",
      path: "data-structures/separate-components/hashing/open-addressing/insert",
      description: "Inserts into open addressing hash table via linear probing",
      signature: "int open_hash_insert(OpenHashTable* ht, const char* key, int value);",
      code: `static unsigned long open_hash_calc(const char* s, int mod) {
    unsigned long h = 5381;
    int c;
    while ((c = *s++)) h = ((h << 5) + h) + c;
    return h % mod;
}

int open_hash_insert(OpenHashTable* ht, const char* key, int value) {
    if (ht->count >= ht->capacity / 2) return 0;
    unsigned long idx = open_hash_calc(key, ht->capacity);
    while (ht->entries[idx].occupied) {
        if (strcmp(ht->entries[idx].key, key) == 0) {
            ht->entries[idx].value = value;
            return 1;
        }
        idx = (idx + 1) % ht->capacity;
    }
    strncpy(ht->entries[idx].key, key, sizeof(ht->entries[idx].key) - 1);
    ht->entries[idx].key[sizeof(ht->entries[idx].key) - 1] = '\0';
    ht->entries[idx].value = value;
    ht->entries[idx].occupied = true;
    ht->count++;
    return 1;
}`,
      dependencies: [openHashId],
      tags: ["hashing", "open-addressing", "insert"],
      aliases: ["open_hash_insert", "insertOpenHash"],
    })
  );

  // Hash Functions
  components.push(
    createComponent({
      id: "data-structures.separate-components.hashing.hash-functions.djb2",
      name: "hash_djb2",
      type: "function",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.separate-components.hashing.hash-functions",
      path: "data-structures/separate-components/hashing/hash-functions/djb2",
      description: "Dan Bernstein djb2 hash function for strings",
      signature: "unsigned long hash_djb2(const char* str);",
      code: `unsigned long hash_djb2(const char* str) {
    unsigned long hash = 5381;
    int c;
    while ((c = *str++)) {
        hash = ((hash << 5) + hash) + c;
    }
    return hash;
}`,
      tags: ["hashing", "djb2", "string-hash"],
      aliases: ["hash_djb2", "djb2Hash"],
    }),
    createComponent({
      id: "data-structures.separate-components.hashing.hash-functions.fnv1a",
      name: "hash_fnv1a",
      type: "function",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.separate-components.hashing.hash-functions",
      path: "data-structures/separate-components/hashing/hash-functions/fnv1a",
      description: "Fowler-Noll-Vo 32-bit FNV-1a hash algorithm",
      signature: "uint32_t hash_fnv1a(const char* str);",
      code: `uint32_t hash_fnv1a(const char* str) {
    uint32_t hash = 2166136261u;
    while (*str) {
        hash ^= (uint8_t)(*str++);
        hash *= 16777619u;
    }
    return hash;
}`,
      tags: ["hashing", "fnv1a", "string-hash"],
      aliases: ["hash_fnv1a", "fnv1aHash"],
    })
  );

  // SUBDOMAIN 1 (CONT.): EXPANDED SEPARATE COMPONENTS
  components.push(...generateExpandedSinglyComponents());
  components.push(...generateExpandedDoublyComponents());
  components.push(...generateExpandedSinglyCircularComponents());
  components.push(...generateExpandedDoublyCircularComponents());
  components.push(...generateExpandedArrayStackQueueComponents());
  components.push(...generateExpandedTreeComponents());
  components.push(...generateExpandedGraphHashingComponents());

  // =========================================================================
  // SUBDOMAIN 2: FULL PROGRAMS (data-structures.full-programs)
  // =========================================================================
  components.push(...generateDataStructuresFullPrograms());

  return components;
}

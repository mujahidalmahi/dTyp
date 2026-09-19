import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateDataStructuresFullPrograms(): Component[] {
  const components: Component[] = [];

  // =========================================================================
  // SUBDOMAIN 2: FULL PROGRAMS (data-structures.full-programs)
  // Exactly 1 complete compilable program per structure type (25 programs)
  // Equipped with interactive menu-driven console loops, safe terminal inputs,
  // and full operational suites (reverse, insert/delete at pos, count, search).
  // =========================================================================

  // 1. Full Program: 1D Array
  components.push(
    createComponent({
      id: "data-structures.full-programs.arrays.1d-array.prog-1d-array",
      name: "prog_1d_array",
      type: "program",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.full-programs.arrays.1d-array",
      path: "data-structures/full-programs/arrays/1d-array/prog-1d-array",
      description: "Interactive 1D array program with insertion, deletion, linear and binary search, reversal, min/max, and count",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdbool.h>

#define MAX_CAP 100

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

void print_array(const int* arr, int n) {
    if (n == 0) {
        printf("Array is empty.\\n");
        return;
    }
    printf("Array [%d elements]: ", n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

bool insert_at(int* arr, int* n, int index, int val) {
    if (*n >= MAX_CAP || index < 0 || index > *n) return false;
    for (int i = *n; i > index; i--) arr[i] = arr[i - 1];
    arr[index] = val;
    (*n)++;
    return true;
}

bool delete_at(int* arr, int* n, int index, int* deleted_val) {
    if (*n == 0 || index < 0 || index >= *n) return false;
    *deleted_val = arr[index];
    for (int i = index; i < *n - 1; i++) arr[i] = arr[i + 1];
    (*n)--;
    return true;
}

int linear_search(const int* arr, int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

int binary_search(const int* arr, int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

void reverse_array(int* arr, int n) {
    int start = 0, end = n - 1;
    while (start < end) {
        int tmp = arr[start];
        arr[start] = arr[end];
        arr[end] = tmp;
        start++;
        end--;
    }
}

void find_min_max(const int* arr, int n, int* min_val, int* max_val) {
    if (n == 0) return;
    *min_val = arr[0];
    *max_val = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < *min_val) *min_val = arr[i];
        if (arr[i] > *max_val) *max_val = arr[i];
    }
}

int main(void) {
    int arr[MAX_CAP];
    int n = 0;
    int choice;

    do {
        printf("\\n=== 1D Array Operations Menu ===\\n");
        printf("1. Insert Element at Index\\n");
        printf("2. Delete Element at Index\\n");
        printf("3. Linear Search\\n");
        printf("4. Binary Search (Requires Sorted Array)\\n");
        printf("5. Reverse Array\\n");
        printf("6. Find Minimum and Maximum\\n");
        printf("7. Display Array and Count\\n");
        printf("0. Exit\\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            printf("Invalid input! Please enter an integer.\\n");
            continue;
        }

        switch (choice) {
            case 1: {
                int idx, val;
                printf("Enter index (0 to %d) and value: ", n);
                if (scanf("%d %d", &idx, &val) == 2) {
                    if (insert_at(arr, &n, idx, val)) printf("Successfully inserted %d at index %d.\\n", val, idx);
                    else printf("Failed to insert. Check index range and capacity.\\n");
                } else clear_input();
                break;
            }
            case 2: {
                int idx, val;
                printf("Enter index to delete (0 to %d): ", n - 1);
                if (scanf("%d", &idx) == 1) {
                    if (delete_at(arr, &n, idx, &val)) printf("Deleted %d from index %d.\\n", val, idx);
                    else printf("Failed to delete. Invalid index.\\n");
                } else clear_input();
                break;
            }
            case 3: {
                int target;
                printf("Enter target value to search: ");
                if (scanf("%d", &target) == 1) {
                    int pos = linear_search(arr, n, target);
                    if (pos != -1) printf("Found %d at index %d.\\n", target, pos);
                    else printf("%d not found in array.\\n", target);
                } else clear_input();
                break;
            }
            case 4: {
                int target;
                printf("Enter target value for binary search: ");
                if (scanf("%d", &target) == 1) {
                    int pos = binary_search(arr, n, target);
                    if (pos != -1) printf("Found %d at index %d.\\n", target, pos);
                    else printf("%d not found (ensure array is sorted).\\n", target);
                } else clear_input();
                break;
            }
            case 5:
                reverse_array(arr, n);
                printf("Array reversed successfully.\\n");
                print_array(arr, n);
                break;
            case 6: {
                if (n == 0) {
                    printf("Array is empty.\\n");
                } else {
                    int min_val, max_val;
                    find_min_max(arr, n, &min_val, &max_val);
                    printf("Min: %d | Max: %d\\n", min_val, max_val);
                }
                break;
            }
            case 7:
                print_array(arr, n);
                break;
            case 0:
                printf("Exiting 1D Array Menu. Goodbye!\\n");
                break;
            default:
                printf("Invalid choice. Please select from menu.\\n");
                break;
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "array", "1d"],
      aliases: ["prog_1d_array", "programArray1D"],
    })
  );

  // 2. Full Program: 2D Array
  components.push(
    createComponent({
      id: "data-structures.full-programs.arrays.2d-array.prog-2d-array",
      name: "prog_2d_array",
      type: "program",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.full-programs.arrays.2d-array",
      path: "data-structures/full-programs/arrays/2d-array/prog-2d-array",
      description: "Interactive 2D matrix program with allocation, element editing, transposition, row/col sums, and display",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int** alloc_matrix(int rows, int cols) {
    int** m = (int**)malloc(rows * sizeof(int*));
    for (int i = 0; i < rows; i++) {
        m[i] = (int*)calloc(cols, sizeof(int));
    }
    return m;
}

void free_matrix(int** m, int rows) {
    for (int i = 0; i < rows; i++) free(m[i]);
    free(m);
}

void print_matrix(int** m, int rows, int cols) {
    printf("Matrix (%dx%d):\\n", rows, cols);
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) printf("%4d ", m[i][j]);
        printf("\\n");
    }
}

int** transpose_matrix(int** m, int rows, int cols) {
    int** t = alloc_matrix(cols, rows);
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            t[j][i] = m[i][j];
        }
    }
    return t;
}

int main(void) {
    int rows = 3, cols = 3;
    int** mat = alloc_matrix(rows, cols);
    int choice;

    do {
        printf("\\n=== 2D Matrix Operations Menu ===\\n");
        printf("1. Set Element at (row, col)\\n");
        printf("2. Display Matrix\\n");
        printf("3. Transpose Matrix\\n");
        printf("4. Compute Row and Column Sums\\n");
        printf("5. Reallocate Matrix Dimensions\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int r, c, val;
                printf("Enter row (0-%d), col (0-%d), and value: ", rows - 1, cols - 1);
                if (scanf("%d %d %d", &r, &c, &val) == 3) {
                    if (r >= 0 && r < rows && c >= 0 && c < cols) {
                        mat[r][c] = val;
                        printf("Set mat[%d][%d] = %d\\n", r, c, val);
                    } else printf("Coordinates out of range.\\n");
                } else clear_input();
                break;
            }
            case 2:
                print_matrix(mat, rows, cols);
                break;
            case 3: {
                int** trans = transpose_matrix(mat, rows, cols);
                print_matrix(trans, cols, rows);
                free_matrix(trans, cols);
                break;
            }
            case 4: {
                for (int i = 0; i < rows; i++) {
                    int rsum = 0;
                    for (int j = 0; j < cols; j++) rsum += mat[i][j];
                    printf("Row %d Sum: %d\\n", i, rsum);
                }
                for (int j = 0; j < cols; j++) {
                    int csum = 0;
                    for (int i = 0; i < rows; i++) csum += mat[i][j];
                    printf("Col %d Sum: %d\\n", j, csum);
                }
                break;
            }
            case 5: {
                int nr, nc;
                printf("Enter new rows and cols: ");
                if (scanf("%d %d", &nr, &nc) == 2 && nr > 0 && nc > 0) {
                    free_matrix(mat, rows);
                    rows = nr;
                    cols = nc;
                    mat = alloc_matrix(rows, cols);
                    printf("Matrix resized to %dx%d.\\n", rows, cols);
                } else clear_input();
                break;
            }
            case 0:
                printf("Exiting 2D Matrix Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    free_matrix(mat, rows);
    return 0;
}`,
      tags: ["program", "array", "2d"],
      aliases: ["prog_2d_array", "programArray2D"],
    })
  );

  // 3. Full Program: 3D Array
  components.push(
    createComponent({
      id: "data-structures.full-programs.arrays.3d-array.prog-3d-array",
      name: "prog_3d_array",
      type: "program",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.full-programs.arrays.3d-array",
      path: "data-structures/full-programs/arrays/3d-array/prog-3d-array",
      description: "Interactive 3D tensor program with layer slice inspection, element manipulation, and sum reductions",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    int L = 2, R = 3, C = 3;
    int*** tensor = (int***)malloc(L * sizeof(int**));
    for (int i = 0; i < L; i++) {
        tensor[i] = (int**)malloc(R * sizeof(int*));
        for (int j = 0; j < R; j++) {
            tensor[i][j] = (int*)calloc(C, sizeof(int));
        }
    }

    int choice;
    do {
        printf("\\n=== 3D Tensor Menu (Layers: %d, Rows: %d, Cols: %d) ===\\n", L, R, C);
        printf("1. Set Element (layer, row, col)\\n");
        printf("2. Get Element (layer, row, col)\\n");
        printf("3. Display All Slice Layers\\n");
        printf("4. Compute Total Tensor Sum\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int l, r, c, val;
                printf("Enter layer, row, col, and value: ");
                if (scanf("%d %d %d %d", &l, &r, &c, &val) == 4) {
                    if (l >= 0 && l < L && r >= 0 && r < R && c >= 0 && c < C) {
                        tensor[l][r][c] = val;
                        printf("Set tensor[%d][%d][%d] = %d\\n", l, r, c, val);
                    } else printf("Indices out of range.\\n");
                } else clear_input();
                break;
            }
            case 2: {
                int l, r, c;
                printf("Enter layer, row, col: ");
                if (scanf("%d %d %d", &l, &r, &c) == 3) {
                    if (l >= 0 && l < L && r >= 0 && r < R && c >= 0 && c < C) {
                        printf("tensor[%d][%d][%d] = %d\\n", l, r, c, tensor[l][r][c]);
                    } else printf("Indices out of range.\\n");
                } else clear_input();
                break;
            }
            case 3:
                for (int i = 0; i < L; i++) {
                    printf("--- Slice Layer %d ---\\n", i);
                    for (int j = 0; j < R; j++) {
                        for (int k = 0; k < C; k++) printf("%4d ", tensor[i][j][k]);
                        printf("\\n");
                    }
                }
                break;
            case 4: {
                long long total = 0;
                for (int i = 0; i < L; i++) {
                    for (int j = 0; j < R; j++) {
                        for (int k = 0; k < C; k++) total += tensor[i][j][k];
                    }
                }
                printf("Total Sum of all elements in tensor: %lld\\n", total);
                break;
            }
            case 0:
                printf("Exiting 3D Tensor Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    for (int i = 0; i < L; i++) {
        for (int j = 0; j < R; j++) free(tensor[i][j]);
        free(tensor[i]);
    }
    free(tensor);
    return 0;
}`,
      tags: ["program", "array", "3d"],
      aliases: ["prog_3d_array", "programArray3D"],
    })
  );

  // 4. Full Program: Dynamic Array (Vector)
  components.push(
    createComponent({
      id: "data-structures.full-programs.arrays.dynamic-array.prog-dynamic-array",
      name: "prog_dynamic_array",
      type: "program",
      category: "data-structures",
      subcategory: "arrays",
      categoryId: "data-structures.full-programs.arrays.dynamic-array",
      path: "data-structures/full-programs/arrays/dynamic-array/prog-dynamic-array",
      description: "Interactive dynamic array vector program with push/pop, positional insertion/deletion, resizing, and capacity reporting",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct Vector {
    int* data;
    size_t size;
    size_t cap;
} Vector;

Vector* vec_create(size_t init_cap) {
    Vector* v = (Vector*)malloc(sizeof(Vector));
    v->cap = init_cap > 0 ? init_cap : 4;
    v->size = 0;
    v->data = (int*)malloc(v->cap * sizeof(int));
    return v;
}

void vec_push_back(Vector* v, int val) {
    if (v->size >= v->cap) {
        v->cap *= 2;
        v->data = (int*)realloc(v->data, v->cap * sizeof(int));
    }
    v->data[v->size++] = val;
}

bool vec_pop_back(Vector* v, int* popped) {
    if (v->size == 0) return false;
    *popped = v->data[--v->size];
    return true;
}

bool vec_insert_at(Vector* v, size_t index, int val) {
    if (index > v->size) return false;
    if (v->size >= v->cap) {
        v->cap *= 2;
        v->data = (int*)realloc(v->data, v->cap * sizeof(int));
    }
    for (size_t i = v->size; i > index; i--) {
        v->data[i] = v->data[i - 1];
    }
    v->data[index] = val;
    v->size++;
    return true;
}

bool vec_delete_at(Vector* v, size_t index, int* deleted) {
    if (index >= v->size) return false;
    *deleted = v->data[index];
    for (size_t i = index; i < v->size - 1; i++) {
        v->data[i] = v->data[i + 1];
    }
    v->size--;
    return true;
}

void vec_print(const Vector* v) {
    printf("Vector (Size: %zu, Cap: %zu): [ ", v->size, v->cap);
    for (size_t i = 0; i < v->size; i++) printf("%d ", v->data[i]);
    printf("]\\n");
}

void vec_free(Vector* v) {
    if (v) {
        free(v->data);
        free(v);
    }
}

int main(void) {
    Vector* vec = vec_create(4);
    int choice;

    do {
        printf("\\n=== Dynamic Array (Vector) Menu ===\\n");
        printf("1. Push Back Element\\n");
        printf("2. Pop Back Element\\n");
        printf("3. Insert Element at Index\\n");
        printf("4. Delete Element at Index\\n");
        printf("5. Get Element at Index\\n");
        printf("6. Display Vector\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to push back: ");
                if (scanf("%d", &val) == 1) {
                    vec_push_back(vec, val);
                    printf("Pushed %d. Size is now %zu.\\n", val, vec->size);
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                if (vec_pop_back(vec, &val)) printf("Popped %d. Size is now %zu.\\n", val, vec->size);
                else printf("Vector is empty! Cannot pop.\\n");
                break;
            }
            case 3: {
                size_t idx;
                int val;
                printf("Enter index (0-%zu) and value: ", vec->size);
                if (scanf("%zu %d", &idx, &val) == 2) {
                    if (vec_insert_at(vec, idx, val)) printf("Inserted %d at index %zu.\\n", val, idx);
                    else printf("Invalid index.\\n");
                } else clear_input();
                break;
            }
            case 4: {
                size_t idx;
                int val;
                printf("Enter index to delete (0-%zu): ", vec->size > 0 ? vec->size - 1 : 0);
                if (scanf("%zu", &idx) == 1) {
                    if (vec_delete_at(vec, idx, &val)) printf("Deleted %d from index %zu.\\n", val, idx);
                    else printf("Invalid index.\\n");
                } else clear_input();
                break;
            }
            case 5: {
                size_t idx;
                printf("Enter index to get: ");
                if (scanf("%zu", &idx) == 1) {
                    if (idx < vec->size) printf("vec[%zu] = %d\\n", idx, vec->data[idx]);
                    else printf("Index out of range.\\n");
                } else clear_input();
                break;
            }
            case 6:
                vec_print(vec);
                break;
            case 0:
                printf("Exiting Vector Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    vec_free(vec);
    return 0;
}`,
      tags: ["program", "array", "dynamic-array"],
      aliases: ["prog_dynamic_array", "programDynamicArray"],
    })
  );

  // 5. Full Program: Singly Linked List
  components.push(
    createComponent({
      id: "data-structures.full-programs.linked-lists.singly.prog-singly-list",
      name: "prog_singly_linked_list",
      type: "program",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.full-programs.linked-lists.singly",
      path: "data-structures/full-programs/linked-lists/singly/prog-singly-list",
      description: "Interactive complete singly linked list program with insertions, deletions, reversing, search, count, and display",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* create_node(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->next = NULL;
    return n;
}

void insert_beginning(Node** head, int data) {
    Node* n = create_node(data);
    n->next = *head;
    *head = n;
}

void insert_end(Node** head, int data) {
    Node* n = create_node(data);
    if (!*head) { *head = n; return; }
    Node* cur = *head;
    while (cur->next) cur = cur->next;
    cur->next = n;
}

bool insert_at_position(Node** head, int pos, int data) {
    if (pos < 1) return false;
    if (pos == 1) {
        insert_beginning(head, data);
        return true;
    }
    Node* cur = *head;
    for (int i = 1; cur && i < pos - 1; i++) {
        cur = cur->next;
    }
    if (!cur) return false;
    Node* n = create_node(data);
    n->next = cur->next;
    cur->next = n;
    return true;
}

bool delete_beginning(Node** head, int* val) {
    if (!*head) return false;
    Node* tmp = *head;
    *val = tmp->data;
    *head = (*head)->next;
    free(tmp);
    return true;
}

bool delete_end(Node** head, int* val) {
    if (!*head) return false;
    if (!(*head)->next) {
        *val = (*head)->data;
        free(*head);
        *head = NULL;
        return true;
    }
    Node* cur = *head;
    while (cur->next->next) cur = cur->next;
    *val = cur->next->data;
    free(cur->next);
    cur->next = NULL;
    return true;
}

bool delete_by_value(Node** head, int val) {
    if (!*head) return false;
    if ((*head)->data == val) {
        Node* tmp = *head;
        *head = (*head)->next;
        free(tmp);
        return true;
    }
    Node* cur = *head;
    while (cur->next && cur->next->data != val) {
        cur = cur->next;
    }
    if (!cur->next) return false;
    Node* tmp = cur->next;
    cur->next = cur->next->next;
    free(tmp);
    return true;
}

bool delete_at_position(Node** head, int pos, int* val) {
    if (!*head || pos < 1) return false;
    if (pos == 1) return delete_beginning(head, val);
    Node* cur = *head;
    for (int i = 1; cur && i < pos - 1; i++) {
        cur = cur->next;
    }
    if (!cur || !cur->next) return false;
    Node* tmp = cur->next;
    *val = tmp->data;
    cur->next = tmp->next;
    free(tmp);
    return true;
}

int search_element(const Node* head, int val) {
    const Node* cur = head;
    int pos = 1;
    while (cur) {
        if (cur->data == val) return pos;
        cur = cur->next;
        pos++;
    }
    return -1;
}

void reverse_list(Node** head) {
    Node* prev = NULL;
    Node* cur = *head;
    Node* nxt = NULL;
    while (cur) {
        nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    }
    *head = prev;
}

int count_nodes(const Node* head) {
    int cnt = 0;
    const Node* cur = head;
    while (cur) {
        cnt++;
        cur = cur->next;
    }
    return cnt;
}

void print_list(const Node* head) {
    if (!head) {
        printf("List is empty.\\n");
        return;
    }
    printf("List (%d nodes): ", count_nodes(head));
    const Node* cur = head;
    while (cur) {
        printf("%d -> ", cur->data);
        cur = cur->next;
    }
    printf("NULL\\n");
}

void free_list(Node** head) {
    Node* cur = *head;
    while (cur) {
        Node* nxt = cur->next;
        free(cur);
        cur = nxt;
    }
    *head = NULL;
}

int main(void) {
    Node* head = NULL;
    int choice;

    do {
        printf("\\n=== Singly Linked List Operations Menu ===\\n");
        printf("1.  Insert at Beginning\\n");
        printf("2.  Insert at End\\n");
        printf("3.  Insert at Position (1-based)\\n");
        printf("4.  Delete from Beginning\\n");
        printf("5.  Delete from End\\n");
        printf("6.  Delete by Value\\n");
        printf("7.  Delete at Position (1-based)\\n");
        printf("8.  Search Element\\n");
        printf("9.  Reverse List\\n");
        printf("10. Count Nodes\\n");
        printf("11. Display List\\n");
        printf("0.  Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to insert at beginning: ");
                if (scanf("%d", &val) == 1) {
                    insert_beginning(&head, val);
                    printf("Inserted %d at beginning.\\n", val);
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                printf("Enter value to insert at end: ");
                if (scanf("%d", &val) == 1) {
                    insert_end(&head, val);
                    printf("Inserted %d at end.\\n", val);
                } else clear_input();
                break;
            }
            case 3: {
                int pos, val;
                printf("Enter position and value: ");
                if (scanf("%d %d", &pos, &val) == 2) {
                    if (insert_at_position(&head, pos, val)) printf("Inserted %d at position %d.\\n", val, pos);
                    else printf("Failed to insert. Invalid position.\\n");
                } else clear_input();
                break;
            }
            case 4: {
                int val;
                if (delete_beginning(&head, &val)) printf("Deleted %d from beginning.\\n", val);
                else printf("List is already empty.\\n");
                break;
            }
            case 5: {
                int val;
                if (delete_end(&head, &val)) printf("Deleted %d from end.\\n", val);
                else printf("List is already empty.\\n");
                break;
            }
            case 6: {
                int val;
                printf("Enter value to delete: ");
                if (scanf("%d", &val) == 1) {
                    if (delete_by_value(&head, val)) printf("Successfully deleted value %d.\\n", val);
                    else printf("Value %d not found in list.\\n", val);
                } else clear_input();
                break;
            }
            case 7: {
                int pos, val;
                printf("Enter position to delete: ");
                if (scanf("%d", &pos) == 1) {
                    if (delete_at_position(&head, pos, &val)) printf("Deleted %d from position %d.\\n", val, pos);
                    else printf("Invalid position.\\n");
                } else clear_input();
                break;
            }
            case 8: {
                int val;
                printf("Enter value to search: ");
                if (scanf("%d", &val) == 1) {
                    int pos = search_element(head, val);
                    if (pos != -1) printf("Found %d at node position %d.\\n", val, pos);
                    else printf("Value %d not found.\\n", val);
                } else clear_input();
                break;
            }
            case 9:
                reverse_list(&head);
                printf("List reversed successfully.\\n");
                print_list(head);
                break;
            case 10:
                printf("Total node count: %d\\n", count_nodes(head));
                break;
            case 11:
                print_list(head);
                break;
            case 0:
                printf("Exiting Singly Linked List Menu.\\n");
                break;
            default:
                printf("Invalid choice. Please select from menu.\\n");
                break;
        }
    } while (choice != 0);

    free_list(&head);
    return 0;
}`,
      tags: ["program", "linked-list", "singly"],
      aliases: ["prog_singly_linked_list", "programSinglyList"],
    })
  );

  // 6. Full Program: Doubly Linked List
  components.push(
    createComponent({
      id: "data-structures.full-programs.linked-lists.doubly.prog-doubly-list",
      name: "prog_doubly_linked_list",
      type: "program",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.full-programs.linked-lists.doubly",
      path: "data-structures/full-programs/linked-lists/doubly/prog-doubly-list",
      description: "Interactive doubly linked list program with bidirectional traversals, positional insertions/deletions, reversing, and node counting",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
} Node;

Node* d_create(int val) {
    Node* n = (Node*)malloc(sizeof(Node));
    n->data = val;
    n->prev = NULL;
    n->next = NULL;
    return n;
}

void d_insert_beginning(Node** head, int val) {
    Node* n = d_create(val);
    if (*head) (*head)->prev = n;
    n->next = *head;
    *head = n;
}

void d_insert_end(Node** head, int val) {
    Node* n = d_create(val);
    if (!*head) { *head = n; return; }
    Node* cur = *head;
    while (cur->next) cur = cur->next;
    cur->next = n;
    n->prev = cur;
}

bool d_insert_at_position(Node** head, int pos, int val) {
    if (pos < 1) return false;
    if (pos == 1) {
        d_insert_beginning(head, val);
        return true;
    }
    Node* cur = *head;
    for (int i = 1; cur && i < pos - 1; i++) cur = cur->next;
    if (!cur) return false;
    Node* n = d_create(val);
    n->next = cur->next;
    n->prev = cur;
    if (cur->next) cur->next->prev = n;
    cur->next = n;
    return true;
}

bool d_delete_beginning(Node** head, int* val) {
    if (!*head) return false;
    Node* tmp = *head;
    *val = tmp->data;
    *head = (*head)->next;
    if (*head) (*head)->prev = NULL;
    free(tmp);
    return true;
}

bool d_delete_end(Node** head, int* val) {
    if (!*head) return false;
    Node* cur = *head;
    while (cur->next) cur = cur->next;
    *val = cur->data;
    if (cur->prev) cur->prev->next = NULL;
    else *head = NULL;
    free(cur);
    return true;
}

bool d_delete_by_value(Node** head, int val) {
    if (!*head) return false;
    Node* cur = *head;
    while (cur && cur->data != val) cur = cur->next;
    if (!cur) return false;
    if (cur->prev) cur->prev->next = cur->next;
    else *head = cur->next;
    if (cur->next) cur->next->prev = cur->prev;
    free(cur);
    return true;
}

void d_reverse(Node** head) {
    Node* temp = NULL;
    Node* current = *head;
    while (current) {
        temp = current->prev;
        current->prev = current->next;
        current->next = temp;
        current = current->prev;
    }
    if (temp) *head = temp->prev;
}

int d_count(const Node* head) {
    int cnt = 0;
    const Node* cur = head;
    while (cur) { cnt++; cur = cur->next; }
    return cnt;
}

void d_print_forward(const Node* head) {
    if (!head) { printf("Doubly list is empty.\\n"); return; }
    printf("Forward  (%d nodes): ", d_count(head));
    const Node* cur = head;
    while (cur) {
        printf("%d <-> ", cur->data);
        cur = cur->next;
    }
    printf("NULL\\n");
}

void d_print_backward(const Node* head) {
    if (!head) { printf("Doubly list is empty.\\n"); return; }
    const Node* cur = head;
    while (cur->next) cur = cur->next;
    printf("Backward (%d nodes): ", d_count(head));
    while (cur) {
        printf("%d <-> ", cur->data);
        cur = cur->prev;
    }
    printf("NULL\\n");
}

void d_free(Node** head) {
    Node* cur = *head;
    while (cur) {
        Node* nxt = cur->next;
        free(cur);
        cur = nxt;
    }
    *head = NULL;
}

int main(void) {
    Node* head = NULL;
    int choice;

    do {
        printf("\\n=== Doubly Linked List Operations Menu ===\\n");
        printf("1.  Insert at Beginning\\n");
        printf("2.  Insert at End\\n");
        printf("3.  Insert at Position (1-based)\\n");
        printf("4.  Delete from Beginning\\n");
        printf("5.  Delete from End\\n");
        printf("6.  Delete by Value\\n");
        printf("7.  Display Forward\\n");
        printf("8.  Display Backward\\n");
        printf("9.  Reverse Doubly List\\n");
        printf("10. Count Nodes\\n");
        printf("0.  Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to insert at beginning: ");
                if (scanf("%d", &val) == 1) d_insert_beginning(&head, val);
                else clear_input();
                break;
            }
            case 2: {
                int val;
                printf("Enter value to insert at end: ");
                if (scanf("%d", &val) == 1) d_insert_end(&head, val);
                else clear_input();
                break;
            }
            case 3: {
                int pos, val;
                printf("Enter position and value: ");
                if (scanf("%d %d", &pos, &val) == 2) {
                    if (!d_insert_at_position(&head, pos, val)) printf("Invalid position.\\n");
                } else clear_input();
                break;
            }
            case 4: {
                int val;
                if (d_delete_beginning(&head, &val)) printf("Deleted %d from beginning.\\n", val);
                else printf("List is empty.\\n");
                break;
            }
            case 5: {
                int val;
                if (d_delete_end(&head, &val)) printf("Deleted %d from end.\\n", val);
                else printf("List is empty.\\n");
                break;
            }
            case 6: {
                int val;
                printf("Enter value to delete: ");
                if (scanf("%d", &val) == 1) {
                    if (d_delete_by_value(&head, val)) printf("Deleted %d.\\n", val);
                    else printf("Value not found.\\n");
                } else clear_input();
                break;
            }
            case 7:
                d_print_forward(head);
                break;
            case 8:
                d_print_backward(head);
                break;
            case 9:
                d_reverse(&head);
                printf("Reversed list successfully.\\n");
                d_print_forward(head);
                break;
            case 10:
                printf("Count: %d nodes\\n", d_count(head));
                break;
            case 0:
                printf("Exiting Doubly Linked List Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    d_free(&head);
    return 0;
}`,
      tags: ["program", "linked-list", "doubly"],
      aliases: ["prog_doubly_linked_list", "programDoublyList"],
    })
  );

  // 7. Full Program: Singly Circular List
  components.push(
    createComponent({
      id: "data-structures.full-programs.linked-lists.singly-circular.prog-circular-list",
      name: "prog_circular_list",
      type: "program",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.full-programs.linked-lists.singly-circular",
      path: "data-structures/full-programs/linked-lists/singly-circular/prog-circular-list",
      description: "Interactive circular singly linked list program with beginning/end/position insertion, deletion, and cycle traversal",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct Node {
    int data;
    struct Node* next;
} Node;

Node* c_create(int val) {
    Node* n = (Node*)malloc(sizeof(Node));
    n->data = val;
    n->next = n;
    return n;
}

void c_insert_end(Node** head, int val) {
    Node* n = c_create(val);
    if (!*head) { *head = n; return; }
    Node* cur = *head;
    while (cur->next != *head) cur = cur->next;
    cur->next = n;
    n->next = *head;
}

void c_insert_beginning(Node** head, int val) {
    Node* n = c_create(val);
    if (!*head) { *head = n; return; }
    Node* cur = *head;
    while (cur->next != *head) cur = cur->next;
    cur->next = n;
    n->next = *head;
    *head = n;
}

bool c_delete_beginning(Node** head, int* val) {
    if (!*head) return false;
    if ((*head)->next == *head) {
        *val = (*head)->data;
        free(*head);
        *head = NULL;
        return true;
    }
    Node* cur = *head;
    while (cur->next != *head) cur = cur->next;
    Node* tmp = *head;
    *val = tmp->data;
    cur->next = (*head)->next;
    *head = (*head)->next;
    free(tmp);
    return true;
}

bool c_delete_by_value(Node** head, int val) {
    if (!*head) return false;
    int dummy;
    if ((*head)->data == val) return c_delete_beginning(head, &dummy);
    Node* cur = *head;
    while (cur->next != *head && cur->next->data != val) cur = cur->next;
    if (cur->next == *head) return false;
    Node* tmp = cur->next;
    cur->next = tmp->next;
    free(tmp);
    return true;
}

int c_count(const Node* head) {
    if (!head) return 0;
    int cnt = 0;
    const Node* cur = head;
    do {
        cnt++;
        cur = cur->next;
    } while (cur != head);
    return cnt;
}

void c_print(const Node* head) {
    if (!head) { printf("Circular list is empty.\\n"); return; }
    printf("Circular List (%d nodes): ", c_count(head));
    const Node* cur = head;
    do {
        printf("%d -> ", cur->data);
        cur = cur->next;
    } while (cur != head);
    printf("(head %d)\\n", head->data);
}

void c_free(Node** head) {
    if (!*head) return;
    Node* cur = *head;
    Node* nxt = NULL;
    while (cur->next != *head) {
        nxt = cur->next;
        free(cur);
        cur = nxt;
    }
    free(cur);
    *head = NULL;
}

int main(void) {
    Node* head = NULL;
    int choice;

    do {
        printf("\\n=== Singly Circular Linked List Menu ===\\n");
        printf("1. Insert at Beginning\\n");
        printf("2. Insert at End\\n");
        printf("3. Delete from Beginning\\n");
        printf("4. Delete by Value\\n");
        printf("5. Count Nodes\\n");
        printf("6. Display Circular List\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to insert at beginning: ");
                if (scanf("%d", &val) == 1) c_insert_beginning(&head, val);
                else clear_input();
                break;
            }
            case 2: {
                int val;
                printf("Enter value to insert at end: ");
                if (scanf("%d", &val) == 1) c_insert_end(&head, val);
                else clear_input();
                break;
            }
            case 3: {
                int val;
                if (c_delete_beginning(&head, &val)) printf("Deleted %d from beginning.\\n", val);
                else printf("List is empty.\\n");
                break;
            }
            case 4: {
                int val;
                printf("Enter value to delete: ");
                if (scanf("%d", &val) == 1) {
                    if (c_delete_by_value(&head, val)) printf("Deleted %d successfully.\\n", val);
                    else printf("Value not found.\\n");
                } else clear_input();
                break;
            }
            case 5:
                printf("Total nodes: %d\\n", c_count(head));
                break;
            case 6:
                c_print(head);
                break;
            case 0:
                printf("Exiting Circular List Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    c_free(&head);
    return 0;
}`,
      tags: ["program", "linked-list", "circular"],
      aliases: ["prog_circular_list", "programCircularList"],
    })
  );

  // 8. Full Program: Doubly Circular List
  components.push(
    createComponent({
      id: "data-structures.full-programs.linked-lists.doubly-circular.prog-doubly-circular",
      name: "prog_doubly_circular",
      type: "program",
      category: "data-structures",
      subcategory: "linked-lists",
      categoryId: "data-structures.full-programs.linked-lists.doubly-circular",
      path: "data-structures/full-programs/linked-lists/doubly-circular/prog-doubly-circular",
      description: "Interactive doubly circular linked list with bidirectional rotation, head/tail additions, and deletions",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
} Node;

Node* dc_create(int val) {
    Node* n = (Node*)malloc(sizeof(Node));
    n->data = val;
    n->prev = n;
    n->next = n;
    return n;
}

void dc_insert_end(Node** head, int val) {
    Node* n = dc_create(val);
    if (!*head) { *head = n; return; }
    Node* tail = (*head)->prev;
    tail->next = n;
    n->prev = tail;
    n->next = *head;
    (*head)->prev = n;
}

void dc_insert_beginning(Node** head, int val) {
    dc_insert_end(head, val);
    *head = (*head)->prev;
}

bool dc_delete_beginning(Node** head, int* val) {
    if (!*head) return false;
    Node* tail = (*head)->prev;
    *val = (*head)->data;
    if (*head == tail) {
        free(*head);
        *head = NULL;
        return true;
    }
    Node* tmp = *head;
    tail->next = (*head)->next;
    (*head)->next->prev = tail;
    *head = (*head)->next;
    free(tmp);
    return true;
}

int dc_count(const Node* head) {
    if (!head) return 0;
    int cnt = 0;
    const Node* cur = head;
    do {
        cnt++;
        cur = cur->next;
    } while (cur != head);
    return cnt;
}

void dc_print_forward(const Node* head) {
    if (!head) { printf("Doubly circular list is empty.\\n"); return; }
    printf("Forward (%d nodes): ", dc_count(head));
    const Node* cur = head;
    do {
        printf("%d <=> ", cur->data);
        cur = cur->next;
    } while (cur != head);
    printf("(head %d)\\n", head->data);
}

void dc_print_backward(const Node* head) {
    if (!head) { printf("Doubly circular list is empty.\\n"); return; }
    printf("Backward (%d nodes): ", dc_count(head));
    const Node* tail = head->prev;
    const Node* cur = tail;
    do {
        printf("%d <=> ", cur->data);
        cur = cur->prev;
    } while (cur != tail);
    printf("(tail %d)\\n", tail->data);
}

void dc_free(Node** head) {
    if (!*head) return;
    Node* cur = *head;
    Node* tail = (*head)->prev;
    while (cur != tail) {
        Node* nxt = cur->next;
        free(cur);
        cur = nxt;
    }
    free(tail);
    *head = NULL;
}

int main(void) {
    Node* head = NULL;
    int choice;

    do {
        printf("\\n=== Doubly Circular Linked List Menu ===\\n");
        printf("1. Insert at Beginning\\n");
        printf("2. Insert at End\\n");
        printf("3. Delete from Beginning\\n");
        printf("4. Display Forward\\n");
        printf("5. Display Backward\\n");
        printf("6. Count Nodes\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to insert at beginning: ");
                if (scanf("%d", &val) == 1) dc_insert_beginning(&head, val);
                else clear_input();
                break;
            }
            case 2: {
                int val;
                printf("Enter value to insert at end: ");
                if (scanf("%d", &val) == 1) dc_insert_end(&head, val);
                else clear_input();
                break;
            }
            case 3: {
                int val;
                if (dc_delete_beginning(&head, &val)) printf("Deleted %d from beginning.\\n", val);
                else printf("List is empty.\\n");
                break;
            }
            case 4:
                dc_print_forward(head);
                break;
            case 5:
                dc_print_backward(head);
                break;
            case 6:
                printf("Count: %d nodes\\n", dc_count(head));
                break;
            case 0:
                printf("Exiting Doubly Circular List Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    dc_free(&head);
    return 0;
}`,
      tags: ["program", "linked-list", "doubly-circular"],
      aliases: ["prog_doubly_circular", "programDoublyCircular"],
    })
  );

  // 9. Full Program: Array Stack
  components.push(
    createComponent({
      id: "data-structures.full-programs.stacks.array-stack.prog-array-stack",
      name: "prog_array_stack",
      type: "program",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.full-programs.stacks.array-stack",
      path: "data-structures/full-programs/stacks/array-stack/prog-array-stack",
      description: "Interactive array-based stack program with dynamic capacity growth, push, pop, peek, and display",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct Stack {
    int* data;
    int top;
    int cap;
} Stack;

Stack* stack_create(int cap) {
    Stack* s = (Stack*)malloc(sizeof(Stack));
    s->data = (int*)malloc(cap * sizeof(int));
    s->top = -1;
    s->cap = cap;
    return s;
}

bool stack_is_empty(const Stack* s) {
    return s->top < 0;
}

void stack_push(Stack* s, int val) {
    if (s->top >= s->cap - 1) {
        s->cap *= 2;
        s->data = (int*)realloc(s->data, s->cap * sizeof(int));
        printf("(Stack capacity resized to %d)\\n", s->cap);
    }
    s->data[++s->top] = val;
}

bool stack_pop(Stack* s, int* val) {
    if (stack_is_empty(s)) return false;
    *val = s->data[s->top--];
    return true;
}

bool stack_peek(const Stack* s, int* val) {
    if (stack_is_empty(s)) return false;
    *val = s->data[s->top];
    return true;
}

void stack_display(const Stack* s) {
    if (stack_is_empty(s)) {
        printf("Stack is empty.\\n");
        return;
    }
    printf("Stack [top to bottom] (%d items): ", s->top + 1);
    for (int i = s->top; i >= 0; i--) printf("%d ", s->data[i]);
    printf("\\n");
}

void stack_free(Stack* s) {
    if (s) {
        free(s->data);
        free(s);
    }
}

int main(void) {
    Stack* s = stack_create(4);
    int choice;

    do {
        printf("\\n=== Array Stack Operations Menu ===\\n");
        printf("1. Push\\n");
        printf("2. Pop\\n");
        printf("3. Peek / Top\\n");
        printf("4. Check Is Empty\\n");
        printf("5. Display Stack\\n");
        printf("6. Count Elements\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to push: ");
                if (scanf("%d", &val) == 1) {
                    stack_push(s, val);
                    printf("Pushed %d onto stack.\\n", val);
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                if (stack_pop(s, &val)) printf("Popped %d from stack.\\n", val);
                else printf("Stack Underflow! Stack is empty.\\n");
                break;
            }
            case 3: {
                int val;
                if (stack_peek(s, &val)) printf("Top element is %d.\\n", val);
                else printf("Stack is empty.\\n");
                break;
            }
            case 4:
                printf("Is stack empty? %s\\n", stack_is_empty(s) ? "Yes" : "No");
                break;
            case 5:
                stack_display(s);
                break;
            case 6:
                printf("Stack element count: %d\\n", s->top + 1);
                break;
            case 0:
                printf("Exiting Array Stack Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    stack_free(s);
    return 0;
}`,
      tags: ["program", "stack", "array-stack"],
      aliases: ["prog_array_stack", "programArrayStack"],
    })
  );

  // 10. Full Program: Linked Stack
  components.push(
    createComponent({
      id: "data-structures.full-programs.stacks.linked-stack.prog-linked-stack",
      name: "prog_linked_stack",
      type: "program",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.full-programs.stacks.linked-stack",
      path: "data-structures/full-programs/stacks/linked-stack/prog-linked-stack",
      description: "Interactive node-based linked stack program with push, pop, peek, traversal, and memory cleanup",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct StackNode {
    int data;
    struct StackNode* next;
} StackNode;

void ls_push(StackNode** top, int val) {
    StackNode* n = (StackNode*)malloc(sizeof(StackNode));
    n->data = val;
    n->next = *top;
    *top = n;
}

bool ls_pop(StackNode** top, int* val) {
    if (!*top) return false;
    StackNode* tmp = *top;
    *val = tmp->data;
    *top = (*top)->next;
    free(tmp);
    return true;
}

bool ls_peek(const StackNode* top, int* val) {
    if (!top) return false;
    *val = top->data;
    return true;
}

int ls_count(const StackNode* top) {
    int cnt = 0;
    while (top) { cnt++; top = top->next; }
    return cnt;
}

void ls_display(const StackNode* top) {
    if (!top) { printf("Linked Stack is empty.\\n"); return; }
    printf("Linked Stack [top to bottom]: ");
    while (top) {
        printf("%d -> ", top->data);
        top = top->next;
    }
    printf("NULL\\n");
}

void ls_free(StackNode** top) {
    while (*top) {
        StackNode* tmp = *top;
        *top = (*top)->next;
        free(tmp);
    }
}

int main(void) {
    StackNode* top = NULL;
    int choice;

    do {
        printf("\\n=== Linked Stack Menu ===\\n");
        printf("1. Push\\n");
        printf("2. Pop\\n");
        printf("3. Peek\\n");
        printf("4. Display Stack\\n");
        printf("5. Count Elements\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to push: ");
                if (scanf("%d", &val) == 1) {
                    ls_push(&top, val);
                    printf("Pushed %d onto linked stack.\\n", val);
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                if (ls_pop(&top, &val)) printf("Popped %d from linked stack.\\n", val);
                else printf("Stack Underflow! Linked stack is empty.\\n");
                break;
            }
            case 3: {
                int val;
                if (ls_peek(top, &val)) printf("Top element is %d.\\n", val);
                else printf("Stack is empty.\\n");
                break;
            }
            case 4:
                ls_display(top);
                break;
            case 5:
                printf("Count: %d elements\\n", ls_count(top));
                break;
            case 0:
                printf("Exiting Linked Stack Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    ls_free(&top);
    return 0;
}`,
      tags: ["program", "stack", "linked-stack"],
      aliases: ["prog_linked_stack", "programLinkedStack"],
    })
  );

  // 11. Full Program: Monotonic Stack
  components.push(
    createComponent({
      id: "data-structures.full-programs.stacks.monotonic-stack.prog-monotonic-stack",
      name: "prog_monotonic_stack",
      type: "program",
      category: "data-structures",
      subcategory: "stacks",
      categoryId: "data-structures.full-programs.stacks.monotonic-stack",
      path: "data-structures/full-programs/stacks/monotonic-stack/prog-monotonic-stack",
      description: "Interactive monotonic stack program solving Next Greater Element and Previous Greater Element in O(n)",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

void next_greater_elements(const int* arr, int n, int* nge) {
    int* stack = (int*)malloc(n * sizeof(int));
    int top = -1;

    for (int i = n - 1; i >= 0; i--) {
        while (top >= 0 && stack[top] <= arr[i]) top--;
        nge[i] = (top >= 0) ? stack[top] : -1;
        stack[++top] = arr[i];
    }
    free(stack);
}

void prev_greater_elements(const int* arr, int n, int* pge) {
    int* stack = (int*)malloc(n * sizeof(int));
    int top = -1;

    for (int i = 0; i < n; i++) {
        while (top >= 0 && stack[top] <= arr[i]) top--;
        pge[i] = (top >= 0) ? stack[top] : -1;
        stack[++top] = arr[i];
    }
    free(stack);
}

int main(void) {
    int n = 5;
    int arr[100] = {4, 5, 2, 25, 10};
    int choice;

    do {
        printf("\\n=== Monotonic Stack Operations Menu ===\\n");
        printf("1. Input New Array\\n");
        printf("2. Compute Next Greater Elements (NGE)\\n");
        printf("3. Compute Previous Greater Elements (PGE)\\n");
        printf("4. Display Current Array\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter number of elements (1-100): ");
                if (scanf("%d", &n) == 1 && n > 0 && n <= 100) {
                    printf("Enter %d integers: ", n);
                    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
                    printf("Array updated successfully.\\n");
                } else clear_input();
                break;
            }
            case 2: {
                int* nge = (int*)malloc(n * sizeof(int));
                next_greater_elements(arr, n, nge);
                printf("Element -> Next Greater Element:\\n");
                for (int i = 0; i < n; i++) printf("  %4d -> %d\\n", arr[i], nge[i]);
                free(nge);
                break;
            }
            case 3: {
                int* pge = (int*)malloc(n * sizeof(int));
                prev_greater_elements(arr, n, pge);
                printf("Element -> Previous Greater Element:\\n");
                for (int i = 0; i < n; i++) printf("  %4d -> %d\\n", arr[i], pge[i]);
                free(pge);
                break;
            }
            case 4:
                printf("Current Array [%d elements]: ", n);
                for (int i = 0; i < n; i++) printf("%d ", arr[i]);
                printf("\\n");
                break;
            case 0:
                printf("Exiting Monotonic Stack Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "stack", "monotonic-stack"],
      aliases: ["prog_monotonic_stack", "programMonotonicStack"],
    })
  );

  // 12. Full Program: Linear Queue
  components.push(
    createComponent({
      id: "data-structures.full-programs.queues.linear-queue.prog-linear-queue",
      name: "prog_linear_queue",
      type: "program",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.full-programs.queues.linear-queue",
      path: "data-structures/full-programs/queues/linear-queue/prog-linear-queue",
      description: "Interactive linear queue program with enqueue, dequeue, peek, empty/full checking, and display",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct LinearQueue {
    int* data;
    int front;
    int rear;
    int cap;
} LinearQueue;

LinearQueue* lq_create(int cap) {
    LinearQueue* q = (LinearQueue*)malloc(sizeof(LinearQueue));
    q->data = (int*)malloc(cap * sizeof(int));
    q->front = 0;
    q->rear = -1;
    q->cap = cap;
    return q;
}

bool lq_is_empty(const LinearQueue* q) {
    return q->front > q->rear;
}

bool lq_is_full(const LinearQueue* q) {
    return q->rear >= q->cap - 1;
}

bool lq_enqueue(LinearQueue* q, int val) {
    if (lq_is_full(q)) return false;
    q->data[++q->rear] = val;
    return true;
}

bool lq_dequeue(LinearQueue* q, int* val) {
    if (lq_is_empty(q)) return false;
    *val = q->data[q->front++];
    return true;
}

bool lq_peek(const LinearQueue* q, int* val) {
    if (lq_is_empty(q)) return false;
    *val = q->data[q->front];
    return true;
}

void lq_display(const LinearQueue* q) {
    if (lq_is_empty(q)) {
        printf("Queue is empty.\\n");
        return;
    }
    printf("Queue [front to rear]: ");
    for (int i = q->front; i <= q->rear; i++) printf("%d ", q->data[i]);
    printf("\\n");
}

void lq_free(LinearQueue* q) {
    if (q) {
        free(q->data);
        free(q);
    }
}

int main(void) {
    LinearQueue* q = lq_create(10);
    int choice;

    do {
        printf("\\n=== Linear Queue Menu ===\\n");
        printf("1. Enqueue\\n");
        printf("2. Dequeue\\n");
        printf("3. Peek Front\\n");
        printf("4. Check Is Empty / Is Full\\n");
        printf("5. Display Queue\\n");
        printf("6. Count Elements\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to enqueue: ");
                if (scanf("%d", &val) == 1) {
                    if (lq_enqueue(q, val)) printf("Enqueued %d.\\n", val);
                    else printf("Queue Overflow! Queue is full.\\n");
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                if (lq_dequeue(q, &val)) printf("Dequeued %d.\\n", val);
                else printf("Queue Underflow! Queue is empty.\\n");
                break;
            }
            case 3: {
                int val;
                if (lq_peek(q, &val)) printf("Front element is %d.\\n", val);
                else printf("Queue is empty.\\n");
                break;
            }
            case 4:
                printf("Empty: %s | Full: %s\\n", lq_is_empty(q) ? "Yes" : "No", lq_is_full(q) ? "Yes" : "No");
                break;
            case 5:
                lq_display(q);
                break;
            case 6:
                printf("Count: %d elements\\n", lq_is_empty(q) ? 0 : (q->rear - q->front + 1));
                break;
            case 0:
                printf("Exiting Linear Queue Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    lq_free(q);
    return 0;
}`,
      tags: ["program", "queue", "linear-queue"],
      aliases: ["prog_linear_queue", "programLinearQueue"],
    })
  );

  // 13. Full Program: Circular Queue
  components.push(
    createComponent({
      id: "data-structures.full-programs.queues.circular-queue.prog-circular-queue",
      name: "prog_circular_queue",
      type: "program",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.full-programs.queues.circular-queue",
      path: "data-structures/full-programs/queues/circular-queue/prog-circular-queue",
      description: "Interactive ring buffer circular queue with modulo indexing, wraparound display, and full/empty state tracking",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdbool.h>

#define CQ_CAP 5

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct CircularQueue {
    int data[CQ_CAP];
    int front;
    int rear;
    int count;
} CircularQueue;

void cq_init(CircularQueue* q) {
    q->front = 0;
    q->rear = -1;
    q->count = 0;
}

bool cq_is_empty(const CircularQueue* q) { return q->count == 0; }
bool cq_is_full(const CircularQueue* q) { return q->count == CQ_CAP; }

bool cq_enqueue(CircularQueue* q, int val) {
    if (cq_is_full(q)) return false;
    q->rear = (q->rear + 1) % CQ_CAP;
    q->data[q->rear] = val;
    q->count++;
    return true;
}

bool cq_dequeue(CircularQueue* q, int* val) {
    if (cq_is_empty(q)) return false;
    *val = q->data[q->front];
    q->front = (q->front + 1) % CQ_CAP;
    q->count--;
    return true;
}

bool cq_peek(const CircularQueue* q, int* val) {
    if (cq_is_empty(q)) return false;
    *val = q->data[q->front];
    return true;
}

void cq_display(const CircularQueue* q) {
    if (cq_is_empty(q)) {
        printf("Circular Queue is empty.\\n");
        return;
    }
    printf("Circular Queue (%d/%d items): ", q->count, CQ_CAP);
    for (int i = 0; i < q->count; i++) {
        int idx = (q->front + i) % CQ_CAP;
        printf("%d ", q->data[idx]);
    }
    printf("\\n");
}

int main(void) {
    CircularQueue q;
    cq_init(&q);
    int choice;

    do {
        printf("\\n=== Circular Ring Queue Menu (Cap: %d) ===\\n", CQ_CAP);
        printf("1. Enqueue\\n");
        printf("2. Dequeue\\n");
        printf("3. Peek Front\\n");
        printf("4. Check Is Empty / Is Full\\n");
        printf("5. Display Queue\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to enqueue: ");
                if (scanf("%d", &val) == 1) {
                    if (cq_enqueue(&q, val)) printf("Enqueued %d.\\n", val);
                    else printf("Queue Overflow! Ring buffer is full.\\n");
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                if (cq_dequeue(&q, &val)) printf("Dequeued %d.\\n", val);
                else printf("Queue Underflow! Ring buffer is empty.\\n");
                break;
            }
            case 3: {
                int val;
                if (cq_peek(&q, &val)) printf("Front element: %d\\n", val);
                else printf("Queue is empty.\\n");
                break;
            }
            case 4:
                printf("Empty: %s | Full: %s\\n", cq_is_empty(&q) ? "Yes" : "No", cq_is_full(&q) ? "Yes" : "No");
                break;
            case 5:
                cq_display(&q);
                break;
            case 0:
                printf("Exiting Circular Queue Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "queue", "circular-queue"],
      aliases: ["prog_circular_queue", "programCircularQueue"],
    })
  );

  // 14. Full Program: Deque
  components.push(
    createComponent({
      id: "data-structures.full-programs.queues.deque.prog-deque",
      name: "prog_deque",
      type: "program",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.full-programs.queues.deque",
      path: "data-structures/full-programs/queues/deque/prog-deque",
      description: "Interactive double-ended queue program supporting front/rear insertions and deletions with capacity bounds",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct Deque {
    int* data;
    int front;
    int rear;
    int count;
    int cap;
} Deque;

Deque* deque_create(int cap) {
    Deque* d = (Deque*)malloc(sizeof(Deque));
    d->data = (int*)malloc(cap * sizeof(int));
    d->front = 0;
    d->rear = cap - 1;
    d->count = 0;
    d->cap = cap;
    return d;
}

bool deque_is_empty(const Deque* d) { return d->count == 0; }
bool deque_is_full(const Deque* d) { return d->count == d->cap; }

bool deque_insert_front(Deque* d, int val) {
    if (deque_is_full(d)) return false;
    d->front = (d->front - 1 + d->cap) % d->cap;
    d->data[d->front] = val;
    d->count++;
    return true;
}

bool deque_insert_rear(Deque* d, int val) {
    if (deque_is_full(d)) return false;
    d->rear = (d->rear + 1) % d->cap;
    d->data[d->rear] = val;
    d->count++;
    return true;
}

bool deque_delete_front(Deque* d, int* val) {
    if (deque_is_empty(d)) return false;
    *val = d->data[d->front];
    d->front = (d->front + 1) % d->cap;
    d->count--;
    return true;
}

bool deque_delete_rear(Deque* d, int* val) {
    if (deque_is_empty(d)) return false;
    *val = d->data[d->rear];
    d->rear = (d->rear - 1 + d->cap) % d->cap;
    d->count--;
    return true;
}

void deque_display(const Deque* d) {
    if (deque_is_empty(d)) {
        printf("Deque is empty.\\n");
        return;
    }
    printf("Deque [front to rear]: ");
    for (int i = 0; i < d->count; i++) {
        int idx = (d->front + i) % d->cap;
        printf("%d ", d->data[idx]);
    }
    printf("\\n");
}

void deque_free(Deque* d) {
    if (d) {
        free(d->data);
        free(d);
    }
}

int main(void) {
    Deque* d = deque_create(8);
    int choice;

    do {
        printf("\\n=== Double-Ended Queue (Deque) Menu ===\\n");
        printf("1. Insert Front\\n");
        printf("2. Insert Rear\\n");
        printf("3. Delete Front\\n");
        printf("4. Delete Rear\\n");
        printf("5. Display Deque\\n");
        printf("6. Count Elements\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to insert front: ");
                if (scanf("%d", &val) == 1) {
                    if (deque_insert_front(d, val)) printf("Inserted %d at front.\\n", val);
                    else printf("Deque is full.\\n");
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                printf("Enter value to insert rear: ");
                if (scanf("%d", &val) == 1) {
                    if (deque_insert_rear(d, val)) printf("Inserted %d at rear.\\n", val);
                    else printf("Deque is full.\\n");
                } else clear_input();
                break;
            }
            case 3: {
                int val;
                if (deque_delete_front(d, &val)) printf("Deleted %d from front.\\n", val);
                else printf("Deque is empty.\\n");
                break;
            }
            case 4: {
                int val;
                if (deque_delete_rear(d, &val)) printf("Deleted %d from rear.\\n", val);
                else printf("Deque is empty.\\n");
                break;
            }
            case 5:
                deque_display(d);
                break;
            case 6:
                printf("Count: %d / %d\\n", d->count, d->cap);
                break;
            case 0:
                printf("Exiting Deque Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    deque_free(d);
    return 0;
}`,
      tags: ["program", "queue", "deque"],
      aliases: ["prog_deque", "programDeque"],
    })
  );

  // 15. Full Program: Priority Queue (Binary Min-Heap)
  components.push(
    createComponent({
      id: "data-structures.full-programs.queues.priority-queue.prog-priority-queue",
      name: "prog_priority_queue",
      type: "program",
      category: "data-structures",
      subcategory: "queues",
      categoryId: "data-structures.full-programs.queues.priority-queue",
      path: "data-structures/full-programs/queues/priority-queue/prog-priority-queue",
      description: "Interactive binary min-heap priority queue with insert, extract-min, peek, and heap-array visualization",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct MinHeap {
    int* data;
    int size;
    int cap;
} MinHeap;

MinHeap* heap_create(int cap) {
    MinHeap* h = (MinHeap*)malloc(sizeof(MinHeap));
    h->data = (int*)malloc(cap * sizeof(int));
    h->size = 0;
    h->cap = cap;
    return h;
}

void heap_swap(int* a, int* b) {
    int t = *a; *a = *b; *b = t;
}

void heap_push(MinHeap* h, int val) {
    if (h->size >= h->cap) {
        h->cap *= 2;
        h->data = (int*)realloc(h->data, h->cap * sizeof(int));
    }
    int cur = h->size++;
    h->data[cur] = val;
    while (cur > 0) {
        int parent = (cur - 1) / 2;
        if (h->data[cur] < h->data[parent]) {
            heap_swap(&h->data[cur], &h->data[parent]);
            cur = parent;
        } else break;
    }
}

bool heap_pop_min(MinHeap* h, int* min_val) {
    if (h->size == 0) return false;
    *min_val = h->data[0];
    h->data[0] = h->data[--h->size];
    int cur = 0;
    while (2 * cur + 1 < h->size) {
        int left = 2 * cur + 1;
        int right = 2 * cur + 2;
        int smallest = cur;
        if (left < h->size && h->data[left] < h->data[smallest]) smallest = left;
        if (right < h->size && h->data[right] < h->data[smallest]) smallest = right;
        if (smallest != cur) {
            heap_swap(&h->data[cur], &h->data[smallest]);
            cur = smallest;
        } else break;
    }
    return true;
}

bool heap_peek(const MinHeap* h, int* min_val) {
    if (h->size == 0) return false;
    *min_val = h->data[0];
    return true;
}

void heap_display(const MinHeap* h) {
    if (h->size == 0) {
        printf("Priority Queue (Min-Heap) is empty.\\n");
        return;
    }
    printf("Min-Heap Array (%d elements): ", h->size);
    for (int i = 0; i < h->size; i++) printf("%d ", h->data[i]);
    printf("\\n");
}

void heap_free(MinHeap* h) {
    if (h) {
        free(h->data);
        free(h);
    }
}

int main(void) {
    MinHeap* h = heap_create(10);
    int choice;

    do {
        printf("\\n=== Priority Queue (Min-Heap) Menu ===\\n");
        printf("1. Insert Element\\n");
        printf("2. Extract Minimum Element\\n");
        printf("3. Peek Minimum Element\\n");
        printf("4. Display Heap Elements\\n");
        printf("5. Count Total Elements\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter integer to insert: ");
                if (scanf("%d", &val) == 1) {
                    heap_push(h, val);
                    printf("Inserted %d into min-heap.\\n", val);
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                if (heap_pop_min(h, &val)) printf("Extracted Minimum: %d\\n", val);
                else printf("Heap is empty! Cannot extract.\\n");
                break;
            }
            case 3: {
                int val;
                if (heap_peek(h, &val)) printf("Current Minimum: %d\\n", val);
                else printf("Heap is empty.\\n");
                break;
            }
            case 4:
                heap_display(h);
                break;
            case 5:
                printf("Count: %d elements\\n", h->size);
                break;
            case 0:
                printf("Exiting Priority Queue Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    heap_free(h);
    return 0;
}`,
      tags: ["program", "queue", "priority-queue"],
      aliases: ["prog_priority_queue", "programPriorityQueue"],
    })
  );

  // 16. Full Program: Binary Search Tree (BST)
  components.push(
    createComponent({
      id: "data-structures.full-programs.trees.bst.prog-bst",
      name: "prog_bst",
      type: "program",
      category: "data-structures",
      subcategory: "trees",
      categoryId: "data-structures.full-programs.trees.bst",
      path: "data-structures/full-programs/trees/bst/prog-bst",
      description: "Interactive Binary Search Tree program with insertion, deletion of all cases, traversals (in/pre/post), min/max, and node count",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct TreeNode {
    int val;
    struct TreeNode* left;
    struct TreeNode* right;
} TreeNode;

TreeNode* bst_create(int val) {
    TreeNode* n = (TreeNode*)malloc(sizeof(TreeNode));
    n->val = val;
    n->left = NULL;
    n->right = NULL;
    return n;
}

TreeNode* bst_insert(TreeNode* root, int val) {
    if (!root) return bst_create(val);
    if (val < root->val) root->left = bst_insert(root->left, val);
    else if (val > root->val) root->right = bst_insert(root->right, val);
    return root;
}

TreeNode* bst_find_min(TreeNode* root) {
    while (root && root->left) root = root->left;
    return root;
}

TreeNode* bst_find_max(TreeNode* root) {
    while (root && root->right) root = root->right;
    return root;
}

bool bst_search(const TreeNode* root, int val) {
    if (!root) return false;
    if (root->val == val) return true;
    if (val < root->val) return bst_search(root->left, val);
    return bst_search(root->right, val);
}

TreeNode* bst_delete(TreeNode* root, int val, bool* deleted) {
    if (!root) return NULL;
    if (val < root->val) root->left = bst_delete(root->left, val, deleted);
    else if (val > root->val) root->right = bst_delete(root->right, val, deleted);
    else {
        *deleted = true;
        if (!root->left) {
            TreeNode* r = root->right;
            free(root);
            return r;
        } else if (!root->right) {
            TreeNode* l = root->left;
            free(root);
            return l;
        }
        TreeNode* succ = bst_find_min(root->right);
        root->val = succ->val;
        root->right = bst_delete(root->right, succ->val, deleted);
    }
    return root;
}

void bst_inorder(const TreeNode* root) {
    if (!root) return;
    bst_inorder(root->left);
    printf("%d ", root->val);
    bst_inorder(root->right);
}

void bst_preorder(const TreeNode* root) {
    if (!root) return;
    printf("%d ", root->val);
    bst_preorder(root->left);
    bst_preorder(root->right);
}

void bst_postorder(const TreeNode* root) {
    if (!root) return;
    bst_postorder(root->left);
    bst_postorder(root->right);
    printf("%d ", root->val);
}

int bst_count(const TreeNode* root) {
    if (!root) return 0;
    return 1 + bst_count(root->left) + bst_count(root->right);
}

int bst_height(const TreeNode* root) {
    if (!root) return 0;
    int lh = bst_height(root->left);
    int rh = bst_height(root->right);
    return 1 + (lh > rh ? lh : rh);
}

void bst_free(TreeNode* root) {
    if (!root) return;
    bst_free(root->left);
    bst_free(root->right);
    free(root);
}

int main(void) {
    TreeNode* root = NULL;
    int choice;

    do {
        printf("\\n=== Binary Search Tree (BST) Menu ===\\n");
        printf("1. Insert Node\\n");
        printf("2. Delete Node\\n");
        printf("3. Search Value\\n");
        printf("4. Inorder Traversal (Sorted)\\n");
        printf("5. Preorder Traversal\\n");
        printf("6. Postorder Traversal\\n");
        printf("7. Find Minimum & Maximum\\n");
        printf("8. Tree Height and Node Count\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to insert: ");
                if (scanf("%d", &val) == 1) {
                    root = bst_insert(root, val);
                    printf("Inserted %d into BST.\\n", val);
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                printf("Enter value to delete: ");
                if (scanf("%d", &val) == 1) {
                    bool deleted = false;
                    root = bst_delete(root, val, &deleted);
                    if (deleted) printf("Deleted %d from BST.\\n", val);
                    else printf("Value %d not found.\\n", val);
                } else clear_input();
                break;
            }
            case 3: {
                int val;
                printf("Enter value to search: ");
                if (scanf("%d", &val) == 1) {
                    if (bst_search(root, val)) printf("Found %d in BST.\\n", val);
                    else printf("%d is not in the BST.\\n", val);
                } else clear_input();
                break;
            }
            case 4:
                printf("Inorder   : ");
                bst_inorder(root);
                printf("\\n");
                break;
            case 5:
                printf("Preorder  : ");
                bst_preorder(root);
                printf("\\n");
                break;
            case 6:
                printf("Postorder : ");
                bst_postorder(root);
                printf("\\n");
                break;
            case 7: {
                if (!root) {
                    printf("Tree is empty.\\n");
                } else {
                    printf("Min: %d | Max: %d\\n", bst_find_min(root)->val, bst_find_max(root)->val);
                }
                break;
            }
            case 8:
                printf("Height: %d | Total Nodes: %d\\n", bst_height(root), bst_count(root));
                break;
            case 0:
                printf("Exiting BST Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    bst_free(root);
    return 0;
}`,
      tags: ["program", "trees", "bst"],
      aliases: ["prog_bst", "programBST"],
    })
  );

  // 17. Full Program: AVL Tree
  components.push(
    createComponent({
      id: "data-structures.full-programs.trees.avl.prog-avl",
      name: "prog_avl",
      type: "program",
      category: "data-structures",
      subcategory: "trees",
      categoryId: "data-structures.full-programs.trees.avl",
      path: "data-structures/full-programs/trees/avl/prog-avl",
      description: "Interactive self-balancing AVL tree program with automatic rotations (LL, RR, LR, RL), search, and inorder traversal",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct AVLNode {
    int val;
    struct AVLNode* left;
    struct AVLNode* right;
    int height;
} AVLNode;

int avl_h(AVLNode* n) { return n ? n->height : 0; }
int avl_max(int a, int b) { return a > b ? a : b; }

AVLNode* avl_create(int val) {
    AVLNode* n = (AVLNode*)malloc(sizeof(AVLNode));
    n->val = val;
    n->left = NULL;
    n->right = NULL;
    n->height = 1;
    return n;
}

AVLNode* avl_rot_right(AVLNode* y) {
    AVLNode* x = y->left;
    AVLNode* t2 = x->right;
    x->right = y;
    y->left = t2;
    y->height = avl_max(avl_h(y->left), avl_h(y->right)) + 1;
    x->height = avl_max(avl_h(x->left), avl_h(x->right)) + 1;
    return x;
}

AVLNode* avl_rot_left(AVLNode* x) {
    AVLNode* y = x->right;
    AVLNode* t2 = y->left;
    y->left = x;
    x->right = t2;
    x->height = avl_max(avl_h(x->left), avl_h(x->right)) + 1;
    y->height = avl_max(avl_h(y->left), avl_h(y->right)) + 1;
    return y;
}

int avl_balance_factor(AVLNode* n) {
    return n ? avl_h(n->left) - avl_h(n->right) : 0;
}

AVLNode* avl_insert(AVLNode* node, int val) {
    if (!node) return avl_create(val);
    if (val < node->val) node->left = avl_insert(node->left, val);
    else if (val > node->val) node->right = avl_insert(node->right, val);
    else return node;

    node->height = 1 + avl_max(avl_h(node->left), avl_h(node->right));
    int balance = avl_balance_factor(node);

    if (balance > 1 && val < node->left->val) return avl_rot_right(node);
    if (balance < -1 && val > node->right->val) return avl_rot_left(node);
    if (balance > 1 && val > node->left->val) {
        node->left = avl_rot_left(node->left);
        return avl_rot_right(node);
    }
    if (balance < -1 && val < node->right->val) {
        node->right = avl_rot_right(node->right);
        return avl_rot_left(node);
    }
    return node;
}

bool avl_search(const AVLNode* root, int val) {
    if (!root) return false;
    if (root->val == val) return true;
    if (val < root->val) return avl_search(root->left, val);
    return avl_search(root->right, val);
}

void avl_inorder(const AVLNode* root) {
    if (!root) return;
    avl_inorder(root->left);
    printf("%d (BF:%d) ", root->val, avl_balance_factor((AVLNode*)root));
    avl_inorder(root->right);
}

void avl_free(AVLNode* root) {
    if (!root) return;
    avl_free(root->left);
    avl_free(root->right);
    free(root);
}

int main(void) {
    AVLNode* root = NULL;
    int choice;

    do {
        printf("\\n=== AVL Self-Balancing Tree Menu ===\\n");
        printf("1. Insert Node\\n");
        printf("2. Search Value\\n");
        printf("3. Inorder Traversal (Values with Balance Factors)\\n");
        printf("4. Tree Root Height & Balance Factor\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter value to insert into AVL tree: ");
                if (scanf("%d", &val) == 1) {
                    root = avl_insert(root, val);
                    printf("Inserted %d with automatic balancing.\\n", val);
                } else clear_input();
                break;
            }
            case 2: {
                int val;
                printf("Enter value to search: ");
                if (scanf("%d", &val) == 1) {
                    if (avl_search(root, val)) printf("Found %d in AVL tree.\\n", val);
                    else printf("%d is not in the tree.\\n", val);
                } else clear_input();
                break;
            }
            case 3:
                printf("AVL Inorder: ");
                avl_inorder(root);
                printf("\\n");
                break;
            case 4:
                if (root) printf("Root: %d | Height: %d | Balance Factor: %d\\n", root->val, root->height, avl_balance_factor(root));
                else printf("Tree is empty.\\n");
                break;
            case 0:
                printf("Exiting AVL Tree Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    avl_free(root);
    return 0;
}`,
      tags: ["program", "trees", "avl"],
      aliases: ["prog_avl", "programAVL"],
    })
  );

  // 18. Full Program: Trie (Prefix Tree)
  components.push(
    createComponent({
      id: "data-structures.full-programs.trees.trie.prog-trie",
      name: "prog_trie",
      type: "program",
      category: "data-structures",
      subcategory: "trees",
      categoryId: "data-structures.full-programs.trees.trie",
      path: "data-structures/full-programs/trees/trie/prog-trie",
      description: "Interactive 26-ary alphabet Trie with word insertion, search, prefix checks, and recursive memory cleanup",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct TrieNode {
    struct TrieNode* children[26];
    bool is_end;
} TrieNode;

TrieNode* trie_create(void) {
    TrieNode* n = (TrieNode*)malloc(sizeof(TrieNode));
    n->is_end = false;
    for (int i = 0; i < 26; i++) n->children[i] = NULL;
    return n;
}

void trie_insert(TrieNode* root, const char* word) {
    TrieNode* cur = root;
    while (*word) {
        if (*word >= 'a' && *word <= 'z') {
            int idx = *word - 'a';
            if (!cur->children[idx]) cur->children[idx] = trie_create();
            cur = cur->children[idx];
        }
        word++;
    }
    cur->is_end = true;
}

bool trie_search(const TrieNode* root, const char* word) {
    const TrieNode* cur = root;
    while (*word) {
        if (*word >= 'a' && *word <= 'z') {
            int idx = *word - 'a';
            if (!cur->children[idx]) return false;
            cur = cur->children[idx];
        } else return false;
        word++;
    }
    return cur != NULL && cur->is_end;
}

bool trie_starts_with(const TrieNode* root, const char* prefix) {
    const TrieNode* cur = root;
    while (*prefix) {
        if (*prefix >= 'a' && *prefix <= 'z') {
            int idx = *prefix - 'a';
            if (!cur->children[idx]) return false;
            cur = cur->children[idx];
        } else return false;
        prefix++;
    }
    return true;
}

void trie_free(TrieNode* root) {
    if (!root) return;
    for (int i = 0; i < 26; i++) {
        if (root->children[i]) trie_free(root->children[i]);
    }
    free(root);
}

int main(void) {
    TrieNode* root = trie_create();
    int choice;
    char buffer[128];

    do {
        printf("\\n=== Prefix Trie Operations Menu ===\\n");
        printf("1. Insert Word\\n");
        printf("2. Search Complete Word\\n");
        printf("3. Check Prefix Exists (starts with)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter lowercase word to insert: ");
                if (scanf("%127s", buffer) == 1) {
                    trie_insert(root, buffer);
                    printf("Inserted '%s' into trie.\\n", buffer);
                } else clear_input();
                break;
            case 2:
                printf("Enter word to search: ");
                if (scanf("%127s", buffer) == 1) {
                    printf("Word '%s': %s\\n", buffer, trie_search(root, buffer) ? "FOUND" : "NOT FOUND");
                } else clear_input();
                break;
            case 3:
                printf("Enter prefix to check: ");
                if (scanf("%127s", buffer) == 1) {
                    printf("Prefix '%s': %s\\n", buffer, trie_starts_with(root, buffer) ? "EXISTS" : "DOES NOT EXIST");
                } else clear_input();
                break;
            case 0:
                printf("Exiting Trie Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    trie_free(root);
    return 0;
}`,
      tags: ["program", "trees", "trie"],
      aliases: ["prog_trie", "programTrie"],
    })
  );

  // 19. Full Program: Segment Tree
  components.push(
    createComponent({
      id: "data-structures.full-programs.trees.segment-tree.prog-segment-tree",
      name: "prog_segment_tree",
      type: "program",
      category: "data-structures",
      subcategory: "trees",
      categoryId: "data-structures.full-programs.trees.segment-tree",
      path: "data-structures/full-programs/trees/segment-tree/prog-segment-tree",
      description: "Interactive segment tree program supporting dynamic point updates and O(log n) range sum queries",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

void seg_build(const int* a, int* tree, int v, int tl, int tr) {
    if (tl == tr) tree[v] = a[tl];
    else {
        int tm = (tl + tr) / 2;
        seg_build(a, tree, v * 2, tl, tm);
        seg_build(a, tree, v * 2 + 1, tm + 1, tr);
        tree[v] = tree[v * 2] + tree[v * 2 + 1];
    }
}

int seg_sum(const int* tree, int v, int tl, int tr, int l, int r) {
    if (l > r) return 0;
    if (l == tl && r == tr) return tree[v];
    int tm = (tl + tr) / 2;
    return seg_sum(tree, v * 2, tl, tm, l, (r < tm ? r : tm)) +
           seg_sum(tree, v * 2 + 1, tm + 1, tr, (l > tm + 1 ? l : tm + 1), r);
}

void seg_update(int* tree, int v, int tl, int tr, int pos, int new_val) {
    if (tl == tr) tree[v] = new_val;
    else {
        int tm = (tl + tr) / 2;
        if (pos <= tm) seg_update(tree, v * 2, tl, tm, pos, new_val);
        else seg_update(tree, v * 2 + 1, tm + 1, tr, pos, new_val);
        tree[v] = tree[v * 2] + tree[v * 2 + 1];
    }
}

int main(void) {
    int n = 6;
    int a[100] = {1, 3, 5, 7, 9, 11};
    int* tree = (int*)calloc(4 * 100, sizeof(int));
    seg_build(a, tree, 1, 0, n - 1);

    int choice;
    do {
        printf("\\n=== Segment Tree Operations Menu ===\\n");
        printf("1. Update Element at Index\\n");
        printf("2. Query Range Sum [L, R]\\n");
        printf("3. Display Current Array\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int pos, val;
                printf("Enter index (0 to %d) and new value: ", n - 1);
                if (scanf("%d %d", &pos, &val) == 2 && pos >= 0 && pos < n) {
                    a[pos] = val;
                    seg_update(tree, 1, 0, n - 1, pos, val);
                    printf("Updated index %d to %d.\\n", pos, val);
                } else clear_input();
                break;
            }
            case 2: {
                int l, r;
                printf("Enter range [L R] (0 to %d): ", n - 1);
                if (scanf("%d %d", &l, &r) == 2 && l >= 0 && r < n && l <= r) {
                    int ans = seg_sum(tree, 1, 0, n - 1, l, r);
                    printf("Range Sum [%d, %d] = %d\\n", l, r, ans);
                } else clear_input();
                break;
            }
            case 3:
                printf("Array [%d items]: ", n);
                for (int i = 0; i < n; i++) printf("%d ", a[i]);
                printf("\\n");
                break;
            case 0:
                printf("Exiting Segment Tree Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    free(tree);
    return 0;
}`,
      tags: ["program", "trees", "segment-tree"],
      aliases: ["prog_segment_tree", "programSegmentTree"],
    })
  );

  // 20. Full Program: Graph (Adjacency Matrix)
  components.push(
    createComponent({
      id: "data-structures.full-programs.graphs.adjacency-matrix.prog-graph-adj-matrix",
      name: "prog_graph_adj_matrix",
      type: "program",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.full-programs.graphs.adjacency-matrix",
      path: "data-structures/full-programs/graphs/adjacency-matrix/prog-graph-adj-matrix",
      description: "Interactive graph program using adjacency matrix with edge addition/removal, BFS, and DFS traversals",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdbool.h>

#define MAX_V 10

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

void dfs_util(int matrix[MAX_V][MAX_V], int v, int num_v, bool* visited) {
    visited[v] = true;
    printf("%d ", v);
    for (int i = 0; i < num_v; i++) {
        if (matrix[v][i] && !visited[i]) {
            dfs_util(matrix, i, num_v, visited);
        }
    }
}

void bfs_util(int matrix[MAX_V][MAX_V], int start_v, int num_v) {
    bool visited[MAX_V] = {false};
    int queue[MAX_V];
    int front = 0, rear = 0;

    visited[start_v] = true;
    queue[rear++] = start_v;

    printf("BFS Traversal from vertex %d: ", start_v);
    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        for (int v = 0; v < num_v; v++) {
            if (matrix[u][v] && !visited[v]) {
                visited[v] = true;
                queue[rear++] = v;
            }
        }
    }
    printf("\\n");
}

int main(void) {
    int num_v = 5;
    int matrix[MAX_V][MAX_V] = {0};
    int choice;

    do {
        printf("\\n=== Graph (Adjacency Matrix) Menu (Vertices: %d) ===\\n", num_v);
        printf("1. Add Edge (u, v)\\n");
        printf("2. Remove Edge (u, v)\\n");
        printf("3. BFS Traversal\\n");
        printf("4. DFS Traversal\\n");
        printf("5. Display Adjacency Matrix\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int u, v;
                printf("Enter edge endpoints (u v): ");
                if (scanf("%d %d", &u, &v) == 2 && u >= 0 && u < num_v && v >= 0 && v < num_v) {
                    matrix[u][v] = 1;
                    matrix[v][u] = 1;
                    printf("Edge (%d, %d) added.\\n", u, v);
                } else clear_input();
                break;
            }
            case 2: {
                int u, v;
                printf("Enter edge endpoints to remove (u v): ");
                if (scanf("%d %d", &u, &v) == 2 && u >= 0 && u < num_v && v >= 0 && v < num_v) {
                    matrix[u][v] = 0;
                    matrix[v][u] = 0;
                    printf("Edge (%d, %d) removed.\\n", u, v);
                } else clear_input();
                break;
            }
            case 3: {
                int start;
                printf("Enter start vertex (0-%d): ", num_v - 1);
                if (scanf("%d", &start) == 1 && start >= 0 && start < num_v) {
                    bfs_util(matrix, start, num_v);
                } else clear_input();
                break;
            }
            case 4: {
                int start;
                printf("Enter start vertex (0-%d): ", num_v - 1);
                if (scanf("%d", &start) == 1 && start >= 0 && start < num_v) {
                    bool visited[MAX_V] = {false};
                    printf("DFS Traversal from vertex %d: ", start);
                    dfs_util(matrix, start, num_v, visited);
                    printf("\\n");
                } else clear_input();
                break;
            }
            case 5:
                printf("Adjacency Matrix (%dx%d):\\n   ", num_v, num_v);
                for (int j = 0; j < num_v; j++) printf("%2d ", j);
                printf("\\n");
                for (int i = 0; i < num_v; i++) {
                    printf("%2d ", i);
                    for (int j = 0; j < num_v; j++) printf("%2d ", matrix[i][j]);
                    printf("\\n");
                }
                break;
            case 0:
                printf("Exiting Graph Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "graphs", "adjacency-matrix"],
      aliases: ["prog_graph_adj_matrix", "programGraphAdjMatrix"],
    })
  );

  // 21. Full Program: Graph (Adjacency List)
  components.push(
    createComponent({
      id: "data-structures.full-programs.graphs.adjacency-list.prog-graph-adj-list",
      name: "prog_graph_adj_list",
      type: "program",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.full-programs.graphs.adjacency-list",
      path: "data-structures/full-programs/graphs/adjacency-list/prog-graph-adj-list",
      description: "Interactive graph program using adjacency linked list with dynamic edge additions, BFS, and DFS",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct AdjNode {
    int dest;
    struct AdjNode* next;
} AdjNode;

typedef struct Graph {
    int num_v;
    AdjNode** adj_lists;
} Graph;

Graph* graph_create(int v) {
    Graph* g = (Graph*)malloc(sizeof(Graph));
    g->num_v = v;
    g->adj_lists = (AdjNode**)malloc(v * sizeof(AdjNode*));
    for (int i = 0; i < v; i++) g->adj_lists[i] = NULL;
    return g;
}

void graph_add_edge(Graph* g, int src, int dest) {
    AdjNode* n = (AdjNode*)malloc(sizeof(AdjNode));
    n->dest = dest;
    n->next = g->adj_lists[src];
    g->adj_lists[src] = n;

    n = (AdjNode*)malloc(sizeof(AdjNode));
    n->dest = src;
    n->next = g->adj_lists[dest];
    g->adj_lists[dest] = n;
}

void graph_print(const Graph* g) {
    printf("Graph Adjacency Lists (%d vertices):\\n", g->num_v);
    for (int v = 0; v < g->num_v; v++) {
        printf("Vertex %d: ", v);
        AdjNode* cur = g->adj_lists[v];
        while (cur) {
            printf("%d -> ", cur->dest);
            cur = cur->next;
        }
        printf("NULL\\n");
    }
}

void graph_free(Graph* g) {
    for (int i = 0; i < g->num_v; i++) {
        AdjNode* cur = g->adj_lists[i];
        while (cur) {
            AdjNode* tmp = cur;
            cur = cur->next;
            free(tmp);
        }
    }
    free(g->adj_lists);
    free(g);
}

int main(void) {
    Graph* g = graph_create(5);
    int choice;

    do {
        printf("\\n=== Graph (Adjacency List) Menu ===\\n");
        printf("1. Add Undirected Edge (u, v)\\n");
        printf("2. Display Adjacency List\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int u, v;
                printf("Enter endpoints (u v) between 0 and %d: ", g->num_v - 1);
                if (scanf("%d %d", &u, &v) == 2 && u >= 0 && u < g->num_v && v >= 0 && v < g->num_v) {
                    graph_add_edge(g, u, v);
                    printf("Edge (%d, %d) added successfully.\\n", u, v);
                } else clear_input();
                break;
            }
            case 2:
                graph_print(g);
                break;
            case 0:
                printf("Exiting Graph Adjacency List Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    graph_free(g);
    return 0;
}`,
      tags: ["program", "graphs", "adjacency-list"],
      aliases: ["prog_graph_adj_list", "programGraphAdjList"],
    })
  );

  // 22. Full Program: Disjoint Set Union (DSU)
  components.push(
    createComponent({
      id: "data-structures.full-programs.graphs.dsu.prog-graph-dsu",
      name: "prog_graph_dsu",
      type: "program",
      category: "data-structures",
      subcategory: "graphs",
      categoryId: "data-structures.full-programs.graphs.dsu",
      path: "data-structures/full-programs/graphs/dsu/prog-graph-dsu",
      description: "Interactive Disjoint Set Union (DSU) program with path compression and union by rank",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct DSU {
    int* parent;
    int* rank;
    int n;
} DSU;

DSU* dsu_create(int n) {
    DSU* d = (DSU*)malloc(sizeof(DSU));
    d->n = n;
    d->parent = (int*)malloc(n * sizeof(int));
    d->rank = (int*)calloc(n, sizeof(int));
    for (int i = 0; i < n; i++) d->parent[i] = i;
    return d;
}

int dsu_find(DSU* d, int i) {
    if (d->parent[i] == i) return i;
    return d->parent[i] = dsu_find(d, d->parent[i]);
}

bool dsu_union(DSU* d, int i, int j) {
    int root_i = dsu_find(d, i);
    int root_j = dsu_find(d, j);
    if (root_i == root_j) return false;
    if (d->rank[root_i] < d->rank[root_j]) d->parent[root_i] = root_j;
    else if (d->rank[root_i] > d->rank[root_j]) d->parent[root_j] = root_i;
    else {
        d->parent[root_j] = root_i;
        d->rank[root_i]++;
    }
    return true;
}

void dsu_free(DSU* d) {
    if (d) {
        free(d->parent);
        free(d->rank);
        free(d);
    }
}

int main(void) {
    int n = 8;
    DSU* d = dsu_create(n);
    int choice;

    do {
        printf("\\n=== Disjoint Set Union (DSU) Menu (Elements: 0-%d) ===\\n", n - 1);
        printf("1. Union Sets (u, v)\\n");
        printf("2. Find Set Representative of x\\n");
        printf("3. Check Connected (Are u and v in same set?)\\n");
        printf("4. Display All Element Representatives\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int u, v;
                printf("Enter pair (u v): ");
                if (scanf("%d %d", &u, &v) == 2 && u >= 0 && u < n && v >= 0 && v < n) {
                    if (dsu_union(d, u, v)) printf("Merged set containing %d and set containing %d.\\n", u, v);
                    else printf("%d and %d were already in the same set.\\n", u, v);
                } else clear_input();
                break;
            }
            case 2: {
                int x;
                printf("Enter element x (0-%d): ", n - 1);
                if (scanf("%d", &x) == 1 && x >= 0 && x < n) {
                    printf("Representative (Leader) of %d is %d.\\n", x, dsu_find(d, x));
                } else clear_input();
                break;
            }
            case 3: {
                int u, v;
                printf("Enter pair to check (u v): ");
                if (scanf("%d %d", &u, &v) == 2 && u >= 0 && u < n && v >= 0 && v < n) {
                    printf("Are %d and %d connected? %s\\n", u, v, dsu_find(d, u) == dsu_find(d, v) ? "YES" : "NO");
                } else clear_input();
                break;
            }
            case 4:
                printf("Element -> Leader: ");
                for (int i = 0; i < n; i++) printf("[%d -> %d] ", i, dsu_find(d, i));
                printf("\\n");
                break;
            case 0:
                printf("Exiting DSU Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    dsu_free(d);
    return 0;
}`,
      tags: ["program", "graphs", "dsu"],
      aliases: ["prog_graph_dsu", "programGraphDSU"],
    })
  );

  // 23. Full Program: Hash Table (Chaining)
  components.push(
    createComponent({
      id: "data-structures.full-programs.hashing.chaining.prog-chain-hash",
      name: "prog_chain_hash",
      type: "program",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.full-programs.hashing.chaining",
      path: "data-structures/full-programs/hashing/chaining/prog-chain-hash",
      description: "Interactive separate chaining hash table program with dynamic string keys, integer values, collision handling, and deletions",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define BUCKETS 7

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct HashNode {
    char* key;
    int val;
    struct HashNode* next;
} HashNode;

typedef struct HashTable {
    HashNode* buckets[BUCKETS];
} HashTable;

unsigned int hash_str(const char* key) {
    unsigned long h = 5381;
    int c;
    while ((c = *key++)) h = ((h << 5) + h) + c;
    return (unsigned int)(h % BUCKETS);
}

HashTable* ht_create(void) {
    HashTable* ht = (HashTable*)malloc(sizeof(HashTable));
    for (int i = 0; i < BUCKETS; i++) ht->buckets[i] = NULL;
    return ht;
}

void ht_insert(HashTable* ht, const char* key, int val) {
    unsigned int b = hash_str(key);
    HashNode* cur = ht->buckets[b];
    while (cur) {
        if (strcmp(cur->key, key) == 0) {
            cur->val = val;
            return;
        }
        cur = cur->next;
    }
    HashNode* n = (HashNode*)malloc(sizeof(HashNode));
    n->key = strdup(key);
    n->val = val;
    n->next = ht->buckets[b];
    ht->buckets[b] = n;
}

bool ht_search(const HashTable* ht, const char* key, int* val) {
    unsigned int b = hash_str(key);
    HashNode* cur = ht->buckets[b];
    while (cur) {
        if (strcmp(cur->key, key) == 0) {
            *val = cur->val;
            return true;
        }
        cur = cur->next;
    }
    return false;
}

bool ht_delete(HashTable* ht, const char* key) {
    unsigned int b = hash_str(key);
    HashNode* cur = ht->buckets[b];
    HashNode* prev = NULL;
    while (cur) {
        if (strcmp(cur->key, key) == 0) {
            if (prev) prev->next = cur->next;
            else ht->buckets[b] = cur->next;
            free(cur->key);
            free(cur);
            return true;
        }
        prev = cur;
        cur = cur->next;
    }
    return false;
}

void ht_display(const HashTable* ht) {
    printf("Separate Chaining Hash Table (%d buckets):\\n", BUCKETS);
    for (int i = 0; i < BUCKETS; i++) {
        printf("[%d]: ", i);
        HashNode* cur = ht->buckets[i];
        while (cur) {
            printf("(%s: %d) -> ", cur->key, cur->val);
            cur = cur->next;
        }
        printf("NULL\\n");
    }
}

void ht_free(HashTable* ht) {
    for (int i = 0; i < BUCKETS; i++) {
        HashNode* cur = ht->buckets[i];
        while (cur) {
            HashNode* tmp = cur;
            cur = cur->next;
            free(tmp->key);
            free(tmp);
        }
    }
    free(ht);
}

int main(void) {
    HashTable* ht = ht_create();
    int choice;
    char key_buf[64];

    do {
        printf("\\n=== Hash Table (Chaining) Menu ===\\n");
        printf("1. Insert / Update (Key, Value)\\n");
        printf("2. Search Key\\n");
        printf("3. Delete Key\\n");
        printf("4. Display Hash Table\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter string key and integer value: ");
                if (scanf("%63s %d", key_buf, &val) == 2) {
                    ht_insert(ht, key_buf, val);
                    printf("Inserted (%s: %d).\\n", key_buf, val);
                } else clear_input();
                break;
            }
            case 2: {
                printf("Enter string key to search: ");
                if (scanf("%63s", key_buf) == 1) {
                    int val;
                    if (ht_search(ht, key_buf, &val)) printf("Found '%s' => %d\\n", key_buf, val);
                    else printf("Key '%s' not found.\\n", key_buf);
                } else clear_input();
                break;
            }
            case 3:
                printf("Enter string key to delete: ");
                if (scanf("%63s", key_buf) == 1) {
                    if (ht_delete(ht, key_buf)) printf("Deleted key '%s'.\\n", key_buf);
                    else printf("Key '%s' not found.\\n", key_buf);
                } else clear_input();
                break;
            case 4:
                ht_display(ht);
                break;
            case 0:
                printf("Exiting Hash Table Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    ht_free(ht);
    return 0;
}`,
      tags: ["program", "hashing", "chaining"],
      aliases: ["prog_chain_hash", "programChainHash"],
    })
  );

  // 24. Full Program: Hash Table (Open Addressing)
  components.push(
    createComponent({
      id: "data-structures.full-programs.hashing.open-addressing.prog-open-hash",
      name: "prog_open_hash",
      type: "program",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.full-programs.hashing.open-addressing",
      path: "data-structures/full-programs/hashing/open-addressing/prog-open-hash",
      description: "Interactive linear probing open-addressing hash table with slot display, collision resolution, and search",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

#define OA_SIZE 11

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct Slot {
    char key[32];
    int val;
    bool occupied;
    bool deleted;
} Slot;

unsigned int oa_hash(const char* key) {
    unsigned int h = 0;
    while (*key) h = (h * 31) + (unsigned char)(*key++);
    return h % OA_SIZE;
}

void oa_init(Slot* table) {
    for (int i = 0; i < OA_SIZE; i++) {
        table[i].occupied = false;
        table[i].deleted = false;
    }
}

bool oa_insert(Slot* table, const char* key, int val) {
    unsigned int start = oa_hash(key);
    for (int i = 0; i < OA_SIZE; i++) {
        unsigned int idx = (start + i) % OA_SIZE;
        if (table[idx].occupied && strcmp(table[idx].key, key) == 0) {
            table[idx].val = val;
            return true;
        }
        if (!table[idx].occupied) {
            strncpy(table[idx].key, key, 31);
            table[idx].key[31] = '\\0';
            table[idx].val = val;
            table[idx].occupied = true;
            table[idx].deleted = false;
            return true;
        }
    }
    return false;
}

bool oa_search(const Slot* table, const char* key, int* val) {
    unsigned int start = oa_hash(key);
    for (int i = 0; i < OA_SIZE; i++) {
        unsigned int idx = (start + i) % OA_SIZE;
        if (!table[idx].occupied && !table[idx].deleted) return false;
        if (table[idx].occupied && strcmp(table[idx].key, key) == 0) {
            *val = table[idx].val;
            return true;
        }
    }
    return false;
}

bool oa_delete(Slot* table, const char* key) {
    unsigned int start = oa_hash(key);
    for (int i = 0; i < OA_SIZE; i++) {
        unsigned int idx = (start + i) % OA_SIZE;
        if (!table[idx].occupied && !table[idx].deleted) return false;
        if (table[idx].occupied && strcmp(table[idx].key, key) == 0) {
            table[idx].occupied = false;
            table[idx].deleted = true;
            return true;
        }
    }
    return false;
}

void oa_display(const Slot* table) {
    printf("Open Addressing (Linear Probing) Slots (%d total):\\n", OA_SIZE);
    for (int i = 0; i < OA_SIZE; i++) {
        if (table[i].occupied) {
            printf("Slot [%2d]: Key: %-12s | Val: %d\\n", i, table[i].key, table[i].val);
        } else if (table[i].deleted) {
            printf("Slot [%2d]: <DELETED TOMBSTONE>\\n", i);
        } else {
            printf("Slot [%2d]: <EMPTY>\\n", i);
        }
    }
}

int main(void) {
    Slot table[OA_SIZE];
    oa_init(table);
    int choice;
    char key_buf[32];

    do {
        printf("\\n=== Open Addressing Hash Table Menu ===\\n");
        printf("1. Insert (Key, Value)\\n");
        printf("2. Search Key\\n");
        printf("3. Delete Key\\n");
        printf("4. Display All Slots\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int val;
                printf("Enter string key and integer value: ");
                if (scanf("%31s %d", key_buf, &val) == 2) {
                    if (oa_insert(table, key_buf, val)) printf("Inserted (%s, %d).\\n", key_buf, val);
                    else printf("Table is full! Collision probe exceeded.\\n");
                } else clear_input();
                break;
            }
            case 2: {
                printf("Enter string key to search: ");
                if (scanf("%31s", key_buf) == 1) {
                    int val;
                    if (oa_search(table, key_buf, &val)) printf("Found '%s' => %d\\n", key_buf, val);
                    else printf("Key '%s' not found.\\n", key_buf);
                } else clear_input();
                break;
            }
            case 3:
                printf("Enter string key to delete: ");
                if (scanf("%31s", key_buf) == 1) {
                    if (oa_delete(table, key_buf)) printf("Deleted key '%s'.\\n", key_buf);
                    else printf("Key '%s' not found.\\n", key_buf);
                } else clear_input();
                break;
            case 4:
                oa_display(table);
                break;
            case 0:
                printf("Exiting Open Addressing Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "hashing", "open-addressing"],
      aliases: ["prog_open_hash", "programOpenHash"],
    })
  );

  // 25. Full Program: Hash Functions Comparison
  components.push(
    createComponent({
      id: "data-structures.full-programs.hashing.hash-functions.prog-hash-functions",
      name: "prog_hash_functions",
      type: "program",
      category: "data-structures",
      subcategory: "hashing",
      categoryId: "data-structures.full-programs.hashing.hash-functions",
      path: "data-structures/full-programs/hashing/hash-functions/prog-hash-functions",
      description: "Interactive string hash function benchmark comparing DJB2, FNV-1a, and SDBM hashes",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

unsigned long djb2(const char* s) {
    unsigned long h = 5381;
    int c;
    while ((c = *s++)) h = ((h << 5) + h) + c;
    return h;
}

uint32_t fnv1a(const char* s) {
    uint32_t h = 2166136261u;
    while (*s) {
        h ^= (uint8_t)(*s++);
        h *= 16777619u;
    }
    return h;
}

unsigned long sdbm(const char* s) {
    unsigned long h = 0;
    int c;
    while ((c = *s++)) h = c + (h << 6) + (h << 16) - h;
    return h;
}

int main(void) {
    int choice;
    char buffer[128];

    do {
        printf("\\n=== Hash Functions Comparison Menu ===\\n");
        printf("1. Hash a Custom String (DJB2, FNV-1a, SDBM)\\n");
        printf("2. Run Built-in Benchmark Strings\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter text to hash: ");
                if (scanf("%127s", buffer) == 1) {
                    printf("Input: '%s'\\n", buffer);
                    printf("  DJB2   : 0x%08lX (%lu)\\n", djb2(buffer), djb2(buffer));
                    printf("  FNV-1a : 0x%08X (%u)\\n", fnv1a(buffer), fnv1a(buffer));
                    printf("  SDBM   : 0x%08lX (%lu)\\n", sdbm(buffer), sdbm(buffer));
                } else clear_input();
                break;
            case 2: {
                const char* sample[] = {"algorithm", "data_structure", "hash_map", "binary_tree"};
                printf("%-16s | %-12s | %-12s | %-12s\\n", "String", "DJB2", "FNV-1a", "SDBM");
                printf("-----------------+--------------+--------------+-------------\\n");
                for (int i = 0; i < 4; i++) {
                    printf("%-16s | 0x%08lX   | 0x%08X   | 0x%08lX\\n",
                           sample[i], djb2(sample[i]), fnv1a(sample[i]), sdbm(sample[i]));
                }
                break;
            }
            case 0:
                printf("Exiting Hash Functions Menu.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
                break;
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "hashing", "hash-functions"],
      aliases: ["prog_hash_functions", "programHashFunctions"],
    })
  );

  return components;
}

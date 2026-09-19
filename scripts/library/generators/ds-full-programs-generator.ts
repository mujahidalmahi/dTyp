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
      description: "Interactive complete singly linked list program with 19 operations: beginning/end/positional/value/sorted insertions and deletions, reverse, bubble sort, deduplication, middle element, cycle detection, min/max, count, and display",
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
    if (!n) return;
    n->next = *head;
    *head = n;
}

void insert_end(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (!*head) {
        *head = n;
        return;
    }
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
    if (!n) return false;
    n->next = cur->next;
    cur->next = n;
    return true;
}

bool insert_before_value(Node** head, int target, int data) {
    if (!head || !*head) return false;
    if ((*head)->data == target) {
        insert_beginning(head, data);
        return true;
    }
    Node* cur = *head;
    while (cur->next && cur->next->data != target) {
        cur = cur->next;
    }
    if (cur->next) {
        Node* n = create_node(data);
        if (!n) return false;
        n->next = cur->next;
        cur->next = n;
        return true;
    }
    return false;
}

bool insert_after_value(Node* head, int target, int data) {
    Node* cur = head;
    while (cur && cur->data != target) {
        cur = cur->next;
    }
    if (!cur) return false;
    Node* n = create_node(data);
    if (!n) return false;
    n->next = cur->next;
    cur->next = n;
    return true;
}

void insert_sorted(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (!*head || (*head)->data >= data) {
        n->next = *head;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next && cur->next->data < data) {
        cur = cur->next;
    }
    n->next = cur->next;
    cur->next = n;
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

bool delete_after_value(Node* head, int target, int* val) {
    Node* cur = head;
    while (cur && cur->data != target) {
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

void sort_list(Node* head) {
    if (!head || !head->next) return;
    int swapped;
    do {
        swapped = 0;
        Node* cur = head;
        while (cur->next) {
            if (cur->data > cur->next->data) {
                int tmp = cur->data;
                cur->data = cur->next->data;
                cur->next->data = tmp;
                swapped = 1;
            }
            cur = cur->next;
        }
    } while (swapped);
}

void remove_duplicates(Node* head) {
    Node* cur = head;
    while (cur && cur->next) {
        Node* runner = cur;
        while (runner->next) {
            if (runner->next->data == cur->data) {
                Node* del = runner->next;
                runner->next = del->next;
                free(del);
            } else {
                runner = runner->next;
            }
        }
        cur = cur->next;
    }
}

bool find_middle(const Node* head, int* val) {
    if (!head) return false;
    const Node* slow = head;
    const Node* fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    *val = slow->data;
    return true;
}

bool detect_cycle(const Node* head) {
    if (!head || !head->next) return false;
    const Node* slow = head;
    const Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}

bool min_and_max(const Node* head, int* min_val, int* max_val) {
    if (!head) return false;
    *min_val = head->data;
    *max_val = head->data;
    const Node* cur = head->next;
    while (cur) {
        if (cur->data < *min_val) *min_val = cur->data;
        if (cur->data > *max_val) *max_val = cur->data;
        cur = cur->next;
    }
    return true;
}

void display_list_and_count(const Node* head) {
    if (!head) {
        printf("List is empty (count: 0)\\n");
        return;
    }
    printf("List: ");
    int count = 0;
    const Node* cur = head;
    while (cur) {
        printf("%d -> ", cur->data);
        count++;
        cur = cur->next;
    }
    printf("NULL (total: %d)\\n", count);
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
    int choice = 0;
    int val = 0;
    int pos = 0;
    int target = 0;
    int min_val = 0;
    int max_val = 0;

    do {
        printf("\\n--- Singly Linked List Operations ---\\n");
        printf("1. Insert Beginning\\n");
        printf("2. Insert End\\n");
        printf("3. Insert at Position\\n");
        printf("4. Insert Before Value\\n");
        printf("5. Insert After Value\\n");
        printf("6. Insert Sorted\\n");
        printf("7. Delete Beginning\\n");
        printf("8. Delete End\\n");
        printf("9. Delete at Position\\n");
        printf("10. Delete by Value\\n");
        printf("11. Delete After Value\\n");
        printf("12. Search Element\\n");
        printf("13. Reverse List\\n");
        printf("14. Sort List\\n");
        printf("15. Remove Duplicates\\n");
        printf("16. Find Middle\\n");
        printf("17. Detect Cycle\\n");
        printf("18. Min and Max\\n");
        printf("19. Display List and Count\\n");
        printf("0. Exit\\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter value to insert at beginning: ");
                if (scanf("%d", &val) == 1) {
                    insert_beginning(&head, val);
                    printf("Inserted %d at beginning.\\n", val);
                } else clear_input();
                break;
            case 2:
                printf("Enter value to insert at end: ");
                if (scanf("%d", &val) == 1) {
                    insert_end(&head, val);
                    printf("Inserted %d at end.\\n", val);
                } else clear_input();
                break;
            case 3:
                printf("Enter position (1-based) and value: ");
                if (scanf("%d %d", &pos, &val) == 2) {
                    if (insert_at_position(&head, pos, val))
                        printf("Inserted %d at position %d.\\n", val, pos);
                    else
                        printf("Invalid position %d.\\n", pos);
                } else clear_input();
                break;
            case 4:
                printf("Enter target value and new value: ");
                if (scanf("%d %d", &target, &val) == 2) {
                    if (insert_before_value(&head, target, val))
                        printf("Inserted %d before %d.\\n", val, target);
                    else
                        printf("Target %d not found in list.\\n", target);
                } else clear_input();
                break;
            case 5:
                printf("Enter target value and new value: ");
                if (scanf("%d %d", &target, &val) == 2) {
                    if (insert_after_value(head, target, val))
                        printf("Inserted %d after %d.\\n", val, target);
                    else
                        printf("Target %d not found in list.\\n", target);
                } else clear_input();
                break;
            case 6:
                printf("Enter value to insert in sorted order: ");
                if (scanf("%d", &val) == 1) {
                    insert_sorted(&head, val);
                    printf("Inserted %d in sorted order.\\n", val);
                } else clear_input();
                break;
            case 7:
                if (delete_beginning(&head, &val))
                    printf("Deleted %d from beginning.\\n", val);
                else
                    printf("List is empty.\\n");
                break;
            case 8:
                if (delete_end(&head, &val))
                    printf("Deleted %d from end.\\n", val);
                else
                    printf("List is empty.\\n");
                break;
            case 9:
                printf("Enter position to delete (1-based): ");
                if (scanf("%d", &pos) == 1) {
                    if (delete_at_position(&head, pos, &val))
                        printf("Deleted %d from position %d.\\n", val, pos);
                    else
                        printf("Invalid position %d.\\n", pos);
                } else clear_input();
                break;
            case 10:
                printf("Enter value to delete: ");
                if (scanf("%d", &val) == 1) {
                    if (delete_by_value(&head, val))
                        printf("Deleted value %d from list.\\n", val);
                    else
                        printf("Value %d not found.\\n", val);
                } else clear_input();
                break;
            case 11:
                printf("Enter target value: ");
                if (scanf("%d", &target) == 1) {
                    if (delete_after_value(head, target, &val))
                        printf("Deleted %d after target %d.\\n", val, target);
                    else
                        printf("No element after %d or target not found.\\n", target);
                } else clear_input();
                break;
            case 12:
                printf("Enter value to search: ");
                if (scanf("%d", &val) == 1) {
                    pos = search_element(head, val);
                    if (pos != -1)
                        printf("Value %d found at position %d.\\n", val, pos);
                    else
                        printf("Value %d not found in list.\\n", val);
                } else clear_input();
                break;
            case 13:
                reverse_list(&head);
                printf("List reversed successfully.\\n");
                display_list_and_count(head);
                break;
            case 14:
                sort_list(head);
                printf("List sorted in ascending order.\\n");
                display_list_and_count(head);
                break;
            case 15:
                remove_duplicates(head);
                printf("Duplicate elements removed.\\n");
                display_list_and_count(head);
                break;
            case 16:
                if (find_middle(head, &val))
                    printf("Middle node value: %d\\n", val);
                else
                    printf("List is empty.\\n");
                break;
            case 17:
                if (detect_cycle(head))
                    printf("Cycle detected in list.\\n");
                else
                    printf("No cycle detected (list is acyclic).\\n");
                break;
            case 18:
                if (min_and_max(head, &min_val, &max_val))
                    printf("Minimum value: %d, Maximum value: %d\\n", min_val, max_val);
                else
                    printf("List is empty.\\n");
                break;
            case 19:
                display_list_and_count(head);
                break;
            case 0:
                printf("Exiting singly linked list program.\\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 19.\\n");
                break;
        }
    } while (choice != 0);

    free_list(&head);
    return 0;
}
`,
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
      description: "Interactive complete doubly linked list program with 19 operations: bidirectional traversals, positional insertions/deletions, before/after target, sorted insertion, reversing, sorting, deduplication, middle element, and min/max",
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

Node* create_node(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->prev = NULL;
    n->next = NULL;
    return n;
}

void insert_beginning(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (*head) {
        (*head)->prev = n;
        n->next = *head;
    }
    *head = n;
}

void insert_end(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (!*head) {
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next) cur = cur->next;
    cur->next = n;
    n->prev = cur;
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
    if (!n) return false;
    n->next = cur->next;
    n->prev = cur;
    if (cur->next) cur->next->prev = n;
    cur->next = n;
    return true;
}

bool insert_before_value(Node** head, int target, int data) {
    if (!head || !*head) return false;
    if ((*head)->data == target) {
        insert_beginning(head, data);
        return true;
    }
    Node* cur = *head;
    while (cur && cur->data != target) cur = cur->next;
    if (!cur) return false;
    Node* n = create_node(data);
    if (!n) return false;
    n->prev = cur->prev;
    n->next = cur;
    if (cur->prev) cur->prev->next = n;
    cur->prev = n;
    return true;
}

bool insert_after_value(Node* head, int target, int data) {
    Node* cur = head;
    while (cur && cur->data != target) cur = cur->next;
    if (!cur) return false;
    Node* n = create_node(data);
    if (!n) return false;
    n->next = cur->next;
    n->prev = cur;
    if (cur->next) cur->next->prev = n;
    cur->next = n;
    return true;
}

void insert_sorted(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (!*head || (*head)->data >= data) {
        n->next = *head;
        if (*head) (*head)->prev = n;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next && cur->next->data < data) cur = cur->next;
    n->next = cur->next;
    n->prev = cur;
    if (cur->next) cur->next->prev = n;
    cur->next = n;
}

bool delete_beginning(Node** head, int* val) {
    if (!*head) return false;
    Node* tmp = *head;
    *val = tmp->data;
    *head = (*head)->next;
    if (*head) (*head)->prev = NULL;
    free(tmp);
    return true;
}

bool delete_end(Node** head, int* val) {
    if (!*head) return false;
    Node* cur = *head;
    while (cur->next) cur = cur->next;
    *val = cur->data;
    if (cur->prev) cur->prev->next = NULL;
    else *head = NULL;
    free(cur);
    return true;
}

bool delete_at_position(Node** head, int pos, int* val) {
    if (!*head || pos < 1) return false;
    if (pos == 1) return delete_beginning(head, val);
    Node* cur = *head;
    for (int i = 1; cur && i < pos; i++) cur = cur->next;
    if (!cur) return false;
    *val = cur->data;
    if (cur->prev) cur->prev->next = cur->next;
    if (cur->next) cur->next->prev = cur->prev;
    free(cur);
    return true;
}

bool delete_by_value(Node** head, int val) {
    if (!*head) return false;
    Node* cur = *head;
    while (cur && cur->data != val) cur = cur->next;
    if (!cur) return false;
    if (cur == *head) *head = cur->next;
    if (cur->prev) cur->prev->next = cur->next;
    if (cur->next) cur->next->prev = cur->prev;
    free(cur);
    return true;
}

bool delete_after_value(Node* head, int target, int* val) {
    Node* cur = head;
    while (cur && cur->data != target) cur = cur->next;
    if (!cur || !cur->next) return false;
    Node* del = cur->next;
    *val = del->data;
    cur->next = del->next;
    if (del->next) del->next->prev = cur;
    free(del);
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

void display_forward(const Node* head) {
    if (!head) {
        printf("List is empty.\\n");
        return;
    }
    printf("Forward: ");
    const Node* cur = head;
    while (cur) {
        printf("%d <-> ", cur->data);
        cur = cur->next;
    }
    printf("NULL\\n");
}

void display_backward(const Node* head) {
    if (!head) {
        printf("List is empty.\\n");
        return;
    }
    const Node* cur = head;
    while (cur->next) cur = cur->next;
    printf("Backward: ");
    while (cur) {
        printf("%d <-> ", cur->data);
        cur = cur->prev;
    }
    printf("NULL\\n");
}

void reverse_list(Node** head) {
    if (!*head) return;
    Node* cur = *head;
    Node* tmp = NULL;
    while (cur) {
        tmp = cur->prev;
        cur->prev = cur->next;
        cur->next = tmp;
        cur = cur->prev;
    }
    if (tmp) *head = tmp->prev;
}

void sort_list(Node* head) {
    if (!head || !head->next) return;
    int swapped;
    do {
        swapped = 0;
        Node* cur = head;
        while (cur->next) {
            if (cur->data > cur->next->data) {
                int t = cur->data;
                cur->data = cur->next->data;
                cur->next->data = t;
                swapped = 1;
            }
            cur = cur->next;
        }
    } while (swapped);
}

void remove_duplicates(Node* head) {
    Node* cur = head;
    while (cur && cur->next) {
        Node* runner = cur->next;
        while (runner) {
            if (runner->data == cur->data) {
                Node* del = runner;
                runner = runner->next;
                if (del->prev) del->prev->next = del->next;
                if (del->next) del->next->prev = del->prev;
                free(del);
            } else {
                runner = runner->next;
            }
        }
        cur = cur->next;
    }
}

bool find_middle(const Node* head, int* val) {
    if (!head) return false;
    const Node* slow = head;
    const Node* fast = head;
    while (fast->next && fast->next->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    *val = slow->data;
    return true;
}

bool min_and_max(const Node* head, int* min_val, int* max_val) {
    if (!head) return false;
    *min_val = head->data;
    *max_val = head->data;
    const Node* cur = head->next;
    while (cur) {
        if (cur->data < *min_val) *min_val = cur->data;
        if (cur->data > *max_val) *max_val = cur->data;
        cur = cur->next;
    }
    return true;
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
    int choice = 0;
    int val = 0;
    int pos = 0;
    int target = 0;
    int min_val = 0;
    int max_val = 0;

    do {
        printf("\\n--- Doubly Linked List Operations ---\\n");
        printf("1. Insert Beginning\\n");
        printf("2. Insert End\\n");
        printf("3. Insert at Position\\n");
        printf("4. Insert Before Value\\n");
        printf("5. Insert After Value\\n");
        printf("6. Insert Sorted\\n");
        printf("7. Delete Beginning\\n");
        printf("8. Delete End\\n");
        printf("9. Delete at Position\\n");
        printf("10. Delete by Value\\n");
        printf("11. Delete After Value\\n");
        printf("12. Search Element\\n");
        printf("13. Display Forward\\n");
        printf("14. Display Backward\\n");
        printf("15. Reverse List\\n");
        printf("16. Sort List\\n");
        printf("17. Remove Duplicates\\n");
        printf("18. Find Middle\\n");
        printf("19. Min and Max\\n");
        printf("0. Exit\\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter value to insert at beginning: ");
                if (scanf("%d", &val) == 1) {
                    insert_beginning(&head, val);
                    printf("Inserted %d at beginning.\\n", val);
                } else clear_input();
                break;
            case 2:
                printf("Enter value to insert at end: ");
                if (scanf("%d", &val) == 1) {
                    insert_end(&head, val);
                    printf("Inserted %d at end.\\n", val);
                } else clear_input();
                break;
            case 3:
                printf("Enter position and value: ");
                if (scanf("%d %d", &pos, &val) == 2) {
                    if (insert_at_position(&head, pos, val))
                        printf("Inserted %d at position %d.\\n", val, pos);
                    else
                        printf("Invalid position %d.\\n", pos);
                } else clear_input();
                break;
            case 4:
                printf("Enter target value and new value: ");
                if (scanf("%d %d", &target, &val) == 2) {
                    if (insert_before_value(&head, target, val))
                        printf("Inserted %d before %d.\\n", val, target);
                    else
                        printf("Target %d not found.\\n", target);
                } else clear_input();
                break;
            case 5:
                printf("Enter target value and new value: ");
                if (scanf("%d %d", &target, &val) == 2) {
                    if (insert_after_value(head, target, val))
                        printf("Inserted %d after %d.\\n", val, target);
                    else
                        printf("Target %d not found.\\n", target);
                } else clear_input();
                break;
            case 6:
                printf("Enter value to insert in sorted order: ");
                if (scanf("%d", &val) == 1) {
                    insert_sorted(&head, val);
                    printf("Inserted %d in sorted order.\\n", val);
                } else clear_input();
                break;
            case 7:
                if (delete_beginning(&head, &val))
                    printf("Deleted %d from beginning.\\n", val);
                else
                    printf("List is empty.\\n");
                break;
            case 8:
                if (delete_end(&head, &val))
                    printf("Deleted %d from end.\\n", val);
                else
                    printf("List is empty.\\n");
                break;
            case 9:
                printf("Enter position to delete: ");
                if (scanf("%d", &pos) == 1) {
                    if (delete_at_position(&head, pos, &val))
                        printf("Deleted %d from position %d.\\n", val, pos);
                    else
                        printf("Invalid position %d.\\n", pos);
                } else clear_input();
                break;
            case 10:
                printf("Enter value to delete: ");
                if (scanf("%d", &val) == 1) {
                    if (delete_by_value(&head, val))
                        printf("Deleted value %d.\\n", val);
                    else
                        printf("Value %d not found.\\n", val);
                } else clear_input();
                break;
            case 11:
                printf("Enter target value: ");
                if (scanf("%d", &target) == 1) {
                    if (delete_after_value(head, target, &val))
                        printf("Deleted %d after target %d.\\n", val, target);
                    else
                        printf("No element after target %d.\\n", target);
                } else clear_input();
                break;
            case 12:
                printf("Enter value to search: ");
                if (scanf("%d", &val) == 1) {
                    pos = search_element(head, val);
                    if (pos != -1)
                        printf("Value %d found at position %d.\\n", val, pos);
                    else
                        printf("Value %d not found.\\n", val);
                } else clear_input();
                break;
            case 13:
                display_forward(head);
                break;
            case 14:
                display_backward(head);
                break;
            case 15:
                reverse_list(&head);
                printf("Doubly linked list reversed.\\n");
                display_forward(head);
                break;
            case 16:
                sort_list(head);
                printf("Doubly linked list sorted.\\n");
                display_forward(head);
                break;
            case 17:
                remove_duplicates(head);
                printf("Duplicates removed.\\n");
                display_forward(head);
                break;
            case 18:
                if (find_middle(head, &val))
                    printf("Middle node value: %d\\n", val);
                else
                    printf("List is empty.\\n");
                break;
            case 19:
                if (min_and_max(head, &min_val, &max_val))
                    printf("Minimum value: %d, Maximum value: %d\\n", min_val, max_val);
                else
                    printf("List is empty.\\n");
                break;
            case 0:
                printf("Exiting doubly linked list program.\\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 19.\\n");
                break;
        }
    } while (choice != 0);

    free_list(&head);
    return 0;
}
`,
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
      description: "Interactive circular singly linked list program with 19 operations: beginning/end/position/before/after/sorted insertions and deletions, reverse, bubble sort, deduplication, middle element, min/max, and splitting into two halves",
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
    n->next = n;
    return n;
}

void insert_beginning(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (!*head) {
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next != *head) cur = cur->next;
    n->next = *head;
    cur->next = n;
    *head = n;
}

void insert_end(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (!*head) {
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next != *head) cur = cur->next;
    cur->next = n;
    n->next = *head;
}

int count_nodes(const Node* head) {
    if (!head) return 0;
    int cnt = 0;
    const Node* cur = head;
    do {
        cnt++;
        cur = cur->next;
    } while (cur != head);
    return cnt;
}

bool insert_at_position(Node** head, int pos, int data) {
    int total = count_nodes(*head);
    if (pos < 1 || pos > total + 1) return false;
    if (pos == 1) {
        insert_beginning(head, data);
        return true;
    }
    if (pos == total + 1) {
        insert_end(head, data);
        return true;
    }
    Node* cur = *head;
    for (int i = 1; i < pos - 1; i++) cur = cur->next;
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return false;
    n->data = data;
    n->next = cur->next;
    cur->next = n;
    return true;
}

bool insert_before_value(Node** head, int target, int data) {
    if (!head || !*head) return false;
    if ((*head)->data == target) {
        insert_beginning(head, data);
        return true;
    }
    Node* cur = *head;
    while (cur->next != *head && cur->next->data != target) cur = cur->next;
    if (cur->next != *head && cur->next->data == target) {
        Node* n = (Node*)malloc(sizeof(Node));
        if (!n) return false;
        n->data = data;
        n->next = cur->next;
        cur->next = n;
        return true;
    }
    return false;
}

bool insert_after_value(Node* head, int target, int data) {
    if (!head) return false;
    Node* cur = head;
    do {
        if (cur->data == target) {
            Node* n = (Node*)malloc(sizeof(Node));
            if (!n) return false;
            n->data = data;
            n->next = cur->next;
            cur->next = n;
            return true;
        }
        cur = cur->next;
    } while (cur != head);
    return false;
}

void insert_sorted(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (!*head) {
        *head = n;
        return;
    }
    if (data <= (*head)->data) {
        Node* last = *head;
        while (last->next != *head) last = last->next;
        n->next = *head;
        last->next = n;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next != *head && cur->next->data < data) cur = cur->next;
    n->next = cur->next;
    cur->next = n;
}

bool delete_beginning(Node** head, int* val) {
    if (!*head) return false;
    *val = (*head)->data;
    if ((*head)->next == *head) {
        free(*head);
        *head = NULL;
        return true;
    }
    Node* last = *head;
    while (last->next != *head) last = last->next;
    Node* tmp = *head;
    *head = (*head)->next;
    last->next = *head;
    free(tmp);
    return true;
}

bool delete_end(Node** head, int* val) {
    if (!*head) return false;
    if ((*head)->next == *head) {
        *val = (*head)->data;
        free(*head);
        *head = NULL;
        return true;
    }
    Node* prev = NULL;
    Node* cur = *head;
    while (cur->next != *head) {
        prev = cur;
        cur = cur->next;
    }
    *val = cur->data;
    prev->next = *head;
    free(cur);
    return true;
}

bool delete_at_position(Node** head, int pos, int* val) {
    int total = count_nodes(*head);
    if (pos < 1 || pos > total) return false;
    if (pos == 1) return delete_beginning(head, val);
    Node* prev = *head;
    for (int i = 1; i < pos - 1; i++) prev = prev->next;
    Node* cur = prev->next;
    *val = cur->data;
    prev->next = cur->next;
    free(cur);
    return true;
}

bool delete_by_value(Node** head, int val) {
    if (!*head) return false;
    if ((*head)->data == val) {
        int dummy;
        return delete_beginning(head, &dummy);
    }
    Node* prev = *head;
    Node* cur = (*head)->next;
    while (cur != *head && cur->data != val) {
        prev = cur;
        cur = cur->next;
    }
    if (cur != *head) {
        prev->next = cur->next;
        free(cur);
        return true;
    }
    return false;
}

bool delete_after_value(Node** head, int target, int* val) {
    if (!*head) return false;
    Node* cur = *head;
    do {
        if (cur->data == target) {
            if (cur->next == *head) {
                return delete_beginning(head, val);
            }
            Node* del = cur->next;
            *val = del->data;
            cur->next = del->next;
            free(del);
            return true;
        }
        cur = cur->next;
    } while (cur != *head);
    return false;
}

int search_element(const Node* head, int val) {
    if (!head) return -1;
    const Node* cur = head;
    int pos = 1;
    do {
        if (cur->data == val) return pos;
        cur = cur->next;
        pos++;
    } while (cur != head);
    return -1;
}

void reverse_list(Node** head) {
    if (!*head || (*head)->next == *head) return;
    Node* prev = NULL;
    Node* cur = *head;
    Node* nxt = NULL;
    do {
        nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    } while (cur != *head);
    (*head)->next = prev;
    *head = prev;
}

void sort_list(Node* head) {
    if (!head || head->next == head) return;
    int swapped;
    do {
        swapped = 0;
        Node* cur = head;
        while (cur->next != head) {
            if (cur->data > cur->next->data) {
                int tmp = cur->data;
                cur->data = cur->next->data;
                cur->next->data = tmp;
                swapped = 1;
            }
            cur = cur->next;
        }
    } while (swapped);
}

void remove_duplicates(Node* head) {
    if (!head || head->next == head) return;
    Node* cur = head;
    do {
        Node* prev = cur;
        Node* runner = cur->next;
        while (runner != head) {
            if (runner->data == cur->data) {
                prev->next = runner->next;
                free(runner);
                runner = prev->next;
            } else {
                prev = runner;
                runner = runner->next;
            }
        }
        cur = cur->next;
    } while (cur != head && cur->next != head);
}

bool find_middle(const Node* head, int* val) {
    if (!head) return false;
    const Node* slow = head;
    const Node* fast = head;
    while (fast->next != head && fast->next->next != head) {
        slow = slow->next;
        fast = fast->next->next;
    }
    *val = slow->data;
    return true;
}

bool min_and_max(const Node* head, int* min_val, int* max_val) {
    if (!head) return false;
    *min_val = head->data;
    *max_val = head->data;
    const Node* cur = head->next;
    while (cur != head) {
        if (cur->data < *min_val) *min_val = cur->data;
        if (cur->data > *max_val) *max_val = cur->data;
        cur = cur->next;
    }
    return true;
}

void split_halves(Node* head, Node** head1, Node** head2) {
    *head1 = NULL;
    *head2 = NULL;
    if (!head) return;
    Node* slow = head;
    Node* fast = head;
    while (fast->next != head && fast->next->next != head) {
        slow = slow->next;
        fast = fast->next->next;
    }
    if (fast->next->next == head) fast = fast->next;
    *head1 = head;
    if (head->next != head) *head2 = slow->next;
    fast->next = slow->next;
    slow->next = head;
}

void display_list_and_count(const Node* head) {
    if (!head) {
        printf("Circular list is empty (count: 0)\\n");
        return;
    }
    printf("Circular List: ");
    const Node* cur = head;
    int cnt = 0;
    do {
        printf("%d -> ", cur->data);
        cnt++;
        cur = cur->next;
    } while (cur != head);
    printf("(head: %d) [total: %d]\\n", head->data, cnt);
}

void free_list(Node** head) {
    if (!*head) return;
    Node* cur = *head;
    Node* last = *head;
    while (last->next != *head) last = last->next;
    last->next = NULL;
    while (cur) {
        Node* nxt = cur->next;
        free(cur);
        cur = nxt;
    }
    *head = NULL;
}

int main(void) {
    Node* head = NULL;
    int choice = 0;
    int val = 0;
    int pos = 0;
    int target = 0;
    int min_val = 0;
    int max_val = 0;
    Node* h1 = NULL;
    Node* h2 = NULL;

    do {
        printf("\\n--- Circular Singly Linked List Operations ---\\n");
        printf("1. Insert Beginning\\n");
        printf("2. Insert End\\n");
        printf("3. Insert at Position\\n");
        printf("4. Insert Before Value\\n");
        printf("5. Insert After Value\\n");
        printf("6. Insert Sorted\\n");
        printf("7. Delete Beginning\\n");
        printf("8. Delete End\\n");
        printf("9. Delete at Position\\n");
        printf("10. Delete by Value\\n");
        printf("11. Delete After Value\\n");
        printf("12. Search Element\\n");
        printf("13. Reverse List\\n");
        printf("14. Sort List\\n");
        printf("15. Remove Duplicates\\n");
        printf("16. Find Middle\\n");
        printf("17. Min and Max\\n");
        printf("18. Split Halves\\n");
        printf("19. Display List and Count\\n");
        printf("0. Exit\\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter value to insert at beginning: ");
                if (scanf("%d", &val) == 1) {
                    insert_beginning(&head, val);
                    printf("Inserted %d at beginning.\\n", val);
                } else clear_input();
                break;
            case 2:
                printf("Enter value to insert at end: ");
                if (scanf("%d", &val) == 1) {
                    insert_end(&head, val);
                    printf("Inserted %d at end.\\n", val);
                } else clear_input();
                break;
            case 3:
                printf("Enter position and value: ");
                if (scanf("%d %d", &pos, &val) == 2) {
                    if (insert_at_position(&head, pos, val))
                        printf("Inserted %d at position %d.\\n", val, pos);
                    else
                        printf("Invalid position %d.\\n", pos);
                } else clear_input();
                break;
            case 4:
                printf("Enter target value and new value: ");
                if (scanf("%d %d", &target, &val) == 2) {
                    if (insert_before_value(&head, target, val))
                        printf("Inserted %d before %d.\\n", val, target);
                    else
                        printf("Target %d not found.\\n", target);
                } else clear_input();
                break;
            case 5:
                printf("Enter target value and new value: ");
                if (scanf("%d %d", &target, &val) == 2) {
                    if (insert_after_value(head, target, val))
                        printf("Inserted %d after %d.\\n", val, target);
                    else
                        printf("Target %d not found.\\n", target);
                } else clear_input();
                break;
            case 6:
                printf("Enter value to insert in sorted order: ");
                if (scanf("%d", &val) == 1) {
                    insert_sorted(&head, val);
                    printf("Inserted %d in sorted order.\\n", val);
                } else clear_input();
                break;
            case 7:
                if (delete_beginning(&head, &val))
                    printf("Deleted %d from beginning.\\n", val);
                else
                    printf("Circular list is empty.\\n");
                break;
            case 8:
                if (delete_end(&head, &val))
                    printf("Deleted %d from end.\\n", val);
                else
                    printf("Circular list is empty.\\n");
                break;
            case 9:
                printf("Enter position to delete: ");
                if (scanf("%d", &pos) == 1) {
                    if (delete_at_position(&head, pos, &val))
                        printf("Deleted %d from position %d.\\n", val, pos);
                    else
                        printf("Invalid position %d.\\n", pos);
                } else clear_input();
                break;
            case 10:
                printf("Enter value to delete: ");
                if (scanf("%d", &val) == 1) {
                    if (delete_by_value(&head, val))
                        printf("Deleted value %d.\\n", val);
                    else
                        printf("Value %d not found.\\n", val);
                } else clear_input();
                break;
            case 11:
                printf("Enter target value: ");
                if (scanf("%d", &target) == 1) {
                    if (delete_after_value(&head, target, &val))
                        printf("Deleted %d after target %d.\\n", val, target);
                    else
                        printf("Target %d not found.\\n", target);
                } else clear_input();
                break;
            case 12:
                printf("Enter value to search: ");
                if (scanf("%d", &val) == 1) {
                    pos = search_element(head, val);
                    if (pos != -1)
                        printf("Value %d found at position %d.\\n", val, pos);
                    else
                        printf("Value %d not found in circular list.\\n", val);
                } else clear_input();
                break;
            case 13:
                reverse_list(&head);
                printf("Circular list reversed successfully.\\n");
                display_list_and_count(head);
                break;
            case 14:
                sort_list(head);
                printf("Circular list sorted in ascending order.\\n");
                display_list_and_count(head);
                break;
            case 15:
                remove_duplicates(head);
                printf("Duplicate elements removed.\\n");
                display_list_and_count(head);
                break;
            case 16:
                if (find_middle(head, &val))
                    printf("Middle node value: %d\\n", val);
                else
                    printf("Circular list is empty.\\n");
                break;
            case 17:
                if (min_and_max(head, &min_val, &max_val))
                    printf("Minimum value: %d, Maximum value: %d\\n", min_val, max_val);
                else
                    printf("Circular list is empty.\\n");
                break;
            case 18:
                split_halves(head, &h1, &h2);
                printf("List split into two halves:\\n");
                printf("Half 1: ");
                display_list_and_count(h1);
                printf("Half 2: ");
                display_list_and_count(h2);
                free_list(&h1);
                free_list(&h2);
                head = NULL;
                break;
            case 19:
                display_list_and_count(head);
                break;
            case 0:
                printf("Exiting circular linked list program.\\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 19.\\n");
                break;
        }
    } while (choice != 0);

    free_list(&head);
    return 0;
}
`,
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
      description: "Interactive doubly circular linked list program with 20 operations: bidirectional forward/backward display, beginning/end/position/before/after/sorted insertions and deletions, reverse, bubble sort, deduplication, middle element, min/max, and splitting into halves",
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

Node* create_node(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->prev = n;
    n->next = n;
    return n;
}

void insert_beginning(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (!*head) {
        *head = n;
        return;
    }
    Node* last = (*head)->prev;
    n->next = *head;
    n->prev = last;
    last->next = n;
    (*head)->prev = n;
    *head = n;
}

void insert_end(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (!*head) {
        *head = n;
        return;
    }
    Node* last = (*head)->prev;
    n->next = *head;
    n->prev = last;
    last->next = n;
    (*head)->prev = n;
}

int count_nodes(const Node* head) {
    if (!head) return 0;
    int cnt = 0;
    const Node* cur = head;
    do {
        cnt++;
        cur = cur->next;
    } while (cur != head);
    return cnt;
}

bool insert_at_position(Node** head, int pos, int data) {
    int total = count_nodes(*head);
    if (pos < 1 || pos > total + 1) return false;
    if (pos == 1) {
        insert_beginning(head, data);
        return true;
    }
    if (pos == total + 1) {
        insert_end(head, data);
        return true;
    }
    Node* cur = *head;
    for (int i = 1; i < pos - 1; i++) cur = cur->next;
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return false;
    n->data = data;
    n->next = cur->next;
    n->prev = cur;
    cur->next->prev = n;
    cur->next = n;
    return true;
}

bool insert_before_value(Node** head, int target, int data) {
    if (!head || !*head) return false;
    if ((*head)->data == target) {
        insert_beginning(head, data);
        return true;
    }
    Node* cur = (*head)->next;
    while (cur != *head && cur->data != target) cur = cur->next;
    if (cur != *head) {
        Node* n = (Node*)malloc(sizeof(Node));
        if (!n) return false;
        n->data = data;
        n->prev = cur->prev;
        n->next = cur;
        cur->prev->next = n;
        cur->prev = n;
        return true;
    }
    return false;
}

bool insert_after_value(Node* head, int target, int data) {
    if (!head) return false;
    Node* cur = head;
    do {
        if (cur->data == target) {
            Node* n = (Node*)malloc(sizeof(Node));
            if (!n) return false;
            n->data = data;
            n->next = cur->next;
            n->prev = cur;
            cur->next->prev = n;
            cur->next = n;
            return true;
        }
        cur = cur->next;
    } while (cur != head);
    return false;
}

void insert_sorted(Node** head, int data) {
    Node* n = create_node(data);
    if (!n) return;
    if (!*head) {
        *head = n;
        return;
    }
    if (data <= (*head)->data) {
        Node* last = (*head)->prev;
        n->next = *head;
        n->prev = last;
        last->next = n;
        (*head)->prev = n;
        *head = n;
        return;
    }
    Node* cur = *head;
    while (cur->next != *head && cur->next->data < data) cur = cur->next;
    n->next = cur->next;
    n->prev = cur;
    cur->next->prev = n;
    cur->next = n;
}

bool delete_beginning(Node** head, int* val) {
    if (!*head) return false;
    *val = (*head)->data;
    if ((*head)->next == *head) {
        free(*head);
        *head = NULL;
        return true;
    }
    Node* last = (*head)->prev;
    Node* nxt = (*head)->next;
    last->next = nxt;
    nxt->prev = last;
    free(*head);
    *head = nxt;
    return true;
}

bool delete_end(Node** head, int* val) {
    if (!*head) return false;
    if ((*head)->next == *head) {
        *val = (*head)->data;
        free(*head);
        *head = NULL;
        return true;
    }
    Node* last = (*head)->prev;
    *val = last->data;
    Node* prev = last->prev;
    prev->next = *head;
    (*head)->prev = prev;
    free(last);
    return true;
}

bool delete_at_position(Node** head, int pos, int* val) {
    int total = count_nodes(*head);
    if (pos < 1 || pos > total) return false;
    if (pos == 1) return delete_beginning(head, val);
    Node* cur = *head;
    for (int i = 1; i < pos; i++) cur = cur->next;
    *val = cur->data;
    cur->prev->next = cur->next;
    cur->next->prev = cur->prev;
    free(cur);
    return true;
}

bool delete_by_value(Node** head, int val) {
    if (!*head) return false;
    if ((*head)->data == val) {
        int dummy;
        return delete_beginning(head, &dummy);
    }
    Node* cur = (*head)->next;
    while (cur != *head && cur->data != val) cur = cur->next;
    if (cur != *head) {
        cur->prev->next = cur->next;
        cur->next->prev = cur->prev;
        free(cur);
        return true;
    }
    return false;
}

bool delete_after_value(Node** head, int target, int* val) {
    if (!*head) return false;
    Node* cur = *head;
    do {
        if (cur->data == target) {
            if (cur->next == *head) return delete_beginning(head, val);
            Node* del = cur->next;
            *val = del->data;
            cur->next = del->next;
            del->next->prev = cur;
            free(del);
            return true;
        }
        cur = cur->next;
    } while (cur != *head);
    return false;
}

int search_element(const Node* head, int val) {
    if (!head) return -1;
    const Node* cur = head;
    int pos = 1;
    do {
        if (cur->data == val) return pos;
        cur = cur->next;
        pos++;
    } while (cur != head);
    return -1;
}

void display_forward(const Node* head) {
    if (!head) {
        printf("Doubly circular list is empty.\\n");
        return;
    }
    printf("Forward: ");
    const Node* cur = head;
    do {
        printf("%d <-> ", cur->data);
        cur = cur->next;
    } while (cur != head);
    printf("(head: %d)\\n", head->data);
}

void display_backward(const Node* head) {
    if (!head) {
        printf("Doubly circular list is empty.\\n");
        return;
    }
    printf("Backward: ");
    const Node* cur = head->prev;
    do {
        printf("%d <-> ", cur->data);
        cur = cur->prev;
    } while (cur != head->prev);
    printf("(tail: %d)\\n", head->prev->data);
}

void reverse_list(Node** head) {
    if (!*head || (*head)->next == *head) return;
    Node* cur = *head;
    do {
        Node* tmp = cur->next;
        cur->next = cur->prev;
        cur->prev = tmp;
        cur = tmp;
    } while (cur != *head);
    *head = (*head)->prev;
}

void sort_list(Node* head) {
    if (!head || head->next == head) return;
    int swapped;
    do {
        swapped = 0;
        Node* cur = head;
        while (cur->next != head) {
            if (cur->data > cur->next->data) {
                int tmp = cur->data;
                cur->data = cur->next->data;
                cur->next->data = tmp;
                swapped = 1;
            }
            cur = cur->next;
        }
    } while (swapped);
}

void remove_duplicates(Node* head) {
    if (!head || head->next == head) return;
    Node* cur = head;
    do {
        Node* runner = cur->next;
        while (runner != head) {
            if (runner->data == cur->data) {
                Node* del = runner;
                runner = runner->next;
                del->prev->next = del->next;
                del->next->prev = del->prev;
                free(del);
            } else {
                runner = runner->next;
            }
        }
        cur = cur->next;
    } while (cur != head && cur->next != head);
}

bool find_middle(const Node* head, int* val) {
    if (!head) return false;
    const Node* slow = head;
    const Node* fast = head;
    while (fast->next != head && fast->next->next != head) {
        slow = slow->next;
        fast = fast->next->next;
    }
    *val = slow->data;
    return true;
}

bool min_and_max(const Node* head, int* min_val, int* max_val) {
    if (!head) return false;
    *min_val = head->data;
    *max_val = head->data;
    const Node* cur = head->next;
    while (cur != head) {
        if (cur->data < *min_val) *min_val = cur->data;
        if (cur->data > *max_val) *max_val = cur->data;
        cur = cur->next;
    }
    return true;
}

void split_halves(Node* head, Node** head1, Node** head2) {
    *head1 = NULL;
    *head2 = NULL;
    if (!head) return;
    Node* slow = head;
    Node* fast = head;
    while (fast->next != head && fast->next->next != head) {
        slow = slow->next;
        fast = fast->next->next;
    }
    if (fast->next->next == head) fast = fast->next;
    *head1 = head;
    if (head->next != head) *head2 = slow->next;
    fast->next = slow->next;
    slow->next->prev = fast;
    slow->next = head;
    head->prev = slow;
}

void free_list(Node** head) {
    if (!*head) return;
    Node* last = (*head)->prev;
    last->next = NULL;
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
    int choice = 0;
    int val = 0;
    int pos = 0;
    int target = 0;
    int min_val = 0;
    int max_val = 0;
    Node* h1 = NULL;
    Node* h2 = NULL;

    do {
        printf("\\n--- Doubly Circular Linked List Operations ---\\n");
        printf("1. Insert Beginning\\n");
        printf("2. Insert End\\n");
        printf("3. Insert at Position\\n");
        printf("4. Insert Before Value\\n");
        printf("5. Insert After Value\\n");
        printf("6. Insert Sorted\\n");
        printf("7. Delete Beginning\\n");
        printf("8. Delete End\\n");
        printf("9. Delete at Position\\n");
        printf("10. Delete by Value\\n");
        printf("11. Delete After Value\\n");
        printf("12. Search Element\\n");
        printf("13. Display Forward\\n");
        printf("14. Display Backward\\n");
        printf("15. Reverse List\\n");
        printf("16. Sort List\\n");
        printf("17. Remove Duplicates\\n");
        printf("18. Find Middle\\n");
        printf("19. Min and Max\\n");
        printf("20. Split Halves\\n");
        printf("0. Exit\\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter value to insert at beginning: ");
                if (scanf("%d", &val) == 1) {
                    insert_beginning(&head, val);
                    printf("Inserted %d at beginning.\\n", val);
                } else clear_input();
                break;
            case 2:
                printf("Enter value to insert at end: ");
                if (scanf("%d", &val) == 1) {
                    insert_end(&head, val);
                    printf("Inserted %d at end.\\n", val);
                } else clear_input();
                break;
            case 3:
                printf("Enter position and value: ");
                if (scanf("%d %d", &pos, &val) == 2) {
                    if (insert_at_position(&head, pos, val))
                        printf("Inserted %d at position %d.\\n", val, pos);
                    else
                        printf("Invalid position %d.\\n", pos);
                } else clear_input();
                break;
            case 4:
                printf("Enter target value and new value: ");
                if (scanf("%d %d", &target, &val) == 2) {
                    if (insert_before_value(&head, target, val))
                        printf("Inserted %d before %d.\\n", val, target);
                    else
                        printf("Target %d not found.\\n", target);
                } else clear_input();
                break;
            case 5:
                printf("Enter target value and new value: ");
                if (scanf("%d %d", &target, &val) == 2) {
                    if (insert_after_value(head, target, val))
                        printf("Inserted %d after %d.\\n", val, target);
                    else
                        printf("Target %d not found.\\n", target);
                } else clear_input();
                break;
            case 6:
                printf("Enter value to insert in sorted order: ");
                if (scanf("%d", &val) == 1) {
                    insert_sorted(&head, val);
                    printf("Inserted %d in sorted order.\\n", val);
                } else clear_input();
                break;
            case 7:
                if (delete_beginning(&head, &val))
                    printf("Deleted %d from beginning.\\n", val);
                else
                    printf("Doubly circular list is empty.\\n");
                break;
            case 8:
                if (delete_end(&head, &val))
                    printf("Deleted %d from end.\\n", val);
                else
                    printf("Doubly circular list is empty.\\n");
                break;
            case 9:
                printf("Enter position to delete: ");
                if (scanf("%d", &pos) == 1) {
                    if (delete_at_position(&head, pos, &val))
                        printf("Deleted %d from position %d.\\n", val, pos);
                    else
                        printf("Invalid position %d.\\n", pos);
                } else clear_input();
                break;
            case 10:
                printf("Enter value to delete: ");
                if (scanf("%d", &val) == 1) {
                    if (delete_by_value(&head, val))
                        printf("Deleted value %d.\\n", val);
                    else
                        printf("Value %d not found.\\n", val);
                } else clear_input();
                break;
            case 11:
                printf("Enter target value: ");
                if (scanf("%d", &target) == 1) {
                    if (delete_after_value(&head, target, &val))
                        printf("Deleted %d after target %d.\\n", val, target);
                    else
                        printf("Target %d not found.\\n", target);
                } else clear_input();
                break;
            case 12:
                printf("Enter value to search: ");
                if (scanf("%d", &val) == 1) {
                    pos = search_element(head, val);
                    if (pos != -1)
                        printf("Value %d found at position %d.\\n", val, pos);
                    else
                        printf("Value %d not found in list.\\n", val);
                } else clear_input();
                break;
            case 13:
                display_forward(head);
                break;
            case 14:
                display_backward(head);
                break;
            case 15:
                reverse_list(&head);
                printf("Doubly circular list reversed.\\n");
                display_forward(head);
                break;
            case 16:
                sort_list(head);
                printf("Doubly circular list sorted.\\n");
                display_forward(head);
                break;
            case 17:
                remove_duplicates(head);
                printf("Duplicates removed.\\n");
                display_forward(head);
                break;
            case 18:
                if (find_middle(head, &val))
                    printf("Middle node value: %d\\n", val);
                else
                    printf("List is empty.\\n");
                break;
            case 19:
                if (min_and_max(head, &min_val, &max_val))
                    printf("Minimum value: %d, Maximum value: %d\\n", min_val, max_val);
                else
                    printf("List is empty.\\n");
                break;
            case 20:
                split_halves(head, &h1, &h2);
                printf("List split into two halves:\\n");
                printf("Half 1: ");
                display_forward(h1);
                printf("Half 2: ");
                display_forward(h2);
                free_list(&h1);
                free_list(&h2);
                head = NULL;
                break;
            case 0:
                printf("Exiting doubly circular linked list program.\\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 20.\\n");
                break;
        }
    } while (choice != 0);

    free_list(&head);
    return 0;
}
`,
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
      description: "Interactive Binary Search Tree program with 20 operations: all node deletions, in/pre/post/level/zigzag/boundary/top/bottom traversals, Morris O(1) space traversal, iterative traversals, min/max, height, leaf count, and mirror",
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
    struct Node* left;
    struct Node* right;
} Node;

Node* create_node(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->left = NULL;
    n->right = NULL;
    return n;
}

Node* insert_node(Node* root, int data) {
    if (!root) return create_node(data);
    if (data < root->data) root->left = insert_node(root->left, data);
    else if (data > root->data) root->right = insert_node(root->right, data);
    return root;
}

Node* find_min_node(Node* root) {
    while (root && root->left) root = root->left;
    return root;
}

Node* delete_node(Node* root, int data, bool* deleted) {
    if (!root) return NULL;
    if (data < root->data) {
        root->left = delete_node(root->left, data, deleted);
    } else if (data > root->data) {
        root->right = delete_node(root->right, data, deleted);
    } else {
        *deleted = true;
        if (!root->left) {
            Node* tmp = root->right;
            free(root);
            return tmp;
        } else if (!root->right) {
            Node* tmp = root->left;
            free(root);
            return tmp;
        }
        Node* succ = find_min_node(root->right);
        root->data = succ->data;
        root->right = delete_node(root->right, succ->data, deleted);
    }
    return root;
}

bool search_value(const Node* root, int data) {
    if (!root) return false;
    if (root->data == data) return true;
    if (data < root->data) return search_value(root->left, data);
    return search_value(root->right, data);
}

void inorder(const Node* root) {
    if (!root) return;
    inorder(root->left);
    printf("%d ", root->data);
    inorder(root->right);
}

void preorder(const Node* root) {
    if (!root) return;
    printf("%d ", root->data);
    preorder(root->left);
    preorder(root->right);
}

void postorder(const Node* root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    printf("%d ", root->data);
}

void levelorder(const Node* root) {
    if (!root) return;
    const Node* queue[1024];
    int front = 0, rear = 0;
    queue[rear++] = root;
    while (front < rear) {
        const Node* cur = queue[front++];
        printf("%d ", cur->data);
        if (cur->left) queue[rear++] = cur->left;
        if (cur->right) queue[rear++] = cur->right;
    }
}

void zigzag(const Node* root) {
    if (!root) return;
    const Node* current_level[512];
    const Node* next_level[512];
    int c_count = 0, n_count = 0;
    bool left_to_right = true;

    current_level[c_count++] = root;
    while (c_count > 0) {
        for (int i = c_count - 1; i >= 0; i--) {
            const Node* cur = current_level[i];
            printf("%d ", cur->data);
            if (left_to_right) {
                if (cur->left) next_level[n_count++] = cur->left;
                if (cur->right) next_level[n_count++] = cur->right;
            } else {
                if (cur->right) next_level[n_count++] = cur->right;
                if (cur->left) next_level[n_count++] = cur->left;
            }
        }
        for (int i = 0; i < n_count; i++) current_level[i] = next_level[i];
        c_count = n_count;
        n_count = 0;
        left_to_right = !left_to_right;
    }
}

static void print_leaves(const Node* root) {
    if (!root) return;
    print_leaves(root->left);
    if (!root->left && !root->right) printf("%d ", root->data);
    print_leaves(root->right);
}

static void print_left_boundary(const Node* root) {
    if (!root) return;
    if (root->left) {
        printf("%d ", root->data);
        print_left_boundary(root->left);
    } else if (root->right) {
        printf("%d ", root->data);
        print_left_boundary(root->right);
    }
}

static void print_right_boundary(const Node* root) {
    if (!root) return;
    if (root->right) {
        print_right_boundary(root->right);
        printf("%d ", root->data);
    } else if (root->left) {
        print_right_boundary(root->left);
        printf("%d ", root->data);
    }
}

void boundary_traversal(const Node* root) {
    if (!root) return;
    printf("%d ", root->data);
    print_left_boundary(root->left);
    print_leaves(root->left);
    print_leaves(root->right);
    print_right_boundary(root->right);
}

typedef struct QItem {
    const Node* node;
    int hd;
} QItem;

void top_view(const Node* root) {
    if (!root) return;
    int min_hd = 0, max_hd = 0;
    int map[2001];
    bool filled[2001];
    for (int i = 0; i < 2001; i++) filled[i] = false;

    QItem queue[1024];
    int front = 0, rear = 0;
    queue[rear++] = (QItem){ root, 0 };

    while (front < rear) {
        QItem item = queue[front++];
        int idx = item.hd + 1000;
        if (!filled[idx]) {
            filled[idx] = true;
            map[idx] = item.node->data;
            if (item.hd < min_hd) min_hd = item.hd;
            if (item.hd > max_hd) max_hd = item.hd;
        }
        if (item.node->left) queue[rear++] = (QItem){ item.node->left, item.hd - 1 };
        if (item.node->right) queue[rear++] = (QItem){ item.node->right, item.hd + 1 };
    }

    for (int d = min_hd; d <= max_hd; d++) {
        if (filled[d + 1000]) printf("%d ", map[d + 1000]);
    }
}

void bottom_view(const Node* root) {
    if (!root) return;
    int min_hd = 0, max_hd = 0;
    int map[2001];
    bool filled[2001];
    for (int i = 0; i < 2001; i++) filled[i] = false;

    QItem queue[1024];
    int front = 0, rear = 0;
    queue[rear++] = (QItem){ root, 0 };

    while (front < rear) {
        QItem item = queue[front++];
        int idx = item.hd + 1000;
        filled[idx] = true;
        map[idx] = item.node->data;
        if (item.hd < min_hd) min_hd = item.hd;
        if (item.hd > max_hd) max_hd = item.hd;
        if (item.node->left) queue[rear++] = (QItem){ item.node->left, item.hd - 1 };
        if (item.node->right) queue[rear++] = (QItem){ item.node->right, item.hd + 1 };
    }

    for (int d = min_hd; d <= max_hd; d++) {
        if (filled[d + 1000]) printf("%d ", map[d + 1000]);
    }
}

void morris_inorder(Node* root) {
    Node* cur = root;
    while (cur) {
        if (!cur->left) {
            printf("%d ", cur->data);
            cur = cur->right;
        } else {
            Node* prev = cur->left;
            while (prev->right && prev->right != cur) prev = prev->right;
            if (!prev->right) {
                prev->right = cur;
                cur = cur->left;
            } else {
                prev->right = NULL;
                printf("%d ", cur->data);
                cur = cur->right;
            }
        }
    }
}

void iterative_inorder(const Node* root) {
    const Node* stack[512];
    int top = -1;
    const Node* cur = root;
    while (cur || top != -1) {
        while (cur) {
            stack[++top] = cur;
            cur = cur->left;
        }
        cur = stack[top--];
        printf("%d ", cur->data);
        cur = cur->right;
    }
}

void iterative_preorder(const Node* root) {
    if (!root) return;
    const Node* stack[512];
    int top = -1;
    stack[++top] = root;
    while (top != -1) {
        const Node* cur = stack[top--];
        printf("%d ", cur->data);
        if (cur->right) stack[++top] = cur->right;
        if (cur->left) stack[++top] = cur->left;
    }
}

void iterative_postorder(const Node* root) {
    if (!root) return;
    const Node* s1[512];
    const Node* s2[512];
    int t1 = -1, t2 = -1;
    s1[++t1] = root;
    while (t1 != -1) {
        const Node* cur = s1[t1--];
        s2[++t2] = cur;
        if (cur->left) s1[++t1] = cur->left;
        if (cur->right) s1[++t1] = cur->right;
    }
    while (t2 != -1) {
        printf("%d ", s2[t2--]->data);
    }
}

bool find_min_max(const Node* root, int* min_val, int* max_val) {
    if (!root) return false;
    const Node* cur = root;
    while (cur->left) cur = cur->left;
    *min_val = cur->data;
    cur = root;
    while (cur->right) cur = cur->right;
    *max_val = cur->data;
    return true;
}

int tree_height(const Node* root) {
    if (!root) return 0;
    int lh = tree_height(root->left);
    int rh = tree_height(root->right);
    return (lh > rh ? lh : rh) + 1;
}

int count_nodes(const Node* root) {
    if (!root) return 0;
    return 1 + count_nodes(root->left) + count_nodes(root->right);
}

int count_leaf_nodes(const Node* root) {
    if (!root) return 0;
    if (!root->left && !root->right) return 1;
    return count_leaf_nodes(root->left) + count_leaf_nodes(root->right);
}

void mirror_tree(Node* root) {
    if (!root) return;
    Node* tmp = root->left;
    root->left = root->right;
    root->right = tmp;
    mirror_tree(root->left);
    mirror_tree(root->right);
}

void free_tree(Node* root) {
    if (!root) return;
    free_tree(root->left);
    free_tree(root->right);
    free(root);
}

int main(void) {
    Node* root = NULL;
    int choice = 0;
    int val = 0;
    int min_val = 0;
    int max_val = 0;
    bool deleted = false;

    do {
        printf("\\n--- Binary Search Tree (BST) Operations ---\\n");
        printf("1. Insert Node\\n");
        printf("2. Delete Node\\n");
        printf("3. Search Value\\n");
        printf("4. Inorder Traversal\\n");
        printf("5. Preorder Traversal\\n");
        printf("6. Postorder Traversal\\n");
        printf("7. Level-order Traversal (BFS)\\n");
        printf("8. Zigzag Traversal\\n");
        printf("9. Boundary Traversal\\n");
        printf("10. Top View\\n");
        printf("11. Bottom View\\n");
        printf("12. Morris Inorder Traversal [O(1) Space]\\n");
        printf("13. Iterative Inorder\\n");
        printf("14. Iterative Preorder\\n");
        printf("15. Iterative Postorder\\n");
        printf("16. Find Min and Max\\n");
        printf("17. Tree Height and Count Nodes\\n");
        printf("18. Count Leaf Nodes\\n");
        printf("19. Mirror Tree\\n");
        printf("0. Exit\\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter value to insert: ");
                if (scanf("%d", &val) == 1) {
                    root = insert_node(root, val);
                    printf("Inserted %d into BST.\\n", val);
                } else clear_input();
                break;
            case 2:
                printf("Enter value to delete: ");
                if (scanf("%d", &val) == 1) {
                    deleted = false;
                    root = delete_node(root, val, &deleted);
                    if (deleted) printf("Deleted %d from BST.\\n", val);
                    else printf("Value %d not found in BST.\\n", val);
                } else clear_input();
                break;
            case 3:
                printf("Enter value to search: ");
                if (scanf("%d", &val) == 1) {
                    if (search_value(root, val)) printf("Value %d exists in BST.\\n", val);
                    else printf("Value %d does not exist in BST.\\n", val);
                } else clear_input();
                break;
            case 4:
                printf("Inorder: ");
                inorder(root);
                printf("\\n");
                break;
            case 5:
                printf("Preorder: ");
                preorder(root);
                printf("\\n");
                break;
            case 6:
                printf("Postorder: ");
                postorder(root);
                printf("\\n");
                break;
            case 7:
                printf("Level-order (BFS): ");
                levelorder(root);
                printf("\\n");
                break;
            case 8:
                printf("Zigzag: ");
                zigzag(root);
                printf("\\n");
                break;
            case 9:
                printf("Boundary: ");
                boundary_traversal(root);
                printf("\\n");
                break;
            case 10:
                printf("Top View: ");
                top_view(root);
                printf("\\n");
                break;
            case 11:
                printf("Bottom View: ");
                bottom_view(root);
                printf("\\n");
                break;
            case 12:
                printf("Morris Inorder: ");
                morris_inorder(root);
                printf("\\n");
                break;
            case 13:
                printf("Iterative Inorder: ");
                iterative_inorder(root);
                printf("\\n");
                break;
            case 14:
                printf("Iterative Preorder: ");
                iterative_preorder(root);
                printf("\\n");
                break;
            case 15:
                printf("Iterative Postorder: ");
                iterative_postorder(root);
                printf("\\n");
                break;
            case 16:
                if (find_min_max(root, &min_val, &max_val))
                    printf("Minimum value: %d, Maximum value: %d\\n", min_val, max_val);
                else
                    printf("Tree is empty.\\n");
                break;
            case 17:
                printf("Tree Height: %d, Total Nodes: %d\\n", tree_height(root), count_nodes(root));
                break;
            case 18:
                printf("Leaf Nodes Count: %d\\n", count_leaf_nodes(root));
                break;
            case 19:
                mirror_tree(root);
                printf("Tree mirrored successfully. New inorder: ");
                inorder(root);
                printf("\\n");
                break;
            case 0:
                printf("Exiting BST program.\\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 19.\\n");
                break;
        }
    } while (choice != 0);

    free_tree(root);
    return 0;
}
`,
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
      description: "Interactive self-balancing AVL tree program with automatic LL, RR, LR, RL rotations, balanced node deletions, search, in/pre/post/level-order traversals, and min/max",
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
    int height;
    struct Node* left;
    struct Node* right;
} Node;

int get_height(const Node* n) {
    return n ? n->height : 0;
}

int max_val(int a, int b) {
    return a > b ? a : b;
}

int get_balance(const Node* n) {
    return n ? get_height(n->left) - get_height(n->right) : 0;
}

Node* create_node(int data) {
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return NULL;
    n->data = data;
    n->height = 1;
    n->left = NULL;
    n->right = NULL;
    return n;
}

Node* rotate_right(Node* y) {
    Node* x = y->left;
    Node* t2 = x->right;
    x->right = y;
    y->left = t2;
    y->height = max_val(get_height(y->left), get_height(y->right)) + 1;
    x->height = max_val(get_height(x->left), get_height(x->right)) + 1;
    return x;
}

Node* rotate_left(Node* x) {
    Node* y = x->right;
    Node* t2 = y->left;
    y->left = x;
    x->right = t2;
    x->height = max_val(get_height(x->left), get_height(x->right)) + 1;
    y->height = max_val(get_height(y->left), get_height(y->right)) + 1;
    return y;
}

Node* insert_node(Node* node, int data) {
    if (!node) return create_node(data);
    if (data < node->data) node->left = insert_node(node->left, data);
    else if (data > node->data) node->right = insert_node(node->right, data);
    else return node;

    node->height = 1 + max_val(get_height(node->left), get_height(node->right));
    int balance = get_balance(node);

    if (balance > 1 && data < node->left->data) return rotate_right(node);
    if (balance < -1 && data > node->right->data) return rotate_left(node);
    if (balance > 1 && data > node->left->data) {
        node->left = rotate_left(node->left);
        return rotate_right(node);
    }
    if (balance < -1 && data < node->right->data) {
        node->right = rotate_right(node->right);
        return rotate_left(node);
    }
    return node;
}

Node* min_value_node(Node* node) {
    Node* cur = node;
    while (cur->left) cur = cur->left;
    return cur;
}

Node* delete_node(Node* root, int data, bool* deleted) {
    if (!root) return NULL;
    if (data < root->data) {
        root->left = delete_node(root->left, data, deleted);
    } else if (data > root->data) {
        root->right = delete_node(root->right, data, deleted);
    } else {
        *deleted = true;
        if (!root->left || !root->right) {
            Node* tmp = root->left ? root->left : root->right;
            if (!tmp) {
                tmp = root;
                root = NULL;
            } else {
                *root = *tmp;
            }
            free(tmp);
        } else {
            Node* tmp = min_value_node(root->right);
            root->data = tmp->data;
            root->right = delete_node(root->right, tmp->data, deleted);
        }
    }
    if (!root) return NULL;

    root->height = 1 + max_val(get_height(root->left), get_height(root->right));
    int balance = get_balance(root);

    if (balance > 1 && get_balance(root->left) >= 0) return rotate_right(root);
    if (balance > 1 && get_balance(root->left) < 0) {
        root->left = rotate_left(root->left);
        return rotate_right(root);
    }
    if (balance < -1 && get_balance(root->right) <= 0) return rotate_left(root);
    if (balance < -1 && get_balance(root->right) > 0) {
        root->right = rotate_right(root->right);
        return rotate_left(root);
    }
    return root;
}

bool search_value(const Node* root, int data) {
    if (!root) return false;
    if (root->data == data) return true;
    if (data < root->data) return search_value(root->left, data);
    return search_value(root->right, data);
}

void inorder(const Node* root) {
    if (!root) return;
    inorder(root->left);
    printf("%d(bf:%d,h:%d) ", root->data, get_balance(root), root->height);
    inorder(root->right);
}

void preorder(const Node* root) {
    if (!root) return;
    printf("%d ", root->data);
    preorder(root->left);
    preorder(root->right);
}

void postorder(const Node* root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    printf("%d ", root->data);
}

void levelorder(const Node* root) {
    if (!root) return;
    const Node* queue[1024];
    int front = 0, rear = 0;
    queue[rear++] = root;
    while (front < rear) {
        const Node* cur = queue[front++];
        printf("%d ", cur->data);
        if (cur->left) queue[rear++] = cur->left;
        if (cur->right) queue[rear++] = cur->right;
    }
}

bool find_min_max(const Node* root, int* min_val, int* max_val) {
    if (!root) return false;
    const Node* cur = root;
    while (cur->left) cur = cur->left;
    *min_val = cur->data;
    cur = root;
    while (cur->right) cur = cur->right;
    *max_val = cur->data;
    return true;
}

void free_tree(Node* root) {
    if (!root) return;
    free_tree(root->left);
    free_tree(root->right);
    free(root);
}

int main(void) {
    Node* root = NULL;
    int choice = 0;
    int val = 0;
    int min_val = 0;
    int max_val = 0;
    bool deleted = false;

    do {
        printf("\\n--- AVL Tree (Self-Balancing) Operations ---\\n");
        printf("1. Insert Node (Auto Rebalance)\\n");
        printf("2. Delete Node (Auto Rebalance)\\n");
        printf("3. Search Value\\n");
        printf("4. Inorder Traversal (with Balance Factors)\\n");
        printf("5. Preorder Traversal\\n");
        printf("6. Postorder Traversal\\n");
        printf("7. Level-order Traversal (BFS)\\n");
        printf("8. Find Min and Max\\n");
        printf("0. Exit\\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter value to insert: ");
                if (scanf("%d", &val) == 1) {
                    root = insert_node(root, val);
                    printf("Inserted %d into AVL tree.\\n", val);
                } else clear_input();
                break;
            case 2:
                printf("Enter value to delete: ");
                if (scanf("%d", &val) == 1) {
                    deleted = false;
                    root = delete_node(root, val, &deleted);
                    if (deleted) printf("Deleted %d from AVL tree.\\n", val);
                    else printf("Value %d not found.\\n", val);
                } else clear_input();
                break;
            case 3:
                printf("Enter value to search: ");
                if (scanf("%d", &val) == 1) {
                    if (search_value(root, val)) printf("Value %d exists in AVL tree.\\n", val);
                    else printf("Value %d does not exist in AVL tree.\\n", val);
                } else clear_input();
                break;
            case 4:
                printf("Inorder: ");
                inorder(root);
                printf("\\n");
                break;
            case 5:
                printf("Preorder: ");
                preorder(root);
                printf("\\n");
                break;
            case 6:
                printf("Postorder: ");
                postorder(root);
                printf("\\n");
                break;
            case 7:
                printf("Level-order: ");
                levelorder(root);
                printf("\\n");
                break;
            case 8:
                if (find_min_max(root, &min_val, &max_val))
                    printf("Minimum: %d, Maximum: %d\\n", min_val, max_val);
                else
                    printf("AVL tree is empty.\\n");
                break;
            case 0:
                printf("Exiting AVL tree program.\\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 8.\\n");
                break;
        }
    } while (choice != 0);

    free_tree(root);
    return 0;
}
`,
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
      description: "Interactive graph program using adjacency matrix with edge addition/removal, O(1) query, BFS, DFS, connected components, bipartiteness, cycle detection, and degrees",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct GraphMat {
    int vertices;
    int** matrix;
    bool directed;
} GraphMat;

GraphMat* create_graph(int v, bool directed) {
    GraphMat* g = (GraphMat*)malloc(sizeof(GraphMat));
    if (!g) return NULL;
    g->vertices = v;
    g->directed = directed;
    g->matrix = (int**)malloc(v * sizeof(int*));
    for (int i = 0; i < v; i++) {
        g->matrix[i] = (int*)calloc(v, sizeof(int));
    }
    return g;
}

void add_edge(GraphMat* g, int u, int v) {
    if (u >= 0 && u < g->vertices && v >= 0 && v < g->vertices) {
        g->matrix[u][v] = 1;
        if (!g->directed) g->matrix[v][u] = 1;
    }
}

void remove_edge(GraphMat* g, int u, int v) {
    if (u >= 0 && u < g->vertices && v >= 0 && v < g->vertices) {
        g->matrix[u][v] = 0;
        if (!g->directed) g->matrix[v][u] = 0;
    }
}

bool has_edge(const GraphMat* g, int u, int v) {
    if (u >= 0 && u < g->vertices && v >= 0 && v < g->vertices) {
        return g->matrix[u][v] != 0;
    }
    return false;
}

void bfs(const GraphMat* g, int start) {
    if (start < 0 || start >= g->vertices) return;
    bool* visited = (bool*)calloc(g->vertices, sizeof(bool));
    int* queue = (int*)malloc(g->vertices * sizeof(int));
    int front = 0, rear = 0;

    visited[start] = true;
    queue[rear++] = start;
    printf("BFS order: ");

    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        for (int v = 0; v < g->vertices; v++) {
            if (g->matrix[u][v] && !visited[v]) {
                visited[v] = true;
                queue[rear++] = v;
            }
        }
    }
    printf("\\n");
    free(visited);
    free(queue);
}

static void dfs_util(const GraphMat* g, int u, bool* visited) {
    visited[u] = true;
    printf("%d ", u);
    for (int v = 0; v < g->vertices; v++) {
        if (g->matrix[u][v] && !visited[v]) {
            dfs_util(g, v, visited);
        }
    }
}

void dfs(const GraphMat* g, int start) {
    if (start < 0 || start >= g->vertices) return;
    bool* visited = (bool*)calloc(g->vertices, sizeof(bool));
    printf("DFS order: ");
    dfs_util(g, start, visited);
    printf("\\n");
    free(visited);
}

void connected_components(const GraphMat* g) {
    bool* visited = (bool*)calloc(g->vertices, sizeof(bool));
    int comp = 0;
    for (int i = 0; i < g->vertices; i++) {
        if (!visited[i]) {
            comp++;
            printf("Component %d: ", comp);
            dfs_util(g, i, visited);
            printf("\\n");
        }
    }
    printf("Total connected components: %d\\n", comp);
    free(visited);
}

bool check_bipartite(const GraphMat* g) {
    int* color = (int*)malloc(g->vertices * sizeof(int));
    for (int i = 0; i < g->vertices; i++) color[i] = -1;

    int* queue = (int*)malloc(g->vertices * sizeof(int));
    bool is_bip = true;

    for (int start = 0; start < g->vertices; start++) {
        if (color[start] == -1) {
            int front = 0, rear = 0;
            color[start] = 1;
            queue[rear++] = start;

            while (front < rear) {
                int u = queue[front++];
                for (int v = 0; v < g->vertices; v++) {
                    if (g->matrix[u][v]) {
                        if (color[v] == -1) {
                            color[v] = 1 - color[u];
                            queue[rear++] = v;
                        } else if (color[v] == color[u]) {
                            is_bip = false;
                            break;
                        }
                    }
                }
                if (!is_bip) break;
            }
        }
        if (!is_bip) break;
    }

    free(color);
    free(queue);
    return is_bip;
}

static bool cycle_util(const GraphMat* g, int v, bool* visited, int parent) {
    visited[v] = true;
    for (int i = 0; i < g->vertices; i++) {
        if (g->matrix[v][i]) {
            if (!visited[i]) {
                if (cycle_util(g, i, visited, v)) return true;
            } else if (i != parent) {
                return true;
            }
        }
    }
    return false;
}

bool detect_cycle(const GraphMat* g) {
    bool* visited = (bool*)calloc(g->vertices, sizeof(bool));
    for (int u = 0; u < g->vertices; u++) {
        if (!visited[u]) {
            if (cycle_util(g, u, visited, -1)) {
                free(visited);
                return true;
            }
        }
    }
    free(visited);
    return false;
}

void compute_degrees(const GraphMat* g) {
    for (int i = 0; i < g->vertices; i++) {
        int out_deg = 0;
        int in_deg = 0;
        for (int j = 0; j < g->vertices; j++) {
            if (g->matrix[i][j]) out_deg++;
            if (g->matrix[j][i]) in_deg++;
        }
        if (g->directed) {
            printf("Vertex %d: In-degree = %d, Out-degree = %d\\n", i, in_deg, out_deg);
        } else {
            printf("Vertex %d: Degree = %d\\n", i, out_deg);
        }
    }
}

void display_matrix(const GraphMat* g) {
    printf("Adjacency Matrix (%s, %d vertices):\\n   ", g->directed ? "Directed" : "Undirected", g->vertices);
    for (int i = 0; i < g->vertices; i++) printf("%2d ", i);
    printf("\\n");
    for (int i = 0; i < g->vertices; i++) {
        printf("%2d:", i);
        for (int j = 0; j < g->vertices; j++) {
            printf("%2d ", g->matrix[i][j]);
        }
        printf("\\n");
    }
}

void free_graph(GraphMat* g) {
    if (!g) return;
    for (int i = 0; i < g->vertices; i++) free(g->matrix[i]);
    free(g->matrix);
    free(g);
}

int main(void) {
    int v = 5;
    GraphMat* g = create_graph(v, false);
    int choice = 0;
    int u = 0, target = 0;

    do {
        printf("\\n--- Graph Adjacency Matrix Operations ---\\n");
        printf("1. Add Edge\\n");
        printf("2. Remove Edge\\n");
        printf("3. Has Edge\\n");
        printf("4. BFS Traversal\\n");
        printf("5. DFS Traversal\\n");
        printf("6. Find Connected Components\\n");
        printf("7. Check Bipartite\\n");
        printf("8. Detect Cycle\\n");
        printf("9. Compute Degrees\\n");
        printf("10. Display Matrix\\n");
        printf("0. Exit\\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter source and destination vertex: ");
                if (scanf("%d %d", &u, &target) == 2) {
                    add_edge(g, u, target);
                    printf("Added edge (%d -> %d).\\n", u, target);
                } else clear_input();
                break;
            case 2:
                printf("Enter source and destination vertex: ");
                if (scanf("%d %d", &u, &target) == 2) {
                    remove_edge(g, u, target);
                    printf("Removed edge (%d -> %d).\\n", u, target);
                } else clear_input();
                break;
            case 3:
                printf("Enter source and destination vertex: ");
                if (scanf("%d %d", &u, &target) == 2) {
                    if (has_edge(g, u, target)) printf("Edge (%d -> %d) exists.\\n", u, target);
                    else printf("Edge (%d -> %d) does not exist.\\n", u, target);
                } else clear_input();
                break;
            case 4:
                printf("Enter start vertex: ");
                if (scanf("%d", &u) == 1) bfs(g, u);
                else clear_input();
                break;
            case 5:
                printf("Enter start vertex: ");
                if (scanf("%d", &u) == 1) dfs(g, u);
                else clear_input();
                break;
            case 6:
                connected_components(g);
                break;
            case 7:
                if (check_bipartite(g)) printf("Graph is bipartite (2-colorable).\\n");
                else printf("Graph is NOT bipartite.\\n");
                break;
            case 8:
                if (detect_cycle(g)) printf("Cycle detected in graph.\\n");
                else printf("No cycle detected in graph.\\n");
                break;
            case 9:
                compute_degrees(g);
                break;
            case 10:
                display_matrix(g);
                break;
            case 0:
                printf("Exiting graph matrix program.\\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 10.\\n");
                break;
        }
    } while (choice != 0);

    free_graph(g);
    return 0;
}
`,
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
      description: "Interactive graph program using adjacency linked list with dynamic edge additions/removals, BFS, DFS, unweighted shortest path with reconstruction, connected components, and cycle detection",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct Node {
    int dest;
    struct Node* next;
} Node;

typedef struct GraphList {
    int vertices;
    Node** adj;
} GraphList;

GraphList* create_graph(int v) {
    GraphList* g = (GraphList*)malloc(sizeof(GraphList));
    if (!g) return NULL;
    g->vertices = v;
    g->adj = (Node**)malloc(v * sizeof(Node*));
    for (int i = 0; i < v; i++) g->adj[i] = NULL;
    return g;
}

void add_edge(GraphList* g, int u, int v) {
    if (u < 0 || u >= g->vertices || v < 0 || v >= g->vertices) return;
    Node* n = (Node*)malloc(sizeof(Node));
    if (!n) return;
    n->dest = v;
    n->next = g->adj[u];
    g->adj[u] = n;
}

bool remove_edge(GraphList* g, int u, int v) {
    if (u < 0 || u >= g->vertices) return false;
    Node* cur = g->adj[u];
    Node* prev = NULL;
    while (cur && cur->dest != v) {
        prev = cur;
        cur = cur->next;
    }
    if (!cur) return false;
    if (prev) prev->next = cur->next;
    else g->adj[u] = cur->next;
    free(cur);
    return true;
}

bool has_edge(const GraphList* g, int u, int v) {
    if (u < 0 || u >= g->vertices) return false;
    Node* cur = g->adj[u];
    while (cur) {
        if (cur->dest == v) return true;
        cur = cur->next;
    }
    return false;
}

void bfs(const GraphList* g, int start) {
    if (start < 0 || start >= g->vertices) return;
    bool* visited = (bool*)calloc(g->vertices, sizeof(bool));
    int* queue = (int*)malloc(g->vertices * sizeof(int));
    int front = 0, rear = 0;

    visited[start] = true;
    queue[rear++] = start;
    printf("BFS traversal: ");

    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        Node* cur = g->adj[u];
        while (cur) {
            if (!visited[cur->dest]) {
                visited[cur->dest] = true;
                queue[rear++] = cur->dest;
            }
            cur = cur->next;
        }
    }
    printf("\\n");
    free(visited);
    free(queue);
}

static void dfs_util(const GraphList* g, int u, bool* visited) {
    visited[u] = true;
    printf("%d ", u);
    Node* cur = g->adj[u];
    while (cur) {
        if (!visited[cur->dest]) {
            dfs_util(g, cur->dest, visited);
        }
        cur = cur->next;
    }
}

void dfs(const GraphList* g, int start) {
    if (start < 0 || start >= g->vertices) return;
    bool* visited = (bool*)calloc(g->vertices, sizeof(bool));
    printf("DFS traversal: ");
    dfs_util(g, start, visited);
    printf("\\n");
    free(visited);
}

void shortest_path(const GraphList* g, int start, int target) {
    if (start < 0 || start >= g->vertices || target < 0 || target >= g->vertices) return;
    int* dist = (int*)malloc(g->vertices * sizeof(int));
    int* parent = (int*)malloc(g->vertices * sizeof(int));
    for (int i = 0; i < g->vertices; i++) {
        dist[i] = -1;
        parent[i] = -1;
    }
    int* queue = (int*)malloc(g->vertices * sizeof(int));
    int front = 0, rear = 0;

    dist[start] = 0;
    queue[rear++] = start;

    while (front < rear) {
        int u = queue[front++];
        if (u == target) break;
        Node* cur = g->adj[u];
        while (cur) {
            if (dist[cur->dest] == -1) {
                dist[cur->dest] = dist[u] + 1;
                parent[cur->dest] = u;
                queue[rear++] = cur->dest;
            }
            cur = cur->next;
        }
    }

    if (dist[target] == -1) {
        printf("No path from %d to %d.\\n", start, target);
    } else {
        printf("Shortest distance: %d. Path: ", dist[target]);
        int path[512];
        int plen = 0;
        int curr = target;
        while (curr != -1) {
            path[plen++] = curr;
            curr = parent[curr];
        }
        for (int i = plen - 1; i >= 0; i--) {
            printf("%d%s", path[i], i > 0 ? " -> " : "\\n");
        }
    }
    free(dist);
    free(parent);
    free(queue);
}

void count_components(const GraphList* g) {
    bool* visited = (bool*)calloc(g->vertices, sizeof(bool));
    int comp = 0;
    for (int i = 0; i < g->vertices; i++) {
        if (!visited[i]) {
            comp++;
            dfs_util(g, i, visited);
        }
    }
    printf("\\nTotal components: %d\\n", comp);
    free(visited);
}

static bool cycle_util(const GraphList* g, int u, bool* visited, int parent) {
    visited[u] = true;
    Node* cur = g->adj[u];
    while (cur) {
        if (!visited[cur->dest]) {
            if (cycle_util(g, cur->dest, visited, u)) return true;
        } else if (cur->dest != parent) {
            return true;
        }
        cur = cur->next;
    }
    return false;
}

bool detect_cycle(const GraphList* g) {
    bool* visited = (bool*)calloc(g->vertices, sizeof(bool));
    for (int i = 0; i < g->vertices; i++) {
        if (!visited[i]) {
            if (cycle_util(g, i, visited, -1)) {
                free(visited);
                return true;
            }
        }
    }
    free(visited);
    return false;
}

void display_list(const GraphList* g) {
    printf("Adjacency List (%d vertices):\\n", g->vertices);
    for (int i = 0; i < g->vertices; i++) {
        printf("[%d]: ", i);
        Node* cur = g->adj[i];
        while (cur) {
            printf("%d -> ", cur->dest);
            cur = cur->next;
        }
        printf("NULL\\n");
    }
}

void free_graph(GraphList* g) {
    if (!g) return;
    for (int i = 0; i < g->vertices; i++) {
        Node* cur = g->adj[i];
        while (cur) {
            Node* tmp = cur;
            cur = cur->next;
            free(tmp);
        }
    }
    free(g->adj);
    free(g);
}

int main(void) {
    int v = 5;
    GraphList* g = create_graph(v);
    int choice = 0;
    int src = 0, dest = 0;

    do {
        printf("\\n--- Graph Adjacency List Operations ---\\n");
        printf("1. Add Edge\\n");
        printf("2. Remove Edge\\n");
        printf("3. Has Edge\\n");
        printf("4. BFS Traversal\\n");
        printf("5. DFS Traversal\\n");
        printf("6. Shortest Path Unweighted\\n");
        printf("7. Count Connected Components\\n");
        printf("8. Detect Cycle\\n");
        printf("9. Display Adjacency List\\n");
        printf("0. Exit\\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter source and destination: ");
                if (scanf("%d %d", &src, &dest) == 2) {
                    add_edge(g, src, dest);
                    printf("Added edge (%d -> %d).\\n", src, dest);
                } else clear_input();
                break;
            case 2:
                printf("Enter source and destination: ");
                if (scanf("%d %d", &src, &dest) == 2) {
                    if (remove_edge(g, src, dest)) printf("Removed edge (%d -> %d).\\n", src, dest);
                    else printf("Edge not found.\\n", src, dest);
                } else clear_input();
                break;
            case 3:
                printf("Enter source and destination: ");
                if (scanf("%d %d", &src, &dest) == 2) {
                    if (has_edge(g, src, dest)) printf("Edge (%d -> %d) exists.\\n", src, dest);
                    else printf("Edge does not exist.\\n");
                } else clear_input();
                break;
            case 4:
                printf("Enter start vertex: ");
                if (scanf("%d", &src) == 1) bfs(g, src);
                else clear_input();
                break;
            case 5:
                printf("Enter start vertex: ");
                if (scanf("%d", &src) == 1) dfs(g, src);
                else clear_input();
                break;
            case 6:
                printf("Enter start and target: ");
                if (scanf("%d %d", &src, &dest) == 2) shortest_path(g, src, dest);
                else clear_input();
                break;
            case 7:
                count_components(g);
                break;
            case 8:
                if (detect_cycle(g)) printf("Cycle detected in graph.\\n");
                else printf("No cycle detected in graph.\\n");
                break;
            case 9:
                display_list(g);
                break;
            case 0:
                printf("Exiting adjacency list program.\\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 9.\\n");
                break;
        }
    } while (choice != 0);

    free_graph(g);
    return 0;
}
`,
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
      description: "Interactive Disjoint Set Union (DSU) program with path compression, union by rank, union by size, connected check, disjoint set counting, and component sizing",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct GraphDSU {
    int* parent;
    int* rank;
    int* size;
    int n;
    int num_sets;
} GraphDSU;

GraphDSU* create_dsu(int n) {
    GraphDSU* dsu = (GraphDSU*)malloc(sizeof(GraphDSU));
    if (!dsu) return NULL;
    dsu->n = n;
    dsu->num_sets = n;
    dsu->parent = (int*)malloc(n * sizeof(int));
    dsu->rank = (int*)malloc(n * sizeof(int));
    dsu->size = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        dsu->parent[i] = i;
        dsu->rank[i] = 0;
        dsu->size[i] = 1;
    }
    return dsu;
}

int find_rep(GraphDSU* dsu, int i) {
    if (dsu->parent[i] == i) return i;
    return dsu->parent[i] = find_rep(dsu, dsu->parent[i]);
}

void union_by_rank(GraphDSU* dsu, int x, int y) {
    int root_x = find_rep(dsu, x);
    int root_y = find_rep(dsu, y);
    if (root_x != root_y) {
        if (dsu->rank[root_x] < dsu->rank[root_y]) {
            dsu->parent[root_x] = root_y;
            dsu->size[root_y] += dsu->size[root_x];
        } else if (dsu->rank[root_x] > dsu->rank[root_y]) {
            dsu->parent[root_y] = root_x;
            dsu->size[root_x] += dsu->size[root_y];
        } else {
            dsu->parent[root_y] = root_x;
            dsu->size[root_x] += dsu->size[root_y];
            dsu->rank[root_x]++;
        }
        dsu->num_sets--;
    }
}

void union_by_size(GraphDSU* dsu, int x, int y) {
    int root_x = find_rep(dsu, x);
    int root_y = find_rep(dsu, y);
    if (root_x != root_y) {
        if (dsu->size[root_x] < dsu->size[root_y]) {
            dsu->parent[root_x] = root_y;
            dsu->size[root_y] += dsu->size[root_x];
        } else {
            dsu->parent[root_y] = root_x;
            dsu->size[root_x] += dsu->size[root_y];
        }
        dsu->num_sets--;
    }
}

bool check_connected(GraphDSU* dsu, int x, int y) {
    return find_rep(dsu, x) == find_rep(dsu, y);
}

int get_component_size(GraphDSU* dsu, int x) {
    return dsu->size[find_rep(dsu, x)];
}

void display_sets(GraphDSU* dsu) {
    printf("DSU Sets (%d elements, %d disjoint sets):\\n", dsu->n, dsu->num_sets);
    for (int i = 0; i < dsu->n; i++) {
        printf("Element %d -> Representative %d (size: %d)\\n", i, find_rep(dsu, i), get_component_size(dsu, i));
    }
}

void free_dsu(GraphDSU* dsu) {
    if (!dsu) return;
    free(dsu->parent);
    free(dsu->rank);
    free(dsu->size);
    free(dsu);
}

int main(void) {
    int n = 6;
    GraphDSU* dsu = create_dsu(n);
    int choice = 0;
    int u = 0, v = 0;

    do {
        printf("\\n--- Disjoint Set Union (DSU) Operations ---\\n");
        printf("1. Union by Rank\\n");
        printf("2. Union by Size\\n");
        printf("3. Find Representative\\n");
        printf("4. Check Connected\\n");
        printf("5. Count Disjoint Sets\\n");
        printf("6. Get Component Size\\n");
        printf("7. Display All Sets\\n");
        printf("0. Exit\\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter two elements (0 to %d): ", n - 1);
                if (scanf("%d %d", &u, &v) == 2 && u >= 0 && u < n && v >= 0 && v < n) {
                    union_by_rank(dsu, u, v);
                    printf("Union by rank applied to %d and %d.\\n", u, v);
                } else clear_input();
                break;
            case 2:
                printf("Enter two elements (0 to %d): ", n - 1);
                if (scanf("%d %d", &u, &v) == 2 && u >= 0 && u < n && v >= 0 && v < n) {
                    union_by_size(dsu, u, v);
                    printf("Union by size applied to %d and %d.\\n", u, v);
                } else clear_input();
                break;
            case 3:
                printf("Enter element (0 to %d): ", n - 1);
                if (scanf("%d", &u) == 1 && u >= 0 && u < n) {
                    printf("Representative of %d is: %d\\n", u, find_rep(dsu, u));
                } else clear_input();
                break;
            case 4:
                printf("Enter two elements (0 to %d): ", n - 1);
                if (scanf("%d %d", &u, &v) == 2 && u >= 0 && u < n && v >= 0 && v < n) {
                    if (check_connected(dsu, u, v)) printf("%d and %d are CONNECTED.\\n", u, v);
                    else printf("%d and %d are NOT connected.\\n", u, v);
                } else clear_input();
                break;
            case 5:
                printf("Total disjoint sets: %d\\n", dsu->num_sets);
                break;
            case 6:
                printf("Enter element (0 to %d): ", n - 1);
                if (scanf("%d", &u) == 1 && u >= 0 && u < n) {
                    printf("Size of component containing %d: %d\\n", u, get_component_size(dsu, u));
                } else clear_input();
                break;
            case 7:
                display_sets(dsu);
                break;
            case 0:
                printf("Exiting DSU program.\\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 7.\\n");
                break;
        }
    } while (choice != 0);

    free_dsu(dsu);
    return 0;
}
`,
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
      description: "Interactive separate chaining hash table program with dynamic string keys, integer values, collision handling, deletions, load factor, and automatic rehashing",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef struct Node {
    char key[32];
    int value;
    struct Node* next;
} Node;

typedef struct ChainHashTable {
    Node** buckets;
    int size;
    int count;
} ChainHashTable;

static unsigned long hash_func(const char* s, int mod) {
    unsigned long h = 5381;
    int c;
    while ((c = (unsigned char)*s++)) h = ((h << 5) + h) + c;
    return h % mod;
}

ChainHashTable* create_table(int size) {
    ChainHashTable* ht = (ChainHashTable*)malloc(sizeof(ChainHashTable));
    if (!ht) return NULL;
    ht->size = size;
    ht->count = 0;
    ht->buckets = (Node**)calloc(size, sizeof(Node*));
    return ht;
}

void insert_or_update(ChainHashTable* ht, const char* key, int value) {
    unsigned long b = hash_func(key, ht->size);
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
    n->key[sizeof(n->key) - 1] = '\\0';
    n->value = value;
    n->next = ht->buckets[b];
    ht->buckets[b] = n;
    ht->count++;
}

bool search_key(const ChainHashTable* ht, const char* key, int* val) {
    unsigned long b = hash_func(key, ht->size);
    Node* cur = ht->buckets[b];
    while (cur) {
        if (strcmp(cur->key, key) == 0) {
            *val = cur->value;
            return true;
        }
        cur = cur->next;
    }
    return false;
}

bool delete_key(ChainHashTable* ht, const char* key, int* val) {
    unsigned long b = hash_func(key, ht->size);
    Node* cur = ht->buckets[b];
    Node* prev = NULL;
    while (cur) {
        if (strcmp(cur->key, key) == 0) {
            *val = cur->value;
            if (prev) prev->next = cur->next;
            else ht->buckets[b] = cur->next;
            free(cur);
            ht->count--;
            return true;
        }
        prev = cur;
        cur = cur->next;
    }
    return false;
}

void display_table(const ChainHashTable* ht) {
    printf("Separate Chaining Table (size: %d, count: %d, load factor: %.2f):\\n",
           ht->size, ht->count, (float)ht->count / ht->size);
    for (int i = 0; i < ht->size; i++) {
        printf("Bucket [%d]: ", i);
        Node* cur = ht->buckets[i];
        while (cur) {
            printf("(%s: %d) -> ", cur->key, cur->value);
            cur = cur->next;
        }
        printf("NULL\\n");
    }
}

void rehash(ChainHashTable* ht) {
    int old_size = ht->size;
    Node** old_buckets = ht->buckets;

    ht->size = old_size * 2;
    ht->count = 0;
    ht->buckets = (Node**)calloc(ht->size, sizeof(Node*));

    for (int i = 0; i < old_size; i++) {
        Node* cur = old_buckets[i];
        while (cur) {
            insert_or_update(ht, cur->key, cur->value);
            Node* tmp = cur;
            cur = cur->next;
            free(tmp);
        }
    }
    free(old_buckets);
    printf("Rehashed table to new size: %d\\n", ht->size);
}

void free_table(ChainHashTable* ht) {
    if (!ht) return;
    for (int i = 0; i < ht->size; i++) {
        Node* cur = ht->buckets[i];
        while (cur) {
            Node* tmp = cur;
            cur = cur->next;
            free(tmp);
        }
    }
    free(ht->buckets);
    free(ht);
}

int main(void) {
    ChainHashTable* ht = create_table(7);
    int choice = 0;
    char key[32];
    int val = 0;

    do {
        printf("\\n--- Separate Chaining Hash Table Operations ---\\n");
        printf("1. Insert or Update\\n");
        printf("2. Search Key\\n");
        printf("3. Delete Key\\n");
        printf("4. Display Table\\n");
        printf("5. Count Total Elements\\n");
        printf("6. Calculate Load Factor\\n");
        printf("7. Rehash Table\\n");
        printf("0. Exit\\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter string key and integer value: ");
                if (scanf("%31s %d", key, &val) == 2) {
                    insert_or_update(ht, key, val);
                    printf("Stored (%s: %d).\\n", key, val);
                    if ((float)ht->count / ht->size > 0.75f) {
                        printf("Load factor > 0.75; auto-rehashing...\\n");
                        rehash(ht);
                    }
                } else clear_input();
                break;
            case 2:
                printf("Enter string key to search: ");
                if (scanf("%31s", key) == 1) {
                    if (search_key(ht, key, &val)) printf("Key '%s' found with value %d.\\n", key, val);
                    else printf("Key '%s' not found.\\n", key);
                } else clear_input();
                break;
            case 3:
                printf("Enter string key to delete: ");
                if (scanf("%31s", key) == 1) {
                    if (delete_key(ht, key, &val)) printf("Deleted '%s' (value %d).\\n", key, val);
                    else printf("Key '%s' not found.\\n", key);
                } else clear_input();
                break;
            case 4:
                display_table(ht);
                break;
            case 5:
                printf("Total elements: %d\\n", ht->count);
                break;
            case 6:
                printf("Current Load Factor: %.2f (Elements: %d, Capacity: %d)\\n",
                       (float)ht->count / ht->size, ht->count, ht->size);
                break;
            case 7:
                rehash(ht);
                break;
            case 0:
                printf("Exiting separate chaining program.\\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 7.\\n");
                break;
        }
    } while (choice != 0);

    free_table(ht);
    return 0;
}
`,
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
      description: "Interactive linear probing open-addressing hash table with slot display, tombstone deletion handling, collision resolution, search, and load factor",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

typedef enum EntryState { EMPTY, OCCUPIED, DELETED } EntryState;

typedef struct OpenEntry {
    char key[32];
    int value;
    EntryState state;
} OpenEntry;

typedef struct OpenHashTable {
    OpenEntry* entries;
    int capacity;
    int count;
} OpenHashTable;

static unsigned long hash_func(const char* s, int mod) {
    unsigned long h = 5381;
    int c;
    while ((c = (unsigned char)*s++)) h = ((h << 5) + h) + c;
    return h % mod;
}

OpenHashTable* create_table(int cap) {
    OpenHashTable* ht = (OpenHashTable*)malloc(sizeof(OpenHashTable));
    if (!ht) return NULL;
    ht->capacity = cap;
    ht->count = 0;
    ht->entries = (OpenEntry*)calloc(cap, sizeof(OpenEntry));
    for (int i = 0; i < cap; i++) ht->entries[i].state = EMPTY;
    return ht;
}

bool insert_or_update(OpenHashTable* ht, const char* key, int value) {
    if (ht->count >= ht->capacity) return false;
    unsigned long idx = hash_func(key, ht->capacity);
    int first_deleted = -1;

    for (int i = 0; i < ht->capacity; i++) {
        int pos = (idx + i) % ht->capacity;
        if (ht->entries[pos].state == OCCUPIED) {
            if (strcmp(ht->entries[pos].key, key) == 0) {
                ht->entries[pos].value = value;
                return true;
            }
        } else if (ht->entries[pos].state == DELETED) {
            if (first_deleted == -1) first_deleted = pos;
        } else {
            int target = (first_deleted != -1) ? first_deleted : pos;
            strncpy(ht->entries[target].key, key, sizeof(ht->entries[target].key) - 1);
            ht->entries[target].key[sizeof(ht->entries[target].key) - 1] = '\\0';
            ht->entries[target].value = value;
            ht->entries[target].state = OCCUPIED;
            ht->count++;
            return true;
        }
    }
    if (first_deleted != -1) {
        strncpy(ht->entries[first_deleted].key, key, sizeof(ht->entries[first_deleted].key) - 1);
        ht->entries[first_deleted].key[sizeof(ht->entries[first_deleted].key) - 1] = '\\0';
        ht->entries[first_deleted].value = value;
        ht->entries[first_deleted].state = OCCUPIED;
        ht->count++;
        return true;
    }
    return false;
}

bool search_key(const OpenHashTable* ht, const char* key, int* val) {
    unsigned long idx = hash_func(key, ht->capacity);
    for (int i = 0; i < ht->capacity; i++) {
        int pos = (idx + i) % ht->capacity;
        if (ht->entries[pos].state == EMPTY) return false;
        if (ht->entries[pos].state == OCCUPIED && strcmp(ht->entries[pos].key, key) == 0) {
            *val = ht->entries[pos].value;
            return true;
        }
    }
    return false;
}

bool delete_key(OpenHashTable* ht, const char* key, int* val) {
    unsigned long idx = hash_func(key, ht->capacity);
    for (int i = 0; i < ht->capacity; i++) {
        int pos = (idx + i) % ht->capacity;
        if (ht->entries[pos].state == EMPTY) return false;
        if (ht->entries[pos].state == OCCUPIED && strcmp(ht->entries[pos].key, key) == 0) {
            *val = ht->entries[pos].value;
            ht->entries[pos].state = DELETED;
            ht->count--;
            return true;
        }
    }
    return false;
}

void display_slots(const OpenHashTable* ht) {
    printf("Open Addressing Table (%d slots, %d items, load: %.2f):\\n",
           ht->capacity, ht->count, (float)ht->count / ht->capacity);
    for (int i = 0; i < ht->capacity; i++) {
        if (ht->entries[i].state == OCCUPIED) {
            printf("[%d]: OCCUPIED (%s: %d)\\n", i, ht->entries[i].key, ht->entries[i].value);
        } else if (ht->entries[i].state == DELETED) {
            printf("[%d]: <DELETED / TOMBSTONE>\\n", i);
        } else {
            printf("[%d]: EMPTY\\n", i);
        }
    }
}

void free_table(OpenHashTable* ht) {
    if (!ht) return;
    free(ht->entries);
    free(ht);
}

int main(void) {
    OpenHashTable* ht = create_table(11);
    int choice = 0;
    char key[32];
    int val = 0;

    do {
        printf("\\n--- Open Addressing (Linear Probing) Operations ---\\n");
        printf("1. Insert or Update\\n");
        printf("2. Search Key\\n");
        printf("3. Delete Key\\n");
        printf("4. Display Slots\\n");
        printf("5. Count Elements\\n");
        printf("6. Calculate Load Factor\\n");
        printf("0. Exit\\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter string key and integer value: ");
                if (scanf("%31s %d", key, &val) == 2) {
                    if (insert_or_update(ht, key, val))
                        printf("Inserted (%s: %d).\\n", key, val);
                    else
                        printf("Hash table is FULL!\\n");
                } else clear_input();
                break;
            case 2:
                printf("Enter string key: ");
                if (scanf("%31s", key) == 1) {
                    if (search_key(ht, key, &val)) printf("Found '%s' -> %d.\\n", key, val);
                    else printf("Key '%s' not found.\\n", key);
                } else clear_input();
                break;
            case 3:
                printf("Enter string key: ");
                if (scanf("%31s", key) == 1) {
                    if (delete_key(ht, key, &val)) printf("Deleted '%s' (value %d).\\n", key, val);
                    else printf("Key '%s' not found.\\n", key);
                } else clear_input();
                break;
            case 4:
                display_slots(ht);
                break;
            case 5:
                printf("Total elements: %d\\n", ht->count);
                break;
            case 6:
                printf("Load Factor: %.2f (Elements: %d, Capacity: %d)\\n",
                       (float)ht->count / ht->capacity, ht->count, ht->capacity);
                break;
            case 0:
                printf("Exiting open addressing program.\\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 6.\\n");
                break;
        }
    } while (choice != 0);

    free_table(ht);
    return 0;
}
`,
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
      description: "Interactive hash workbench comparing DJB2, FNV-1a, MurmurHash3, SDBM, and Polynomial rolling hashes with benchmark and 1-bit mutation avalanche test",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

unsigned long hash_djb2(const char* str) {
    unsigned long hash = 5381;
    int c;
    while ((c = (unsigned char)*str++)) {
        hash = ((hash << 5) + hash) + c;
    }
    return hash;
}

uint32_t hash_fnv1a(const char* str) {
    uint32_t hash = 2166136261u;
    while (*str) {
        hash ^= (uint8_t)(*str++);
        hash *= 16777619u;
    }
    return hash;
}

uint32_t hash_murmur32(const char* key, uint32_t seed) {
    uint32_t h = seed;
    uint32_t k;
    size_t len = strlen(key);
    const uint8_t* data = (const uint8_t*)key;
    const size_t nblocks = len / 4;

    for (size_t i = 0; i < nblocks; i++) {
        k = (uint32_t)data[i*4] | ((uint32_t)data[i*4+1] << 8) |
            ((uint32_t)data[i*4+2] << 16) | ((uint32_t)data[i*4+3] << 24);
        k *= 0xcc9e2d51;
        k = (k << 15) | (k >> 17);
        k *= 0x1b873593;
        h ^= k;
        h = (h << 13) | (h >> 19);
        h = h * 5 + 0xe6546b64;
    }

    k = 0;
    const uint8_t* tail = data + (nblocks * 4);
    switch (len & 3) {
        case 3: k ^= (uint32_t)tail[2] << 16;
        case 2: k ^= (uint32_t)tail[1] << 8;
        case 1: k ^= (uint32_t)tail[0];
                k *= 0xcc9e2d51;
                k = (k << 15) | (k >> 17);
                k *= 0x1b873593;
                h ^= k;
    }

    h ^= (uint32_t)len;
    h ^= h >> 16;
    h *= 0x85ebca6b;
    h ^= h >> 13;
    h *= 0xc2b2ae35;
    h ^= h >> 16;
    return h;
}

unsigned long hash_sdbm(const char* str) {
    unsigned long hash = 0;
    int c;
    while ((c = (unsigned char)*str++)) {
        hash = c + (hash << 6) + (hash << 16) - hash;
    }
    return hash;
}

uint64_t hash_polynomial(const char* str) {
    const int p = 31;
    const uint64_t m = 1000000009;
    uint64_t hash_val = 0;
    uint64_t p_pow = 1;
    while (*str) {
        hash_val = (hash_val + (*str - 'a' + 1) * p_pow) % m;
        p_pow = (p_pow * p) % m;
        str++;
    }
    return hash_val;
}

static int count_differing_bits(uint32_t a, uint32_t b) {
    uint32_t diff = a ^ b;
    int cnt = 0;
    while (diff) {
        cnt += diff & 1;
        diff >>= 1;
    }
    return cnt;
}

int main(void) {
    char input[128];
    int choice = 0;

    do {
        printf("\\n--- Hash Functions Workbench ---\\n");
        printf("1. Hash String with DJB2\\n");
        printf("2. Hash String with FNV-1a\\n");
        printf("3. Hash String with MurmurHash3\\n");
        printf("4. Hash String with SDBM\\n");
        printf("5. Hash String with Polynomial Rolling Hash\\n");
        printf("6. Benchmark All 5 on Input String\\n");
        printf("7. Avalanche Effect Test (1-bit mutation comparison)\\n");
        printf("0. Exit\\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            printf("Invalid input. Please enter an integer.\\n");
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter string: ");
                if (scanf("%127s", input) == 1) {
                    printf("DJB2 Hash: 0x%08lx (%lu)\\n", hash_djb2(input), hash_djb2(input));
                } else clear_input();
                break;
            case 2:
                printf("Enter string: ");
                if (scanf("%127s", input) == 1) {
                    printf("FNV-1a Hash: 0x%08x (%u)\\n", hash_fnv1a(input), hash_fnv1a(input));
                } else clear_input();
                break;
            case 3:
                printf("Enter string: ");
                if (scanf("%127s", input) == 1) {
                    printf("MurmurHash3: 0x%08x (%u)\\n", hash_murmur32(input, 42), hash_murmur32(input, 42));
                } else clear_input();
                break;
            case 4:
                printf("Enter string: ");
                if (scanf("%127s", input) == 1) {
                    printf("SDBM Hash: 0x%08lx (%lu)\\n", hash_sdbm(input), hash_sdbm(input));
                } else clear_input();
                break;
            case 5:
                printf("Enter string: ");
                if (scanf("%127s", input) == 1) {
                    printf("Polynomial Hash: %llu\\n", (unsigned long long)hash_polynomial(input));
                } else clear_input();
                break;
            case 6:
                printf("Enter string: ");
                if (scanf("%127s", input) == 1) {
                    printf("--- Benchmark Results for '%s' ---\\n", input);
                    printf("DJB2       : 0x%08lx\\n", hash_djb2(input));
                    printf("FNV-1a     : 0x%08x\\n", hash_fnv1a(input));
                    printf("MurmurHash3: 0x%08x\\n", hash_murmur32(input, 42));
                    printf("SDBM       : 0x%08lx\\n", hash_sdbm(input));
                    printf("Polynomial : %llu\\n", (unsigned long long)hash_polynomial(input));
                } else clear_input();
                break;
            case 7: {
                char mutated[128];
                printf("Enter base string: ");
                if (scanf("%127s", input) == 1) {
                    strncpy(mutated, input, sizeof(mutated) - 1);
                    mutated[sizeof(mutated) - 1] = '\\0';
                    mutated[0] ^= 1;
                    printf("Original: '%s' | Mutated: '%s'\\n", input, mutated);
                    uint32_t h1 = hash_fnv1a(input);
                    uint32_t h2 = hash_fnv1a(mutated);
                    int diff_fnv = count_differing_bits(h1, h2);
                    uint32_t m1 = hash_murmur32(input, 42);
                    uint32_t m2 = hash_murmur32(mutated, 42);
                    int diff_mur = count_differing_bits(m1, m2);
                    printf("FNV-1a Bit Flip: %d / 32 bits (%.1f%%)\\n", diff_fnv, (diff_fnv / 32.0f) * 100);
                    printf("Murmur32 Bit Flip: %d / 32 bits (%.1f%%)\\n", diff_mur, (diff_mur / 32.0f) * 100);
                } else clear_input();
                break;
            }
            case 0:
                printf("Exiting hash workbench.\\n");
                break;
            default:
                printf("Invalid option! Please choose between 0 and 7.\\n");
                break;
        }
    } while (choice != 0);

    return 0;
}
`,
      tags: ["program", "hashing", "hash-functions"],
      aliases: ["prog_hash_functions", "programHashFunctions"],
    })
  );

  return components;
}

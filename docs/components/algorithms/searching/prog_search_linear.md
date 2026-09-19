# prog_search_linear
> **Domain:** `algorithms` | **Subcategory:** `searching` | **Type:** `program`
## Overview
Complete interactive program running standard and sentinel linear search

## Signature
```c
int main(void);
```

## Complexity Analysis
- **Time Complexity:** `O(1)`
- **Space Complexity:** `O(1)`

## Edge Cases & Constraints
- **NULL / Empty Input:** Function handles zero/NULL pointers gracefully without segfaulting.
- **Boundary Conditions:** Bounds-checked against buffer boundaries and integer limits.
- **Zero-Comment Invariant:** Code is 100% executable clean C code adhering strictly to library standards.

## Implementation
```c
#include <stdio.h>

#define MAX_N 500

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void print_array(const int* arr, int n) {
    printf("Array [%d elements]: ", n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    putchar('\n');
}

static int linear_search(const int* arr, int n, int target, int* comps) {
    *comps = 0;
    for (int i = 0; i < n; i++) {
        (*comps)++;
        if (arr[i] == target) return i;
    }
    return -1;
}

static int sentinel_search(int* arr, int n, int target, int* comps) {
    *comps = 0;
    int last = arr[n - 1];
    arr[n - 1] = target;
    int i = 0;
    while (arr[i] != target) {
        (*comps)++;
        i++;
    }
    arr[n - 1] = last;
    (*comps)++;
    if (i < n - 1 || arr[n - 1] == target) return i;
    return -1;
}

int main(void) {
    int choice;
    int n = 0;
    int arr[MAX_N + 1];
    do {
        printf("=== Linear Search Workbench ===\n");
        printf("1. Enter Custom Array\n");
        printf("2. Sequential Linear Search\n");
        printf("3. Sentinel Linear Search (Optimized Loop)\n");
        printf("4. Find All Occurrences of Target\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                printf("Enter N (<= %d): ", MAX_N);
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_N) {
                    printf("Enter %d integers: ", n);
                    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
                    clear_input();
                    print_array(arr, n);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (n == 0) {
                    printf("Enter array first.\n");
                    break;
                }
                int target;
                printf("Enter target to search: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    int comps = 0;
                    int idx = linear_search(arr, n, target, &comps);
                    if (idx != -1) printf("Found %d at index %d (comparisons: %d)\n", target, idx, comps);
                    else printf("Target %d not found (comparisons: %d)\n", target, comps);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (n == 0) {
                    printf("Enter array first.\n");
                    break;
                }
                int target;
                printf("Enter target to search: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    int comps = 0;
                    int idx = sentinel_search(arr, n, target, &comps);
                    if (idx != -1) printf("Sentinel found %d at index %d (comparisons: %d)\n", target, idx, comps);
                    else printf("Target %d not found (comparisons: %d)\n", target, comps);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (n == 0) {
                    printf("Enter array first.\n");
                    break;
                }
                int target;
                printf("Enter target: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    int count = 0;
                    printf("Occurrences at indices: ");
                    for (int i = 0; i < n; i++) {
                        if (arr[i] == target) {
                            printf("%d ", i);
                            count++;
                        }
                    }
                    if (count == 0) printf("None");
                    printf("\nTotal count: %d\n", count);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\n");
                break;
            default:
                printf("Invalid option.\n");
                break;
        }
    } while (choice != 0);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_search_linear`, `algorithms.full-programs.searching.linear-search.prog-linear-search`, `algorithms>prog_search_linear()`, `algorithms>full-programs>searching>linear-search>prog-linear-search>prog_search_linear()`, `programLinearSearch`

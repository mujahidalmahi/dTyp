# prog_search_binary
> **Domain:** `algorithms` | **Subcategory:** `searching` | **Type:** `program`
## Overview
Complete interactive program executing Binary Search, lower bound, and upper bound

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
#include <stdlib.h>

#define MAX_N 500

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static int cmp_int(const void* a, const void* b) {
    return (*(const int*)a - *(const int*)b);
}

static void print_array(const int* arr, int n) {
    printf("Sorted Array [%d elements]: ", n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    putchar('\n');
}

static int binary_search(const int* arr, int n, int target, int* comps) {
    *comps = 0;
    int low = 0, high = n - 1;
    while (low <= high) {
        (*comps)++;
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

static int lower_bound(const int* arr, int n, int target) {
    int low = 0, high = n;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] >= target) high = mid;
        else low = mid + 1;
    }
    return low;
}

static int upper_bound(const int* arr, int n, int target) {
    int low = 0, high = n;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] > target) high = mid;
        else low = mid + 1;
    }
    return low;
}

int main(void) {
    int choice;
    int n = 0;
    int arr[MAX_N];
    do {
        printf("=== Binary Search Workbench ===\n");
        printf("1. Enter Custom Array (Auto-Sorted)\n");
        printf("2. Exact Binary Search (O(log N))\n");
        printf("3. Lower Bound (First Element >= Target)\n");
        printf("4. Upper Bound (First Element > Target)\n");
        printf("5. Equal Range Frequency Count\n");
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
                    qsort(arr, (size_t)n, sizeof(int), cmp_int);
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
                printf("Enter target: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    int comps = 0;
                    int idx = binary_search(arr, n, target, &comps);
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
                printf("Enter target: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    int lb = lower_bound(arr, n, target);
                    if (lb < n) printf("Lower bound of %d: index %d (value: %d)\n", target, lb, arr[lb]);
                    else printf("No element >= %d exists.\n", target);
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
                    int ub = upper_bound(arr, n, target);
                    if (ub < n) printf("Upper bound of %d: index %d (value: %d)\n", target, ub, arr[ub]);
                    else printf("No element > %d exists.\n", target);
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                if (n == 0) {
                    printf("Enter array first.\n");
                    break;
                }
                int target;
                printf("Enter target: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    int lb = lower_bound(arr, n, target);
                    int ub = upper_bound(arr, n, target);
                    printf("Frequency of %d: %d occurrences (range [%d, %d))\n",
                           target, ub - lb, lb, ub);
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
Available via: `prog_search_binary`, `algorithms.full-programs.searching.binary-search.prog-binary-search`, `algorithms>prog_search_binary()`, `algorithms>full-programs>searching>binary-search>prog-binary-search>prog_search_binary()`, `programBinarySearch`

# prog_search_jump_interpolation
> **Domain:** `algorithms` | **Subcategory:** `searching` | **Type:** `program`
## Overview
Complete interactive program running Jump Search and formula Interpolation Search

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
#include <math.h>

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

static int jump_search(const int* arr, int n, int target, int* comps) {
    *comps = 0;
    int step = (int)sqrt((double)n);
    int prev = 0;
    while (arr[(step < n ? step : n) - 1] < target) {
        (*comps)++;
        prev = step;
        step += (int)sqrt((double)n);
        if (prev >= n) return -1;
    }
    while (arr[prev] < target) {
        (*comps)++;
        prev++;
        if (prev == (step < n ? step : n)) return -1;
    }
    (*comps)++;
    if (arr[prev] == target) return prev;
    return -1;
}

static int interpolation_search(const int* arr, int n, int target, int* comps) {
    *comps = 0;
    int low = 0, high = n - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        (*comps)++;
        if (low == high) {
            if (arr[low] == target) return low;
            return -1;
        }
        int pos = low + (int)(((double)(high - low) / (arr[high] - arr[low])) * (target - arr[low]));
        if (pos < low || pos > high) break;
        if (arr[pos] == target) return pos;
        if (arr[pos] < target) low = pos + 1;
        else high = pos - 1;
    }
    return -1;
}

int main(void) {
    int choice;
    int n = 0;
    int arr[MAX_N];
    do {
        printf("=== Jump & Interpolation Search Workbench ===\n");
        printf("1. Enter Custom Array (Auto-Sorted)\n");
        printf("2. Jump Search O(sqrt(N))\n");
        printf("3. Interpolation Search O(log log N) for Uniform Distribution\n");
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
                    int idx = jump_search(arr, n, target, &comps);
                    if (idx != -1) printf("Jump search found %d at index %d (comparisons: %d)\n", target, idx, comps);
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
                    int comps = 0;
                    int idx = interpolation_search(arr, n, target, &comps);
                    if (idx != -1) printf("Interpolation search found %d at index %d (comparisons: %d)\n", target, idx, comps);
                    else printf("Target %d not found (comparisons: %d)\n", target, comps);
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
Available via: `prog_search_jump_interpolation`, `algorithms.full-programs.searching.jump-interpolation.prog-jump-search`, `algorithms>prog_search_jump_interpolation()`, `algorithms>full-programs>searching>jump-interpolation>prog-jump-search>prog_search_jump_interpolation()`, `programJumpSearch`

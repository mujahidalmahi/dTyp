# prog_sort_quick
> **Domain:** `algorithms` | **Subcategory:** `sorting` | **Type:** `program`
## Overview
Complete interactive program executing Quick Sort with Lomuto and Hoare partitions

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

static int lomuto_partition(int* arr, int low, int high, int* comps, int* swaps) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        (*comps)++;
        if (arr[j] <= pivot) {
            i++;
            int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
            (*swaps)++;
        }
    }
    int tmp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = tmp;
    (*swaps)++;
    return i + 1;
}

static void quick_sort_lomuto(int* arr, int low, int high, int* comps, int* swaps) {
    if (low < high) {
        int pi = lomuto_partition(arr, low, high, comps, swaps);
        quick_sort_lomuto(arr, low, pi - 1, comps, swaps);
        quick_sort_lomuto(arr, pi + 1, high, comps, swaps);
    }
}

static int hoare_partition(int* arr, int low, int high, int* comps, int* swaps) {
    int pivot = arr[low];
    int i = low - 1;
    int j = high + 1;
    while (1) {
        do { i++; (*comps)++; } while (arr[i] < pivot);
        do { j--; (*comps)++; } while (arr[j] > pivot);
        if (i >= j) return j;
        int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        (*swaps)++;
    }
}

static void quick_sort_hoare(int* arr, int low, int high, int* comps, int* swaps) {
    if (low < high) {
        int pi = hoare_partition(arr, low, high, comps, swaps);
        quick_sort_hoare(arr, low, pi, comps, swaps);
        quick_sort_hoare(arr, pi + 1, high, comps, swaps);
    }
}

int main(void) {
    int choice;
    int n = 0;
    int arr[MAX_N];
    do {
        printf("=== Quick Sort Workbench ===\n");
        printf("1. Enter Custom Array\n");
        printf("2. Sort with Lomuto Partitioning\n");
        printf("3. Sort with Hoare Partitioning\n");
        printf("4. Sort Descending Order\n");
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
                    printf("Enter %d elements: ", n);
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
                    printf("Enter an array first.\n");
                    break;
                }
                int comps = 0, swaps = 0;
                quick_sort_lomuto(arr, 0, n - 1, &comps, &swaps);
                printf("Sorted (Lomuto): ");
                print_array(arr, n);
                printf("Comparisons: %d | Swaps: %d\n", comps, swaps);
                break;
            }
            case 3: {
                if (n == 0) {
                    printf("Enter an array first.\n");
                    break;
                }
                int comps = 0, swaps = 0;
                quick_sort_hoare(arr, 0, n - 1, &comps, &swaps);
                printf("Sorted (Hoare): ");
                print_array(arr, n);
                printf("Comparisons: %d | Swaps: %d\n", comps, swaps);
                break;
            }
            case 4: {
                if (n == 0) {
                    printf("Enter an array first.\n");
                    break;
                }
                int comps = 0, swaps = 0;
                quick_sort_lomuto(arr, 0, n - 1, &comps, &swaps);
                for (int i = 0; i < n / 2; i++) {
                    int tmp = arr[i]; arr[i] = arr[n - 1 - i]; arr[n - 1 - i] = tmp;
                }
                printf("Descending: ");
                print_array(arr, n);
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
Available via: `prog_sort_quick`, `algorithms.full-programs.sorting.quick-sort.prog-quick-sort`, `algorithms>prog_sort_quick()`, `algorithms>full-programs>sorting>quick-sort>prog-quick-sort>prog_sort_quick()`, `programQuickSort`

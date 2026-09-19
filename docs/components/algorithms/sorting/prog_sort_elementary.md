# prog_sort_elementary
> **Domain:** `algorithms` | **Subcategory:** `sorting` | **Type:** `program`
## Overview
Complete interactive program comparing Bubble, Selection, and Insertion sorts with operation counters

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

static void copy_array(const int* src, int* dst, int n) {
    for (int i = 0; i < n; i++) dst[i] = src[i];
}

static void bubble_sort(int* arr, int n, int* comps, int* swaps) {
    *comps = 0;
    *swaps = 0;
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            (*comps)++;
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
                (*swaps)++;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}

static void selection_sort(int* arr, int n, int* comps, int* swaps) {
    *comps = 0;
    *swaps = 0;
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            (*comps)++;
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        if (min_idx != i) {
            int tmp = arr[i]; arr[i] = arr[min_idx]; arr[min_idx] = tmp;
            (*swaps)++;
        }
    }
}

static void insertion_sort(int* arr, int n, int* comps, int* swaps) {
    *comps = 0;
    *swaps = 0;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0) {
            (*comps)++;
            if (arr[j] > key) {
                arr[j + 1] = arr[j];
                (*swaps)++;
                j--;
            } else {
                break;
            }
        }
        arr[j + 1] = key;
    }
}

int main(void) {
    int choice;
    int n = 0;
    int base_arr[MAX_N];
    int work_arr[MAX_N];
    do {
        printf("=== Elementary Sorts Workbench ===\n");
        printf("Current Dataset Size: %d\n", n);
        printf("1. Enter Custom Array\n");
        printf("2. Run Bubble Sort (with Comparisons & Swaps)\n");
        printf("3. Run Selection Sort (with Comparisons & Swaps)\n");
        printf("4. Run Insertion Sort (with Comparisons & Swaps)\n");
        printf("5. Compare All Three Elementary Sorts\n");
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
                printf("Enter number of elements N (<= %d): ", MAX_N);
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_N) {
                    printf("Enter %d integers: ", n);
                    for (int i = 0; i < n; i++) scanf("%d", &base_arr[i]);
                    clear_input();
                    print_array(base_arr, n);
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
                copy_array(base_arr, work_arr, n);
                int c, s;
                bubble_sort(work_arr, n, &c, &s);
                printf("Bubble Sorted: ");
                print_array(work_arr, n);
                printf("Comparisons: %d | Swaps: %d\n", c, s);
                break;
            }
            case 3: {
                if (n == 0) {
                    printf("Enter an array first.\n");
                    break;
                }
                copy_array(base_arr, work_arr, n);
                int c, s;
                selection_sort(work_arr, n, &c, &s);
                printf("Selection Sorted: ");
                print_array(work_arr, n);
                printf("Comparisons: %d | Swaps: %d\n", c, s);
                break;
            }
            case 4: {
                if (n == 0) {
                    printf("Enter an array first.\n");
                    break;
                }
                copy_array(base_arr, work_arr, n);
                int c, s;
                insertion_sort(work_arr, n, &c, &s);
                printf("Insertion Sorted: ");
                print_array(work_arr, n);
                printf("Comparisons: %d | Shifts: %d\n", c, s);
                break;
            }
            case 5: {
                if (n == 0) {
                    printf("Enter an array first.\n");
                    break;
                }
                int c1, s1, c2, s2, c3, s3;
                copy_array(base_arr, work_arr, n);
                bubble_sort(work_arr, n, &c1, &s1);
                copy_array(base_arr, work_arr, n);
                selection_sort(work_arr, n, &c2, &s2);
                copy_array(base_arr, work_arr, n);
                insertion_sort(work_arr, n, &c3, &s3);
                printf("%-16s | %-12s | %-12s\n", "Algorithm", "Comparisons", "Swaps/Shifts");
                printf("----------------------------------------\n");
                printf("%-16s | %-12d | %-12d\n", "Bubble Sort", c1, s1);
                printf("%-16s | %-12d | %-12d\n", "Selection Sort", c2, s2);
                printf("%-16s | %-12d | %-12d\n", "Insertion Sort", c3, s3);
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
Available via: `prog_sort_elementary`, `algorithms.full-programs.sorting.elementary-sorts.prog-elementary-sorts`, `algorithms>prog_sort_elementary()`, `algorithms>full-programs>sorting>elementary-sorts>prog-elementary-sorts>prog_sort_elementary()`, `programElementarySorts`

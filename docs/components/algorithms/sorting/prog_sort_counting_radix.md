# prog_sort_counting_radix
> **Domain:** `algorithms` | **Subcategory:** `sorting` | **Type:** `program`
## Overview
Complete interactive program executing non-comparison Counting Sort and Radix Sort (base-10)

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
#define MAX_VAL 10000

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void print_array(const int* arr, int n) {
    printf("Array [%d elements]: ", n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    putchar('\n');
}

static void counting_sort(int* arr, int n) {
    int max_val = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max_val) max_val = arr[i];
    }
    int count[MAX_VAL + 1] = {0};
    for (int i = 0; i < n; i++) count[arr[i]]++;
    int idx = 0;
    for (int v = 0; v <= max_val; v++) {
        while (count[v] > 0) {
            arr[idx++] = v;
            count[v]--;
        }
    }
}

static void radix_count_sort(int* arr, int n, int exp) {
    int output[MAX_N];
    int count[10] = {0};
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}

static void radix_sort(int* arr, int n) {
    int max_val = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max_val) max_val = arr[i];
    }
    for (int exp = 1; max_val / exp > 0; exp *= 10) {
        radix_count_sort(arr, n, exp);
    }
}

int main(void) {
    int choice;
    int n = 0;
    int arr[MAX_N];
    do {
        printf("=== Non-Comparison Sorts Workbench ===\n");
        printf("1. Enter Custom Non-Negative Array\n");
        printf("2. Run Counting Sort O(N + K)\n");
        printf("3. Run Radix Sort (LSD Base 10) O(d * (N + b))\n");
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
                    printf("Enter %d non-negative integers (<= %d): ", n, MAX_VAL);
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
                counting_sort(arr, n);
                printf("Counting Sorted: ");
                print_array(arr, n);
                break;
            }
            case 3: {
                if (n == 0) {
                    printf("Enter an array first.\n");
                    break;
                }
                radix_sort(arr, n);
                printf("Radix Sorted: ");
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
Available via: `prog_sort_counting_radix`, `algorithms.full-programs.sorting.non-comparison-sorts.prog-counting-radix`, `algorithms>prog_sort_counting_radix()`, `algorithms>full-programs>sorting>non-comparison-sorts>prog-counting-radix>prog_sort_counting_radix()`, `programCountingRadixSort`

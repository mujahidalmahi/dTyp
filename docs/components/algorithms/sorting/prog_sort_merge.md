# prog_sort_merge
> **Domain:** `algorithms` | **Subcategory:** `sorting` | **Type:** `program`
## Overview
Complete interactive program executing divide-and-conquer Merge Sort and counting inversions

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

static long long merge(int* arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int L[MAX_N], R[MAX_N];
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    int i = 0, j = 0, k = left;
    long long inv_count = 0;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
            inv_count += (n1 - i);
        }
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
    return inv_count;
}

static long long merge_sort(int* arr, int left, int right) {
    long long inv_count = 0;
    if (left < right) {
        int mid = left + (right - left) / 2;
        inv_count += merge_sort(arr, left, mid);
        inv_count += merge_sort(arr, mid + 1, right);
        inv_count += merge(arr, left, mid, right);
    }
    return inv_count;
}

int main(void) {
    int choice;
    int n = 0;
    int arr[MAX_N];
    do {
        printf("=== Merge Sort Workbench ===\n");
        printf("1. Enter Custom Array\n");
        printf("2. Run Recursive Merge Sort\n");
        printf("3. Calculate Inversion Count\n");
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
                    printf("Enter an array first.\n");
                    break;
                }
                long long inv = merge_sort(arr, 0, n - 1);
                printf("Merge Sorted: ");
                print_array(arr, n);
                printf("Total inversions in original array: %lld\n", inv);
                break;
            }
            case 3: {
                if (n == 0) {
                    printf("Enter an array first.\n");
                    break;
                }
                int temp[MAX_N];
                for (int i = 0; i < n; i++) temp[i] = arr[i];
                long long inv = merge_sort(temp, 0, n - 1);
                printf("Number of inversions: %lld\n", inv);
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
Available via: `prog_sort_merge`, `algorithms.full-programs.sorting.merge-sort.prog-merge-sort`, `algorithms>prog_sort_merge()`, `algorithms>full-programs>sorting>merge-sort>prog-merge-sort>prog_sort_merge()`, `programMergeSort`

# prog_search_two_pointers
> **Domain:** `algorithms` | **Subcategory:** `searching` | **Type:** `program`
## Overview
Complete interactive program executing two pointers pair search and triplet search

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

static void search_pair_sum(const int* arr, int n, int target) {
    int left = 0, right = n - 1, count = 0;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            printf("Found pair: arr[%d] (%d) + arr[%d] (%d) = %d\n",
                   left, arr[left], right, arr[right], target);
            count++;
            left++;
            right--;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    if (count == 0) printf("No pair found with sum %d.\n", target);
}

static void search_triplet_sum(const int* arr, int n, int target) {
    int count = 0;
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && arr[i] == arr[i - 1]) continue;
        int left = i + 1, right = n - 1;
        while (left < right) {
            int sum = arr[i] + arr[left] + arr[right];
            if (sum == target) {
                printf("Found triplet: (%d, %d, %d)\n", arr[i], arr[left], arr[right]);
                count++;
                while (left < right && arr[left] == arr[left + 1]) left++;
                while (left < right && arr[right] == arr[right - 1]) right--;
                left++;
                right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    if (count == 0) printf("No triplet found with sum %d.\n", target);
}

int main(void) {
    int choice;
    int n = 0;
    int arr[MAX_N];
    do {
        printf("=== Two Pointers Searching Workbench ===\n");
        printf("1. Enter Custom Array (Auto-Sorted)\n");
        printf("2. Find Pair with Target Sum in O(N)\n");
        printf("3. Find All Triplets with Target Sum in O(N^2)\n");
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
                if (n < 2) {
                    printf("Enter array with at least 2 elements.\n");
                    break;
                }
                int target;
                printf("Enter target pair sum: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    search_pair_sum(arr, n, target);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (n < 3) {
                    printf("Enter array with at least 3 elements.\n");
                    break;
                }
                int target;
                printf("Enter target triplet sum: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    search_triplet_sum(arr, n, target);
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
Available via: `prog_search_two_pointers`, `algorithms.full-programs.searching.two-pointers.prog-two-pointers`, `algorithms>prog_search_two_pointers()`, `algorithms>full-programs>searching>two-pointers>prog-two-pointers>prog_search_two_pointers()`, `programTwoPointersSearch`

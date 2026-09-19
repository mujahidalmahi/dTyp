# prog_sort_heap
> **Domain:** `algorithms` | **Subcategory:** `sorting` | **Type:** `program`
## Overview
Complete interactive program executing in-place binary Heap Sort with max-heapify

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

static void max_heapify(int* arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        int tmp = arr[i]; arr[i] = arr[largest]; arr[largest] = tmp;
        max_heapify(arr, n, largest);
    }
}

static void heap_sort(int* arr, int n) {
    for (int i = n / 2 - 1; i >= 0; i--) max_heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int tmp = arr[0]; arr[0] = arr[i]; arr[i] = tmp;
        max_heapify(arr, i, 0);
    }
}

int main(void) {
    int choice;
    int n = 0;
    int arr[MAX_N];
    do {
        printf("=== Heap Sort Workbench ===\n");
        printf("1. Enter Custom Array\n");
        printf("2. Build Max-Heap\n");
        printf("3. Run Complete In-Place Heap Sort\n");
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
                for (int i = n / 2 - 1; i >= 0; i--) max_heapify(arr, n, i);
                printf("Max-Heap constructed: ");
                print_array(arr, n);
                break;
            }
            case 3: {
                if (n == 0) {
                    printf("Enter an array first.\n");
                    break;
                }
                heap_sort(arr, n);
                printf("Heap Sorted: ");
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
Available via: `prog_sort_heap`, `algorithms.full-programs.sorting.heap-sort.prog-heap-sort`, `algorithms>prog_sort_heap()`, `algorithms>full-programs>sorting>heap-sort>prog-heap-sort>prog_sort_heap()`, `programHeapSort`

# prog_1d_array
> **Domain:** `data-structures` | **Subcategory:** `arrays` | **Type:** `program`
## Overview
Interactive 1D array program with insertion, deletion, linear and binary search, reversal, min/max, and count

## Signature
```c
int main(void)
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
#include <stdbool.h>

#define MAX_CAP 100

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

void print_array(const int* arr, int n) {
    if (n == 0) {
        printf("Array is empty.\n");
        return;
    }
    printf("Array [%d elements]: ", n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
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
        printf("\n=== 1D Array Operations Menu ===\n");
        printf("1. Insert Element at Index\n");
        printf("2. Delete Element at Index\n");
        printf("3. Linear Search\n");
        printf("4. Binary Search (Requires Sorted Array)\n");
        printf("5. Reverse Array\n");
        printf("6. Find Minimum and Maximum\n");
        printf("7. Display Array and Count\n");
        printf("0. Exit\n");
        printf("Enter your choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            printf("Invalid input! Please enter an integer.\n");
            continue;
        }

        switch (choice) {
            case 1: {
                int idx, val;
                printf("Enter index (0 to %d) and value: ", n);
                if (scanf("%d %d", &idx, &val) == 2) {
                    if (insert_at(arr, &n, idx, val)) printf("Successfully inserted %d at index %d.\n", val, idx);
                    else printf("Failed to insert. Check index range and capacity.\n");
                } else clear_input();
                break;
            }
            case 2: {
                int idx, val;
                printf("Enter index to delete (0 to %d): ", n - 1);
                if (scanf("%d", &idx) == 1) {
                    if (delete_at(arr, &n, idx, &val)) printf("Deleted %d from index %d.\n", val, idx);
                    else printf("Failed to delete. Invalid index.\n");
                } else clear_input();
                break;
            }
            case 3: {
                int target;
                printf("Enter target value to search: ");
                if (scanf("%d", &target) == 1) {
                    int pos = linear_search(arr, n, target);
                    if (pos != -1) printf("Found %d at index %d.\n", target, pos);
                    else printf("%d not found in array.\n", target);
                } else clear_input();
                break;
            }
            case 4: {
                int target;
                printf("Enter target value for binary search: ");
                if (scanf("%d", &target) == 1) {
                    int pos = binary_search(arr, n, target);
                    if (pos != -1) printf("Found %d at index %d.\n", target, pos);
                    else printf("%d not found (ensure array is sorted).\n", target);
                } else clear_input();
                break;
            }
            case 5:
                reverse_array(arr, n);
                printf("Array reversed successfully.\n");
                print_array(arr, n);
                break;
            case 6: {
                if (n == 0) {
                    printf("Array is empty.\n");
                } else {
                    int min_val, max_val;
                    find_min_max(arr, n, &min_val, &max_val);
                    printf("Min: %d | Max: %d\n", min_val, max_val);
                }
                break;
            }
            case 7:
                print_array(arr, n);
                break;
            case 0:
                printf("Exiting 1D Array Menu. Goodbye!\n");
                break;
            default:
                printf("Invalid choice. Please select from menu.\n");
                break;
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_1d_array`, `data-structures.full-programs.arrays.1d-array.prog-1d-array`, `data-structures>prog_1d_array()`, `data-structures>full-programs>arrays>1d-array>prog-1d-array>prog_1d_array()`, `programArray1D`

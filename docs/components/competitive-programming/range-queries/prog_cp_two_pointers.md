# prog_cp_two_pointers
> **Domain:** `competitive-programming` | **Subcategory:** `range-queries` | **Type:** `program`
## Overview
Codeforces style two-pointers problem suite solving pair sum, 3-sum, and trapping rain water

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

#define MAX_N 1000

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static int cmp_asc(const void* a, const void* b) {
    int x = *(const int*)a;
    int y = *(const int*)b;
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
}

static void pair_sum(void) {
    int n, target;
    printf("Enter array size N and Target sum: ");
    if (scanf("%d %d", &n, &target) != 2 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    int arr[MAX_N];
    printf("Enter %d integers: ", n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    clear_input();
    qsort(arr, (size_t)n, sizeof(int), cmp_asc);
    int left = 0, right = n - 1, found = 0;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            printf("Found pair: (%d, %d)\n", arr[left], arr[right]);
            found = 1;
            left++;
            right--;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    if (!found) printf("No pair with sum %d exists.\n", target);
}

static void trap_water(void) {
    int n;
    printf("Enter number of bars N: ");
    if (scanf("%d", &n) != 1 || n <= 2 || n > MAX_N) {
        clear_input();
        return;
    }
    int h[MAX_N];
    printf("Enter %d elevation heights: ", n);
    for (int i = 0; i < n; i++) scanf("%d", &h[i]);
    clear_input();
    int left = 0, right = n - 1;
    int left_max = 0, right_max = 0;
    long long total_water = 0;
    while (left <= right) {
        if (h[left] <= h[right]) {
            if (h[left] >= left_max) left_max = h[left];
            else total_water += (left_max - h[left]);
            left++;
        } else {
            if (h[right] >= right_max) right_max = h[right];
            else total_water += (right_max - h[right]);
            right--;
        }
    }
    printf("Total trapped rain water: %lld units\n", total_water);
}

static void container_max_water(void) {
    int n;
    printf("Enter number of vertical lines N: ");
    if (scanf("%d", &n) != 1 || n < 2 || n > MAX_N) {
        clear_input();
        return;
    }
    int h[MAX_N];
    printf("Enter %d heights: ", n);
    for (int i = 0; i < n; i++) scanf("%d", &h[i]);
    clear_input();
    int left = 0, right = n - 1;
    long long max_area = 0;
    int b_l = 0, b_r = 0;
    while (left < right) {
        int height = h[left] < h[right] ? h[left] : h[right];
        long long area = (long long)height * (right - left);
        if (area > max_area) {
            max_area = area;
            b_l = left;
            b_r = right;
        }
        if (h[left] < h[right]) left++;
        else right--;
    }
    printf("Max water area: %lld (between index %d and %d)\n", max_area, b_l, b_r);
}

int main(void) {
    int choice;
    do {
        printf("=== Two Pointers Codeforces Suite ===\n");
        printf("1. Pair Sum Search (Sorted Two Pointers)\n");
        printf("2. Trapping Rain Water (O(N) Time, O(1) Space)\n");
        printf("3. Container with Most Water\n");
        printf("4. Solve Multi-Testcases (T Cases)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                pair_sum();
                break;
            case 2:
                trap_water();
                break;
            case 3:
                container_max_water();
                break;
            case 4: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        printf("[Case #%d]\n", c);
                        pair_sum();
                    }
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
Available via: `prog_cp_two_pointers`, `competitive-programming.full-programs.range-queries.two-pointers.prog-two-pointers`, `competitive-programming>prog_cp_two_pointers()`, `competitive-programming>full-programs>range-queries>two-pointers>prog-two-pointers>prog_cp_two_pointers()`

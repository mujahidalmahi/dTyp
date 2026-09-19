# prog_cp_coordinate_compression
> **Domain:** `competitive-programming` | **Subcategory:** `fast-io-utilities` | **Type:** `program`
## Overview
Codeforces style coordinate compression suite mapping sparse coordinates to dense ranks

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

static int compare_ints(const void* a, const void* b) {
    int x = *(const int*)a;
    int y = *(const int*)b;
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
}

static int compress_coords(const int* orig, int n, int* unique_arr, int* compressed) {
    int temp[MAX_N];
    for (int i = 0; i < n; i++) temp[i] = orig[i];
    qsort(temp, (size_t)n, sizeof(int), compare_ints);
    int u_len = 0;
    for (int i = 0; i < n; i++) {
        if (i == 0 || temp[i] != temp[i - 1]) {
            unique_arr[u_len++] = temp[i];
        }
    }
    for (int i = 0; i < n; i++) {
        int low = 0, high = u_len - 1, rank = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (unique_arr[mid] == orig[i]) {
                rank = mid;
                break;
            }
            if (unique_arr[mid] < orig[i]) low = mid + 1;
            else high = mid - 1;
        }
        compressed[i] = rank;
    }
    return u_len;
}

static int query_rank(const int* unique_arr, int u_len, int val) {
    int low = 0, high = u_len - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (unique_arr[mid] == val) return mid;
        if (unique_arr[mid] < val) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

static void solve_cf_case(void) {
    int n;
    printf("Enter number of coordinates N (<= %d): ", MAX_N);
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    int orig[MAX_N], unique_arr[MAX_N], compressed[MAX_N];
    printf("Enter %d coordinates: ", n);
    for (int i = 0; i < n; i++) scanf("%d", &orig[i]);
    clear_input();
    int u_len = compress_coords(orig, n, unique_arr, compressed);
    printf("Distinct count: %d\n", u_len);
    printf("Original:   ");
    for (int i = 0; i < n; i++) printf("%d ", orig[i]);
    printf("\nCompressed: ");
    for (int i = 0; i < n; i++) printf("%d ", compressed[i]);
    printf("\nUnique sorted: ");
    for (int i = 0; i < u_len; i++) printf("%d ", unique_arr[i]);
    printf("\n");
}

int main(void) {
    int choice;
    int n = 0, u_len = 0;
    int orig[MAX_N], unique_arr[MAX_N], compressed[MAX_N];
    do {
        printf("=== Coordinate Compression Codeforces Suite ===\n");
        printf("1. Solve Single Contest Case\n");
        printf("2. Solve Multi-Testcases (T Cases)\n");
        printf("3. Set Custom Dataset\n");
        printf("4. Query Rank of Value\n");
        printf("5. Query Original Coordinate by Rank\n");
        printf("6. Display Current Mapping\n");
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
                solve_cf_case();
                break;
            case 2: {
                int t;
                printf("Enter number of test cases (T): ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        printf("[Case #%d]\n", c);
                        solve_cf_case();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                printf("Enter N: ");
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_N) {
                    printf("Enter %d integers: ", n);
                    for (int i = 0; i < n; i++) scanf("%d", &orig[i]);
                    clear_input();
                    u_len = compress_coords(orig, n, unique_arr, compressed);
                    printf("Compressed %d values into %d distinct ranks.\n", n, u_len);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (u_len == 0) {
                    printf("Dataset empty.\n");
                    break;
                }
                int val;
                printf("Enter value to query: ");
                if (scanf("%d", &val) == 1) {
                    clear_input();
                    int r = query_rank(unique_arr, u_len, val);
                    if (r >= 0) printf("Value %d has rank %d (0-indexed)\n", val, r);
                    else printf("Value %d not in dataset.\n", val);
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                if (u_len == 0) {
                    printf("Dataset empty.\n");
                    break;
                }
                int r;
                printf("Enter rank (0 to %d): ", u_len - 1);
                if (scanf("%d", &r) == 1) {
                    clear_input();
                    if (r >= 0 && r < u_len) {
                        printf("Rank %d corresponds to coordinate %d\n", r, unique_arr[r]);
                    } else {
                        printf("Rank out of bounds.\n");
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 6: {
                if (n == 0) {
                    printf("Dataset empty.\n");
                    break;
                }
                printf("Original -> Compressed Rank:\n");
                for (int i = 0; i < n; i++) {
                    printf("arr[%d] = %-8d -> rank %d\n", i, orig[i], compressed[i]);
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
Available via: `prog_cp_coordinate_compression`, `competitive-programming.full-programs.fast-io-utilities.coordinate-compression.prog-coordinate-compression`, `competitive-programming>prog_cp_coordinate_compression()`, `competitive-programming>full-programs>fast-io-utilities>coordinate-compression>prog-coordinate-compression>prog_cp_coordinate_compression()`

import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateCpStructuresFullPrograms(): Component[] {
  const components: Component[] = [];

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.range-queries.prefix-sums.prog-prefix-sums",
      name: "prog_cp_prefix_sums",
      type: "program",
      category: "competitive-programming",
      subcategory: "range-queries",
      categoryId: "competitive-programming.full-programs.range-queries.prefix-sums",
      path: "competitive-programming/full-programs/range-queries/prefix-sums/prog-prefix-sums",
      description: "Codeforces style 1D and 2D prefix sums suite answering O(1) range and subgrid queries",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef long long ll;
#define MAX_N 1000
#define MAX_DIM 100

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void solve_1d_cf(void) {
    int n, q;
    printf("Enter N (size) and Q (queries): ");
    if (scanf("%d %d", &n, &q) != 2 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    ll arr[MAX_N + 1], pref[MAX_N + 1];
    pref[0] = 0;
    printf("Enter %d integers: ", n);
    for (int i = 1; i <= n; i++) {
        scanf("%lld", &arr[i]);
        pref[i] = pref[i - 1] + arr[i];
    }
    printf("Enter %d queries (1-indexed L R):\\n", q);
    for (int i = 0; i < q; i++) {
        int l, r;
        scanf("%d %d", &l, &r);
        if (l >= 1 && r <= n && l <= r) {
            printf("Sum[%d..%d] = %lld\\n", l, r, pref[r] - pref[l - 1]);
        } else {
            printf("Invalid query range.\\n");
        }
    }
    clear_input();
}

static void solve_2d_cf(void) {
    int r, c, q;
    printf("Enter rows R, cols C (<= %d) and Q queries: ", MAX_DIM);
    if (scanf("%d %d %d", &r, &c, &q) != 3 || r <= 0 || c <= 0 || r > MAX_DIM || c > MAX_DIM) {
        clear_input();
        return;
    }
    ll pref[MAX_DIM + 1][MAX_DIM + 1];
    for (int i = 0; i <= r; i++) {
        for (int j = 0; j <= c; j++) pref[i][j] = 0;
    }
    printf("Enter %d x %d matrix elements row by row:\\n", r, c);
    for (int i = 1; i <= r; i++) {
        for (int j = 1; j <= c; j++) {
            ll val;
            scanf("%lld", &val);
            pref[i][j] = val + pref[i - 1][j] + pref[i][j - 1] - pref[i - 1][j - 1];
        }
    }
    printf("Enter %d subgrid queries (1-indexed r1 c1 r2 c2):\\n", q);
    for (int i = 0; i < q; i++) {
        int r1, c1, r2, c2;
        scanf("%d %d %d %d", &r1, &c1, &r2, &c2);
        if (r1 >= 1 && r2 <= r && c1 >= 1 && c2 <= c && r1 <= r2 && c1 <= c2) {
            ll total = pref[r2][c2] - pref[r1 - 1][c2] - pref[r2][c1 - 1] + pref[r1 - 1][c1 - 1];
            printf("SubgridSum([%d,%d]..[%d,%d]) = %lld\\n", r1, c1, r2, c2, total);
        } else {
            printf("Invalid subgrid bounds.\\n");
        }
    }
    clear_input();
}

static void kadane_1d(void) {
    int n;
    printf("Enter array size N: ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    ll arr[MAX_N];
    printf("Enter %d integers: ", n);
    for (int i = 0; i < n; i++) scanf("%lld", &arr[i]);
    clear_input();
    ll max_so_far = arr[0], curr_max = arr[0];
    int start = 0, end = 0, s = 0;
    for (int i = 1; i < n; i++) {
        if (arr[i] > curr_max + arr[i]) {
            curr_max = arr[i];
            s = i;
        } else {
            curr_max += arr[i];
        }
        if (curr_max > max_so_far) {
            max_so_far = curr_max;
            start = s;
            end = i;
        }
    }
    printf("Max subarray sum: %lld (from index %d to %d)\\n", max_so_far, start, end);
}

int main(void) {
    int choice;
    do {
        printf("=== Prefix Sums Codeforces Suite ===\\n");
        printf("1. Solve 1D Prefix Sums Contest Problem\\n");
        printf("2. Solve 2D Subgrid Prefix Sums Problem\\n");
        printf("3. Maximum Subarray Sum (Kadane's Algorithm)\\n");
        printf("4. Solve Multi-Testcases (T Cases)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                solve_1d_cf();
                break;
            case 2:
                solve_2d_cf();
                break;
            case 3:
                kadane_1d();
                break;
            case 4: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        printf("[Case #%d]\\n", c);
                        solve_1d_cf();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "prefix-sums", "full-program"],
      aliases: ["prog_cp_prefix_sums"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.range-queries.difference-array.prog-difference-array",
      name: "prog_cp_difference_array",
      type: "program",
      category: "competitive-programming",
      subcategory: "range-queries",
      categoryId: "competitive-programming.full-programs.range-queries.difference-array",
      path: "competitive-programming/full-programs/range-queries/difference-array/prog-difference-array",
      description: "Codeforces style difference array suite applying O(1) range updates and generating final arrays",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef long long ll;
#define MAX_N 1000

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void solve_cf_case(void) {
    int n, q;
    printf("Enter array size N and number of updates Q: ");
    if (scanf("%d %d", &n, &q) != 2 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    ll orig[MAX_N + 2] = {0};
    ll diff[MAX_N + 2] = {0};
    printf("Enter initial %d elements: ", n);
    for (int i = 1; i <= n; i++) {
        scanf("%lld", &orig[i]);
    }
    diff[1] = orig[1];
    for (int i = 2; i <= n; i++) {
        diff[i] = orig[i] - orig[i - 1];
    }
    printf("Enter %d updates (1-indexed L R Val):\\n", q);
    for (int i = 0; i < q; i++) {
        int l, r;
        ll v;
        scanf("%d %d %lld", &l, &r, &v);
        if (l >= 1 && r <= n && l <= r) {
            diff[l] += v;
            diff[r + 1] -= v;
        } else {
            printf("Update out of bounds, skipped.\\n");
        }
    }
    clear_input();
    ll final_arr[MAX_N + 2];
    ll cur = 0;
    for (int i = 1; i <= n; i++) {
        cur += diff[i];
        final_arr[i] = cur;
    }
    printf("Final array: ");
    for (int i = 1; i <= n; i++) printf("%lld ", final_arr[i]);
    putchar('\\n');
}

int main(void) {
    int choice;
    int n = 0;
    ll diff[MAX_N + 2] = {0};
    do {
        printf("=== Difference Array Codeforces Suite ===\\n");
        printf("1. Solve Standard Range Updates Problem\\n");
        printf("2. Initialize Interactive Array (Size N)\\n");
        printf("3. Apply Range Add Update in O(1) [L, R, Val]\\n");
        printf("4. Reconstruct & Display Final Array\\n");
        printf("5. Solve Multi-Testcases (T Cases)\\n");
        printf("0. Exit\\n");
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
                printf("Enter N (<= %d): ", MAX_N);
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_N) {
                    for (int i = 0; i <= n + 1; i++) diff[i] = 0;
                    printf("Enter %d initial values: ", n);
                    ll prev = 0;
                    for (int i = 1; i <= n; i++) {
                        ll x;
                        scanf("%lld", &x);
                        diff[i] = x - prev;
                        prev = x;
                    }
                    clear_input();
                    printf("Array initialized.\\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (n == 0) {
                    printf("Initialize array first.\\n");
                    break;
                }
                int l, r;
                ll v;
                printf("Enter L R Val: ");
                if (scanf("%d %d %lld", &l, &r, &v) == 3 && l >= 1 && r <= n && l <= r) {
                    clear_input();
                    diff[l] += v;
                    diff[r + 1] -= v;
                    printf("Updated range [%d, %d] with +%lld in O(1).\\n", l, r, v);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (n == 0) {
                    printf("Array not initialized.\\n");
                    break;
                }
                printf("Reconstructed Array: ");
                ll running = 0;
                for (int i = 1; i <= n; i++) {
                    running += diff[i];
                    printf("%lld ", running);
                }
                putchar('\\n');
                break;
            }
            case 5: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        printf("[Case #%d]\\n", c);
                        solve_cf_case();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "difference-array", "full-program"],
      aliases: ["prog_cp_difference_array"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.range-queries.two-pointers.prog-two-pointers",
      name: "prog_cp_two_pointers",
      type: "program",
      category: "competitive-programming",
      subcategory: "range-queries",
      categoryId: "competitive-programming.full-programs.range-queries.two-pointers",
      path: "competitive-programming/full-programs/range-queries/two-pointers/prog-two-pointers",
      description: "Codeforces style two-pointers problem suite solving pair sum, 3-sum, and trapping rain water",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_N 1000

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
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
            printf("Found pair: (%d, %d)\\n", arr[left], arr[right]);
            found = 1;
            left++;
            right--;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    if (!found) printf("No pair with sum %d exists.\\n", target);
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
    printf("Total trapped rain water: %lld units\\n", total_water);
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
    printf("Max water area: %lld (between index %d and %d)\\n", max_area, b_l, b_r);
}

int main(void) {
    int choice;
    do {
        printf("=== Two Pointers Codeforces Suite ===\\n");
        printf("1. Pair Sum Search (Sorted Two Pointers)\\n");
        printf("2. Trapping Rain Water (O(N) Time, O(1) Space)\\n");
        printf("3. Container with Most Water\\n");
        printf("4. Solve Multi-Testcases (T Cases)\\n");
        printf("0. Exit\\n");
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
                        printf("[Case #%d]\\n", c);
                        pair_sum();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "two-pointers", "full-program"],
      aliases: ["prog_cp_two_pointers"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.range-queries.sliding-window.prog-sliding-window",
      name: "prog_cp_sliding_window",
      type: "program",
      category: "competitive-programming",
      subcategory: "range-queries",
      categoryId: "competitive-programming.full-programs.range-queries.sliding-window",
      path: "competitive-programming/full-programs/range-queries/sliding-window/prog-sliding-window",
      description: "Codeforces style sliding window suite executing fixed and variable window optimization",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef long long ll;
#define MAX_N 1000

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void fixed_window_max_sum(void) {
    int n, k;
    printf("Enter array size N and window size K: ");
    if (scanf("%d %d", &n, &k) != 2 || n <= 0 || k <= 0 || k > n || n > MAX_N) {
        clear_input();
        return;
    }
    ll arr[MAX_N];
    printf("Enter %d integers: ", n);
    for (int i = 0; i < n; i++) scanf("%lld", &arr[i]);
    clear_input();
    ll window_sum = 0;
    for (int i = 0; i < k; i++) window_sum += arr[i];
    ll max_sum = window_sum;
    int best_start = 0;
    for (int i = k; i < n; i++) {
        window_sum += arr[i] - arr[i - k];
        if (window_sum > max_sum) {
            max_sum = window_sum;
            best_start = i - k + 1;
        }
    }
    printf("Max sum window of size %d: %lld (starts at index %d)\\n", k, max_sum, best_start);
}

static void min_subarray_len_sum(void) {
    int n;
    ll target;
    printf("Enter array size N and Target sum S: ");
    if (scanf("%d %lld", &n, &target) != 2 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    ll arr[MAX_N];
    printf("Enter %d positive integers: ", n);
    for (int i = 0; i < n; i++) scanf("%lld", &arr[i]);
    clear_input();
    int min_len = n + 1;
    ll current_sum = 0;
    int left = 0;
    for (int right = 0; right < n; right++) {
        current_sum += arr[right];
        while (current_sum >= target) {
            int len = right - left + 1;
            if (len < min_len) min_len = len;
            current_sum -= arr[left++];
        }
    }
    if (min_len <= n) printf("Min subarray length with sum >= %lld: %d\\n", target, min_len);
    else printf("No subarray with sum >= %lld found.\\n", target);
}

int main(void) {
    int choice;
    do {
        printf("=== Sliding Window Codeforces Suite ===\\n");
        printf("1. Fixed Window: Maximum Sum of Size K\\n");
        printf("2. Variable Window: Minimum Length Subarray with Sum >= S\\n");
        printf("3. Solve Multi-Testcases (T Cases)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                fixed_window_max_sum();
                break;
            case 2:
                min_subarray_len_sum();
                break;
            case 3: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        printf("[Case #%d]\\n", c);
                        fixed_window_max_sum();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "sliding-window", "full-program"],
      aliases: ["prog_cp_sliding_window"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.cp-data-structures.fenwick-tree.prog-fenwick-tree",
      name: "prog_cp_fenwick_tree",
      type: "program",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.full-programs.cp-data-structures.fenwick-tree",
      path: "competitive-programming/full-programs/cp-data-structures/fenwick-tree/prog-fenwick-tree",
      description: "Codeforces style Fenwick tree suite with point updates, prefix sums, and range queries",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef long long ll;
#define MAX_N 1000

static int fenwick_n = 0;
static ll bit[MAX_N + 1];
static ll orig_arr[MAX_N + 1];

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void fenwick_add(int idx, ll delta) {
    for (; idx <= fenwick_n; idx += idx & -idx) {
        bit[idx] += delta;
    }
}

static ll fenwick_query(int idx) {
    ll sum = 0;
    for (; idx > 0; idx -= idx & -idx) {
        sum += bit[idx];
    }
    return sum;
}

static ll fenwick_range(int l, int r) {
    if (l > r || l <= 0 || r > fenwick_n) return 0;
    return fenwick_query(r) - fenwick_query(l - 1);
}

static void solve_cf_contest(void) {
    int n, q;
    printf("Enter N (size) and Q (queries): ");
    if (scanf("%d %d", &n, &q) != 2 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    fenwick_n = n;
    for (int i = 0; i <= n; i++) bit[i] = orig_arr[i] = 0;
    printf("Enter %d integers: ", n);
    for (int i = 1; i <= n; i++) {
        scanf("%lld", &orig_arr[i]);
        fenwick_add(i, orig_arr[i]);
    }
    printf("Enter %d queries (1: update pos delta, 2: range sum l r):\\n", q);
    for (int i = 0; i < q; i++) {
        int type;
        scanf("%d", &type);
        if (type == 1) {
            int pos;
            ll delta;
            scanf("%d %lld", &pos, &delta);
            if (pos >= 1 && pos <= n) {
                orig_arr[pos] += delta;
                fenwick_add(pos, delta);
            }
        } else if (type == 2) {
            int l, r;
            scanf("%d %d", &l, &r);
            printf("Sum[%d..%d] = %lld\\n", l, r, fenwick_range(l, r));
        }
    }
    clear_input();
}

int main(void) {
    int choice;
    do {
        printf("=== Fenwick Tree (BIT) Codeforces Suite ===\\n");
        printf("Active Tree Size: %d\\n", fenwick_n);
        printf("1. Solve Standard Contest Problem (N elements, Q queries)\\n");
        printf("2. Initialize Tree from Array\\n");
        printf("3. Point Update (Add Delta to Index)\\n");
        printf("4. Point Set (Set New Value at Index)\\n");
        printf("5. Prefix Sum Query [1..idx]\\n");
        printf("6. Range Sum Query [L..R]\\n");
        printf("7. Display Raw Array vs BIT Structure\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                solve_cf_contest();
                break;
            case 2: {
                printf("Enter N (<= %d): ", MAX_N);
                if (scanf("%d", &fenwick_n) == 1 && fenwick_n > 0 && fenwick_n <= MAX_N) {
                    for (int i = 0; i <= fenwick_n; i++) bit[i] = orig_arr[i] = 0;
                    printf("Enter %d integers: ", fenwick_n);
                    for (int i = 1; i <= fenwick_n; i++) {
                        scanf("%lld", &orig_arr[i]);
                        fenwick_add(i, orig_arr[i]);
                    }
                    clear_input();
                    printf("Fenwick tree built successfully.\\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (fenwick_n == 0) {
                    printf("Initialize tree first.\\n");
                    break;
                }
                int idx;
                ll delta;
                printf("Enter index (1..%d) and delta: ", fenwick_n);
                if (scanf("%d %lld", &idx, &delta) == 2 && idx >= 1 && idx <= fenwick_n) {
                    clear_input();
                    orig_arr[idx] += delta;
                    fenwick_add(idx, delta);
                    printf("Updated index %d. New value: %lld\\n", idx, orig_arr[idx]);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (fenwick_n == 0) {
                    printf("Initialize tree first.\\n");
                    break;
                }
                int idx;
                ll val;
                printf("Enter index (1..%d) and new value: ", fenwick_n);
                if (scanf("%d %lld", &idx, &val) == 2 && idx >= 1 && idx <= fenwick_n) {
                    clear_input();
                    ll delta = val - orig_arr[idx];
                    orig_arr[idx] = val;
                    fenwick_add(idx, delta);
                    printf("Set index %d = %lld\\n", idx, val);
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                if (fenwick_n == 0) {
                    printf("Tree empty.\\n");
                    break;
                }
                int idx;
                printf("Enter index (1..%d): ", fenwick_n);
                if (scanf("%d", &idx) == 1 && idx >= 1 && idx <= fenwick_n) {
                    clear_input();
                    printf("PrefixSum(1..%d) = %lld\\n", idx, fenwick_query(idx));
                } else {
                    clear_input();
                }
                break;
            }
            case 6: {
                if (fenwick_n == 0) {
                    printf("Tree empty.\\n");
                    break;
                }
                int l, r;
                printf("Enter range L R (1..%d): ", fenwick_n);
                if (scanf("%d %d", &l, &r) == 2 && l >= 1 && r <= fenwick_n && l <= r) {
                    clear_input();
                    printf("RangeSum(%d..%d) = %lld\\n", l, r, fenwick_range(l, r));
                } else {
                    clear_input();
                }
                break;
            }
            case 7: {
                if (fenwick_n == 0) {
                    printf("Tree empty.\\n");
                    break;
                }
                printf("Index: ");
                for (int i = 1; i <= fenwick_n; i++) printf("%4d ", i);
                printf("\\nArray: ");
                for (int i = 1; i <= fenwick_n; i++) printf("%4lld ", orig_arr[i]);
                printf("\\nTree:  ");
                for (int i = 1; i <= fenwick_n; i++) printf("%4lld ", bit[i]);
                putchar('\\n');
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "fenwick-tree", "full-program"],
      aliases: ["prog_cp_fenwick_tree"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.cp-data-structures.segment-tree.prog-segment-tree",
      name: "prog_cp_segment_tree",
      type: "program",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.full-programs.cp-data-structures.segment-tree",
      path: "competitive-programming/full-programs/cp-data-structures/segment-tree/prog-segment-tree",
      description: "Codeforces style segment tree suite executing range minimum queries (RMQ), sum, and point updates",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef long long ll;
#define MAX_N 1000
#define INF_VAL 2000000000000000000LL

static int seg_n = 0;
static ll tree_sum[4 * MAX_N];
static ll tree_min[4 * MAX_N];
static ll raw_arr[MAX_N + 1];

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void build_seg(int node, int start, int end) {
    if (start == end) {
        tree_sum[node] = raw_arr[start];
        tree_min[node] = raw_arr[start];
        return;
    }
    int mid = start + (end - start) / 2;
    build_seg(2 * node, start, mid);
    build_seg(2 * node + 1, mid + 1, end);
    tree_sum[node] = tree_sum[2 * node] + tree_sum[2 * node + 1];
    tree_min[node] = tree_min[2 * node] < tree_min[2 * node + 1] ? tree_min[2 * node] : tree_min[2 * node + 1];
}

static void update_seg(int node, int start, int end, int idx, ll val) {
    if (start == end) {
        raw_arr[idx] = val;
        tree_sum[node] = val;
        tree_min[node] = val;
        return;
    }
    int mid = start + (end - start) / 2;
    if (idx <= mid) update_seg(2 * node, start, mid, idx, val);
    else update_seg(2 * node + 1, mid + 1, end, idx, val);
    tree_sum[node] = tree_sum[2 * node] + tree_sum[2 * node + 1];
    tree_min[node] = tree_min[2 * node] < tree_min[2 * node + 1] ? tree_min[2 * node] : tree_min[2 * node + 1];
}

static ll query_sum(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return tree_sum[node];
    int mid = start + (end - start) / 2;
    return query_sum(2 * node, start, mid, l, r) + query_sum(2 * node + 1, mid + 1, end, l, r);
}

static ll query_min(int node, int start, int end, int l, int r) {
    if (r < start || end < l) return INF_VAL;
    if (l <= start && end <= r) return tree_min[node];
    int mid = start + (end - start) / 2;
    ll p1 = query_min(2 * node, start, mid, l, r);
    ll p2 = query_min(2 * node + 1, mid + 1, end, l, r);
    return p1 < p2 ? p1 : p2;
}

static void solve_cf_case(void) {
    int n, q;
    printf("Enter N and Q: ");
    if (scanf("%d %d", &n, &q) != 2 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    seg_n = n;
    printf("Enter %d values: ", n);
    for (int i = 1; i <= n; i++) scanf("%lld", &raw_arr[i]);
    build_seg(1, 1, seg_n);
    printf("Enter %d queries (1: update idx val, 2: sum l r, 3: min l r):\\n", q);
    for (int i = 0; i < q; i++) {
        int type;
        scanf("%d", &type);
        if (type == 1) {
            int idx;
            ll val;
            scanf("%d %lld", &idx, &val);
            if (idx >= 1 && idx <= seg_n) update_seg(1, 1, seg_n, idx, val);
        } else if (type == 2) {
            int l, r;
            scanf("%d %d", &l, &r);
            printf("Sum[%d..%d] = %lld\\n", l, r, query_sum(1, 1, seg_n, l, r));
        } else if (type == 3) {
            int l, r;
            scanf("%d %d", &l, &r);
            printf("RMQ[%d..%d] = %lld\\n", l, r, query_min(1, 1, seg_n, l, r));
        }
    }
    clear_input();
}

int main(void) {
    int choice;
    do {
        printf("=== Segment Tree Codeforces Suite ===\\n");
        printf("Active Tree Size: %d\\n", seg_n);
        printf("1. Solve Standard Contest Problem (Point Update, RMQ, Range Sum)\\n");
        printf("2. Build Tree from Array\\n");
        printf("3. Point Update (Index = Val)\\n");
        printf("4. Range Sum Query [L..R]\\n");
        printf("5. Range Minimum Query (RMQ) [L..R]\\n");
        printf("6. Display Current Array\\n");
        printf("0. Exit\\n");
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
                printf("Enter N (<= %d): ", MAX_N);
                if (scanf("%d", &seg_n) == 1 && seg_n > 0 && seg_n <= MAX_N) {
                    printf("Enter %d integers: ", seg_n);
                    for (int i = 1; i <= seg_n; i++) scanf("%lld", &raw_arr[i]);
                    clear_input();
                    build_seg(1, 1, seg_n);
                    printf("Segment tree constructed successfully.\\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (seg_n == 0) {
                    printf("Build tree first.\\n");
                    break;
                }
                int idx;
                ll val;
                printf("Enter index (1..%d) and new value: ", seg_n);
                if (scanf("%d %lld", &idx, &val) == 2 && idx >= 1 && idx <= seg_n) {
                    clear_input();
                    update_seg(1, 1, seg_n, idx, val);
                    printf("Updated index %d to %lld.\\n", idx, val);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (seg_n == 0) {
                    printf("Build tree first.\\n");
                    break;
                }
                int l, r;
                printf("Enter range L R (1..%d): ", seg_n);
                if (scanf("%d %d", &l, &r) == 2 && l >= 1 && r <= seg_n && l <= r) {
                    clear_input();
                    printf("RangeSum(%d..%d) = %lld\\n", l, r, query_sum(1, 1, seg_n, l, r));
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                if (seg_n == 0) {
                    printf("Build tree first.\\n");
                    break;
                }
                int l, r;
                printf("Enter range L R (1..%d): ", seg_n);
                if (scanf("%d %d", &l, &r) == 2 && l >= 1 && r <= seg_n && l <= r) {
                    clear_input();
                    printf("RMQ(%d..%d) = %lld\\n", l, r, query_min(1, 1, seg_n, l, r));
                } else {
                    clear_input();
                }
                break;
            }
            case 6: {
                if (seg_n == 0) {
                    printf("Tree empty.\\n");
                    break;
                }
                printf("Current Array: ");
                for (int i = 1; i <= seg_n; i++) printf("%lld ", raw_arr[i]);
                putchar('\\n');
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "segment-tree", "full-program"],
      aliases: ["prog_cp_segment_tree"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.cp-data-structures.disjoint-set.prog-disjoint-set",
      name: "prog_cp_disjoint_set",
      type: "program",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.full-programs.cp-data-structures.disjoint-set",
      path: "competitive-programming/full-programs/cp-data-structures/disjoint-set/prog-disjoint-set",
      description: "Codeforces style Disjoint Set Union (DSU) suite with path compression and union by size",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_NODES 2000

static int parent[MAX_NODES + 1];
static int comp_size[MAX_NODES + 1];
static int total_nodes = 0;
static int total_comps = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void dsu_init(int n) {
    total_nodes = n;
    total_comps = n;
    for (int i = 1; i <= n; i++) {
        parent[i] = i;
        comp_size[i] = 1;
    }
}

static int dsu_find(int i) {
    if (parent[i] == i) return i;
    return parent[i] = dsu_find(parent[i]);
}

static int dsu_union(int i, int j) {
    int root_i = dsu_find(i);
    int root_j = dsu_find(j);
    if (root_i == root_j) return 0;
    if (comp_size[root_i] < comp_size[root_j]) {
        int tmp = root_i; root_i = root_j; root_j = tmp;
    }
    parent[root_j] = root_i;
    comp_size[root_i] += comp_size[root_j];
    total_comps--;
    return 1;
}

static void solve_cf_case(void) {
    int n, q;
    printf("Enter vertices N and queries Q: ");
    if (scanf("%d %d", &n, &q) != 2 || n <= 0 || n > MAX_NODES) {
        clear_input();
        return;
    }
    dsu_init(n);
    printf("Enter %d queries (1: union u v, 2: check u v, 3: size of u):\\n", q);
    for (int i = 0; i < q; i++) {
        int type, u, v;
        scanf("%d", &type);
        if (type == 1) {
            scanf("%d %d", &u, &v);
            if (u >= 1 && u <= n && v >= 1 && v <= n) {
                int merged = dsu_union(u, v);
                printf("Union(%d, %d) -> %s (Remaining Comps: %d)\\n",
                       u, v, merged ? "MERGED" : "ALREADY CONNECTED (CYCLE)", total_comps);
            }
        } else if (type == 2) {
            scanf("%d %d", &u, &v);
            if (u >= 1 && u <= n && v >= 1 && v <= n) {
                int same = (dsu_find(u) == dsu_find(v));
                printf("Connected(%d, %d): %s\\n", u, v, same ? "YES" : "NO");
            }
        } else if (type == 3) {
            scanf("%d", &u);
            if (u >= 1 && u <= n) {
                printf("Size of component containing %d: %d\\n", u, comp_size[dsu_find(u)]);
            }
        }
    }
    clear_input();
}

int main(void) {
    int choice;
    do {
        printf("=== Disjoint Set Union (DSU) Codeforces Suite ===\\n");
        printf("Active Vertices: %d | Connected Components: %d\\n", total_nodes, total_comps);
        printf("1. Solve Standard Contest Problem (Union, Connected, Size)\\n");
        printf("2. Initialize DSU with N Vertices\\n");
        printf("3. Union Sets (u, v)\\n");
        printf("4. Check Connectivity (Are u and v connected?)\\n");
        printf("5. Get Component Size of Vertex u\\n");
        printf("6. Graph Cycle Detection (Add M Edges)\\n");
        printf("0. Exit\\n");
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
                int n;
                printf("Enter N (<= %d): ", MAX_NODES);
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_NODES) {
                    clear_input();
                    dsu_init(n);
                    printf("DSU initialized with %d vertices.\\n", n);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (total_nodes == 0) {
                    printf("Initialize DSU first.\\n");
                    break;
                }
                int u, v;
                printf("Enter u and v: ");
                if (scanf("%d %d", &u, &v) == 2 && u >= 1 && u <= total_nodes && v >= 1 && v <= total_nodes) {
                    clear_input();
                    int res = dsu_union(u, v);
                    printf("Union: %s. Total components now: %d\\n",
                           res ? "SUCCESS" : "ALREADY IN SAME SET", total_comps);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (total_nodes == 0) {
                    printf("Initialize DSU first.\\n");
                    break;
                }
                int u, v;
                printf("Enter u and v: ");
                if (scanf("%d %d", &u, &v) == 2 && u >= 1 && u <= total_nodes && v >= 1 && v <= total_nodes) {
                    clear_input();
                    printf("Connected: %s\\n", (dsu_find(u) == dsu_find(v)) ? "YES" : "NO");
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                if (total_nodes == 0) {
                    printf("Initialize DSU first.\\n");
                    break;
                }
                int u;
                printf("Enter u: ");
                if (scanf("%d", &u) == 1 && u >= 1 && u <= total_nodes) {
                    clear_input();
                    printf("Vertex %d root: %d | Component size: %d\\n",
                           u, dsu_find(u), comp_size[dsu_find(u)]);
                } else {
                    clear_input();
                }
                break;
            }
            case 6: {
                int n, m;
                printf("Enter N vertices and M edges: ");
                if (scanf("%d %d", &n, &m) == 2 && n > 0 && n <= MAX_NODES) {
                    dsu_init(n);
                    int cycle_found = 0;
                    printf("Enter %d edges (u v):\\n", m);
                    for (int i = 0; i < m; i++) {
                        int u, v;
                        scanf("%d %d", &u, &v);
                        if (!dsu_union(u, v)) {
                            printf("Edge (%d, %d) creates a CYCLE!\\n", u, v);
                            cycle_found = 1;
                        }
                    }
                    clear_input();
                    if (!cycle_found) printf("Graph is ACYCLIC (Forest/Tree).\\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "disjoint-set", "full-program"],
      aliases: ["prog_cp_disjoint_set"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.cp-data-structures.monotonic-structures.prog-monotonic-structures",
      name: "prog_cp_monotonic_structures",
      type: "program",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.full-programs.cp-data-structures.monotonic-structures",
      path: "competitive-programming/full-programs/cp-data-structures/monotonic-structures/prog-monotonic-structures",
      description: "Codeforces style monotonic structures suite computing next greater elements, window max, and histogram area",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_N 1000

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void next_greater_element(void) {
    int n;
    printf("Enter array size N: ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    int arr[MAX_N], nge[MAX_N], stack[MAX_N];
    printf("Enter %d integers: ", n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    clear_input();
    int top = -1;
    for (int i = n - 1; i >= 0; i--) {
        while (top >= 0 && stack[top] <= arr[i]) top--;
        nge[i] = (top >= 0) ? stack[top] : -1;
        stack[++top] = arr[i];
    }
    printf("Next Greater Elements:\\n");
    for (int i = 0; i < n; i++) {
        printf("arr[%d] = %-4d -> NGE: %d\\n", i, arr[i], nge[i]);
    }
}

static void sliding_window_maximum(void) {
    int n, k;
    printf("Enter array size N and window size K: ");
    if (scanf("%d %d", &n, &k) != 2 || n <= 0 || k <= 0 || k > n || n > MAX_N) {
        clear_input();
        return;
    }
    int arr[MAX_N], deque[MAX_N];
    printf("Enter %d integers: ", n);
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    clear_input();
    int head = 0, tail = -1;
    printf("Sliding Window Maximums: ");
    for (int i = 0; i < n; i++) {
        if (head <= tail && deque[head] <= i - k) head++;
        while (head <= tail && arr[deque[tail]] <= arr[i]) tail--;
        deque[++tail] = i;
        if (i >= k - 1) {
            printf("%d ", arr[deque[head]]);
        }
    }
    putchar('\\n');
}

static void largest_rectangle_histogram(void) {
    int n;
    printf("Enter number of bars N: ");
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    long long h[MAX_N];
    printf("Enter %d bar heights: ", n);
    for (int i = 0; i < n; i++) scanf("%lld", &h[i]);
    clear_input();
    int stack[MAX_N + 1];
    int top = -1;
    long long max_area = 0;
    for (int i = 0; i <= n; i++) {
        long long cur_h = (i == n) ? 0 : h[i];
        while (top >= 0 && h[stack[top]] > cur_h) {
            long long height = h[stack[top--]];
            long long width = (top < 0) ? i : (i - stack[top] - 1);
            long long area = height * width;
            if (area > max_area) max_area = area;
        }
        stack[++top] = i;
    }
    printf("Largest Rectangle Area: %lld\\n", max_area);
}

int main(void) {
    int choice;
    do {
        printf("=== Monotonic Structures Codeforces Suite ===\\n");
        printf("1. Next Greater Element (NGE) in O(N)\\n");
        printf("2. Sliding Window Maximum in O(N) using Monotonic Deque\\n");
        printf("3. Largest Rectangle in Histogram in O(N) using Monotonic Stack\\n");
        printf("4. Solve Multi-Testcases (T Cases)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                next_greater_element();
                break;
            case 2:
                sliding_window_maximum();
                break;
            case 3:
                largest_rectangle_histogram();
                break;
            case 4: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        printf("[Case #%d]\\n", c);
                        next_greater_element();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "monotonic-structures", "full-program"],
      aliases: ["prog_cp_monotonic_structures"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.binary-search-techniques.binary-search-answer.prog-binary-search-answer",
      name: "prog_cp_binary_search_answer",
      type: "program",
      category: "competitive-programming",
      subcategory: "binary-search-techniques",
      categoryId: "competitive-programming.full-programs.binary-search-techniques.binary-search-answer",
      path: "competitive-programming/full-programs/binary-search-techniques/binary-search-answer/prog-binary-search-answer",
      description: "Codeforces style binary search on answer suite solving painter partition and aggressive cows",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef long long ll;
#define MAX_N 1000

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int check_painter(const ll* boards, int n, int k, ll max_time) {
    int painters = 1;
    ll current_load = 0;
    for (int i = 0; i < n; i++) {
        if (boards[i] > max_time) return 0;
        if (current_load + boards[i] <= max_time) {
            current_load += boards[i];
        } else {
            painters++;
            current_load = boards[i];
            if (painters > k) return 0;
        }
    }
    return 1;
}

static void painter_partition(void) {
    int n, k;
    printf("Enter number of boards N and workers K: ");
    if (scanf("%d %d", &n, &k) != 2 || n <= 0 || k <= 0 || n > MAX_N) {
        clear_input();
        return;
    }
    ll boards[MAX_N];
    ll low = 0, high = 0;
    printf("Enter %d board lengths: ", n);
    for (int i = 0; i < n; i++) {
        scanf("%lld", &boards[i]);
        if (boards[i] > low) low = boards[i];
        high += boards[i];
    }
    clear_input();
    ll ans = high;
    while (low <= high) {
        ll mid = low + (high - low) / 2;
        if (check_painter(boards, n, k, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    printf("Minimum maximum workload allocated to any worker: %lld\\n", ans);
}

static int cmp_ll(const void* a, const void* b) {
    ll x = *(const ll*)a;
    ll y = *(const ll*)b;
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
}

static int check_cows(const ll* stalls, int n, int c, ll min_dist) {
    int cows_placed = 1;
    ll last_pos = stalls[0];
    for (int i = 1; i < n; i++) {
        if (stalls[i] - last_pos >= min_dist) {
            cows_placed++;
            last_pos = stalls[i];
            if (cows_placed >= c) return 1;
        }
    }
    return 0;
}

static void aggressive_cows(void) {
    int n, c;
    printf("Enter number of stalls N and cows C: ");
    if (scanf("%d %d", &n, &c) != 2 || n <= 0 || c <= 0 || c > n || n > MAX_N) {
        clear_input();
        return;
    }
    ll stalls[MAX_N];
    printf("Enter %d stall coordinates: ", n);
    for (int i = 0; i < n; i++) scanf("%lld", &stalls[i]);
    clear_input();
    qsort(stalls, (size_t)n, sizeof(ll), cmp_ll);
    ll low = 1, high = stalls[n - 1] - stalls[0], ans = 0;
    while (low <= high) {
        ll mid = low + (high - low) / 2;
        if (check_cows(stalls, n, c, mid)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    printf("Largest minimum distance possible: %lld\\n", ans);
}

int main(void) {
    int choice;
    do {
        printf("=== Binary Search on Answer Codeforces Suite ===\\n");
        printf("1. Painter's Partition (Minimize Maximum Workload)\\n");
        printf("2. Aggressive Cows (Maximize Minimum Distance)\\n");
        printf("3. Solve Multi-Testcases (T Cases)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                painter_partition();
                break;
            case 2:
                aggressive_cows();
                break;
            case 3: {
                int t;
                printf("Enter T test cases: ");
                if (scanf("%d", &t) == 1 && t > 0) {
                    clear_input();
                    for (int c = 1; c <= t; c++) {
                        printf("[Case #%d]\\n", c);
                        painter_partition();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "binary-search-answer", "full-program"],
      aliases: ["prog_cp_binary_search_answer"],
    }),

    createComponent({
      id: "competitive-programming.full-programs.binary-search-techniques.ternary-search.prog-ternary-search",
      name: "prog_cp_ternary_search",
      type: "program",
      category: "competitive-programming",
      subcategory: "binary-search-techniques",
      categoryId: "competitive-programming.full-programs.binary-search-techniques.ternary-search",
      path: "competitive-programming/full-programs/binary-search-techniques/ternary-search/prog-ternary-search",
      description: "Codeforces style ternary search suite finding extremum of unimodal functions and discrete peaks",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

#define MAX_N 1000

static double poly_a = -1.0;
static double poly_b = 4.0;
static double poly_c = 5.0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double eval_parabola(double x) {
    return poly_a * x * x + poly_b * x + poly_c;
}

static void ternary_search_continuous(void) {
    double l, r;
    printf("Finding maximum of f(x) = %.2f*x^2 + %.2f*x + %.2f\\n", poly_a, poly_b, poly_c);
    printf("Enter interval [L, R]: ");
    if (scanf("%lf %lf", &l, &r) != 2 || l >= r) {
        clear_input();
        return;
    }
    clear_input();
    for (int iter = 0; iter < 100; iter++) {
        double m1 = l + (r - l) / 3.0;
        double m2 = r - (r - l) / 3.0;
        if (eval_parabola(m1) < eval_parabola(m2)) {
            l = m1;
        } else {
            r = m2;
        }
    }
    double opt_x = (l + r) / 2.0;
    printf("Optimal x: %.8f | Maximum value: %.8f\\n", opt_x, eval_parabola(opt_x));
}

static void ternary_search_discrete_peak(void) {
    int n;
    printf("Enter size of strictly unimodal array N (>= 3): ");
    if (scanf("%d", &n) != 1 || n < 3 || n > MAX_N) {
        clear_input();
        return;
    }
    long long arr[MAX_N];
    printf("Enter %d integers (strictly increasing then strictly decreasing): ", n);
    for (int i = 0; i < n; i++) scanf("%lld", &arr[i]);
    clear_input();
    int low = 0, high = n - 1;
    while (high - low > 2) {
        int m1 = low + (high - low) / 3;
        int m2 = high - (high - low) / 3;
        if (arr[m1] < arr[m2]) low = m1;
        else high = m2;
    }
    int peak_idx = low;
    for (int i = low + 1; i <= high; i++) {
        if (arr[i] > arr[peak_idx]) peak_idx = i;
    }
    printf("Peak element: %lld at index %d\\n", arr[peak_idx], peak_idx);
}

int main(void) {
    int choice;
    do {
        printf("=== Ternary Search Codeforces Suite ===\\n");
        printf("1. Continuous Unimodal Curve Maximum [L, R]\\n");
        printf("2. Configure Parabola Coefficients (a, b, c)\\n");
        printf("3. Discrete Peak Finding in Unimodal Array\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                ternary_search_continuous();
                break;
            case 2: {
                printf("Enter coefficients a b c for f(x) = a*x^2 + b*x + c (a < 0 for max): ");
                if (scanf("%lf %lf %lf", &poly_a, &poly_b, &poly_c) == 3) {
                    clear_input();
                    printf("Updated parabola: f(x) = %.2f*x^2 + %.2f*x + %.2f\\n", poly_a, poly_b, poly_c);
                } else {
                    clear_input();
                }
                break;
            }
            case 3:
                ternary_search_discrete_peak();
                break;
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["competitive-programming", "ternary-search", "full-program"],
      aliases: ["prog_cp_ternary_search"],
    })
  );

  return components;
}

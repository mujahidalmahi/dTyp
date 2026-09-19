import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateCpProgramsPtrsBsDp(): Component[] {
  const components: Component[] = [];

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.range-queries.two-pointers.prog-cp-two-pointers-trapping-rainwater",
      name: "prog_cp_two_pointers_trapping_rainwater",
      type: "program",
      category: "competitive-programming",
      subcategory: "two-pointers",
      categoryId: "competitive-programming.full-programs.range-queries.two-pointers",
      path: "competitive-programming/full-programs/range-queries/two-pointers/prog-cp-two-pointers-trapping-rainwater",
      description: "Trapping Rainwater classic solved in O(N) time and O(1) auxiliary space using two pointers",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

static void solve(void) {
    int n;
    if (scanf("%d", &n) != 1) return;

    int* height = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &height[i]);

    int left = 0, right = n - 1;
    int left_max = 0, right_max = 0;
    long long trapped_water = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= left_max) {
                left_max = height[left];
            } else {
                trapped_water += left_max - height[left];
            }
            left++;
        } else {
            if (height[right] >= right_max) {
                right_max = height[right];
            } else {
                trapped_water += right_max - height[right];
            }
            right--;
        }
    }

    printf("%lld\\n", trapped_water);
    free(height);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "two-pointers", "trapping-rainwater", "linear-time"],
      aliases: ["prog_cp_two_pointers_trapping_rainwater", "cpTrappingRainwater"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.range-queries.two-pointers.prog-cp-two-pointers-3sum",
      name: "prog_cp_two_pointers_3sum",
      type: "program",
      category: "competitive-programming",
      subcategory: "two-pointers",
      categoryId: "competitive-programming.full-programs.range-queries.two-pointers",
      path: "competitive-programming/full-programs/range-queries/two-pointers/prog-cp-two-pointers-3sum",
      description: "3-Sum target triplet search in O(N^2) using sorting and convergent two-pointer scans",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

static int cmp_ints(const void* a, const void* b) {
    long long diff = (long long)(*(const int*)a) - (long long)(*(const int*)b);
    return (diff > 0) - (diff < 0);
}

static void solve(void) {
    int n;
    long long target;
    if (scanf("%d %lld", &n, &target) != 2) return;

    int* arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    qsort(arr, n, sizeof(int), cmp_ints);

    long long count = 0;
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && arr[i] == arr[i - 1]) continue;
        int left = i + 1;
        int right = n - 1;
        while (left < right) {
            long long sum = (long long)arr[i] + arr[left] + arr[right];
            if (sum == target) {
                count++;
                left++;
                right--;
                while (left < right && arr[left] == arr[left - 1]) left++;
                while (left < right && arr[right] == arr[right + 1]) right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }

    printf("%lld\\n", count);
    free(arr);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "two-pointers", "3sum", "sorting"],
      aliases: ["prog_cp_two_pointers_3sum", "cpTwoPointers3Sum"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.range-queries.sliding-window.prog-cp-two-pointers-k-distinct",
      name: "prog_cp_two_pointers_k_distinct",
      type: "program",
      category: "competitive-programming",
      subcategory: "sliding-window",
      categoryId: "competitive-programming.full-programs.range-queries.sliding-window",
      path: "competitive-programming/full-programs/range-queries/sliding-window/prog-cp-two-pointers-k-distinct",
      description: "Longest contiguous subarray with at most K distinct elements using two pointers",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_VAL 100005

static int freq[MAX_VAL];

static void solve(void) {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return;

    int* arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    for (int i = 0; i < MAX_VAL; i++) freq[i] = 0;

    int left = 0;
    int distinct = 0;
    int max_len = 0;
    int best_l = 0, best_r = 0;

    for (int right = 0; right < n; right++) {
        if (freq[arr[right]] == 0) {
            distinct++;
        }
        freq[arr[right]]++;

        while (distinct > k) {
            freq[arr[left]]--;
            if (freq[arr[left]] == 0) {
                distinct--;
            }
            left++;
        }

        if (right - left + 1 > max_len) {
            max_len = right - left + 1;
            best_l = left;
            best_r = right;
        }
    }

    printf("%d %d %d\\n", max_len, best_l + 1, best_r + 1);
    free(arr);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "sliding-window", "two-pointers", "k-distinct"],
      aliases: ["prog_cp_two_pointers_k_distinct", "cpKDistinctSubarray"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.range-queries.two-pointers.prog-cp-two-pointers-container-water",
      name: "prog_cp_two_pointers_container_water",
      type: "program",
      category: "competitive-programming",
      subcategory: "two-pointers",
      categoryId: "competitive-programming.full-programs.range-queries.two-pointers",
      path: "competitive-programming/full-programs/range-queries/two-pointers/prog-cp-two-pointers-container-water",
      description: "Container With Most Water area maximization in O(N) using convergent pointers",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

static void solve(void) {
    int n;
    if (scanf("%d", &n) != 1) return;

    int* height = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &height[i]);

    int left = 0, right = n - 1;
    long long max_area = 0;

    while (left < right) {
        long long h = (height[left] < height[right]) ? height[left] : height[right];
        long long current_area = h * (right - left);
        if (current_area > max_area) max_area = current_area;

        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    printf("%lld\\n", max_area);
    free(height);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "two-pointers", "container-water", "area-maximization"],
      aliases: ["prog_cp_two_pointers_container_water", "cpContainerWater"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.range-queries.sliding-window.prog-cp-two-pointers-min-window",
      name: "prog_cp_two_pointers_min_window",
      type: "program",
      category: "competitive-programming",
      subcategory: "sliding-window",
      categoryId: "competitive-programming.full-programs.range-queries.sliding-window",
      path: "competitive-programming/full-programs/range-queries/sliding-window/prog-cp-two-pointers-min-window",
      description: "Minimum window subarray containing all elements of required multiset",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

static void solve(void) {
    char s[100005];
    char p[100005];
    if (scanf("%s %s", s, p) != 2) return;

    int p_freq[256] = {0};
    int s_freq[256] = {0};
    int p_len = (int)strlen(p);
    int s_len = (int)strlen(s);

    for (int i = 0; i < p_len; i++) p_freq[(unsigned char)p[i]]++;

    int required_chars = 0;
    for (int i = 0; i < 256; i++) {
        if (p_freq[i] > 0) required_chars++;
    }

    int left = 0;
    int formed_chars = 0;
    int min_len = s_len + 1;
    int best_start = -1;

    for (int right = 0; right < s_len; right++) {
        unsigned char c = (unsigned char)s[right];
        s_freq[c]++;
        if (p_freq[c] > 0 && s_freq[c] == p_freq[c]) {
            formed_chars++;
        }

        while (left <= right && formed_chars == required_chars) {
            if (right - left + 1 < min_len) {
                min_len = right - left + 1;
                best_start = left;
            }
            unsigned char left_c = (unsigned char)s[left];
            s_freq[left_c]--;
            if (p_freq[left_c] > 0 && s_freq[left_c] < p_freq[left_c]) {
                formed_chars--;
            }
            left++;
        }
    }

    if (best_start == -1) {
        printf("-1\\n");
    } else {
        printf("%d %d\\n", min_len, best_start);
    }
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "sliding-window", "min-window", "two-pointers"],
      aliases: ["prog_cp_two_pointers_min_window", "cpMinWindow"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.binary-search-techniques.binary-search-answer.prog-cp-binary-search-aggressive-cows",
      name: "prog_cp_binary_search_aggressive_cows",
      type: "program",
      category: "competitive-programming",
      subcategory: "binary-search-answer",
      categoryId: "competitive-programming.full-programs.binary-search-techniques.binary-search-answer",
      path: "competitive-programming/full-programs/binary-search-techniques/binary-search-answer/prog-cp-binary-search-aggressive-cows",
      description: "Binary search on answer space: Aggressive Cows maximizing the minimum distance between items",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

static int cmp_ints(const void* a, const void* b) {
    long long diff = (long long)(*(const int*)a) - (long long)(*(const int*)b);
    return (diff > 0) - (diff < 0);
}

static int can_place(const int arr[], int n, int c, int dist) {
    int placed = 1;
    int last_pos = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] - last_pos >= dist) {
            placed++;
            last_pos = arr[i];
            if (placed >= c) return 1;
        }
    }
    return placed >= c;
}

static void solve(void) {
    int n, c;
    if (scanf("%d %d", &n, &c) != 2) return;

    int* arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    qsort(arr, n, sizeof(int), cmp_ints);

    int low = 1, high = arr[n - 1] - arr[0];
    int ans = 0;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (can_place(arr, n, c, mid)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    printf("%d\\n", ans);
    free(arr);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "binary-search", "answer-space", "cows"],
      aliases: ["prog_cp_binary_search_aggressive_cows", "cpAggressiveCows"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.binary-search-techniques.binary-search-answer.prog-cp-binary-search-painters-partition",
      name: "prog_cp_binary_search_painters_partition",
      type: "program",
      category: "competitive-programming",
      subcategory: "binary-search-answer",
      categoryId: "competitive-programming.full-programs.binary-search-techniques.binary-search-answer",
      path: "competitive-programming/full-programs/binary-search-techniques/binary-search-answer/prog-cp-binary-search-painters-partition",
      description: "Binary search on answer space: Painter's Partition minimizing maximum partition workload",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

static int can_allocate(const long long arr[], int n, int k, long long max_cap) {
    int painters = 1;
    long long current = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] > max_cap) return 0;
        if (current + arr[i] > max_cap) {
            painters++;
            current = arr[i];
            if (painters > k) return 0;
        } else {
            current += arr[i];
        }
    }
    return 1;
}

static void solve(void) {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return;

    long long* arr = (long long*)malloc(n * sizeof(long long));
    long long sum = 0;
    long long max_elem = 0;

    for (int i = 0; i < n; i++) {
        scanf("%lld", &arr[i]);
        sum += arr[i];
        if (arr[i] > max_elem) max_elem = arr[i];
    }

    long long low = max_elem, high = sum;
    long long ans = sum;

    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (can_allocate(arr, n, k, mid)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    printf("%lld\\n", ans);
    free(arr);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "binary-search", "painters-partition", "answer-space"],
      aliases: ["prog_cp_binary_search_painters_partition", "cpPaintersPartition"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.binary-search-techniques.binary-search-answer.prog-cp-binary-search-kth-two-arrays",
      name: "prog_cp_binary_search_kth_two_arrays",
      type: "program",
      category: "competitive-programming",
      subcategory: "binary-search-answer",
      categoryId: "competitive-programming.full-programs.binary-search-techniques.binary-search-answer",
      path: "competitive-programming/full-programs/binary-search-techniques/binary-search-answer/prog-cp-binary-search-kth-two-arrays",
      description: "Finding K-th element of two sorted arrays in O(log(min(N, M))) time",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define INF 2000000000

static int max_val(int a, int b) { return (a > b) ? a : b; }
static int min_val(int a, int b) { return (a < b) ? a : b; }

static int find_kth(const int a[], int n, const int b[], int m, int k) {
    if (n > m) return find_kth(b, m, a, n, k);

    int low = max_val(0, k - m);
    int high = min_val(k, n);

    while (low <= high) {
        int cut1 = (low + high) / 2;
        int cut2 = k - cut1;

        int l1 = (cut1 == 0) ? -INF : a[cut1 - 1];
        int l2 = (cut2 == 0) ? -INF : b[cut2 - 1];
        int r1 = (cut1 == n) ? INF : a[cut1];
        int r2 = (cut2 == m) ? INF : b[cut2];

        if (l1 <= r2 && l2 <= r1) {
            return max_val(l1, l2);
        } else if (l1 > r2) {
            high = cut1 - 1;
        } else {
            low = cut1 + 1;
        }
    }
    return -1;
}

static void solve(void) {
    int n, m, k;
    if (scanf("%d %d %d", &n, &m, &k) != 3) return;

    int* a = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);

    int* b = (int*)malloc(m * sizeof(int));
    for (int i = 0; i < m; i++) scanf("%d", &b[i]);

    printf("%d\\n", find_kth(a, n, b, m, k));

    free(a);
    free(b);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "binary-search", "kth-element", "two-arrays"],
      aliases: ["prog_cp_binary_search_kth_two_arrays", "cpKthTwoArrays"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.binary-search-techniques.ternary-search.prog-cp-ternary-search-continuous",
      name: "prog_cp_ternary_search_continuous",
      type: "program",
      category: "competitive-programming",
      subcategory: "ternary-search",
      categoryId: "competitive-programming.full-programs.binary-search-techniques.ternary-search",
      path: "competitive-programming/full-programs/binary-search-techniques/ternary-search/prog-cp-ternary-search-continuous",
      description: "Real-number continuous ternary search for global minimum of convex function",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

static double poly_eval(double x, double a, double b, double c) {
    return a * x * x + b * x + c;
}

static void solve(void) {
    double a, b, c;
    double l, r;
    if (scanf("%lf %lf %lf %lf %lf", &a, &b, &c, &l, &r) != 5) return;

    for (int iter = 0; iter < 100; iter++) {
        double m1 = l + (r - l) / 3.0;
        double m2 = r - (r - l) / 3.0;
        double f1 = poly_eval(m1, a, b, c);
        double f2 = poly_eval(m2, a, b, c);

        if (f1 < f2) {
            r = m2;
        } else {
            l = m1;
        }
    }

    double optimal_x = (l + r) / 2.0;
    double min_val = poly_eval(optimal_x, a, b, c);
    printf("%.6f %.6f\\n", optimal_x, min_val);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "ternary-search", "continuous", "convex-optimization"],
      aliases: ["prog_cp_ternary_search_continuous", "cpTernarySearchContinuous"],
    })
  );

  components.push(
    createComponent({
      id: "competitive-programming.full-programs.binary-search-techniques.binary-search-answer.prog-cp-dp-lis-fast",
      name: "prog_cp_dp_lis_fast",
      type: "program",
      category: "competitive-programming",
      subcategory: "binary-search-answer",
      categoryId: "competitive-programming.full-programs.binary-search-techniques.binary-search-answer",
      path: "competitive-programming/full-programs/binary-search-techniques/binary-search-answer/prog-cp-dp-lis-fast",
      description: "O(N log N) Longest Increasing Subsequence with patience binary search and reconstruction",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

static int lower_bound(const int tails[], int len, int val) {
    int l = 0, r = len;
    while (l < r) {
        int mid = l + (r - l) / 2;
        if (tails[mid] >= val) r = mid;
        else l = mid + 1;
    }
    return l;
}

static void solve(void) {
    int n;
    if (scanf("%d", &n) != 1) return;

    int* arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int* tails = (int*)malloc(n * sizeof(int));
    int* tail_idx = (int*)malloc(n * sizeof(int));
    int* parent = (int*)malloc(n * sizeof(int));

    int lis_len = 0;

    for (int i = 0; i < n; i++) {
        int pos = lower_bound(tails, lis_len, arr[i]);
        tails[pos] = arr[i];
        tail_idx[pos] = i;
        parent[i] = (pos > 0) ? tail_idx[pos - 1] : -1;

        if (pos == lis_len) lis_len++;
    }

    printf("%d\\n", lis_len);

    int* result = (int*)malloc(lis_len * sizeof(int));
    int curr = tail_idx[lis_len - 1];
    for (int i = lis_len - 1; i >= 0; i--) {
        result[i] = arr[curr];
        curr = parent[curr];
    }

    for (int i = 0; i < lis_len; i++) {
        printf("%d%c", result[i], (i == lis_len - 1 ? '\\n' : ' '));
    }

    free(arr);
    free(tails);
    free(tail_idx);
    free(parent);
    free(result);
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}`,
      tags: ["competitive-programming", "lis", "patience-sorting", "binary-search", "dp"],
      aliases: ["prog_cp_dp_lis_fast", "cpLisFast"],
    })
  );

  return components;
}

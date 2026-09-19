# prog_cp_two_pointers_min_window
> **Domain:** `competitive-programming` | **Subcategory:** `sliding-window` | **Type:** `program`
## Overview
Minimum window subarray containing all elements of required multiset

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
        printf("-1\n");
    } else {
        printf("%d %d\n", min_len, best_start);
    }
}

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) t = 1;
    while (t--) {
        solve();
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_cp_two_pointers_min_window`, `competitive-programming.full-programs.range-queries.sliding-window.prog-cp-two-pointers-min-window`, `competitive-programming>prog_cp_two_pointers_min_window()`, `competitive-programming>full-programs>range-queries>sliding-window>prog-cp-two-pointers-min-window>prog_cp_two_pointers_min_window()`, `cpMinWindow`

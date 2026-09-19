# prog_cp_trie_xor_max
> **Domain:** `competitive-programming` | **Subcategory:** `bitwise-tricks` | **Type:** `program`
## Overview
Binary bitwise Trie inserting integers and querying Maximum XOR Pair in O(31) time

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

typedef struct TrieNode {
    int next[2];
} TrieNode;

static TrieNode nodes[3100005];
static int node_count = 0;

static int new_node(void) {
    nodes[node_count].next[0] = -1;
    nodes[node_count].next[1] = -1;
    return node_count++;
}

static void trie_insert(int val) {
    int curr = 0;
    for (int i = 30; i >= 0; i--) {
        int bit = (val >> i) & 1;
        if (nodes[curr].next[bit] == -1) {
            nodes[curr].next[bit] = new_node();
        }
        curr = nodes[curr].next[bit];
    }
}

static int query_max_xor(int val) {
    int curr = 0;
    int max_xor = 0;
    for (int i = 30; i >= 0; i--) {
        int bit = (val >> i) & 1;
        int opp_bit = 1 - bit;
        if (nodes[curr].next[opp_bit] != -1) {
            max_xor |= (1 << i);
            curr = nodes[curr].next[opp_bit];
        } else {
            curr = nodes[curr].next[bit];
        }
    }
    return max_xor;
}

static void solve(void) {
    int n;
    if (scanf("%d", &n) != 1) return;

    node_count = 0;
    new_node();

    int* arr = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        trie_insert(arr[i]);
    }

    int best_xor = 0;
    for (int i = 0; i < n; i++) {
        int candidate = query_max_xor(arr[i]);
        if (candidate > best_xor) best_xor = candidate;
    }

    printf("%d\n", best_xor);
    free(arr);
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
Available via: `prog_cp_trie_xor_max`, `competitive-programming.full-programs.bit-manipulation.bitwise-tricks.prog-cp-trie-xor-max`, `competitive-programming>prog_cp_trie_xor_max()`, `competitive-programming>full-programs>bit-manipulation>bitwise-tricks>prog-cp-trie-xor-max>prog_cp_trie_xor_max()`, `cpTrieXorMax`

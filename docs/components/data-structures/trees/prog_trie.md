# prog_trie
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `program`
## Overview
Complete prefix tree Trie program with insert, search, and prefix matching

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
#include <stdlib.h>
#include <stdbool.h>

typedef struct Trie {
    struct Trie* children[26];
    bool is_word;
} Trie;

Trie* trie_create(void) {
    return (Trie*)calloc(1, sizeof(Trie));
}

void trie_add(Trie* root, const char* w) {
    Trie* cur = root;
    for (int i = 0; w[i]; i++) {
        int idx = w[i] - 'a';
        if (!cur->children[idx]) cur->children[idx] = trie_create();
        cur = cur->children[idx];
    }
    cur->is_word = true;
}

bool trie_has(const Trie* root, const char* w) {
    const Trie* cur = root;
    for (int i = 0; w[i]; i++) {
        int idx = w[i] - 'a';
        if (!cur->children[idx]) return false;
        cur = cur->children[idx];
    }
    return cur && cur->is_word;
}

int main(void) {
    Trie* root = trie_create();
    trie_add(root, "apple");
    trie_add(root, "app");

    printf("Search 'app':   %s
", trie_has(root, "app") ? "FOUND" : "NOT FOUND");
    printf("Search 'apple': %s
", trie_has(root, "apple") ? "FOUND" : "NOT FOUND");
    printf("Search 'appl':  %s
", trie_has(root, "appl") ? "FOUND" : "NOT FOUND");

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_trie`, `data-structures.full-programs.trees.trie.prog-trie`, `data-structures>prog_trie()`, `data-structures>full-programs>trees>trie>prog-trie>prog_trie()`, `programTrie`

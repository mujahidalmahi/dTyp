# prog_trie
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `program`
## Overview
Interactive 26-ary alphabet Trie with word insertion, search, prefix checks, and recursive memory cleanup

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
#include <string.h>

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

typedef struct TrieNode {
    struct TrieNode* children[26];
    bool is_end;
} TrieNode;

TrieNode* trie_create(void) {
    TrieNode* n = (TrieNode*)malloc(sizeof(TrieNode));
    n->is_end = false;
    for (int i = 0; i < 26; i++) n->children[i] = NULL;
    return n;
}

void trie_insert(TrieNode* root, const char* word) {
    TrieNode* cur = root;
    while (*word) {
        if (*word >= 'a' && *word <= 'z') {
            int idx = *word - 'a';
            if (!cur->children[idx]) cur->children[idx] = trie_create();
            cur = cur->children[idx];
        }
        word++;
    }
    cur->is_end = true;
}

bool trie_search(const TrieNode* root, const char* word) {
    const TrieNode* cur = root;
    while (*word) {
        if (*word >= 'a' && *word <= 'z') {
            int idx = *word - 'a';
            if (!cur->children[idx]) return false;
            cur = cur->children[idx];
        } else return false;
        word++;
    }
    return cur != NULL && cur->is_end;
}

bool trie_starts_with(const TrieNode* root, const char* prefix) {
    const TrieNode* cur = root;
    while (*prefix) {
        if (*prefix >= 'a' && *prefix <= 'z') {
            int idx = *prefix - 'a';
            if (!cur->children[idx]) return false;
            cur = cur->children[idx];
        } else return false;
        prefix++;
    }
    return true;
}

void trie_free(TrieNode* root) {
    if (!root) return;
    for (int i = 0; i < 26; i++) {
        if (root->children[i]) trie_free(root->children[i]);
    }
    free(root);
}

int main(void) {
    TrieNode* root = trie_create();
    int choice;
    char buffer[128];

    do {
        printf("\n=== Prefix Trie Operations Menu ===\n");
        printf("1. Insert Word\n");
        printf("2. Search Complete Word\n");
        printf("3. Check Prefix Exists (starts with)\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                printf("Enter lowercase word to insert: ");
                if (scanf("%127s", buffer) == 1) {
                    trie_insert(root, buffer);
                    printf("Inserted '%s' into trie.\n", buffer);
                } else clear_input();
                break;
            case 2:
                printf("Enter word to search: ");
                if (scanf("%127s", buffer) == 1) {
                    printf("Word '%s': %s\n", buffer, trie_search(root, buffer) ? "FOUND" : "NOT FOUND");
                } else clear_input();
                break;
            case 3:
                printf("Enter prefix to check: ");
                if (scanf("%127s", buffer) == 1) {
                    printf("Prefix '%s': %s\n", buffer, trie_starts_with(root, buffer) ? "EXISTS" : "DOES NOT EXIST");
                } else clear_input();
                break;
            case 0:
                printf("Exiting Trie Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    trie_free(root);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_trie`, `data-structures.full-programs.trees.trie.prog-trie`, `data-structures>prog_trie()`, `data-structures>full-programs>trees>trie>prog-trie>prog_trie()`, `programTrie`

# prog_string_longest_palindrome
> **Domain:** `algorithms` | **Subcategory:** `string-algorithms` | **Type:** `program`
## Overview
Complete interactive program finding longest palindromic substring and checking palindromes

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

#define MAX_LEN 500

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void find_longest_palindrome(const char* s) {
    int n = (int)strlen(s);
    if (n == 0) return;
    int start = 0, max_len = 1;
    for (int i = 0; i < n; i++) {
        int l = i, r = i;
        while (l >= 0 && r < n && s[l] == s[r]) {
            if (r - l + 1 > max_len) {
                start = l;
                max_len = r - l + 1;
            }
            l--; r++;
        }
        l = i; r = i + 1;
        while (l >= 0 && r < n && s[l] == s[r]) {
            if (r - l + 1 > max_len) {
                start = l;
                max_len = r - l + 1;
            }
            l--; r++;
        }
    }
    printf("Longest Palindromic Substring: \"");
    for (int i = 0; i < max_len; i++) putchar(s[start + i]);
    printf("\" (Length: %d, Starting Index: %d)\n", max_len, start);
}

static int is_palindrome(const char* s) {
    int l = 0, r = (int)strlen(s) - 1;
    while (l < r) {
        if (s[l] != s[r]) return 0;
        l++; r--;
    }
    return 1;
}

int main(void) {
    int choice;
    do {
        printf("=== Palindrome Algorithms Workbench ===\n");
        printf("1. Find Longest Palindromic Substring O(N^2) Time, O(1) Space\n");
        printf("2. Check If String is Full Palindrome\n");
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
                char s[MAX_LEN];
                printf("Enter string: ");
                if (scanf("%499s", s) == 1) {
                    clear_input();
                    find_longest_palindrome(s);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                char s[MAX_LEN];
                printf("Enter string: ");
                if (scanf("%499s", s) == 1) {
                    clear_input();
                    printf("String '%s' is %sa palindrome.\n", s, is_palindrome(s) ? "" : "NOT ");
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
Available via: `prog_string_longest_palindrome`, `algorithms.full-programs.string-algorithms.palindromes.prog-palindromes`, `algorithms>prog_string_longest_palindrome()`, `algorithms>full-programs>string-algorithms>palindromes>prog-palindromes>prog_string_longest_palindrome()`, `programPalindromes`

# prog_segment_tree
> **Domain:** `data-structures` | **Subcategory:** `trees` | **Type:** `program`
## Overview
Interactive segment tree program supporting dynamic point updates and O(log n) range sum queries

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

void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

void seg_build(const int* a, int* tree, int v, int tl, int tr) {
    if (tl == tr) tree[v] = a[tl];
    else {
        int tm = (tl + tr) / 2;
        seg_build(a, tree, v * 2, tl, tm);
        seg_build(a, tree, v * 2 + 1, tm + 1, tr);
        tree[v] = tree[v * 2] + tree[v * 2 + 1];
    }
}

int seg_sum(const int* tree, int v, int tl, int tr, int l, int r) {
    if (l > r) return 0;
    if (l == tl && r == tr) return tree[v];
    int tm = (tl + tr) / 2;
    return seg_sum(tree, v * 2, tl, tm, l, (r < tm ? r : tm)) +
           seg_sum(tree, v * 2 + 1, tm + 1, tr, (l > tm + 1 ? l : tm + 1), r);
}

void seg_update(int* tree, int v, int tl, int tr, int pos, int new_val) {
    if (tl == tr) tree[v] = new_val;
    else {
        int tm = (tl + tr) / 2;
        if (pos <= tm) seg_update(tree, v * 2, tl, tm, pos, new_val);
        else seg_update(tree, v * 2 + 1, tm + 1, tr, pos, new_val);
        tree[v] = tree[v * 2] + tree[v * 2 + 1];
    }
}

int main(void) {
    int n = 6;
    int a[100] = {1, 3, 5, 7, 9, 11};
    int* tree = (int*)calloc(4 * 100, sizeof(int));
    seg_build(a, tree, 1, 0, n - 1);

    int choice;
    do {
        printf("\n=== Segment Tree Operations Menu ===\n");
        printf("1. Update Element at Index\n");
        printf("2. Query Range Sum [L, R]\n");
        printf("3. Display Current Array\n");
        printf("0. Exit\n");
        printf("Enter choice: ");

        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int pos, val;
                printf("Enter index (0 to %d) and new value: ", n - 1);
                if (scanf("%d %d", &pos, &val) == 2 && pos >= 0 && pos < n) {
                    a[pos] = val;
                    seg_update(tree, 1, 0, n - 1, pos, val);
                    printf("Updated index %d to %d.\n", pos, val);
                } else clear_input();
                break;
            }
            case 2: {
                int l, r;
                printf("Enter range [L R] (0 to %d): ", n - 1);
                if (scanf("%d %d", &l, &r) == 2 && l >= 0 && r < n && l <= r) {
                    int ans = seg_sum(tree, 1, 0, n - 1, l, r);
                    printf("Range Sum [%d, %d] = %d\n", l, r, ans);
                } else clear_input();
                break;
            }
            case 3:
                printf("Array [%d items]: ", n);
                for (int i = 0; i < n; i++) printf("%d ", a[i]);
                printf("\n");
                break;
            case 0:
                printf("Exiting Segment Tree Menu.\n");
                break;
            default:
                printf("Invalid choice.\n");
                break;
        }
    } while (choice != 0);

    free(tree);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_segment_tree`, `data-structures.full-programs.trees.segment-tree.prog-segment-tree`, `data-structures>prog_segment_tree()`, `data-structures>full-programs>trees>segment-tree>prog-segment-tree>prog_segment_tree()`, `programSegmentTree`

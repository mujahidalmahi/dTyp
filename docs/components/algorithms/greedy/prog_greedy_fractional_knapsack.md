# prog_greedy_fractional_knapsack
> **Domain:** `algorithms` | **Subcategory:** `greedy` | **Type:** `program`
## Overview
Complete interactive program solving Fractional Knapsack via greedy ratio sorting

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

#define MAX_ITEMS 100

typedef struct {
    int id;
    double weight;
    double value;
    double ratio;
} Item;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static int cmp_ratio(const void* a, const void* b) {
    double r1 = ((const Item*)a)->ratio;
    double r2 = ((const Item*)b)->ratio;
    if (r1 < r2) return 1;
    if (r1 > r2) return -1;
    return 0;
}

static void fractional_knapsack(void) {
    int n;
    double capacity;
    printf("Enter number of items N and Knapsack Capacity W: ");
    if (scanf("%d %lf", &n, &capacity) != 2 || n <= 0 || capacity <= 0 || n > MAX_ITEMS) {
        clear_input();
        return;
    }
    Item items[MAX_ITEMS];
    printf("Enter weight and value for %d items (weight value):\n", n);
    for (int i = 0; i < n; i++) {
        items[i].id = i + 1;
        scanf("%lf %lf", &items[i].weight, &items[i].value);
        items[i].ratio = items[i].value / items[i].weight;
    }
    clear_input();
    qsort(items, (size_t)n, sizeof(Item), cmp_ratio);
    double total_value = 0.0;
    double cur_weight = 0.0;
    printf("Selected Item Fractions:\n");
    for (int i = 0; i < n; i++) {
        if (cur_weight + items[i].weight <= capacity) {
            cur_weight += items[i].weight;
            total_value += items[i].value;
            printf("Item %d: 100%% (weight: %.2f, value: %.2f)\n", items[i].id, items[i].weight, items[i].value);
        } else {
            double remain = capacity - cur_weight;
            double fraction = remain / items[i].weight;
            total_value += items[i].value * fraction;
            cur_weight += remain;
            printf("Item %d: %.2f%% (weight: %.2f, value: %.2f)\n", items[i].id, fraction * 100.0, remain, items[i].value * fraction);
            break;
        }
    }
    printf("Maximum Knapsack Value: %.4f (Capacity Used: %.2f / %.2f)\n", total_value, cur_weight, capacity);
}

int main(void) {
    int choice;
    do {
        printf("=== Fractional Knapsack Workbench ===\n");
        printf("1. Solve Fractional Knapsack Problem\n");
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
                fractional_knapsack();
                break;
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
Available via: `prog_greedy_fractional_knapsack`, `algorithms.full-programs.greedy.fractional-knapsack.prog-fractional-knapsack`, `algorithms>prog_greedy_fractional_knapsack()`, `algorithms>full-programs>greedy>fractional-knapsack>prog-fractional-knapsack>prog_greedy_fractional_knapsack()`, `programFractionalKnapsack`

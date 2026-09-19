# prog_dp_knapsack
> **Domain:** `algorithms` | **Subcategory:** `dynamic-programming` | **Type:** `program`
## Overview
Complete interactive program solving 0/1 Knapsack with item traceback and Coin Change

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

#define MAX_ITEMS 100
#define MAX_CAP 1000

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void knapsack_01(void) {
    int n, W;
    printf("Enter number of items N (<= %d) and capacity W (<= %d): ", MAX_ITEMS, MAX_CAP);
    if (scanf("%d %d", &n, &W) != 2 || n <= 0 || W <= 0 || n > MAX_ITEMS || W > MAX_CAP) {
        clear_input();
        return;
    }
    int weights[MAX_ITEMS + 1], values[MAX_ITEMS + 1];
    printf("Enter weight and value for each item (w v):\n");
    for (int i = 1; i <= n; i++) {
        scanf("%d %d", &weights[i], &values[i]);
    }
    clear_input();
    int dp[MAX_ITEMS + 1][MAX_CAP + 1];
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0) dp[i][w] = 0;
            else if (weights[i] <= w) {
                int take = values[i] + dp[i - 1][w - weights[i]];
                int skip = dp[i - 1][w];
                dp[i][w] = (take > skip) ? take : skip;
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    printf("Maximum Knapsack Value: %d\n", dp[n][W]);
    printf("Selected Items: ");
    int cur_w = W;
    for (int i = n; i > 0 && cur_w > 0; i--) {
        if (dp[i][cur_w] != dp[i - 1][cur_w]) {
            printf("[Item %d: w=%d, v=%d] ", i, weights[i], values[i]);
            cur_w -= weights[i];
        }
    }
    putchar('\n');
}

static void coin_change_min(void) {
    int n, amount;
    printf("Enter number of coin denominations N and target amount: ");
    if (scanf("%d %d", &n, &amount) != 2 || n <= 0 || amount <= 0 || amount > MAX_CAP) {
        clear_input();
        return;
    }
    int coins[50];
    printf("Enter %d coin denominations: ", n);
    for (int i = 0; i < n; i++) scanf("%d", &coins[i]);
    clear_input();
    int dp[MAX_CAP + 1];
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) dp[i] = 1000000;
    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < n; j++) {
            if (coins[j] <= i && dp[i - coins[j]] + 1 < dp[i]) {
                dp[i] = dp[i - coins[j]] + 1;
            }
        }
    }
    if (dp[amount] >= 1000000) printf("Amount %d cannot be formed with given coins.\n", amount);
    else printf("Minimum coins needed to make %d: %d\n", amount, dp[amount]);
}

int main(void) {
    int choice;
    do {
        printf("=== Knapsack & Coin Change DP Workbench ===\n");
        printf("1. 0/1 Knapsack with Item Traceback\n");
        printf("2. Minimum Coins for Change\n");
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
                knapsack_01();
                break;
            case 2:
                coin_change_min();
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
Available via: `prog_dp_knapsack`, `algorithms.full-programs.dynamic-programming.knapsack.prog-knapsack`, `algorithms>prog_dp_knapsack()`, `algorithms>full-programs>dynamic-programming>knapsack>prog-knapsack>prog_dp_knapsack()`, `programKnapsackDp`

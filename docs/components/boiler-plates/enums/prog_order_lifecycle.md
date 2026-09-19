# prog_order_lifecycle
> **Domain:** `boiler-plates` | **Subcategory:** `enums` | **Type:** `program`
## Overview
Interactive e-commerce order state transition validator using enumerations

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

typedef enum {
    ORDER_PENDING = 0,
    ORDER_PAID,
    ORDER_PROCESSING,
    ORDER_SHIPPED,
    ORDER_DELIVERED,
    ORDER_CANCELLED
} OrderState;

static const char* order_state_name(OrderState s) {
    switch (s) {
        case ORDER_PENDING:    return "PENDING";
        case ORDER_PAID:       return "PAID";
        case ORDER_PROCESSING: return "PROCESSING";
        case ORDER_SHIPPED:    return "SHIPPED";
        case ORDER_DELIVERED:  return "DELIVERED";
        case ORDER_CANCELLED:  return "CANCELLED";
        default:               return "UNKNOWN";
    }
}

static int is_valid_transition(OrderState from, OrderState to) {
    if (from == ORDER_CANCELLED || from == ORDER_DELIVERED) return 0;
    if (to == ORDER_CANCELLED) return (from == ORDER_PENDING || from == ORDER_PAID);
    if (from == ORDER_PENDING && to == ORDER_PAID) return 1;
    if (from == ORDER_PAID && to == ORDER_PROCESSING) return 1;
    if (from == ORDER_PROCESSING && to == ORDER_SHIPPED) return 1;
    if (from == ORDER_SHIPPED && to == ORDER_DELIVERED) return 1;
    return 0;
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    OrderState current = ORDER_PENDING;
    int choice;

    do {
        printf("\n=== ORDER LIFECYCLE STATE TRANSITIONS ===\n");
        printf("Current Order Status: [%s]\n", order_state_name(current));
        printf("1. Transition to Next Lifecycle Step\n");
        printf("2. Request Order Cancellation\n");
        printf("3. Reset to PENDING\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            OrderState next = (OrderState)((int)current + 1);
            if (is_valid_transition(current, next)) {
                printf("Transition SUCCESS: %s -> %s\n",
                       order_state_name(current), order_state_name(next));
                current = next;
            } else {
                printf("Transition REJECTED: Cannot transition from %s to %s!\n",
                       order_state_name(current), order_state_name(next));
            }
        } else if (choice == 2) {
            if (is_valid_transition(current, ORDER_CANCELLED)) {
                printf("Cancellation APPROVED. Order is now CANCELLED.\n");
                current = ORDER_CANCELLED;
            } else {
                printf("Cancellation REJECTED: Order in %s status cannot be cancelled.\n",
                       order_state_name(current));
            }
        } else if (choice == 3) {
            current = ORDER_PENDING;
            printf("Order reset to PENDING.\n");
        }
        clear_input();
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_order_lifecycle`, `boiler-plates.full-programs.enums.prog-order-lifecycle`, `boiler-plates>prog_order_lifecycle()`, `boiler-plates>full-programs>enums>prog-order-lifecycle>prog_order_lifecycle()`, `orderLifecycleProgram`

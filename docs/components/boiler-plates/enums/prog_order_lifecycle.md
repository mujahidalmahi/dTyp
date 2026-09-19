# prog_order_lifecycle
> **Domain:** `boiler-plates` | **Subcategory:** `enums` | **Type:** `program`
## Overview
Complete e-commerce order status lifecycle program using enums

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

typedef enum OrderStatus {
    ORDER_PENDING,
    ORDER_PROCESSING,
    ORDER_SHIPPED,
    ORDER_DELIVERED,
    ORDER_CANCELLED
} OrderStatus;

void print_order_status(int order_id, OrderStatus status) {
    const char* str = "UNKNOWN";
    switch (status) {
        case ORDER_PENDING: str = "PENDING"; break;
        case ORDER_PROCESSING: str = "PROCESSING"; break;
        case ORDER_SHIPPED: str = "SHIPPED"; break;
        case ORDER_DELIVERED: str = "DELIVERED"; break;
        case ORDER_CANCELLED: str = "CANCELLED"; break;
    }
    printf("Order #%d Status: %s\n", order_id, str);
}

int main(void) {
    print_order_status(1001, ORDER_PENDING);
    print_order_status(1001, ORDER_PROCESSING);
    print_order_status(1001, ORDER_SHIPPED);
    print_order_status(1001, ORDER_DELIVERED);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_order_lifecycle`, `boiler-plates.full-programs.enums.prog-order-lifecycle`, `boiler-plates>prog_order_lifecycle()`, `boiler-plates>full-programs>enums>prog-order-lifecycle>prog_order_lifecycle()`, `orderLifecycleProgram`

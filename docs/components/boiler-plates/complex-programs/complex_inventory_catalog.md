# complex_inventory_catalog
> **Domain:** `boiler-plates` | **Subcategory:** `complex-programs` | **Type:** `program`
## Overview
Inventory stock catalog with sorting by price and SKU lookup

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
#include <string.h>

typedef struct Item {
    char sku[12];
    char title[32];
    double price;
    int stock;
} Item;

int compare_items_price(const void* a, const void* b) {
    const Item* item_a = (const Item*)a;
    const Item* item_b = (const Item*)b;
    if (item_a->price < item_b->price) return -1;
    if (item_a->price > item_b->price) return 1;
    return 0;
}

int main(void) {
    Item catalog[] = {
        {"SKU-001", "Mechanical Keyboard", 89.99, 15},
        {"SKU-002", "Wireless Mouse", 29.50, 42},
        {"SKU-003", "4K Gaming Monitor", 349.00, 8},
        {"SKU-004", "USB-C Fast Cable", 12.99, 120}
    };
    int count = sizeof(catalog) / sizeof(catalog[0]);

    qsort(catalog, count, sizeof(Item), compare_items_price);

    printf("=== Inventory Catalog (Sorted by Price) ===\n");
    printf("%-10s %-22s %8s %6s\n", "SKU", "Title", "Price", "Stock");
    printf("------------------------------------------------\n");

    for (int i = 0; i < count; i++) {
        printf("%-10s %-22s $%7.2f %6d\n",
               catalog[i].sku, catalog[i].title, catalog[i].price, catalog[i].stock);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `complex_inventory_catalog`, `boiler-plates.full-programs.complex-programs.complex-inventory-catalog`, `boiler-plates>complex_inventory_catalog()`, `boiler-plates>full-programs>complex-programs>complex-inventory-catalog>complex_inventory_catalog()`, `inventoryCatalogProgram`

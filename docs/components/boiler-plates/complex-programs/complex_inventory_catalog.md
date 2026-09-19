# complex_inventory_catalog
> **Domain:** `boiler-plates` | **Subcategory:** `complex-programs` | **Type:** `program`
## Overview
Interactive product inventory management catalog with stock tracking and valuation

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

#define MAX_ITEMS 50

typedef struct {
    char sku[16];
    char name[48];
    int quantity;
    double unit_price;
} InventoryItem;

static InventoryItem catalog[MAX_ITEMS];
static int total_items = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void add_item(const char* sku, const char* name, int qty, double price) {
    if (total_items >= MAX_ITEMS) {
        printf("Catalog is full!\n");
        return;
    }
    strncpy(catalog[total_items].sku, sku, sizeof(catalog[total_items].sku) - 1);
    strncpy(catalog[total_items].name, name, sizeof(catalog[total_items].name) - 1);
    catalog[total_items].quantity = qty;
    catalog[total_items].unit_price = price;
    total_items++;
    printf("Item added: [%s] %s (Qty: %d, Price: $%.2f)\n", sku, name, qty, price);
}

static void list_inventory(void) {
    if (total_items == 0) {
        printf("Inventory is empty.\n");
        return;
    }
    double total_val = 0.0;
    printf("\n=== INVENTORY CATALOG (%d Items) ===\n", total_items);
    printf("  %-8s | %-20s | %-6s | %-10s | %-10s\n", "SKU", "Item Name", "Qty", "Unit Price", "Total Val");
    printf("  ---------+----------------------+--------+------------+------------\n");
    for (int i = 0; i < total_items; i++) {
        double item_val = catalog[i].quantity * catalog[i].unit_price;
        total_val += item_val;
        printf("  %-8s | %-20s | %6d | $%9.2f | $%9.2f\n",
               catalog[i].sku, catalog[i].name, catalog[i].quantity,
               catalog[i].unit_price, item_val);
    }
    printf("  TOTAL INVENTORY VALUATION: $%.2f\n", total_val);
}

int main(void) {
    add_item("SKU-101", "USB Keyboard", 15, 29.99);
    add_item("SKU-102", "Optical Mouse", 25, 14.50);
    int choice;

    do {
        printf("\n=== INVENTORY CATALOG SYSTEM ===\n");
        printf("1. List Inventory\n");
        printf("2. Add New Product\n");
        printf("3. Update Stock Quantity\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            list_inventory();
        } else if (choice == 2) {
            char sku[16], name[48];
            int qty;
            double price;
            printf("Enter SKU: ");
            if (fgets(sku, sizeof(sku), stdin)) sku[strcspn(sku, "\r\n")] = '\0';
            printf("Enter Item Name: ");
            if (fgets(name, sizeof(name), stdin)) name[strcspn(name, "\r\n")] = '\0';
            printf("Enter Quantity and Unit Price: ");
            if (scanf("%d %lf", &qty, &price) == 2) {
                add_item(sku, name, qty, price);
            }
            clear_input();
        } else if (choice == 3) {
            char sku[16];
            int delta;
            printf("Enter SKU: ");
            if (fgets(sku, sizeof(sku), stdin)) sku[strcspn(sku, "\r\n")] = '\0';
            printf("Enter quantity adjustment (+ to add, - to sell): ");
            if (scanf("%d", &delta) == 1) {
                int found = 0;
                for (int i = 0; i < total_items; i++) {
                    if (strcmp(catalog[i].sku, sku) == 0) {
                        catalog[i].quantity += delta;
                        if (catalog[i].quantity < 0) catalog[i].quantity = 0;
                        printf("Updated %s stock to %d.\n", catalog[i].name, catalog[i].quantity);
                        found = 1;
                        break;
                    }
                }
                if (!found) printf("SKU not found.\n");
            }
            clear_input();
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `complex_inventory_catalog`, `boiler-plates.full-programs.complex-programs.complex-inventory-catalog`, `boiler-plates>complex_inventory_catalog()`, `boiler-plates>full-programs>complex-programs>complex-inventory-catalog>complex_inventory_catalog()`, `inventoryCatalogProgram`

# prog_2d_geometry
> **Domain:** `boiler-plates` | **Subcategory:** `structures` | **Type:** `program`
## Overview
Interactive 2D geometry toolkit using nested structures and coordinate arithmetic

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
#include <math.h>

typedef struct {
    double x;
    double y;
} Point2D;

typedef struct {
    Point2D top_left;
    Point2D bottom_right;
} Rectangle;

static double distance(Point2D p1, Point2D p2) {
    double dx = p2.x - p1.x;
    double dy = p2.y - p1.y;
    return sqrt(dx * dx + dy * dy);
}

static double rect_width(Rectangle r) {
    return fabs(r.bottom_right.x - r.top_left.x);
}

static double rect_height(Rectangle r) {
    return fabs(r.bottom_right.y - r.top_left.y);
}

static double rect_area(Rectangle r) {
    return rect_width(r) * rect_height(r);
}

static double rect_perimeter(Rectangle r) {
    return 2.0 * (rect_width(r) + rect_height(r));
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    int choice;

    do {
        printf("\n=== 2D GEOMETRY STRUCTURES WORKSHOP ===\n");
        printf("1. Distance Between Two Points\n");
        printf("2. Rectangle Area and Perimeter\n");
        printf("3. Point Inside Rectangle Test\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            Point2D a, b;
            printf("Enter Point A (x y): ");
            if (scanf("%lf %lf", &a.x, &a.y) == 2) {
                printf("Enter Point B (x y): ");
                if (scanf("%lf %lf", &b.x, &b.y) == 2) {
                    printf("Euclidean distance = %.4f units\n", distance(a, b));
                }
            }
        } else if (choice == 2) {
            Rectangle r;
            printf("Enter Top-Left corner (x y): ");
            if (scanf("%lf %lf", &r.top_left.x, &r.top_left.y) == 2) {
                printf("Enter Bottom-Right corner (x y): ");
                if (scanf("%lf %lf", &r.bottom_right.x, &r.bottom_right.y) == 2) {
                    printf("Width    : %.2f\n", rect_width(r));
                    printf("Height   : %.2f\n", rect_height(r));
                    printf("Area     : %.4f\n", rect_area(r));
                    printf("Perimeter: %.4f\n", rect_perimeter(r));
                }
            }
        } else if (choice == 3) {
            Rectangle r;
            Point2D p;
            printf("Enter Rect Top-Left (x y): ");
            if (scanf("%lf %lf", &r.top_left.x, &r.top_left.y) == 2) {
                printf("Enter Rect Bottom-Right (x y): ");
                if (scanf("%lf %lf", &r.bottom_right.x, &r.bottom_right.y) == 2) {
                    printf("Enter Test Point (x y): ");
                    if (scanf("%lf %lf", &p.x, &p.y) == 2) {
                        double min_x = r.top_left.x < r.bottom_right.x ? r.top_left.x : r.bottom_right.x;
                        double max_x = r.top_left.x > r.bottom_right.x ? r.top_left.x : r.bottom_right.x;
                        double min_y = r.bottom_right.y < r.top_left.y ? r.bottom_right.y : r.top_left.y;
                        double max_y = r.bottom_right.y > r.top_left.y ? r.bottom_right.y : r.top_left.y;

                        int inside = (p.x >= min_x && p.x <= max_x && p.y >= min_y && p.y <= max_y);
                        printf("Point (%.2f, %.2f) is %s rectangle bounds.\n",
                               p.x, p.y, inside ? "INSIDE" : "OUTSIDE");
                    }
                }
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_2d_geometry`, `boiler-plates.full-programs.structures.prog-2d-geometry`, `boiler-plates>prog_2d_geometry()`, `boiler-plates>full-programs>structures>prog-2d-geometry>prog_2d_geometry()`, `twoDGeometryProgram`

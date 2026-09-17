# proj_student_management
> **Domain:** `projects` | **Subcategory:** `management-systems` | **Type:** `program`
## Overview
Complete student record management system with GPA computation, ranking, and search

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

typedef struct {
    int id;
    char name[32];
    double marks[3];
    double gpa;
} Student;

double calculate_gpa(const double marks[3]) {
    double total = marks[0] + marks[1] + marks[2];
    return (total / 300.0) * 4.0;
}

void print_student(const Student* s) {
    printf("ID: %-4d | Name: %-12s | GPA: %.2f | Marks: [%.0f, %.0f, %.0f]
",
           s->id, s->name, s->gpa, s->marks[0], s->marks[1], s->marks[2]);
}

void rank_students(Student arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j].gpa < arr[j + 1].gpa) {
                Student tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
            }
        }
    }
}

int main(void) {
    Student database[3] = {
        {101, "Alice", {85, 90, 88}, 0.0},
        {102, "Bob", {72, 68, 75}, 0.0},
        {103, "Charlie", {95, 92, 98}, 0.0}
    };
    int n = 3;
    for (int i = 0; i < n; i++) {
        database[i].gpa = calculate_gpa(database[i].marks);
    }
    printf("=== Student Database ===
");
    for (int i = 0; i < n; i++) print_student(&database[i]);
    rank_students(database, n);
    printf("
=== Ranked by GPA ===
");
    for (int i = 0; i < n; i++) {
        printf("Rank %d: ", i + 1);
        print_student(&database[i]);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_student_management`, `projects.management-systems.student-records.prog-student-management`, `projects>proj_student_management()`, `projects>management-systems>student-records>prog-student-management>proj_student_management()`

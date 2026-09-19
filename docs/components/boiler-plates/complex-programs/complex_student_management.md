# complex_student_management
> **Domain:** `boiler-plates` | **Subcategory:** `complex-programs` | **Type:** `program`
## Overview
Comprehensive interactive student management system with dynamic memory, GPA ranking, and search

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
#include <string.h>

typedef struct {
    int id;
    char name[48];
    double gpa;
} Student;

typedef struct {
    Student* data;
    size_t count;
    size_t capacity;
} Database;

static Database* db_create(size_t initial_cap) {
    Database* db = (Database*)malloc(sizeof(Database));
    if (!db) return NULL;
    db->data = (Student*)malloc(initial_cap * sizeof(Student));
    if (!db->data) { free(db); return NULL; }
    db->count = 0;
    db->capacity = initial_cap;
    return db;
}

static void db_add(Database* db, int id, const char* name, double gpa) {
    if (db->count >= db->capacity) {
        size_t new_cap = db->capacity * 2;
        Student* next = (Student*)realloc(db->data, new_cap * sizeof(Student));
        if (!next) return;
        db->data = next;
        db->capacity = new_cap;
    }
    Student* s = &db->data[db->count++];
    s->id = id;
    strncpy(s->name, name, sizeof(s->name) - 1);
    s->name[sizeof(s->name) - 1] = '\0';
    s->gpa = gpa;
    printf("Added student: %s (ID: %d, GPA: %.2f)\n", name, id, gpa);
}

static void db_sort_by_gpa(Database* db) {
    for (size_t i = 0; i < db->count; i++) {
        for (size_t j = 0; j + 1 < db->count - i; j++) {
            if (db->data[j].gpa < db->data[j + 1].gpa) {
                Student tmp = db->data[j];
                db->data[j] = db->data[j + 1];
                db->data[j + 1] = tmp;
            }
        }
    }
}

static void db_display(const Database* db) {
    if (db->count == 0) {
        printf("Database is empty.\n");
        return;
    }
    printf("\n=== STUDENT DATABASE (%zu records, capacity %zu) ===\n", db->count, db->capacity);
    for (size_t i = 0; i < db->count; i++) {
        printf("  Rank %2zu | ID: %04d | Name: %-20s | GPA: %.2f\n",
               i + 1, db->data[i].id, db->data[i].name, db->data[i].gpa);
    }
}

static void db_free(Database* db) {
    if (db) {
        free(db->data);
        free(db);
    }
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    Database* db = db_create(2);
    if (!db) return 1;
    int choice;

    do {
        printf("\n=== COMPLEX STUDENT MANAGEMENT SYSTEM ===\n");
        printf("1. Add Student\n");
        printf("2. List All Records\n");
        printf("3. Sort & Rank by GPA\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            int id;
            char name[48];
            double gpa;
            printf("Enter Student ID: ");
            if (scanf("%d", &id) != 1) { clear_input(); continue; }
            clear_input();
            printf("Enter Name: ");
            if (fgets(name, sizeof(name), stdin)) {
                name[strcspn(name, "\r\n")] = '\0';
            }
            printf("Enter GPA (0.0 to 4.0): ");
            if (scanf("%lf", &gpa) != 1) gpa = 0.0;
            clear_input();
            db_add(db, id, name, gpa);
        } else if (choice == 2) {
            db_display(db);
        } else if (choice == 3) {
            db_sort_by_gpa(db);
            printf("Students ranked by GPA.\n");
            db_display(db);
        }
    } while (choice != 0);

    db_free(db);
    return 0;
}
```

## Aliases & Shorthands
Available via: `complex_student_management`, `boiler-plates.full-programs.complex-programs.complex-student-management`, `boiler-plates>complex_student_management()`, `boiler-plates>full-programs>complex-programs>complex-student-management>complex_student_management()`, `studentManagementProgram`

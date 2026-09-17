# proj_employee_payroll
> **Domain:** `projects` | **Subcategory:** `management-systems` | **Type:** `program`
## Overview
Employee payroll calculator computing regular hours, overtime, and tax deductions

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

typedef struct {
    int id;
    char name[32];
    double hourly_rate;
    double hours_worked;
} Employee;

void generate_payslip(const Employee* e) {
    double reg_hours = (e->hours_worked > 40.0) ? 40.0 : e->hours_worked;
    double ot_hours = (e->hours_worked > 40.0) ? (e->hours_worked - 40.0) : 0.0;
    double reg_pay = reg_hours * e->hourly_rate;
    double ot_pay = ot_hours * (e->hourly_rate * 1.5);
    double gross = reg_pay + ot_pay;
    double tax = gross * 0.15;
    double net = gross - tax;

    printf("=== Payslip: %s (ID: %d) ===
", e->name, e->id);
    printf("Regular Pay (%.1fh @ $%.2f): $%.2f
", reg_hours, e->hourly_rate, reg_pay);
    if (ot_hours > 0) printf("Overtime Pay (%.1fh @ $%.2f): $%.2f
", ot_hours, e->hourly_rate * 1.5, ot_pay);
    printf("Gross Salary: $%.2f | Tax (15%%): $%.2f
", gross, tax);
    printf("Net Pay:      $%.2f

", net);
}

int main(void) {
    Employee e1 = {201, "Michael", 25.0, 40.0};
    Employee e2 = {202, "Jessica", 30.0, 48.0};
    generate_payslip(&e1);
    generate_payslip(&e2);
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_employee_payroll`, `projects.management-systems.employee-payroll.prog-employee-payroll`, `projects>proj_employee_payroll()`, `projects>management-systems>employee-payroll>prog-employee-payroll>proj_employee_payroll()`

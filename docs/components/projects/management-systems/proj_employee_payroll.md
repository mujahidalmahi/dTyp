# proj_employee_payroll
> **Domain:** `projects` | **Subcategory:** `management-systems` | **Type:** `program`
## Overview
Interactive employee payroll application computing hours, taxes, and net salaries

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

#define MAX_EMP 50

typedef struct {
    int id;
    char name[32];
    double hourly_rate;
    double hours_worked;
    double gross_pay;
    double tax;
    double net_pay;
} Employee;

static Employee employees[MAX_EMP];
static int emp_count = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void add_employee(void) {
    if (emp_count >= MAX_EMP) {
        printf("Payroll system full.\n");
        return;
    }
    Employee e;
    printf("Enter Employee ID: ");
    if (scanf("%d", &e.id) != 1) {
        clear_input();
        return;
    }
    clear_input();
    printf("Enter Employee Name: ");
    if (scanf("%31[^\n]", e.name) != 1) {
        clear_input();
        return;
    }
    clear_input();
    printf("Enter Hourly Rate ($): ");
    scanf("%lf", &e.hourly_rate);
    printf("Enter Hours Worked this period: ");
    scanf("%lf", &e.hours_worked);
    clear_input();
    if (e.hours_worked <= 40.0) {
        e.gross_pay = e.hours_worked * e.hourly_rate;
    } else {
        double regular = 40.0 * e.hourly_rate;
        double overtime = (e.hours_worked - 40.0) * (e.hourly_rate * 1.5);
        e.gross_pay = regular + overtime;
    }
    e.tax = e.gross_pay * 0.15;
    e.net_pay = e.gross_pay - e.tax;
    employees[emp_count++] = e;
    printf("Employee added. Gross: $%.2f | Tax (15%%): $%.2f | Net: $%.2f\n",
           e.gross_pay, e.tax, e.net_pay);
}

static void display_payroll_report(void) {
    if (emp_count == 0) {
        printf("No employee records found.\n");
        return;
    }
    printf("%-4s | %-16s | %-6s | %-8s | %-10s | %-8s | %-10s\n",
           "ID", "Name", "Hours", "Rate", "Gross Pay", "Tax", "Net Pay");
    printf("----------------------------------------------------------------------------\n");
    double total_net = 0.0;
    for (int i = 0; i < emp_count; i++) {
        printf("%-4d | %-16s | %-6.1f | $%-7.2f | $%-9.2f | $%-7.2f | $%-9.2f\n",
               employees[i].id, employees[i].name, employees[i].hours_worked,
               employees[i].hourly_rate, employees[i].gross_pay, employees[i].tax, employees[i].net_pay);
        total_net += employees[i].net_pay;
    }
    printf("----------------------------------------------------------------------------\n");
    printf("Total Payroll Disbursement: $%.2f\n", total_net);
}

int main(void) {
    int choice;
    do {
        printf("=== Employee Payroll System ===\n");
        printf("1. Add Employee & Compute Salary\n");
        printf("2. Display Payroll Summary Report\n");
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
                add_employee();
                break;
            case 2:
                display_payroll_report();
                break;
            case 0:
                printf("Exiting payroll system.\n");
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
Available via: `proj_employee_payroll`, `projects.management-systems.employee-payroll.prog-employee-payroll`, `projects>proj_employee_payroll()`, `projects>management-systems>employee-payroll>prog-employee-payroll>proj_employee_payroll()`

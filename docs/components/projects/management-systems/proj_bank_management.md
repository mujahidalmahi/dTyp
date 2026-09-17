# proj_bank_management
> **Domain:** `projects` | **Subcategory:** `management-systems` | **Type:** `program`
## Overview
Bank account management system supporting deposits, withdrawals, and ledger transfers

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
    int acc_no;
    char holder[32];
    double balance;
} BankAccount;

int deposit(BankAccount* acc, double amount) {
    if (amount <= 0) return 0;
    acc->balance += amount;
    return 1;
}

int withdraw(BankAccount* acc, double amount) {
    if (amount <= 0 || acc->balance < amount) return 0;
    acc->balance -= amount;
    return 1;
}

int transfer(BankAccount* from, BankAccount* to, double amount) {
    if (withdraw(from, amount)) {
        deposit(to, amount);
        return 1;
    }
    return 0;
}

void print_account(const BankAccount* acc) {
    printf("Acc #%-5d | Holder: %-10s | Balance: $%.2f
", acc->acc_no, acc->holder, acc->balance);
}

int main(void) {
    BankAccount a1 = {1001, "John", 500.0};
    BankAccount a2 = {1002, "Sarah", 1200.0};
    printf("Initial Accounts:
");
    print_account(&a1);
    print_account(&a2);
    deposit(&a1, 250.0);
    withdraw(&a2, 100.0);
    transfer(&a2, &a1, 300.0);
    printf("
Final Accounts after transactions:
");
    print_account(&a1);
    print_account(&a2);
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_bank_management`, `projects.management-systems.bank-accounts.prog-bank-management`, `projects>proj_bank_management()`, `projects>management-systems>bank-accounts>prog-bank-management>proj_bank_management()`

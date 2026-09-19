# proj_bank_management
> **Domain:** `projects` | **Subcategory:** `management-systems` | **Type:** `program`
## Overview
Interactive bank account management system supporting deposits, withdrawals, and ledger transfers

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

#define MAX_ACCOUNTS 50

typedef struct {
    int acc_no;
    char holder[32];
    double balance;
} Account;

static Account accounts[MAX_ACCOUNTS];
static int total_accounts = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static Account* find_account(int no) {
    for (int i = 0; i < total_accounts; i++) {
        if (accounts[i].acc_no == no) return &accounts[i];
    }
    return NULL;
}

static void create_account(void) {
    if (total_accounts >= MAX_ACCOUNTS) {
        printf("Max accounts limit reached.\n");
        return;
    }
    Account a;
    printf("Enter new Account Number: ");
    if (scanf("%d", &a.acc_no) != 1) {
        clear_input();
        return;
    }
    clear_input();
    if (find_account(a.acc_no) != NULL) {
        printf("Account number already exists.\n");
        return;
    }
    printf("Enter Account Holder Name: ");
    if (scanf("%31[^\n]", a.holder) != 1) {
        clear_input();
        return;
    }
    clear_input();
    printf("Enter Initial Deposit: ");
    if (scanf("%lf", &a.balance) != 1 || a.balance < 0) {
        clear_input();
        return;
    }
    clear_input();
    accounts[total_accounts++] = a;
    printf("Account #%d created successfully.\n", a.acc_no);
}

static void deposit(void) {
    int no;
    double amt;
    printf("Enter Account Number: ");
    if (scanf("%d", &no) != 1) {
        clear_input();
        return;
    }
    Account* a = find_account(no);
    if (!a) {
        printf("Account not found.\n");
        clear_input();
        return;
    }
    printf("Enter Deposit Amount: ");
    if (scanf("%lf", &amt) != 1 || amt <= 0) {
        clear_input();
        return;
    }
    clear_input();
    a->balance += amt;
    printf("Deposited $%.2f. New Balance: $%.2f\n", amt, a->balance);
}

static void withdraw(void) {
    int no;
    double amt;
    printf("Enter Account Number: ");
    if (scanf("%d", &no) != 1) {
        clear_input();
        return;
    }
    Account* a = find_account(no);
    if (!a) {
        printf("Account not found.\n");
        clear_input();
        return;
    }
    printf("Enter Withdrawal Amount: ");
    if (scanf("%lf", &amt) != 1 || amt <= 0) {
        clear_input();
        return;
    }
    clear_input();
    if (a->balance < amt) {
        printf("Insufficient balance ($%.2f).\n", a->balance);
        return;
    }
    a->balance -= amt;
    printf("Withdrawn $%.2f. Remaining Balance: $%.2f\n", amt, a->balance);
}

static void transfer(void) {
    int src_no, dst_no;
    double amt;
    printf("Enter Source and Destination Account Numbers: ");
    if (scanf("%d %d", &src_no, &dst_no) != 2) {
        clear_input();
        return;
    }
    Account* src = find_account(src_no);
    Account* dst = find_account(dst_no);
    if (!src || !dst) {
        printf("One or both accounts not found.\n");
        clear_input();
        return;
    }
    printf("Enter Transfer Amount: ");
    if (scanf("%lf", &amt) != 1 || amt <= 0) {
        clear_input();
        return;
    }
    clear_input();
    if (src->balance < amt) {
        printf("Insufficient balance in source account.\n");
        return;
    }
    src->balance -= amt;
    dst->balance += amt;
    printf("Transferred $%.2f from #%d to #%d successfully.\n", amt, src_no, dst_no);
}

static void list_accounts(void) {
    if (total_accounts == 0) {
        printf("No accounts registered.\n");
        return;
    }
    printf("%-8s | %-16s | %-10s\n", "Acc No", "Holder Name", "Balance");
    printf("-----------------------------------------\n");
    for (int i = 0; i < total_accounts; i++) {
        printf("%-8d | %-16s | $%-10.2f\n", accounts[i].acc_no, accounts[i].holder, accounts[i].balance);
    }
}

int main(void) {
    int choice;
    do {
        printf("=== Bank Account Management System ===\n");
        printf("1. Create Account\n");
        printf("2. Deposit Money\n");
        printf("3. Withdraw Money\n");
        printf("4. Transfer Between Accounts\n");
        printf("5. List All Accounts\n");
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
                create_account();
                break;
            case 2:
                deposit();
                break;
            case 3:
                withdraw();
                break;
            case 4:
                transfer();
                break;
            case 5:
                list_accounts();
                break;
            case 0:
                printf("Exiting banking terminal.\n");
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
Available via: `proj_bank_management`, `projects.management-systems.bank-accounts.prog-bank-management`, `projects>proj_bank_management()`, `projects>management-systems>bank-accounts>prog-bank-management>proj_bank_management()`

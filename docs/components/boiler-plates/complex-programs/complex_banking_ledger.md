# complex_banking_ledger
> **Domain:** `boiler-plates` | **Subcategory:** `complex-programs` | **Type:** `program`
## Overview
Interactive double-entry bank account ledger with transaction audit trails

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

#define MAX_ACCOUNTS 20
#define MAX_TX_LOG   100

typedef struct {
    int acct_num;
    char holder[48];
    double balance;
} Account;

typedef struct {
    char desc[80];
    double amount;
} Transaction;

static Account accounts[MAX_ACCOUNTS];
static int total_accounts = 0;
static Transaction ledger[MAX_TX_LOG];
static int total_tx = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static Account* find_account(int num) {
    for (int i = 0; i < total_accounts; i++) {
        if (accounts[i].acct_num == num) return &accounts[i];
    }
    return NULL;
}

static void log_tx(const char* desc, double amt) {
    if (total_tx < MAX_TX_LOG) {
        strncpy(ledger[total_tx].desc, desc, sizeof(ledger[total_tx].desc) - 1);
        ledger[total_tx].desc[sizeof(ledger[total_tx].desc) - 1] = '\0';
        ledger[total_tx].amount = amt;
        total_tx++;
    }
}

int main(void) {
    int choice;

    do {
        printf("\n=== BANKING ACCOUNT LEDGER SYSTEM ===\n");
        printf("1. Create New Account\n");
        printf("2. Deposit Funds\n");
        printf("3. Withdraw Funds\n");
        printf("4. Transfer Funds\n");
        printf("5. View All Accounts\n");
        printf("6. View Transaction Audit Log\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            if (total_accounts >= MAX_ACCOUNTS) {
                printf("Max accounts limit reached!\n");
                continue;
            }
            int num;
            char holder[48];
            double init_bal;
            printf("Enter account number: ");
            if (scanf("%d", &num) != 1) { clear_input(); continue; }
            clear_input();
            printf("Enter account holder name: ");
            if (fgets(holder, sizeof(holder), stdin)) {
                holder[strcspn(holder, "\r\n")] = '\0';
            }
            printf("Enter initial deposit: ");
            if (scanf("%lf", &init_bal) != 1 || init_bal < 0.0) init_bal = 0.0;
            clear_input();

            accounts[total_accounts].acct_num = num;
            strncpy(accounts[total_accounts].holder, holder, sizeof(accounts[total_accounts].holder) - 1);
            accounts[total_accounts].balance = init_bal;
            total_accounts++;
            log_tx("Initial Account Open", init_bal);
            printf("Account #%d created for %s with $%.2f balance.\n", num, holder, init_bal);
        } else if (choice == 2) {
            int num;
            double amt;
            printf("Enter account number and deposit amount: ");
            if (scanf("%d %lf", &num, &amt) == 2 && amt > 0.0) {
                Account* a = find_account(num);
                if (a) {
                    a->balance += amt;
                    log_tx("Deposit", amt);
                    printf("Deposited $%.2f to #%d. New balance: $%.2f\n", amt, num, a->balance);
                } else printf("Account not found.\n");
            }
            clear_input();
        } else if (choice == 3) {
            int num;
            double amt;
            printf("Enter account number and withdrawal amount: ");
            if (scanf("%d %lf", &num, &amt) == 2 && amt > 0.0) {
                Account* a = find_account(num);
                if (a) {
                    if (a->balance >= amt) {
                        a->balance -= amt;
                        log_tx("Withdrawal", -amt);
                        printf("Withdrew $%.2f from #%d. New balance: $%.2f\n", amt, num, a->balance);
                    } else printf("Insufficient funds! Balance is $%.2f\n", a->balance);
                } else printf("Account not found.\n");
            }
            clear_input();
        } else if (choice == 4) {
            int src_num, dst_num;
            double amt;
            printf("Enter source acct, dest acct, and amount: ");
            if (scanf("%d %d %lf", &src_num, &dst_num, &amt) == 3 && amt > 0.0) {
                Account* src = find_account(src_num);
                Account* dst = find_account(dst_num);
                if (src && dst && src != dst) {
                    if (src->balance >= amt) {
                        src->balance -= amt;
                        dst->balance += amt;
                        log_tx("Transfer Out", -amt);
                        log_tx("Transfer In", amt);
                        printf("Transferred $%.2f from #%d to #%d successfully.\n", amt, src_num, dst_num);
                    } else printf("Insufficient funds in source account.\n");
                } else printf("Invalid account numbers.\n");
            }
            clear_input();
        } else if (choice == 5) {
            printf("\n=== REGISTERED ACCOUNTS (%d Total) ===\n", total_accounts);
            for (int i = 0; i < total_accounts; i++) {
                printf("  Acct #%05d | Holder: %-20s | Balance: $%.2f\n",
                       accounts[i].acct_num, accounts[i].holder, accounts[i].balance);
            }
        } else if (choice == 6) {
            printf("\n=== TRANSACTION AUDIT LOG (%d Entries) ===\n", total_tx);
            for (int i = 0; i < total_tx; i++) {
                printf("  Tx #%3d: %-24s | $%+.2f\n", i + 1, ledger[i].desc, ledger[i].amount);
            }
        }
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `complex_banking_ledger`, `boiler-plates.full-programs.complex-programs.complex-banking-ledger`, `boiler-plates>complex_banking_ledger()`, `boiler-plates>full-programs>complex-programs>complex-banking-ledger>complex_banking_ledger()`, `bankingLedgerProgram`

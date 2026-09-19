import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateBoilerPlateComplexPrograms(): Component[] {
  const components: Component[] = [];

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-student-management",
      name: "complex_student_management",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-student-management",
      description: "Comprehensive interactive student management system with dynamic memory, GPA ranking, and search",
      signature: "int main(void);",
      code: `#include <stdio.h>
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
    s->name[sizeof(s->name) - 1] = '\\0';
    s->gpa = gpa;
    printf("Added student: %s (ID: %d, GPA: %.2f)\\n", name, id, gpa);
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
        printf("Database is empty.\\n");
        return;
    }
    printf("\\n=== STUDENT DATABASE (%zu records, capacity %zu) ===\\n", db->count, db->capacity);
    for (size_t i = 0; i < db->count; i++) {
        printf("  Rank %2zu | ID: %04d | Name: %-20s | GPA: %.2f\\n",
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
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    Database* db = db_create(2);
    if (!db) return 1;
    int choice;

    do {
        printf("\\n=== COMPLEX STUDENT MANAGEMENT SYSTEM ===\\n");
        printf("1. Add Student\\n");
        printf("2. List All Records\\n");
        printf("3. Sort & Rank by GPA\\n");
        printf("0. Exit\\n");
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
                name[strcspn(name, "\\r\\n")] = '\\0';
            }
            printf("Enter GPA (0.0 to 4.0): ");
            if (scanf("%lf", &gpa) != 1) gpa = 0.0;
            clear_input();
            db_add(db, id, name, gpa);
        } else if (choice == 2) {
            db_display(db);
        } else if (choice == 3) {
            db_sort_by_gpa(db);
            printf("Students ranked by GPA.\\n");
            db_display(db);
        }
    } while (choice != 0);

    db_free(db);
    return 0;
}`,
      tags: ["program", "complex", "students", "database", "crud"],
      aliases: ["complex_student_management", "studentManagementProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-banking-ledger",
      name: "complex_banking_ledger",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-banking-ledger",
      description: "Interactive double-entry bank account ledger with transaction audit trails",
      signature: "int main(void);",
      code: `#include <stdio.h>
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
    while ((c = getchar()) != '\\n' && c != EOF);
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
        ledger[total_tx].desc[sizeof(ledger[total_tx].desc) - 1] = '\\0';
        ledger[total_tx].amount = amt;
        total_tx++;
    }
}

int main(void) {
    int choice;

    do {
        printf("\\n=== BANKING ACCOUNT LEDGER SYSTEM ===\\n");
        printf("1. Create New Account\\n");
        printf("2. Deposit Funds\\n");
        printf("3. Withdraw Funds\\n");
        printf("4. Transfer Funds\\n");
        printf("5. View All Accounts\\n");
        printf("6. View Transaction Audit Log\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            if (total_accounts >= MAX_ACCOUNTS) {
                printf("Max accounts limit reached!\\n");
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
                holder[strcspn(holder, "\\r\\n")] = '\\0';
            }
            printf("Enter initial deposit: ");
            if (scanf("%lf", &init_bal) != 1 || init_bal < 0.0) init_bal = 0.0;
            clear_input();

            accounts[total_accounts].acct_num = num;
            strncpy(accounts[total_accounts].holder, holder, sizeof(accounts[total_accounts].holder) - 1);
            accounts[total_accounts].balance = init_bal;
            total_accounts++;
            log_tx("Initial Account Open", init_bal);
            printf("Account #%d created for %s with $%.2f balance.\\n", num, holder, init_bal);
        } else if (choice == 2) {
            int num;
            double amt;
            printf("Enter account number and deposit amount: ");
            if (scanf("%d %lf", &num, &amt) == 2 && amt > 0.0) {
                Account* a = find_account(num);
                if (a) {
                    a->balance += amt;
                    log_tx("Deposit", amt);
                    printf("Deposited $%.2f to #%d. New balance: $%.2f\\n", amt, num, a->balance);
                } else printf("Account not found.\\n");
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
                        printf("Withdrew $%.2f from #%d. New balance: $%.2f\\n", amt, num, a->balance);
                    } else printf("Insufficient funds! Balance is $%.2f\\n", a->balance);
                } else printf("Account not found.\\n");
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
                        printf("Transferred $%.2f from #%d to #%d successfully.\\n", amt, src_num, dst_num);
                    } else printf("Insufficient funds in source account.\\n");
                } else printf("Invalid account numbers.\\n");
            }
            clear_input();
        } else if (choice == 5) {
            printf("\\n=== REGISTERED ACCOUNTS (%d Total) ===\\n", total_accounts);
            for (int i = 0; i < total_accounts; i++) {
                printf("  Acct #%05d | Holder: %-20s | Balance: $%.2f\\n",
                       accounts[i].acct_num, accounts[i].holder, accounts[i].balance);
            }
        } else if (choice == 6) {
            printf("\\n=== TRANSACTION AUDIT LOG (%d Entries) ===\\n", total_tx);
            for (int i = 0; i < total_tx; i++) {
                printf("  Tx #%3d: %-24s | $%+.2f\\n", i + 1, ledger[i].desc, ledger[i].amount);
            }
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "complex", "banking", "ledger", "transactions"],
      aliases: ["complex_banking_ledger", "bankingLedgerProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-string-builder",
      name: "complex_string_builder",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-string-builder",
      description: "Interactive dynamic heap string builder with exponential growth policies",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    char* buffer;
    size_t length;
    size_t capacity;
} StringBuilder;

static StringBuilder* sb_create(size_t initial_cap) {
    if (initial_cap == 0) initial_cap = 16;
    StringBuilder* sb = (StringBuilder*)malloc(sizeof(StringBuilder));
    if (!sb) return NULL;
    sb->buffer = (char*)malloc(initial_cap);
    if (!sb->buffer) { free(sb); return NULL; }
    sb->buffer[0] = '\\0';
    sb->length = 0;
    sb->capacity = initial_cap;
    return sb;
}

static void sb_ensure(StringBuilder* sb, size_t needed) {
    if (sb->length + needed + 1 > sb->capacity) {
        size_t new_cap = sb->capacity * 2;
        while (new_cap < sb->length + needed + 1) new_cap *= 2;
        char* next = (char*)realloc(sb->buffer, new_cap);
        if (!next) return;
        sb->buffer = next;
        sb->capacity = new_cap;
    }
}

static void sb_append(StringBuilder* sb, const char* str) {
    size_t len = strlen(str);
    sb_ensure(sb, len);
    memcpy(sb->buffer + sb->length, str, len);
    sb->length += len;
    sb->buffer[sb->length] = '\\0';
}

static void sb_reverse(StringBuilder* sb) {
    if (sb->length < 2) return;
    size_t i = 0, j = sb->length - 1;
    while (i < j) {
        char tmp = sb->buffer[i];
        sb->buffer[i] = sb->buffer[j];
        sb->buffer[j] = tmp;
        i++;
        j--;
    }
}

static void sb_clear(StringBuilder* sb) {
    sb->length = 0;
    if (sb->buffer) sb->buffer[0] = '\\0';
}

static void sb_free(StringBuilder* sb) {
    if (sb) {
        free(sb->buffer);
        free(sb);
    }
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    StringBuilder* sb = sb_create(16);
    if (!sb) return 1;
    int choice;
    char text[128];

    do {
        printf("\\n=== DYNAMIC STRING BUILDER ===\\n");
        printf("State: [len=%zu, cap=%zu] Content: \\"%s\\"\\n",
               sb->length, sb->capacity, sb->buffer);
        printf("1. Append String\\n");
        printf("2. Append Integer\\n");
        printf("3. Reverse String\\n");
        printf("4. Clear Buffer\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            printf("Enter text to append: ");
            if (fgets(text, sizeof(text), stdin)) {
                text[strcspn(text, "\\r\\n")] = '\\0';
                sb_append(sb, text);
            }
        } else if (choice == 2) {
            int val;
            printf("Enter integer: ");
            if (scanf("%d", &val) == 1) {
                char num_buf[32];
                snprintf(num_buf, sizeof(num_buf), "%d", val);
                sb_append(sb, num_buf);
            }
            clear_input();
        } else if (choice == 3) {
            sb_reverse(sb);
            printf("String reversed!\\n");
        } else if (choice == 4) {
            sb_clear(sb);
            printf("Buffer cleared.\\n");
        }
    } while (choice != 0);

    sb_free(sb);
    return 0;
}`,
      tags: ["program", "complex", "string-builder", "dynamic-memory"],
      aliases: ["complex_string_builder", "stringBuilderProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-file-analyzer",
      name: "complex_file_analyzer",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-file-analyzer",
      description: "Interactive file analytics engine with ASCII frequency histogram and entropy stats",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <math.h>

typedef struct {
    long long total_chars;
    long long alpha_chars;
    long long digit_chars;
    long long space_chars;
    long long lines;
    long long freq[256];
} FileAnalysis;

static void analyze_buffer(const char* text, FileAnalysis* fa) {
    memset(fa, 0, sizeof(FileAnalysis));
    for (int i = 0; text[i] != '\\0'; i++) {
        unsigned char uc = (unsigned char)text[i];
        fa->total_chars++;
        fa->freq[uc]++;
        if (isalpha(uc)) fa->alpha_chars++;
        else if (isdigit(uc)) fa->digit_chars++;
        else if (isspace(uc)) fa->space_chars++;
        if (uc == '\\n') fa->lines++;
    }
    if (fa->total_chars > 0 && fa->lines == 0) fa->lines = 1;
}

static void print_analysis(const FileAnalysis* fa) {
    printf("\\n--- TEXT ANALYSIS METRICS ---\\n");
    printf("  Total Chars : %lld\\n", fa->total_chars);
    printf("  Alphabetic  : %lld\\n", fa->alpha_chars);
    printf("  Digits      : %lld\\n", fa->digit_chars);
    printf("  Whitespace  : %lld\\n", fa->space_chars);
    printf("  Lines       : %lld\\n", fa->lines);

    printf("\\nTop Printable Character Frequencies:\\n");
    for (int ch = 32; ch < 127; ch++) {
        if (fa->freq[ch] > 0) {
            printf("  '%c' : %-4lld ", ch, fa->freq[ch]);
            for (int k = 0; k < fa->freq[ch] && k < 20; k++) putchar('#');
            putchar('\\n');
        }
    }
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    char sample_text[1024] = "The quick brown fox jumps over the lazy dog 12345.";
    FileAnalysis fa;
    int choice;

    do {
        printf("\\n=== FILE & TEXT ANALYZER SUITE ===\\n");
        printf("1. Analyze Current Text Buffer\\n");
        printf("2. Input New Text\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            analyze_buffer(sample_text, &fa);
            print_analysis(&fa);
        } else if (choice == 2) {
            printf("Enter new text to analyze: ");
            if (fgets(sample_text, sizeof(sample_text), stdin)) {
                sample_text[strcspn(sample_text, "\\r\\n")] = '\\0';
            }
            analyze_buffer(sample_text, &fa);
            print_analysis(&fa);
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "complex", "file-analyzer", "histogram", "stats"],
      aliases: ["complex_file_analyzer", "fileAnalyzerProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-inventory-catalog",
      name: "complex_inventory_catalog",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-inventory-catalog",
      description: "Interactive product inventory management catalog with stock tracking and valuation",
      signature: "int main(void);",
      code: `#include <stdio.h>
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
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void add_item(const char* sku, const char* name, int qty, double price) {
    if (total_items >= MAX_ITEMS) {
        printf("Catalog is full!\\n");
        return;
    }
    strncpy(catalog[total_items].sku, sku, sizeof(catalog[total_items].sku) - 1);
    strncpy(catalog[total_items].name, name, sizeof(catalog[total_items].name) - 1);
    catalog[total_items].quantity = qty;
    catalog[total_items].unit_price = price;
    total_items++;
    printf("Item added: [%s] %s (Qty: %d, Price: $%.2f)\\n", sku, name, qty, price);
}

static void list_inventory(void) {
    if (total_items == 0) {
        printf("Inventory is empty.\\n");
        return;
    }
    double total_val = 0.0;
    printf("\\n=== INVENTORY CATALOG (%d Items) ===\\n", total_items);
    printf("  %-8s | %-20s | %-6s | %-10s | %-10s\\n", "SKU", "Item Name", "Qty", "Unit Price", "Total Val");
    printf("  ---------+----------------------+--------+------------+------------\\n");
    for (int i = 0; i < total_items; i++) {
        double item_val = catalog[i].quantity * catalog[i].unit_price;
        total_val += item_val;
        printf("  %-8s | %-20s | %6d | $%9.2f | $%9.2f\\n",
               catalog[i].sku, catalog[i].name, catalog[i].quantity,
               catalog[i].unit_price, item_val);
    }
    printf("  TOTAL INVENTORY VALUATION: $%.2f\\n", total_val);
}

int main(void) {
    add_item("SKU-101", "USB Keyboard", 15, 29.99);
    add_item("SKU-102", "Optical Mouse", 25, 14.50);
    int choice;

    do {
        printf("\\n=== INVENTORY CATALOG SYSTEM ===\\n");
        printf("1. List Inventory\\n");
        printf("2. Add New Product\\n");
        printf("3. Update Stock Quantity\\n");
        printf("0. Exit\\n");
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
            if (fgets(sku, sizeof(sku), stdin)) sku[strcspn(sku, "\\r\\n")] = '\\0';
            printf("Enter Item Name: ");
            if (fgets(name, sizeof(name), stdin)) name[strcspn(name, "\\r\\n")] = '\\0';
            printf("Enter Quantity and Unit Price: ");
            if (scanf("%d %lf", &qty, &price) == 2) {
                add_item(sku, name, qty, price);
            }
            clear_input();
        } else if (choice == 3) {
            char sku[16];
            int delta;
            printf("Enter SKU: ");
            if (fgets(sku, sizeof(sku), stdin)) sku[strcspn(sku, "\\r\\n")] = '\\0';
            printf("Enter quantity adjustment (+ to add, - to sell): ");
            if (scanf("%d", &delta) == 1) {
                int found = 0;
                for (int i = 0; i < total_items; i++) {
                    if (strcmp(catalog[i].sku, sku) == 0) {
                        catalog[i].quantity += delta;
                        if (catalog[i].quantity < 0) catalog[i].quantity = 0;
                        printf("Updated %s stock to %d.\\n", catalog[i].name, catalog[i].quantity);
                        found = 1;
                        break;
                    }
                }
                if (!found) printf("SKU not found.\\n");
            }
            clear_input();
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "complex", "inventory", "catalog", "management"],
      aliases: ["complex_inventory_catalog", "inventoryCatalogProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-task-tracker",
      name: "complex_task_tracker",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-task-tracker",
      description: "Interactive task scheduler and status pipeline with priority queues",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_TASKS 50

typedef enum { STATUS_TODO, STATUS_IN_PROGRESS, STATUS_DONE } TaskStatus;
typedef enum { PRIO_LOW = 1, PRIO_MED, PRIO_HIGH } Priority;

typedef struct {
    int id;
    char title[64];
    Priority priority;
    TaskStatus status;
} Task;

static Task task_list[MAX_TASKS];
static int task_count = 0;
static int next_id = 101;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static const char* status_name(TaskStatus s) {
    if (s == STATUS_TODO) return "TODO";
    if (s == STATUS_IN_PROGRESS) return "IN PROGRESS";
    return "DONE";
}

static const char* priority_name(Priority p) {
    if (p == PRIO_HIGH) return "HIGH";
    if (p == PRIO_MED) return "MEDIUM";
    return "LOW";
}

static void add_task(const char* title, Priority p) {
    if (task_count >= MAX_TASKS) return;
    task_list[task_count].id = next_id++;
    strncpy(task_list[task_count].title, title, sizeof(task_list[task_count].title) - 1);
    task_list[task_count].priority = p;
    task_list[task_count].status = STATUS_TODO;
    task_count++;
    printf("Task #%d created.\\n", task_list[task_count - 1].id);
}

static void list_tasks(void) {
    if (task_count == 0) {
        printf("No active tasks.\\n");
        return;
    }
    printf("\\n=== TASK TRACKER PIPELINE (%d Tasks) ===\\n", task_count);
    for (int i = 0; i < task_count; i++) {
        printf("  [ID:%d] %-24s | Prio: %-6s | Status: [%s]\\n",
               task_list[i].id, task_list[i].title,
               priority_name(task_list[i].priority), status_name(task_list[i].status));
    }
}

int main(void) {
    add_task("Set up build environment", PRIO_HIGH);
    add_task("Write API unit tests", PRIO_MED);
    int choice;

    do {
        printf("\\n=== TASK TRACKER SYSTEM ===\\n");
        printf("1. List All Tasks\\n");
        printf("2. Add New Task\\n");
        printf("3. Advance Task Status\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            list_tasks();
        } else if (choice == 2) {
            char title[64];
            int p;
            printf("Enter task title: ");
            if (fgets(title, sizeof(title), stdin)) title[strcspn(title, "\\r\\n")] = '\\0';
            printf("Enter priority (1: Low, 2: Medium, 3: High): ");
            if (scanf("%d", &p) != 1 || p < 1 || p > 3) p = 2;
            clear_input();
            add_task(title, (Priority)p);
        } else if (choice == 3) {
            int id;
            printf("Enter Task ID to advance: ");
            if (scanf("%d", &id) == 1) {
                int found = 0;
                for (int i = 0; i < task_count; i++) {
                    if (task_list[i].id == id) {
                        if (task_list[i].status == STATUS_TODO) task_list[i].status = STATUS_IN_PROGRESS;
                        else if (task_list[i].status == STATUS_IN_PROGRESS) task_list[i].status = STATUS_DONE;
                        printf("Task #%d advanced to [%s].\\n", id, status_name(task_list[i].status));
                        found = 1;
                        break;
                    }
                }
                if (!found) printf("Task ID not found.\\n");
            }
            clear_input();
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "complex", "tasks", "tracker", "workflow"],
      aliases: ["complex_task_tracker", "taskTrackerProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-expression-evaluator",
      name: "complex_expression_evaluator",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-expression-evaluator",
      description: "Interactive arithmetic expression evaluator using Shunting-Yard RPN parsing",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

static int precedence(char op) {
    if (op == '+' || op == '-') return 1;
    if (op == '*' || op == '/') return 2;
    return 0;
}

static double apply_op(double a, double b, char op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return (b != 0.0) ? a / b : 0.0;
        default:  return 0.0;
    }
}

static double eval_postfix(const char* expr) {
    double values[64];
    int v_top = -1;
    char ops[64];
    int o_top = -1;

    for (int i = 0; expr[i] != '\\0'; i++) {
        if (isspace((unsigned char)expr[i])) continue;

        if (isdigit((unsigned char)expr[i])) {
            double val = 0;
            while (i < (int)strlen(expr) && isdigit((unsigned char)expr[i])) {
                val = (val * 10) + (expr[i] - '0');
                i++;
            }
            i--;
            values[++v_top] = val;
        } else if (expr[i] == '(') {
            ops[++o_top] = expr[i];
        } else if (expr[i] == ')') {
            while (o_top >= 0 && ops[o_top] != '(') {
                double val2 = values[v_top--];
                double val1 = values[v_top--];
                char op = ops[o_top--];
                values[++v_top] = apply_op(val1, val2, op);
            }
            if (o_top >= 0) o_top--;
        } else {
            while (o_top >= 0 && precedence(ops[o_top]) >= precedence(expr[i])) {
                double val2 = values[v_top--];
                double val1 = values[v_top--];
                char op = ops[o_top--];
                values[++v_top] = apply_op(val1, val2, op);
            }
            ops[++o_top] = expr[i];
        }
    }

    while (o_top >= 0) {
        double val2 = values[v_top--];
        double val1 = values[v_top--];
        char op = ops[o_top--];
        values[++v_top] = apply_op(val1, val2, op);
    }

    return (v_top >= 0) ? values[v_top] : 0.0;
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    char expr[128];
    int choice;

    do {
        printf("\\n=== SHUNTING-YARD EXPRESSION EVALUATOR ===\\n");
        printf("1. Evaluate Arithmetic Expression\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            printf("Enter infix expression (e.g. 3 + 5 * ( 2 - 8 )): ");
            if (fgets(expr, sizeof(expr), stdin)) {
                expr[strcspn(expr, "\\r\\n")] = '\\0';
                if (strlen(expr) > 0) {
                    double ans = eval_postfix(expr);
                    printf("Result: %.4f\\n", ans);
                }
            }
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "complex", "shunting-yard", "rpn", "calculator"],
      aliases: ["complex_expression_evaluator", "expressionEvaluatorProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-binary-record-store",
      name: "complex_binary_record_store",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-binary-record-store",
      description: "Interactive fixed-size binary record storage engine with block seeking and checksums",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>
#include <stdint.h>

#define MAX_BLOCKS 16
#define BLOCK_PAYLOAD_SIZE 64

typedef struct {
    uint32_t block_id;
    uint32_t length;
    uint32_t checksum;
    char payload[BLOCK_PAYLOAD_SIZE];
} RecordBlock;

static RecordBlock storage[MAX_BLOCKS];
static int active_blocks = 0;

static uint32_t calc_checksum(const char* data, uint32_t len) {
    uint32_t sum = 0x811C9DC5;
    for (uint32_t i = 0; i < len; i++) {
        sum ^= (uint8_t)data[i];
        sum *= 0x01000193;
    }
    return sum;
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    int choice;

    do {
        printf("\\n=== BINARY RECORD BLOCK STORE ===\\n");
        printf("Blocks stored: %d / %d\\n", active_blocks, MAX_BLOCKS);
        printf("1. Write Block\\n");
        printf("2. Read & Verify Block\\n");
        printf("3. Dump Storage Manifest\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            if (active_blocks >= MAX_BLOCKS) {
                printf("Store full!\\n");
                continue;
            }
            char text[BLOCK_PAYLOAD_SIZE];
            printf("Enter text payload: ");
            if (fgets(text, sizeof(text), stdin)) {
                text[strcspn(text, "\\r\\n")] = '\\0';
                uint32_t len = (uint32_t)strlen(text);
                RecordBlock* b = &storage[active_blocks];
                b->block_id = (uint32_t)(active_blocks + 1);
                b->length = len;
                strncpy(b->payload, text, BLOCK_PAYLOAD_SIZE);
                b->checksum = calc_checksum(b->payload, len);
                active_blocks++;
                printf("Block #%u written (Length: %u, Checksum: 0x%08X).\\n",
                       b->block_id, len, b->checksum);
            }
        } else if (choice == 2) {
            int id;
            printf("Enter Block ID (1 to %d): ", active_blocks);
            if (scanf("%d", &id) == 1 && id >= 1 && id <= active_blocks) {
                RecordBlock* b = &storage[id - 1];
                uint32_t current_sum = calc_checksum(b->payload, b->length);
                printf("Block #%u: \\"%s\\" (Len: %u)\\n", b->block_id, b->payload, b->length);
                printf("Stored Checksum : 0x%08X\\n", b->checksum);
                printf("Computed Checksum: 0x%08X => %s\\n",
                       current_sum, (current_sum == b->checksum) ? "INTEGRITY OK" : "CORRUPT");
            }
            clear_input();
        } else if (choice == 3) {
            printf("\\n=== STORAGE BLOCKS MANIFEST ===\\n");
            for (int i = 0; i < active_blocks; i++) {
                printf("  Slot [%02d]: Block ID #%u | Bytes: %2u | Checksum: 0x%08X | Payload: \\"%s\\"\\n",
                       i, storage[i].block_id, storage[i].length, storage[i].checksum, storage[i].payload);
            }
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "complex", "binary-store", "checksum", "storage"],
      aliases: ["complex_binary_record_store", "binaryRecordStoreProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-multilevel-logger",
      name: "complex_multilevel_logger",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-multilevel-logger",
      description: "Interactive structured circular ring buffer logger with level filters and telemetry",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define RING_BUFFER_SIZE 16

typedef enum {
    LVL_TRACE = 0,
    LVL_DEBUG,
    LVL_INFO,
    LVL_WARN,
    LVL_ERROR
} Severity;

typedef struct {
    int seq;
    Severity level;
    char message[64];
} LogEntry;

static LogEntry ring[RING_BUFFER_SIZE];
static int head = 0;
static int entry_count = 0;
static int global_seq = 1;

static const char* severity_tag(Severity s) {
    switch (s) {
        case LVL_TRACE: return "TRACE";
        case LVL_DEBUG: return "DEBUG";
        case LVL_INFO:  return "INFO ";
        case LVL_WARN:  return "WARN ";
        case LVL_ERROR: return "ERROR";
        default:        return "UNKNOWN";
    }
}

static void log_append(Severity level, const char* msg) {
    int idx = head;
    ring[idx].seq = global_seq++;
    ring[idx].level = level;
    strncpy(ring[idx].message, msg, sizeof(ring[idx].message) - 1);
    ring[idx].message[sizeof(ring[idx].message) - 1] = '\\0';
    head = (head + 1) % RING_BUFFER_SIZE;
    if (entry_count < RING_BUFFER_SIZE) entry_count++;
}

static void dump_logs(Severity min_lvl) {
    printf("\\n=== SYSTEM LOG AUDIT (Min Severity: %s) ===\\n", severity_tag(min_lvl));
    int start = (entry_count == RING_BUFFER_SIZE) ? head : 0;
    for (int i = 0; i < entry_count; i++) {
        int idx = (start + i) % RING_BUFFER_SIZE;
        if (ring[idx].level >= min_lvl) {
            printf("  [%04d] [%s] %s\\n",
                   ring[idx].seq, severity_tag(ring[idx].level), ring[idx].message);
        }
    }
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    log_append(LVL_INFO, "Subsystem initialized");
    log_append(LVL_DEBUG, "Memory mapped at default offset");
    int choice;

    do {
        printf("\\n=== MULTILEVEL RING LOGGER ===\\n");
        printf("Entries in ring: %d / %d\\n", entry_count, RING_BUFFER_SIZE);
        printf("1. Write Log Message\\n");
        printf("2. Dump All Logs\\n");
        printf("3. Dump Logs with Filter\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            int lvl;
            char msg[64];
            printf("Select level (0: TRACE, 1: DEBUG, 2: INFO, 3: WARN, 4: ERROR): ");
            if (scanf("%d", &lvl) != 1 || lvl < 0 || lvl > 4) lvl = 2;
            clear_input();
            printf("Enter log message: ");
            if (fgets(msg, sizeof(msg), stdin)) {
                msg[strcspn(msg, "\\r\\n")] = '\\0';
                log_append((Severity)lvl, msg);
                printf("Log entry recorded.\\n");
            }
        } else if (choice == 2) {
            dump_logs(LVL_TRACE);
        } else if (choice == 3) {
            int filter;
            printf("Select filter cutoff level (0-4): ");
            if (scanf("%d", &filter) == 1 && filter >= 0 && filter <= 4) {
                dump_logs((Severity)filter);
            }
            clear_input();
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "complex", "logger", "ring-buffer", "severity"],
      aliases: ["complex_multilevel_logger", "multilevelLoggerProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-matrix-suite",
      name: "complex_matrix_suite",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-matrix-suite",
      description: "Interactive linear algebra matrix operations suite (addition, multiplication, transpose, determinant)",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_DIM 4

typedef struct {
    int rows;
    int cols;
    double data[MAX_DIM][MAX_DIM];
} Matrix;

static void print_matrix(const Matrix* m, const char* name) {
    printf("Matrix %s (%dx%d):\\n", name, m->rows, m->cols);
    for (int r = 0; r < m->rows; r++) {
        printf("  |");
        for (int c = 0; c < m->cols; c++) {
            printf("%7.2f ", m->data[r][c]);
        }
        printf("|\\n");
    }
}

static Matrix add_matrices(const Matrix* a, const Matrix* b) {
    Matrix res;
    res.rows = a->rows;
    res.cols = a->cols;
    for (int r = 0; r < a->rows; r++) {
        for (int c = 0; c < a->cols; c++) {
            res.data[r][c] = a->data[r][c] + b->data[r][c];
        }
    }
    return res;
}

static Matrix multiply_matrices(const Matrix* a, const Matrix* b) {
    Matrix res;
    res.rows = a->rows;
    res.cols = b->cols;
    for (int r = 0; r < a->rows; r++) {
        for (int c = 0; c < b->cols; c++) {
            res.data[r][c] = 0.0;
            for (int k = 0; k < a->cols; k++) {
                res.data[r][c] += a->data[r][k] * b->data[k][c];
            }
        }
    }
    return res;
}

static Matrix transpose_matrix(const Matrix* a) {
    Matrix res;
    res.rows = a->cols;
    res.cols = a->rows;
    for (int r = 0; r < a->rows; r++) {
        for (int c = 0; c < a->cols; c++) {
            res.data[c][r] = a->data[r][c];
        }
    }
    return res;
}

static double det2x2(const Matrix* m) {
    return m->data[0][0] * m->data[1][1] - m->data[0][1] * m->data[1][0];
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    Matrix a = { 2, 2, {{ 1.0, 2.0 }, { 3.0, 4.0 }} };
    Matrix b = { 2, 2, {{ 5.0, 6.0 }, { 7.0, 8.0 }} };
    int choice;

    do {
        printf("\\n=== MATRIX MATHEMATICS SUITE ===\\n");
        print_matrix(&a, "A");
        print_matrix(&b, "B");
        printf("1. Add Matrices (A + B)\\n");
        printf("2. Multiply Matrices (A * B)\\n");
        printf("3. Transpose Matrix A\\n");
        printf("4. Determinant of Matrix A (2x2)\\n");
        printf("5. Input New Matrix A Values\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            Matrix c = add_matrices(&a, &b);
            print_matrix(&c, "A + B");
        } else if (choice == 2) {
            Matrix c = multiply_matrices(&a, &b);
            print_matrix(&c, "A * B");
        } else if (choice == 3) {
            Matrix at = transpose_matrix(&a);
            print_matrix(&at, "A^T");
        } else if (choice == 4) {
            printf("Determinant of A: %.4f\\n", det2x2(&a));
        } else if (choice == 5) {
            printf("Enter 4 elements for 2x2 Matrix A: ");
            for (int r = 0; r < 2; r++) {
                for (int c = 0; c < 2; c++) {
                    if (scanf("%lf", &a.data[r][c]) != 1) a.data[r][c] = 0.0;
                }
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "complex", "matrix", "linear-algebra"],
      aliases: ["complex_matrix_suite", "matrixSuiteProgram"],
    })
  );

  return components;
}

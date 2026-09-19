import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateProjectsMgmtParsersNet(): Component[] {
  const components: Component[] = [];

  components.push(
    createComponent({
      id: "projects.management-systems.student-records.prog-student-management",
      name: "proj_student_management",
      type: "program",
      category: "projects",
      subcategory: "management-systems",
      categoryId: "projects.management-systems.student-records",
      path: "projects/management-systems/student-records/prog-student-management",
      description: "Complete interactive student record management system with GPA computation, ranking, and search",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 100

typedef struct {
    int id;
    char name[32];
    double marks[3];
    double gpa;
} Student;

static Student db[MAX_STUDENTS];
static int student_count = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double calc_gpa(const double m[3]) {
    return ((m[0] + m[1] + m[2]) / 300.0) * 4.0;
}

static void add_student(void) {
    if (student_count >= MAX_STUDENTS) {
        printf("Database full.\\n");
        return;
    }
    Student s;
    printf("Enter Student ID: ");
    if (scanf("%d", &s.id) != 1) {
        clear_input();
        return;
    }
    clear_input();
    printf("Enter Student Name: ");
    if (scanf("%31[^\\n]", s.name) != 1) {
        clear_input();
        return;
    }
    clear_input();
    printf("Enter 3 course marks (0 to 100): ");
    if (scanf("%lf %lf %lf", &s.marks[0], &s.marks[1], &s.marks[2]) != 3) {
        clear_input();
        return;
    }
    clear_input();
    s.gpa = calc_gpa(s.marks);
    db[student_count++] = s;
    printf("Student added successfully. GPA: %.2f\\n", s.gpa);
}

static void display_all_students(void) {
    if (student_count == 0) {
        printf("No records found.\\n");
        return;
    }
    printf("%-6s | %-16s | %-6s | %-18s\\n", "ID", "Name", "GPA", "Marks [M1, M2, M3]");
    printf("------------------------------------------------------------\\n");
    for (int i = 0; i < student_count; i++) {
        printf("%-6d | %-16s | %-6.2f | [%.0f, %.0f, %.0f]\\n",
               db[i].id, db[i].name, db[i].gpa, db[i].marks[0], db[i].marks[1], db[i].marks[2]);
    }
}

static void search_student_id(void) {
    int q_id;
    printf("Enter ID to search: ");
    if (scanf("%d", &q_id) != 1) {
        clear_input();
        return;
    }
    clear_input();
    for (int i = 0; i < student_count; i++) {
        if (db[i].id == q_id) {
            printf("Found: ID %d | Name: %s | GPA: %.2f\\n", db[i].id, db[i].name, db[i].gpa);
            return;
        }
    }
    printf("Student with ID %d not found.\\n", q_id);
}

static void rank_by_gpa(void) {
    if (student_count < 2) return;
    for (int i = 0; i < student_count - 1; i++) {
        for (int j = 0; j < student_count - i - 1; j++) {
            if (db[j].gpa < db[j + 1].gpa) {
                Student tmp = db[j]; db[j] = db[j + 1]; db[j + 1] = tmp;
            }
        }
    }
    printf("Ranked students by GPA descending:\\n");
    display_all_students();
}

int main(void) {
    int choice;
    do {
        printf("=== Student Record Management System ===\\n");
        printf("1. Add New Student Record\\n");
        printf("2. View All Student Records\\n");
        printf("3. Search Student by ID\\n");
        printf("4. Rank Students by GPA\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                add_student();
                break;
            case 2:
                display_all_students();
                break;
            case 3:
                search_student_id();
                break;
            case 4:
                rank_by_gpa();
                break;
            case 0:
                printf("Exiting system.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "management", "student-system"],
      aliases: ["proj_student_management"],
    }),

    createComponent({
      id: "projects.management-systems.bank-accounts.prog-bank-management",
      name: "proj_bank_management",
      type: "program",
      category: "projects",
      subcategory: "management-systems",
      categoryId: "projects.management-systems.bank-accounts",
      path: "projects/management-systems/bank-accounts/prog-bank-management",
      description: "Interactive bank account management system supporting deposits, withdrawals, and ledger transfers",
      signature: "int main(void);",
      code: `#include <stdio.h>
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
    while ((c = getchar()) != '\\n' && c != EOF);
}

static Account* find_account(int no) {
    for (int i = 0; i < total_accounts; i++) {
        if (accounts[i].acc_no == no) return &accounts[i];
    }
    return NULL;
}

static void create_account(void) {
    if (total_accounts >= MAX_ACCOUNTS) {
        printf("Max accounts limit reached.\\n");
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
        printf("Account number already exists.\\n");
        return;
    }
    printf("Enter Account Holder Name: ");
    if (scanf("%31[^\\n]", a.holder) != 1) {
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
    printf("Account #%d created successfully.\\n", a.acc_no);
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
        printf("Account not found.\\n");
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
    printf("Deposited $%.2f. New Balance: $%.2f\\n", amt, a->balance);
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
        printf("Account not found.\\n");
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
        printf("Insufficient balance ($%.2f).\\n", a->balance);
        return;
    }
    a->balance -= amt;
    printf("Withdrawn $%.2f. Remaining Balance: $%.2f\\n", amt, a->balance);
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
        printf("One or both accounts not found.\\n");
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
        printf("Insufficient balance in source account.\\n");
        return;
    }
    src->balance -= amt;
    dst->balance += amt;
    printf("Transferred $%.2f from #%d to #%d successfully.\\n", amt, src_no, dst_no);
}

static void list_accounts(void) {
    if (total_accounts == 0) {
        printf("No accounts registered.\\n");
        return;
    }
    printf("%-8s | %-16s | %-10s\\n", "Acc No", "Holder Name", "Balance");
    printf("-----------------------------------------\\n");
    for (int i = 0; i < total_accounts; i++) {
        printf("%-8d | %-16s | $%-10.2f\\n", accounts[i].acc_no, accounts[i].holder, accounts[i].balance);
    }
}

int main(void) {
    int choice;
    do {
        printf("=== Bank Account Management System ===\\n");
        printf("1. Create Account\\n");
        printf("2. Deposit Money\\n");
        printf("3. Withdraw Money\\n");
        printf("4. Transfer Between Accounts\\n");
        printf("5. List All Accounts\\n");
        printf("0. Exit\\n");
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
                printf("Exiting banking terminal.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "banking", "ledger"],
      aliases: ["proj_bank_management"],
    }),

    createComponent({
      id: "projects.management-systems.library-catalog.prog-library-management",
      name: "proj_library_management",
      type: "program",
      category: "projects",
      subcategory: "management-systems",
      categoryId: "projects.management-systems.library-catalog",
      path: "projects/management-systems/library-catalog/prog-library-management",
      description: "Complete interactive library catalog system with checkout, return, and catalog queries",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_BOOKS 50

typedef struct {
    int id;
    char title[48];
    char author[32];
    int available;
} Book;

static Book catalog[MAX_BOOKS];
static int book_count = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void add_book(void) {
    if (book_count >= MAX_BOOKS) {
        printf("Catalog is full.\\n");
        return;
    }
    Book b;
    b.id = book_count + 1;
    b.available = 1;
    printf("Enter Book Title: ");
    if (scanf("%47[^\\n]", b.title) != 1) {
        clear_input();
        return;
    }
    clear_input();
    printf("Enter Book Author: ");
    if (scanf("%31[^\\n]", b.author) != 1) {
        clear_input();
        return;
    }
    clear_input();
    catalog[book_count++] = b;
    printf("Book added successfully with ID #%d.\\n", b.id);
}

static void list_books(void) {
    if (book_count == 0) {
        printf("Library catalog is empty.\\n");
        return;
    }
    printf("%-4s | %-24s | %-16s | %-10s\\n", "ID", "Title", "Author", "Status");
    printf("---------------------------------------------------------------\\n");
    for (int i = 0; i < book_count; i++) {
        printf("%-4d | %-24s | %-16s | %-10s\\n",
               catalog[i].id, catalog[i].title, catalog[i].author,
               catalog[i].available ? "AVAILABLE" : "BORROWED");
    }
}

static void borrow_book(void) {
    int id;
    printf("Enter Book ID to borrow: ");
    if (scanf("%d", &id) != 1) {
        clear_input();
        return;
    }
    clear_input();
    for (int i = 0; i < book_count; i++) {
        if (catalog[i].id == id) {
            if (catalog[i].available) {
                catalog[i].available = 0;
                printf("Successfully borrowed '%s'.\\n", catalog[i].title);
            } else {
                printf("Book '%s' is already checked out.\\n", catalog[i].title);
            }
            return;
        }
    }
    printf("Book ID #%d not found.\\n", id);
}

static void return_book(void) {
    int id;
    printf("Enter Book ID to return: ");
    if (scanf("%d", &id) != 1) {
        clear_input();
        return;
    }
    clear_input();
    for (int i = 0; i < book_count; i++) {
        if (catalog[i].id == id) {
            if (!catalog[i].available) {
                catalog[i].available = 1;
                printf("Successfully returned '%s'.\\n", catalog[i].title);
            } else {
                printf("Book '%s' was not borrowed.\\n", catalog[i].title);
            }
            return;
        }
    }
    printf("Book ID #%d not found.\\n", id);
}

int main(void) {
    int choice;
    do {
        printf("=== Library Catalog Management System ===\\n");
        printf("1. Add New Book\\n");
        printf("2. View All Books in Catalog\\n");
        printf("3. Check Out / Borrow Book\\n");
        printf("4. Return Book\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                add_book();
                break;
            case 2:
                list_books();
                break;
            case 3:
                borrow_book();
                break;
            case 4:
                return_book();
                break;
            case 0:
                printf("Exiting library system.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "library", "catalog"],
      aliases: ["proj_library_management"],
    }),

    createComponent({
      id: "projects.management-systems.contact-book.prog-contact-book",
      name: "proj_contact_book",
      type: "program",
      category: "projects",
      subcategory: "management-systems",
      categoryId: "projects.management-systems.contact-book",
      path: "projects/management-systems/contact-book/prog-contact-book",
      description: "Interactive contact book application supporting search, validation, and editing",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_CONTACTS 50

typedef struct {
    char name[32];
    char phone[16];
    char email[32];
} Contact;

static Contact contacts[MAX_CONTACTS];
static int total_contacts = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void add_contact(void) {
    if (total_contacts >= MAX_CONTACTS) {
        printf("Contact book full.\\n");
        return;
    }
    Contact c;
    printf("Enter Name: ");
    if (scanf("%31[^\\n]", c.name) != 1) {
        clear_input();
        return;
    }
    clear_input();
    printf("Enter Phone: ");
    if (scanf("%15s", c.phone) != 1) {
        clear_input();
        return;
    }
    clear_input();
    printf("Enter Email: ");
    if (scanf("%31s", c.email) != 1) {
        clear_input();
        return;
    }
    clear_input();
    contacts[total_contacts++] = c;
    printf("Contact '%s' saved successfully.\\n", c.name);
}

static void list_contacts(void) {
    if (total_contacts == 0) {
        printf("Contact book is empty.\\n");
        return;
    }
    printf("%-16s | %-14s | %-24s\\n", "Name", "Phone", "Email");
    printf("-----------------------------------------------------\\n");
    for (int i = 0; i < total_contacts; i++) {
        printf("%-16s | %-14s | %-24s\\n", contacts[i].name, contacts[i].phone, contacts[i].email);
    }
}

static void search_contact(void) {
    char q[32];
    printf("Enter name to search: ");
    if (scanf("%31s", q) != 1) {
        clear_input();
        return;
    }
    clear_input();
    int found = 0;
    for (int i = 0; i < total_contacts; i++) {
        if (strstr(contacts[i].name, q) != NULL) {
            printf("Found: %s | Phone: %s | Email: %s\\n",
                   contacts[i].name, contacts[i].phone, contacts[i].email);
            found = 1;
        }
    }
    if (!found) printf("No contacts matching '%s'.\\n", q);
}

int main(void) {
    int choice;
    do {
        printf("=== Personal Contact Book ===\\n");
        printf("1. Add New Contact\\n");
        printf("2. List All Contacts\\n");
        printf("3. Search Contact by Name\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                add_contact();
                break;
            case 2:
                list_contacts();
                break;
            case 3:
                search_contact();
                break;
            case 0:
                printf("Exiting contact book.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "contacts", "address-book"],
      aliases: ["proj_contact_book"],
    }),

    createComponent({
      id: "projects.management-systems.employee-payroll.prog-employee-payroll",
      name: "proj_employee_payroll",
      type: "program",
      category: "projects",
      subcategory: "management-systems",
      categoryId: "projects.management-systems.employee-payroll",
      path: "projects/management-systems/employee-payroll/prog-employee-payroll",
      description: "Interactive employee payroll application computing hours, taxes, and net salaries",
      signature: "int main(void);",
      code: `#include <stdio.h>
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
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void add_employee(void) {
    if (emp_count >= MAX_EMP) {
        printf("Payroll system full.\\n");
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
    if (scanf("%31[^\\n]", e.name) != 1) {
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
    printf("Employee added. Gross: $%.2f | Tax (15%%): $%.2f | Net: $%.2f\\n",
           e.gross_pay, e.tax, e.net_pay);
}

static void display_payroll_report(void) {
    if (emp_count == 0) {
        printf("No employee records found.\\n");
        return;
    }
    printf("%-4s | %-16s | %-6s | %-8s | %-10s | %-8s | %-10s\\n",
           "ID", "Name", "Hours", "Rate", "Gross Pay", "Tax", "Net Pay");
    printf("----------------------------------------------------------------------------\\n");
    double total_net = 0.0;
    for (int i = 0; i < emp_count; i++) {
        printf("%-4d | %-16s | %-6.1f | $%-7.2f | $%-9.2f | $%-7.2f | $%-9.2f\\n",
               employees[i].id, employees[i].name, employees[i].hours_worked,
               employees[i].hourly_rate, employees[i].gross_pay, employees[i].tax, employees[i].net_pay);
        total_net += employees[i].net_pay;
    }
    printf("----------------------------------------------------------------------------\\n");
    printf("Total Payroll Disbursement: $%.2f\\n", total_net);
}

int main(void) {
    int choice;
    do {
        printf("=== Employee Payroll System ===\\n");
        printf("1. Add Employee & Compute Salary\\n");
        printf("2. Display Payroll Summary Report\\n");
        printf("0. Exit\\n");
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
                printf("Exiting payroll system.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "payroll", "management"],
      aliases: ["proj_employee_payroll"],
    }),

    createComponent({
      id: "projects.parsers-compilers.json-parser.prog-json-parser",
      name: "proj_json_parser",
      type: "program",
      category: "projects",
      subcategory: "parsers-compilers",
      categoryId: "projects.parsers-compilers.json-parser",
      path: "projects/parsers-compilers/json-parser/prog-json-parser",
      description: "Interactive JSON tokenizer and key-value parser with syntax validation",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_JSON 1024

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void parse_json_object(const char* json) {
    printf("Parsing JSON Object:\\n");
    int len = (int)strlen(json);
    int in_str = 0, state = 0;
    char key[64], val[64];
    int k_len = 0, v_len = 0;
    for (int i = 0; i < len; i++) {
        char c = json[i];
        if (c == '\"') {
            in_str = !in_str;
            continue;
        }
        if (in_str) {
            if (state == 0 && k_len < 63) key[k_len++] = c;
            else if (state == 1 && v_len < 63) val[v_len++] = c;
        } else {
            if (c == ':') {
                state = 1;
                key[k_len] = '\\0';
            } else if (c == ',' || c == '}') {
                val[v_len] = '\\0';
                if (k_len > 0) {
                    printf("  Key: \\"%-16s\\" -> Value: \\"%s\\"\\n", key, val);
                }
                k_len = 0;
                v_len = 0;
                state = 0;
            }
        }
    }
}

int main(void) {
    int choice;
    do {
        printf("=== JSON Parser Workbench ===\\n");
        printf("1. Parse JSON String\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                char json[MAX_JSON];
                printf("Enter JSON string (e.g. {\\\"name\\\":\\\"Alice\\\",\\\"city\\\":\\\"Paris\\\"}):\\n");
                if (scanf("%1023[^\\n]", json) == 1) {
                    clear_input();
                    parse_json_object(json);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting parser.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "parsers", "json"],
      aliases: ["proj_json_parser"],
    }),

    createComponent({
      id: "projects.parsers-compilers.markdown-html.prog-markdown-converter",
      name: "proj_markdown_converter",
      type: "program",
      category: "projects",
      subcategory: "parsers-compilers",
      categoryId: "projects.parsers-compilers.markdown-html",
      path: "projects/parsers-compilers/markdown-html/prog-markdown-converter",
      description: "Interactive Markdown to HTML converter supporting headings, bold, italics, and lists",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_LINE 512

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void convert_md_line(const char* line) {
    if (line[0] == '#' && line[1] == ' ') {
        printf("<h1>%s</h1>\\n", line + 2);
        return;
    }
    if (line[0] == '#' && line[1] == '#' && line[2] == ' ') {
        printf("<h2>%s</h2>\\n", line + 3);
        return;
    }
    if (line[0] == '-' && line[1] == ' ') {
        printf("<li>%s</li>\\n", line + 2);
        return;
    }
    printf("<p>");
    int len = (int)strlen(line);
    for (int i = 0; i < len; i++) {
        if (line[i] == '*' && line[i + 1] == '*') {
            printf("<b>");
            i += 2;
            while (i < len && !(line[i] == '*' && line[i + 1] == '*')) {
                putchar(line[i++]);
            }
            printf("</b>");
            if (i < len) i++;
        } else {
            putchar(line[i]);
        }
    }
    printf("</p>\\n");
}

int main(void) {
    int choice;
    do {
        printf("=== Markdown to HTML Converter ===\\n");
        printf("1. Convert Markdown Line to HTML\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                char md[MAX_LINE];
                printf("Enter Markdown text: ");
                if (scanf("%511[^\\n]", md) == 1) {
                    clear_input();
                    printf("HTML Output: ");
                    convert_md_line(md);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting converter.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "parsers", "markdown", "html"],
      aliases: ["proj_markdown_converter"],
    }),

    createComponent({
      id: "projects.parsers-compilers.math-evaluator.prog-math-evaluator",
      name: "proj_math_evaluator",
      type: "program",
      category: "projects",
      subcategory: "parsers-compilers",
      categoryId: "projects.parsers-compilers.math-evaluator",
      path: "projects/parsers-compilers/math-evaluator/prog-math-evaluator",
      description: "Interactive mathematical expression evaluator using Shunting-Yard and RPN stack",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_EXPR 256

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

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
        case '/': return (b != 0) ? a / b : 0.0;
        default: return 0.0;
    }
}

static double evaluate_expr(const char* expr) {
    double values[MAX_EXPR];
    int v_top = -1;
    char ops[MAX_EXPR];
    int o_top = -1;
    int len = (int)strlen(expr);
    for (int i = 0; i < len; i++) {
        if (expr[i] == ' ') continue;
        if (expr[i] >= '0' && expr[i] <= '9') {
            double val = 0;
            while (i < len && expr[i] >= '0' && expr[i] <= '9') {
                val = val * 10 + (expr[i++] - '0');
            }
            i--;
            values[++v_top] = val;
        } else if (expr[i] == '(') {
            ops[++o_top] = expr[i];
        } else if (expr[i] == ')') {
            while (o_top >= 0 && ops[o_top] != '(') {
                double v2 = values[v_top--];
                double v1 = values[v_top--];
                char op = ops[o_top--];
                values[++v_top] = apply_op(v1, v2, op);
            }
            if (o_top >= 0) o_top--;
        } else {
            while (o_top >= 0 && precedence(ops[o_top]) >= precedence(expr[i])) {
                double v2 = values[v_top--];
                double v1 = values[v_top--];
                char op = ops[o_top--];
                values[++v_top] = apply_op(v1, v2, op);
            }
            ops[++o_top] = expr[i];
        }
    }
    while (o_top >= 0) {
        double v2 = values[v_top--];
        double v1 = values[v_top--];
        char op = ops[o_top--];
        values[++v_top] = apply_op(v1, v2, op);
    }
    return (v_top >= 0) ? values[v_top] : 0.0;
}

int main(void) {
    int choice;
    do {
        printf("=== Mathematical Expression Evaluator ===\\n");
        printf("1. Evaluate Arithmetic Expression\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                char expr[MAX_EXPR];
                printf("Enter expression (e.g. 3 + 5 * (2 - 8)): ");
                if (scanf("%255[^\\n]", expr) == 1) {
                    clear_input();
                    printf("Result: %.4f\\n", evaluate_expr(expr));
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting evaluator.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "parsers", "math-evaluator"],
      aliases: ["proj_math_evaluator"],
    }),

    createComponent({
      id: "projects.parsers-compilers.csv-query.prog-csv-query-engine",
      name: "proj_csv_query_engine",
      type: "program",
      category: "projects",
      subcategory: "parsers-compilers",
      categoryId: "projects.parsers-compilers.csv-query",
      path: "projects/parsers-compilers/csv-query/prog-csv-query-engine",
      description: "Interactive in-memory CSV query engine supporting column selection and filtering",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_ROWS 50

typedef struct {
    int id;
    char name[32];
    int score;
} CsvRow;

static CsvRow table[MAX_ROWS];
static int total_rows = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void load_sample_csv(void) {
    table[0] = (CsvRow){1, "Alice", 95};
    table[1] = (CsvRow){2, "Bob", 72};
    table[2] = (CsvRow){3, "Charlie", 88};
    table[3] = (CsvRow){4, "David", 64};
    table[4] = (CsvRow){5, "Emma", 91};
    total_rows = 5;
    printf("Loaded 5 CSV rows into memory.\\n");
}

static void select_all(void) {
    printf("%-4s | %-16s | %-6s\\n", "ID", "Name", "Score");
    printf("------------------------------\\n");
    for (int i = 0; i < total_rows; i++) {
        printf("%-4d | %-16s | %-6d\\n", table[i].id, table[i].name, table[i].score);
    }
}

static void filter_score_gt(void) {
    int min_s;
    printf("Enter minimum score threshold: ");
    if (scanf("%d", &min_s) != 1) {
        clear_input();
        return;
    }
    clear_input();
    printf("Rows with score >= %d:\\n", min_s);
    for (int i = 0; i < total_rows; i++) {
        if (table[i].score >= min_s) {
            printf("ID %d: %s -> %d\\n", table[i].id, table[i].name, table[i].score);
        }
    }
}

int main(void) {
    load_sample_csv();
    int choice;
    do {
        printf("=== In-Memory CSV Query Engine ===\\n");
        printf("1. SELECT * FROM Table\\n");
        printf("2. SELECT * WHERE Score >= Threshold\\n");
        printf("3. Add Row to Table\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1:
                select_all();
                break;
            case 2:
                filter_score_gt();
                break;
            case 3: {
                if (total_rows >= MAX_ROWS) {
                    printf("Table full.\\n");
                    break;
                }
                CsvRow r;
                printf("Enter ID Name Score: ");
                if (scanf("%d %31s %d", &r.id, r.name, &r.score) == 3) {
                    clear_input();
                    table[total_rows++] = r;
                    printf("Row added.\\n");
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting query engine.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "parsers", "csv", "query-engine"],
      aliases: ["proj_csv_query_engine"],
    }),

    createComponent({
      id: "projects.parsers-compilers.regex-engine.prog-regex-engine",
      name: "proj_regex_engine",
      type: "program",
      category: "projects",
      subcategory: "parsers-compilers",
      categoryId: "projects.parsers-compilers.regex-engine",
      path: "projects/parsers-compilers/regex-engine/prog-regex-engine",
      description: "Interactive regex pattern matcher supporting literal characters, dots, and Kleene stars",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int match_pattern(const char* pat, const char* text);

static int match_star(char c, const char* pat, const char* text) {
    do {
        if (match_pattern(pat, text)) return 1;
    } while (*text != '\\0' && (*text++ == c || c == '.'));
    return 0;
}

static int match_pattern(const char* pat, const char* text) {
    if (pat[0] == '\\0') return 1;
    if (pat[1] == '*') return match_star(pat[0], pat + 2, text);
    if (pat[0] == '$' && pat[1] == '\\0') return (*text == '\\0');
    if (*text != '\\0' && (pat[0] == '.' || pat[0] == *text)) {
        return match_pattern(pat + 1, text + 1);
    }
    return 0;
}

static int regex_search(const char* pat, const char* text) {
    if (pat[0] == '^') return match_pattern(pat + 1, text);
    do {
        if (match_pattern(pat, text)) return 1;
    } while (*text++ != '\\0');
    return 0;
}

int main(void) {
    int choice;
    do {
        printf("=== Micro Regular Expression Matcher ===\\n");
        printf("Supported: '.' (any char), '*' (zero or more), '^' (anchor start), '$' (anchor end)\\n");
        printf("1. Match Pattern against Text\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                char pat[128], text[256];
                printf("Enter regex pattern: ");
                if (scanf("%127s", pat) == 1) {
                    printf("Enter text to match: ");
                    if (scanf("%255s", text) == 1) {
                        clear_input();
                        int matched = regex_search(pat, text);
                        printf("Pattern '%s' %s in '%s'.\\n",
                               pat, matched ? "MATCHED" : "DID NOT MATCH", text);
                    } else {
                        clear_input();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting regex engine.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "parsers", "regex"],
      aliases: ["proj_regex_engine"],
    }),

    createComponent({
      id: "projects.network-utilities.http-parser.prog-http-parser",
      name: "proj_http_parser",
      type: "program",
      category: "projects",
      subcategory: "network-utilities",
      categoryId: "projects.network-utilities.http-parser",
      path: "projects/network-utilities/http-parser/prog-http-parser",
      description: "Interactive HTTP 1.1 request parser extracting method, URI, headers, and body",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_REQ 1024

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void parse_http_request(const char* raw) {
    char method[16], uri[256], version[16];
    if (sscanf(raw, "%15s %255s %15s", method, uri, version) != 3) {
        printf("Malformed HTTP request line.\\n");
        return;
    }
    printf("HTTP Request Line:\\n");
    printf("  Method:  %s\\n", method);
    printf("  URI:     %s\\n", uri);
    printf("  Version: %s\\n", version);
    printf("Headers & Body:\\n");
    const char* line = strchr(raw, '\\n');
    while (line && *line) {
        line++;
        if (*line == '\\r' || *line == '\\n') {
            if (*line == '\\r') line++;
            if (*line == '\\n') line++;
            printf("  Body: %s\\n", line);
            break;
        }
        char h_name[64], h_val[128];
        if (sscanf(line, "%63[^:]: %127[^\\r\\n]", h_name, h_val) == 2) {
            printf("  Header: [%s] = '%s'\\n", h_name, h_val);
        }
        line = strchr(line, '\\n');
    }
}

int main(void) {
    int choice;
    do {
        printf("=== HTTP 1.1 Protocol Parser ===\\n");
        printf("1. Parse Raw HTTP Request\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                char req[MAX_REQ];
                printf("Enter HTTP request line (e.g. GET /index.html HTTP/1.1): ");
                if (scanf("%1023[^\\n]", req) == 1) {
                    clear_input();
                    parse_http_request(req);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting HTTP parser.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "networking", "http-parser"],
      aliases: ["proj_http_parser"],
    }),

    createComponent({
      id: "projects.network-utilities.url-decoder.prog-url-parser",
      name: "proj_url_parser",
      type: "program",
      category: "projects",
      subcategory: "network-utilities",
      categoryId: "projects.network-utilities.url-decoder",
      path: "projects/network-utilities/url-decoder/prog-url-parser",
      description: "Interactive URL component decoder and percent-encoding resolver",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_URL 512

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int hex_val(char c) {
    if (c >= '0' && c <= '9') return c - '0';
    if (c >= 'a' && c <= 'f') return c - 'a' + 10;
    if (c >= 'A' && c <= 'F') return c - 'A' + 10;
    return 0;
}

static void url_decode(const char* src, char* dst) {
    int i = 0, j = 0;
    while (src[i]) {
        if (src[i] == '%' && src[i + 1] && src[i + 2]) {
            dst[j++] = (char)(hex_val(src[i + 1]) * 16 + hex_val(src[i + 2]));
            i += 3;
        } else if (src[i] == '+') {
            dst[j++] = ' ';
            i++;
        } else {
            dst[j++] = src[i++];
        }
    }
    dst[j] = '\\0';
}

static void parse_url(const char* url) {
    char protocol[16], host[128], path[256];
    const char* proto_end = strstr(url, "://");
    if (proto_end) {
        int p_len = (int)(proto_end - url);
        strncpy(protocol, url, p_len);
        protocol[p_len] = '\\0';
        url = proto_end + 3;
    } else {
        strcpy(protocol, "http");
    }
    const char* path_start = strchr(url, '/');
    if (path_start) {
        int h_len = (int)(path_start - url);
        strncpy(host, url, h_len);
        host[h_len] = '\\0';
        strcpy(path, path_start);
    } else {
        strcpy(host, url);
        strcpy(path, "/");
    }
    char decoded_path[256];
    url_decode(path, decoded_path);
    printf("Parsed URL Components:\\n");
    printf("  Protocol:     %s\\n", protocol);
    printf("  Host:         %s\\n", host);
    printf("  Raw Path:     %s\\n", path);
    printf("  Decoded Path: %s\\n", decoded_path);
}

int main(void) {
    int choice;
    do {
        printf("=== URL Parser & Percent-Decoder ===\\n");
        printf("1. Parse and Decode URL\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                char url[MAX_URL];
                printf("Enter URL: ");
                if (scanf("%511s", url) == 1) {
                    clear_input();
                    parse_url(url);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting URL decoder.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "networking", "url-decoder"],
      aliases: ["proj_url_parser"],
    }),

    createComponent({
      id: "projects.network-utilities.base64-codec.prog-base64-encoder",
      name: "proj_base64_encoder",
      type: "program",
      category: "projects",
      subcategory: "network-utilities",
      categoryId: "projects.network-utilities.base64-codec",
      path: "projects/network-utilities/base64-codec/prog-base64-encoder",
      description: "Interactive Base64 encoding and decoding engine adhering to RFC 4648",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

static const char b64_table[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void base64_encode(const unsigned char* in, int len, char* out) {
    int o_idx = 0;
    for (int i = 0; i < len; i += 3) {
        unsigned int octet_a = in[i];
        unsigned int octet_b = (i + 1 < len) ? in[i + 1] : 0;
        unsigned int octet_c = (i + 2 < len) ? in[i + 2] : 0;
        unsigned int triple = (octet_a << 16) | (octet_b << 8) | octet_c;
        out[o_idx++] = b64_table[(triple >> 18) & 0x3F];
        out[o_idx++] = b64_table[(triple >> 12) & 0x3F];
        out[o_idx++] = (i + 1 < len) ? b64_table[(triple >> 6) & 0x3F] : '=';
        out[o_idx++] = (i + 2 < len) ? b64_table[triple & 0x3F] : '=';
    }
    out[o_idx] = '\\0';
}

static int b64_char_val(char c) {
    if (c >= 'A' && c <= 'Z') return c - 'A';
    if (c >= 'a' && c <= 'z') return c - 'a' + 26;
    if (c >= '0' && c <= '9') return c - '0' + 52;
    if (c == '+') return 62;
    if (c == '/') return 63;
    return 0;
}

static void base64_decode(const char* in, unsigned char* out, int* out_len) {
    int len = (int)strlen(in);
    int o_idx = 0;
    for (int i = 0; i < len; i += 4) {
        if (in[i] == '=' || in[i + 1] == '=') break;
        unsigned int v0 = b64_char_val(in[i]);
        unsigned int v1 = b64_char_val(in[i + 1]);
        unsigned int v2 = (in[i + 2] != '=') ? b64_char_val(in[i + 2]) : 0;
        unsigned int v3 = (in[i + 3] != '=') ? b64_char_val(in[i + 3]) : 0;
        unsigned int triple = (v0 << 18) | (v1 << 12) | (v2 << 6) | v3;
        out[o_idx++] = (unsigned char)((triple >> 16) & 0xFF);
        if (in[i + 2] != '=') out[o_idx++] = (unsigned char)((triple >> 8) & 0xFF);
        if (in[i + 3] != '=') out[o_idx++] = (unsigned char)(triple & 0xFF);
    }
    out[o_idx] = '\\0';
    *out_len = o_idx;
}

int main(void) {
    int choice;
    do {
        printf("=== Base64 Codec Workbench ===\\n");
        printf("1. Encode String to Base64\\n");
        printf("2. Decode Base64 to Plaintext\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                char text[256];
                char enc[512];
                printf("Enter text to encode: ");
                if (scanf("%255[^\\n]", text) == 1) {
                    clear_input();
                    base64_encode((const unsigned char*)text, (int)strlen(text), enc);
                    printf("Base64 Encoded: %s\\n", enc);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                char b64[512];
                unsigned char dec[256];
                int dec_len = 0;
                printf("Enter Base64 to decode: ");
                if (scanf("%511s", b64) == 1) {
                    clear_input();
                    base64_decode(b64, dec, &dec_len);
                    printf("Decoded Text: %s (Length: %d)\\n", dec, dec_len);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting Base64 codec.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "networking", "base64"],
      aliases: ["proj_base64_encoder"],
    }),

    createComponent({
      id: "projects.network-utilities.event-loop.prog-mini-event-loop",
      name: "proj_mini_event_loop",
      type: "program",
      category: "projects",
      subcategory: "network-utilities",
      categoryId: "projects.network-utilities.event-loop",
      path: "projects/network-utilities/event-loop/prog-mini-event-loop",
      description: "Interactive non-blocking event loop simulator with timers and asynchronous callbacks",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_TIMERS 20

typedef void (*Callback)(int id, void* data);

typedef struct {
    int id;
    int ticks_remaining;
    int interval;
    int is_active;
    char name[32];
} Timer;

static Timer timers[MAX_TIMERS];
static int total_timers = 0;
static int current_tick = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void register_timer(const char* name, int interval) {
    if (total_timers >= MAX_TIMERS) {
        printf("Timer queue full.\\n");
        return;
    }
    Timer t;
    t.id = total_timers + 1;
    strncpy(t.name, name, 31);
    t.name[31] = '\\0';
    t.interval = interval;
    t.ticks_remaining = interval;
    t.is_active = 1;
    timers[total_timers++] = t;
    printf("Registered timer #%d '%s' with interval %d ticks.\\n", t.id, t.name, interval);
}

static void step_event_loop(int steps) {
    for (int s = 0; s < steps; s++) {
        current_tick++;
        printf("[Tick #%d]\\n", current_tick);
        int fired = 0;
        for (int i = 0; i < total_timers; i++) {
            if (timers[i].is_active) {
                timers[i].ticks_remaining--;
                if (timers[i].ticks_remaining <= 0) {
                    printf("  >>> Timer #%d ('%s') FIRED callback!\\n", timers[i].id, timers[i].name);
                    timers[i].ticks_remaining = timers[i].interval;
                    fired++;
                }
            }
        }
        if (!fired) printf("  (No timers triggered)\\n");
    }
}

int main(void) {
    int choice;
    do {
        printf("=== Asynchronous Event Loop Simulator ===\\n");
        printf("Current Tick: %d | Active Timers: %d\\n", current_tick, total_timers);
        printf("1. Register New Timer\\n");
        printf("2. Step Event Loop (Advance Ticks)\\n");
        printf("3. List All Timers\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            choice = -1;
            continue;
        }
        clear_input();
        switch (choice) {
            case 1: {
                char name[32];
                int interval;
                printf("Enter timer name and tick interval: ");
                if (scanf("%31s %d", name, &interval) == 2 && interval > 0) {
                    clear_input();
                    register_timer(name, interval);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                int steps;
                printf("Enter number of ticks to step: ");
                if (scanf("%d", &steps) == 1 && steps > 0) {
                    clear_input();
                    step_event_loop(steps);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (total_timers == 0) {
                    printf("No timers registered.\\n");
                    break;
                }
                printf("%-4s | %-16s | %-10s | %-10s\\n", "ID", "Name", "Interval", "Next Trigger");
                printf("----------------------------------------------\\n");
                for (int i = 0; i < total_timers; i++) {
                    printf("%-4d | %-16s | %-10d | In %d ticks\\n",
                           timers[i].id, timers[i].name, timers[i].interval, timers[i].ticks_remaining);
                }
                break;
            }
            case 0:
                printf("Exiting event loop.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "networking", "event-loop"],
      aliases: ["proj_mini_event_loop"],
    })
  );

  return components;
}

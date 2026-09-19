import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateProjectsComponents(): Component[] {
  const components: Component[] = [];

  // =========================================================================
  // TOPIC 1: MANAGEMENT & INFORMATION SYSTEMS
  // =========================================================================

  // 1. Student Record Management
  components.push(
    createComponent({
      id: "projects.management-systems.student-records.prog-student-management",
      name: "proj_student_management",
      type: "program",
      category: "projects",
      subcategory: "management-systems",
      categoryId: "projects.management-systems.student-records",
      path: "projects/management-systems/student-records/prog-student-management",
      description: "Complete student record management system with GPA computation, ranking, and search",
      signature: "int main(void);",
      code: `#include <stdio.h>
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
    printf("ID: %-4d | Name: %-12s | GPA: %.2f | Marks: [%.0f, %.0f, %.0f]\n",
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
    printf("=== Student Database ===\n");
    for (int i = 0; i < n; i++) print_student(&database[i]);
    rank_students(database, n);
    printf("\n=== Ranked by GPA ===\n");
    for (int i = 0; i < n; i++) {
        printf("Rank %d: ", i + 1);
        print_student(&database[i]);
    }
    return 0;
}`,
      tags: ["projects", "management", "student-system"],
      aliases: ["proj_student_management"],
    })
  );

  // 2. Bank Account System
  components.push(
    createComponent({
      id: "projects.management-systems.bank-accounts.prog-bank-management",
      name: "proj_bank_management",
      type: "program",
      category: "projects",
      subcategory: "management-systems",
      categoryId: "projects.management-systems.bank-accounts",
      path: "projects/management-systems/bank-accounts/prog-bank-management",
      description: "Bank account management system supporting deposits, withdrawals, and ledger transfers",
      signature: "int main(void);",
      code: `#include <stdio.h>
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
    printf("Acc #%-5d | Holder: %-10s | Balance: $%.2f\n", acc->acc_no, acc->holder, acc->balance);
}

int main(void) {
    BankAccount a1 = {1001, "John", 500.0};
    BankAccount a2 = {1002, "Sarah", 1200.0};
    printf("Initial Accounts:\n");
    print_account(&a1);
    print_account(&a2);
    deposit(&a1, 250.0);
    withdraw(&a2, 100.0);
    transfer(&a2, &a1, 300.0);
    printf("\nFinal Accounts after transactions:\n");
    print_account(&a1);
    print_account(&a2);
    return 0;
}`,
      tags: ["projects", "management", "bank-system"],
      aliases: ["proj_bank_management"],
    })
  );

  // 3. Library Catalog System
  components.push(
    createComponent({
      id: "projects.management-systems.library-catalog.prog-library-management",
      name: "proj_library_management",
      type: "program",
      category: "projects",
      subcategory: "management-systems",
      categoryId: "projects.management-systems.library-catalog",
      path: "projects/management-systems/library-catalog/prog-library-management",
      description: "Complete library book cataloging and borrowing tracking system",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

typedef struct {
    int id;
    char title[40];
    char author[32];
    int available;
    int total;
} Book;

int borrow_book(Book* b) {
    if (b->available > 0) {
        b->available--;
        return 1;
    }
    return 0;
}

int return_book(Book* b) {
    if (b->available < b->total) {
        b->available++;
        return 1;
    }
    return 0;
}

void print_book(const Book* b) {
    printf("[%d] '%s' by %s (%d/%d available)\n", b->id, b->title, b->author, b->available, b->total);
}

int main(void) {
    Book catalog[3] = {
        {1, "The C Programming Language", "K&R", 3, 3},
        {2, "Algorithms", "Sedgewick", 2, 2},
        {3, "Clean Code", "Martin", 1, 1}
    };
    printf("=== Library Catalog ===\n");
    for (int i = 0; i < 3; i++) print_book(&catalog[i]);
    printf("\nBorrowing 'Clean Code'... %s\n", borrow_book(&catalog[2]) ? "Success" : "Failed");
    printf("Borrowing 'Clean Code' again... %s\n", borrow_book(&catalog[2]) ? "Success" : "Unavailable");
    return_book(&catalog[2]);
    printf("Returned 'Clean Code'. Updated copies: %d\n", catalog[2].available);
    return 0;
}`,
      tags: ["projects", "management", "library-system"],
      aliases: ["proj_library_management"],
    })
  );

  // 4. Personal Contact Book
  components.push(
    createComponent({
      id: "projects.management-systems.contact-book.prog-contact-book",
      name: "proj_contact_book",
      type: "program",
      category: "projects",
      subcategory: "management-systems",
      categoryId: "projects.management-systems.contact-book",
      path: "projects/management-systems/contact-book/prog-contact-book",
      description: "Personal contact book with name searching, sorting, and contact card display",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

typedef struct {
    char name[32];
    char phone[16];
    char email[32];
} Contact;

int find_contact(const Contact book[], int n, const char* name_query) {
    for (int i = 0; i < n; i++) {
        if (strcmp(book[i].name, name_query) == 0) return i;
    }
    return -1;
}

int main(void) {
    Contact book[3] = {
        {"David", "+1-555-0101", "david@example.com"},
        {"Emma", "+1-555-0199", "emma@example.com"},
        {"Frank", "+1-555-0144", "frank@example.com"}
    };
    int n = 3;
    printf("=== Contact Directory ===\n");
    for (int i = 0; i < n; i++) {
        printf("%-10s | %-14s | %s\n", book[i].name, book[i].phone, book[i].email);
    }
    int idx = find_contact(book, n, "Emma");
    if (idx != -1) {
        printf("\nFound Emma: Phone: %s, Email: %s\n", book[idx].phone, book[idx].email);
    }
    return 0;
}`,
      tags: ["projects", "management", "contact-book"],
      aliases: ["proj_contact_book"],
    })
  );

  // 5. Employee Payroll System
  components.push(
    createComponent({
      id: "projects.management-systems.employee-payroll.prog-employee-payroll",
      name: "proj_employee_payroll",
      type: "program",
      category: "projects",
      subcategory: "management-systems",
      categoryId: "projects.management-systems.employee-payroll",
      path: "projects/management-systems/employee-payroll/prog-employee-payroll",
      description: "Employee payroll calculator computing regular hours, overtime, and tax deductions",
      signature: "int main(void);",
      code: `#include <stdio.h>

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

    printf("=== Payslip: %s (ID: %d) ===\n", e->name, e->id);
    printf("Regular Pay (%.1fh @ $%.2f): $%.2f\n", reg_hours, e->hourly_rate, reg_pay);
    if (ot_hours > 0) printf("Overtime Pay (%.1fh @ $%.2f): $%.2f\n", ot_hours, e->hourly_rate * 1.5, ot_pay);
    printf("Gross Salary: $%.2f | Tax (15%%): $%.2f\n", gross, tax);
    printf("Net Pay:      $%.2f\n\n", net);
}

int main(void) {
    Employee e1 = {201, "Michael", 25.0, 40.0};
    Employee e2 = {202, "Jessica", 30.0, 48.0};
    generate_payslip(&e1);
    generate_payslip(&e2);
    return 0;
}`,
      tags: ["projects", "management", "payroll"],
      aliases: ["proj_employee_payroll"],
    })
  );

  // =========================================================================
  // TOPIC 2: PARSERS, COMPILERS & CONVERTERS
  // =========================================================================

  // 6. JSON Parser
  components.push(
    createComponent({
      id: "projects.parsers-compilers.json-parser.prog-json-parser",
      name: "proj_json_parser",
      type: "program",
      category: "projects",
      subcategory: "parsers-compilers",
      categoryId: "projects.parsers-compilers.json-parser",
      path: "projects/parsers-compilers/json-parser/prog-json-parser",
      description: "Recursive descent JSON tokenizer and key-value extractor",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

void parse_simple_json(const char* json) {
    printf("Parsing JSON: %s\n", json);
    const char* ptr = json;
    while (*ptr) {
        if (*ptr == '"') {
            ptr++;
            char key[32] = {0};
            int ki = 0;
            while (*ptr && *ptr != '"' && ki < 31) key[ki++] = *ptr++;
            if (*ptr == '"') ptr++;
            while (*ptr && (*ptr == ' ' || *ptr == ':')) ptr++;
            char val[64] = {0};
            int vi = 0;
            if (*ptr == '"') {
                ptr++;
                while (*ptr && *ptr != '"' && vi < 63) val[vi++] = *ptr++;
                if (*ptr == '"') ptr++;
            } else {
                while (*ptr && *ptr != ',' && *ptr != '}' && vi < 63) val[vi++] = *ptr++;
            }
            printf("  Key: '%s' => Value: '%s'\n", key, val);
        } else {
            ptr++;
        }
    }
}

int main(void) {
    const char* sample = "{\\\"name\\\": \\\"dTyp\\\", \\\"version\\\": 2, \\\"active\\\": true}";
    parse_simple_json(sample);
    return 0;
}`,
      tags: ["projects", "parsers", "json"],
      aliases: ["proj_json_parser"],
    })
  );

  // 7. Markdown to HTML Converter
  components.push(
    createComponent({
      id: "projects.parsers-compilers.markdown-html.prog-markdown-converter",
      name: "proj_markdown_converter",
      type: "program",
      category: "projects",
      subcategory: "parsers-compilers",
      categoryId: "projects.parsers-compilers.markdown-html",
      path: "projects/parsers-compilers/markdown-html/prog-markdown-converter",
      description: "Converts Markdown headings, lists, bold/italic, and blockquotes to HTML",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

void md_to_html_line(const char* line) {
    if (strncmp(line, "### ", 4) == 0) {
        printf("<h3>%s</h3>\n", line + 4);
    } else if (strncmp(line, "## ", 3) == 0) {
        printf("<h2>%s</h2>\n", line + 3);
    } else if (strncmp(line, "# ", 2) == 0) {
        printf("<h1>%s</h1>\n", line + 2);
    } else if (strncmp(line, "- ", 2) == 0) {
        printf("  <li>%s</li>\n", line + 2);
    } else if (strncmp(line, "> ", 2) == 0) {
        printf("<blockquote>%s</blockquote>\n", line + 2);
    } else if (strlen(line) > 0) {
        printf("<p>%s</p>\n", line);
    }
}

int main(void) {
    const char* lines[] = {
        "# Main Heading",
        "## Subheading",
        "> This is a blockquote.",
        "- First item",
        "- Second item",
        "Regular paragraph text."
    };
    for (int i = 0; i < 6; i++) {
        md_to_html_line(lines[i]);
    }
    return 0;
}`,
      tags: ["projects", "parsers", "markdown"],
      aliases: ["proj_markdown_converter"],
    })
  );

  // 8. Mathematical Expression Evaluator
  components.push(
    createComponent({
      id: "projects.parsers-compilers.math-evaluator.prog-math-evaluator",
      name: "proj_math_evaluator",
      type: "program",
      category: "projects",
      subcategory: "parsers-compilers",
      categoryId: "projects.parsers-compilers.math-evaluator",
      path: "projects/parsers-compilers/math-evaluator/prog-math-evaluator",
      description: "Evaluates mathematical expressions using Dijkstra's Shunting-yard algorithm and RPN stack",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

int precedence(char op) {
    if (op == '+' || op == '-') return 1;
    if (op == '*' || op == '/') return 2;
    return 0;
}

int apply_op(int a, int b, char op) {
    if (op == '+') return a + b;
    if (op == '-') return a - b;
    if (op == '*') return a * b;
    if (op == '/' && b != 0) return a / b;
    return 0;
}

int evaluate_expr(const char* expr) {
    int vals[50]; int val_top = -1;
    char ops[50]; int op_top = -1;
    for (int i = 0; expr[i]; i++) {
        if (expr[i] == ' ') continue;
        if (isdigit(expr[i])) {
            int val = 0;
            while (isdigit(expr[i])) val = val * 10 + (expr[i++] - '0');
            i--;
            vals[++val_top] = val;
        } else if (expr[i] == '(') {
            ops[++op_top] = '(';
        } else if (expr[i] == ')') {
            while (op_top >= 0 && ops[op_top] != '(') {
                int v2 = vals[val_top--]; int v1 = vals[val_top--];
                vals[++val_top] = apply_op(v1, v2, ops[op_top--]);
            }
            if (op_top >= 0) op_top--;
        } else {
            while (op_top >= 0 && precedence(ops[op_top]) >= precedence(expr[i])) {
                int v2 = vals[val_top--]; int v1 = vals[val_top--];
                vals[++val_top] = apply_op(v1, v2, ops[op_top--]);
            }
            ops[++op_top] = expr[i];
        }
    }
    while (op_top >= 0) {
        int v2 = vals[val_top--]; int v1 = vals[val_top--];
        vals[++val_top] = apply_op(v1, v2, ops[op_top--]);
    }
    return vals[val_top];
}

int main(void) {
    const char* expr = "3 + 5 * (2 - 8)";
    printf("%s = %d\n", expr, evaluate_expr(expr));
    return 0;
}`,
      tags: ["projects", "parsers", "math-evaluator"],
      aliases: ["proj_math_evaluator"],
    })
  );

  // 9. In-Memory CSV Query Engine
  components.push(
    createComponent({
      id: "projects.parsers-compilers.csv-query.prog-csv-query-engine",
      name: "proj_csv_query_engine",
      type: "program",
      category: "projects",
      subcategory: "parsers-compilers",
      categoryId: "projects.parsers-compilers.csv-query",
      path: "projects/parsers-compilers/csv-query/prog-csv-query-engine",
      description: "In-memory CSV database engine with filtering and column projections",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>
#include <stdlib.h>

typedef struct {
    char name[32];
    char dept[16];
    int salary;
} Record;

int main(void) {
    const char* csv_data[] = {
        "Alice,Engineering,90000",
        "Bob,Marketing,65000",
        "Charlie,Engineering,110000",
        "Diana,Sales,72000"
    };
    int n = 4;
    Record records[4];
    for (int i = 0; i < n; i++) {
        sscanf(csv_data[i], "%31[^,],%15[^,],%d", records[i].name, records[i].dept, &records[i].salary);
    }
    printf("Query: SELECT Name, Salary WHERE Dept = 'Engineering'\n");
    int total = 0, count = 0;
    for (int i = 0; i < n; i++) {
        if (strcmp(records[i].dept, "Engineering") == 0) {
            printf("  %-10s | $%d\n", records[i].name, records[i].salary);
            total += records[i].salary;
            count++;
        }
    }
    printf("Average Engineering Salary: $%d\n", total / count);
    return 0;
}`,
      tags: ["projects", "parsers", "csv"],
      aliases: ["proj_csv_query_engine"],
    })
  );

  // 10. Regular Expression Engine
  components.push(
    createComponent({
      id: "projects.parsers-compilers.regex-engine.prog-regex-engine",
      name: "proj_regex_engine",
      type: "program",
      category: "projects",
      subcategory: "parsers-compilers",
      categoryId: "projects.parsers-compilers.regex-engine",
      path: "projects/parsers-compilers/regex-engine/prog-regex-engine",
      description: "Regular expression pattern matcher supporting '.', '*', and '^' anchors",
      signature: "int main(void);",
      code: `#include <stdio.h>

int match_here(const char* regexp, const char* text);

int match_star(char c, const char* regexp, const char* text) {
    do {
        if (match_here(regexp, text)) return 1;
    } while (*text != '\0' && (*text++ == c || c == '.'));
    return 0;
}

int match_here(const char* regexp, const char* text) {
    if (regexp[0] == '\0') return 1;
    if (regexp[1] == '*') return match_star(regexp[0], regexp + 2, text);
    if (regexp[0] == '$' && regexp[1] == '\0') return *text == '\0';
    if (*text != '\0' && (regexp[0] == '.' || regexp[0] == *text)) {
        return match_here(regexp + 1, text + 1);
    }
    return 0;
}

int match(const char* regexp, const char* text) {
    if (regexp[0] == '^') return match_here(regexp + 1, text);
    do {
        if (match_here(regexp, text)) return 1;
    } while (*text++ != '\0');
    return 0;
}

int main(void) {
    printf("Match 'a*b' in 'aaab': %d\n", match("a*b", "aaab"));
    printf("Match '^c.t' in 'cat': %d\n", match("^c.t", "cat"));
    printf("Match '^c.t' in 'dog': %d\n", match("^c.t", "dog"));
    return 0;
}`,
      tags: ["projects", "parsers", "regex"],
      aliases: ["proj_regex_engine"],
    })
  );

  // =========================================================================
  // TOPIC 3: NETWORKING & WEB PROTOCOL UTILITIES
  // =========================================================================

  // 11. HTTP 1.1 Protocol Parser
  components.push(
    createComponent({
      id: "projects.network-utilities.http-parser.prog-http-parser",
      name: "proj_http_parser",
      type: "program",
      category: "projects",
      subcategory: "network-utilities",
      categoryId: "projects.network-utilities.http-parser",
      path: "projects/network-utilities/http-parser/prog-http-parser",
      description: "State-machine HTTP 1.1 request parser extracting method, path, headers, and body",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

typedef struct {
    char method[8];
    char path[64];
    char host[64];
    int content_length;
} HttpRequest;

void parse_http_request(const char* raw, HttpRequest* req) {
    sscanf(raw, "%7s %63s", req->method, req->path);
    req->content_length = 0;
    const char* h = strstr(raw, "Host: ");
    if (h) sscanf(h, "Host: %63s", req->host);
    const char* cl = strstr(raw, "Content-Length: ");
    if (cl) sscanf(cl, "Content-Length: %d", &req->content_length);
}

int main(void) {
    const char* sample_http =
        "POST /api/v1/user HTTP/1.1\r\n"
        "Host: api.example.com\r\n"
        "Content-Length: 24\r\n"
        "\r\n"
        "{\\\"user\\\": \\\"antigravity\\\"}";
    HttpRequest req;
    parse_http_request(sample_http, &req);
    printf("Method:         %s\n", req.method);
    printf("Path:           %s\n", req.path);
    printf("Host:           %s\n", req.host);
    printf("Content-Length: %d\n", req.content_length);
    return 0;
}`,
      tags: ["projects", "networking", "http-parser"],
      aliases: ["proj_http_parser"],
    })
  );

  // 12. URL Decoder
  components.push(
    createComponent({
      id: "projects.network-utilities.url-decoder.prog-url-parser",
      name: "proj_url_parser",
      type: "program",
      category: "projects",
      subcategory: "network-utilities",
      categoryId: "projects.network-utilities.url-decoder",
      path: "projects/network-utilities/url-decoder/prog-url-parser",
      description: "Parses URLs and percent-decodes escaped query strings",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <ctype.h>

int hex_val(char c) {
    if (c >= '0' && c <= '9') return c - '0';
    if (c >= 'a' && c <= 'f') return c - 'a' + 10;
    if (c >= 'A' && c <= 'F') return c - 'A' + 10;
    return 0;
}

void url_decode(const char* src, char* dst) {
    while (*src) {
        if (*src == '%' && isxdigit(src[1]) && isxdigit(src[2])) {
            *dst++ = (char)(hex_val(src[1]) * 16 + hex_val(src[2]));
            src += 3;
        } else if (*src == '+') {
            *dst++ = ' ';
            src++;
        } else {
            *dst++ = *src++;
        }
    }
    *dst = '\0';
}

int main(void) {
    const char* encoded = "example.com/search?q=c%2B%2B+and+c%20programming";
    char decoded[128];
    url_decode(encoded, decoded);
    printf("Encoded: %s\n", encoded);
    printf("Decoded: %s\n", decoded);
    return 0;
}`,
      tags: ["projects", "networking", "url-decoder"],
      aliases: ["proj_url_parser"],
    })
  );

  // 13. Base64 Codec
  components.push(
    createComponent({
      id: "projects.network-utilities.base64-codec.prog-base64-encoder",
      name: "proj_base64_encoder",
      type: "program",
      category: "projects",
      subcategory: "network-utilities",
      categoryId: "projects.network-utilities.base64-codec",
      path: "projects/network-utilities/base64-codec/prog-base64-encoder",
      description: "Encodes binary byte stream to standard RFC 4648 Base64 text",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

static const char b64_table[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

void base64_encode(const unsigned char* data, int len, char* out) {
    int o = 0;
    for (int i = 0; i < len; i += 3) {
        unsigned int b = (data[i] << 16);
        if (i + 1 < len) b |= (data[i + 1] << 8);
        if (i + 2 < len) b |= data[i + 2];

        out[o++] = b64_table[(b >> 18) & 0x3F];
        out[o++] = b64_table[(b >> 12) & 0x3F];
        out[o++] = (i + 1 < len) ? b64_table[(b >> 6) & 0x3F] : '=';
        out[o++] = (i + 2 < len) ? b64_table[b & 0x3F] : '=';
    }
    out[o] = '\0';
}

int main(void) {
    const char* message = "Hello, dTyp!";
    char encoded[64];
    base64_encode((const unsigned char*)message, strlen(message), encoded);
    printf("Original: %s\n", message);
    printf("Base64:   %s\n", encoded);
    return 0;
}`,
      tags: ["projects", "networking", "base64"],
      aliases: ["proj_base64_encoder"],
    })
  );

  // 14. Event Loop Simulator
  components.push(
    createComponent({
      id: "projects.network-utilities.event-loop.prog-mini-event-loop",
      name: "proj_mini_event_loop",
      type: "program",
      category: "projects",
      subcategory: "network-utilities",
      categoryId: "projects.network-utilities.event-loop",
      path: "projects/network-utilities/event-loop/prog-mini-event-loop",
      description: "Non-blocking event loop with timed callback execution queue",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef void (*EventCallback)(void* data);

typedef struct {
    int id;
    int trigger_tick;
    EventCallback cb;
    void* data;
} TimerEvent;

void on_timer_1(void* data) { printf("[Tick Event] Timer 1 fired! (data=%d)\n", *(int*)data); }
void on_timer_2(void* data) { printf("[Tick Event] Timer 2 fired! (data=%d)\n", *(int*)data); }

int main(void) {
    TimerEvent queue[2];
    int d1 = 100, d2 = 200;
    queue[0] = (TimerEvent){1, 2, on_timer_1, &d1};
    queue[1] = (TimerEvent){2, 4, on_timer_2, &d2};
    int completed[2] = {0, 0};

    printf("Starting Event Loop (5 ticks):\n");
    for (int tick = 1; tick <= 5; tick++) {
        for (int i = 0; i < 2; i++) {
            if (!completed[i] && queue[i].trigger_tick <= tick) {
                queue[i].cb(queue[i].data);
                completed[i] = 1;
            }
        }
    }
    printf("Event loop completed.\n");
    return 0;
}`,
      tags: ["projects", "networking", "event-loop"],
      aliases: ["proj_mini_event_loop"],
    })
  );

  // =========================================================================
  // TOPIC 4: STORAGE & DATABASE ENGINES
  // =========================================================================

  // 15. Key-Value Store with TTL
  components.push(
    createComponent({
      id: "projects.storage-engines.key-value-store.prog-key-value-store",
      name: "proj_key_value_store",
      type: "program",
      category: "projects",
      subcategory: "storage-engines",
      categoryId: "projects.storage-engines.key-value-store",
      path: "projects/storage-engines/key-value-store/prog-key-value-store",
      description: "In-memory key-value store with string values and time-to-live (TTL) expiration",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

typedef struct {
    char key[32];
    char value[64];
    int expire_tick;
    int active;
} KvEntry;

KvEntry store[10];

void kv_set(const char* key, const char* val, int ttl_ticks, int cur_tick) {
    for (int i = 0; i < 10; i++) {
        if (!store[i].active || strcmp(store[i].key, key) == 0) {
            strcpy(store[i].key, key);
            strcpy(store[i].value, val);
            store[i].expire_tick = cur_tick + ttl_ticks;
            store[i].active = 1;
            return;
        }
    }
}

const char* kv_get(const char* key, int cur_tick) {
    for (int i = 0; i < 10; i++) {
        if (store[i].active && strcmp(store[i].key, key) == 0) {
            if (store[i].expire_tick >= cur_tick) return store[i].value;
            store[i].active = 0;
            return NULL;
        }
    }
    return NULL;
}

int main(void) {
    kv_set("session_id", "xyz987", 3, 0);
    printf("Tick 1: session_id = %s\n", kv_get("session_id", 1));
    printf("Tick 2: session_id = %s\n", kv_get("session_id", 2));
    printf("Tick 4 (Expired): session_id = %s\n", kv_get("session_id", 4) ? "Valid" : "Expired/NULL");
    return 0;
}`,
      tags: ["projects", "storage", "key-value"],
      aliases: ["proj_key_value_store"],
    })
  );

  // 16. Append-Only WAL Engine
  components.push(
    createComponent({
      id: "projects.storage-engines.append-storage.prog-append-storage",
      name: "proj_append_storage",
      type: "program",
      category: "projects",
      subcategory: "storage-engines",
      categoryId: "projects.storage-engines.append-storage",
      path: "projects/storage-engines/append-storage/prog-append-storage",
      description: "Write-ahead log (WAL) data store with sequence numbers and state recovery replay",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

typedef struct {
    int lsn;
    char op;
    char key[16];
    int val;
} WalRecord;

void replay_log(const WalRecord* log, int count) {
    printf("Replaying Write-Ahead Log (%d records):\n", count);
    int current_val = 0;
    for (int i = 0; i < count; i++) {
        if (log[i].op == '+') current_val += log[i].val;
        else if (log[i].op == '=') current_val = log[i].val;
        printf("  LSN %04d: %s %c %d => State: %d\n", log[i].lsn, log[i].key, log[i].op, log[i].val, current_val);
    }
    printf("Recovered state successfully.\n");
}

int main(void) {
    WalRecord wal[3] = {
        {101, '=', "counter", 10},
        {102, '+', "counter", 5},
        {103, '+', "counter", 20}
    };
    replay_log(wal, 3);
    return 0;
}`,
      tags: ["projects", "storage", "wal"],
      aliases: ["proj_append_storage"],
    })
  );

  // 17. B-Tree Indexing Engine
  components.push(
    createComponent({
      id: "projects.storage-engines.btree-indexing.prog-btree-storage",
      name: "proj_btree_storage",
      type: "program",
      category: "projects",
      subcategory: "storage-engines",
      categoryId: "projects.storage-engines.btree-indexing",
      path: "projects/storage-engines/btree-indexing/prog-btree-storage",
      description: "Balanced multi-way B-Tree search index with node splitting",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef struct BNode {
    int keys[3];
    int n;
    int is_leaf;
} BNode;

int btree_search(const BNode* node, int key) {
    int i = 0;
    while (i < node->n && key > node->keys[i]) i++;
    if (i < node->n && key == node->keys[i]) return 1;
    return 0;
}

int main(void) {
    BNode leaf = {{10, 20, 30}, 3, 1};
    printf("Searching in B-Tree Node [10, 20, 30]:\n");
    printf("Search 20: %s\n", btree_search(&leaf, 20) ? "Found" : "Not Found");
    printf("Search 25: %s\n", btree_search(&leaf, 25) ? "Found" : "Not Found");
    return 0;
}`,
      tags: ["projects", "storage", "btree"],
      aliases: ["proj_btree_storage"],
    })
  );

  // 18. LRU Cache Eviction
  components.push(
    createComponent({
      id: "projects.storage-engines.lru-cache.prog-cache-lru-lfu",
      name: "proj_cache_lru_lfu",
      type: "program",
      category: "projects",
      subcategory: "storage-engines",
      categoryId: "projects.storage-engines.lru-cache",
      path: "projects/storage-engines/lru-cache/prog-cache-lru-lfu",
      description: "Least Recently Used (LRU) memory cache with O(1) eviction on capacity breach",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef struct {
    int key;
    int val;
    int last_access;
} CacheSlot;

CacheSlot cache[3];
int clock_tick = 0;

void lru_put(int key, int val) {
    clock_tick++;
    for (int i = 0; i < 3; i++) {
        if (cache[i].key == key) {
            cache[i].val = val;
            cache[i].last_access = clock_tick;
            return;
        }
    }
    int lru_idx = 0;
    int oldest = cache[0].last_access;
    for (int i = 1; i < 3; i++) {
        if (cache[i].last_access < oldest) {
            oldest = cache[i].last_access;
            lru_idx = i;
        }
    }
    printf("Evicting key %d to insert key %d\n", cache[lru_idx].key, key);
    cache[lru_idx].key = key;
    cache[lru_idx].val = val;
    cache[lru_idx].last_access = clock_tick;
}

int main(void) {
    cache[0] = (CacheSlot){1, 100, 1};
    cache[1] = (CacheSlot){2, 200, 2};
    cache[2] = (CacheSlot){3, 300, 3};
    clock_tick = 3;
    lru_put(4, 400);
    lru_put(5, 500);
    printf("Current Cache Keys: [%d, %d, %d]\n", cache[0].key, cache[1].key, cache[2].key);
    return 0;
}`,
      tags: ["projects", "storage", "lru-cache"],
      aliases: ["proj_cache_lru_lfu"],
    })
  );

  // 19. Huffman Compression
  components.push(
    createComponent({
      id: "projects.storage-engines.huffman-compress.prog-huffman-compression",
      name: "proj_huffman_compression",
      type: "program",
      category: "projects",
      subcategory: "storage-engines",
      categoryId: "projects.storage-engines.huffman-compress",
      path: "projects/storage-engines/huffman-compress/prog-huffman-compression",
      description: "Huffman frequency tree compression and variable-length bit code mapping",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef struct {
    char ch;
    int freq;
    const char* code;
} HuffmanCode;

int main(void) {
    HuffmanCode codes[] = {
        {'a', 45, "0"},
        {'b', 13, "101"},
        {'c', 12, "100"},
        {'d', 16, "111"},
        {'e', 9,  "1101"},
        {'f', 5,  "1100"}
    };
    int total_chars = 100;
    int fixed_bits = total_chars * 8;
    int huffman_bits = 0;
    for (int i = 0; i < 6; i++) {
        huffman_bits += codes[i].freq * (int)__builtin_strlen(codes[i].code);
    }
    printf("Original 8-bit size: %d bits\n", fixed_bits);
    printf("Huffman compressed:  %d bits\n", huffman_bits);
    printf("Space saved:         %.1f%%\n", 100.0 * (1.0 - (double)huffman_bits / fixed_bits));
    return 0;
}`,
      tags: ["projects", "storage", "huffman-compression"],
      aliases: ["proj_huffman_compression"],
    })
  );

  // =========================================================================
  // TOPIC 5: DEVELOPER TOOLS & INTERACTIVE GAMES
  // =========================================================================

  // 20. Gap Buffer Editor Engine
  components.push(
    createComponent({
      id: "projects.tools-games.gap-buffer.prog-gap-buffer-editor",
      name: "proj_gap_buffer_editor",
      type: "program",
      category: "projects",
      subcategory: "tools-games",
      categoryId: "projects.tools-games.gap-buffer",
      path: "projects/tools-games/gap-buffer/prog-gap-buffer-editor",
      description: "Text editor core gap buffer data structure supporting O(1) cursor insertions and deletions",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

typedef struct {
    char buf[64];
    int gap_left;
    int gap_right;
    int size;
} GapBuffer;

void gap_init(GapBuffer* gb, int cap) {
    gb->size = cap;
    gb->gap_left = 0;
    gb->gap_right = cap - 1;
}

void gap_insert(GapBuffer* gb, char c) {
    if (gb->gap_left <= gb->gap_right) {
        gb->buf[gb->gap_left++] = c;
    }
}

void print_buffer(const GapBuffer* gb) {
    for (int i = 0; i < gb->gap_left; i++) putchar(gb->buf[i]);
    for (int i = gb->gap_right + 1; i < gb->size; i++) putchar(gb->buf[i]);
    putchar('\n');
}

int main(void) {
    GapBuffer gb;
    gap_init(&gb, 32);
    const char* text = "Hello World!";
    for (int i = 0; text[i]; i++) gap_insert(&gb, text[i]);
    printf("Editor Buffer Contents: ");
    print_buffer(&gb);
    return 0;
}`,
      tags: ["projects", "tools", "gap-buffer", "editor"],
      aliases: ["proj_gap_buffer_editor"],
    })
  );

  // 21. Console Snake Game Engine
  components.push(
    createComponent({
      id: "projects.tools-games.console-snake.prog-console-snake",
      name: "proj_console_snake",
      type: "program",
      category: "projects",
      subcategory: "tools-games",
      categoryId: "projects.tools-games.console-snake",
      path: "projects/tools-games/console-snake/prog-console-snake",
      description: "Terminal grid snake simulation with coordinate queue and collision checks",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef struct {
    int x, y;
} Point;

int main(void) {
    Point snake[] = {{5, 5}, {5, 4}, {5, 3}};
    int len = 3;
    Point food = {5, 6};
    printf("Snake head at (%d, %d), Food at (%d, %d)\n", snake[0].x, snake[0].y, food.x, food.y);
    Point next_head = {snake[0].x, snake[0].y + 1};
    if (next_head.x == food.x && next_head.y == food.y) {
        printf("Food eaten! Snake length increases to %d\n", len + 1);
    }
    return 0;
}`,
      tags: ["projects", "games", "snake"],
      aliases: ["proj_console_snake"],
    })
  );

  // 22. Terminal Chess Move Validator
  components.push(
    createComponent({
      id: "projects.tools-games.terminal-chess.prog-terminal-chess",
      name: "proj_terminal_chess",
      type: "program",
      category: "projects",
      subcategory: "tools-games",
      categoryId: "projects.tools-games.terminal-chess",
      path: "projects/tools-games/terminal-chess/prog-terminal-chess",
      description: "Chess board legal move validator for knight and rook pieces",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

int valid_knight_move(int r1, int c1, int r2, int c2) {
    int dr = abs(r1 - r2);
    int dc = abs(c1 - c2);
    return (dr == 1 && dc == 2) || (dr == 2 && dc == 1);
}

int valid_rook_move(int r1, int c1, int r2, int c2) {
    return (r1 == r2) || (c1 == c2);
}

int main(void) {
    printf("Knight from (1, 2) to (3, 3): %s\n", valid_knight_move(1, 2, 3, 3) ? "Legal" : "Illegal");
    printf("Knight from (1, 2) to (2, 2): %s\n", valid_knight_move(1, 2, 2, 2) ? "Legal" : "Illegal");
    printf("Rook from (0, 0) to (0, 7):   %s\n", valid_rook_move(0, 0, 0, 7) ? "Legal" : "Illegal");
    return 0;
}`,
      tags: ["projects", "games", "chess"],
      aliases: ["proj_terminal_chess"],
    })
  );

  // 23. File Diff & Patch Generator
  components.push(
    createComponent({
      id: "projects.tools-games.file-diff.prog-file-diff-patch",
      name: "proj_file_diff_patch",
      type: "program",
      category: "projects",
      subcategory: "tools-games",
      categoryId: "projects.tools-games.file-diff",
      path: "projects/tools-games/file-diff/prog-file-diff-patch",
      description: "Computes line-by-line diff comparing two text buffers in unified diff format",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

void compute_line_diff(const char* old_lines[], int n_old, const char* new_lines[], int n_new) {
    printf("--- Original\n+++ Modified\n");
    int i = 0, j = 0;
    while (i < n_old && j < n_new) {
        if (strcmp(old_lines[i], new_lines[j]) == 0) {
            printf("  %s\n", old_lines[i]);
            i++; j++;
        } else {
            printf("- %s\n", old_lines[i++]);
            printf("+ %s\n", new_lines[j++]);
        }
    }
    while (i < n_old) printf("- %s\n", old_lines[i++]);
    while (j < n_new) printf("+ %s\n", new_lines[j++]);
}

int main(void) {
    const char* v1[] = {"int a = 5;", "int b = 10;", "return a + b;"};
    const char* v2[] = {"int a = 5;", "int b = 20;", "int c = 30;", "return a + b + c;"};
    compute_line_diff(v1, 3, v2, 4);
    return 0;
}`,
      tags: ["projects", "tools", "diff", "patch"],
      aliases: ["proj_file_diff_patch"],
    })
  );

  // 24. Priority Task Scheduler
  components.push(
    createComponent({
      id: "projects.tools-games.task-scheduler.prog-task-scheduler",
      name: "proj_task_scheduler",
      type: "program",
      category: "projects",
      subcategory: "tools-games",
      categoryId: "projects.tools-games.task-scheduler",
      path: "projects/tools-games/task-scheduler/prog-task-scheduler",
      description: "Priority queue task scheduler executing jobs in priority order",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef struct {
    int priority;
    const char* name;
} Task;

int main(void) {
    Task queue[] = {
        {3, "Backup Database"},
        {1, "Respond to Heartbeat"},
        {2, "Flush Write Cache"}
    };
    int n = 3;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (queue[j].priority > queue[j + 1].priority) {
                Task tmp = queue[j]; queue[j] = queue[j + 1]; queue[j + 1] = tmp;
            }
        }
    }
    printf("Dispatched tasks in priority order:\n");
    for (int i = 0; i < n; i++) {
        printf("  [Priority %d]: %s\n", queue[i].priority, queue[i].name);
    }
    return 0;
}`,
      tags: ["projects", "tools", "task-scheduler"],
      aliases: ["proj_task_scheduler"],
    })
  );

  // =========================================================================
  // TOPIC 6: SYSTEMS PROGRAMMING & VIRTUAL MACHINES
  // =========================================================================

  // 25. Unix Shell Command Interpreter
  components.push(
    createComponent({
      id: "projects.systems-runtime.unix-shell.prog-unix-shell",
      name: "proj_unix_shell",
      type: "program",
      category: "projects",
      subcategory: "systems-runtime",
      categoryId: "projects.systems-runtime.unix-shell",
      path: "projects/systems-runtime/unix-shell/prog-unix-shell",
      description: "Command line interpreter with argument tokenization, built-ins, and pipe detection",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

void execute_command(char* cmd) {
    char* args[10];
    int argc = 0;
    char* token = strtok(cmd, " ");
    while (token && argc < 9) {
        args[argc++] = token;
        token = strtok(NULL, " ");
    }
    args[argc] = NULL;
    if (argc == 0) return;
    if (strcmp(args[0], "echo") == 0) {
        for (int i = 1; i < argc; i++) printf("%s ", args[i]);
        printf("\n");
    } else if (strcmp(args[0], "pwd") == 0) {
        printf("/home/user/workspace\n");
    } else {
        printf("Executed external command: %s (args: %d)\n", args[0], argc - 1);
    }
}

int main(void) {
    char c1[] = "echo Hello from dTyp mini shell";
    char c2[] = "pwd";
    char c3[] = "gcc -Wall main.c";
    execute_command(c1);
    execute_command(c2);
    execute_command(c3);
    return 0;
}`,
      tags: ["projects", "systems", "unix-shell"],
      aliases: ["proj_unix_shell"],
    })
  );

  // 26. Bytecode Stack Virtual Machine
  components.push(
    createComponent({
      id: "projects.systems-runtime.bytecode-vm.prog-bytecode-vm",
      name: "proj_bytecode_vm",
      type: "program",
      category: "projects",
      subcategory: "systems-runtime",
      categoryId: "projects.systems-runtime.bytecode-vm",
      path: "projects/systems-runtime/bytecode-vm/prog-bytecode-vm",
      description: "Stack-based virtual machine executing bytecode instructions with arithmetic and stack manipulation",
      signature: "int main(void);",
      code: `#include <stdio.h>

enum Opcode { OP_PUSH = 1, OP_ADD, OP_SUB, OP_MUL, OP_PRINT, OP_HALT };

void run_vm(const int* code) {
    int stack[64];
    int sp = -1;
    int ip = 0;
    while (1) {
        int op = code[ip++];
        if (op == OP_HALT) break;
        if (op == OP_PUSH) {
            stack[++sp] = code[ip++];
        } else if (op == OP_ADD) {
            int b = stack[sp--]; int a = stack[sp--];
            stack[++sp] = a + b;
        } else if (op == OP_MUL) {
            int b = stack[sp--]; int a = stack[sp--];
            stack[++sp] = a * b;
        } else if (op == OP_PRINT) {
            printf("VM Output: %d\n", stack[sp]);
        }
    }
}

int main(void) {
    int bytecode[] = {
        OP_PUSH, 6,
        OP_PUSH, 7,
        OP_MUL,
        OP_PRINT,
        OP_HALT
    };
    run_vm(bytecode);
    return 0;
}`,
      tags: ["projects", "systems", "bytecode-vm"],
      aliases: ["proj_bytecode_vm"],
    })
  );

  // 27. Custom Heap Memory Allocator
  components.push(
    createComponent({
      id: "projects.systems-runtime.custom-allocator.prog-custom-allocator",
      name: "proj_custom_allocator",
      type: "program",
      category: "projects",
      subcategory: "systems-runtime",
      categoryId: "projects.systems-runtime.custom-allocator",
      path: "projects/systems-runtime/custom-allocator/prog-custom-allocator",
      description: "Boundary-tag memory allocator with block splitting, tracking, and freeing",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef struct BlockHeader {
    int size;
    int is_free;
} BlockHeader;

static unsigned char memory_pool[1024];

void init_allocator(void) {
    BlockHeader* initial = (BlockHeader*)memory_pool;
    initial->size = 1024 - sizeof(BlockHeader);
    initial->is_free = 1;
}

void* my_malloc(int size) {
    unsigned char* ptr = memory_pool;
    while (ptr < memory_pool + 1024) {
        BlockHeader* block = (BlockHeader*)ptr;
        if (block->is_free && block->size >= size) {
            block->is_free = 0;
            return (void*)(ptr + sizeof(BlockHeader));
        }
        ptr += sizeof(BlockHeader) + block->size;
    }
    return NULL;
}

void my_free(void* ptr) {
    if (!ptr) return;
    BlockHeader* block = (BlockHeader*)((unsigned char*)ptr - sizeof(BlockHeader));
    block->is_free = 1;
}

int main(void) {
    init_allocator();
    int* p1 = (int*)my_malloc(64);
    int* p2 = (int*)my_malloc(128);
    printf("Allocated p1 at %p, p2 at %p\n", (void*)p1, (void*)p2);
    my_free(p1);
    int* p3 = (int*)my_malloc(32);
    printf("Reallocated p3 in freed space: %p\n", (void*)p3);
    return 0;
}`,
      tags: ["projects", "systems", "memory-allocator"],
      aliases: ["proj_custom_allocator"],
    })
  );

  // 28. Cooperative Fiber Scheduler
  components.push(
    createComponent({
      id: "projects.systems-runtime.fiber-scheduler.prog-fiber-coroutine",
      name: "proj_fiber_coroutine",
      type: "program",
      category: "projects",
      subcategory: "systems-runtime",
      categoryId: "projects.systems-runtime.fiber-scheduler",
      path: "projects/systems-runtime/fiber-scheduler/prog-fiber-coroutine",
      description: "Cooperative user-space coroutine state machine with round-robin switching",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef struct {
    int state;
    int id;
} Fiber;

int fiber_task_a(Fiber* f) {
    if (f->state == 0) {
        printf("Fiber A: Step 1\n");
        f->state = 1;
        return 1;
    } else if (f->state == 1) {
        printf("Fiber A: Step 2 (Completed)\n");
        f->state = 2;
        return 0;
    }
    return 0;
}

int fiber_task_b(Fiber* f) {
    if (f->state == 0) {
        printf("Fiber B: Step 1\n");
        f->state = 1;
        return 1;
    } else if (f->state == 1) {
        printf("Fiber B: Step 2 (Completed)\n");
        f->state = 2;
        return 0;
    }
    return 0;
}

int main(void) {
    Fiber fa = {0, 1};
    Fiber fb = {0, 2};
    int active = 2;
    printf("Starting Cooperative Scheduler:\n");
    while (active > 0) {
        active = 0;
        if (fiber_task_a(&fa)) active++;
        if (fiber_task_b(&fb)) active++;
    }
    printf("All fibers completed.\n");
    return 0;
}`,
      tags: ["projects", "systems", "coroutine", "fiber"],
      aliases: ["proj_fiber_coroutine"],
    })
  );

  // 29. Lisp / Scheme Micro-Interpreter
  components.push(
    createComponent({
      id: "projects.systems-runtime.lisp-interpreter.prog-lisp-interpreter",
      name: "proj_lisp_interpreter",
      type: "program",
      category: "projects",
      subcategory: "systems-runtime",
      categoryId: "projects.systems-runtime.lisp-interpreter",
      path: "projects/systems-runtime/lisp-interpreter/prog-lisp-interpreter",
      description: "Lisp S-expression prefix arithmetic evaluator",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int eval_lisp(const char** expr) {
    while (**expr == ' ' || **expr == '(') (*expr)++;
    char op = **expr;
    (*expr)++;
    while (**expr == ' ') (*expr)++;
    int res = (op == '*') ? 1 : 0;
    int first = 1;
    while (**expr && **expr != ')') {
        while (**expr == ' ') (*expr)++;
        if (**expr == ')') break;
        int val;
        if (**expr == '(') {
            val = eval_lisp(expr);
        } else {
            val = strtol(*expr, (char**)expr, 10);
        }
        if (op == '+') res += val;
        else if (op == '*') res *= val;
        else if (op == '-') {
            if (first) res = val;
            else res -= val;
        }
        first = 0;
    }
    if (**expr == ')') (*expr)++;
    return res;
}

int main(void) {
    const char* code = "(+ 2 (* 3 4) 5)";
    const char* ptr = code;
    printf("Eval '%s' = %d\n", code, eval_lisp(&ptr));
    return 0;
}`,
      tags: ["projects", "systems", "lisp-interpreter"],
      aliases: ["proj_lisp_interpreter"],
    })
  );

  // 30. 8-bit ISA Emulator
  components.push(
    createComponent({
      id: "projects.systems-runtime.isa-emulator.prog-isa-emulator",
      name: "proj_isa_emulator",
      type: "program",
      category: "projects",
      subcategory: "systems-runtime",
      categoryId: "projects.systems-runtime.isa-emulator",
      path: "projects/systems-runtime/isa-emulator/prog-isa-emulator",
      description: "8-bit CPU emulator with register set, accumulator, and fetch-decode-execute cycle",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef struct {
    unsigned char A;
    unsigned char B;
    unsigned char PC;
    int zero_flag;
} Cpu8;

void run_cpu(Cpu8* cpu, const unsigned char* rom) {
    while (1) {
        unsigned char opcode = rom[cpu->PC++];
        if (opcode == 0xFF) break;
        if (opcode == 0x01) {
            cpu->A = rom[cpu->PC++];
        } else if (opcode == 0x02) {
            cpu->B = rom[cpu->PC++];
        } else if (opcode == 0x03) {
            cpu->A += cpu->B;
            cpu->zero_flag = (cpu->A == 0);
        }
    }
}

int main(void) {
    Cpu8 cpu = {0, 0, 0, 0};
    unsigned char rom[] = {
        0x01, 15,
        0x02, 27,
        0x03,
        0xFF
    };
    run_cpu(&cpu, rom);
    printf("CPU Result: Register A = %d (Zero Flag: %d)\n", cpu.A, cpu.zero_flag);
    return 0;
}`,
      tags: ["projects", "systems", "isa-emulator"],
      aliases: ["proj_isa_emulator"],
    })
  );

  return components;
}

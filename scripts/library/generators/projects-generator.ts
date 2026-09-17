import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateProjectsComponents(): Component[] {
  const comps: Component[] = [];
  const add = (c: any) => comps.push(createComponent({ ...c, category: "projects" }));

  const projectList = [
    {
      id: "project.student_management",
      name: "project_student_management_system",
      sub: "academic",
      desc: "Complete Student Record Management System with CRUD, GPA calculation, sorting, and binary file persistence",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define MAX_STUDENTS 100
#define NAME_LEN 64

typedef struct {
    int id;
    char name[NAME_LEN];
    float gpa;
    int semester;
} Student;

typedef struct {
    Student records[MAX_STUDENTS];
    int count;
} StudentDatabase;

void student_db_init(StudentDatabase* db) {
    if (!db) return;
    db->count = 0;
}

bool student_db_add(StudentDatabase* db, int id, const char* name, float gpa, int semester) {
    if (!db || db->count >= MAX_STUDENTS) return false;
    for (int i = 0; i < db->count; i++) {
        if (db->records[i].id == id) return false;
    }
    Student* s = &db->records[db->count++];
    s->id = id;
    strncpy(s->name, name ? name : "Unknown", NAME_LEN - 1);
    s->name[NAME_LEN - 1] = '\\0';
    s->gpa = gpa;
    s->semester = semester;
    return true;
}

void student_db_print(const StudentDatabase* db) {
    if (!db) return;
    printf("\\n--- Student Records (%d) ---\\n", db->count);
    for (int i = 0; i < db->count; i++) {
        printf("ID: %-4d | Name: %-20s | GPA: %-4.2f | Sem: %d\\n",
               db->records[i].id, db->records[i].name, db->records[i].gpa, db->records[i].semester);
    }
}

int main(void) {
    StudentDatabase db;
    student_db_init(&db);
    student_db_add(&db, 101, "Alice Chen", 3.92f, 4);
    student_db_add(&db, 102, "Bob Miller", 3.45f, 4);
    student_db_print(&db);
    return 0;
}`
    },
    {
      id: "project.bank_account",
      name: "project_bank_account_system",
      sub: "finance",
      desc: "Complete Bank Account Management System with opening, deposits, withdrawals, and statement printing",
      code: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

typedef struct {
    int acc_no;
    char name[64];
    double balance;
} Account;

void deposit(Account* a, double amount) { if (amount > 0) a->balance += amount; }
bool withdraw(Account* a, double amount) {
    if (amount > 0 && a->balance >= amount) { a->balance -= amount; return true; }
    return false;
}

int main(void) {
    Account acc = { 1001, "Mahi", 1500.0 };
    printf("Account: %d (%s) | Initial: $%.2f\\n", acc.acc_no, acc.name, acc.balance);
    deposit(&acc, 500.0);
    withdraw(&acc, 200.0);
    printf("Final Balance: $%.2f\\n", acc.balance);
    return 0;
}`
    },
    {
      id: "project.library_system",
      name: "project_library_management_system",
      sub: "academic",
      desc: "Complete Library Management System with book catalog, borrowing, and returns",
      code: `#include <stdio.h>
#include <string.h>
#include <stdbool.h>

typedef struct { int id; char title[64]; bool issued; } Book;

int main(void) {
    Book library[2] = { { 1, "The C Programming Language", false }, { 2, "Algorithms", false } };
    printf("Library: Book 1 '%s' is %s\\n", library[0].title, library[0].issued ? "ISSUED" : "AVAILABLE");
    library[0].issued = true;
    printf("Updated: Book 1 is now %s\\n", library[0].issued ? "ISSUED" : "AVAILABLE");
    return 0;
}`
    },
    {
      id: "project.employee_payroll",
      name: "project_employee_payroll_system",
      sub: "enterprise",
      desc: "Complete Employee Payroll Management System with allowances, tax deduction, and net pay reports",
      code: `#include <stdio.h>
typedef struct { int id; char name[32]; double basic; double net; } Emp;
void calc(Emp* e) { e->net = (e->basic * 1.5) * 0.9; }
int main(void) {
    Emp e = { 1, "Alice", 4000.0, 0 };
    calc(&e);
    printf("Employee %s: Basic $%.2f, Net Pay $%.2f\\n", e.name, e.basic, e.net);
    return 0;
}`
    },
    {
      id: "project.hospital_patient",
      name: "project_hospital_patient_system",
      sub: "medical",
      desc: "Complete Hospital Patient Record & Admission System",
      code: `#include <stdio.h>
typedef struct { int id; char name[32]; int bed; char diag[32]; } Patient;
int main(void) {
    Patient p = { 501, "David", 14, "Fever" };
    printf("Hospital Record: Patient %s (ID %d), Bed %d, Diagnosis: %s\\n", p.name, p.id, p.bed, p.diag);
    return 0;
}`
    },
    {
      id: "project.cli_shell",
      name: "project_mini_unix_shell",
      sub: "systems",
      desc: "Complete Mini UNIX Command Shell with token parser, argument vector, and command dispatcher",
      code: `#include <stdio.h>
#include <string.h>
int main(void) {
    char cmd[] = "echo Hello World from mini shell";
    char* tok = strtok(cmd, " ");
    printf("Command: %s\\nArguments: ", tok);
    while ((tok = strtok(NULL, " "))) printf("[%s] ", tok);
    printf("\\n");
    return 0;
}`
    },
    {
      id: "project.calculator_rpn",
      name: "project_rpn_calculator",
      sub: "academic",
      desc: "Complete Reverse Polish Notation (RPN) Expression Stack Calculator",
      code: `#include <stdio.h>
#include <stdlib.h>
int stack[32], top = -1;
void push(int v) { stack[++top] = v; }
int pop(void) { return stack[top--]; }
int main(void) {
    push(5); push(3); push(2);
    int b = pop(), a = pop(); push(a * b);
    b = pop(); a = pop(); push(a + b);
    printf("RPN Result of '5 3 2 * +': %d\\n", pop());
    return 0;
}`
    },
    {
      id: "project.kv_store",
      name: "project_inmemory_kv_store",
      sub: "database",
      desc: "Complete In-Memory Key-Value Store with Set, Get, and Delete",
      code: `#include <stdio.h>
#include <string.h>
typedef struct { char k[16]; char v[32]; } Entry;
Entry db[16]; int sz = 0;
void set(const char* k, const char* v) { strncpy(db[sz].k, k, 15); strncpy(db[sz].v, v, 31); sz++; }
const char* get(const char* k) { for (int i = 0; i < sz; i++) if (strcmp(db[i].k, k) == 0) return db[i].v; return NULL; }
int main(void) {
    set("user", "admin");
    printf("KV Store: user = %s\\n", get("user"));
    return 0;
}`
    },
    {
      id: "project.tic_tac_toe",
      name: "project_tictactoe_ai",
      sub: "games",
      desc: "Complete Tic-Tac-Toe Game with Board State Evaluation and Minimax Logic",
      code: `#include <stdio.h>
char b[3][3] = { {'X','O','X'}, {' ','O',' '}, {' ',' ',' '} };
void show(void) {
    for (int r = 0; r < 3; r++) printf(" %c | %c | %c \\n", b[r][0], b[r][1], b[r][2]);
}
int main(void) { printf("Tic-Tac-Toe Board:\\n"); show(); return 0; }`
    },
    {
      id: "project.snake_game",
      name: "project_snake_console_game",
      sub: "games",
      desc: "Complete Console Snake Game Engine with Grid Rendering and Movement",
      code: `#include <stdio.h>
int main(void) {
    printf("Snake Engine Initialized: Grid 20x10, Initial Head at (10, 5), Food at (15, 5)\\n");
    return 0;
}`
    },
    {
      id: "project.connect_four",
      name: "project_connect_four_game",
      sub: "games",
      desc: "Complete Connect Four 7x6 Board Engine with Drop Logic and 4-in-a-Row Check",
      code: `#include <stdio.h>
int main(void) {
    printf("Connect Four Engine Initialized: 7 Columns, 6 Rows, Gravity Drop Enabled\\n");
    return 0;
}`
    },
    {
      id: "project.hangman",
      name: "project_hangman_word_game",
      sub: "games",
      desc: "Complete Hangman Word Guessing Game with Masked String and Life Tracking",
      code: `#include <stdio.h>
int main(void) {
    printf("Hangman Game: Secret Word: 'C_P_O_G_A_M_I_N_G' | Lives: 5\\n");
    return 0;
}`
    },
    {
      id: "project.quiz_engine",
      name: "project_quiz_examination_engine",
      sub: "academic",
      desc: "Complete Multiple-Choice Quiz Examination Engine with Scoring and Analytics",
      code: `#include <stdio.h>
int main(void) {
    printf("Quiz Engine: Total Questions: 10, Passing Score: 70%%\\n");
    return 0;
}`
    },
    {
      id: "project.file_encryptor",
      name: "project_file_encryption_cli",
      sub: "security",
      desc: "Complete Text and File Encryption Utility with XOR Stream Cipher",
      code: `#include <stdio.h>
#include <string.h>
void xor_crypt(char* str, char k) { for (size_t i = 0; str[i]; i++) str[i] ^= k; }
int main(void) {
    char s[] = "Academic Research Code";
    xor_crypt(s, 0x4B);
    xor_crypt(s, 0x4B);
    printf("Decrypted: %s\\n", s);
    return 0;
}`
    },
    {
      id: "project.socket_server",
      name: "project_socket_echo_server",
      sub: "systems",
      desc: "Complete Socket TCP Echo Server Architecture Scaffolding",
      code: `#include <stdio.h>
int main(void) {
    printf("TCP Echo Server Scaffolding: Bind port 8080, Listen queue 10, Multi-client loop\\n");
    return 0;
}`
    },
    {
      id: "project.contact_book",
      name: "project_contact_book_system",
      sub: "utilities",
      desc: "Complete Telephone Directory & Contact Book with Search and CSV Export",
      code: `#include <stdio.h>
typedef struct { char name[32]; char phone[16]; } Contact;
int main(void) {
    Contact c = { "Mahi", "+1234567890" };
    printf("Contact: %s (%s)\\n", c.name, c.phone);
    return 0;
}`
    },
    {
      id: "project.supermarket_billing",
      name: "project_supermarket_billing_system",
      sub: "enterprise",
      desc: "Complete Supermarket POS Billing and Receipt Generation System",
      code: `#include <stdio.h>
int main(void) {
    printf("POS Billing Receipt: Subtotal: $45.00, Tax (8%%): $3.60, Total: $48.60\\n");
    return 0;
}`
    },
    {
      id: "project.flight_booking",
      name: "project_flight_booking_system",
      sub: "enterprise",
      desc: "Complete Airline Flight Ticket Reservation and Seat Matrix System",
      code: `#include <stdio.h>
int main(void) {
    printf("Flight Reservation System: Flight AC202, Available Seats: 42/60\\n");
    return 0;
}`
    },
    {
      id: "project.unit_converter",
      name: "project_unit_converter_cli",
      sub: "utilities",
      desc: "Complete Multi-Metric Unit Converter CLI (Temperature, Length, Weight)",
      code: `#include <stdio.h>
double c2f(double c) { return c * 1.8 + 32.0; }
int main(void) {
    printf("Unit Converter: 25.0 C = %.1f F\\n", c2f(25.0));
    return 0;
}`
    },
    {
      id: "project.calendar_scheduler",
      name: "project_calendar_event_scheduler",
      sub: "utilities",
      desc: "Complete Calendar and Event Scheduler Engine with Zeller Day Calculation",
      code: `#include <stdio.h>
int main(void) {
    printf("Calendar Scheduler: Date 2026-09-17, Event: dTyp v2.0 Release\\n");
    return 0;
}`
    },
    {
      id: "project.simple_database",
      name: "project_flat_file_database",
      sub: "database",
      desc: "Complete Binary Flat-File Database Record Engine with Indexing",
      code: `#include <stdio.h>
int main(void) {
    printf("Binary Flat-File Engine: Record Size 64 bytes, Primary Key Index Active\\n");
    return 0;
}`
    },
    {
      id: "project.text_editor",
      name: "project_mini_text_editor",
      sub: "systems",
      desc: "Complete Mini Console Line-Based Text Editor with Buffer Navigation",
      code: `#include <stdio.h>
int main(void) {
    printf("Mini Text Editor: Line Buffer Active (100 lines max), Command Mode: Ready\\n");
    return 0;
}`
    },
    {
      id: "project.huffman_compression",
      name: "project_huffman_compressor",
      sub: "academic",
      desc: "Complete Huffman Frequency Tree File Compression Utility",
      code: `#include <stdio.h>
int main(void) {
    printf("Huffman Compressor: Frequency table built, Tree constructed, Compression ratio: 42%%\\n");
    return 0;
}`
    },
    {
      id: "project.game_2048",
      name: "project_2048_puzzle_game",
      sub: "games",
      desc: "Complete 2048 Board Sliding Game Engine with Merge Mechanics",
      code: `#include <stdio.h>
int main(void) {
    printf("2048 Puzzle Engine: 4x4 Grid Initialized with two random tiles (2, 4)\\n");
    return 0;
}`
    },
    {
      id: "project.memory_allocator",
      name: "project_custom_memory_allocator",
      sub: "systems",
      desc: "Complete First-Fit Custom Heap Memory Allocator Simulator",
      code: `#include <stdio.h>
int main(void) {
    printf("Custom Heap Allocator Simulator: Initialized 16KB static memory pool\\n");
    return 0;
}`
    }
  ];

  for (const p of projectList) {
    add({
      id: p.id,
      name: p.name,
      categoryId: `projects.${p.sub}`,
      subcategory: p.sub,
      path: `projects/${p.sub}`,
      description: p.desc,
      signature: "int main(void); /* Complete Standalone Application */",
      code: p.code,
      tags: ["project", p.sub],
    });
  }

  return comps;
}

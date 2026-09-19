# proj_isa_emulator
> **Domain:** `projects` | **Subcategory:** `systems-runtime` | **Type:** `program`
## Overview
Interactive 8-bit CPU ISA emulator with registers, RAM, and step execution

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
    unsigned char A;
    unsigned char B;
    unsigned char PC;
    unsigned char RAM[256];
} Cpu;

static Cpu cpu;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void init_cpu(void) {
    cpu.A = 0;
    cpu.B = 0;
    cpu.PC = 0;
    for (int i = 0; i < 256; i++) cpu.RAM[i] = 0;
    cpu.RAM[0] = 0x01; cpu.RAM[1] = 42;
    cpu.RAM[2] = 0x02; cpu.RAM[3] = 18;
    cpu.RAM[4] = 0x03;
    cpu.RAM[5] = 0xFF;
}

static void step_cpu(void) {
    unsigned char opcode = cpu.RAM[cpu.PC++];
    if (opcode == 0x01) {
        cpu.A = cpu.RAM[cpu.PC++];
        printf("MOV A, #%d\n", cpu.A);
    } else if (opcode == 0x02) {
        cpu.B = cpu.RAM[cpu.PC++];
        printf("MOV B, #%d\n", cpu.B);
    } else if (opcode == 0x03) {
        cpu.A += cpu.B;
        printf("ADD A, B (A = %d)\n", cpu.A);
    } else if (opcode == 0xFF) {
        printf("HLT (Halt)\n");
        cpu.PC--;
    }
}

int main(void) {
    init_cpu();
    int choice;
    do {
        printf("=== 8-bit CPU ISA Emulator ===\n");
        printf("Registers: A = 0x%02X (%d) | B = 0x%02X (%d) | PC = 0x%02X\n",
               cpu.A, cpu.A, cpu.B, cpu.B, cpu.PC);
        printf("1. Step 1 Instruction\n");
        printf("2. Reset CPU State\n");
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
                step_cpu();
                break;
            case 2:
                init_cpu();
                printf("CPU reset to initial state.\n");
                break;
            case 0:
                printf("Exiting ISA emulator.\n");
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
Available via: `proj_isa_emulator`, `projects.systems-runtime.isa-emulator.prog-isa-emulator`, `projects>proj_isa_emulator()`, `projects>systems-runtime>isa-emulator>prog-isa-emulator>proj_isa_emulator()`

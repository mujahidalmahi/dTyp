import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateBoilerPlateComponents(): Component[] {
  const components: Component[] = [];

  // =========================================================================
  // SUBDOMAIN 1: SEPARATE COMPONENTS (boiler-plates.separate-components)
  // =========================================================================

  // --- Topic 1: Basic Starting Template ---
  components.push(
    createComponent({
      id: "boiler-plates.separate-components.basic-templates.main-void",
      name: "main_void",
      type: "snippet",
      category: "boiler-plates",
      subcategory: "basic-templates",
      categoryId: "boiler-plates.separate-components.basic-templates",
      path: "boiler-plates/separate-components/basic-templates/main-void",
      description: "Standard void main function entrypoint",
      signature: "int main(void)",
      code: `int main(void) {
    return 0;
}`,
      tags: ["main", "entrypoint", "boilerplate", "void"],
      aliases: ["main_void", "mainVoid", "main()"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.basic-templates.main-args",
      name: "main_args",
      type: "snippet",
      category: "boiler-plates",
      subcategory: "basic-templates",
      categoryId: "boiler-plates.separate-components.basic-templates",
      path: "boiler-plates/separate-components/basic-templates/main-args",
      description: "Main entrypoint with command line arguments argc and argv",
      signature: "int main(int argc, char* argv[])",
      code: `int main(int argc, char* argv[]) {
    if (argc < 2) {
        return 1;
    }
    return 0;
}`,
      tags: ["main", "argc", "argv", "cli"],
      aliases: ["main_args", "mainArgs", "main(argc, argv)"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.basic-templates.common-headers",
      name: "common_headers",
      type: "snippet",
      category: "boiler-plates",
      subcategory: "basic-templates",
      categoryId: "boiler-plates.separate-components.basic-templates",
      path: "boiler-plates/separate-components/basic-templates/common-headers",
      description: "Essential standard C library header inclusions",
      signature: "#include <stdio.h> ...",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>`,
      tags: ["headers", "include", "stdio", "stdlib"],
      aliases: ["common_headers", "includes", "stdheaders"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.basic-templates.main-env",
      name: "main_env",
      type: "snippet",
      category: "boiler-plates",
      subcategory: "basic-templates",
      categoryId: "boiler-plates.separate-components.basic-templates",
      path: "boiler-plates/separate-components/basic-templates/main-env",
      description: "Main entrypoint supporting environment variables",
      signature: "int main(int argc, char* argv[], char* envp[])",
      code: `int main(int argc, char* argv[], char* envp[]) {
    for (int i = 0; envp[i] != NULL; i++) {
        puts(envp[i]);
    }
    return 0;
}`,
      tags: ["main", "envp", "environment"],
      aliases: ["main_env", "mainEnv"],
    })
  );

  // --- Topic 2: Conditionals ---
  components.push(
    createComponent({
      id: "boiler-plates.separate-components.conditionals.if-else-basic",
      name: "if_else_basic",
      type: "snippet",
      category: "boiler-plates",
      subcategory: "conditionals",
      categoryId: "boiler-plates.separate-components.conditionals",
      path: "boiler-plates/separate-components/conditionals/if-else-basic",
      description: "Basic if-else branching block",
      signature: "if (...) { ... } else { ... }",
      code: `if (condition) {
    handle_true();
} else {
    handle_false();
}`,
      tags: ["conditionals", "if", "else"],
      aliases: ["if_else_basic", "ifElse"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.conditionals.if-else-ladder",
      name: "if_else_ladder",
      type: "snippet",
      category: "boiler-plates",
      subcategory: "conditionals",
      categoryId: "boiler-plates.separate-components.conditionals",
      path: "boiler-plates/separate-components/conditionals/if-else-ladder",
      description: "Multi-condition if else-if ladder construct",
      signature: "if (...) { ... } else if (...) { ... } else { ... }",
      code: `if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else if (score >= 70) {
    grade = 'C';
} else {
    grade = 'F';
}`,
      tags: ["conditionals", "ladder", "else-if"],
      aliases: ["if_else_ladder", "ifElseLadder"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.conditionals.switch-case-dispatch",
      name: "switch_case_dispatch",
      type: "snippet",
      category: "boiler-plates",
      subcategory: "conditionals",
      categoryId: "boiler-plates.separate-components.conditionals",
      path: "boiler-plates/separate-components/conditionals/switch-case-dispatch",
      description: "Switch-case jump table statement with default case",
      signature: "switch (option) { case ...: break; default: break; }",
      code: `switch (option) {
    case 1:
        do_action_one();
        break;
    case 2:
        do_action_two();
        break;
    case 3:
        do_action_three();
        break;
    default:
        handle_unknown();
        break;
}`,
      tags: ["conditionals", "switch", "case"],
      aliases: ["switch_case_dispatch", "switchCase"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.conditionals.ternary-max",
      name: "ternary_max",
      type: "snippet",
      category: "boiler-plates",
      subcategory: "conditionals",
      categoryId: "boiler-plates.separate-components.conditionals",
      path: "boiler-plates/separate-components/conditionals/ternary-max",
      description: "Ternary operator evaluation expression",
      signature: "int max_val = (a > b) ? a : b;",
      code: `int max_val = (a > b) ? a : b;`,
      tags: ["conditionals", "ternary"],
      aliases: ["ternary_max", "ternaryAssign"],
    })
  );

  // --- Topic 3: Loops ---
  components.push(
    createComponent({
      id: "boiler-plates.separate-components.loops.for-loop-counter",
      name: "for_loop_counter",
      type: "snippet",
      category: "boiler-plates",
      subcategory: "loops",
      categoryId: "boiler-plates.separate-components.loops",
      path: "boiler-plates/separate-components/loops/for-loop-counter",
      description: "Standard ascending indexed for loop",
      signature: "for (int i = 0; i < count; i++)",
      code: `for (int i = 0; i < count; i++) {
    process_item(i);
}`,
      tags: ["loops", "for", "counter"],
      aliases: ["for_loop_counter", "forLoop"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.loops.for-loop-reverse",
      name: "for_loop_reverse",
      type: "snippet",
      category: "boiler-plates",
      subcategory: "loops",
      categoryId: "boiler-plates.separate-components.loops",
      path: "boiler-plates/separate-components/loops/for-loop-reverse",
      description: "Descending reverse indexed for loop",
      signature: "for (int i = count - 1; i >= 0; i--)",
      code: `for (int i = count - 1; i >= 0; i--) {
    process_item(i);
}`,
      tags: ["loops", "for", "reverse"],
      aliases: ["for_loop_reverse", "reverseForLoop"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.loops.while-loop-scanner",
      name: "while_loop_scanner",
      type: "snippet",
      category: "boiler-plates",
      subcategory: "loops",
      categoryId: "boiler-plates.separate-components.loops",
      path: "boiler-plates/separate-components/loops/while-loop-scanner",
      description: "While loop reading inputs until condition fails",
      signature: "while (condition)",
      code: `while (has_next()) {
    process_current();
    advance_next();
}`,
      tags: ["loops", "while", "scanner"],
      aliases: ["while_loop_scanner", "whileLoop"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.loops.do-while-input",
      name: "do_while_input",
      type: "snippet",
      category: "boiler-plates",
      subcategory: "loops",
      categoryId: "boiler-plates.separate-components.loops",
      path: "boiler-plates/separate-components/loops/do-while-input",
      description: "Do-while loop ensuring at least one execution pass",
      signature: "do { ... } while (condition);",
      code: `do {
    value = read_input();
} while (value <= 0);`,
      tags: ["loops", "do-while", "validation"],
      aliases: ["do_while_input", "doWhileLoop"],
    })
  );

  // --- Topic 4: Pattern Printing ---
  components.push(
    createComponent({
      id: "boiler-plates.separate-components.patterns.print-right-triangle",
      name: "print_right_triangle",
      type: "function",
      category: "boiler-plates",
      subcategory: "patterns",
      categoryId: "boiler-plates.separate-components.patterns",
      path: "boiler-plates/separate-components/patterns/print-right-triangle",
      description: "Prints a right-angled star triangle with given row count",
      signature: "void print_right_triangle(int rows);",
      code: `void print_right_triangle(int rows) {
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= i; j++) {
            putchar('*');
        }
        putchar('\n');
    }
}`,
      tags: ["patterns", "triangle", "stars"],
      aliases: ["print_right_triangle", "printRightTriangle"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.patterns.print-pyramid",
      name: "print_pyramid",
      type: "function",
      category: "boiler-plates",
      subcategory: "patterns",
      categoryId: "boiler-plates.separate-components.patterns",
      path: "boiler-plates/separate-components/patterns/print-pyramid",
      description: "Prints a symmetrical star pyramid with leading spacing",
      signature: "void print_pyramid(int rows);",
      code: `void print_pyramid(int rows) {
    for (int i = 1; i <= rows; i++) {
        for (int s = 0; s < rows - i; s++) {
            putchar(' ');
        }
        for (int j = 0; j < (2 * i - 1); j++) {
            putchar('*');
        }
        putchar('\n');
    }
}`,
      tags: ["patterns", "pyramid", "stars"],
      aliases: ["print_pyramid", "printPyramid"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.patterns.print-diamond",
      name: "print_diamond",
      type: "function",
      category: "boiler-plates",
      subcategory: "patterns",
      categoryId: "boiler-plates.separate-components.patterns",
      path: "boiler-plates/separate-components/patterns/print-diamond",
      description: "Prints an upper and lower symmetrical star diamond",
      signature: "void print_diamond(int n);",
      code: `void print_diamond(int n) {
    for (int i = 1; i <= n; i++) {
        for (int s = 0; s < n - i; s++) putchar(' ');
        for (int j = 0; j < (2 * i - 1); j++) putchar('*');
        putchar('\n');
    }
    for (int i = n - 1; i >= 1; i--) {
        for (int s = 0; s < n - i; s++) putchar(' ');
        for (int j = 0; j < (2 * i - 1); j++) putchar('*');
        putchar('\n');
    }
}`,
      tags: ["patterns", "diamond", "stars"],
      aliases: ["print_diamond", "printDiamond"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.patterns.print-hollow-square",
      name: "print_hollow_square",
      type: "function",
      category: "boiler-plates",
      subcategory: "patterns",
      categoryId: "boiler-plates.separate-components.patterns",
      path: "boiler-plates/separate-components/patterns/print-hollow-square",
      description: "Prints a hollow star square of given dimensions",
      signature: "void print_hollow_square(int size);",
      code: `void print_hollow_square(int size) {
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < size; j++) {
            if (i == 0 || i == size - 1 || j == 0 || j == size - 1) {
                putchar('*');
            } else {
                putchar(' ');
            }
        }
        putchar('\n');
    }
}`,
      tags: ["patterns", "hollow", "square"],
      aliases: ["print_hollow_square", "printHollowSquare"],
    })
  );

  // --- Topic 5: Functions ---
  components.push(
    createComponent({
      id: "boiler-plates.separate-components.functions.func-swap",
      name: "swap_ints",
      type: "function",
      category: "boiler-plates",
      subcategory: "functions",
      categoryId: "boiler-plates.separate-components.functions",
      path: "boiler-plates/separate-components/functions/func-swap",
      description: "Swaps two integers in-place via pointers",
      signature: "void swap_ints(int* a, int* b);",
      code: `void swap_ints(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}`,
      tags: ["functions", "swap", "pointers"],
      aliases: ["swap_ints", "swapInts"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.functions.func-callback-def",
      name: "int_mapper_callback",
      type: "typedef",
      category: "boiler-plates",
      subcategory: "functions",
      categoryId: "boiler-plates.separate-components.functions",
      path: "boiler-plates/separate-components/functions/func-callback-def",
      description: "Function pointer typedef for integer mapping transforms",
      signature: "typedef int (*IntMapper)(int);",
      code: `typedef int (*IntMapper)(int);`,
      tags: ["functions", "function-pointer", "callback"],
      aliases: ["int_mapper_callback", "IntMapper"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.functions.apply-mapper",
      name: "apply_mapper",
      type: "function",
      category: "boiler-plates",
      subcategory: "functions",
      categoryId: "boiler-plates.separate-components.functions",
      path: "boiler-plates/separate-components/functions/apply-mapper",
      description: "Applies a function pointer callback to an array of integers",
      signature: "void apply_mapper(int* arr, int size, IntMapper fn);",
      code: `void apply_mapper(int* arr, int size, IntMapper fn) {
    for (int i = 0; i < size; i++) {
        arr[i] = fn(arr[i]);
    }
}`,
      dependencies: ["boiler-plates.separate-components.functions.func-callback-def"],
      tags: ["functions", "callback", "transform"],
      aliases: ["apply_mapper", "applyMapper"],
    })
  );

  // --- Topic 6: Recursion ---
  components.push(
    createComponent({
      id: "boiler-plates.separate-components.recursion.factorial-recursive",
      name: "factorial_recursive",
      type: "function",
      category: "boiler-plates",
      subcategory: "recursion",
      categoryId: "boiler-plates.separate-components.recursion",
      path: "boiler-plates/separate-components/recursion/factorial-recursive",
      description: "Recursive calculation of factorial",
      signature: "long long factorial(int n);",
      code: `long long factorial(int n) {
    if (n <= 1) return 1;
    return (long long)n * factorial(n - 1);
}`,
      tags: ["recursion", "factorial", "math"],
      aliases: ["factorial_recursive", "factorial"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.recursion.fibonacci-recursive",
      name: "fibonacci_recursive",
      type: "function",
      category: "boiler-plates",
      subcategory: "recursion",
      categoryId: "boiler-plates.separate-components.recursion",
      path: "boiler-plates/separate-components/recursion/fibonacci-recursive",
      description: "Recursive calculation of n-th Fibonacci number",
      signature: "long long fibonacci(int n);",
      code: `long long fibonacci(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
      tags: ["recursion", "fibonacci", "math"],
      aliases: ["fibonacci_recursive", "fibonacci"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.recursion.power-recursive",
      name: "power_recursive",
      type: "function",
      category: "boiler-plates",
      subcategory: "recursion",
      categoryId: "boiler-plates.separate-components.recursion",
      path: "boiler-plates/separate-components/recursion/power-recursive",
      description: "Recursive exponentiation by squaring",
      signature: "long long power_recursive(long long base, int exp);",
      code: `long long power_recursive(long long base, int exp) {
    if (exp <= 0) return 1;
    if (exp % 2 == 0) {
        long long half = power_recursive(base, exp / 2);
        return half * half;
    }
    return base * power_recursive(base, exp - 1);
}`,
      tags: ["recursion", "power", "exponentiation"],
      aliases: ["power_recursive", "power"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.recursion.sum-digits-recursive",
      name: "sum_digits_recursive",
      type: "function",
      category: "boiler-plates",
      subcategory: "recursion",
      categoryId: "boiler-plates.separate-components.recursion",
      path: "boiler-plates/separate-components/recursion/sum-digits-recursive",
      description: "Recursively sums all digits of an integer",
      signature: "int sum_digits(int n);",
      code: `int sum_digits(int n) {
    if (n < 0) n = -n;
    if (n == 0) return 0;
    return (n % 10) + sum_digits(n / 10);
}`,
      tags: ["recursion", "digits", "sum"],
      aliases: ["sum_digits_recursive", "sumDigits"],
    })
  );

  // --- Topic 7: Pointers ---
  components.push(
    createComponent({
      id: "boiler-plates.separate-components.pointers.ptr-rebind",
      name: "rebind_ptr",
      type: "function",
      category: "boiler-plates",
      subcategory: "pointers",
      categoryId: "boiler-plates.separate-components.pointers",
      path: "boiler-plates/separate-components/pointers/ptr-rebind",
      description: "Rebinds a pointer address using a double pointer parameter",
      signature: "void rebind_ptr(int** ptr, int* new_target);",
      code: `void rebind_ptr(int** ptr, int* new_target) {
    if (ptr != NULL) {
        *ptr = new_target;
    }
}`,
      tags: ["pointers", "double-pointer", "rebind"],
      aliases: ["rebind_ptr", "rebindPtr"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.pointers.ptr-strlen",
      name: "ptr_strlen",
      type: "function",
      category: "boiler-plates",
      subcategory: "pointers",
      categoryId: "boiler-plates.separate-components.pointers",
      path: "boiler-plates/separate-components/pointers/ptr-strlen",
      description: "Calculates string length using pointer arithmetic",
      signature: "size_t ptr_strlen(const char* s);",
      code: `size_t ptr_strlen(const char* s) {
    const char* p = s;
    while (*p != '\0') {
        p++;
    }
    return (size_t)(p - s);
}`,
      tags: ["pointers", "arithmetic", "strlen"],
      aliases: ["ptr_strlen", "ptrStrlen"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.pointers.ptr-array-copy",
      name: "ptr_array_copy",
      type: "function",
      category: "boiler-plates",
      subcategory: "pointers",
      categoryId: "boiler-plates.separate-components.pointers",
      path: "boiler-plates/separate-components/pointers/ptr-array-copy",
      description: "Copies integer buffer from source pointer to destination pointer",
      signature: "void ptr_array_copy(int* dest, const int* src, size_t count);",
      code: `void ptr_array_copy(int* dest, const int* src, size_t count) {
    while (count-- > 0) {
        *dest++ = *src++;
    }
}`,
      tags: ["pointers", "copy", "buffer"],
      aliases: ["ptr_array_copy", "ptrArrayCopy"],
    })
  );

  // --- Topic 8: Dynamic Memory ---
  components.push(
    createComponent({
      id: "boiler-plates.separate-components.dynamic-memory.alloc-int-array",
      name: "alloc_int_array",
      type: "function",
      category: "boiler-plates",
      subcategory: "dynamic-memory",
      categoryId: "boiler-plates.separate-components.dynamic-memory",
      path: "boiler-plates/separate-components/dynamic-memory/alloc-int-array",
      description: "Dynamically allocates an uninitialized integer buffer with malloc",
      signature: "int* alloc_int_array(size_t count);",
      code: `int* alloc_int_array(size_t count) {
    int* arr = (int*)malloc(count * sizeof(int));
    return arr;
}`,
      tags: ["memory", "malloc", "heap"],
      aliases: ["alloc_int_array", "allocIntArray"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.dynamic-memory.alloc-zero-array",
      name: "alloc_zero_array",
      type: "function",
      category: "boiler-plates",
      subcategory: "dynamic-memory",
      categoryId: "boiler-plates.separate-components.dynamic-memory",
      path: "boiler-plates/separate-components/dynamic-memory/alloc-zero-array",
      description: "Dynamically allocates a zero-initialized buffer with calloc",
      signature: "int* alloc_zero_array(size_t count);",
      code: `int* alloc_zero_array(size_t count) {
    int* arr = (int*)calloc(count, sizeof(int));
    return arr;
}`,
      tags: ["memory", "calloc", "zeroed"],
      aliases: ["alloc_zero_array", "allocZeroArray"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.dynamic-memory.grow-int-array",
      name: "grow_int_array",
      type: "function",
      category: "boiler-plates",
      subcategory: "dynamic-memory",
      categoryId: "boiler-plates.separate-components.dynamic-memory",
      path: "boiler-plates/separate-components/dynamic-memory/grow-int-array",
      description: "Expands capacity of a dynamically allocated array with realloc",
      signature: "int* grow_int_array(int* arr, size_t* capacity);",
      code: `int* grow_int_array(int* arr, size_t* capacity) {
    size_t new_cap = (*capacity == 0) ? 8 : (*capacity * 2);
    int* next = (int*)realloc(arr, new_cap * sizeof(int));
    if (next != NULL) {
        *capacity = new_cap;
    }
    return next;
}`,
      tags: ["memory", "realloc", "growth"],
      aliases: ["grow_int_array", "growIntArray"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.dynamic-memory.safe-free",
      name: "safe_free",
      type: "function",
      category: "boiler-plates",
      subcategory: "dynamic-memory",
      categoryId: "boiler-plates.separate-components.dynamic-memory",
      path: "boiler-plates/separate-components/dynamic-memory/safe-free",
      description: "Frees heap pointer and nullifies reference to prevent dangling pointers",
      signature: "void safe_free(void** ptr);",
      code: `void safe_free(void** ptr) {
    if (ptr != NULL && *ptr != NULL) {
        free(*ptr);
        *ptr = NULL;
    }
}`,
      tags: ["memory", "free", "safe"],
      aliases: ["safe_free", "safeFree"],
    })
  );

  // --- Topic 9: Structures (Separated Struct Definition & Functions) ---
  const personStructId = "boiler-plates.separate-components.structures.person-struct";
  const point2dStructId = "boiler-plates.separate-components.structures.point2d-struct";

  components.push(
    createComponent({
      id: personStructId,
      name: "Person",
      type: "struct",
      category: "boiler-plates",
      subcategory: "structures",
      categoryId: "boiler-plates.separate-components.structures",
      path: "boiler-plates/separate-components/structures/person-struct",
      description: "Person entity structure declaration",
      signature: "typedef struct Person { char name[64]; int age; float score; } Person;",
      code: `typedef struct Person {
    char name[64];
    int age;
    float score;
} Person;`,
      tags: ["structures", "struct", "person"],
      aliases: ["Person", "person_struct"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.structures.create-person",
      name: "create_person",
      type: "function",
      category: "boiler-plates",
      subcategory: "structures",
      categoryId: "boiler-plates.separate-components.structures",
      path: "boiler-plates/separate-components/structures/create-person",
      description: "Allocates and initializes a new Person structure instance",
      signature: "Person* create_person(const char* name, int age, float score);",
      code: `Person* create_person(const char* name, int age, float score) {
    Person* p = (Person*)malloc(sizeof(Person));
    if (!p) return NULL;
    strncpy(p->name, name, sizeof(p->name) - 1);
    p->name[sizeof(p->name) - 1] = '\0';
    p->age = age;
    p->score = score;
    return p;
}`,
      dependencies: [personStructId],
      tags: ["structures", "constructor", "person"],
      aliases: ["create_person", "createPerson"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.structures.print-person",
      name: "print_person",
      type: "function",
      category: "boiler-plates",
      subcategory: "structures",
      categoryId: "boiler-plates.separate-components.structures",
      path: "boiler-plates/separate-components/structures/print-person",
      description: "Outputs a Person instance to standard output",
      signature: "void print_person(const Person* p);",
      code: `void print_person(const Person* p) {
    if (!p) return;
    printf("Person { name: %s, age: %d, score: %.2f }\n", p->name, p->age, p->score);
}`,
      dependencies: [personStructId],
      tags: ["structures", "print", "person"],
      aliases: ["print_person", "printPerson"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.structures.free-person",
      name: "free_person",
      type: "function",
      category: "boiler-plates",
      subcategory: "structures",
      categoryId: "boiler-plates.separate-components.structures",
      path: "boiler-plates/separate-components/structures/free-person",
      description: "Deallocates a Person instance and sets pointer to NULL",
      signature: "void free_person(Person** p);",
      code: `void free_person(Person** p) {
    if (p != NULL && *p != NULL) {
        free(*p);
        *p = NULL;
    }
}`,
      dependencies: [personStructId],
      tags: ["structures", "destructor", "free"],
      aliases: ["free_person", "freePerson"],
    }),
    createComponent({
      id: point2dStructId,
      name: "Point2D",
      type: "struct",
      category: "boiler-plates",
      subcategory: "structures",
      categoryId: "boiler-plates.separate-components.structures",
      path: "boiler-plates/separate-components/structures/point2d-struct",
      description: "2D Cartesian coordinate point structure",
      signature: "typedef struct Point2D { double x; double y; } Point2D;",
      code: `typedef struct Point2D {
    double x;
    double y;
} Point2D;`,
      tags: ["structures", "point", "geometry"],
      aliases: ["Point2D", "point2d_struct"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.structures.point2d-distance",
      name: "point2d_distance",
      type: "function",
      category: "boiler-plates",
      subcategory: "structures",
      categoryId: "boiler-plates.separate-components.structures",
      path: "boiler-plates/separate-components/structures/point2d-distance",
      description: "Calculates Euclidean distance between two Point2D structures",
      signature: "double point2d_distance(const Point2D* a, const Point2D* b);",
      code: `double point2d_distance(const Point2D* a, const Point2D* b) {
    double dx = a->x - b->x;
    double dy = a->y - b->y;
    return sqrt(dx * dx + dy * dy);
}`,
      dependencies: [point2dStructId],
      tags: ["structures", "distance", "geometry"],
      aliases: ["point2d_distance", "point2dDistance"],
    })
  );

  // --- Topic 10: Unions ---
  const dataUnionId = "boiler-plates.separate-components.unions.datavalue-union";
  const taggedUnionId = "boiler-plates.separate-components.unions.tagged-union-struct";

  components.push(
    createComponent({
      id: dataUnionId,
      name: "DataValue",
      type: "struct",
      category: "boiler-plates",
      subcategory: "unions",
      categoryId: "boiler-plates.separate-components.unions",
      path: "boiler-plates/separate-components/unions/datavalue-union",
      description: "Basic union supporting multiple primitive representations in shared memory",
      signature: "typedef union DataValue { int i; float f; char c; } DataValue;",
      code: `typedef union DataValue {
    int i;
    float f;
    char c;
} DataValue;`,
      tags: ["unions", "union", "variant"],
      aliases: ["DataValue", "data_value_union"],
    }),
    createComponent({
      id: taggedUnionId,
      name: "VarValue",
      type: "struct",
      category: "boiler-plates",
      subcategory: "unions",
      categoryId: "boiler-plates.separate-components.unions",
      path: "boiler-plates/separate-components/unions/tagged-union-struct",
      description: "Tagged variant union associating a type tag with DataValue",
      signature: "typedef struct VarValue { ValueType type; DataValue val; } VarValue;",
      code: `typedef enum ValueType {
    TYPE_INT,
    TYPE_FLOAT,
    TYPE_CHAR
} ValueType;

typedef struct VarValue {
    ValueType type;
    DataValue val;
} VarValue;`,
      dependencies: [dataUnionId],
      tags: ["unions", "tagged-union", "variant"],
      aliases: ["VarValue", "tagged_union"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.unions.print-var-value",
      name: "print_var_value",
      type: "function",
      category: "boiler-plates",
      subcategory: "unions",
      categoryId: "boiler-plates.separate-components.unions",
      path: "boiler-plates/separate-components/unions/print-var-value",
      description: "Prints tagged union VarValue based on active type discriminator",
      signature: "void print_var_value(const VarValue* v);",
      code: `void print_var_value(const VarValue* v) {
    if (!v) return;
    switch (v->type) {
        case TYPE_INT:
            printf("Integer: %d\n", v->val.i);
            break;
        case TYPE_FLOAT:
            printf("Float: %.2f\n", v->val.f);
            break;
        case TYPE_CHAR:
            printf("Char: %c\n", v->val.c);
            break;
    }
}`,
      dependencies: [taggedUnionId],
      tags: ["unions", "print", "dispatch"],
      aliases: ["print_var_value", "printVarValue"],
    })
  );

  // --- Topic 11: Enums ---
  const statusEnumId = "boiler-plates.separate-components.enums.status-enum";

  components.push(
    createComponent({
      id: statusEnumId,
      name: "Status",
      type: "enum",
      category: "boiler-plates",
      subcategory: "enums",
      categoryId: "boiler-plates.separate-components.enums",
      path: "boiler-plates/separate-components/enums/status-enum",
      description: "Standard status code enumeration",
      signature: "typedef enum Status { STATUS_OK = 0, STATUS_ERROR, STATUS_PENDING } Status;",
      code: `typedef enum Status {
    STATUS_OK = 0,
    STATUS_ERROR = 1,
    STATUS_PENDING = 2
} Status;`,
      tags: ["enums", "status", "codes"],
      aliases: ["Status", "status_enum"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.enums.status-to-string",
      name: "status_to_str",
      type: "function",
      category: "boiler-plates",
      subcategory: "enums",
      categoryId: "boiler-plates.separate-components.enums",
      path: "boiler-plates/separate-components/enums/status-to-string",
      description: "Converts Status enum value to string representation",
      signature: "const char* status_to_str(Status s);",
      code: `const char* status_to_str(Status s) {
    switch (s) {
        case STATUS_OK:
            return "OK";
        case STATUS_ERROR:
            return "ERROR";
        case STATUS_PENDING:
            return "PENDING";
        default:
            return "UNKNOWN";
    }
}`,
      dependencies: [statusEnumId],
      tags: ["enums", "string", "lookup"],
      aliases: ["status_to_str", "statusToString"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.enums.loglevel-enum",
      name: "LogLevel",
      type: "enum",
      category: "boiler-plates",
      subcategory: "enums",
      categoryId: "boiler-plates.separate-components.enums",
      path: "boiler-plates/separate-components/enums/loglevel-enum",
      description: "Enumeration for hierarchical logging severity levels",
      signature: "typedef enum LogLevel { LOG_DEBUG, LOG_INFO, LOG_WARN, LOG_ERROR } LogLevel;",
      code: `typedef enum LogLevel {
    LOG_DEBUG = 0,
    LOG_INFO = 1,
    LOG_WARN = 2,
    LOG_ERROR = 3
} LogLevel;`,
      tags: ["enums", "logging", "severity"],
      aliases: ["LogLevel", "loglevel_enum"],
    })
  );

  // --- Topic 12: File I/O ---
  components.push(
    createComponent({
      id: "boiler-plates.separate-components.file-io.file-open-read",
      name: "open_file_read",
      type: "function",
      category: "boiler-plates",
      subcategory: "file-io",
      categoryId: "boiler-plates.separate-components.file-io",
      path: "boiler-plates/separate-components/file-io/file-open-read",
      description: "Opens a file in read-only mode with validation",
      signature: "FILE* open_file_read(const char* filepath);",
      code: `FILE* open_file_read(const char* filepath) {
    FILE* f = fopen(filepath, "r");
    return f;
}`,
      tags: ["file-io", "fopen", "read"],
      aliases: ["open_file_read", "openFileRead"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.file-io.file-read-lines",
      name: "read_file_lines",
      type: "function",
      category: "boiler-plates",
      subcategory: "file-io",
      categoryId: "boiler-plates.separate-components.file-io",
      path: "boiler-plates/separate-components/file-io/file-read-lines",
      description: "Reads line by line using fgets and processes buffer",
      signature: "int read_file_lines(const char* path, char lines[][256], int max_lines);",
      code: `int read_file_lines(const char* path, char lines[][256], int max_lines) {
    FILE* f = fopen(path, "r");
    if (!f) return -1;
    int count = 0;
    while (count < max_lines && fgets(lines[count], 256, f) != NULL) {
        lines[count][strcspn(lines[count], "\r\n")] = '\0';
        count++;
    }
    fclose(f);
    return count;
}`,
      tags: ["file-io", "fgets", "lines"],
      aliases: ["read_file_lines", "readFileLines"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.file-io.file-write-text",
      name: "write_file_text",
      type: "function",
      category: "boiler-plates",
      subcategory: "file-io",
      categoryId: "boiler-plates.separate-components.file-io",
      path: "boiler-plates/separate-components/file-io/file-write-text",
      description: "Overwrites a text file with given string content",
      signature: "int write_file_text(const char* path, const char* text);",
      code: `int write_file_text(const char* path, const char* text) {
    FILE* f = fopen(path, "w");
    if (!f) return -1;
    fputs(text, f);
    fclose(f);
    return 0;
}`,
      tags: ["file-io", "fputs", "write"],
      aliases: ["write_file_text", "writeFileText"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.file-io.file-append-text",
      name: "append_file_text",
      type: "function",
      category: "boiler-plates",
      subcategory: "file-io",
      categoryId: "boiler-plates.separate-components.file-io",
      path: "boiler-plates/separate-components/file-io/file-append-text",
      description: "Appends text string to the end of a file",
      signature: "int append_file_text(const char* path, const char* text);",
      code: `int append_file_text(const char* path, const char* text) {
    FILE* f = fopen(path, "a");
    if (!f) return -1;
    fputs(text, f);
    fclose(f);
    return 0;
}`,
      tags: ["file-io", "append", "log"],
      aliases: ["append_file_text", "appendFileText"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.file-io.binary-write-records",
      name: "write_binary_records",
      type: "function",
      category: "boiler-plates",
      subcategory: "file-io",
      categoryId: "boiler-plates.separate-components.file-io",
      path: "boiler-plates/separate-components/file-io/binary-write-records",
      description: "Writes binary records to file with fwrite",
      signature: "size_t write_binary_records(const char* path, const void* records, size_t size, size_t count);",
      code: `size_t write_binary_records(const char* path, const void* records, size_t size, size_t count) {
    FILE* f = fopen(path, "wb");
    if (!f) return 0;
    size_t written = fwrite(records, size, count, f);
    fclose(f);
    return written;
}`,
      tags: ["file-io", "fwrite", "binary"],
      aliases: ["write_binary_records", "writeBinaryRecords"],
    })
  );

  // --- Topic 13: Macros & Preprocessor ---
  components.push(
    createComponent({
      id: "boiler-plates.separate-components.macros.macro-include-guard",
      name: "macro_include_guard",
      type: "macro",
      category: "boiler-plates",
      subcategory: "macros",
      categoryId: "boiler-plates.separate-components.macros",
      path: "boiler-plates/separate-components/macros/macro-include-guard",
      description: "Header file idempotency include guard boilerplate",
      signature: "#ifndef HEADER_NAME_H ...",
      code: `#ifndef HEADER_NAME_H
#define HEADER_NAME_H

#endif`,
      tags: ["macros", "header", "guard"],
      aliases: ["macro_include_guard", "includeGuard"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.macros.macro-min-max",
      name: "macro_min_max",
      type: "macro",
      category: "boiler-plates",
      subcategory: "macros",
      categoryId: "boiler-plates.separate-components.macros",
      path: "boiler-plates/separate-components/macros/macro-min-max",
      description: "Preprocessor macros for MIN and MAX value evaluation",
      signature: "#define MIN(a,b) ... #define MAX(a,b) ...",
      code: `#define MIN(a, b) (((a) < (b)) ? (a) : (b))
#define MAX(a, b) (((a) > (b)) ? (a) : (b))`,
      tags: ["macros", "min", "max"],
      aliases: ["macro_min_max", "minMaxMacros"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.macros.macro-array-size",
      name: "macro_array_len",
      type: "macro",
      category: "boiler-plates",
      subcategory: "macros",
      categoryId: "boiler-plates.separate-components.macros",
      path: "boiler-plates/separate-components/macros/macro-array-size",
      description: "Calculates static array element count at compile-time",
      signature: "#define ARRAY_LEN(arr) (sizeof(arr) / sizeof((arr)[0]))",
      code: `#define ARRAY_LEN(arr) (sizeof(arr) / sizeof((arr)[0]))`,
      tags: ["macros", "sizeof", "length"],
      aliases: ["macro_array_len", "arrayLen"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.macros.macro-debug-print",
      name: "macro_debug_print",
      type: "macro",
      category: "boiler-plates",
      subcategory: "macros",
      categoryId: "boiler-plates.separate-components.macros",
      path: "boiler-plates/separate-components/macros/macro-debug-print",
      description: "Variadic debug print macro outputting file and line number",
      signature: "#define DEBUG_PRINT(fmt, ...)",
      code: `#define DEBUG_PRINT(fmt, ...) fprintf(stderr, "[DEBUG] %s:%d: " fmt "\n", __FILE__, __LINE__, ##__VA_ARGS__)`,
      tags: ["macros", "debug", "variadic"],
      aliases: ["macro_debug_print", "debugPrint"],
    })
  );

  // =========================================================================
  // SUBDOMAIN 2: FULL PROGRAMS (boiler-plates.full-programs)
  // =========================================================================

  // --- Topic 1: Basic Starting Template ---
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.basic-templates.prog-hello-world",
      name: "prog_hello_world",
      type: "program",
      category: "boiler-plates",
      subcategory: "basic-templates",
      categoryId: "boiler-plates.full-programs.basic-templates",
      path: "boiler-plates/full-programs/basic-templates/prog-hello-world",
      description: "Complete Hello World C program",
      signature: "int main(void)",
      code: `#include <stdio.h>

int main(void) {
    puts("Hello, World!");
    return 0;
}`,
      tags: ["program", "hello-world", "starter"],
      aliases: ["prog_hello_world", "helloWorldProgram"],
    }),
    createComponent({
      id: "boiler-plates.full-programs.basic-templates.prog-cli-echo",
      name: "prog_cli_echo",
      type: "program",
      category: "boiler-plates",
      subcategory: "basic-templates",
      categoryId: "boiler-plates.full-programs.basic-templates",
      path: "boiler-plates/full-programs/basic-templates/prog-cli-echo",
      description: "Complete command line argument echo program",
      signature: "int main(int argc, char* argv[])",
      code: `#include <stdio.h>

int main(int argc, char* argv[]) {
    printf("Argument count: %d\n", argc);
    for (int i = 0; i < argc; i++) {
        printf("argv[%d] = %s\n", i, argv[i]);
    }
    return 0;
}`,
      tags: ["program", "cli", "echo"],
      aliases: ["prog_cli_echo", "cliEchoProgram"],
    })
  );

  // --- Topic 2: Conditionals ---
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.conditionals.prog-grade-evaluator",
      name: "prog_grade_evaluator",
      type: "program",
      category: "boiler-plates",
      subcategory: "conditionals",
      categoryId: "boiler-plates.full-programs.conditionals",
      path: "boiler-plates/full-programs/conditionals/prog-grade-evaluator",
      description: "Complete score to letter grade evaluation program",
      signature: "int main(void)",
      code: `#include <stdio.h>

int main(void) {
    int scores[] = {95, 82, 74, 61, 45};
    int n = sizeof(scores) / sizeof(scores[0]);

    for (int i = 0; i < n; i++) {
        int s = scores[i];
        char grade;
        if (s >= 90) grade = 'A';
        else if (s >= 80) grade = 'B';
        else if (s >= 70) grade = 'C';
        else if (s >= 60) grade = 'D';
        else grade = 'F';

        printf("Score: %d -> Grade: %c\n", s, grade);
    }
    return 0;
}`,
      tags: ["program", "conditionals", "grade"],
      aliases: ["prog_grade_evaluator", "gradeEvaluatorProgram"],
    }),
    createComponent({
      id: "boiler-plates.full-programs.conditionals.prog-leap-year",
      name: "prog_leap_year",
      type: "program",
      category: "boiler-plates",
      subcategory: "conditionals",
      categoryId: "boiler-plates.full-programs.conditionals",
      path: "boiler-plates/full-programs/conditionals/prog-leap-year",
      description: "Complete leap year evaluation program",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdbool.h>

bool is_leap_year(int year) {
    if (year % 400 == 0) return true;
    if (year % 100 == 0) return false;
    return (year % 4 == 0);
}

int main(void) {
    int test_years[] = {1900, 2000, 2024, 2026};
    int n = sizeof(test_years) / sizeof(test_years[0]);

    for (int i = 0; i < n; i++) {
        int y = test_years[i];
        printf("Year %d: %s\n", y, is_leap_year(y) ? "Leap Year" : "Common Year");
    }
    return 0;
}`,
      tags: ["program", "conditionals", "leap-year"],
      aliases: ["prog_leap_year", "leapYearProgram"],
    })
  );

  // --- Topic 3: Loops ---
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.loops.prog-multiplication-table",
      name: "prog_multiplication_table",
      type: "program",
      category: "boiler-plates",
      subcategory: "loops",
      categoryId: "boiler-plates.full-programs.loops",
      path: "boiler-plates/full-programs/loops/prog-multiplication-table",
      description: "Complete formatted multiplication table program",
      signature: "int main(void)",
      code: `#include <stdio.h>

int main(void) {
    int size = 10;
    for (int i = 1; i <= size; i++) {
        for (int j = 1; j <= size; j++) {
            printf("%4d", i * j);
        }
        putchar('\n');
    }
    return 0;
}`,
      tags: ["program", "loops", "table"],
      aliases: ["prog_multiplication_table", "multiplicationTableProgram"],
    }),
    createComponent({
      id: "boiler-plates.full-programs.loops.prog-collatz-sequence",
      name: "prog_collatz_sequence",
      type: "program",
      category: "boiler-plates",
      subcategory: "loops",
      categoryId: "boiler-plates.full-programs.loops",
      path: "boiler-plates/full-programs/loops/prog-collatz-sequence",
      description: "Complete Collatz conjecture sequence generator program",
      signature: "int main(void)",
      code: `#include <stdio.h>

int main(void) {
    long long n = 27;
    int steps = 0;
    printf("Starting Collatz sequence for %lld:\n", n);
    while (n != 1) {
        printf("%lld -> ", n);
        if (n % 2 == 0) {
            n = n / 2;
        } else {
            n = 3 * n + 1;
        }
        steps++;
    }
    printf("1\nTotal steps: %d\n", steps);
    return 0;
}`,
      tags: ["program", "loops", "collatz"],
      aliases: ["prog_collatz_sequence", "collatzProgram"],
    })
  );

  // --- Topic 4: Pattern Printing ---
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.patterns.prog-star-pyramid",
      name: "prog_star_pyramid",
      type: "program",
      category: "boiler-plates",
      subcategory: "patterns",
      categoryId: "boiler-plates.full-programs.patterns",
      path: "boiler-plates/full-programs/patterns/prog-star-pyramid",
      description: "Complete star pyramid pattern printing program",
      signature: "int main(void)",
      code: `#include <stdio.h>

int main(void) {
    int rows = 6;
    for (int i = 1; i <= rows; i++) {
        for (int s = 0; s < rows - i; s++) {
            putchar(' ');
        }
        for (int j = 0; j < (2 * i - 1); j++) {
            putchar('*');
        }
        putchar('\n');
    }
    return 0;
}`,
      tags: ["program", "patterns", "pyramid"],
      aliases: ["prog_star_pyramid", "starPyramidProgram"],
    }),
    createComponent({
      id: "boiler-plates.full-programs.patterns.prog-diamond-pattern",
      name: "prog_diamond_pattern",
      type: "program",
      category: "boiler-plates",
      subcategory: "patterns",
      categoryId: "boiler-plates.full-programs.patterns",
      path: "boiler-plates/full-programs/patterns/prog-diamond-pattern",
      description: "Complete symmetrical diamond star pattern program",
      signature: "int main(void)",
      code: `#include <stdio.h>

int main(void) {
    int n = 5;
    for (int i = 1; i <= n; i++) {
        for (int s = 0; s < n - i; s++) putchar(' ');
        for (int j = 0; j < (2 * i - 1); j++) putchar('*');
        putchar('\n');
    }
    for (int i = n - 1; i >= 1; i--) {
        for (int s = 0; s < n - i; s++) putchar(' ');
        for (int j = 0; j < (2 * i - 1); j++) putchar('*');
        putchar('\n');
    }
    return 0;
}`,
      tags: ["program", "patterns", "diamond"],
      aliases: ["prog_diamond_pattern", "diamondPatternProgram"],
    })
  );

  // --- Topic 5: Functions ---
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.functions.prog-calculator-dispatch",
      name: "prog_calculator_dispatch",
      type: "program",
      category: "boiler-plates",
      subcategory: "functions",
      categoryId: "boiler-plates.full-programs.functions",
      path: "boiler-plates/full-programs/functions/prog-calculator-dispatch",
      description: "Complete calculator using function pointer jump table",
      signature: "int main(void)",
      code: `#include <stdio.h>

typedef int (*BinaryOp)(int, int);

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }
int divide(int a, int b) { return b != 0 ? a / b : 0; }

int main(void) {
    BinaryOp ops[] = {add, sub, mul, divide};
    const char* names[] = {"+", "-", "*", "/"};

    int a = 20, b = 4;
    for (int i = 0; i < 4; i++) {
        printf("%d %s %d = %d\n", a, names[i], b, ops[i](a, b));
    }
    return 0;
}`,
      tags: ["program", "functions", "calculator", "function-pointers"],
      aliases: ["prog_calculator_dispatch", "calculatorProgram"],
    }),
    createComponent({
      id: "boiler-plates.full-programs.functions.prog-array-map-callback",
      name: "prog_array_map_callback",
      type: "program",
      category: "boiler-plates",
      subcategory: "functions",
      categoryId: "boiler-plates.full-programs.functions",
      path: "boiler-plates/full-programs/functions/prog-array-map-callback",
      description: "Complete higher-order array map transformation program",
      signature: "int main(void)",
      code: `#include <stdio.h>

typedef int (*Mapper)(int);

int square(int x) { return x * x; }
int increment(int x) { return x + 1; }

void map_array(int* arr, int size, Mapper fn) {
    for (int i = 0; i < size; i++) {
        arr[i] = fn(arr[i]);
    }
}

int main(void) {
    int items[] = {1, 2, 3, 4, 5};
    int n = sizeof(items) / sizeof(items[0]);

    map_array(items, n, square);
    for (int i = 0; i < n; i++) printf("%d ", items[i]);
    putchar('\n');

    map_array(items, n, increment);
    for (int i = 0; i < n; i++) printf("%d ", items[i]);
    putchar('\n');

    return 0;
}`,
      tags: ["program", "functions", "map", "callback"],
      aliases: ["prog_array_map_callback", "arrayMapProgram"],
    })
  );

  // --- Topic 6: Recursion ---
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.recursion.prog-tower-of-hanoi",
      name: "prog_tower_of_hanoi",
      type: "program",
      category: "boiler-plates",
      subcategory: "recursion",
      categoryId: "boiler-plates.full-programs.recursion",
      path: "boiler-plates/full-programs/recursion/prog-tower-of-hanoi",
      description: "Complete recursive Tower of Hanoi solver program",
      signature: "int main(void)",
      code: `#include <stdio.h>

void solve_hanoi(int n, char from, char to, char aux) {
    if (n == 1) {
        printf("Move disk 1 from %c to %c\n", from, to);
        return;
    }
    solve_hanoi(n - 1, from, aux, to);
    printf("Move disk %d from %c to %c\n", n, from, to);
    solve_hanoi(n - 1, aux, to, from);
}

int main(void) {
    int disks = 3;
    printf("Solving Tower of Hanoi for %d disks:\n", disks);
    solve_hanoi(disks, 'A', 'C', 'B');
    return 0;
}`,
      tags: ["program", "recursion", "hanoi"],
      aliases: ["prog_tower_of_hanoi", "hanoiProgram"],
    }),
    createComponent({
      id: "boiler-plates.full-programs.recursion.prog-fibonacci-memoized",
      name: "prog_fibonacci_memoized",
      type: "program",
      category: "boiler-plates",
      subcategory: "recursion",
      categoryId: "boiler-plates.full-programs.recursion",
      path: "boiler-plates/full-programs/recursion/prog-fibonacci-memoized",
      description: "Complete recursive Fibonacci program with memoization array",
      signature: "int main(void)",
      code: `#include <stdio.h>

long long memo[100];

long long fib(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    if (memo[n] != 0) return memo[n];
    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
}

int main(void) {
    for (int i = 0; i <= 20; i++) {
        printf("Fib(%d) = %lld\n", i, fib(i));
    }
    return 0;
}`,
      tags: ["program", "recursion", "fibonacci", "memoization"],
      aliases: ["prog_fibonacci_memoized", "fibonacciMemoProgram"],
    })
  );

  // --- Topic 7: Pointers ---
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.pointers.prog-string-reversal",
      name: "prog_string_reversal",
      type: "program",
      category: "boiler-plates",
      subcategory: "pointers",
      categoryId: "boiler-plates.full-programs.pointers",
      path: "boiler-plates/full-programs/pointers/prog-string-reversal",
      description: "Complete string reversal program using two pointers",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <string.h>

void reverse_string(char* str) {
    if (!str) return;
    char* start = str;
    char* end = str + strlen(str) - 1;
    while (start < end) {
        char temp = *start;
        *start = *end;
        *end = temp;
        start++;
        end--;
    }
}

int main(void) {
    char text[] = "Modern C Language";
    printf("Original: %s\n", text);
    reverse_string(text);
    printf("Reversed: %s\n", text);
    return 0;
}`,
      tags: ["program", "pointers", "reverse-string"],
      aliases: ["prog_string_reversal", "stringReversalProgram"],
    }),
    createComponent({
      id: "boiler-plates.full-programs.pointers.prog-pointer-arithmetic",
      name: "prog_pointer_arithmetic",
      type: "program",
      category: "boiler-plates",
      subcategory: "pointers",
      categoryId: "boiler-plates.full-programs.pointers",
      path: "boiler-plates/full-programs/pointers/prog-pointer-arithmetic",
      description: "Complete pointer arithmetic buffer traversal program",
      signature: "int main(void)",
      code: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int* ptr = arr;
    int count = sizeof(arr) / sizeof(arr[0]);

    printf("Buffer address: %p\n", (void*)ptr);
    while (ptr < arr + count) {
        printf("Index %td: value = %d at address %p\n", ptr - arr, *ptr, (void*)ptr);
        ptr++;
    }
    return 0;
}`,
      tags: ["program", "pointers", "arithmetic"],
      aliases: ["prog_pointer_arithmetic", "pointerArithmeticProgram"],
    })
  );

  // --- Topic 8: Dynamic Memory ---
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.dynamic-memory.prog-dynamic-array-stats",
      name: "prog_dynamic_array_stats",
      type: "program",
      category: "boiler-plates",
      subcategory: "dynamic-memory",
      categoryId: "boiler-plates.full-programs.dynamic-memory",
      path: "boiler-plates/full-programs/dynamic-memory/prog-dynamic-array-stats",
      description: "Complete heap allocation, statistics calculation, and memory cleanup program",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    size_t n = 5;
    int* data = (int*)malloc(n * sizeof(int));
    if (!data) return 1;

    for (size_t i = 0; i < n; i++) {
        data[i] = (int)((i + 1) * 15);
    }

    long long sum = 0;
    int min_val = data[0];
    int max_val = data[0];
    for (size_t i = 0; i < n; i++) {
        sum += data[i];
        if (data[i] < min_val) min_val = data[i];
        if (data[i] > max_val) max_val = data[i];
    }

    printf("Count: %zu, Sum: %lld, Average: %.2f, Min: %d, Max: %d\n",
           n, sum, (double)sum / n, min_val, max_val);

    free(data);
    data = NULL;
    return 0;
}`,
      tags: ["program", "dynamic-memory", "malloc", "stats"],
      aliases: ["prog_dynamic_array_stats", "dynamicArrayStatsProgram"],
    }),
    createComponent({
      id: "boiler-plates.full-programs.dynamic-memory.prog-dynamic-buffer-growth",
      name: "prog_dynamic_buffer_growth",
      type: "program",
      category: "boiler-plates",
      subcategory: "dynamic-memory",
      categoryId: "boiler-plates.full-programs.dynamic-memory",
      path: "boiler-plates/full-programs/dynamic-memory/prog-dynamic-buffer-growth",
      description: "Complete dynamic buffer expansion program using realloc",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    size_t cap = 2;
    size_t count = 0;
    int* buffer = (int*)malloc(cap * sizeof(int));
    if (!buffer) return 1;

    for (int val = 10; val <= 60; val += 10) {
        if (count >= cap) {
            cap *= 2;
            int* next = (int*)realloc(buffer, cap * sizeof(int));
            if (!next) {
                free(buffer);
                return 1;
            }
            buffer = next;
        }
        buffer[count++] = val;
    }

    printf("Dynamic buffer (capacity %zu, count %zu):\n", cap, count);
    for (size_t i = 0; i < count; i++) {
        printf("%d ", buffer[i]);
    }
    putchar('\n');

    free(buffer);
    return 0;
}`,
      tags: ["program", "dynamic-memory", "realloc", "growth"],
      aliases: ["prog_dynamic_buffer_growth", "bufferGrowthProgram"],
    })
  );

  // --- Topic 9: Structures ---
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.structures.prog-student-records",
      name: "prog_student_records",
      type: "program",
      category: "boiler-plates",
      subcategory: "structures",
      categoryId: "boiler-plates.full-programs.structures",
      path: "boiler-plates/full-programs/structures/prog-student-records",
      description: "Complete student records manager program using structs",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <string.h>

typedef struct Student {
    int id;
    char name[32];
    double gpa;
} Student;

void display_student(const Student* s) {
    printf("ID: %04d | Name: %-12s | GPA: %.2f\n", s->id, s->name, s->gpa);
}

int main(void) {
    Student roster[3] = {
        {101, "Alice Smith", 3.85},
        {102, "Bob Johnson", 3.42},
        {103, "Charlie Lee", 3.96}
    };

    printf("=== Student Records ===\n");
    for (int i = 0; i < 3; i++) {
        display_student(&roster[i]);
    }
    return 0;
}`,
      tags: ["program", "structures", "student-records"],
      aliases: ["prog_student_records", "studentRecordsProgram"],
    }),
    createComponent({
      id: "boiler-plates.full-programs.structures.prog-2d-geometry",
      name: "prog_2d_geometry",
      type: "program",
      category: "boiler-plates",
      subcategory: "structures",
      categoryId: "boiler-plates.full-programs.structures",
      path: "boiler-plates/full-programs/structures/prog-2d-geometry",
      description: "Complete 2D geometry distance and rectangle area calculation program",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <math.h>

typedef struct Point {
    double x;
    double y;
} Point;

typedef struct Rect {
    Point top_left;
    Point bottom_right;
} Rect;

double rect_area(const Rect* r) {
    double width = r->bottom_right.x - r->top_left.x;
    double height = r->top_left.y - r->bottom_right.y;
    return width * height;
}

int main(void) {
    Rect r = {{0.0, 10.0}, {15.0, 0.0}};
    printf("Rectangle Top-Left: (%.1f, %.1f)\n", r.top_left.x, r.top_left.y);
    printf("Rectangle Bottom-Right: (%.1f, %.1f)\n", r.bottom_right.x, r.bottom_right.y);
    printf("Rectangle Area: %.2f\n", rect_area(&r));
    return 0;
}`,
      tags: ["program", "structures", "geometry"],
      aliases: ["prog_2d_geometry", "geometryProgram"],
    })
  );

  // --- Topic 10: Unions ---
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.unions.prog-variant-display",
      name: "prog_variant_display",
      type: "program",
      category: "boiler-plates",
      subcategory: "unions",
      categoryId: "boiler-plates.full-programs.unions",
      path: "boiler-plates/full-programs/unions/prog-variant-display",
      description: "Complete tagged variant union dispatcher program",
      signature: "int main(void)",
      code: `#include <stdio.h>

typedef enum Kind { KIND_INT, KIND_FLOAT, KIND_STRING } Kind;

typedef struct Variant {
    Kind kind;
    union {
        int i_val;
        float f_val;
        char str[32];
    } as;
} Variant;

void print_variant(const Variant* v) {
    switch (v->kind) {
        case KIND_INT:
            printf("Variant Int: %d\n", v->as.i_val);
            break;
        case KIND_FLOAT:
            printf("Variant Float: %.2f\n", v->as.f_val);
            break;
        case KIND_STRING:
            printf("Variant String: %s\n", v->as.str);
            break;
    }
}

int main(void) {
    Variant v1 = {.kind = KIND_INT, .as.i_val = 42};
    Variant v2 = {.kind = KIND_FLOAT, .as.f_val = 3.14159f};

    print_variant(&v1);
    print_variant(&v2);
    return 0;
}`,
      tags: ["program", "unions", "tagged-union"],
      aliases: ["prog_variant_display", "variantDisplayProgram"],
    }),
    createComponent({
      id: "boiler-plates.full-programs.unions.prog-ip-address-union",
      name: "prog_ip_address_union",
      type: "program",
      category: "boiler-plates",
      subcategory: "unions",
      categoryId: "boiler-plates.full-programs.unions",
      path: "boiler-plates/full-programs/unions/prog-ip-address-union",
      description: "Complete IPv4 address union program converting between 32-bit uint and octets",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdint.h>

typedef union IPv4 {
    uint32_t full_address;
    uint8_t octets[4];
} IPv4;

int main(void) {
    IPv4 ip;
    ip.octets[0] = 192;
    ip.octets[1] = 168;
    ip.octets[2] = 1;
    ip.octets[3] = 100;

    printf("Dotted IP: %u.%u.%u.%u\n", ip.octets[0], ip.octets[1], ip.octets[2], ip.octets[3]);
    printf("32-bit Integer representation: 0x%08X (%u)\n", ip.full_address, ip.full_address);
    return 0;
}`,
      tags: ["program", "unions", "ipv4", "bitwise"],
      aliases: ["prog_ip_address_union", "ipAddressUnionProgram"],
    })
  );

  // --- Topic 11: Enums ---
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.enums.prog-traffic-light",
      name: "prog_traffic_light",
      type: "program",
      category: "boiler-plates",
      subcategory: "enums",
      categoryId: "boiler-plates.full-programs.enums",
      path: "boiler-plates/full-programs/enums/prog-traffic-light",
      description: "Complete traffic light state transition program using enums",
      signature: "int main(void)",
      code: `#include <stdio.h>

typedef enum LightState {
    LIGHT_RED,
    LIGHT_GREEN,
    LIGHT_YELLOW
} LightState;

LightState next_state(LightState cur) {
    switch (cur) {
        case LIGHT_RED: return LIGHT_GREEN;
        case LIGHT_GREEN: return LIGHT_YELLOW;
        case LIGHT_YELLOW: return LIGHT_RED;
    }
    return LIGHT_RED;
}

const char* state_name(LightState cur) {
    switch (cur) {
        case LIGHT_RED: return "RED (Stop)";
        case LIGHT_GREEN: return "GREEN (Go)";
        case LIGHT_YELLOW: return "YELLOW (Caution)";
    }
    return "UNKNOWN";
}

int main(void) {
    LightState state = LIGHT_RED;
    for (int i = 0; i < 6; i++) {
        printf("Step %d: %s\n", i + 1, state_name(state));
        state = next_state(state);
    }
    return 0;
}`,
      tags: ["program", "enums", "state-machine"],
      aliases: ["prog_traffic_light", "trafficLightProgram"],
    }),
    createComponent({
      id: "boiler-plates.full-programs.enums.prog-order-lifecycle",
      name: "prog_order_lifecycle",
      type: "program",
      category: "boiler-plates",
      subcategory: "enums",
      categoryId: "boiler-plates.full-programs.enums",
      path: "boiler-plates/full-programs/enums/prog-order-lifecycle",
      description: "Complete e-commerce order status lifecycle program using enums",
      signature: "int main(void)",
      code: `#include <stdio.h>

typedef enum OrderStatus {
    ORDER_PENDING,
    ORDER_PROCESSING,
    ORDER_SHIPPED,
    ORDER_DELIVERED,
    ORDER_CANCELLED
} OrderStatus;

void print_order_status(int order_id, OrderStatus status) {
    const char* str = "UNKNOWN";
    switch (status) {
        case ORDER_PENDING: str = "PENDING"; break;
        case ORDER_PROCESSING: str = "PROCESSING"; break;
        case ORDER_SHIPPED: str = "SHIPPED"; break;
        case ORDER_DELIVERED: str = "DELIVERED"; break;
        case ORDER_CANCELLED: str = "CANCELLED"; break;
    }
    printf("Order #%d Status: %s\n", order_id, str);
}

int main(void) {
    print_order_status(1001, ORDER_PENDING);
    print_order_status(1001, ORDER_PROCESSING);
    print_order_status(1001, ORDER_SHIPPED);
    print_order_status(1001, ORDER_DELIVERED);
    return 0;
}`,
      tags: ["program", "enums", "order-status"],
      aliases: ["prog_order_lifecycle", "orderLifecycleProgram"],
    })
  );

  // --- Topic 12: File I/O ---
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.file-io.prog-file-copy",
      name: "prog_file_copy",
      type: "program",
      category: "boiler-plates",
      subcategory: "file-io",
      categoryId: "boiler-plates.full-programs.file-io",
      path: "boiler-plates/full-programs/file-io/prog-file-copy",
      description: "Complete buffered file copy program",
      signature: "int main(int argc, char* argv[])",
      code: `#include <stdio.h>

int main(int argc, char* argv[]) {
    if (argc < 3) {
        printf("Usage: %s <source> <destination>\n", argv[0]);
        return 1;
    }

    FILE* src = fopen(argv[1], "rb");
    if (!src) {
        perror("Error opening source file");
        return 1;
    }

    FILE* dst = fopen(argv[2], "wb");
    if (!dst) {
        perror("Error opening destination file");
        fclose(src);
        return 1;
    }

    char buffer[4096];
    size_t bytes;
    while ((bytes = fread(buffer, 1, sizeof(buffer), src)) > 0) {
        fwrite(buffer, 1, bytes, dst);
    }

    fclose(src);
    fclose(dst);
    puts("File copied successfully.");
    return 0;
}`,
      tags: ["program", "file-io", "copy"],
      aliases: ["prog_file_copy", "fileCopyProgram"],
    }),
    createComponent({
      id: "boiler-plates.full-programs.file-io.prog-file-line-counter",
      name: "prog_file_line_counter",
      type: "program",
      category: "boiler-plates",
      subcategory: "file-io",
      categoryId: "boiler-plates.full-programs.file-io",
      path: "boiler-plates/full-programs/file-io/prog-file-line-counter",
      description: "Complete program calculating lines, words, and characters in a file",
      signature: "int main(int argc, char* argv[])",
      code: `#include <stdio.h>
#include <ctype.h>
#include <stdbool.h>

int main(int argc, char* argv[]) {
    if (argc < 2) {
        printf("Usage: %s <filename>\n", argv[0]);
        return 1;
    }

    FILE* f = fopen(argv[1], "r");
    if (!f) {
        perror("Error opening file");
        return 1;
    }

    long lines = 0, words = 0, chars = 0;
    int c;
    bool in_word = false;

    while ((c = fgetc(f)) != EOF) {
        chars++;
        if (c == '\n') lines++;
        if (isspace(c)) {
            in_word = false;
        } else if (!in_word) {
            in_word = true;
            words++;
        }
    }

    fclose(f);
    printf("File: %s\nLines: %ld | Words: %ld | Chars: %ld\n", argv[1], lines, words, chars);
    return 0;
}`,
      tags: ["program", "file-io", "wc", "counter"],
      aliases: ["prog_file_line_counter", "fileLineCounterProgram"],
    })
  );

  // --- Topic 13: Macros & Preprocessor ---
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.macros.prog-logging-macros",
      name: "prog_logging_macros",
      type: "program",
      category: "boiler-plates",
      subcategory: "macros",
      categoryId: "boiler-plates.full-programs.macros",
      path: "boiler-plates/full-programs/macros/prog-logging-macros",
      description: "Complete program using variadic logging macros with filename and line",
      signature: "int main(void)",
      code: `#include <stdio.h>

#define LOG_INFO(fmt, ...) printf("[INFO] %s:%d: " fmt "\n", __FILE__, __LINE__, ##__VA_ARGS__)
#define LOG_WARN(fmt, ...) printf("[WARN] %s:%d: " fmt "\n", __FILE__, __LINE__, ##__VA_ARGS__)
#define LOG_ERR(fmt, ...)  fprintf(stderr, "[ERROR] %s:%d: " fmt "\n", __FILE__, __LINE__, ##__VA_ARGS__)

int main(void) {
    LOG_INFO("System started successfully on port %d", 8080);
    LOG_WARN("Memory usage exceeded threshold: %d%%", 78);
    LOG_ERR("Failed to connect to database host: %s", "localhost");
    return 0;
}`,
      tags: ["program", "macros", "logging"],
      aliases: ["prog_logging_macros", "loggingMacrosProgram"],
    }),
    createComponent({
      id: "boiler-plates.full-programs.macros.prog-macro-metaprogramming",
      name: "prog_macro_metaprogramming",
      type: "program",
      category: "boiler-plates",
      subcategory: "macros",
      categoryId: "boiler-plates.full-programs.macros",
      path: "boiler-plates/full-programs/macros/prog-macro-metaprogramming",
      description: "Complete program demonstrating stringizing and token pasting preprocessor operators",
      signature: "int main(void)",
      code: `#include <stdio.h>

#define TO_STR(x) #x
#define CONCAT(a, b) a##b
#define DECLARE_SETTER(type, name) \
    void CONCAT(set_, name)(type val) { \
        printf("Setting " TO_STR(name) " = %d\n", (int)val); \
    }

DECLARE_SETTER(int, age)
DECLARE_SETTER(int, score)

int main(void) {
    set_age(25);
    set_score(99);
    return 0;
}`,
      tags: ["program", "macros", "token-pasting", "stringizing"],
      aliases: ["prog_macro_metaprogramming", "macroMetaProgram"],
    })
  );

  // =========================================================================
  // TOPIC 14: THE 10 COMPLEX PROGRAMS (boiler-plates.full-programs.complex-programs)
  // =========================================================================

  // 1. Student Management System
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-student-management",
      name: "complex_student_management",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-student-management",
      description: "Student management system with structs, dynamic memory, file storage, and interactive menu",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Student {
    int id;
    char name[48];
    float marks;
} Student;

typedef struct Database {
    Student* students;
    size_t count;
    size_t capacity;
} Database;

Database* db_create(size_t initial_cap) {
    Database* db = (Database*)malloc(sizeof(Database));
    if (!db) return NULL;
    db->students = (Student*)malloc(initial_cap * sizeof(Student));
    if (!db->students) { free(db); return NULL; }
    db->count = 0;
    db->capacity = initial_cap;
    return db;
}

void db_add(Database* db, int id, const char* name, float marks) {
    if (db->count >= db->capacity) {
        size_t new_cap = db->capacity * 2;
        Student* next = (Student*)realloc(db->students, new_cap * sizeof(Student));
        if (!next) return;
        db->students = next;
        db->capacity = new_cap;
    }
    Student* s = &db->students[db->count++];
    s->id = id;
    strncpy(s->name, name, sizeof(s->name) - 1);
    s->name[sizeof(s->name) - 1] = '\0';
    s->marks = marks;
}

void db_display(const Database* db) {
    printf("=== Student Records (%zu Total) ===\n", db->count);
    for (size_t i = 0; i < db->count; i++) {
        printf("ID: %04d | Name: %-16s | Marks: %.1f\n",
               db->students[i].id, db->students[i].name, db->students[i].marks);
    }
}

void db_free(Database* db) {
    if (!db) return;
    free(db->students);
    free(db);
}

int main(void) {
    Database* db = db_create(2);
    if (!db) return 1;

    db_add(db, 101, "Alice Miller", 88.5f);
    db_add(db, 102, "Brian Clark", 92.0f);
    db_add(db, 103, "Catherine Davis", 95.5f);

    db_display(db);
    db_free(db);
    return 0;
}`,
      tags: ["program", "complex", "students", "database", "crud"],
      aliases: ["complex_student_management", "studentManagementProgram"],
    })
  );

  // 2. Banking Account Ledger
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-banking-ledger",
      name: "complex_banking_ledger",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-banking-ledger",
      description: "Banking account ledger with transactions, validation, and history report",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <string.h>

typedef enum TxType {
    TX_DEPOSIT,
    TX_WITHDRAWAL
} TxType;

typedef struct Transaction {
    int id;
    TxType type;
    double amount;
    char note[32];
} Transaction;

typedef struct Account {
    int account_number;
    char holder[48];
    double balance;
    Transaction history[20];
    int tx_count;
} Account;

int account_deposit(Account* acc, double amount, const char* note) {
    if (amount <= 0 || acc->tx_count >= 20) return 0;
    acc->balance += amount;
    Transaction* tx = &acc->history[acc->tx_count++];
    tx->id = acc->tx_count;
    tx->type = TX_DEPOSIT;
    tx->amount = amount;
    strncpy(tx->note, note, sizeof(tx->note) - 1);
    tx->note[sizeof(tx->note) - 1] = '\0';
    return 1;
}

int account_withdraw(Account* acc, double amount, const char* note) {
    if (amount <= 0 || amount > acc->balance || acc->tx_count >= 20) return 0;
    acc->balance -= amount;
    Transaction* tx = &acc->history[acc->tx_count++];
    tx->id = acc->tx_count;
    tx->type = TX_WITHDRAWAL;
    tx->amount = amount;
    strncpy(tx->note, note, sizeof(tx->note) - 1);
    tx->note[sizeof(tx->note) - 1] = '\0';
    return 1;
}

void account_statement(const Account* acc) {
    printf("=== Account Statement: #%d (%s) ===\n", acc->account_number, acc->holder);
    printf("Current Balance: $%.2f\n", acc->balance);
    printf("Transaction History (%d items):\n", acc->tx_count);
    for (int i = 0; i < acc->tx_count; i++) {
        const Transaction* tx = &acc->history[i];
        printf("  #%d | %-10s | $%8.2f | %s\n",
               tx->id, (tx->type == TX_DEPOSIT ? "DEPOSIT" : "WITHDRAW"), tx->amount, tx->note);
    }
}

int main(void) {
    Account acc = { .account_number = 50012, .holder = "James Wilson", .balance = 1000.0, .tx_count = 0 };
    account_deposit(&acc, 250.0, "Salary Bonus");
    account_withdraw(&acc, 120.0, "Groceries");
    account_withdraw(&acc, 45.0, "Utility Bill");
    account_statement(&acc);
    return 0;
}`,
      tags: ["program", "complex", "banking", "ledger", "transactions"],
      aliases: ["complex_banking_ledger", "bankingLedgerProgram"],
    })
  );

  // 3. Dynamic String Builder & Tokenizer
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-string-builder",
      name: "complex_string_builder",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-string-builder",
      description: "Auto-growing dynamic string buffer and multi-delimiter word tokenizer",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct StringBuilder {
    char* data;
    size_t length;
    size_t capacity;
} StringBuilder;

StringBuilder* sb_create(void) {
    StringBuilder* sb = (StringBuilder*)malloc(sizeof(StringBuilder));
    if (!sb) return NULL;
    sb->capacity = 16;
    sb->length = 0;
    sb->data = (char*)malloc(sb->capacity);
    if (!sb->data) { free(sb); return NULL; }
    sb->data[0] = '\0';
    return sb;
}

void sb_append(StringBuilder* sb, const char* str) {
    size_t str_len = strlen(str);
    while (sb->length + str_len + 1 > sb->capacity) {
        sb->capacity *= 2;
        char* next = (char*)realloc(sb->data, sb->capacity);
        if (!next) return;
        sb->data = next;
    }
    memcpy(sb->data + sb->length, str, str_len);
    sb->length += str_len;
    sb->data[sb->length] = '\0';
}

void sb_free(StringBuilder* sb) {
    if (!sb) return;
    free(sb->data);
    free(sb);
}

int main(void) {
    StringBuilder* sb = sb_create();
    if (!sb) return 1;

    sb_append(sb, "SELECT id, name, score ");
    sb_append(sb, "FROM users ");
    sb_append(sb, "WHERE score >= 80 ");
    sb_append(sb, "ORDER BY score DESC;");

    printf("Constructed Query: %s\n", sb->data);
    printf("Length: %zu, Capacity: %zu\n", sb->length, sb->capacity);

    sb_free(sb);
    return 0;
}`,
      tags: ["program", "complex", "string-builder", "realloc"],
      aliases: ["complex_string_builder", "stringBuilderProgram"],
    })
  );

  // 4. Command-Line File Analyzer
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-file-analyzer",
      name: "complex_file_analyzer",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-file-analyzer",
      description: "CLI file text statistics analyzer parsing flags and file metrics",
      signature: "int main(int argc, char* argv[])",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <stdbool.h>

typedef struct FileStats {
    long lines;
    long words;
    long bytes;
} FileStats;

int analyze_file(const char* filepath, FileStats* stats) {
    FILE* f = fopen(filepath, "r");
    if (!f) return 0;

    stats->lines = 0;
    stats->words = 0;
    stats->bytes = 0;

    int c;
    bool in_word = false;
    while ((c = fgetc(f)) != EOF) {
        stats->bytes++;
        if (c == '\n') stats->lines++;
        if (isspace(c)) {
            in_word = false;
        } else if (!in_word) {
            in_word = true;
            stats->words++;
        }
    }
    fclose(f);
    return 1;
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        printf("Usage: %s <file1> [file2 ...]\n", argv[0]);
        return 1;
    }

    printf("%-20s %8s %8s %8s\n", "File", "Lines", "Words", "Bytes");
    printf("--------------------------------------------------\n");

    for (int i = 1; i < argc; i++) {
        FileStats stats;
        if (analyze_file(argv[i], &stats)) {
            printf("%-20s %8ld %8ld %8ld\n", argv[i], stats.lines, stats.words, stats.bytes);
        } else {
            printf("%-20s [ERROR: cannot open file]\n", argv[i]);
        }
    }
    return 0;
}`,
      tags: ["program", "complex", "cli", "file-io", "analyzer"],
      aliases: ["complex_file_analyzer", "fileAnalyzerProgram"],
    })
  );

  // 5. Inventory Stock Catalog
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-inventory-catalog",
      name: "complex_inventory_catalog",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-inventory-catalog",
      description: "Inventory stock catalog with sorting by price and SKU lookup",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Item {
    char sku[12];
    char title[32];
    double price;
    int stock;
} Item;

int compare_items_price(const void* a, const void* b) {
    const Item* item_a = (const Item*)a;
    const Item* item_b = (const Item*)b;
    if (item_a->price < item_b->price) return -1;
    if (item_a->price > item_b->price) return 1;
    return 0;
}

int main(void) {
    Item catalog[] = {
        {"SKU-001", "Mechanical Keyboard", 89.99, 15},
        {"SKU-002", "Wireless Mouse", 29.50, 42},
        {"SKU-003", "4K Gaming Monitor", 349.00, 8},
        {"SKU-004", "USB-C Fast Cable", 12.99, 120}
    };
    int count = sizeof(catalog) / sizeof(catalog[0]);

    qsort(catalog, count, sizeof(Item), compare_items_price);

    printf("=== Inventory Catalog (Sorted by Price) ===\n");
    printf("%-10s %-22s %8s %6s\n", "SKU", "Title", "Price", "Stock");
    printf("------------------------------------------------\n");

    for (int i = 0; i < count; i++) {
        printf("%-10s %-22s $%7.2f %6d\n",
               catalog[i].sku, catalog[i].title, catalog[i].price, catalog[i].stock);
    }
    return 0;
}`,
      tags: ["program", "complex", "inventory", "sorting", "qsort"],
      aliases: ["complex_inventory_catalog", "inventoryCatalogProgram"],
    })
  );

  // 6. Task & To-Do List Tracker
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-task-tracker",
      name: "complex_task_tracker",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-task-tracker",
      description: "To-do task manager tracking priority, state machine status, and listing",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <string.h>

typedef enum Priority { PRIO_LOW, PRIO_MEDIUM, PRIO_HIGH } Priority;
typedef enum TaskState { STATE_TODO, STATE_IN_PROGRESS, STATE_DONE } TaskState;

typedef struct Task {
    int id;
    char title[48];
    Priority priority;
    TaskState state;
} Task;

const char* prio_name(Priority p) {
    switch (p) {
        case PRIO_LOW: return "LOW";
        case PRIO_MEDIUM: return "MED";
        case PRIO_HIGH: return "HIGH";
    }
    return "UNKNOWN";
}

const char* state_name(TaskState s) {
    switch (s) {
        case STATE_TODO: return "TODO";
        case STATE_IN_PROGRESS: return "IN_PROGRESS";
        case STATE_DONE: return "DONE";
    }
    return "UNKNOWN";
}

int main(void) {
    Task tasks[] = {
        {1, "Setup PostgreSQL database schema", PRIO_HIGH, STATE_DONE},
        {2, "Implement user authentication endpoint", PRIO_HIGH, STATE_IN_PROGRESS},
        {3, "Write integration test suites", PRIO_MEDIUM, STATE_TODO},
        {4, "Refactor CSS dark theme palette", PRIO_LOW, STATE_TODO}
    };
    int count = sizeof(tasks) / sizeof(tasks[0]);

    printf("=== Task Management Dashboard ===\n");
    printf("%-4s %-40s %-8s %-12s\n", "ID", "Title", "Prio", "Status");
    printf("------------------------------------------------------------------\n");

    for (int i = 0; i < count; i++) {
        printf("#%-3d %-40s %-8s %-12s\n",
               tasks[i].id, tasks[i].title, prio_name(tasks[i].priority), state_name(tasks[i].state));
    }
    return 0;
}`,
      tags: ["program", "complex", "todo", "enums", "dashboard"],
      aliases: ["complex_task_tracker", "taskTrackerProgram"],
    })
  );

  // 7. Expression Evaluator (Arithmetic Stack Machine)
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-expression-evaluator",
      name: "complex_expression_evaluator",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-expression-evaluator",
      description: "Postfix arithmetic expression evaluator using integer stack and switch-case",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

#define STACK_CAPACITY 64

typedef struct Stack {
    int data[STACK_CAPACITY];
    int top;
} Stack;

void stack_init(Stack* s) { s->top = -1; }
int stack_push(Stack* s, int val) {
    if (s->top >= STACK_CAPACITY - 1) return 0;
    s->data[++s->top] = val;
    return 1;
}
int stack_pop(Stack* s, int* val) {
    if (s->top < 0) return 0;
    *val = s->data[s->top--];
    return 1;
}

int evaluate_postfix(const char* expr) {
    Stack stack;
    stack_init(&stack);

    const char* p = expr;
    while (*p != '\0') {
        if (isspace(*p)) {
            p++;
            continue;
        }
        if (isdigit(*p)) {
            int val = 0;
            while (isdigit(*p)) {
                val = val * 10 + (*p - '0');
                p++;
            }
            stack_push(&stack, val);
        } else {
            int b, a;
            stack_pop(&stack, &b);
            stack_pop(&stack, &a);
            int res = 0;
            switch (*p) {
                case '+': res = a + b; break;
                case '-': res = a - b; break;
                case '*': res = a * b; break;
                case '/': res = (b != 0) ? a / b : 0; break;
            }
            stack_push(&stack, res);
            p++;
        }
    }

    int result = 0;
    stack_pop(&stack, &result);
    return result;
}

int main(void) {
    const char* expression = "15 7 1 1 + - / 3 * 2 1 1 + + -";
    printf("Postfix Expression: %s\n", expression);
    printf("Evaluation Result: %d\n", evaluate_postfix(expression));
    return 0;
}`,
      tags: ["program", "complex", "stack", "expression", "evaluator"],
      aliases: ["complex_expression_evaluator", "expressionEvaluatorProgram"],
    })
  );

  // 8. Binary File Database (Read/Write Records)
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-binary-record-store",
      name: "complex_binary_record_store",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-binary-record-store",
      description: "Binary record store persisting fixed-size structs with random access seeking",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <string.h>

typedef struct Record {
    int id;
    char code[8];
    double balance;
} Record;

int main(void) {
    const char* filename = "datastore.bin";

    Record records[3] = {
        {1, "USD", 1540.50},
        {2, "EUR", 2800.75},
        {3, "GBP", 920.10}
    };

    FILE* out = fopen(filename, "wb");
    if (!out) return 1;
    fwrite(records, sizeof(Record), 3, out);
    fclose(out);

    FILE* in = fopen(filename, "rb");
    if (!in) return 1;

    Record target;
    fseek(in, 1 * sizeof(Record), SEEK_SET);
    fread(&target, sizeof(Record), 1, in);
    fclose(in);

    printf("Randomly Read Record at Index 1:\n");
    printf("ID: %d | Currency: %s | Balance: %.2f\n", target.id, target.code, target.balance);

    remove(filename);
    return 0;
}`,
      tags: ["program", "complex", "binary", "fseek", "database"],
      aliases: ["complex_binary_record_store", "binaryRecordStoreProgram"],
    })
  );

  // 9. Logger with File & Console Output
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-multilevel-logger",
      name: "complex_multilevel_logger",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-multilevel-logger",
      description: "Logging engine supporting severity filtering, formatting, and file appending",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdarg.h>
#include <time.h>

typedef enum Level { LVL_DEBUG, LVL_INFO, LVL_WARN, LVL_ERROR } Level;

typedef struct Logger {
    Level min_level;
    const char* log_file;
} Logger;

void logger_write(const Logger* log, Level lvl, const char* fmt, ...) {
    if (lvl < log->min_level) return;

    const char* tags[] = {"DEBUG", "INFO", "WARN", "ERROR"};
    time_t now = time(NULL);
    char time_str[24];
    strftime(time_str, sizeof(time_str), "%Y-%m-%d %H:%M:%S", localtime(&now));

    va_list args1, args2;
    va_start(args1, fmt);
    va_copy(args2, args1);

    printf("[%s] [%s] ", time_str, tags[lvl]);
    vprintf(fmt, args1);
    putchar('\n');
    va_end(args1);

    if (log->log_file) {
        FILE* f = fopen(log->log_file, "a");
        if (f) {
            fprintf(f, "[%s] [%s] ", time_str, tags[lvl]);
            vfprintf(f, fmt, args2);
            fputc('\n', f);
            fclose(f);
        }
    }
    va_end(args2);
}

int main(void) {
    Logger logger = { .min_level = LVL_INFO, .log_file = "app.log" };

    logger_write(&logger, LVL_DEBUG, "This debug trace will be filtered out");
    logger_write(&logger, LVL_INFO, "Worker thread started with ID %d", 4);
    logger_write(&logger, LVL_WARN, "Disk capacity at %d percent", 85);
    logger_write(&logger, LVL_ERROR, "Socket connection dropped unexpectedly");

    remove("app.log");
    return 0;
}`,
      tags: ["program", "complex", "logger", "varargs", "file-append"],
      aliases: ["complex_multilevel_logger", "multilevelLoggerProgram"],
    })
  );

  // 10. Matrix Operations Suite
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.complex-programs.complex-matrix-suite",
      name: "complex_matrix_suite",
      type: "program",
      category: "boiler-plates",
      subcategory: "complex-programs",
      categoryId: "boiler-plates.full-programs.complex-programs",
      path: "boiler-plates/full-programs/complex-programs/complex-matrix-suite",
      description: "Dynamic 2D matrix allocation, multiplication, transpose, and cleanup",
      signature: "int main(void)",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Matrix {
    int rows;
    int cols;
    double** data;
} Matrix;

Matrix* matrix_create(int rows, int cols) {
    Matrix* m = (Matrix*)malloc(sizeof(Matrix));
    if (!m) return NULL;
    m->rows = rows;
    m->cols = cols;
    m->data = (double**)malloc(rows * sizeof(double*));
    for (int i = 0; i < rows; i++) {
        m->data[i] = (double*)calloc(cols, sizeof(double));
    }
    return m;
}

void matrix_free(Matrix* m) {
    if (!m) return;
    for (int i = 0; i < m->rows; i++) {
        free(m->data[i]);
    }
    free(m->data);
    free(m);
}

Matrix* matrix_multiply(const Matrix* a, const Matrix* b) {
    if (a->cols != b->rows) return NULL;
    Matrix* res = matrix_create(a->rows, b->cols);
    for (int i = 0; i < a->rows; i++) {
        for (int j = 0; j < b->cols; j++) {
            double sum = 0.0;
            for (int k = 0; k < a->cols; k++) {
                sum += a->data[i][k] * b->data[k][j];
            }
            res->data[i][j] = sum;
        }
    }
    return res;
}

void matrix_print(const Matrix* m, const char* label) {
    printf("Matrix %s (%dx%d):\n", label, m->rows, m->cols);
    for (int i = 0; i < m->rows; i++) {
        printf("  [ ");
        for (int j = 0; j < m->cols; j++) {
            printf("%6.1f ", m->data[i][j]);
        }
        printf("]\n");
    }
}

int main(void) {
    Matrix* a = matrix_create(2, 2);
    a->data[0][0] = 1.0; a->data[0][1] = 2.0;
    a->data[1][0] = 3.0; a->data[1][1] = 4.0;

    Matrix* b = matrix_create(2, 2);
    b->data[0][0] = 2.0; b->data[0][1] = 0.0;
    b->data[1][0] = 1.0; b->data[1][1] = 2.0;

    Matrix* c = matrix_multiply(a, b);

    matrix_print(a, "A");
    matrix_print(b, "B");
    matrix_print(c, "C = A * B");

    matrix_free(a);
    matrix_free(b);
    matrix_free(c);
    return 0;
}`,
      tags: ["program", "complex", "matrix", "linear-algebra", "double-pointer"],
      aliases: ["complex_matrix_suite", "matrixOperationsProgram"],
    })
  );


  // --- Topic: Strings (From Scratch, No Built-Ins) ---
  components.push(
    createComponent({
      id: "boiler-plates.separate-components.strings.length",
      name: "string_length",
      type: "function",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.separate-components.strings",
      path: "boiler-plates/separate-components/strings/length",
      description: "Calculates length of null-terminated string without using strlen",
      signature: "int string_length(const char* s);",
      code: `int string_length(const char* s) {
    int len = 0;
    while (s[len] != '\\0') {
        len++;
    }
    return len;
}`,
      tags: ["strings", "length", "strlen"],
      aliases: ["string_length", "strLen"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.strings.copy",
      name: "string_copy",
      type: "function",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.separate-components.strings",
      path: "boiler-plates/separate-components/strings/copy",
      description: "Copies characters from src buffer into dest buffer including null terminator",
      signature: "void string_copy(char* dest, const char* src);",
      code: `void string_copy(char* dest, const char* src) {
    int i = 0;
    while (src[i] != '\\0') {
        dest[i] = src[i];
        i++;
    }
    dest[i] = '\\0';
}`,
      tags: ["strings", "copy", "strcpy"],
      aliases: ["string_copy", "strCopy"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.strings.concat",
      name: "string_concat",
      type: "function",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.separate-components.strings",
      path: "boiler-plates/separate-components/strings/concat",
      description: "Appends src characters onto end of dest buffer",
      signature: "void string_concat(char* dest, const char* src);",
      code: `void string_concat(char* dest, const char* src) {
    int i = 0;
    while (dest[i] != '\\0') i++;
    int j = 0;
    while (src[j] != '\\0') {
        dest[i++] = src[j++];
    }
    dest[i] = '\\0';
}`,
      tags: ["strings", "concat", "strcat"],
      aliases: ["string_concat", "strConcat"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.strings.compare",
      name: "string_compare",
      type: "function",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.separate-components.strings",
      path: "boiler-plates/separate-components/strings/compare",
      description: "Compares two strings lexicographically returning negative, zero, or positive integer",
      signature: "int string_compare(const char* s1, const char* s2);",
      code: `int string_compare(const char* s1, const char* s2) {
    int i = 0;
    while (s1[i] != '\\0' && s2[i] != '\\0') {
        if (s1[i] != s2[i]) {
            return (unsigned char)s1[i] - (unsigned char)s2[i];
        }
        i++;
    }
    return (unsigned char)s1[i] - (unsigned char)s2[i];
}`,
      tags: ["strings", "compare", "strcmp"],
      aliases: ["string_compare", "strCompare"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.strings.reverse",
      name: "string_reverse",
      type: "function",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.separate-components.strings",
      path: "boiler-plates/separate-components/strings/reverse",
      description: "Reverses string characters in-place using two pointers",
      signature: "void string_reverse(char* s);",
      code: `void string_reverse(char* s) {
    int i = 0;
    while (s[i] != '\\0') i++;
    int left = 0, right = i - 1;
    while (left < right) {
        char tmp = s[left];
        s[left] = s[right];
        s[right] = tmp;
        left++;
        right--;
    }
}`,
      tags: ["strings", "reverse", "in-place"],
      aliases: ["string_reverse", "strReverse"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.strings.to-lower",
      name: "string_to_lower",
      type: "function",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.separate-components.strings",
      path: "boiler-plates/separate-components/strings/to-lower",
      description: "Converts uppercase ASCII letters in string to lowercase in-place",
      signature: "void string_to_lower(char* s);",
      code: `void string_to_lower(char* s) {
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] >= 'A' && s[i] <= 'Z') {
            s[i] = (char)(s[i] + 32);
        }
    }
}`,
      tags: ["strings", "to-lower", "case"],
      aliases: ["string_to_lower", "strToLower"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.strings.to-upper",
      name: "string_to_upper",
      type: "function",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.separate-components.strings",
      path: "boiler-plates/separate-components/strings/to-upper",
      description: "Converts lowercase ASCII letters in string to uppercase in-place",
      signature: "void string_to_upper(char* s);",
      code: `void string_to_upper(char* s) {
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] >= 'a' && s[i] <= 'z') {
            s[i] = (char)(s[i] - 32);
        }
    }
}`,
      tags: ["strings", "to-upper", "case"],
      aliases: ["string_to_upper", "strToUpper"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.strings.substring",
      name: "string_substring",
      type: "function",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.separate-components.strings",
      path: "boiler-plates/separate-components/strings/substring",
      description: "Extracts substring slice from start index with given length into dest buffer",
      signature: "int string_substring(const char* src, int start, int len, char* dest);",
      code: `int string_substring(const char* src, int start, int len, char* dest) {
    int src_len = 0;
    while (src[src_len] != '\\0') src_len++;
    if (start < 0 || start >= src_len || len < 0) {
        dest[0] = '\\0';
        return 0;
    }
    int i = 0;
    while (i < len && src[start + i] != '\\0') {
        dest[i] = src[start + i];
        i++;
    }
    dest[i] = '\\0';
    return i;
}`,
      tags: ["strings", "substring", "slice"],
      aliases: ["string_substring", "strSubstr"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.strings.find",
      name: "string_find",
      type: "function",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.separate-components.strings",
      path: "boiler-plates/separate-components/strings/find",
      description: "Finds first index of needle substring in haystack string returning -1 if not found",
      signature: "int string_find(const char* haystack, const char* needle);",
      code: `int string_find(const char* haystack, const char* needle) {
    if (needle[0] == '\\0') return 0;
    for (int i = 0; haystack[i] != '\\0'; i++) {
        int j = 0;
        while (haystack[i + j] != '\\0' && needle[j] != '\\0' && haystack[i + j] == needle[j]) {
            j++;
        }
        if (needle[j] == '\\0') return i;
    }
    return -1;
}`,
      tags: ["strings", "find", "index-of", "search"],
      aliases: ["string_find", "strFind"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.strings.trim",
      name: "string_trim",
      type: "function",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.separate-components.strings",
      path: "boiler-plates/separate-components/strings/trim",
      description: "Removes leading and trailing whitespace characters in-place",
      signature: "void string_trim(char* s);",
      code: `void string_trim(char* s) {
    int start = 0;
    while (s[start] == ' ' || s[start] == '\\t' || s[start] == '\\n' || s[start] == '\\r') {
        start++;
    }
    int end = start;
    while (s[end] != '\\0') end++;
    end--;
    while (end >= start && (s[end] == ' ' || s[end] == '\\t' || s[end] == '\\n' || s[end] == '\\r')) {
        end--;
    }
    int i = 0;
    for (int j = start; j <= end; j++) {
        s[i++] = s[j];
    }
    s[i] = '\\0';
}`,
      tags: ["strings", "trim", "whitespace"],
      aliases: ["string_trim", "strTrim"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.strings.word-count",
      name: "string_word_count",
      type: "function",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.separate-components.strings",
      path: "boiler-plates/separate-components/strings/word-count",
      description: "Counts words separated by whitespace in a string",
      signature: "int string_word_count(const char* s);",
      code: `int string_word_count(const char* s) {
    int count = 0;
    int in_word = 0;
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] == ' ' || s[i] == '\\t' || s[i] == '\\n') {
            in_word = 0;
        } else if (!in_word) {
            in_word = 1;
            count++;
        }
    }
    return count;
}`,
      tags: ["strings", "word-count"],
      aliases: ["string_word_count", "strWordCount"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.strings.from-int",
      name: "string_from_int",
      type: "function",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.separate-components.strings",
      path: "boiler-plates/separate-components/strings/from-int",
      description: "Converts integer to decimal string representation without itoa",
      signature: "void string_from_int(int val, char* dest);",
      code: `void string_from_int(int val, char* dest) {
    if (val == 0) {
        dest[0] = '0';
        dest[1] = '\\0';
        return;
    }
    int is_neg = 0;
    if (val < 0) {
        is_neg = 1;
        val = -val;
    }
    char buf[16];
    int idx = 0;
    while (val > 0) {
        buf[idx++] = (char)('0' + (val % 10));
        val /= 10;
    }
    int o = 0;
    if (is_neg) dest[o++] = '-';
    while (idx > 0) {
        dest[o++] = buf[--idx];
    }
    dest[o] = '\\0';
}`,
      tags: ["strings", "from-int", "itoa"],
      aliases: ["string_from_int", "strFromInt"],
    }),
    createComponent({
      id: "boiler-plates.separate-components.strings.to-int",
      name: "string_to_int",
      type: "function",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.separate-components.strings",
      path: "boiler-plates/separate-components/strings/to-int",
      description: "Parses signed integer from string without atoi",
      signature: "int string_to_int(const char* s, int* out_val);",
      code: `int string_to_int(const char* s, int* out_val) {
    int i = 0;
    while (s[i] == ' ' || s[i] == '\\t') i++;
    int sign = 1;
    if (s[i] == '-') {
        sign = -1;
        i++;
    } else if (s[i] == '+') {
        i++;
    }
    if (s[i] < '0' || s[i] > '9') return 0;
    int res = 0;
    while (s[i] >= '0' && s[i] <= '9') {
        res = res * 10 + (s[i] - '0');
        i++;
    }
    *out_val = res * sign;
    return 1;
}`,
      tags: ["strings", "to-int", "atoi"],
      aliases: ["string_to_int", "strToInt"],
    })
  );

  // --- Full Programs: Strings (From Scratch) ---
  components.push(
    createComponent({
      id: "boiler-plates.full-programs.strings.prog-core-operations",
      name: "prog_string_core_operations",
      type: "program",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.full-programs.strings",
      path: "boiler-plates/full-programs/strings/prog-core-operations",
      description: "Complete program demonstrating string length, copy, concat, compare, and reverse from scratch",
      signature: "int main(void);",
      code: `#include <stdio.h>

int str_len(const char* s) {
    int len = 0;
    while (s[len] != '\\0') len++;
    return len;
}

void str_cpy(char* d, const char* s) {
    int i = 0;
    while (s[i] != '\\0') { d[i] = s[i]; i++; }
    d[i] = '\\0';
}

void str_cat(char* d, const char* s) {
    int i = 0;
    while (d[i] != '\\0') i++;
    int j = 0;
    while (s[j] != '\\0') d[i++] = s[j++];
    d[i] = '\\0';
}

int str_cmp(const char* a, const char* b) {
    int i = 0;
    while (a[i] != '\\0' && b[i] != '\\0') {
        if (a[i] != b[i]) return (unsigned char)a[i] - (unsigned char)b[i];
        i++;
    }
    return (unsigned char)a[i] - (unsigned char)b[i];
}

void str_rev(char* s) {
    int l = 0, r = str_len(s) - 1;
    while (l < r) {
        char t = s[l]; s[l] = s[r]; s[r] = t;
        l++; r--;
    }
}

int main(void) {
    char buf[64];
    str_cpy(buf, "Hello");
    str_cat(buf, ", World!");
    printf("String: '%s' (Length: %d)\\n", buf, str_len(buf));
    printf("Comparison with 'Hello': %d\\n", str_cmp(buf, "Hello"));
    str_rev(buf);
    printf("Reversed: '%s'\\n", buf);
    return 0;
}`,
      tags: ["program", "strings", "core-operations"],
      aliases: ["prog_string_core_operations"],
    }),
    createComponent({
      id: "boiler-plates.full-programs.strings.prog-search-substring",
      name: "prog_string_search_substring",
      type: "program",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.full-programs.strings",
      path: "boiler-plates/full-programs/strings/prog-search-substring",
      description: "Complete program demonstrating substring find, slice extraction, and word count from scratch",
      signature: "int main(void);",
      code: `#include <stdio.h>

int str_find(const char* h, const char* n) {
    if (n[0] == '\\0') return 0;
    for (int i = 0; h[i] != '\\0'; i++) {
        int j = 0;
        while (h[i + j] != '\\0' && n[j] != '\\0' && h[i + j] == n[j]) j++;
        if (n[j] == '\\0') return i;
    }
    return -1;
}

void str_substr(const char* src, int start, int len, char* dst) {
    int i = 0;
    while (i < len && src[start + i] != '\\0') {
        dst[i] = src[start + i];
        i++;
    }
    dst[i] = '\\0';
}

int str_words(const char* s) {
    int count = 0, in_word = 0;
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] == ' ' || s[i] == '\\t' || s[i] == '\\n') in_word = 0;
        else if (!in_word) { in_word = 1; count++; }
    }
    return count;
}

int main(void) {
    const char* text = "The quick brown fox jumps over the lazy dog";
    printf("Text: '%s'\\n", text);
    printf("Word count: %d\\n", str_words(text));
    int idx = str_find(text, "brown");
    printf("Index of 'brown': %d\\n", idx);
    char slice[16];
    str_substr(text, idx, 5, slice);
    printf("Extracted slice: '%s'\\n", slice);
    return 0;
}`,
      tags: ["program", "strings", "search", "substring"],
      aliases: ["prog_string_search_substring"],
    }),
    createComponent({
      id: "boiler-plates.full-programs.strings.prog-conversions-trim",
      name: "prog_string_conversions_trim",
      type: "program",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.full-programs.strings",
      path: "boiler-plates/full-programs/strings/prog-conversions-trim",
      description: "Complete program demonstrating atoi, itoa, uppercase/lowercase, and whitespace trim from scratch",
      signature: "int main(void);",
      code: `#include <stdio.h>

void str_trim(char* s) {
    int start = 0;
    while (s[start] == ' ' || s[start] == '\\t') start++;
    int end = start;
    while (s[end] != '\\0') end++;
    end--;
    while (end >= start && (s[end] == ' ' || s[end] == '\\t')) end--;
    int i = 0;
    for (int j = start; j <= end; j++) s[i++] = s[j];
    s[i] = '\\0';
}

void str_upper(char* s) {
    for (int i = 0; s[i] != '\\0'; i++) {
        if (s[i] >= 'a' && s[i] <= 'z') s[i] = (char)(s[i] - 32);
    }
}

int str_to_int(const char* s) {
    int i = 0, res = 0, sign = 1;
    while (s[i] == ' ') i++;
    if (s[i] == '-') { sign = -1; i++; }
    else if (s[i] == '+') i++;
    while (s[i] >= '0' && s[i] <= '9') {
        res = res * 10 + (s[i] - '0');
        i++;
    }
    return res * sign;
}

int main(void) {
    char s[] = "   hello dtyp user   ";
    str_trim(s);
    printf("Trimmed: '%s'\\n", s);
    str_upper(s);
    printf("Uppercase: '%s'\\n", s);
    const char* num_str = " -12345 ";
    printf("Converted integer: %d\\n", str_to_int(num_str));
    return 0;
}`,
      tags: ["program", "strings", "conversions", "trim"],
      aliases: ["prog_string_conversions_trim"],
    })
  );

  return components;
}

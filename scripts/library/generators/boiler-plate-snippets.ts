import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateBoilerPlateSnippets(): Component[] {
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

  return components;
}

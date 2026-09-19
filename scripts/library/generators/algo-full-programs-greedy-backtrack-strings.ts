import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateAlgoGreedyBacktrackStringsFullPrograms(): Component[] {
  const components: Component[] = [];

  components.push(
    createComponent({
      id: "algorithms.full-programs.greedy.activity-selection.prog-activity-selection",
      name: "prog_greedy_activity_selection",
      type: "program",
      category: "algorithms",
      subcategory: "greedy",
      categoryId: "algorithms.full-programs.greedy.activity-selection",
      path: "algorithms/full-programs/greedy/activity-selection/prog-activity-selection",
      description: "Complete interactive program executing greedy interval Activity Selection",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_ACT 100

typedef struct {
    int id;
    int start;
    int finish;
} Activity;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int cmp_activities(const void* a, const void* b) {
    return (((const Activity*)a)->finish - ((const Activity*)b)->finish);
}

static void select_activities(void) {
    int n;
    printf("Enter number of activities N (<= %d): ", MAX_ACT);
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_ACT) {
        clear_input();
        return;
    }
    Activity acts[MAX_ACT];
    printf("Enter start and finish times for %d activities (start finish):\\n", n);
    for (int i = 0; i < n; i++) {
        acts[i].id = i + 1;
        scanf("%d %d", &acts[i].start, &acts[i].finish);
    }
    clear_input();
    qsort(acts, (size_t)n, sizeof(Activity), cmp_activities);
    printf("Selected Max Non-Overlapping Activities:\\n");
    int count = 1;
    printf("[Activity %d: (%d, %d)]\\n", acts[0].id, acts[0].start, acts[0].finish);
    int last_finish = acts[0].finish;
    for (int i = 1; i < n; i++) {
        if (acts[i].start >= last_finish) {
            printf("[Activity %d: (%d, %d)]\\n", acts[i].id, acts[i].start, acts[i].finish);
            last_finish = acts[i].finish;
            count++;
        }
    }
    printf("Total Compatible Activities: %d\\n", count);
}

int main(void) {
    int choice;
    do {
        printf("=== Activity Selection Greedy Workbench ===\\n");
        printf("1. Solve Activity Selection Problem\\n");
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
                select_activities();
                break;
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["program", "greedy", "activity-selection"],
      aliases: ["prog_greedy_activity_selection", "programActivitySelection"],
    }),

    createComponent({
      id: "algorithms.full-programs.greedy.fractional-knapsack.prog-fractional-knapsack",
      name: "prog_greedy_fractional_knapsack",
      type: "program",
      category: "algorithms",
      subcategory: "greedy",
      categoryId: "algorithms.full-programs.greedy.fractional-knapsack",
      path: "algorithms/full-programs/greedy/fractional-knapsack/prog-fractional-knapsack",
      description: "Complete interactive program solving Fractional Knapsack via greedy ratio sorting",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_ITEMS 100

typedef struct {
    int id;
    double weight;
    double value;
    double ratio;
} Item;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int cmp_ratio(const void* a, const void* b) {
    double r1 = ((const Item*)a)->ratio;
    double r2 = ((const Item*)b)->ratio;
    if (r1 < r2) return 1;
    if (r1 > r2) return -1;
    return 0;
}

static void fractional_knapsack(void) {
    int n;
    double capacity;
    printf("Enter number of items N and Knapsack Capacity W: ");
    if (scanf("%d %lf", &n, &capacity) != 2 || n <= 0 || capacity <= 0 || n > MAX_ITEMS) {
        clear_input();
        return;
    }
    Item items[MAX_ITEMS];
    printf("Enter weight and value for %d items (weight value):\\n", n);
    for (int i = 0; i < n; i++) {
        items[i].id = i + 1;
        scanf("%lf %lf", &items[i].weight, &items[i].value);
        items[i].ratio = items[i].value / items[i].weight;
    }
    clear_input();
    qsort(items, (size_t)n, sizeof(Item), cmp_ratio);
    double total_value = 0.0;
    double cur_weight = 0.0;
    printf("Selected Item Fractions:\\n");
    for (int i = 0; i < n; i++) {
        if (cur_weight + items[i].weight <= capacity) {
            cur_weight += items[i].weight;
            total_value += items[i].value;
            printf("Item %d: 100%% (weight: %.2f, value: %.2f)\\n", items[i].id, items[i].weight, items[i].value);
        } else {
            double remain = capacity - cur_weight;
            double fraction = remain / items[i].weight;
            total_value += items[i].value * fraction;
            cur_weight += remain;
            printf("Item %d: %.2f%% (weight: %.2f, value: %.2f)\\n", items[i].id, fraction * 100.0, remain, items[i].value * fraction);
            break;
        }
    }
    printf("Maximum Knapsack Value: %.4f (Capacity Used: %.2f / %.2f)\\n", total_value, cur_weight, capacity);
}

int main(void) {
    int choice;
    do {
        printf("=== Fractional Knapsack Workbench ===\\n");
        printf("1. Solve Fractional Knapsack Problem\\n");
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
                fractional_knapsack();
                break;
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["program", "greedy", "fractional-knapsack"],
      aliases: ["prog_greedy_fractional_knapsack", "programFractionalKnapsack"],
    }),

    createComponent({
      id: "algorithms.full-programs.greedy.job-sequencing.prog-job-sequencing",
      name: "prog_greedy_job_sequencing",
      type: "program",
      category: "algorithms",
      subcategory: "greedy",
      categoryId: "algorithms.full-programs.greedy.job-sequencing",
      path: "algorithms/full-programs/greedy/job-sequencing/prog-job-sequencing",
      description: "Complete interactive program solving Job Sequencing with deadlines and profits",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_JOBS 100

typedef struct {
    char id[16];
    int deadline;
    int profit;
} Job;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int cmp_jobs(const void* a, const void* b) {
    return (((const Job*)b)->profit - ((const Job*)a)->profit);
}

static void job_sequencing(void) {
    int n;
    printf("Enter number of jobs N (<= %d): ", MAX_JOBS);
    if (scanf("%d", &n) != 1 || n <= 0 || n > MAX_JOBS) {
        clear_input();
        return;
    }
    Job jobs[MAX_JOBS];
    int max_deadline = 0;
    printf("Enter job ID, deadline, and profit for %d jobs (e.g. J1 2 100):\\n", n);
    for (int i = 0; i < n; i++) {
        scanf("%15s %d %d", jobs[i].id, &jobs[i].deadline, &jobs[i].profit);
        if (jobs[i].deadline > max_deadline) max_deadline = jobs[i].deadline;
    }
    clear_input();
    qsort(jobs, (size_t)n, sizeof(Job), cmp_jobs);
    int slot[MAX_JOBS + 1];
    for (int i = 0; i <= max_deadline; i++) slot[i] = -1;
    int total_profit = 0, count = 0;
    for (int i = 0; i < n; i++) {
        for (int j = jobs[i].deadline; j > 0; j--) {
            if (slot[j] == -1) {
                slot[j] = i;
                total_profit += jobs[i].profit;
                count++;
                break;
            }
        }
    }
    printf("Scheduled Jobs for Maximum Profit: ");
    for (int i = 1; i <= max_deadline; i++) {
        if (slot[i] != -1) {
            printf("[%s at slot %d] ", jobs[slot[i]].id, i);
        }
    }
    printf("\\nTotal Scheduled Jobs: %d | Maximum Profit: %d\\n", count, total_profit);
}

int main(void) {
    int choice;
    do {
        printf("=== Job Sequencing with Deadlines Workbench ===\\n");
        printf("1. Solve Job Sequencing Problem\\n");
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
                job_sequencing();
                break;
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["program", "greedy", "job-sequencing"],
      aliases: ["prog_greedy_job_sequencing", "programJobSequencing"],
    }),

    createComponent({
      id: "algorithms.full-programs.backtracking.n-queens.prog-n-queens",
      name: "prog_backtracking_n_queens",
      type: "program",
      category: "algorithms",
      subcategory: "backtracking",
      categoryId: "algorithms.full-programs.backtracking.n-queens",
      path: "algorithms/full-programs/backtracking/n-queens/prog-n-queens",
      description: "Complete interactive program solving N-Queens puzzle with visual chessboard display",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_N 12

static int board[MAX_N];
static int total_solutions = 0;
static int max_display = 3;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int is_safe(int row, int col) {
    for (int prev_row = 0; prev_row < row; prev_row++) {
        int prev_col = board[prev_row];
        if (prev_col == col) return 0;
        if (abs(prev_col - col) == abs(prev_row - row)) return 0;
    }
    return 1;
}

static void print_board(int n) {
    printf("Solution #%d:\\n", total_solutions);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (board[i] == j) printf("[Q] ");
            else printf("[.] ");
        }
        putchar('\\n');
    }
    putchar('\\n');
}

static void solve_queens(int row, int n) {
    if (row == n) {
        total_solutions++;
        if (total_solutions <= max_display) {
            print_board(n);
        }
        return;
    }
    for (int col = 0; col < n; col++) {
        if (is_safe(row, col)) {
            board[row] = col;
            solve_queens(row + 1, n);
        }
    }
}

int main(void) {
    int choice;
    do {
        printf("=== N-Queens Backtracking Workbench ===\\n");
        printf("1. Solve N-Queens Puzzle\\n");
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
                int n;
                printf("Enter chessboard size N (1 to 12): ");
                if (scanf("%d", &n) == 1 && n >= 1 && n <= MAX_N) {
                    clear_input();
                    total_solutions = 0;
                    solve_queens(0, n);
                    printf("Total distinct solutions for %dx%d board: %d\\n", n, n, total_solutions);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["program", "backtracking", "n-queens"],
      aliases: ["prog_backtracking_n_queens", "programNQueens"],
    }),

    createComponent({
      id: "algorithms.full-programs.backtracking.maze-solver.prog-maze-solver",
      name: "prog_backtracking_maze",
      type: "program",
      category: "algorithms",
      subcategory: "backtracking",
      categoryId: "algorithms.full-programs.backtracking.maze-solver",
      path: "algorithms/full-programs/backtracking/maze-solver/prog-maze-solver",
      description: "Complete interactive program solving 2D grid maze pathfinding via backtracking",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_DIM 20

static int maze[MAX_DIM][MAX_DIM];
static int path_sol[MAX_DIM][MAX_DIM];
static int R = 4, C = 4;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int is_valid_cell(int r, int c) {
    return (r >= 0 && r < R && c >= 0 && c < C && maze[r][c] == 1 && path_sol[r][c] == 0);
}

static int solve_maze_rec(int r, int c) {
    if (r == R - 1 && c == C - 1 && maze[r][c] == 1) {
        path_sol[r][c] = 1;
        return 1;
    }
    if (is_valid_cell(r, c)) {
        path_sol[r][c] = 1;
        if (solve_maze_rec(r + 1, c)) return 1;
        if (solve_maze_rec(r, c + 1)) return 1;
        if (solve_maze_rec(r - 1, c)) return 1;
        if (solve_maze_rec(r, c - 1)) return 1;
        path_sol[r][c] = 0;
        return 0;
    }
    return 0;
}

int main(void) {
    int choice;
    do {
        printf("=== 2D Maze Pathfinding Workbench ===\\n");
        printf("1. Enter Custom Maze Grid and Find Path\\n");
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
                int r, c;
                printf("Enter dimensions R and C (<= %d): ", MAX_DIM);
                if (scanf("%d %d", &r, &c) == 2 && r > 0 && c > 0 && r <= MAX_DIM && c <= MAX_DIM) {
                    R = r; C = c;
                    printf("Enter %d x %d maze (1: open, 0: wall):\\n", R, C);
                    for (int i = 0; i < R; i++) {
                        for (int j = 0; j < C; j++) {
                            scanf("%d", &maze[i][j]);
                            path_sol[i][j] = 0;
                        }
                    }
                    clear_input();
                    if (solve_maze_rec(0, 0)) {
                        printf("Path from (0,0) to (%d,%d) found!\\n", R - 1, C - 1);
                        for (int i = 0; i < R; i++) {
                            for (int j = 0; j < C; j++) {
                                if (path_sol[i][j] == 1) printf("[*] ");
                                else if (maze[i][j] == 0) printf("[#] ");
                                else printf("[.] ");
                            }
                            putchar('\\n');
                        }
                    } else {
                        printf("No path exists through the maze.\\n");
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["program", "backtracking", "maze-solver"],
      aliases: ["prog_backtracking_maze", "programMazeSolver"],
    }),

    createComponent({
      id: "algorithms.full-programs.backtracking.combinatorial.prog-permutations",
      name: "prog_backtracking_permutations",
      type: "program",
      category: "algorithms",
      subcategory: "backtracking",
      categoryId: "algorithms.full-programs.backtracking.combinatorial",
      path: "algorithms/full-programs/backtracking/combinatorial/prog-permutations",
      description: "Complete interactive program generating permutations and power set via backtracking",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_CHAR 12

static int perm_count = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void swap_char(char* a, char* b) {
    char tmp = *a; *a = *b; *b = tmp;
}

static void permute(char* str, int l, int r) {
    if (l == r) {
        perm_count++;
        printf("%s ", str);
        if (perm_count % 10 == 0) putchar('\\n');
        return;
    }
    for (int i = l; i <= r; i++) {
        swap_char(&str[l], &str[i]);
        permute(str, l + 1, r);
        swap_char(&str[l], &str[i]);
    }
}

static void power_set(const char* str, char* current, int idx, int curr_len, int n) {
    if (idx == n) {
        current[curr_len] = '\\0';
        printf("{ %s }\\n", current);
        return;
    }
    current[curr_len] = str[idx];
    power_set(str, current, idx + 1, curr_len + 1, n);
    power_set(str, current, idx + 1, curr_len, n);
}

int main(void) {
    int choice;
    do {
        printf("=== Combinatorial Generation Workbench ===\\n");
        printf("1. Generate All Permutations of a String\\n");
        printf("2. Generate Power Set (All Subsets)\\n");
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
                char str[MAX_CHAR];
                printf("Enter string (up to 8 characters): ");
                if (scanf("%7s", str) == 1) {
                    clear_input();
                    perm_count = 0;
                    int n = (int)strlen(str);
                    printf("Permutations of '%s':\\n", str);
                    permute(str, 0, n - 1);
                    printf("\\nTotal permutations: %d\\n", perm_count);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                char str[MAX_CHAR];
                char buf[MAX_CHAR];
                printf("Enter characters (up to 6 characters): ");
                if (scanf("%5s", str) == 1) {
                    clear_input();
                    int n = (int)strlen(str);
                    printf("Power set of '%s':\\n", str);
                    power_set(str, buf, 0, 0, n);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["program", "backtracking", "permutations", "combinatorial"],
      aliases: ["prog_backtracking_permutations", "programPermutations"],
    }),

    createComponent({
      id: "algorithms.full-programs.string-algorithms.kmp.prog-kmp",
      name: "prog_string_kmp",
      type: "program",
      category: "algorithms",
      subcategory: "string-algorithms",
      categoryId: "algorithms.full-programs.string-algorithms.kmp",
      path: "algorithms/full-programs/string-algorithms/kmp/prog-kmp",
      description: "Complete interactive program running Knuth-Morris-Pratt (KMP) pattern matching",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_TEXT 1000
#define MAX_PAT 200

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void compute_lps(const char* pat, int m, int* lps) {
    int len = 0;
    lps[0] = 0;
    int i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
}

static void kmp_search(const char* text, const char* pat) {
    int n = (int)strlen(text);
    int m = (int)strlen(pat);
    int lps[MAX_PAT];
    compute_lps(pat, m, lps);
    printf("LPS Array: ");
    for (int i = 0; i < m; i++) printf("%d ", lps[i]);
    putchar('\\n');
    int i = 0, j = 0, count = 0;
    printf("Pattern found at indices: ");
    while (i < n) {
        if (pat[j] == text[i]) {
            i++; j++;
        }
        if (j == m) {
            printf("%d ", i - j);
            count++;
            j = lps[j - 1];
        } else if (i < n && pat[j] != text[i]) {
            if (j != 0) j = lps[j - 1];
            else i++;
        }
    }
    if (count == 0) printf("None");
    printf("\\nTotal Matches: %d\\n", count);
}

int main(void) {
    int choice;
    do {
        printf("=== KMP Pattern Matching Workbench ===\\n");
        printf("1. Search Pattern in Text using KMP Algorithm\\n");
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
                char text[MAX_TEXT], pat[MAX_PAT];
                printf("Enter text: ");
                if (scanf("%999s", text) == 1) {
                    printf("Enter pattern: ");
                    if (scanf("%199s", pat) == 1) {
                        clear_input();
                        kmp_search(text, pat);
                    } else {
                        clear_input();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["program", "string", "kmp"],
      aliases: ["prog_string_kmp", "programKmpSearch"],
    }),

    createComponent({
      id: "algorithms.full-programs.string-algorithms.rabin-karp.prog-rabin-karp",
      name: "prog_string_rabin_karp",
      type: "program",
      category: "algorithms",
      subcategory: "string-algorithms",
      categoryId: "algorithms.full-programs.string-algorithms.rabin-karp",
      path: "algorithms/full-programs/string-algorithms/rabin-karp/prog-rabin-karp",
      description: "Complete interactive program running Rabin-Karp rolling hash substring search",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_TEXT 1000
#define MAX_PAT 200
#define PRIME_MOD 1000000007LL
#define BASE 256

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void rabin_karp_search(const char* text, const char* pat) {
    int n = (int)strlen(text);
    int m = (int)strlen(pat);
    if (m > n) {
        printf("Pattern is longer than text.\\n");
        return;
    }
    long long h = 1;
    for (int i = 0; i < m - 1; i++) {
        h = (h * BASE) % PRIME_MOD;
    }
    long long p_hash = 0, t_hash = 0;
    for (int i = 0; i < m; i++) {
        p_hash = (BASE * p_hash + (unsigned char)pat[i]) % PRIME_MOD;
        t_hash = (BASE * t_hash + (unsigned char)text[i]) % PRIME_MOD;
    }
    int matches = 0, collisions = 0;
    printf("Pattern found at indices: ");
    for (int i = 0; i <= n - m; i++) {
        if (p_hash == t_hash) {
            int match = 1;
            for (int j = 0; j < m; j++) {
                if (text[i + j] != pat[j]) {
                    match = 0;
                    break;
                }
            }
            if (match) {
                printf("%d ", i);
                matches++;
            } else {
                collisions++;
            }
        }
        if (i < n - m) {
            t_hash = (BASE * (t_hash - (unsigned char)text[i] * h) + (unsigned char)text[i + m]) % PRIME_MOD;
            if (t_hash < 0) t_hash += PRIME_MOD;
        }
    }
    if (matches == 0) printf("None");
    printf("\\nTotal Matches: %d | Hash Collisions: %d\\n", matches, collisions);
}

int main(void) {
    int choice;
    do {
        printf("=== Rabin-Karp Rolling Hash Workbench ===\\n");
        printf("1. Search Pattern in Text using Rabin-Karp\\n");
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
                char text[MAX_TEXT], pat[MAX_PAT];
                printf("Enter text: ");
                if (scanf("%999s", text) == 1) {
                    printf("Enter pattern: ");
                    if (scanf("%199s", pat) == 1) {
                        clear_input();
                        rabin_karp_search(text, pat);
                    } else {
                        clear_input();
                    }
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["program", "string", "rabin-karp"],
      aliases: ["prog_string_rabin_karp", "programRabinKarpSearch"],
    }),

    createComponent({
      id: "algorithms.full-programs.string-algorithms.palindromes.prog-palindromes",
      name: "prog_string_longest_palindrome",
      type: "program",
      category: "algorithms",
      subcategory: "string-algorithms",
      categoryId: "algorithms.full-programs.string-algorithms.palindromes",
      path: "algorithms/full-programs/string-algorithms/palindromes/prog-palindromes",
      description: "Complete interactive program finding longest palindromic substring and checking palindromes",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_LEN 500

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void find_longest_palindrome(const char* s) {
    int n = (int)strlen(s);
    if (n == 0) return;
    int start = 0, max_len = 1;
    for (int i = 0; i < n; i++) {
        int l = i, r = i;
        while (l >= 0 && r < n && s[l] == s[r]) {
            if (r - l + 1 > max_len) {
                start = l;
                max_len = r - l + 1;
            }
            l--; r++;
        }
        l = i; r = i + 1;
        while (l >= 0 && r < n && s[l] == s[r]) {
            if (r - l + 1 > max_len) {
                start = l;
                max_len = r - l + 1;
            }
            l--; r++;
        }
    }
    printf("Longest Palindromic Substring: \\"");
    for (int i = 0; i < max_len; i++) putchar(s[start + i]);
    printf("\\" (Length: %d, Starting Index: %d)\\n", max_len, start);
}

static int is_palindrome(const char* s) {
    int l = 0, r = (int)strlen(s) - 1;
    while (l < r) {
        if (s[l] != s[r]) return 0;
        l++; r--;
    }
    return 1;
}

int main(void) {
    int choice;
    do {
        printf("=== Palindrome Algorithms Workbench ===\\n");
        printf("1. Find Longest Palindromic Substring O(N^2) Time, O(1) Space\\n");
        printf("2. Check If String is Full Palindrome\\n");
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
                char s[MAX_LEN];
                printf("Enter string: ");
                if (scanf("%499s", s) == 1) {
                    clear_input();
                    find_longest_palindrome(s);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                char s[MAX_LEN];
                printf("Enter string: ");
                if (scanf("%499s", s) == 1) {
                    clear_input();
                    printf("String '%s' is %sa palindrome.\\n", s, is_palindrome(s) ? "" : "NOT ");
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting suite.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["program", "string", "palindromes"],
      aliases: ["prog_string_longest_palindrome", "programPalindromes"],
    })
  );

  return components;
}

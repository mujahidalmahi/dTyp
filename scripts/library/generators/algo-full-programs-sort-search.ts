import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateAlgoSortSearchFullPrograms(): Component[] {
  const components: Component[] = [];

  components.push(
    createComponent({
      id: "algorithms.full-programs.sorting.elementary-sorts.prog-elementary-sorts",
      name: "prog_sort_elementary",
      type: "program",
      category: "algorithms",
      subcategory: "sorting",
      categoryId: "algorithms.full-programs.sorting.elementary-sorts",
      path: "algorithms/full-programs/sorting/elementary-sorts/prog-elementary-sorts",
      description: "Complete interactive program comparing Bubble, Selection, and Insertion sorts with operation counters",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_N 500

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_array(const int* arr, int n) {
    printf("Array [%d elements]: ", n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    putchar('\\n');
}

static void copy_array(const int* src, int* dst, int n) {
    for (int i = 0; i < n; i++) dst[i] = src[i];
}

static void bubble_sort(int* arr, int n, int* comps, int* swaps) {
    *comps = 0;
    *swaps = 0;
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            (*comps)++;
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
                (*swaps)++;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}

static void selection_sort(int* arr, int n, int* comps, int* swaps) {
    *comps = 0;
    *swaps = 0;
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            (*comps)++;
            if (arr[j] < arr[min_idx]) min_idx = j;
        }
        if (min_idx != i) {
            int tmp = arr[i]; arr[i] = arr[min_idx]; arr[min_idx] = tmp;
            (*swaps)++;
        }
    }
}

static void insertion_sort(int* arr, int n, int* comps, int* swaps) {
    *comps = 0;
    *swaps = 0;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0) {
            (*comps)++;
            if (arr[j] > key) {
                arr[j + 1] = arr[j];
                (*swaps)++;
                j--;
            } else {
                break;
            }
        }
        arr[j + 1] = key;
    }
}

int main(void) {
    int choice;
    int n = 0;
    int base_arr[MAX_N];
    int work_arr[MAX_N];
    do {
        printf("=== Elementary Sorts Workbench ===\\n");
        printf("Current Dataset Size: %d\\n", n);
        printf("1. Enter Custom Array\\n");
        printf("2. Run Bubble Sort (with Comparisons & Swaps)\\n");
        printf("3. Run Selection Sort (with Comparisons & Swaps)\\n");
        printf("4. Run Insertion Sort (with Comparisons & Swaps)\\n");
        printf("5. Compare All Three Elementary Sorts\\n");
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
                printf("Enter number of elements N (<= %d): ", MAX_N);
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_N) {
                    printf("Enter %d integers: ", n);
                    for (int i = 0; i < n; i++) scanf("%d", &base_arr[i]);
                    clear_input();
                    print_array(base_arr, n);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (n == 0) {
                    printf("Enter an array first.\\n");
                    break;
                }
                copy_array(base_arr, work_arr, n);
                int c, s;
                bubble_sort(work_arr, n, &c, &s);
                printf("Bubble Sorted: ");
                print_array(work_arr, n);
                printf("Comparisons: %d | Swaps: %d\\n", c, s);
                break;
            }
            case 3: {
                if (n == 0) {
                    printf("Enter an array first.\\n");
                    break;
                }
                copy_array(base_arr, work_arr, n);
                int c, s;
                selection_sort(work_arr, n, &c, &s);
                printf("Selection Sorted: ");
                print_array(work_arr, n);
                printf("Comparisons: %d | Swaps: %d\\n", c, s);
                break;
            }
            case 4: {
                if (n == 0) {
                    printf("Enter an array first.\\n");
                    break;
                }
                copy_array(base_arr, work_arr, n);
                int c, s;
                insertion_sort(work_arr, n, &c, &s);
                printf("Insertion Sorted: ");
                print_array(work_arr, n);
                printf("Comparisons: %d | Shifts: %d\\n", c, s);
                break;
            }
            case 5: {
                if (n == 0) {
                    printf("Enter an array first.\\n");
                    break;
                }
                int c1, s1, c2, s2, c3, s3;
                copy_array(base_arr, work_arr, n);
                bubble_sort(work_arr, n, &c1, &s1);
                copy_array(base_arr, work_arr, n);
                selection_sort(work_arr, n, &c2, &s2);
                copy_array(base_arr, work_arr, n);
                insertion_sort(work_arr, n, &c3, &s3);
                printf("%-16s | %-12s | %-12s\\n", "Algorithm", "Comparisons", "Swaps/Shifts");
                printf("----------------------------------------\\n");
                printf("%-16s | %-12d | %-12d\\n", "Bubble Sort", c1, s1);
                printf("%-16s | %-12d | %-12d\\n", "Selection Sort", c2, s2);
                printf("%-16s | %-12d | %-12d\\n", "Insertion Sort", c3, s3);
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
      tags: ["program", "sorting", "elementary-sorts"],
      aliases: ["prog_sort_elementary", "programElementarySorts"],
    }),

    createComponent({
      id: "algorithms.full-programs.sorting.quick-sort.prog-quick-sort",
      name: "prog_sort_quick",
      type: "program",
      category: "algorithms",
      subcategory: "sorting",
      categoryId: "algorithms.full-programs.sorting.quick-sort",
      path: "algorithms/full-programs/sorting/quick-sort/prog-quick-sort",
      description: "Complete interactive program executing Quick Sort with Lomuto and Hoare partitions",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_N 500

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_array(const int* arr, int n) {
    printf("Array [%d elements]: ", n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    putchar('\\n');
}

static int lomuto_partition(int* arr, int low, int high, int* comps, int* swaps) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        (*comps)++;
        if (arr[j] <= pivot) {
            i++;
            int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
            (*swaps)++;
        }
    }
    int tmp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = tmp;
    (*swaps)++;
    return i + 1;
}

static void quick_sort_lomuto(int* arr, int low, int high, int* comps, int* swaps) {
    if (low < high) {
        int pi = lomuto_partition(arr, low, high, comps, swaps);
        quick_sort_lomuto(arr, low, pi - 1, comps, swaps);
        quick_sort_lomuto(arr, pi + 1, high, comps, swaps);
    }
}

static int hoare_partition(int* arr, int low, int high, int* comps, int* swaps) {
    int pivot = arr[low];
    int i = low - 1;
    int j = high + 1;
    while (1) {
        do { i++; (*comps)++; } while (arr[i] < pivot);
        do { j--; (*comps)++; } while (arr[j] > pivot);
        if (i >= j) return j;
        int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        (*swaps)++;
    }
}

static void quick_sort_hoare(int* arr, int low, int high, int* comps, int* swaps) {
    if (low < high) {
        int pi = hoare_partition(arr, low, high, comps, swaps);
        quick_sort_hoare(arr, low, pi, comps, swaps);
        quick_sort_hoare(arr, pi + 1, high, comps, swaps);
    }
}

int main(void) {
    int choice;
    int n = 0;
    int arr[MAX_N];
    do {
        printf("=== Quick Sort Workbench ===\\n");
        printf("1. Enter Custom Array\\n");
        printf("2. Sort with Lomuto Partitioning\\n");
        printf("3. Sort with Hoare Partitioning\\n");
        printf("4. Sort Descending Order\\n");
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
                printf("Enter N (<= %d): ", MAX_N);
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_N) {
                    printf("Enter %d elements: ", n);
                    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
                    clear_input();
                    print_array(arr, n);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (n == 0) {
                    printf("Enter an array first.\\n");
                    break;
                }
                int comps = 0, swaps = 0;
                quick_sort_lomuto(arr, 0, n - 1, &comps, &swaps);
                printf("Sorted (Lomuto): ");
                print_array(arr, n);
                printf("Comparisons: %d | Swaps: %d\\n", comps, swaps);
                break;
            }
            case 3: {
                if (n == 0) {
                    printf("Enter an array first.\\n");
                    break;
                }
                int comps = 0, swaps = 0;
                quick_sort_hoare(arr, 0, n - 1, &comps, &swaps);
                printf("Sorted (Hoare): ");
                print_array(arr, n);
                printf("Comparisons: %d | Swaps: %d\\n", comps, swaps);
                break;
            }
            case 4: {
                if (n == 0) {
                    printf("Enter an array first.\\n");
                    break;
                }
                int comps = 0, swaps = 0;
                quick_sort_lomuto(arr, 0, n - 1, &comps, &swaps);
                for (int i = 0; i < n / 2; i++) {
                    int tmp = arr[i]; arr[i] = arr[n - 1 - i]; arr[n - 1 - i] = tmp;
                }
                printf("Descending: ");
                print_array(arr, n);
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
      tags: ["program", "sorting", "quick-sort"],
      aliases: ["prog_sort_quick", "programQuickSort"],
    }),

    createComponent({
      id: "algorithms.full-programs.sorting.merge-sort.prog-merge-sort",
      name: "prog_sort_merge",
      type: "program",
      category: "algorithms",
      subcategory: "sorting",
      categoryId: "algorithms.full-programs.sorting.merge-sort",
      path: "algorithms/full-programs/sorting/merge-sort/prog-merge-sort",
      description: "Complete interactive program executing divide-and-conquer Merge Sort and counting inversions",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_N 500

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_array(const int* arr, int n) {
    printf("Array [%d elements]: ", n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    putchar('\\n');
}

static long long merge(int* arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int L[MAX_N], R[MAX_N];
    for (int i = 0; i < n1; i++) L[i] = arr[left + i];
    for (int j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    int i = 0, j = 0, k = left;
    long long inv_count = 0;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
            inv_count += (n1 - i);
        }
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
    return inv_count;
}

static long long merge_sort(int* arr, int left, int right) {
    long long inv_count = 0;
    if (left < right) {
        int mid = left + (right - left) / 2;
        inv_count += merge_sort(arr, left, mid);
        inv_count += merge_sort(arr, mid + 1, right);
        inv_count += merge(arr, left, mid, right);
    }
    return inv_count;
}

int main(void) {
    int choice;
    int n = 0;
    int arr[MAX_N];
    do {
        printf("=== Merge Sort Workbench ===\\n");
        printf("1. Enter Custom Array\\n");
        printf("2. Run Recursive Merge Sort\\n");
        printf("3. Calculate Inversion Count\\n");
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
                printf("Enter N (<= %d): ", MAX_N);
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_N) {
                    printf("Enter %d integers: ", n);
                    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
                    clear_input();
                    print_array(arr, n);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (n == 0) {
                    printf("Enter an array first.\\n");
                    break;
                }
                long long inv = merge_sort(arr, 0, n - 1);
                printf("Merge Sorted: ");
                print_array(arr, n);
                printf("Total inversions in original array: %lld\\n", inv);
                break;
            }
            case 3: {
                if (n == 0) {
                    printf("Enter an array first.\\n");
                    break;
                }
                int temp[MAX_N];
                for (int i = 0; i < n; i++) temp[i] = arr[i];
                long long inv = merge_sort(temp, 0, n - 1);
                printf("Number of inversions: %lld\\n", inv);
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
      tags: ["program", "sorting", "merge-sort"],
      aliases: ["prog_sort_merge", "programMergeSort"],
    }),

    createComponent({
      id: "algorithms.full-programs.sorting.heap-sort.prog-heap-sort",
      name: "prog_sort_heap",
      type: "program",
      category: "algorithms",
      subcategory: "sorting",
      categoryId: "algorithms.full-programs.sorting.heap-sort",
      path: "algorithms/full-programs/sorting/heap-sort/prog-heap-sort",
      description: "Complete interactive program executing in-place binary Heap Sort with max-heapify",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_N 500

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_array(const int* arr, int n) {
    printf("Array [%d elements]: ", n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    putchar('\\n');
}

static void max_heapify(int* arr, int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;
    if (largest != i) {
        int tmp = arr[i]; arr[i] = arr[largest]; arr[largest] = tmp;
        max_heapify(arr, n, largest);
    }
}

static void heap_sort(int* arr, int n) {
    for (int i = n / 2 - 1; i >= 0; i--) max_heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int tmp = arr[0]; arr[0] = arr[i]; arr[i] = tmp;
        max_heapify(arr, i, 0);
    }
}

int main(void) {
    int choice;
    int n = 0;
    int arr[MAX_N];
    do {
        printf("=== Heap Sort Workbench ===\\n");
        printf("1. Enter Custom Array\\n");
        printf("2. Build Max-Heap\\n");
        printf("3. Run Complete In-Place Heap Sort\\n");
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
                printf("Enter N (<= %d): ", MAX_N);
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_N) {
                    printf("Enter %d integers: ", n);
                    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
                    clear_input();
                    print_array(arr, n);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (n == 0) {
                    printf("Enter an array first.\\n");
                    break;
                }
                for (int i = n / 2 - 1; i >= 0; i--) max_heapify(arr, n, i);
                printf("Max-Heap constructed: ");
                print_array(arr, n);
                break;
            }
            case 3: {
                if (n == 0) {
                    printf("Enter an array first.\\n");
                    break;
                }
                heap_sort(arr, n);
                printf("Heap Sorted: ");
                print_array(arr, n);
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
      tags: ["program", "sorting", "heap-sort"],
      aliases: ["prog_sort_heap", "programHeapSort"],
    }),

    createComponent({
      id: "algorithms.full-programs.sorting.non-comparison-sorts.prog-counting-radix",
      name: "prog_sort_counting_radix",
      type: "program",
      category: "algorithms",
      subcategory: "sorting",
      categoryId: "algorithms.full-programs.sorting.non-comparison-sorts",
      path: "algorithms/full-programs/sorting/non-comparison-sorts/prog-counting-radix",
      description: "Complete interactive program executing non-comparison Counting Sort and Radix Sort (base-10)",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_N 500
#define MAX_VAL 10000

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_array(const int* arr, int n) {
    printf("Array [%d elements]: ", n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    putchar('\\n');
}

static void counting_sort(int* arr, int n) {
    int max_val = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max_val) max_val = arr[i];
    }
    int count[MAX_VAL + 1] = {0};
    for (int i = 0; i < n; i++) count[arr[i]]++;
    int idx = 0;
    for (int v = 0; v <= max_val; v++) {
        while (count[v] > 0) {
            arr[idx++] = v;
            count[v]--;
        }
    }
}

static void radix_count_sort(int* arr, int n, int exp) {
    int output[MAX_N];
    int count[10] = {0};
    for (int i = 0; i < n; i++) count[(arr[i] / exp) % 10]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        output[count[(arr[i] / exp) % 10] - 1] = arr[i];
        count[(arr[i] / exp) % 10]--;
    }
    for (int i = 0; i < n; i++) arr[i] = output[i];
}

static void radix_sort(int* arr, int n) {
    int max_val = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max_val) max_val = arr[i];
    }
    for (int exp = 1; max_val / exp > 0; exp *= 10) {
        radix_count_sort(arr, n, exp);
    }
}

int main(void) {
    int choice;
    int n = 0;
    int arr[MAX_N];
    do {
        printf("=== Non-Comparison Sorts Workbench ===\\n");
        printf("1. Enter Custom Non-Negative Array\\n");
        printf("2. Run Counting Sort O(N + K)\\n");
        printf("3. Run Radix Sort (LSD Base 10) O(d * (N + b))\\n");
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
                printf("Enter N (<= %d): ", MAX_N);
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_N) {
                    printf("Enter %d non-negative integers (<= %d): ", n, MAX_VAL);
                    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
                    clear_input();
                    print_array(arr, n);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (n == 0) {
                    printf("Enter an array first.\\n");
                    break;
                }
                counting_sort(arr, n);
                printf("Counting Sorted: ");
                print_array(arr, n);
                break;
            }
            case 3: {
                if (n == 0) {
                    printf("Enter an array first.\\n");
                    break;
                }
                radix_sort(arr, n);
                printf("Radix Sorted: ");
                print_array(arr, n);
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
      tags: ["program", "sorting", "counting-sort", "radix-sort"],
      aliases: ["prog_sort_counting_radix", "programCountingRadixSort"],
    }),

    createComponent({
      id: "algorithms.full-programs.searching.linear-search.prog-linear-search",
      name: "prog_search_linear",
      type: "program",
      category: "algorithms",
      subcategory: "searching",
      categoryId: "algorithms.full-programs.searching.linear-search",
      path: "algorithms/full-programs/searching/linear-search/prog-linear-search",
      description: "Complete interactive program running standard and sentinel linear search",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_N 500

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_array(const int* arr, int n) {
    printf("Array [%d elements]: ", n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    putchar('\\n');
}

static int linear_search(const int* arr, int n, int target, int* comps) {
    *comps = 0;
    for (int i = 0; i < n; i++) {
        (*comps)++;
        if (arr[i] == target) return i;
    }
    return -1;
}

static int sentinel_search(int* arr, int n, int target, int* comps) {
    *comps = 0;
    int last = arr[n - 1];
    arr[n - 1] = target;
    int i = 0;
    while (arr[i] != target) {
        (*comps)++;
        i++;
    }
    arr[n - 1] = last;
    (*comps)++;
    if (i < n - 1 || arr[n - 1] == target) return i;
    return -1;
}

int main(void) {
    int choice;
    int n = 0;
    int arr[MAX_N + 1];
    do {
        printf("=== Linear Search Workbench ===\\n");
        printf("1. Enter Custom Array\\n");
        printf("2. Sequential Linear Search\\n");
        printf("3. Sentinel Linear Search (Optimized Loop)\\n");
        printf("4. Find All Occurrences of Target\\n");
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
                printf("Enter N (<= %d): ", MAX_N);
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_N) {
                    printf("Enter %d integers: ", n);
                    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
                    clear_input();
                    print_array(arr, n);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (n == 0) {
                    printf("Enter array first.\\n");
                    break;
                }
                int target;
                printf("Enter target to search: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    int comps = 0;
                    int idx = linear_search(arr, n, target, &comps);
                    if (idx != -1) printf("Found %d at index %d (comparisons: %d)\\n", target, idx, comps);
                    else printf("Target %d not found (comparisons: %d)\\n", target, comps);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (n == 0) {
                    printf("Enter array first.\\n");
                    break;
                }
                int target;
                printf("Enter target to search: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    int comps = 0;
                    int idx = sentinel_search(arr, n, target, &comps);
                    if (idx != -1) printf("Sentinel found %d at index %d (comparisons: %d)\\n", target, idx, comps);
                    else printf("Target %d not found (comparisons: %d)\\n", target, comps);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (n == 0) {
                    printf("Enter array first.\\n");
                    break;
                }
                int target;
                printf("Enter target: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    int count = 0;
                    printf("Occurrences at indices: ");
                    for (int i = 0; i < n; i++) {
                        if (arr[i] == target) {
                            printf("%d ", i);
                            count++;
                        }
                    }
                    if (count == 0) printf("None");
                    printf("\\nTotal count: %d\\n", count);
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
      tags: ["program", "searching", "linear-search"],
      aliases: ["prog_search_linear", "programLinearSearch"],
    }),

    createComponent({
      id: "algorithms.full-programs.searching.binary-search.prog-binary-search",
      name: "prog_search_binary",
      type: "program",
      category: "algorithms",
      subcategory: "searching",
      categoryId: "algorithms.full-programs.searching.binary-search",
      path: "algorithms/full-programs/searching/binary-search/prog-binary-search",
      description: "Complete interactive program executing Binary Search, lower bound, and upper bound",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_N 500

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int cmp_int(const void* a, const void* b) {
    return (*(const int*)a - *(const int*)b);
}

static void print_array(const int* arr, int n) {
    printf("Sorted Array [%d elements]: ", n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    putchar('\\n');
}

static int binary_search(const int* arr, int n, int target, int* comps) {
    *comps = 0;
    int low = 0, high = n - 1;
    while (low <= high) {
        (*comps)++;
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

static int lower_bound(const int* arr, int n, int target) {
    int low = 0, high = n;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] >= target) high = mid;
        else low = mid + 1;
    }
    return low;
}

static int upper_bound(const int* arr, int n, int target) {
    int low = 0, high = n;
    while (low < high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] > target) high = mid;
        else low = mid + 1;
    }
    return low;
}

int main(void) {
    int choice;
    int n = 0;
    int arr[MAX_N];
    do {
        printf("=== Binary Search Workbench ===\\n");
        printf("1. Enter Custom Array (Auto-Sorted)\\n");
        printf("2. Exact Binary Search (O(log N))\\n");
        printf("3. Lower Bound (First Element >= Target)\\n");
        printf("4. Upper Bound (First Element > Target)\\n");
        printf("5. Equal Range Frequency Count\\n");
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
                printf("Enter N (<= %d): ", MAX_N);
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_N) {
                    printf("Enter %d integers: ", n);
                    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
                    clear_input();
                    qsort(arr, (size_t)n, sizeof(int), cmp_int);
                    print_array(arr, n);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (n == 0) {
                    printf("Enter array first.\\n");
                    break;
                }
                int target;
                printf("Enter target: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    int comps = 0;
                    int idx = binary_search(arr, n, target, &comps);
                    if (idx != -1) printf("Found %d at index %d (comparisons: %d)\\n", target, idx, comps);
                    else printf("Target %d not found (comparisons: %d)\\n", target, comps);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (n == 0) {
                    printf("Enter array first.\\n");
                    break;
                }
                int target;
                printf("Enter target: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    int lb = lower_bound(arr, n, target);
                    if (lb < n) printf("Lower bound of %d: index %d (value: %d)\\n", target, lb, arr[lb]);
                    else printf("No element >= %d exists.\\n", target);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                if (n == 0) {
                    printf("Enter array first.\\n");
                    break;
                }
                int target;
                printf("Enter target: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    int ub = upper_bound(arr, n, target);
                    if (ub < n) printf("Upper bound of %d: index %d (value: %d)\\n", target, ub, arr[ub]);
                    else printf("No element > %d exists.\\n", target);
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                if (n == 0) {
                    printf("Enter array first.\\n");
                    break;
                }
                int target;
                printf("Enter target: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    int lb = lower_bound(arr, n, target);
                    int ub = upper_bound(arr, n, target);
                    printf("Frequency of %d: %d occurrences (range [%d, %d))\\n",
                           target, ub - lb, lb, ub);
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
      tags: ["program", "searching", "binary-search"],
      aliases: ["prog_search_binary", "programBinarySearch"],
    }),

    createComponent({
      id: "algorithms.full-programs.searching.jump-interpolation.prog-jump-search",
      name: "prog_search_jump_interpolation",
      type: "program",
      category: "algorithms",
      subcategory: "searching",
      categoryId: "algorithms.full-programs.searching.jump-interpolation",
      path: "algorithms/full-programs/searching/jump-interpolation/prog-jump-search",
      description: "Complete interactive program running Jump Search and formula Interpolation Search",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define MAX_N 500

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int cmp_int(const void* a, const void* b) {
    return (*(const int*)a - *(const int*)b);
}

static void print_array(const int* arr, int n) {
    printf("Sorted Array [%d elements]: ", n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    putchar('\\n');
}

static int jump_search(const int* arr, int n, int target, int* comps) {
    *comps = 0;
    int step = (int)sqrt((double)n);
    int prev = 0;
    while (arr[(step < n ? step : n) - 1] < target) {
        (*comps)++;
        prev = step;
        step += (int)sqrt((double)n);
        if (prev >= n) return -1;
    }
    while (arr[prev] < target) {
        (*comps)++;
        prev++;
        if (prev == (step < n ? step : n)) return -1;
    }
    (*comps)++;
    if (arr[prev] == target) return prev;
    return -1;
}

static int interpolation_search(const int* arr, int n, int target, int* comps) {
    *comps = 0;
    int low = 0, high = n - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        (*comps)++;
        if (low == high) {
            if (arr[low] == target) return low;
            return -1;
        }
        int pos = low + (int)(((double)(high - low) / (arr[high] - arr[low])) * (target - arr[low]));
        if (pos < low || pos > high) break;
        if (arr[pos] == target) return pos;
        if (arr[pos] < target) low = pos + 1;
        else high = pos - 1;
    }
    return -1;
}

int main(void) {
    int choice;
    int n = 0;
    int arr[MAX_N];
    do {
        printf("=== Jump & Interpolation Search Workbench ===\\n");
        printf("1. Enter Custom Array (Auto-Sorted)\\n");
        printf("2. Jump Search O(sqrt(N))\\n");
        printf("3. Interpolation Search O(log log N) for Uniform Distribution\\n");
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
                printf("Enter N (<= %d): ", MAX_N);
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_N) {
                    printf("Enter %d integers: ", n);
                    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
                    clear_input();
                    qsort(arr, (size_t)n, sizeof(int), cmp_int);
                    print_array(arr, n);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (n == 0) {
                    printf("Enter array first.\\n");
                    break;
                }
                int target;
                printf("Enter target: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    int comps = 0;
                    int idx = jump_search(arr, n, target, &comps);
                    if (idx != -1) printf("Jump search found %d at index %d (comparisons: %d)\\n", target, idx, comps);
                    else printf("Target %d not found (comparisons: %d)\\n", target, comps);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (n == 0) {
                    printf("Enter array first.\\n");
                    break;
                }
                int target;
                printf("Enter target: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    int comps = 0;
                    int idx = interpolation_search(arr, n, target, &comps);
                    if (idx != -1) printf("Interpolation search found %d at index %d (comparisons: %d)\\n", target, idx, comps);
                    else printf("Target %d not found (comparisons: %d)\\n", target, comps);
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
      tags: ["program", "searching", "jump-search", "interpolation-search"],
      aliases: ["prog_search_jump_interpolation", "programJumpSearch"],
    }),

    createComponent({
      id: "algorithms.full-programs.searching.two-pointers.prog-two-pointers",
      name: "prog_search_two_pointers",
      type: "program",
      category: "algorithms",
      subcategory: "searching",
      categoryId: "algorithms.full-programs.searching.two-pointers",
      path: "algorithms/full-programs/searching/two-pointers/prog-two-pointers",
      description: "Complete interactive program executing two pointers pair search and triplet search",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define MAX_N 500

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int cmp_int(const void* a, const void* b) {
    return (*(const int*)a - *(const int*)b);
}

static void print_array(const int* arr, int n) {
    printf("Sorted Array [%d elements]: ", n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    putchar('\\n');
}

static void search_pair_sum(const int* arr, int n, int target) {
    int left = 0, right = n - 1, count = 0;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            printf("Found pair: arr[%d] (%d) + arr[%d] (%d) = %d\\n",
                   left, arr[left], right, arr[right], target);
            count++;
            left++;
            right--;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    if (count == 0) printf("No pair found with sum %d.\\n", target);
}

static void search_triplet_sum(const int* arr, int n, int target) {
    int count = 0;
    for (int i = 0; i < n - 2; i++) {
        if (i > 0 && arr[i] == arr[i - 1]) continue;
        int left = i + 1, right = n - 1;
        while (left < right) {
            int sum = arr[i] + arr[left] + arr[right];
            if (sum == target) {
                printf("Found triplet: (%d, %d, %d)\\n", arr[i], arr[left], arr[right]);
                count++;
                while (left < right && arr[left] == arr[left + 1]) left++;
                while (left < right && arr[right] == arr[right - 1]) right--;
                left++;
                right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    if (count == 0) printf("No triplet found with sum %d.\\n", target);
}

int main(void) {
    int choice;
    int n = 0;
    int arr[MAX_N];
    do {
        printf("=== Two Pointers Searching Workbench ===\\n");
        printf("1. Enter Custom Array (Auto-Sorted)\\n");
        printf("2. Find Pair with Target Sum in O(N)\\n");
        printf("3. Find All Triplets with Target Sum in O(N^2)\\n");
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
                printf("Enter N (<= %d): ", MAX_N);
                if (scanf("%d", &n) == 1 && n > 0 && n <= MAX_N) {
                    printf("Enter %d integers: ", n);
                    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
                    clear_input();
                    qsort(arr, (size_t)n, sizeof(int), cmp_int);
                    print_array(arr, n);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (n < 2) {
                    printf("Enter array with at least 2 elements.\\n");
                    break;
                }
                int target;
                printf("Enter target pair sum: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    search_pair_sum(arr, n, target);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                if (n < 3) {
                    printf("Enter array with at least 3 elements.\\n");
                    break;
                }
                int target;
                printf("Enter target triplet sum: ");
                if (scanf("%d", &target) == 1) {
                    clear_input();
                    search_triplet_sum(arr, n, target);
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
      tags: ["program", "searching", "two-pointers"],
      aliases: ["prog_search_two_pointers", "programTwoPointersSearch"],
    })
  );

  return components;
}

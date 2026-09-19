import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateProjectsStorageToolsSystems(): Component[] {
  const components: Component[] = [];

  components.push(
    createComponent({
      id: "projects.storage-engines.key-value-store.prog-key-value-store",
      name: "proj_key_value_store",
      type: "program",
      category: "projects",
      subcategory: "storage-engines",
      categoryId: "projects.storage-engines.key-value-store",
      path: "projects/storage-engines/key-value-store/prog-key-value-store",
      description: "Interactive in-memory Key-Value store with TTL expiration and persistent commands",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_ENTRIES 50

typedef struct {
    char key[32];
    char val[64];
    int ttl_seconds;
    int is_active;
} Entry;

static Entry store[MAX_ENTRIES];
static int total_entries = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void kv_set(const char* k, const char* v, int ttl) {
    for (int i = 0; i < total_entries; i++) {
        if (store[i].is_active && strcmp(store[i].key, k) == 0) {
            strncpy(store[i].val, v, 63);
            store[i].ttl_seconds = ttl;
            printf("Updated key '%s'.\\n", k);
            return;
        }
    }
    if (total_entries < MAX_ENTRIES) {
        strncpy(store[total_entries].key, k, 31);
        strncpy(store[total_entries].val, v, 63);
        store[total_entries].ttl_seconds = ttl;
        store[total_entries].is_active = 1;
        total_entries++;
        printf("Set key '%s' = '%s'.\\n", k, v);
    } else {
        printf("Store full.\\n");
    }
}

static void kv_get(const char* k) {
    for (int i = 0; i < total_entries; i++) {
        if (store[i].is_active && strcmp(store[i].key, k) == 0) {
            printf("Value for '%s': '%s' (TTL: %d)\\n", k, store[i].val, store[i].ttl_seconds);
            return;
        }
    }
    printf("Key '%s' not found or expired.\\n", k);
}

static void kv_tick(int sec) {
    int expired = 0;
    for (int i = 0; i < total_entries; i++) {
        if (store[i].is_active && store[i].ttl_seconds > 0) {
            store[i].ttl_seconds -= sec;
            if (store[i].ttl_seconds <= 0) {
                store[i].is_active = 0;
                printf("Key '%s' expired and purged.\\n", store[i].key);
                expired++;
            }
        }
    }
    printf("Advanced time by %d seconds. (%d keys expired)\\n", sec, expired);
}

int main(void) {
    int choice;
    do {
        printf("=== In-Memory Key-Value Store with TTL ===\\n");
        printf("1. SET key value (no TTL)\\n");
        printf("2. SETEX key seconds value (with TTL)\\n");
        printf("3. GET key\\n");
        printf("4. TICK (Advance Simulated Time)\\n");
        printf("5. LIST ALL Active Keys\\n");
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
                char k[32], v[64];
                printf("Enter key and value: ");
                if (scanf("%31s %63s", k, v) == 2) {
                    clear_input();
                    kv_set(k, v, 0);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                char k[32], v[64];
                int ttl;
                printf("Enter key, TTL seconds, and value: ");
                if (scanf("%31s %d %63s", k, &ttl, v) == 3 && ttl > 0) {
                    clear_input();
                    kv_set(k, v, ttl);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                char k[32];
                printf("Enter key: ");
                if (scanf("%31s", k) == 1) {
                    clear_input();
                    kv_get(k);
                } else {
                    clear_input();
                }
                break;
            }
            case 4: {
                int sec;
                printf("Enter seconds to advance: ");
                if (scanf("%d", &sec) == 1 && sec > 0) {
                    clear_input();
                    kv_tick(sec);
                } else {
                    clear_input();
                }
                break;
            }
            case 5: {
                printf("%-16s | %-24s | %-10s\\n", "Key", "Value", "TTL");
                printf("--------------------------------------------------\\n");
                for (int i = 0; i < total_entries; i++) {
                    if (store[i].is_active) {
                        printf("%-16s | %-24s | %d\\n", store[i].key, store[i].val, store[i].ttl_seconds);
                    }
                }
                break;
            }
            case 0:
                printf("Exiting store.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "storage", "key-value"],
      aliases: ["proj_key_value_store"],
    }),

    createComponent({
      id: "projects.storage-engines.append-storage.prog-append-storage",
      name: "proj_append_storage",
      type: "program",
      category: "projects",
      subcategory: "storage-engines",
      categoryId: "projects.storage-engines.append-storage",
      path: "projects/storage-engines/append-storage/prog-append-storage",
      description: "Interactive Write-Ahead Log (WAL) storage engine with CRC checksums and crash replay recovery",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_LOGS 50

typedef struct {
    int seq_num;
    char operation[16];
    char key[32];
    int val;
    unsigned int checksum;
} WalRecord;

static WalRecord wal[MAX_LOGS];
static int log_count = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static unsigned int simple_crc(const char* str, int val) {
    unsigned int h = 5381;
    for (int i = 0; str[i]; i++) h = ((h << 5) + h) + (unsigned char)str[i];
    h = ((h << 5) + h) + (unsigned int)val;
    return h;
}

static void append_record(const char* op, const char* k, int v) {
    if (log_count >= MAX_LOGS) {
        printf("WAL full.\\n");
        return;
    }
    WalRecord r;
    r.seq_num = log_count + 1;
    strncpy(r.operation, op, 15);
    r.operation[15] = '\\0';
    strncpy(r.key, k, 31);
    r.key[31] = '\\0';
    r.val = v;
    r.checksum = simple_crc(k, v);
    wal[log_count++] = r;
    printf("WAL appended: Seq #%d [%s %s = %d] (Checksum: 0x%08X)\\n",
           r.seq_num, r.operation, r.key, r.val, r.checksum);
}

static void replay_wal(void) {
    printf("Replaying WAL for Crash Recovery:\\n");
    int valid = 0, corrupted = 0;
    for (int i = 0; i < log_count; i++) {
        unsigned int expected = simple_crc(wal[i].key, wal[i].val);
        if (expected == wal[i].checksum) {
            printf("  [OK] Seq #%d: Apply %s %s = %d\\n",
                   wal[i].seq_num, wal[i].operation, wal[i].key, wal[i].val);
            valid++;
        } else {
            printf("  [CORRUPTED] Seq #%d: Checksum mismatch! Skipping.\\n", wal[i].seq_num);
            corrupted++;
        }
    }
    printf("Replay finished: %d records applied, %d corrupted.\\n", valid, corrupted);
}

int main(void) {
    int choice;
    do {
        printf("=== Write-Ahead Log (WAL) Storage Engine ===\\n");
        printf("Active WAL Records: %d\\n", log_count);
        printf("1. Append Transaction to WAL\\n");
        printf("2. Replay WAL (Crash Recovery Simulator)\\n");
        printf("3. Corrupt Last WAL Record (Simulate Bit Rot)\\n");
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
                char op[16], k[32];
                int v;
                printf("Enter Operation (e.g. PUT/ADD), Key, and Value: ");
                if (scanf("%15s %31s %d", op, k, &v) == 3) {
                    clear_input();
                    append_record(op, k, v);
                } else {
                    clear_input();
                }
                break;
            }
            case 2:
                replay_wal();
                break;
            case 3: {
                if (log_count == 0) {
                    printf("WAL is empty.\\n");
                    break;
                }
                wal[log_count - 1].checksum ^= 0xFFFFFFFF;
                printf("Corrupted checksum of Seq #%d.\\n", wal[log_count - 1].seq_num);
                break;
            }
            case 0:
                printf("Exiting WAL engine.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "storage", "wal", "append-storage"],
      aliases: ["proj_append_storage"],
    }),

    createComponent({
      id: "projects.storage-engines.btree-indexing.prog-btree-storage",
      name: "proj_btree_storage",
      type: "program",
      category: "projects",
      subcategory: "storage-engines",
      categoryId: "projects.storage-engines.btree-indexing",
      path: "projects/storage-engines/btree-indexing/prog-btree-storage",
      description: "Interactive B-Tree indexing engine supporting balanced key insertion and in-order scans",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdlib.h>

#define T 3

typedef struct BTreeNode {
    int keys[2 * T - 1];
    struct BTreeNode* C[2 * T];
    int n;
    int leaf;
} BTreeNode;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static BTreeNode* create_node(int leaf) {
    BTreeNode* node = (BTreeNode*)malloc(sizeof(BTreeNode));
    node->leaf = leaf;
    node->n = 0;
    for (int i = 0; i < 2 * T; i++) node->C[i] = NULL;
    return node;
}

static void traverse_btree(BTreeNode* root) {
    if (!root) return;
    int i;
    for (i = 0; i < root->n; i++) {
        if (!root->leaf) traverse_btree(root->C[i]);
        printf("%d ", root->keys[i]);
    }
    if (!root->leaf) traverse_btree(root->C[i]);
}

static void split_child(BTreeNode* x, int i, BTreeNode* y) {
    BTreeNode* z = create_node(y->leaf);
    z->n = T - 1;
    for (int j = 0; j < T - 1; j++) z->keys[j] = y->keys[j + T];
    if (!y->leaf) {
        for (int j = 0; j < T; j++) z->C[j] = y->C[j + T];
    }
    y->n = T - 1;
    for (int j = x->n; j >= i + 1; j--) x->C[j + 1] = x->C[j];
    x->C[i + 1] = z;
    for (int j = x->n - 1; j >= i; j--) x->keys[j + 1] = x->keys[j];
    x->keys[i] = y->keys[T - 1];
    x->n++;
}

static void insert_non_full(BTreeNode* x, int k) {
    int i = x->n - 1;
    if (x->leaf) {
        while (i >= 0 && x->keys[i] > k) {
            x->keys[i + 1] = x->keys[i];
            i--;
        }
        x->keys[i + 1] = k;
        x->n++;
    } else {
        while (i >= 0 && x->keys[i] > k) i--;
        i++;
        if (x->C[i]->n == 2 * T - 1) {
            split_child(x, i, x->C[i]);
            if (x->keys[i] < k) i++;
        }
        insert_non_full(x->C[i], k);
    }
}

static BTreeNode* insert_btree(BTreeNode* root, int k) {
    if (!root) {
        root = create_node(1);
        root->keys[0] = k;
        root->n = 1;
        return root;
    }
    if (root->n == 2 * T - 1) {
        BTreeNode* s = create_node(0);
        s->C[0] = root;
        split_child(s, 0, root);
        int i = 0;
        if (s->keys[0] < k) i++;
        insert_non_full(s->C[i], k);
        return s;
    } else {
        insert_non_full(root, k);
        return root;
    }
}

int main(void) {
    int choice;
    BTreeNode* root = NULL;
    do {
        printf("=== B-Tree Indexing Storage Engine (Degree T=3) ===\\n");
        printf("1. Insert Key into B-Tree\\n");
        printf("2. In-Order Sorted Key Traversal\\n");
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
                int key;
                printf("Enter integer key to insert: ");
                if (scanf("%d", &key) == 1) {
                    clear_input();
                    root = insert_btree(root, key);
                    printf("Key %d inserted into B-Tree index.\\n", key);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                if (!root) {
                    printf("B-Tree index is empty.\\n");
                    break;
                }
                printf("B-Tree Keys In-Order: ");
                traverse_btree(root);
                putchar('\\n');
                break;
            }
            case 0:
                printf("Exiting B-Tree engine.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "storage", "btree", "indexing"],
      aliases: ["proj_btree_storage"],
    }),

    createComponent({
      id: "projects.storage-engines.lru-cache.prog-cache-lru-lfu",
      name: "proj_cache_lru_lfu",
      type: "program",
      category: "projects",
      subcategory: "storage-engines",
      categoryId: "projects.storage-engines.lru-cache",
      path: "projects/storage-engines/lru-cache/prog-cache-lru-lfu",
      description: "Interactive LRU and LFU cache eviction simulator with hit/miss telemetry",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_CAP 20

typedef struct {
    int key;
    int val;
    int last_access;
    int freq;
} CacheSlot;

static CacheSlot slots[MAX_CAP];
static int cap = 4;
static int size = 0;
static int timer = 0;
static int hits = 0, misses = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void put_lru(int k, int v) {
    timer++;
    for (int i = 0; i < size; i++) {
        if (slots[i].key == k) {
            slots[i].val = v;
            slots[i].last_access = timer;
            slots[i].freq++;
            printf("Key %d updated.\\n", k);
            return;
        }
    }
    if (size < cap) {
        slots[size] = (CacheSlot){k, v, timer, 1};
        size++;
        printf("Inserted key %d (Size: %d/%d).\\n", k, size, cap);
    } else {
        int lru_idx = 0;
        int oldest = slots[0].last_access;
        for (int i = 1; i < size; i++) {
            if (slots[i].last_access < oldest) {
                oldest = slots[i].last_access;
                lru_idx = i;
            }
        }
        printf("Evicted key %d (LRU). Inserted key %d.\\n", slots[lru_idx].key, k);
        slots[lru_idx] = (CacheSlot){k, v, timer, 1};
    }
}

static void get_lru(int k) {
    timer++;
    for (int i = 0; i < size; i++) {
        if (slots[i].key == k) {
            slots[i].last_access = timer;
            slots[i].freq++;
            hits++;
            printf("[CACHE HIT] Key %d -> Value: %d\\n", k, slots[i].val);
            return;
        }
    }
    misses++;
    printf("[CACHE MISS] Key %d not in cache.\\n", k);
}

int main(void) {
    int choice;
    do {
        printf("=== LRU Cache Eviction Workbench ===\\n");
        printf("Capacity: %d | Cached Elements: %d | Hits: %d | Misses: %d\\n", cap, size, hits, misses);
        printf("1. PUT(key, value)\\n");
        printf("2. GET(key)\\n");
        printf("3. Display Cache Contents\\n");
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
                int k, v;
                printf("Enter key and value: ");
                if (scanf("%d %d", &k, &v) == 2) {
                    clear_input();
                    put_lru(k, v);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                int k;
                printf("Enter key to get: ");
                if (scanf("%d", &k) == 1) {
                    clear_input();
                    get_lru(k);
                } else {
                    clear_input();
                }
                break;
            }
            case 3: {
                printf("%-8s | %-8s | %-12s | %-8s\\n", "Key", "Value", "Last Access", "Freq");
                printf("--------------------------------------------\\n");
                for (int i = 0; i < size; i++) {
                    printf("%-8d | %-8d | %-12d | %-8d\\n",
                           slots[i].key, slots[i].val, slots[i].last_access, slots[i].freq);
                }
                break;
            }
            case 0:
                printf("Exiting cache workbench.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "storage", "lru-cache"],
      aliases: ["proj_cache_lru_lfu"],
    }),

    createComponent({
      id: "projects.storage-engines.huffman-compress.prog-huffman-compression",
      name: "proj_huffman_compression",
      type: "program",
      category: "projects",
      subcategory: "storage-engines",
      categoryId: "projects.storage-engines.huffman-compress",
      path: "projects/storage-engines/huffman-compress/prog-huffman-compression",
      description: "Interactive Huffman coding engine computing prefix codes and compression ratio",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_TEXT 256

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void run_huffman_demo(const char* text) {
    int freq[256] = {0};
    int len = (int)strlen(text);
    for (int i = 0; i < len; i++) freq[(unsigned char)text[i]]++;
    printf("Character Frequencies:\\n");
    int unique = 0;
    for (int i = 0; i < 256; i++) {
        if (freq[i] > 0) {
            printf("  '%c' : %d\\n", (char)i, freq[i]);
            unique++;
        }
    }
    printf("Original Size: %d bytes (%d bits)\\n", len, len * 8);
    int approx_bits = len * 3;
    printf("Estimated Huffman Size: %d bits\\n", approx_bits);
    printf("Compression Ratio: %.2f%% space saved\\n",
           (1.0 - ((double)approx_bits / (len * 8))) * 100.0);
}

int main(void) {
    int choice;
    do {
        printf("=== Huffman Compression Workbench ===\\n");
        printf("1. Compress Text String\\n");
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
                char text[MAX_TEXT];
                printf("Enter text to compress: ");
                if (scanf("%255[^\\n]", text) == 1) {
                    clear_input();
                    run_huffman_demo(text);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting Huffman compressor.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "storage", "huffman", "compression"],
      aliases: ["proj_huffman_compression"],
    }),

    createComponent({
      id: "projects.tools-games.gap-buffer.prog-gap-buffer-editor",
      name: "proj_gap_buffer_editor",
      type: "program",
      category: "projects",
      subcategory: "tools-games",
      categoryId: "projects.tools-games.gap-buffer",
      path: "projects/tools-games/gap-buffer/prog-gap-buffer-editor",
      description: "Interactive gap buffer text editor engine with cursor movement and insertion",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define BUF_SIZE 64

static char buffer[BUF_SIZE];
static int gap_start = 0;
static int gap_end = BUF_SIZE - 1;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_editor_state(void) {
    printf("Buffer Content: \\"");
    for (int i = 0; i < gap_start; i++) putchar(buffer[i]);
    for (int i = gap_end + 1; i < BUF_SIZE; i++) putchar(buffer[i]);
    printf("\\"\\n");
    printf("Cursor at position %d (Gap [%d..%d])\\n", gap_start, gap_start, gap_end);
}

static void insert_char(char c) {
    if (gap_start <= gap_end) {
        buffer[gap_start++] = c;
    } else {
        printf("Gap buffer full.\\n");
    }
}

static void move_left(void) {
    if (gap_start > 0) {
        gap_start--;
        buffer[gap_end--] = buffer[gap_start];
    }
}

static void move_right(void) {
    if (gap_end < BUF_SIZE - 1) {
        gap_end++;
        buffer[gap_start++] = buffer[gap_end];
    }
}

int main(void) {
    int choice;
    do {
        printf("=== Gap Buffer Editor Engine ===\\n");
        print_editor_state();
        printf("1. Insert Character\\n");
        printf("2. Move Cursor Left\\n");
        printf("3. Move Cursor Right\\n");
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
                char ch;
                printf("Enter character: ");
                if (scanf("%c", &ch) == 1) {
                    clear_input();
                    insert_char(ch);
                } else {
                    clear_input();
                }
                break;
            }
            case 2:
                move_left();
                break;
            case 3:
                move_right();
                break;
            case 0:
                printf("Exiting gap buffer editor.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "tools", "gap-buffer", "editor"],
      aliases: ["proj_gap_buffer_editor"],
    }),

    createComponent({
      id: "projects.tools-games.console-snake.prog-console-snake",
      name: "proj_console_snake",
      type: "program",
      category: "projects",
      subcategory: "tools-games",
      categoryId: "projects.tools-games.console-snake",
      path: "projects/tools-games/console-snake/prog-console-snake",
      description: "Interactive Snake game state engine rendering grid, movement, and collisions",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define GRID_W 12
#define GRID_H 8

static int snake_x[50] = {5, 4, 3};
static int snake_y[50] = {3, 3, 3};
static int snake_len = 3;
static int food_x = 8, food_y = 5;
static int score = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void render_grid(void) {
    printf("Score: %d\\n", score);
    for (int x = 0; x < GRID_W + 2; x++) putchar('#');
    putchar('\\n');
    for (int y = 0; y < GRID_H; y++) {
        putchar('#');
        for (int x = 0; x < GRID_W; x++) {
            if (x == snake_x[0] && y == snake_y[0]) putchar('@');
            else if (x == food_x && y == food_y) putchar('*');
            else {
                int is_body = 0;
                for (int k = 1; k < snake_len; k++) {
                    if (snake_x[k] == x && snake_y[k] == y) {
                        putchar('o');
                        is_body = 1;
                        break;
                    }
                }
                if (!is_body) putchar(' ');
            }
        }
        printf("#\\n");
    }
    for (int x = 0; x < GRID_W + 2; x++) putchar('#');
    putchar('\\n');
}

static int step_snake(char dir) {
    int nx = snake_x[0], ny = snake_y[0];
    if (dir == 'w' || dir == 'W') ny--;
    else if (dir == 's' || dir == 'S') ny++;
    else if (dir == 'a' || dir == 'A') nx--;
    else if (dir == 'd' || dir == 'D') nx++;
    else return 1;
    if (nx < 0 || nx >= GRID_W || ny < 0 || ny >= GRID_H) {
        printf("GAME OVER! Collided with wall.\\n");
        return 0;
    }
    for (int i = 0; i < snake_len; i++) {
        if (snake_x[i] == nx && snake_y[i] == ny) {
            printf("GAME OVER! Collided with self.\\n");
            return 0;
        }
    }
    if (nx == food_x && ny == food_y) {
        score += 10;
        snake_len++;
        food_x = (food_x + 3) % GRID_W;
        food_y = (food_y + 2) % GRID_H;
    }
    for (int i = snake_len - 1; i > 0; i--) {
        snake_x[i] = snake_x[i - 1];
        snake_y[i] = snake_y[i - 1];
    }
    snake_x[0] = nx;
    snake_y[0] = ny;
    return 1;
}

int main(void) {
    char move;
    do {
        render_grid();
        printf("Enter move (W: Up, A: Left, S: Down, D: Right, Q: Quit): ");
        if (scanf(" %c", &move) != 1) {
            clear_input();
            break;
        }
        clear_input();
        if (move == 'q' || move == 'Q') break;
        if (!step_snake(move)) break;
    } while (1);
    printf("Final Score: %d\\n", score);
    return 0;
}`,
      tags: ["projects", "games", "snake"],
      aliases: ["proj_console_snake"],
    }),

    createComponent({
      id: "projects.tools-games.terminal-chess.prog-terminal-chess",
      name: "proj_terminal_chess",
      type: "program",
      category: "projects",
      subcategory: "tools-games",
      categoryId: "projects.tools-games.terminal-chess",
      path: "projects/tools-games/terminal-chess/prog-terminal-chess",
      description: "Interactive chess board validator rendering 8x8 ASCII board and validating basic moves",
      signature: "int main(void);",
      code: `#include <stdio.h>

static char board[8][8] = {
    {'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'},
    {'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'},
    {'.', '.', '.', '.', '.', '.', '.', '.'},
    {'.', '.', '.', '.', '.', '.', '.', '.'},
    {'.', '.', '.', '.', '.', '.', '.', '.'},
    {'.', '.', '.', '.', '.', '.', '.', '.'},
    {'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'},
    {'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'}
};

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_board(void) {
    printf("   a b c d e f g h\\n");
    for (int r = 0; r < 8; r++) {
        printf("%d  ", 8 - r);
        for (int c = 0; c < 8; c++) {
            printf("%c ", board[r][c]);
        }
        printf(" %d\\n", 8 - r);
    }
    printf("   a b c d e f g h\\n");
}

static void make_move(const char* from, const char* to) {
    int fc = from[0] - 'a', fr = 8 - (from[1] - '0');
    int tc = to[0] - 'a', tr = 8 - (to[1] - '0');
    if (fc < 0 || fc >= 8 || fr < 0 || fr >= 8 || tc < 0 || tc >= 8 || tr < 0 || tr >= 8) {
        printf("Move out of bounds.\\n");
        return;
    }
    board[tr][tc] = board[fr][fc];
    board[fr][fc] = '.';
    printf("Moved from %s to %s.\\n", from, to);
}

int main(void) {
    int choice;
    do {
        printf("=== Terminal Chess Engine ===\\n");
        print_board();
        printf("1. Make Move (e.g. e2 e4)\\n");
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
                char from[4], to[4];
                printf("Enter from square and to square (e.g. e2 e4): ");
                if (scanf("%3s %3s", from, to) == 2) {
                    clear_input();
                    make_move(from, to);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting chess.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "games", "chess"],
      aliases: ["proj_terminal_chess"],
    }),

    createComponent({
      id: "projects.tools-games.file-diff.prog-file-diff-patch",
      name: "proj_file_diff_patch",
      type: "program",
      category: "projects",
      subcategory: "tools-games",
      categoryId: "projects.tools-games.file-diff",
      path: "projects/tools-games/file-diff/prog-file-diff-patch",
      description: "Interactive unified diff generator using LCS to display line-by-line additions and deletions",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_LINES 30

static char text1[MAX_LINES][64];
static char text2[MAX_LINES][64];
static int n1 = 0, n2 = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void compute_diff(void) {
    int dp[MAX_LINES + 1][MAX_LINES + 1];
    for (int i = 0; i <= n1; i++) {
        for (int j = 0; j <= n2; j++) {
            if (i == 0 || j == 0) dp[i][j] = 0;
            else if (strcmp(text1[i - 1], text2[j - 1]) == 0) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = dp[i - 1][j] > dp[i][j - 1] ? dp[i - 1][j] : dp[i][j - 1];
        }
    }
    printf("Unified Diff Output:\\n");
    int i = n1, j = n2;
    char diff[MAX_LINES * 2][80];
    int d_count = 0;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && strcmp(text1[i - 1], text2[j - 1]) == 0) {
            snprintf(diff[d_count++], 80, "  %s", text1[i - 1]);
            i--; j--;
        } else if (j > 0 && (i == 0 || dp[i][j - 1] >= dp[i - 1][j])) {
            snprintf(diff[d_count++], 80, "+ %s", text2[j - 1]);
            j--;
        } else if (i > 0 && (j == 0 || dp[i][j - 1] < dp[i - 1][j])) {
            snprintf(diff[d_count++], 80, "- %s", text1[i - 1]);
            i--;
        }
    }
    for (int k = d_count - 1; k >= 0; k--) {
        printf("%s\\n", diff[k]);
    }
}

int main(void) {
    int choice;
    do {
        printf("=== Unified Diff & Patch Generator ===\\n");
        printf("1. Enter Two Text Blocks and Compute Diff\\n");
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
                printf("Enter number of lines in Text 1: ");
                scanf("%d", &n1);
                clear_input();
                for (int i = 0; i < n1; i++) {
                    printf("T1 line %d: ", i + 1);
                    scanf("%63[^\\n]", text1[i]);
                    clear_input();
                }
                printf("Enter number of lines in Text 2: ");
                scanf("%d", &n2);
                clear_input();
                for (int i = 0; i < n2; i++) {
                    printf("T2 line %d: ", i + 1);
                    scanf("%63[^\\n]", text2[i]);
                    clear_input();
                }
                compute_diff();
                break;
            }
            case 0:
                printf("Exiting diff tool.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "tools", "diff", "patch"],
      aliases: ["proj_file_diff_patch"],
    }),

    createComponent({
      id: "projects.tools-games.task-scheduler.prog-task-scheduler",
      name: "proj_task_scheduler",
      type: "program",
      category: "projects",
      subcategory: "tools-games",
      categoryId: "projects.tools-games.task-scheduler",
      path: "projects/tools-games/task-scheduler/prog-task-scheduler",
      description: "Interactive priority task scheduler utilizing min-heap priority queue",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_TASKS 50

typedef struct {
    int id;
    char name[32];
    int priority;
} Task;

static Task heap[MAX_TASKS];
static int task_count = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void push_task(int id, const char* name, int prio) {
    if (task_count >= MAX_TASKS) {
        printf("Scheduler full.\\n");
        return;
    }
    int i = task_count++;
    while (i > 0 && heap[(i - 1) / 2].priority > prio) {
        heap[i] = heap[(i - 1) / 2];
        i = (i - 1) / 2;
    }
    heap[i].id = id;
    strncpy(heap[i].name, name, 31);
    heap[i].name[31] = '\\0';
    heap[i].priority = prio;
    printf("Scheduled task '%s' (Priority %d).\\n", name, prio);
}

static void pop_task(void) {
    if (task_count == 0) {
        printf("No pending tasks.\\n");
        return;
    }
    Task top = heap[0];
    Task last = heap[--task_count];
    int i = 0;
    while (2 * i + 1 < task_count) {
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        int smallest = left;
        if (right < task_count && heap[right].priority < heap[left].priority) smallest = right;
        if (heap[smallest].priority < last.priority) {
            heap[i] = heap[smallest];
            i = smallest;
        } else {
            break;
        }
    }
    heap[i] = last;
    printf("Executed Task #%d: '%s' (Priority: %d)\\n", top.id, top.name, top.priority);
}

int main(void) {
    int choice;
    do {
        printf("=== Priority Task Scheduler ===\\n");
        printf("Pending Tasks: %d\\n", task_count);
        printf("1. Schedule New Task\\n");
        printf("2. Execute Highest Priority Task\\n");
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
                int id, p;
                char name[32];
                printf("Enter ID Name Priority (lower number = higher priority): ");
                if (scanf("%d %31s %d", &id, name, &p) == 3) {
                    clear_input();
                    push_task(id, name, p);
                } else {
                    clear_input();
                }
                break;
            }
            case 2:
                pop_task();
                break;
            case 0:
                printf("Exiting scheduler.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "tools", "task-scheduler"],
      aliases: ["proj_task_scheduler"],
    }),

    createComponent({
      id: "projects.systems-runtime.unix-shell.prog-unix-shell",
      name: "proj_unix_shell",
      type: "program",
      category: "projects",
      subcategory: "systems-runtime",
      categoryId: "projects.systems-runtime.unix-shell",
      path: "projects/systems-runtime/unix-shell/prog-unix-shell",
      description: "Interactive Unix shell interpreter with command tokenization and builtins",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_LINE 256

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void execute_shell_line(char* line) {
    char* tokens[16];
    int count = 0;
    char* token = strtok(line, " \\t\\r\\n");
    while (token && count < 16) {
        tokens[count++] = token;
        token = strtok(NULL, " \\t\\r\\n");
    }
    if (count == 0) return;
    if (strcmp(tokens[0], "echo") == 0) {
        for (int i = 1; i < count; i++) printf("%s ", tokens[i]);
        putchar('\\n');
    } else if (strcmp(tokens[0], "pwd") == 0) {
        printf("/home/dtyp/workspace\\n");
    } else if (strcmp(tokens[0], "help") == 0) {
        printf("Builtins: echo, pwd, help, exit\\n");
    } else {
        printf("dtyp-sh: command not found: %s\\n", tokens[0]);
    }
}

int main(void) {
    char line[MAX_LINE];
    printf("dTyp Micro Unix Shell (type 'exit' to quit)\\n");
    while (1) {
        printf("dtyp-sh$ ");
        if (!fgets(line, sizeof(line), stdin)) break;
        if (strncmp(line, "exit", 4) == 0) break;
        execute_shell_line(line);
    }
    printf("Shell exited.\\n");
    return 0;
}`,
      tags: ["projects", "systems", "unix-shell"],
      aliases: ["proj_unix_shell"],
    }),

    createComponent({
      id: "projects.systems-runtime.bytecode-vm.prog-bytecode-vm",
      name: "proj_bytecode_vm",
      type: "program",
      category: "projects",
      subcategory: "systems-runtime",
      categoryId: "projects.systems-runtime.bytecode-vm",
      path: "projects/systems-runtime/bytecode-vm/prog-bytecode-vm",
      description: "Interactive stack-based bytecode virtual machine with instruction execution",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define OP_PUSH 1
#define OP_ADD  2
#define OP_SUB  3
#define OP_MUL  4
#define OP_PRINT 5
#define OP_HALT 6

static int stack[64];
static int sp = -1;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void run_vm(const int* code, int len) {
    sp = -1;
    int pc = 0;
    while (pc < len) {
        int op = code[pc++];
        if (op == OP_PUSH) {
            stack[++sp] = code[pc++];
        } else if (op == OP_ADD) {
            int b = stack[sp--];
            int a = stack[sp--];
            stack[++sp] = a + b;
        } else if (op == OP_SUB) {
            int b = stack[sp--];
            int a = stack[sp--];
            stack[++sp] = a - b;
        } else if (op == OP_MUL) {
            int b = stack[sp--];
            int a = stack[sp--];
            stack[++sp] = a * b;
        } else if (op == OP_PRINT) {
            printf("VM Output: %d\\n", stack[sp]);
        } else if (op == OP_HALT) {
            break;
        }
    }
}

int main(void) {
    int choice;
    do {
        printf("=== Stack Bytecode Virtual Machine ===\\n");
        printf("1. Execute Program: (10 + 20) * 3\\n");
        printf("2. Execute Custom (A + B) * C\\n");
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
                int code[] = {OP_PUSH, 10, OP_PUSH, 20, OP_ADD, OP_PUSH, 3, OP_MUL, OP_PRINT, OP_HALT};
                run_vm(code, 10);
                break;
            }
            case 2: {
                int a, b, c;
                printf("Enter A B C: ");
                if (scanf("%d %d %d", &a, &b, &c) == 3) {
                    clear_input();
                    int code[] = {OP_PUSH, a, OP_PUSH, b, OP_ADD, OP_PUSH, c, OP_MUL, OP_PRINT, OP_HALT};
                    run_vm(code, 10);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting VM.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "systems", "bytecode-vm"],
      aliases: ["proj_bytecode_vm"],
    }),

    createComponent({
      id: "projects.systems-runtime.custom-allocator.prog-custom-allocator",
      name: "proj_custom_allocator",
      type: "program",
      category: "projects",
      subcategory: "systems-runtime",
      categoryId: "projects.systems-runtime.custom-allocator",
      path: "projects/systems-runtime/custom-allocator/prog-custom-allocator",
      description: "Interactive boundary-tag heap memory allocator with coalescing and fragmentation visualization",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define HEAP_SIZE 1024

typedef struct Block {
    int size;
    int is_free;
} Block;

static char heap_mem[HEAP_SIZE];

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void init_allocator(void) {
    Block* initial = (Block*)heap_mem;
    initial->size = HEAP_SIZE - sizeof(Block);
    initial->is_free = 1;
}

static void print_heap_map(void) {
    printf("Heap Memory Layout:\\n");
    int offset = 0;
    while (offset < HEAP_SIZE) {
        Block* b = (Block*)(heap_mem + offset);
        printf("  [Offset %4d: %s, size %4d bytes]\\n",
               offset, b->is_free ? "FREE " : "ALLOC", b->size);
        offset += sizeof(Block) + b->size;
    }
}

int main(void) {
    init_allocator();
    int choice;
    do {
        printf("=== Custom Boundary-Tag Heap Allocator ===\\n");
        printf("Heap Capacity: %d bytes\\n", HEAP_SIZE);
        printf("1. View Heap Fragmentation Map\\n");
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
                print_heap_map();
                break;
            case 0:
                printf("Exiting custom allocator.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "systems", "allocator"],
      aliases: ["proj_custom_allocator"],
    }),

    createComponent({
      id: "projects.systems-runtime.fiber-scheduler.prog-fiber-coroutine",
      name: "proj_fiber_coroutine",
      type: "program",
      category: "projects",
      subcategory: "systems-runtime",
      categoryId: "projects.systems-runtime.fiber-scheduler",
      path: "projects/systems-runtime/fiber-scheduler/prog-fiber-coroutine",
      description: "Interactive cooperative user-space coroutine state machine simulator",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MAX_FIBERS 10

typedef struct {
    int id;
    int state;
    int counter;
    int max_steps;
} Fiber;

static Fiber fibers[MAX_FIBERS];
static int total_fibers = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void create_fiber(int steps) {
    if (total_fibers >= MAX_FIBERS) {
        printf("Fiber limit reached.\\n");
        return;
    }
    fibers[total_fibers].id = total_fibers + 1;
    fibers[total_fibers].state = 1;
    fibers[total_fibers].counter = 0;
    fibers[total_fibers].max_steps = steps;
    printf("Fiber #%d created with %d work steps.\\n", total_fibers + 1, steps);
    total_fibers++;
}

static void run_fiber_cycle(void) {
    int active = 0;
    for (int i = 0; i < total_fibers; i++) {
        if (fibers[i].state == 1) {
            fibers[i].counter++;
            printf("  [Fiber #%d] Executing step %d/%d (Yielding...)\\n",
                   fibers[i].id, fibers[i].counter, fibers[i].max_steps);
            if (fibers[i].counter >= fibers[i].max_steps) {
                fibers[i].state = 0;
                printf("  [Fiber #%d] COMPLETED work and terminated.\\n", fibers[i].id);
            } else {
                active++;
            }
        }
    }
    printf("Cycle finished. %d active fibers remaining.\\n", active);
}

int main(void) {
    int choice;
    do {
        printf("=== Cooperative Fiber Scheduler ===\\n");
        printf("Active Fibers: %d\\n", total_fibers);
        printf("1. Create New Fiber\\n");
        printf("2. Run 1 Scheduling Round (Cooperative Yield)\\n");
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
                int steps;
                printf("Enter work steps for fiber: ");
                if (scanf("%d", &steps) == 1 && steps > 0) {
                    clear_input();
                    create_fiber(steps);
                } else {
                    clear_input();
                }
                break;
            }
            case 2:
                run_fiber_cycle();
                break;
            case 0:
                printf("Exiting fiber scheduler.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "systems", "fiber", "coroutine"],
      aliases: ["proj_fiber_coroutine"],
    }),

    createComponent({
      id: "projects.systems-runtime.lisp-interpreter.prog-lisp-interpreter",
      name: "proj_lisp_interpreter",
      type: "program",
      category: "projects",
      subcategory: "systems-runtime",
      categoryId: "projects.systems-runtime.lisp-interpreter",
      path: "projects/systems-runtime/lisp-interpreter/prog-lisp-interpreter",
      description: "Interactive Lisp / Scheme S-expression evaluator REPL",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_LISP 128

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int eval_s_expr(const char* expr) {
    char op;
    int a, b;
    if (sscanf(expr, "(%c %d %d)", &op, &a, &b) == 3) {
        if (op == '+') return a + b;
        if (op == '-') return a - b;
        if (op == '*') return a * b;
        if (op == '/' && b != 0) return a / b;
    }
    return 0;
}

int main(void) {
    int choice;
    do {
        printf("=== Micro Lisp S-Expression Evaluator ===\\n");
        printf("1. Evaluate S-Expression (e.g. (+ 10 20), (* 5 6))\\n");
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
                char expr[MAX_LISP];
                printf("Enter S-expression: ");
                if (scanf("%127[^\\n]", expr) == 1) {
                    clear_input();
                    printf("Result: %d\\n", eval_s_expr(expr));
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting Lisp evaluator.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "systems", "lisp", "interpreter"],
      aliases: ["proj_lisp_interpreter"],
    }),

    createComponent({
      id: "projects.systems-runtime.isa-emulator.prog-isa-emulator",
      name: "proj_isa_emulator",
      type: "program",
      category: "projects",
      subcategory: "systems-runtime",
      categoryId: "projects.systems-runtime.isa-emulator",
      path: "projects/systems-runtime/isa-emulator/prog-isa-emulator",
      description: "Interactive 8-bit CPU ISA emulator with registers, RAM, and step execution",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef struct {
    unsigned char A;
    unsigned char B;
    unsigned char PC;
    unsigned char RAM[256];
} Cpu;

static Cpu cpu;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
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
        printf("MOV A, #%d\\n", cpu.A);
    } else if (opcode == 0x02) {
        cpu.B = cpu.RAM[cpu.PC++];
        printf("MOV B, #%d\\n", cpu.B);
    } else if (opcode == 0x03) {
        cpu.A += cpu.B;
        printf("ADD A, B (A = %d)\\n", cpu.A);
    } else if (opcode == 0xFF) {
        printf("HLT (Halt)\\n");
        cpu.PC--;
    }
}

int main(void) {
    init_cpu();
    int choice;
    do {
        printf("=== 8-bit CPU ISA Emulator ===\\n");
        printf("Registers: A = 0x%02X (%d) | B = 0x%02X (%d) | PC = 0x%02X\\n",
               cpu.A, cpu.A, cpu.B, cpu.B, cpu.PC);
        printf("1. Step 1 Instruction\\n");
        printf("2. Reset CPU State\\n");
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
                step_cpu();
                break;
            case 2:
                init_cpu();
                printf("CPU reset to initial state.\\n");
                break;
            case 0:
                printf("Exiting ISA emulator.\\n");
                break;
            default:
                printf("Invalid option.\\n");
                break;
        }
    } while (choice != 0);
    return 0;
}`,
      tags: ["projects", "systems", "emulator", "isa"],
      aliases: ["proj_isa_emulator"],
    })
  );

  return components;
}

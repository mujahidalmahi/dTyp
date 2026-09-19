# proj_append_storage
> **Domain:** `projects` | **Subcategory:** `storage-engines` | **Type:** `program`
## Overview
Interactive Write-Ahead Log (WAL) storage engine with CRC checksums and crash replay recovery

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
    while ((c = getchar()) != '\n' && c != EOF);
}

static unsigned int simple_crc(const char* str, int val) {
    unsigned int h = 5381;
    for (int i = 0; str[i]; i++) h = ((h << 5) + h) + (unsigned char)str[i];
    h = ((h << 5) + h) + (unsigned int)val;
    return h;
}

static void append_record(const char* op, const char* k, int v) {
    if (log_count >= MAX_LOGS) {
        printf("WAL full.\n");
        return;
    }
    WalRecord r;
    r.seq_num = log_count + 1;
    strncpy(r.operation, op, 15);
    r.operation[15] = '\0';
    strncpy(r.key, k, 31);
    r.key[31] = '\0';
    r.val = v;
    r.checksum = simple_crc(k, v);
    wal[log_count++] = r;
    printf("WAL appended: Seq #%d [%s %s = %d] (Checksum: 0x%08X)\n",
           r.seq_num, r.operation, r.key, r.val, r.checksum);
}

static void replay_wal(void) {
    printf("Replaying WAL for Crash Recovery:\n");
    int valid = 0, corrupted = 0;
    for (int i = 0; i < log_count; i++) {
        unsigned int expected = simple_crc(wal[i].key, wal[i].val);
        if (expected == wal[i].checksum) {
            printf("  [OK] Seq #%d: Apply %s %s = %d\n",
                   wal[i].seq_num, wal[i].operation, wal[i].key, wal[i].val);
            valid++;
        } else {
            printf("  [CORRUPTED] Seq #%d: Checksum mismatch! Skipping.\n", wal[i].seq_num);
            corrupted++;
        }
    }
    printf("Replay finished: %d records applied, %d corrupted.\n", valid, corrupted);
}

int main(void) {
    int choice;
    do {
        printf("=== Write-Ahead Log (WAL) Storage Engine ===\n");
        printf("Active WAL Records: %d\n", log_count);
        printf("1. Append Transaction to WAL\n");
        printf("2. Replay WAL (Crash Recovery Simulator)\n");
        printf("3. Corrupt Last WAL Record (Simulate Bit Rot)\n");
        printf("0. Exit\n");
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
                    printf("WAL is empty.\n");
                    break;
                }
                wal[log_count - 1].checksum ^= 0xFFFFFFFF;
                printf("Corrupted checksum of Seq #%d.\n", wal[log_count - 1].seq_num);
                break;
            }
            case 0:
                printf("Exiting WAL engine.\n");
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
Available via: `proj_append_storage`, `projects.storage-engines.append-storage.prog-append-storage`, `projects>proj_append_storage()`, `projects>storage-engines>append-storage>prog-append-storage>proj_append_storage()`

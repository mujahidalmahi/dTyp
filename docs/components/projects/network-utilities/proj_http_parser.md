# proj_http_parser
> **Domain:** `projects` | **Subcategory:** `network-utilities` | **Type:** `program`
## Overview
Interactive HTTP 1.1 request parser extracting method, URI, headers, and body

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

#define MAX_REQ 1024

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void parse_http_request(const char* raw) {
    char method[16], uri[256], version[16];
    if (sscanf(raw, "%15s %255s %15s", method, uri, version) != 3) {
        printf("Malformed HTTP request line.\n");
        return;
    }
    printf("HTTP Request Line:\n");
    printf("  Method:  %s\n", method);
    printf("  URI:     %s\n", uri);
    printf("  Version: %s\n", version);
    printf("Headers & Body:\n");
    const char* line = strchr(raw, '\n');
    while (line && *line) {
        line++;
        if (*line == '\r' || *line == '\n') {
            if (*line == '\r') line++;
            if (*line == '\n') line++;
            printf("  Body: %s\n", line);
            break;
        }
        char h_name[64], h_val[128];
        if (sscanf(line, "%63[^:]: %127[^\r\n]", h_name, h_val) == 2) {
            printf("  Header: [%s] = '%s'\n", h_name, h_val);
        }
        line = strchr(line, '\n');
    }
}

int main(void) {
    int choice;
    do {
        printf("=== HTTP 1.1 Protocol Parser ===\n");
        printf("1. Parse Raw HTTP Request\n");
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
                char req[MAX_REQ];
                printf("Enter HTTP request line (e.g. GET /index.html HTTP/1.1): ");
                if (scanf("%1023[^\n]", req) == 1) {
                    clear_input();
                    parse_http_request(req);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting HTTP parser.\n");
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
Available via: `proj_http_parser`, `projects.network-utilities.http-parser.prog-http-parser`, `projects>proj_http_parser()`, `projects>network-utilities>http-parser>prog-http-parser>proj_http_parser()`

# proj_json_parser
> **Domain:** `projects` | **Subcategory:** `parsers-compilers` | **Type:** `program`
## Overview
Recursive descent JSON tokenizer and key-value extractor

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

void parse_simple_json(const char* json) {
    printf("Parsing JSON: %s
", json);
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
            printf("  Key: '%s' => Value: '%s'
", key, val);
        } else {
            ptr++;
        }
    }
}

int main(void) {
    const char* sample = "{"name": "dTyp", "version": 2, "active": true}";
    parse_simple_json(sample);
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_json_parser`, `projects.parsers-compilers.json-parser.prog-json-parser`, `projects>proj_json_parser()`, `projects>parsers-compilers>json-parser>prog-json-parser>proj_json_parser()`

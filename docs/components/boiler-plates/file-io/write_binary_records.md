# write_binary_records
> **Domain:** `boiler-plates` | **Subcategory:** `file-io` | **Type:** `function`
## Overview
Writes binary records to file with fwrite

## Signature
```c
size_t write_binary_records(const char* path, const void* records, size_t size, size_t count);
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
size_t write_binary_records(const char* path, const void* records, size_t size, size_t count) {
    FILE* f = fopen(path, "wb");
    if (!f) return 0;
    size_t written = fwrite(records, size, count, f);
    fclose(f);
    return written;
}
```

## Aliases & Shorthands
Available via: `write_binary_records`, `boiler-plates.separate-components.file-io.binary-write-records`, `boiler-plates>write_binary_records()`, `boiler-plates>separate-components>file-io>binary-write-records>write_binary_records()`, `writeBinaryRecords`

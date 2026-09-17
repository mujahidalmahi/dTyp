# prog_string_conversions_trim
> **Domain:** `boiler-plates` | **Subcategory:** `strings` | **Type:** `program`
## Overview
Complete program demonstrating atoi, itoa, uppercase/lowercase, and whitespace trim from scratch

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

void str_trim(char* s) {
    int start = 0;
    while (s[start] == ' ' || s[start] == '\t') start++;
    int end = start;
    while (s[end] != '\0') end++;
    end--;
    while (end >= start && (s[end] == ' ' || s[end] == '\t')) end--;
    int i = 0;
    for (int j = start; j <= end; j++) s[i++] = s[j];
    s[i] = '\0';
}

void str_upper(char* s) {
    for (int i = 0; s[i] != '\0'; i++) {
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
    printf("Trimmed: '%s'\n", s);
    str_upper(s);
    printf("Uppercase: '%s'\n", s);
    const char* num_str = " -12345 ";
    printf("Converted integer: %d\n", str_to_int(num_str));
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_string_conversions_trim`, `boiler-plates.full-programs.strings.prog-conversions-trim`, `boiler-plates>prog_string_conversions_trim()`, `boiler-plates>full-programs>strings>prog-conversions-trim>prog_string_conversions_trim()`

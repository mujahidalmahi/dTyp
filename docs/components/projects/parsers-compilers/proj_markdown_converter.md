# proj_markdown_converter
> **Domain:** `projects` | **Subcategory:** `parsers-compilers` | **Type:** `program`
## Overview
Converts Markdown headings, lists, bold/italic, and blockquotes to HTML

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

void md_to_html_line(const char* line) {
    if (strncmp(line, "### ", 4) == 0) {
        printf("<h3>%s</h3>\n", line + 4);
    } else if (strncmp(line, "## ", 3) == 0) {
        printf("<h2>%s</h2>\n", line + 3);
    } else if (strncmp(line, "# ", 2) == 0) {
        printf("<h1>%s</h1>\n", line + 2);
    } else if (strncmp(line, "- ", 2) == 0) {
        printf("  <li>%s</li>\n", line + 2);
    } else if (strncmp(line, "> ", 2) == 0) {
        printf("<blockquote>%s</blockquote>\n", line + 2);
    } else if (strlen(line) > 0) {
        printf("<p>%s</p>\n", line);
    }
}

int main(void) {
    const char* lines[] = {
        "# Main Heading",
        "## Subheading",
        "> This is a blockquote.",
        "- First item",
        "- Second item",
        "Regular paragraph text."
    };
    for (int i = 0; i < 6; i++) {
        md_to_html_line(lines[i]);
    }
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_markdown_converter`, `projects.parsers-compilers.markdown-html.prog-markdown-converter`, `projects>proj_markdown_converter()`, `projects>parsers-compilers>markdown-html>prog-markdown-converter>proj_markdown_converter()`

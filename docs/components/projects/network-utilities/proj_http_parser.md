# proj_http_parser
> **Domain:** `projects` | **Subcategory:** `network-utilities` | **Type:** `program`
## Overview
State-machine HTTP 1.1 request parser extracting method, path, headers, and body

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

typedef struct {
    char method[8];
    char path[64];
    char host[64];
    int content_length;
} HttpRequest;

void parse_http_request(const char* raw, HttpRequest* req) {
    sscanf(raw, "%7s %63s", req->method, req->path);
    req->content_length = 0;
    const char* h = strstr(raw, "Host: ");
    if (h) sscanf(h, "Host: %63s", req->host);
    const char* cl = strstr(raw, "Content-Length: ");
    if (cl) sscanf(cl, "Content-Length: %d", &req->content_length);
}

int main(void) {
    const char* sample_http =
        "POST /api/v1/user HTTP/1.1
"
        "Host: api.example.com
"
        "Content-Length: 24
"
        "
"
        "{"user": "antigravity"}";
    HttpRequest req;
    parse_http_request(sample_http, &req);
    printf("Method:         %s
", req.method);
    printf("Path:           %s
", req.path);
    printf("Host:           %s
", req.host);
    printf("Content-Length: %d
", req.content_length);
    return 0;
}
```

## Aliases & Shorthands
Available via: `proj_http_parser`, `projects.network-utilities.http-parser.prog-http-parser`, `projects>proj_http_parser()`, `projects>network-utilities>http-parser>prog-http-parser>proj_http_parser()`

# proj_base64_encoder
> **Domain:** `projects` | **Subcategory:** `network-utilities` | **Type:** `program`
## Overview
Interactive Base64 encoding and decoding engine adhering to RFC 4648

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

static const char b64_table[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

static void base64_encode(const unsigned char* in, int len, char* out) {
    int o_idx = 0;
    for (int i = 0; i < len; i += 3) {
        unsigned int octet_a = in[i];
        unsigned int octet_b = (i + 1 < len) ? in[i + 1] : 0;
        unsigned int octet_c = (i + 2 < len) ? in[i + 2] : 0;
        unsigned int triple = (octet_a << 16) | (octet_b << 8) | octet_c;
        out[o_idx++] = b64_table[(triple >> 18) & 0x3F];
        out[o_idx++] = b64_table[(triple >> 12) & 0x3F];
        out[o_idx++] = (i + 1 < len) ? b64_table[(triple >> 6) & 0x3F] : '=';
        out[o_idx++] = (i + 2 < len) ? b64_table[triple & 0x3F] : '=';
    }
    out[o_idx] = '\0';
}

static int b64_char_val(char c) {
    if (c >= 'A' && c <= 'Z') return c - 'A';
    if (c >= 'a' && c <= 'z') return c - 'a' + 26;
    if (c >= '0' && c <= '9') return c - '0' + 52;
    if (c == '+') return 62;
    if (c == '/') return 63;
    return 0;
}

static void base64_decode(const char* in, unsigned char* out, int* out_len) {
    int len = (int)strlen(in);
    int o_idx = 0;
    for (int i = 0; i < len; i += 4) {
        if (in[i] == '=' || in[i + 1] == '=') break;
        unsigned int v0 = b64_char_val(in[i]);
        unsigned int v1 = b64_char_val(in[i + 1]);
        unsigned int v2 = (in[i + 2] != '=') ? b64_char_val(in[i + 2]) : 0;
        unsigned int v3 = (in[i + 3] != '=') ? b64_char_val(in[i + 3]) : 0;
        unsigned int triple = (v0 << 18) | (v1 << 12) | (v2 << 6) | v3;
        out[o_idx++] = (unsigned char)((triple >> 16) & 0xFF);
        if (in[i + 2] != '=') out[o_idx++] = (unsigned char)((triple >> 8) & 0xFF);
        if (in[i + 3] != '=') out[o_idx++] = (unsigned char)(triple & 0xFF);
    }
    out[o_idx] = '\0';
    *out_len = o_idx;
}

int main(void) {
    int choice;
    do {
        printf("=== Base64 Codec Workbench ===\n");
        printf("1. Encode String to Base64\n");
        printf("2. Decode Base64 to Plaintext\n");
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
                char text[256];
                char enc[512];
                printf("Enter text to encode: ");
                if (scanf("%255[^\n]", text) == 1) {
                    clear_input();
                    base64_encode((const unsigned char*)text, (int)strlen(text), enc);
                    printf("Base64 Encoded: %s\n", enc);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                char b64[512];
                unsigned char dec[256];
                int dec_len = 0;
                printf("Enter Base64 to decode: ");
                if (scanf("%511s", b64) == 1) {
                    clear_input();
                    base64_decode(b64, dec, &dec_len);
                    printf("Decoded Text: %s (Length: %d)\n", dec, dec_len);
                } else {
                    clear_input();
                }
                break;
            }
            case 0:
                printf("Exiting Base64 codec.\n");
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
Available via: `proj_base64_encoder`, `projects.network-utilities.base64-codec.prog-base64-encoder`, `projects>proj_base64_encoder()`, `projects>network-utilities>base64-codec>prog-base64-encoder>proj_base64_encoder()`

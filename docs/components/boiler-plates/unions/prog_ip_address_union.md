# prog_ip_address_union
> **Domain:** `boiler-plates` | **Subcategory:** `unions` | **Type:** `program`
## Overview
Complete IPv4 address union program converting between 32-bit uint and octets

## Signature
```c
int main(void)
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
#include <stdint.h>

typedef union IPv4 {
    uint32_t full_address;
    uint8_t octets[4];
} IPv4;

int main(void) {
    IPv4 ip;
    ip.octets[0] = 192;
    ip.octets[1] = 168;
    ip.octets[2] = 1;
    ip.octets[3] = 100;

    printf("Dotted IP: %u.%u.%u.%u
", ip.octets[0], ip.octets[1], ip.octets[2], ip.octets[3]);
    printf("32-bit Integer representation: 0x%08X (%u)
", ip.full_address, ip.full_address);
    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_ip_address_union`, `boiler-plates.full-programs.unions.prog-ip-address-union`, `boiler-plates>prog_ip_address_union()`, `boiler-plates>full-programs>unions>prog-ip-address-union>prog_ip_address_union()`, `ipAddressUnionProgram`

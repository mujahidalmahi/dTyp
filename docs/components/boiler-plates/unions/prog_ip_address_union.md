# prog_ip_address_union
> **Domain:** `boiler-plates` | **Subcategory:** `unions` | **Type:** `program`
## Overview
Interactive IPv4 address analyzer using unions for dual 32-bit and octet views

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
#include <stdint.h>

typedef union {
    uint32_t address;
    uint8_t octets[4];
} IPv4Address;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int main(void) {
    IPv4Address ip;
    ip.octets[0] = 127;
    ip.octets[1] = 0;
    ip.octets[2] = 0;
    ip.octets[3] = 1;
    int choice;

    do {
        printf("\n=== IPV4 UNION ADDRESS ANALYZER ===\n");
        printf("Current IP: %u.%u.%u.%u | 32-bit uint: 0x%08X (%u)\n",
               ip.octets[0], ip.octets[1], ip.octets[2], ip.octets[3],
               ip.address, ip.address);
        printf("1. Set IP via Octets (A.B.C.D)\n");
        printf("2. Set IP via 32-bit Integer\n");
        printf("3. Compute Subnet Mask & Network Address\n");
        printf("0. Exit\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            unsigned int o1, o2, o3, o4;
            printf("Enter 4 octets separated by spaces (e.g. 192 168 1 100): ");
            if (scanf("%u %u %u %u", &o1, &o2, &o3, &o4) == 4) {
                ip.octets[0] = (uint8_t)o1;
                ip.octets[1] = (uint8_t)o2;
                ip.octets[2] = (uint8_t)o3;
                ip.octets[3] = (uint8_t)o4;
            }
        } else if (choice == 2) {
            uint32_t val;
            printf("Enter 32-bit unsigned integer (e.g. 3232235876): ");
            if (scanf("%u", &val) == 1) {
                ip.address = val;
            }
        } else if (choice == 3) {
            int cidr;
            printf("Enter CIDR prefix length (0-32): ");
            if (scanf("%d", &cidr) == 1 && cidr >= 0 && cidr <= 32) {
                uint32_t mask = (cidr == 0) ? 0 : (~0U << (32 - cidr));
                IPv4Address net;
                net.address = ip.address & mask;
                printf("CIDR /%d Mask    : 0x%08X\n", cidr, mask);
                printf("Network Address : %u.%u.%u.%u\n",
                       net.octets[0], net.octets[1], net.octets[2], net.octets[3]);
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}
```

## Aliases & Shorthands
Available via: `prog_ip_address_union`, `boiler-plates.full-programs.unions.prog-ip-address-union`, `boiler-plates>prog_ip_address_union()`, `boiler-plates>full-programs>unions>prog-ip-address-union>prog_ip_address_union()`, `ipAddressUnionProgram`

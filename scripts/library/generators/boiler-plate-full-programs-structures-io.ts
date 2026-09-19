import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateBoilerPlateStructuresIoPrograms(): Component[] {
  const components: Component[] = [];

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.structures.prog-student-records",
      name: "prog_student_records",
      type: "program",
      category: "boiler-plates",
      subcategory: "structures",
      categoryId: "boiler-plates.full-programs.structures",
      path: "boiler-plates/full-programs/structures/prog-student-records",
      description: "Interactive student struct array manager with CRUD operations and averages",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define MAX_RECORDS 50

typedef struct {
    int id;
    char name[48];
    float marks;
} Student;

static Student records[MAX_RECORDS];
static int total_records = 0;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void add_record(int id, const char* name, float marks) {
    if (total_records >= MAX_RECORDS) {
        printf("Database is full!\\n");
        return;
    }
    records[total_records].id = id;
    strncpy(records[total_records].name, name, sizeof(records[total_records].name) - 1);
    records[total_records].name[sizeof(records[total_records].name) - 1] = '\\0';
    records[total_records].marks = marks;
    total_records++;
    printf("Record added for %s (ID: %d).\\n", name, id);
}

static void list_records(void) {
    if (total_records == 0) {
        printf("No records in database.\\n");
        return;
    }
    printf("=== STUDENT RECORDS (%d Total) ===\\n", total_records);
    for (int i = 0; i < total_records; i++) {
        printf("  [%2d] ID: %04d | Name: %-20s | Marks: %.1f\\n",
               i + 1, records[i].id, records[i].name, records[i].marks);
    }
}

static void search_record(int id) {
    for (int i = 0; i < total_records; i++) {
        if (records[i].id == id) {
            printf("Found: ID: %d | Name: %s | Marks: %.1f\\n",
                   records[i].id, records[i].name, records[i].marks);
            return;
        }
    }
    printf("Student with ID %d not found.\\n", id);
}

int main(void) {
    int choice;

    do {
        printf("\\n=== STRUCT STUDENT REGISTRY ===\\n");
        printf("1. Add Student\\n");
        printf("2. List All Students\\n");
        printf("3. Search Student by ID\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            int id;
            char name[48];
            float marks;
            printf("Enter Student ID: ");
            if (scanf("%d", &id) != 1) { clear_input(); continue; }
            clear_input();
            printf("Enter Student Name: ");
            if (fgets(name, sizeof(name), stdin)) {
                name[strcspn(name, "\\r\\n")] = '\\0';
            }
            printf("Enter Marks: ");
            if (scanf("%f", &marks) != 1) marks = 0.0f;
            clear_input();
            add_record(id, name, marks);
        } else if (choice == 2) {
            list_records();
        } else if (choice == 3) {
            int id;
            printf("Enter ID to search: ");
            if (scanf("%d", &id) == 1) {
                search_record(id);
            }
            clear_input();
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "structures", "student", "records"],
      aliases: ["prog_student_records", "studentRecordsProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.structures.prog-2d-geometry",
      name: "prog_2d_geometry",
      type: "program",
      category: "boiler-plates",
      subcategory: "structures",
      categoryId: "boiler-plates.full-programs.structures",
      path: "boiler-plates/full-programs/structures/prog-2d-geometry",
      description: "Interactive 2D geometry toolkit using nested structures and coordinate arithmetic",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>

typedef struct {
    double x;
    double y;
} Point2D;

typedef struct {
    Point2D top_left;
    Point2D bottom_right;
} Rectangle;

static double distance(Point2D p1, Point2D p2) {
    double dx = p2.x - p1.x;
    double dy = p2.y - p1.y;
    return sqrt(dx * dx + dy * dy);
}

static double rect_width(Rectangle r) {
    return fabs(r.bottom_right.x - r.top_left.x);
}

static double rect_height(Rectangle r) {
    return fabs(r.bottom_right.y - r.top_left.y);
}

static double rect_area(Rectangle r) {
    return rect_width(r) * rect_height(r);
}

static double rect_perimeter(Rectangle r) {
    return 2.0 * (rect_width(r) + rect_height(r));
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    int choice;

    do {
        printf("\\n=== 2D GEOMETRY STRUCTURES WORKSHOP ===\\n");
        printf("1. Distance Between Two Points\\n");
        printf("2. Rectangle Area and Perimeter\\n");
        printf("3. Point Inside Rectangle Test\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            Point2D a, b;
            printf("Enter Point A (x y): ");
            if (scanf("%lf %lf", &a.x, &a.y) == 2) {
                printf("Enter Point B (x y): ");
                if (scanf("%lf %lf", &b.x, &b.y) == 2) {
                    printf("Euclidean distance = %.4f units\\n", distance(a, b));
                }
            }
        } else if (choice == 2) {
            Rectangle r;
            printf("Enter Top-Left corner (x y): ");
            if (scanf("%lf %lf", &r.top_left.x, &r.top_left.y) == 2) {
                printf("Enter Bottom-Right corner (x y): ");
                if (scanf("%lf %lf", &r.bottom_right.x, &r.bottom_right.y) == 2) {
                    printf("Width    : %.2f\\n", rect_width(r));
                    printf("Height   : %.2f\\n", rect_height(r));
                    printf("Area     : %.4f\\n", rect_area(r));
                    printf("Perimeter: %.4f\\n", rect_perimeter(r));
                }
            }
        } else if (choice == 3) {
            Rectangle r;
            Point2D p;
            printf("Enter Rect Top-Left (x y): ");
            if (scanf("%lf %lf", &r.top_left.x, &r.top_left.y) == 2) {
                printf("Enter Rect Bottom-Right (x y): ");
                if (scanf("%lf %lf", &r.bottom_right.x, &r.bottom_right.y) == 2) {
                    printf("Enter Test Point (x y): ");
                    if (scanf("%lf %lf", &p.x, &p.y) == 2) {
                        double min_x = r.top_left.x < r.bottom_right.x ? r.top_left.x : r.bottom_right.x;
                        double max_x = r.top_left.x > r.bottom_right.x ? r.top_left.x : r.bottom_right.x;
                        double min_y = r.bottom_right.y < r.top_left.y ? r.bottom_right.y : r.top_left.y;
                        double max_y = r.bottom_right.y > r.top_left.y ? r.bottom_right.y : r.top_left.y;

                        int inside = (p.x >= min_x && p.x <= max_x && p.y >= min_y && p.y <= max_y);
                        printf("Point (%.2f, %.2f) is %s rectangle bounds.\\n",
                               p.x, p.y, inside ? "INSIDE" : "OUTSIDE");
                    }
                }
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "structures", "geometry", "points"],
      aliases: ["prog_2d_geometry", "twoDGeometryProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.unions.prog-variant-display",
      name: "prog_variant_display",
      type: "program",
      category: "boiler-plates",
      subcategory: "unions",
      categoryId: "boiler-plates.full-programs.unions",
      path: "boiler-plates/full-programs/unions/prog-variant-display",
      description: "Interactive tagged union variant representation system with dynamic inspection",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

typedef enum {
    TYPE_INT,
    TYPE_DOUBLE,
    TYPE_STRING
} VariantType;

typedef struct {
    VariantType type;
    union {
        int i_val;
        double d_val;
        char s_val[64];
    } data;
} Variant;

static void display_variant(const Variant* v) {
    switch (v->type) {
        case TYPE_INT:
            printf("Variant [TYPE_INT]    : %d (sizeof union = %zu bytes)\\n",
                   v->data.i_val, sizeof(v->data));
            break;
        case TYPE_DOUBLE:
            printf("Variant [TYPE_DOUBLE] : %.6f (sizeof union = %zu bytes)\\n",
                   v->data.d_val, sizeof(v->data));
            break;
        case TYPE_STRING:
            printf("Variant [TYPE_STRING] : \\"%s\\" (sizeof union = %zu bytes)\\n",
                   v->data.s_val, sizeof(v->data));
            break;
    }
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    Variant active_var;
    active_var.type = TYPE_INT;
    active_var.data.i_val = 42;
    int choice;

    do {
        printf("\\n=== TAGGED UNION VARIANT EXPLORER ===\\n");
        printf("Current Stored State:\\n  ");
        display_variant(&active_var);
        printf("\\n1. Set Integer Value\\n");
        printf("2. Set Double Value\\n");
        printf("3. Set String Value\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            int iv;
            printf("Enter integer: ");
            if (scanf("%d", &iv) == 1) {
                active_var.type = TYPE_INT;
                active_var.data.i_val = iv;
            }
            clear_input();
        } else if (choice == 2) {
            double dv;
            printf("Enter double: ");
            if (scanf("%lf", &dv) == 1) {
                active_var.type = TYPE_DOUBLE;
                active_var.data.d_val = dv;
            }
            clear_input();
        } else if (choice == 3) {
            printf("Enter string: ");
            if (fgets(active_var.data.s_val, sizeof(active_var.data.s_val), stdin)) {
                active_var.data.s_val[strcspn(active_var.data.s_val, "\\r\\n")] = '\\0';
                active_var.type = TYPE_STRING;
            }
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "unions", "variant", "tagged-union"],
      aliases: ["prog_variant_display", "variantDisplayProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.unions.prog-ip-address-union",
      name: "prog_ip_address_union",
      type: "program",
      category: "boiler-plates",
      subcategory: "unions",
      categoryId: "boiler-plates.full-programs.unions",
      path: "boiler-plates/full-programs/unions/prog-ip-address-union",
      description: "Interactive IPv4 address analyzer using unions for dual 32-bit and octet views",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <stdint.h>

typedef union {
    uint32_t address;
    uint8_t octets[4];
} IPv4Address;

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    IPv4Address ip;
    ip.octets[0] = 127;
    ip.octets[1] = 0;
    ip.octets[2] = 0;
    ip.octets[3] = 1;
    int choice;

    do {
        printf("\\n=== IPV4 UNION ADDRESS ANALYZER ===\\n");
        printf("Current IP: %u.%u.%u.%u | 32-bit uint: 0x%08X (%u)\\n",
               ip.octets[0], ip.octets[1], ip.octets[2], ip.octets[3],
               ip.address, ip.address);
        printf("1. Set IP via Octets (A.B.C.D)\\n");
        printf("2. Set IP via 32-bit Integer\\n");
        printf("3. Compute Subnet Mask & Network Address\\n");
        printf("0. Exit\\n");
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
                printf("CIDR /%d Mask    : 0x%08X\\n", cidr, mask);
                printf("Network Address : %u.%u.%u.%u\\n",
                       net.octets[0], net.octets[1], net.octets[2], net.octets[3]);
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "unions", "ipv4", "network"],
      aliases: ["prog_ip_address_union", "ipAddressUnionProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.enums.prog-traffic-light",
      name: "prog_traffic_light",
      type: "program",
      category: "boiler-plates",
      subcategory: "enums",
      categoryId: "boiler-plates.full-programs.enums",
      path: "boiler-plates/full-programs/enums/prog-traffic-light",
      description: "Interactive traffic light controller and state machine simulation",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef enum {
    LIGHT_RED,
    LIGHT_GREEN,
    LIGHT_YELLOW
} TrafficLightState;

static const char* state_to_string(TrafficLightState s) {
    switch (s) {
        case LIGHT_RED:    return "RED [STOP - Wait for cross traffic]";
        case LIGHT_GREEN:  return "GREEN [GO - Proceed safely]";
        case LIGHT_YELLOW: return "YELLOW [CAUTION - Prepare to stop]";
        default:           return "UNKNOWN";
    }
}

static TrafficLightState next_state(TrafficLightState s) {
    switch (s) {
        case LIGHT_RED:    return LIGHT_GREEN;
        case LIGHT_GREEN:  return LIGHT_YELLOW;
        case LIGHT_YELLOW: return LIGHT_RED;
        default:           return LIGHT_RED;
    }
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    TrafficLightState current = LIGHT_RED;
    int choice;

    do {
        printf("\\n=== TRAFFIC LIGHT CONTROLLER (ENUM FINITE STATE MACHINE) ===\\n");
        printf("Current Signal: %s\\n", state_to_string(current));
        printf("1. Advance Signal (Step FSM)\\n");
        printf("2. Simulate N Cycles\\n");
        printf("3. Manual Override to Color\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            current = next_state(current);
            printf("Advanced to: %s\\n", state_to_string(current));
        } else if (choice == 2) {
            int cycles;
            printf("Enter number of state advances: ");
            if (scanf("%d", &cycles) == 1 && cycles > 0) {
                for (int i = 1; i <= cycles; i++) {
                    current = next_state(current);
                    printf("  Advance #%d: %s\\n", i, state_to_string(current));
                }
            }
        } else if (choice == 3) {
            int set_color;
            printf("Choose (0: RED, 1: GREEN, 2: YELLOW): ");
            if (scanf("%d", &set_color) == 1 && set_color >= 0 && set_color <= 2) {
                current = (TrafficLightState)set_color;
                printf("Manually set to: %s\\n", state_to_string(current));
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "enums", "fsm", "traffic-light"],
      aliases: ["prog_traffic_light", "trafficLightProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.enums.prog-order-lifecycle",
      name: "prog_order_lifecycle",
      type: "program",
      category: "boiler-plates",
      subcategory: "enums",
      categoryId: "boiler-plates.full-programs.enums",
      path: "boiler-plates/full-programs/enums/prog-order-lifecycle",
      description: "Interactive e-commerce order state transition validator using enumerations",
      signature: "int main(void);",
      code: `#include <stdio.h>

typedef enum {
    ORDER_PENDING = 0,
    ORDER_PAID,
    ORDER_PROCESSING,
    ORDER_SHIPPED,
    ORDER_DELIVERED,
    ORDER_CANCELLED
} OrderState;

static const char* order_state_name(OrderState s) {
    switch (s) {
        case ORDER_PENDING:    return "PENDING";
        case ORDER_PAID:       return "PAID";
        case ORDER_PROCESSING: return "PROCESSING";
        case ORDER_SHIPPED:    return "SHIPPED";
        case ORDER_DELIVERED:  return "DELIVERED";
        case ORDER_CANCELLED:  return "CANCELLED";
        default:               return "UNKNOWN";
    }
}

static int is_valid_transition(OrderState from, OrderState to) {
    if (from == ORDER_CANCELLED || from == ORDER_DELIVERED) return 0;
    if (to == ORDER_CANCELLED) return (from == ORDER_PENDING || from == ORDER_PAID);
    if (from == ORDER_PENDING && to == ORDER_PAID) return 1;
    if (from == ORDER_PAID && to == ORDER_PROCESSING) return 1;
    if (from == ORDER_PROCESSING && to == ORDER_SHIPPED) return 1;
    if (from == ORDER_SHIPPED && to == ORDER_DELIVERED) return 1;
    return 0;
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    OrderState current = ORDER_PENDING;
    int choice;

    do {
        printf("\\n=== ORDER LIFECYCLE STATE TRANSITIONS ===\\n");
        printf("Current Order Status: [%s]\\n", order_state_name(current));
        printf("1. Transition to Next Lifecycle Step\\n");
        printf("2. Request Order Cancellation\\n");
        printf("3. Reset to PENDING\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            OrderState next = (OrderState)((int)current + 1);
            if (is_valid_transition(current, next)) {
                printf("Transition SUCCESS: %s -> %s\\n",
                       order_state_name(current), order_state_name(next));
                current = next;
            } else {
                printf("Transition REJECTED: Cannot transition from %s to %s!\\n",
                       order_state_name(current), order_state_name(next));
            }
        } else if (choice == 2) {
            if (is_valid_transition(current, ORDER_CANCELLED)) {
                printf("Cancellation APPROVED. Order is now CANCELLED.\\n");
                current = ORDER_CANCELLED;
            } else {
                printf("Cancellation REJECTED: Order in %s status cannot be cancelled.\\n",
                       order_state_name(current));
            }
        } else if (choice == 3) {
            current = ORDER_PENDING;
            printf("Order reset to PENDING.\\n");
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "enums", "order", "state-machine"],
      aliases: ["prog_order_lifecycle", "orderLifecycleProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.file-io.prog-file-copy",
      name: "prog_file_copy",
      type: "program",
      category: "boiler-plates",
      subcategory: "file-io",
      categoryId: "boiler-plates.full-programs.file-io",
      path: "boiler-plates/full-programs/file-io/prog-file-copy",
      description: "Interactive file duplicate and streaming copy utility with byte progress metrics",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define CHUNK_SIZE 1024

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static int copy_stream(const char* src_path, const char* dest_path) {
    FILE* src = fopen(src_path, "rb");
    if (!src) {
        printf("Error: Could not open source file \\"%s\\"!\\n", src_path);
        return -1;
    }
    FILE* dest = fopen(dest_path, "wb");
    if (!dest) {
        printf("Error: Could not create destination file \\"%s\\"!\\n", dest_path);
        fclose(src);
        return -1;
    }

    char buffer[CHUNK_SIZE];
    size_t total_bytes = 0;
    size_t n;
    while ((n = fread(buffer, 1, sizeof(buffer), src)) > 0) {
        fwrite(buffer, 1, n, dest);
        total_bytes += n;
    }

    fclose(src);
    fclose(dest);
    printf("Successfully copied %zu bytes from \\"%s\\" to \\"%s\\".\\n",
           total_bytes, src_path, dest_path);
    return 0;
}

int main(void) {
    char src[128];
    char dst[128];
    int choice;

    do {
        printf("\\n=== FILE STREAM COPY UTILITY ===\\n");
        printf("1. Copy File\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            printf("Enter source file path: ");
            if (fgets(src, sizeof(src), stdin)) {
                src[strcspn(src, "\\r\\n")] = '\\0';
            }
            printf("Enter destination file path: ");
            if (fgets(dst, sizeof(dst), stdin)) {
                dst[strcspn(dst, "\\r\\n")] = '\\0';
            }
            if (strlen(src) > 0 && strlen(dst) > 0) {
                copy_stream(src, dst);
            }
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "file-io", "copy", "stream"],
      aliases: ["prog_file_copy", "fileCopyProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.file-io.prog-file-line-counter",
      name: "prog_file_line_counter",
      type: "program",
      category: "boiler-plates",
      subcategory: "file-io",
      categoryId: "boiler-plates.full-programs.file-io",
      path: "boiler-plates/full-programs/file-io/prog-file-line-counter",
      description: "Interactive file text analytics counting lines, words, characters, and whitespace",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void analyze_file(const char* path) {
    FILE* fp = fopen(path, "r");
    if (!fp) {
        printf("Error: Could not open \\"%s\\" for reading!\\n", path);
        return;
    }

    long long lines = 0, words = 0, chars = 0, non_blank_lines = 0;
    int in_word = 0, line_chars = 0;
    int ch;

    while ((ch = fgetc(fp)) != EOF) {
        chars++;
        if (ch == '\\n') {
            lines++;
            if (line_chars > 0) non_blank_lines++;
            line_chars = 0;
        } else if (!isspace(ch)) {
            line_chars++;
        }

        if (isspace(ch)) {
            in_word = 0;
        } else if (!in_word) {
            in_word = 1;
            words++;
        }
    }

    if (chars > 0 && line_chars > 0) {
        lines++;
        non_blank_lines++;
    }

    fclose(fp);

    printf("\\n--- File Statistics for \\"%s\\" ---\\n", path);
    printf("  Total Characters : %lld\\n", chars);
    printf("  Total Words      : %lld\\n", words);
    printf("  Total Lines      : %lld\\n", lines);
    printf("  Non-Blank Lines  : %lld\\n", non_blank_lines);
}

int main(void) {
    char path[128];
    int choice;

    do {
        printf("\\n=== FILE LINE & WORD COUNTER ===\\n");
        printf("1. Analyze File\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            printf("Enter path to file: ");
            if (fgets(path, sizeof(path), stdin)) {
                path[strcspn(path, "\\r\\n")] = '\\0';
                if (strlen(path) > 0) {
                    analyze_file(path);
                }
            }
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "file-io", "counter", "wc"],
      aliases: ["prog_file_line_counter", "fileLineCounterProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.macros.prog-logging-macros",
      name: "prog_logging_macros",
      type: "program",
      category: "boiler-plates",
      subcategory: "macros",
      categoryId: "boiler-plates.full-programs.macros",
      path: "boiler-plates/full-programs/macros/prog-logging-macros",
      description: "Interactive preprocessor logging framework with levels and source location tags",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

#define LOG_LEVEL_DEBUG 0
#define LOG_LEVEL_INFO  1
#define LOG_LEVEL_WARN  2
#define LOG_LEVEL_ERROR 3

static int current_verbosity = LOG_LEVEL_DEBUG;

#define LOG_MSG(level, prefix, fmt, ...) do { \\
    if (level >= current_verbosity) { \\
        printf("[%s] (%s:%d): " fmt "\\n", prefix, __FILE__, __LINE__, ##__VA_ARGS__); \\
    } \\
} while (0)

#define LOG_DEBUG(fmt, ...) LOG_MSG(LOG_LEVEL_DEBUG, "DEBUG", fmt, ##__VA_ARGS__)
#define LOG_INFO(fmt, ...)  LOG_MSG(LOG_LEVEL_INFO,  "INFO ", fmt, ##__VA_ARGS__)
#define LOG_WARN(fmt, ...)  LOG_MSG(LOG_LEVEL_WARN,  "WARN ", fmt, ##__VA_ARGS__)
#define LOG_ERROR(fmt, ...) LOG_MSG(LOG_LEVEL_ERROR, "ERROR", fmt, ##__VA_ARGS__)

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    int choice;
    char text[128];

    do {
        printf("\\n=== PREPROCESSOR LOGGING HARNESS ===\\n");
        printf("Current Minimum Verbosity Level: %d\\n", current_verbosity);
        printf("1. Emit DEBUG Log\\n");
        printf("2. Emit INFO Log\\n");
        printf("3. Emit WARN Log\\n");
        printf("4. Emit ERROR Log\\n");
        printf("5. Change Verbosity Threshold\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice >= 1 && choice <= 4) {
            printf("Enter log message: ");
            if (fgets(text, sizeof(text), stdin)) {
                text[strcspn(text, "\\r\\n")] = '\\0';
                if (choice == 1) LOG_DEBUG("%s", text);
                else if (choice == 2) LOG_INFO("%s", text);
                else if (choice == 3) LOG_WARN("%s", text);
                else if (choice == 4) LOG_ERROR("%s", text);
            }
        } else if (choice == 5) {
            printf("Select new threshold (0: DEBUG, 1: INFO, 2: WARN, 3: ERROR): ");
            if (scanf("%d", &current_verbosity) != 1 || current_verbosity < 0 || current_verbosity > 3) {
                current_verbosity = 0;
            }
            clear_input();
            printf("Verbosity threshold updated to %d.\\n", current_verbosity);
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "macros", "logging", "preprocessor"],
      aliases: ["prog_logging_macros", "loggingMacrosProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.macros.prog-macro-metaprogramming",
      name: "prog_macro_metaprogramming",
      type: "program",
      category: "boiler-plates",
      subcategory: "macros",
      categoryId: "boiler-plates.full-programs.macros",
      path: "boiler-plates/full-programs/macros/prog-macro-metaprogramming",
      description: "Interactive preprocessor macro metaprogramming workbench (MIN, MAX, CLAMP, SWAP)",
      signature: "int main(void);",
      code: `#include <stdio.h>

#define MACRO_MIN(a, b) (((a) < (b)) ? (a) : (b))
#define MACRO_MAX(a, b) (((a) > (b)) ? (a) : (b))
#define MACRO_CLAMP(x, lo, hi) (MACRO_MIN(MACRO_MAX((x), (lo)), (hi)))
#define MACRO_SWAP(T, a, b) do { T _temp = (a); (a) = (b); (b) = _temp; } while (0)
#define ARRAY_COUNT(arr) (sizeof(arr) / sizeof((arr)[0]))

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    int choice;

    do {
        printf("\\n=== MACRO METAPROGRAMMING WORKBENCH ===\\n");
        printf("1. Test MIN and MAX Macros\\n");
        printf("2. Test CLAMP Macro (Value, Low, High)\\n");
        printf("3. Test Generic SWAP Macro\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice == 1) {
            int a, b;
            printf("Enter two integers: ");
            if (scanf("%d %d", &a, &b) == 2) {
                printf("MACRO_MIN(%d, %d) = %d\\n", a, b, MACRO_MIN(a, b));
                printf("MACRO_MAX(%d, %d) = %d\\n", a, b, MACRO_MAX(a, b));
            }
        } else if (choice == 2) {
            int val, lo, hi;
            printf("Enter value, min_bound, max_bound: ");
            if (scanf("%d %d %d", &val, &lo, &hi) == 3) {
                printf("MACRO_CLAMP(%d, %d, %d) = %d\\n", val, lo, hi, MACRO_CLAMP(val, lo, hi));
            }
        } else if (choice == 3) {
            double x, y;
            printf("Enter two double values to swap: ");
            if (scanf("%lf %lf", &x, &y) == 2) {
                printf("Before swap: x = %.2f, y = %.2f\\n", x, y);
                MACRO_SWAP(double, x, y);
                printf("After swap : x = %.2f, y = %.2f\\n", x, y);
            }
        }
        clear_input();
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "macros", "metaprogramming", "swap"],
      aliases: ["prog_macro_metaprogramming", "macroMetaprogrammingProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.strings.prog-core-operations",
      name: "prog_core_operations",
      type: "program",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.full-programs.strings",
      path: "boiler-plates/full-programs/strings/prog-core-operations",
      description: "Interactive string workbench implementing custom strlen, strcpy, strcat, and strcmp",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

static size_t custom_strlen(const char* s) {
    size_t len = 0;
    while (s[len] != '\\0') len++;
    return len;
}

static void custom_strcpy(char* dest, const char* src) {
    while ((*dest++ = *src++) != '\\0');
}

static void custom_strcat(char* dest, const char* src) {
    while (*dest != '\\0') dest++;
    while ((*dest++ = *src++) != '\\0');
}

static int custom_strcmp(const char* s1, const char* s2) {
    while (*s1 && (*s1 == *s2)) {
        s1++;
        s2++;
    }
    return *(const unsigned char*)s1 - *(const unsigned char*)s2;
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    char s1[128] = "Hello";
    char s2[128] = "World";
    int choice;

    do {
        printf("\\n=== STRING CORE OPERATIONS WORKBENCH ===\\n");
        printf("Current Strings:\\n  s1 = \\"%s\\" (len: %zu)\\n  s2 = \\"%s\\" (len: %zu)\\n",
               s1, custom_strlen(s1), s2, custom_strlen(s2));
        printf("1. Update String S1\\n");
        printf("2. Update String S2\\n");
        printf("3. Compare S1 and S2 (strcmp)\\n");
        printf("4. Concatenate S2 onto S1 (strcat)\\n");
        printf("5. Copy S2 into S1 (strcpy)\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            printf("Enter new S1: ");
            if (fgets(s1, sizeof(s1), stdin)) s1[strcspn(s1, "\\r\\n")] = '\\0';
        } else if (choice == 2) {
            printf("Enter new S2: ");
            if (fgets(s2, sizeof(s2), stdin)) s2[strcspn(s2, "\\r\\n")] = '\\0';
        } else if (choice == 3) {
            int cmp = custom_strcmp(s1, s2);
            if (cmp == 0) printf("s1 is EQUAL to s2\\n");
            else if (cmp < 0) printf("s1 is LESS than s2 (diff: %d)\\n", cmp);
            else printf("s1 is GREATER than s2 (diff: %d)\\n", cmp);
        } else if (choice == 4) {
            if (custom_strlen(s1) + custom_strlen(s2) < sizeof(s1)) {
                custom_strcat(s1, s2);
                printf("Concatenated result: \\"%s\\"\\n", s1);
            } else {
                printf("Buffer overflow prevented! Destination too small.\\n");
            }
        } else if (choice == 5) {
            custom_strcpy(s1, s2);
            printf("Copied result: s1 is now \\"%s\\"\\n", s1);
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "strings", "operations", "strcpy"],
      aliases: ["prog_core_operations", "coreOperationsProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.strings.prog-search-substring",
      name: "prog_search_substring",
      type: "program",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.full-programs.strings",
      path: "boiler-plates/full-programs/strings/prog-search-substring",
      description: "Interactive substring occurrence finder and pattern counter utility",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>

static const char* custom_strstr(const char* haystack, const char* needle) {
    if (!*needle) return haystack;
    for (; *haystack; haystack++) {
        if (*haystack == *needle) {
            const char* h = haystack;
            const char* n = needle;
            while (*h && *n && *h == *n) {
                h++;
                n++;
            }
            if (!*n) return haystack;
        }
    }
    return NULL;
}

static int count_occurrences(const char* haystack, const char* needle) {
    if (!*needle) return 0;
    int count = 0;
    size_t needle_len = strlen(needle);
    const char* pos = haystack;
    while ((pos = custom_strstr(pos, needle)) != NULL) {
        count++;
        pos += needle_len;
    }
    return count;
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    char haystack[256];
    char needle[64];
    int choice;

    do {
        printf("\\n=== SUBSTRING SEARCH & COUNT TOOL ===\\n");
        printf("1. Search Substring in Text\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice == 1) {
            printf("Enter full text (haystack): ");
            if (fgets(haystack, sizeof(haystack), stdin)) {
                haystack[strcspn(haystack, "\\r\\n")] = '\\0';
            }
            printf("Enter search pattern (needle): ");
            if (fgets(needle, sizeof(needle), stdin)) {
                needle[strcspn(needle, "\\r\\n")] = '\\0';
            }

            int count = count_occurrences(haystack, needle);
            const char* first = custom_strstr(haystack, needle);
            if (first) {
                printf("Pattern \\"%s\\" found %d time(s)! First match at index %td.\\n",
                       needle, count, first - haystack);
            } else {
                printf("Pattern \\"%s\\" not found in text.\\n", needle);
            }
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "strings", "substring", "strstr"],
      aliases: ["prog_search_substring", "searchSubstringProgram"],
    })
  );

  components.push(
    createComponent({
      id: "boiler-plates.full-programs.strings.prog-conversions-trim",
      name: "prog_conversions_trim",
      type: "program",
      category: "boiler-plates",
      subcategory: "strings",
      categoryId: "boiler-plates.full-programs.strings",
      path: "boiler-plates/full-programs/strings/prog-conversions-trim",
      description: "Interactive string cleaner performing whitespace trimming, case conversions, and parsing",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>

static void trim_whitespace(char* s) {
    char* start = s;
    while (isspace((unsigned char)*start)) start++;
    if (*start == '\\0') {
        s[0] = '\\0';
        return;
    }
    char* end = start + strlen(start) - 1;
    while (end > start && isspace((unsigned char)*end)) end--;
    *(end + 1) = '\\0';
    if (start != s) {
        memmove(s, start, (size_t)(end - start + 2));
    }
}

static void to_uppercase(char* s) {
    for (; *s; s++) *s = (char)toupper((unsigned char)*s);
}

static void to_lowercase(char* s) {
    for (; *s; s++) *s = (char)tolower((unsigned char)*s);
}

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    char buffer[256];
    int choice;

    do {
        printf("\\n=== STRING CLEANER & CONVERTER ===\\n");
        printf("1. Trim Whitespace\\n");
        printf("2. Convert to Uppercase\\n");
        printf("3. Convert to Lowercase\\n");
        printf("4. Parse String to Numeric (atoi / atof)\\n");
        printf("0. Exit\\n");
        printf("Select option: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }
        clear_input();

        if (choice >= 1 && choice <= 4) {
            printf("Enter text: ");
            if (fgets(buffer, sizeof(buffer), stdin)) {
                buffer[strcspn(buffer, "\\r\\n")] = '\\0';
                if (choice == 1) {
                    trim_whitespace(buffer);
                    printf("Trimmed: [\\"%s\\"]\\n", buffer);
                } else if (choice == 2) {
                    to_uppercase(buffer);
                    printf("Uppercase: %s\\n", buffer);
                } else if (choice == 3) {
                    to_lowercase(buffer);
                    printf("Lowercase: %s\\n", buffer);
                } else if (choice == 4) {
                    int i_val = atoi(buffer);
                    double d_val = atof(buffer);
                    printf("Integer parse (atoi): %d\\n", i_val);
                    printf("Double parse (atof) : %.4f\\n", d_val);
                }
            }
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["program", "strings", "trim", "conversion"],
      aliases: ["prog_conversions_trim", "conversionsTrimProgram"],
    })
  );

  return components;
}

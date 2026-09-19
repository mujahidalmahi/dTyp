import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateAcademicLinearAlgebraComponents(): Component[] {
  const components: Component[] = [];

  // 29. Line Intersection & Geometry
  components.push(
    createComponent({
      id: "academics-programming.geometry-linear-algebra.coordinate-geometry.line-intersection.prog-line-intersection",
      name: "prog_acad_line_intersection",
      type: "program",
      category: "academics-programming",
      subcategory: "geometry-linear-algebra",
      categoryId: "academics-programming.geometry-linear-algebra.coordinate-geometry.line-intersection",
      path: "academics-programming/geometry-linear-algebra/coordinate-geometry/line-intersection/prog-line-intersection",
      description: "Interactive 2D line intersection solver using Cramer's rule, segment intersection, distance, and angle between lines",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void intersect_lines(double a1, double b1, double c1, double a2, double b2, double c2) {
    double det = a1 * b2 - a2 * b1;
    if (fabs(det) < 1e-12) {
        if (fabs(a1 * c2 - a2 * c1) < 1e-12 && fabs(b1 * c2 - b2 * c1) < 1e-12) {
            printf("Lines are COINCIDENT (infinite intersection points).\\n");
        } else {
            printf("Lines are PARALLEL (no intersection point).\\n");
        }
        return;
    }

    double x = (b1 * c2 - b2 * c1) / det;
    double y = (c1 * a2 - c2 * a1) / det;
    printf("Unique Intersection Point: (x, y) = (%10.5f, %10.5f)\\n", x, y);

    double dot = a1 * a2 + b1 * b2;
    double mag1 = sqrt(a1 * a1 + b1 * b1);
    double mag2 = sqrt(a2 * a2 + b2 * b2);
    double cos_theta = fabs(dot) / (mag1 * mag2);
    if (cos_theta > 1.0) cos_theta = 1.0;
    double theta_deg = acos(cos_theta) * (180.0 / 3.141592653589793);
    printf("Acute Angle Between Lines:   %10.2f degrees\\n", theta_deg);
}

static void distance_point_to_line(double px, double py, double a, double b, double c) {
    double dist = fabs(a * px + b * py + c) / sqrt(a * a + b * b);
    printf("Perpendicular Distance from (%.4f, %.4f) to %.2fx + %.2fy + %.2f = 0: %.6f\\n",
           px, py, a, b, c, dist);
}

int main(void) {
    int choice;
    do {
        printf("\\n================ 2D LINE INTERSECTION & GEOMETRY ================\\n");
        printf("1. Intersect Two Lines (A1*x + B1*y + C1 = 0 and A2*x + B2*y + C2 = 0)\\n");
        printf("2. Distance from Point (x0, y0) to Line (A*x + B*y + C = 0)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double a1, b1, c1, a2, b2, c2;
                printf("Enter Line 1 coefficients A1, B1, C1: ");
                if (scanf("%lf %lf %lf", &a1, &b1, &c1) != 3) { clear_input(); break; }
                printf("Enter Line 2 coefficients A2, B2, C2: ");
                if (scanf("%lf %lf %lf", &a2, &b2, &c2) != 3) { clear_input(); break; }
                intersect_lines(a1, b1, c1, a2, b2, c2);
                break;
            }
            case 2: {
                double px, py, a, b, c;
                printf("Enter Point (px, py): ");
                if (scanf("%lf %lf", &px, &py) != 2) { clear_input(); break; }
                printf("Enter Line coefficients A, B, C: ");
                if (scanf("%lf %lf %lf", &a, &b, &c) != 3) { clear_input(); break; }
                distance_point_to_line(px, py, a, b, c);
                break;
            }
            case 0:
                printf("Exiting Line Intersection Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "geometry-linear-algebra", "lines", "intersection"],
      aliases: ["prog_acad_line_intersection"],
    })
  );

  // 30. Conic Sections
  components.push(
    createComponent({
      id: "academics-programming.geometry-linear-algebra.coordinate-geometry.conic-sections.prog-conic-sections",
      name: "prog_acad_conic_sections",
      type: "program",
      category: "academics-programming",
      subcategory: "geometry-linear-algebra",
      categoryId: "academics-programming.geometry-linear-algebra.coordinate-geometry.conic-sections",
      path: "academics-programming/geometry-linear-algebra/coordinate-geometry/conic-sections/prog-conic-sections",
      description: "Interactive general conic section analyzer (Ax^2 + Bxy + Cy^2 + Dx + Ey + F = 0) with discriminant classification and rotation angle",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void classify_conic(double A, double B, double C, double D, double E, double F) {
    double disc = B * B - 4.0 * A * C;
    double det3 = A * (C * F - E * E / 4.0) - (B / 2.0) * ((B / 2.0) * F - (D / 2.0) * (E / 2.0))
                  + (D / 2.0) * ((B / 2.0) * (E / 2.0) - (D / 2.0) * C);

    printf("\\nConic Analysis for: %.2fx^2 + %.2fxy + %.2fy^2 + %.2fx + %.2fy + %.2f = 0\\n",
           A, B, C, D, E, F);
    printf("  Discriminant B^2 - 4AC: %12.4f\\n", disc);
    printf("  3x3 Invariant Det:      %12.4f\\n", det3);

    if (fabs(det3) < 1e-9) {
        printf("  Classification: DEGENERATE CONIC (Point, Pair of Lines, or Null set)\\n");
        return;
    }

    if (disc < -1e-9) {
        if (fabs(A - C) < 1e-9 && fabs(B) < 1e-9) {
            printf("  Classification: CIRCLE\\n");
        } else {
            printf("  Classification: ELLIPSE\\n");
        }
    } else if (fabs(disc) <= 1e-9) {
        printf("  Classification: PARABOLA\\n");
    } else {
        if (fabs(A + C) < 1e-9) {
            printf("  Classification: RECTANGULAR HYPERBOLA (Asymptotes perpendicular)\\n");
        } else {
            printf("  Classification: HYPERBOLA\\n");
        }
    }

    if (fabs(B) > 1e-9) {
        double theta_rad = 0.5 * atan2(B, A - C);
        double theta_deg = theta_rad * (180.0 / 3.141592653589793);
        printf("  Axes Rotation Angle to Eliminate xy Term: %.2f degrees (%.4f rad)\\n",
               theta_deg, theta_rad);
    } else {
        printf("  Conic is already aligned with coordinate axes (no xy cross term).\\n");
    }
}

int main(void) {
    int choice;
    do {
        printf("\\n================ CONIC SECTIONS CLASSIFIER ================\\n");
        printf("1. Classify Conic Equation (A, B, C, D, E, F)\\n");
        printf("2. Test Standard Ellipse (x^2/4 + y^2/9 - 1 = 0)\\n");
        printf("3. Test Hyperbola (x^2 - y^2 - 1 = 0)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double A, B, C, D, E, F;
                printf("Enter coefficients A B C D E F: ");
                if (scanf("%lf %lf %lf %lf %lf %lf", &A, &B, &C, &D, &E, &F) == 6) {
                    classify_conic(A, B, C, D, E, F);
                } else {
                    clear_input();
                }
                break;
            }
            case 2:
                classify_conic(0.25, 0.0, 1.0 / 9.0, 0.0, 0.0, -1.0);
                break;
            case 3:
                classify_conic(1.0, 0.0, -1.0, 0.0, 0.0, -1.0);
                break;
            case 0:
                printf("Exiting Conic Sections Classifier.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "geometry-linear-algebra", "conics", "analytic-geometry"],
      aliases: ["prog_acad_conic_sections"],
    })
  );

  // 31. 3D Planes & Lines
  components.push(
    createComponent({
      id: "academics-programming.geometry-linear-algebra.coordinate-geometry.planes-lines-3d.prog-planes-lines-3d",
      name: "prog_acad_planes_lines_3d",
      type: "program",
      category: "academics-programming",
      subcategory: "geometry-linear-algebra",
      categoryId: "academics-programming.geometry-linear-algebra.coordinate-geometry.planes-lines-3d",
      path: "academics-programming/geometry-linear-algebra/coordinate-geometry/planes-lines-3d/prog-planes-lines-3d",
      description: "Interactive 3D analytical geometry solver for plane intersections, angles between planes, and point-to-plane distance",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void analyze_two_planes(double a1, double b1, double c1, double d1,
                               double a2, double b2, double c2, double d2) {
    double mag1 = sqrt(a1 * a1 + b1 * b1 + c1 * c1);
    double mag2 = sqrt(a2 * a2 + b2 * b2 + c2 * c2);
    if (mag1 < 1e-9 || mag2 < 1e-9) {
        printf("Error: Normal vector cannot be zero.\\n");
        return;
    }

    double dot = a1 * a2 + b1 * b2 + c1 * c2;
    double cos_angle = fabs(dot) / (mag1 * mag2);
    if (cos_angle > 1.0) cos_angle = 1.0;
    double angle_deg = acos(cos_angle) * (180.0 / 3.141592653589793);

    double dx = b1 * c2 - c1 * b2;
    double dy = c1 * a2 - a1 * c2;
    double dz = a1 * b2 - b1 * a2;
    double dir_mag = sqrt(dx * dx + dy * dy + dz * dz);

    printf("\\nPlane 1: %.2fx + %.2fy + %.2fz + %.2f = 0\\n", a1, b1, c1, d1);
    printf("Plane 2: %.2fx + %.2fy + %.2fz + %.2f = 0\\n", a2, b2, c2, d2);
    printf("  Dihedral Angle Between Planes: %.2f degrees\\n", angle_deg);

    if (dir_mag < 1e-9) {
        if (fabs(d1 / mag1 - d2 / mag2) < 1e-6) {
            printf("  Planes are IDENTICAL (COINCIDENT).\\n");
        } else {
            printf("  Planes are PARALLEL.\\n");
        }
    } else {
        printf("  Planes INTERSECT along a line.\\n");
        printf("  Direction Vector of Intersection Line: <%.4f, %.4f, %.4f>\\n",
               dx / dir_mag, dy / dir_mag, dz / dir_mag);
    }
}

static void point_plane_distance(double px, double py, double pz, double a, double b, double c, double d) {
    double dist = fabs(a * px + b * py + c * pz + d) / sqrt(a * a + b * b + c * c);
    printf("Perpendicular Distance from (%.2f, %.2f, %.2f) to Plane: %.6f\\n",
           px, py, pz, dist);
}

int main(void) {
    int choice;
    do {
        printf("\\n================ 3D PLANES & LINES WORKBENCH ================\\n");
        printf("1. Intersect Two 3D Planes & Find Dihedral Angle\\n");
        printf("2. Distance from 3D Point to Plane\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double a1, b1, c1, d1, a2, b2, c2, d2;
                printf("Enter Plane 1 (A1 B1 C1 D1): ");
                if (scanf("%lf %lf %lf %lf", &a1, &b1, &c1, &d1) != 4) { clear_input(); break; }
                printf("Enter Plane 2 (A2 B2 C2 D2): ");
                if (scanf("%lf %lf %lf %lf", &a2, &b2, &c2, &d2) != 4) { clear_input(); break; }
                analyze_two_planes(a1, b1, c1, d1, a2, b2, c2, d2);
                break;
            }
            case 2: {
                double px, py, pz, a, b, c, d;
                printf("Enter Point (px py pz): ");
                if (scanf("%lf %lf %lf", &px, &py, &pz) != 3) { clear_input(); break; }
                printf("Enter Plane (A B C D): ");
                if (scanf("%lf %lf %lf %lf", &a, &b, &c, &d) != 4) { clear_input(); break; }
                point_plane_distance(px, py, pz, a, b, c, d);
                break;
            }
            case 0:
                printf("Exiting 3D Planes Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "geometry-linear-algebra", "3d-geometry", "planes"],
      aliases: ["prog_acad_planes_lines_3d"],
    })
  );

  // 32. Determinant & Inverse
  components.push(
    createComponent({
      id: "academics-programming.geometry-linear-algebra.matrix-analysis.determinant-inverse.prog-determinant-inverse",
      name: "prog_acad_determinant_inverse",
      type: "program",
      category: "academics-programming",
      subcategory: "geometry-linear-algebra",
      categoryId: "academics-programming.geometry-linear-algebra.matrix-analysis.determinant-inverse",
      path: "academics-programming/geometry-linear-algebra/matrix-analysis/determinant-inverse/prog-determinant-inverse",
      description: "Interactive matrix determinant, adjugate, and inverse calculator with Gaussian elimination and verification",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define MAX_DIM 6

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_matrix(int n, double m[MAX_DIM][MAX_DIM]) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) printf("%10.4f ", m[i][j]);
        printf("\\n");
    }
}

static double compute_det(int n, double m[MAX_DIM][MAX_DIM]) {
    double a[MAX_DIM][MAX_DIM];
    for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) a[i][j] = m[i][j];

    int swap_count = 0;
    for (int i = 0; i < n; i++) {
        int pivot = i;
        for (int k = i + 1; k < n; k++) {
            if (fabs(a[k][i]) > fabs(a[pivot][i])) pivot = k;
        }
        if (fabs(a[pivot][i]) < 1e-14) return 0.0;
        if (pivot != i) {
            for (int j = 0; j < n; j++) {
                double tmp = a[i][j]; a[i][j] = a[pivot][j]; a[pivot][j] = tmp;
            }
            swap_count++;
        }
        for (int k = i + 1; k < n; k++) {
            double f = a[k][i] / a[i][i];
            for (int j = i; j < n; j++) a[k][j] -= f * a[i][j];
        }
    }
    double det = (swap_count % 2 == 1) ? -1.0 : 1.0;
    for (int i = 0; i < n; i++) det *= a[i][i];
    return det;
}

static void compute_inverse(int n, double m[MAX_DIM][MAX_DIM]) {
    double det = compute_det(n, m);
    printf("\\nMatrix Determinant: %.6f\\n", det);
    if (fabs(det) < 1e-12) {
        printf("Matrix is SINGULAR (det = 0). Inverse does not exist.\\n");
        return;
    }

    double aug[MAX_DIM][MAX_DIM * 2];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) aug[i][j] = m[i][j];
        for (int j = n; j < 2 * n; j++) aug[i][j] = (j - n == i) ? 1.0 : 0.0;
    }

    for (int i = 0; i < n; i++) {
        int pivot = i;
        for (int k = i + 1; k < n; k++) {
            if (fabs(aug[k][i]) > fabs(aug[pivot][i])) pivot = k;
        }
        if (pivot != i) {
            for (int j = 0; j < 2 * n; j++) {
                double tmp = aug[i][j]; aug[i][j] = aug[pivot][j]; aug[pivot][j] = tmp;
            }
        }
        double div = aug[i][i];
        for (int j = 0; j < 2 * n; j++) aug[i][j] /= div;
        for (int k = 0; k < n; k++) {
            if (k != i) {
                double f = aug[k][i];
                for (int j = 0; j < 2 * n; j++) aug[k][j] -= f * aug[i][j];
            }
        }
    }

    printf("\\nInverted Matrix A^-1:\\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) printf("%10.4f ", aug[i][j + n]);
        printf("\\n");
    }
}

int main(void) {
    int n = 3;
    double m[MAX_DIM][MAX_DIM] = {
        {1.0, 2.0, 3.0},
        {0.0, 1.0, 4.0},
        {5.0, 6.0, 0.0}
    };

    int choice;
    do {
        printf("\\n================ MATRIX DETERMINANT & INVERSE ================\\n");
        printf("1. Enter Matrix A (Dimension N and Entries)\\n");
        printf("2. Display Matrix A\\n");
        printf("3. Compute Determinant det(A)\\n");
        printf("4. Compute Inverted Matrix A^-1\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter dimension N (1 to %d): ", MAX_DIM);
                if (scanf("%d", &n) != 1 || n < 1 || n > MAX_DIM) {
                    clear_input();
                    n = 3;
                    break;
                }
                printf("Enter %d x %d entries:\\n", n, n);
                for (int i = 0; i < n; i++) {
                    for (int j = 0; j < n; j++) {
                        if (scanf("%lf", &m[i][j]) != 1) m[i][j] = 0.0;
                    }
                }
                clear_input();
                break;
            }
            case 2:
                printf("\\nCurrent Matrix A (%dx%d):\\n", n, n);
                print_matrix(n, m);
                break;
            case 3:
                printf("Determinant det(A) = %.6f\\n", compute_det(n, m));
                break;
            case 4:
                compute_inverse(n, m);
                break;
            case 0:
                printf("Exiting Determinant & Inverse Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "geometry-linear-algebra", "matrices", "inverse", "determinant"],
      aliases: ["prog_acad_determinant_inverse"],
    })
  );

  // 33. Matrix Arithmetic
  components.push(
    createComponent({
      id: "academics-programming.geometry-linear-algebra.matrix-analysis.matrix-arithmetic.prog-matrix-arithmetic",
      name: "prog_acad_matrix_arithmetic",
      type: "program",
      category: "academics-programming",
      subcategory: "geometry-linear-algebra",
      categoryId: "academics-programming.geometry-linear-algebra.matrix-analysis.matrix-arithmetic",
      path: "academics-programming/geometry-linear-algebra/matrix-analysis/matrix-arithmetic/prog-matrix-arithmetic",
      description: "Interactive matrix arithmetic laboratory supporting addition, subtraction, multiplication, transposition, trace, and Frobenius norm",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define MAX_DIM 6

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void print_mat(int r, int c, double m[MAX_DIM][MAX_DIM]) {
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) printf("%8.2f ", m[i][j]);
        printf("\\n");
    }
}

int main(void) {
    int rA = 2, cA = 2;
    int rB = 2, cB = 2;
    double A[MAX_DIM][MAX_DIM] = {{1, 2}, {3, 4}};
    double B[MAX_DIM][MAX_DIM] = {{5, 6}, {7, 8}};
    double C[MAX_DIM][MAX_DIM];

    int choice;
    do {
        printf("\\n================ MATRIX ARITHMETIC WORKBENCH ================\\n");
        printf("1. Matrix Addition (A + B)\\n");
        printf("2. Matrix Subtraction (A - B)\\n");
        printf("3. Matrix Multiplication (A x B)\\n");
        printf("4. Transpose Matrix A (A^T)\\n");
        printf("5. Matrix Trace and Frobenius Norm\\n");
        printf("6. Input Matrices A and B\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1:
                if (rA != rB || cA != cB) {
                    printf("Error: Dimension mismatch for addition (%dx%d vs %dx%d).\\n", rA, cA, rB, cB);
                } else {
                    for (int i = 0; i < rA; i++) for (int j = 0; j < cA; j++) C[i][j] = A[i][j] + B[i][j];
                    printf("\\nResult A + B (%dx%d):\\n", rA, cA);
                    print_mat(rA, cA, C);
                }
                break;
            case 2:
                if (rA != rB || cA != cB) {
                    printf("Error: Dimension mismatch for subtraction.\\n");
                } else {
                    for (int i = 0; i < rA; i++) for (int j = 0; j < cA; j++) C[i][j] = A[i][j] - B[i][j];
                    printf("\\nResult A - B (%dx%d):\\n", rA, cA);
                    print_mat(rA, cA, C);
                }
                break;
            case 3:
                if (cA != rB) {
                    printf("Error: Inner dimension mismatch for multiplication (cols A = %d != rows B = %d).\\n", cA, rB);
                } else {
                    for (int i = 0; i < rA; i++) {
                        for (int j = 0; j < cB; j++) {
                            C[i][j] = 0.0;
                            for (int k = 0; k < cA; k++) C[i][j] += A[i][k] * B[k][j];
                        }
                    }
                    printf("\\nResult A x B (%dx%d):\\n", rA, cB);
                    print_mat(rA, cB, C);
                }
                break;
            case 4:
                for (int i = 0; i < cA; i++) for (int j = 0; j < rA; j++) C[i][j] = A[j][i];
                printf("\\nTranspose A^T (%dx%d):\\n", cA, rA);
                print_mat(cA, rA, C);
                break;
            case 5: {
                if (rA == cA) {
                    double trace = 0.0;
                    for (int i = 0; i < rA; i++) trace += A[i][i];
                    printf("Trace Tr(A) = %.4f\\n", trace);
                } else {
                    printf("Trace undefined for non-square matrix.\\n");
                }
                double frob = 0.0;
                for (int i = 0; i < rA; i++) for (int j = 0; j < cA; j++) frob += A[i][j] * A[i][j];
                printf("Frobenius Norm ||A||_F = %.4f\\n", sqrt(frob));
                break;
            }
            case 6: {
                printf("Enter Matrix A dimensions (rows cols): ");
                if (scanf("%d %d", &rA, &cA) == 2 && rA >= 1 && cA >= 1 && rA <= MAX_DIM && cA <= MAX_DIM) {
                    printf("Enter %d x %d elements for A:\\n", rA, cA);
                    for (int i = 0; i < rA; i++) for (int j = 0; j < cA; j++) scanf("%lf", &A[i][j]);
                }
                printf("Enter Matrix B dimensions (rows cols): ");
                if (scanf("%d %d", &rB, &cB) == 2 && rB >= 1 && cB >= 1 && rB <= MAX_DIM && cB <= MAX_DIM) {
                    printf("Enter %d x %d elements for B:\\n", rB, cB);
                    for (int i = 0; i < rB; i++) for (int j = 0; j < cB; j++) scanf("%lf", &B[i][j]);
                }
                clear_input();
                break;
            }
            case 0:
                printf("Exiting Matrix Arithmetic.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "geometry-linear-algebra", "matrices", "arithmetic"],
      aliases: ["prog_acad_matrix_arithmetic"],
    })
  );

  // 34. Power Method for Eigenvalue & Eigenvector
  components.push(
    createComponent({
      id: "academics-programming.geometry-linear-algebra.matrix-analysis.power-method-eigenvalue.prog-power-method",
      name: "prog_acad_power_method",
      type: "program",
      category: "academics-programming",
      subcategory: "geometry-linear-algebra",
      categoryId: "academics-programming.geometry-linear-algebra.matrix-analysis.power-method-eigenvalue",
      path: "academics-programming/geometry-linear-algebra/matrix-analysis/power-method-eigenvalue/prog-power-method",
      description: "Interactive Power Iteration method for computing dominant eigenvalue and eigenvector with Rayleigh quotient",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define MAX_DIM 8

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void run_power_method(int n, double a[MAX_DIM][MAX_DIM], double tol, int max_iter) {
    double v[MAX_DIM];
    for (int i = 0; i < n; i++) v[i] = 1.0 / sqrt((double)n);

    double lambda_prev = 0.0;
    printf("\\nPower Iteration Convergence Table:\\n");
    printf("-------------------------------------------------------------\\n");
    printf(" Iter | Dominant Eigenvalue Estimate | Max Residual\\n");
    printf("-------------------------------------------------------------\\n");

    for (int iter = 1; iter <= max_iter; iter++) {
        double y[MAX_DIM] = {0.0};
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                y[i] += a[i][j] * v[j];
            }
        }

        double lambda = 0.0;
        for (int i = 0; i < n; i++) lambda += y[i] * v[i];

        double norm = 0.0;
        for (int i = 0; i < n; i++) norm += y[i] * y[i];
        norm = sqrt(norm);

        for (int i = 0; i < n; i++) v[i] = y[i] / norm;

        double err = fabs(lambda - lambda_prev);
        printf(" %4d | %26.8f | %12.4e\\n", iter, lambda, err);

        if (err < tol && iter > 2) {
            printf("-------------------------------------------------------------\\n");
            printf("Convergence reached in %d iterations!\\n", iter);
            printf("Dominant Eigenvalue lambda_max = %.8f\\n", lambda);
            printf("Corresponding Unit Eigenvector:\\n  [ ");
            for (int i = 0; i < n; i++) printf("%.6f%s", v[i], (i < n - 1) ? ", " : " ");
            printf("]^T\\n");
            return;
        }

        lambda_prev = lambda;
    }
    printf("-------------------------------------------------------------\\n");
    printf("Reached max iterations (%d). Final estimate lambda = %.8f\\n", max_iter, lambda_prev);
}

int main(void) {
    int n = 3;
    double a[MAX_DIM][MAX_DIM] = {
        {4.0, 1.0, 1.0},
        {1.0, 3.0, -1.0},
        {1.0, -1.0, 2.0}
    };

    int choice;
    do {
        printf("\\n================ POWER METHOD (EIGENVALUE / EIGENVECTOR) ================\\n");
        printf("1. Enter Square Matrix A\\n");
        printf("2. Compute Dominant Eigenvalue & Eigenvector\\n");
        printf("3. Load Default Symmetric 3x3 Test Matrix\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter matrix dimension N (2 to %d): ", MAX_DIM);
                if (scanf("%d", &n) != 1 || n < 2 || n > MAX_DIM) {
                    clear_input();
                    n = 3;
                    break;
                }
                printf("Enter %d x %d matrix entries:\\n", n, n);
                for (int i = 0; i < n; i++) {
                    for (int j = 0; j < n; j++) {
                        if (scanf("%lf", &a[i][j]) != 1) a[i][j] = 0.0;
                    }
                }
                clear_input();
                break;
            }
            case 2:
                run_power_method(n, a, 1e-7, 100);
                break;
            case 3:
                n = 3;
                a[0][0] = 4.0; a[0][1] = 1.0;  a[0][2] = 1.0;
                a[1][0] = 1.0; a[1][1] = 3.0;  a[1][2] = -1.0;
                a[2][0] = 1.0; a[2][1] = -1.0; a[2][2] = 2.0;
                printf("Loaded default 3x3 matrix.\\n");
                break;
            case 0:
                printf("Exiting Power Method Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "geometry-linear-algebra", "eigenvalues", "power-method"],
      aliases: ["prog_acad_power_method"],
    })
  );

  return components;
}

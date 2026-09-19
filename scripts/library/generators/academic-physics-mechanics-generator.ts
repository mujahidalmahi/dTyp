import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateAcademicPhysicsMechanicsComponents(): Component[] {
  const components: Component[] = [];

  // 40. Projectile Motion
  components.push(
    createComponent({
      id: "academics-programming.physics.kinematics-gravity.projectile-motion.prog-projectile-motion",
      name: "prog_acad_projectile_motion",
      type: "program",
      category: "academics-programming",
      subcategory: "physics",
      categoryId: "academics-programming.physics.kinematics-gravity.projectile-motion",
      path: "academics-programming/physics/kinematics-gravity/projectile-motion/prog-projectile-motion",
      description: "Interactive 2D projectile trajectory simulator with flight time, maximum height, horizontal range, and trajectory table",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void compute_projectile(double v0, double theta_deg, double y0, double g) {
    double theta_rad = theta_deg * (3.141592653589793 / 180.0);
    double vx = v0 * cos(theta_rad);
    double vy = v0 * sin(theta_rad);

    double t_apex = vy / g;
    double h_max = y0 + (vy * vy) / (2.0 * g);
    double t_flight = (vy + sqrt(vy * vy + 2.0 * g * y0)) / g;
    double range = vx * t_flight;

    double vy_impact = vy - g * t_flight;
    double v_impact = sqrt(vx * vx + vy_impact * vy_impact);
    double theta_impact_deg = atan2(fabs(vy_impact), vx) * (180.0 / 3.141592653589793);

    printf("\\n--- 2D Projectile Kinematics (v0 = %.2f m/s, theta = %.1f deg, y0 = %.2f m) ---\\n",
           v0, theta_deg, y0);
    printf("  Initial Velocity Components:  vx = %8.3f m/s, vy = %8.3f m/s\\n", vx, vy);
    printf("  Time to Apex (Peak Height):   %8.3f s\\n", t_apex);
    printf("  Maximum Height H_max:         %8.3f m\\n", h_max);
    printf("  Total Time of Flight T:       %8.3f s\\n", t_flight);
    printf("  Total Horizontal Range R:     %8.3f m\\n", range);
    printf("  Impact Speed:                 %8.3f m/s at -%.1f deg\\n", v_impact, theta_impact_deg);

    printf("\\nTrajectory Table Sampled at 10 Uniform Intervals:\\n");
    printf("----------------------------------------------------------------\\n");
    printf(" Time t (s) |  Position x (m) |  Position y (m) | Velocity v (m/s)\\n");
    printf("----------------------------------------------------------------\\n");
    for (int i = 0; i <= 10; i++) {
        double t = (t_flight / 10.0) * i;
        double x = vx * t;
        double y = y0 + vy * t - 0.5 * g * t * t;
        if (y < 0.0) y = 0.0;
        double cur_vy = vy - g * t;
        double cur_v = sqrt(vx * vx + cur_vy * cur_vy);
        printf(" %10.3f | %15.3f | %15.3f | %16.3f\\n", t, x, y, cur_v);
    }
    printf("----------------------------------------------------------------\\n");
}

int main(void) {
    int choice;
    do {
        printf("\\n================ 2D PROJECTILE MOTION WORKBENCH ================\\n");
        printf("1. Simulate Projectile Trajectory (v0, angle theta, launch height y0)\\n");
        printf("2. Standard 45-Degree Cannon Launch (v0 = 50 m/s, y0 = 0 m)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double v0, theta, y0;
                printf("Enter launch speed v0 (m/s): ");
                if (scanf("%lf", &v0) != 1 || v0 <= 0.0) { clear_input(); break; }
                printf("Enter launch angle theta (degrees, 0 to 90): ");
                if (scanf("%lf", &theta) != 1 || theta < 0.0 || theta > 90.0) { clear_input(); break; }
                printf("Enter launch height y0 (m): ");
                if (scanf("%lf", &y0) != 1 || y0 < 0.0) { clear_input(); break; }
                compute_projectile(v0, theta, y0, 9.80665);
                break;
            }
            case 2:
                compute_projectile(50.0, 45.0, 0.0, 9.80665);
                break;
            case 0:
                printf("Exiting Projectile Motion.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "physics", "kinematics", "projectile-motion"],
      aliases: ["prog_acad_projectile_motion"],
    })
  );

  // 41. Orbital Mechanics
  components.push(
    createComponent({
      id: "academics-programming.physics.kinematics-gravity.orbital-mechanics.prog-orbital-mechanics",
      name: "prog_acad_orbital_mechanics",
      type: "program",
      category: "academics-programming",
      subcategory: "physics",
      categoryId: "academics-programming.physics.kinematics-gravity.orbital-mechanics",
      path: "academics-programming/physics/kinematics-gravity/orbital-mechanics/prog-orbital-mechanics",
      description: "Interactive orbital mechanics calculator computing circular velocity, orbital period, escape speed, and Hohmann transfer delta-v",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static const double G = 6.67430e-11;

static void analyze_orbit(double M, double R, double h_km) {
    double r = R + h_km * 1000.0;
    double v_circ = sqrt(G * M / r);
    double v_esc = sqrt(2.0 * G * M / r);
    double period_s = 2.0 * 3.141592653589793 * sqrt((r * r * r) / (G * M));
    double period_h = period_s / 3600.0;

    printf("\\n--- Orbit Parameters at Altitude %.1f km ---\\n", h_km);
    printf("  Orbital Radius r:             %14.2e m\\n", r);
    printf("  Circular Orbital Velocity:    %10.2f m/s (%.2f km/s)\\n", v_circ, v_circ / 1000.0);
    printf("  Escape Velocity v_esc:        %10.2f m/s (%.2f km/s)\\n", v_esc, v_esc / 1000.0);
    printf("  Orbital Period T:             %10.2f seconds (%.2f hours)\\n", period_s, period_h);
}

static void hohmann_transfer(double M, double r1_km, double r2_km) {
    double r1 = r1_km * 1000.0;
    double r2 = r2_km * 1000.0;
    double a_trans = 0.5 * (r1 + r2);

    double v1 = sqrt(G * M / r1);
    double v2 = sqrt(G * M / r2);

    double vt1 = sqrt(G * M * (2.0 / r1 - 1.0 / a_trans));
    double vt2 = sqrt(G * M * (2.0 / r2 - 1.0 / a_trans));

    double delta_v1 = fabs(vt1 - v1);
    double delta_v2 = fabs(v2 - vt2);
    double total_dv = delta_v1 + delta_v2;
    double t_transfer_s = 3.141592653589793 * sqrt((a_trans * a_trans * a_trans) / (G * M));

    printf("\\n--- Hohmann Transfer Orbit (r1 = %.0f km -> r2 = %.0f km) ---\\n", r1_km, r2_km);
    printf("  Delta-v 1 (Departure Burn):   %10.2f m/s\\n", delta_v1);
    printf("  Delta-v 2 (Insertion Burn):   %10.2f m/s\\n", delta_v2);
    printf("  Total Transfer Delta-v:       %10.2f m/s (%.3f km/s)\\n", total_dv, total_dv / 1000.0);
    printf("  One-Way Transfer Time:        %10.2f hours (%.2f days)\\n", t_transfer_s / 3600.0, t_transfer_s / 86400.0);
}

int main(void) {
    double M_earth = 5.972e24;
    double R_earth = 6.371e6;

    int choice;
    do {
        printf("\\n================ ORBITAL MECHANICS WORKBENCH ================\\n");
        printf("1. Circular Orbit & Escape Speed Analysis around Earth\\n");
        printf("2. Hohmann Transfer Orbit (LEO to GEO or custom orbits)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double alt;
                printf("Enter orbit altitude above Earth surface in km (e.g. 400 for ISS): ");
                if (scanf("%lf", &alt) == 1 && alt >= 0.0) {
                    analyze_orbit(M_earth, R_earth, alt);
                } else {
                    clear_input();
                }
                break;
            }
            case 2: {
                double r1, r2;
                printf("Enter initial orbit radius from center in km (e.g. 6771 for 400km LEO): ");
                if (scanf("%lf", &r1) != 1) { clear_input(); break; }
                printf("Enter target orbit radius from center in km (e.g. 42164 for GEO): ");
                if (scanf("%lf", &r2) != 1) { clear_input(); break; }
                hohmann_transfer(M_earth, r1, r2);
                break;
            }
            case 0:
                printf("Exiting Orbital Mechanics.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "physics", "gravity", "orbital-mechanics"],
      aliases: ["prog_acad_orbital_mechanics"],
    })
  );

  // 42. Ideal Gas Thermodynamic Work
  components.push(
    createComponent({
      id: "academics-programming.physics.thermodynamics.ideal-gas-work.prog-ideal-gas-work",
      name: "prog_acad_ideal_gas_work",
      type: "program",
      category: "academics-programming",
      subcategory: "physics",
      categoryId: "academics-programming.physics.thermodynamics.ideal-gas-work",
      path: "academics-programming/physics/thermodynamics/ideal-gas-work/prog-ideal-gas-work",
      description: "Interactive thermodynamics calculator evaluating work, heat, and internal energy in Isobaric, Isothermal, Isochoric, and Adiabatic processes",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static const double R_GAS = 8.314462;

int main(void) {
    int choice;
    do {
        printf("\\n================ IDEAL GAS THERMODYNAMICS WORKBENCH ================\\n");
        printf("1. Isobaric Process (Constant Pressure)\\n");
        printf("2. Isothermal Process (Constant Temperature)\\n");
        printf("3. Isochoric Process (Constant Volume)\\n");
        printf("4. Adiabatic Process (Zero Heat Exchange, PV^gamma = const)\\n");
        printf("5. Carnot Heat Engine Efficiency (eta = 1 - Tc / Th)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double P, V1, V2;
                printf("Enter pressure P (Pa) and initial/final volumes V1, V2 (m^3): ");
                if (scanf("%lf %lf %lf", &P, &V1, &V2) == 3) {
                    double W = P * (V2 - V1);
                    printf("Isobaric Work W = P * Delta(V) = %.2f Joules\\n", W);
                } else { clear_input(); }
                break;
            }
            case 2: {
                double n, T, V1, V2;
                printf("Enter moles n, temperature T (K), and volumes V1, V2 (m^3): ");
                if (scanf("%lf %lf %lf %lf", &n, &T, &V1, &V2) == 4 && V1 > 0 && V2 > 0) {
                    double W = n * R_GAS * T * log(V2 / V1);
                    printf("Isothermal Work W = n*R*T*ln(V2/V1) = %.2f Joules (Q = W, Delta(U) = 0)\\n", W);
                } else { clear_input(); }
                break;
            }
            case 3: {
                double n, Cv, T1, T2;
                printf("Enter moles n, molar heat capacity Cv (J/mol*K), and T1, T2 (K): ");
                if (scanf("%lf %lf %lf %lf", &n, &Cv, &T1, &T2) == 4) {
                    double Q = n * Cv * (T2 - T1);
                    printf("Isochoric Work W = 0 Joules\\n");
                    printf("Heat Transferred Q = Delta(U) = %.2f Joules\\n", Q);
                } else { clear_input(); }
                break;
            }
            case 4: {
                double P1, V1, P2, V2, gamma;
                printf("Enter P1 (Pa), V1 (m^3), P2 (Pa), V2 (m^3), and heat capacity ratio gamma (e.g. 1.4): ");
                if (scanf("%lf %lf %lf %lf %lf", &P1, &V1, &P2, &V2, &gamma) == 5 && gamma != 1.0) {
                    double W = (P1 * V1 - P2 * V2) / (gamma - 1.0);
                    printf("Adiabatic Work W = (P1*V1 - P2*V2)/(gamma - 1) = %.2f Joules\\n", W);
                    printf("Internal Energy Delta(U) = -W = %.2f Joules\\n", -W);
                } else { clear_input(); }
                break;
            }
            case 5: {
                double Th, Tc;
                printf("Enter hot reservoir Th (K) and cold reservoir Tc (K): ");
                if (scanf("%lf %lf", &Th, &Tc) == 2 && Th > Tc && Tc > 0) {
                    double eta = 1.0 - (Tc / Th);
                    printf("Carnot Efficiency eta = 1 - Tc/Th = %.4f (%.2f%%)\\n", eta, eta * 100.0);
                } else { clear_input(); }
                break;
            }
            case 0:
                printf("Exiting Thermodynamics Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "physics", "thermodynamics", "gas-laws"],
      aliases: ["prog_acad_ideal_gas_work"],
    })
  );

  // 43. 1D Heat Conduction
  components.push(
    createComponent({
      id: "academics-programming.physics.thermodynamics.heat-conduction.prog-heat-conduction",
      name: "prog_acad_heat_conduction",
      type: "program",
      category: "academics-programming",
      subcategory: "physics",
      categoryId: "academics-programming.physics.thermodynamics.heat-conduction",
      path: "academics-programming/physics/thermodynamics/heat-conduction/prog-heat-conduction",
      description: "Interactive 1D steady-state and multi-layer composite heat conduction analyzer based on Fourier's Law",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void steady_state_conduction(double k, double A, double L, double T1, double T2) {
    double delta_T = T1 - T2;
    double q_flux = (k * delta_T) / L;
    double Q_rate = q_flux * A;
    double R_th = L / (k * A);

    printf("\\n--- 1D Steady-State Heat Conduction ---\\n");
    printf("  Thermal Resistance R_th: %12.6f K/W\\n", R_th);
    printf("  Heat Flux q'':           %12.2f W/m^2\\n", q_flux);
    printf("  Total Heat Rate Q:       %12.2f Watts\\n", Q_rate);

    printf("\\nLinear Temperature Profile through Wall (L = %.3f m):\\n", L);
    printf("  Distance x (m) | Temperature T (K)\\n");
    printf("  ---------------+------------------\\n");
    for (int i = 0; i <= 5; i++) {
        double x = (L / 5.0) * i;
        double T = T1 - (delta_T / L) * x;
        printf("    %10.4f   |     %10.2f\\n", x, T);
    }
}

int main(void) {
    int choice;
    do {
        printf("\\n================ 1D HEAT CONDUCTION WORKBENCH ================\\n");
        printf("1. Single-Layer Wall Conduction (Fourier's Law)\\n");
        printf("2. Composite Multi-Layer Series Wall\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double k, A, L, T1, T2;
                printf("Enter thermal conductivity k (W/m*K), Area A (m^2), Thickness L (m): ");
                if (scanf("%lf %lf %lf", &k, &A, &L) != 3 || L <= 0.0) { clear_input(); break; }
                printf("Enter boundary temperatures T1 and T2 (K): ");
                if (scanf("%lf %lf", &T1, &T2) != 2) { clear_input(); break; }
                steady_state_conduction(k, A, L, T1, T2);
                break;
            }
            case 2: {
                int layers;
                printf("Enter number of layers in series (2 to 4): ");
                if (scanf("%d", &layers) != 1 || layers < 2 || layers > 4) { clear_input(); break; }
                double A = 1.0, R_total = 0.0;
                printf("Enter wall area A (m^2): ");
                if (scanf("%lf", &A) != 1) A = 1.0;
                for (int i = 0; i < layers; i++) {
                    double ki, Li;
                    printf("Layer %d - conductivity k (W/m*K) and thickness L (m): ", i + 1);
                    if (scanf("%lf %lf", &ki, &Li) == 2 && ki > 0 && Li > 0) {
                        R_total += Li / (ki * A);
                    }
                }
                double T_in, T_out;
                printf("Enter inside and outside temperatures T_in, T_out (K): ");
                if (scanf("%lf %lf", &T_in, &T_out) == 2) {
                    double Q = (T_in - T_out) / R_total;
                    printf("Total Thermal Resistance R_total: %.6f K/W\\n", R_total);
                    printf("Steady Heat Flow Q:               %.2f Watts\\n", Q);
                }
                clear_input();
                break;
            }
            case 0:
                printf("Exiting Heat Conduction Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "physics", "thermodynamics", "heat-conduction"],
      aliases: ["prog_acad_heat_conduction"],
    })
  );

  // 44. Coulomb Field
  components.push(
    createComponent({
      id: "academics-programming.physics.electromagnetism-optics.coulomb-field.prog-coulomb-field",
      name: "prog_acad_coulomb_field",
      type: "program",
      category: "academics-programming",
      subcategory: "physics",
      categoryId: "academics-programming.physics.electromagnetism-optics.coulomb-field",
      path: "academics-programming/physics/electromagnetism-optics/coulomb-field/prog-coulomb-field",
      description: "Interactive multi-charge electrostatic field and potential calculator with Coulomb force vectors",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define MAX_CHARGES 20

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static const double K_COULOMB = 8.98755e9;

static void evaluate_field(int n, const double q[], const double x[], const double y[], double qx, double qy) {
    double Ex = 0.0, Ey = 0.0;
    double V = 0.0;

    for (int i = 0; i < n; i++) {
        double dx = qx - x[i];
        double dy = qy - y[i];
        double r = sqrt(dx * dx + dy * dy);
        if (r < 1e-9) {
            printf("Warning: Query point coincides with Charge %d (r = 0, singularity).\\n", i + 1);
            continue;
        }
        double r3 = r * r * r;
        Ex += (K_COULOMB * q[i] * dx) / r3;
        Ey += (K_COULOMB * q[i] * dy) / r3;
        V += (K_COULOMB * q[i]) / r;
    }

    double E_mag = sqrt(Ex * Ex + Ey * Ey);
    double E_angle = atan2(Ey, Ex) * (180.0 / 3.141592653589793);

    printf("\\nElectrostatic Field at (%.4f, %.4f):\\n", qx, qy);
    printf("  Electric Field Vector E:       (%12.4e, %12.4e) N/C\\n", Ex, Ey);
    printf("  Field Magnitude ||E||:         %12.4e N/C\\n", E_mag);
    printf("  Direction Angle:               %12.2f degrees\\n", E_angle);
    printf("  Electric Potential V:          %12.4e Volts (J/C)\\n", V);
}

int main(void) {
    int n = 2;
    double q[MAX_CHARGES] = {1e-6, -1e-6};
    double x[MAX_CHARGES] = {-0.05, 0.05};
    double y[MAX_CHARGES] = {0.0, 0.0};

    int choice;
    do {
        printf("\\n================ COULOMB ELECTRIC FIELD & POTENTIAL ================\\n");
        printf("1. Enter System of Point Charges\\n");
        printf("2. Evaluate Electric Field and Potential at Query Point (x, y)\\n");
        printf("3. Load Standard Electric Dipole (+1 uC at -5cm, -1 uC at +5cm)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter number of point charges N (1 to %d): ", MAX_CHARGES);
                if (scanf("%d", &n) != 1 || n < 1 || n > MAX_CHARGES) {
                    clear_input();
                    n = 2;
                    break;
                }
                for (int i = 0; i < n; i++) {
                    printf("Charge %d - value q (Coulombs) and coordinates (x y in meters): ", i + 1);
                    if (scanf("%lf %lf %lf", &q[i], &x[i], &y[i]) != 3) {
                        q[i] = 1e-6; x[i] = 0; y[i] = 0;
                    }
                }
                clear_input();
                break;
            }
            case 2: {
                double qx, qy;
                printf("Enter query point (x y in meters): ");
                if (scanf("%lf %lf", &qx, &qy) == 2) {
                    evaluate_field(n, q, x, y, qx, qy);
                } else {
                    clear_input();
                }
                break;
            }
            case 3:
                n = 2;
                q[0] = 1e-6;  x[0] = -0.05; y[0] = 0.0;
                q[1] = -1e-6; x[1] = 0.05;  y[1] = 0.0;
                printf("Loaded electric dipole configuration.\\n");
                break;
            case 0:
                printf("Exiting Coulomb Workbench.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "physics", "electromagnetism", "coulomb-field"],
      aliases: ["prog_acad_coulomb_field"],
    })
  );

  // 45. Optics Refraction & Lenses
  components.push(
    createComponent({
      id: "academics-programming.physics.electromagnetism-optics.optics-refraction.prog-optics-refraction",
      name: "prog_acad_optics_refraction",
      type: "program",
      category: "academics-programming",
      subcategory: "physics",
      categoryId: "academics-programming.physics.electromagnetism-optics.optics-refraction",
      path: "academics-programming/physics/electromagnetism-optics/optics-refraction/prog-optics-refraction",
      description: "Interactive geometric optics workbench solving Snell's law, critical angles for TIR, thin lens equations, and image classification",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void snell_refraction(double n1, double n2, double theta1_deg) {
    double theta1_rad = theta1_deg * (3.141592653589793 / 180.0);
    double sin_theta2 = (n1 / n2) * sin(theta1_rad);

    printf("\\n--- Snell's Law Refraction (n1 = %.3f, n2 = %.3f, theta1 = %.2f deg) ---\\n",
           n1, n2, theta1_deg);

    if (n1 > n2) {
        double theta_c_deg = asin(n2 / n1) * (180.0 / 3.141592653589793);
        printf("  Critical Angle for Total Internal Reflection (TIR): %.2f degrees\\n", theta_c_deg);
    }

    if (sin_theta2 > 1.0) {
        printf("  Result: TOTAL INTERNAL REFLECTION (TIR) occurs! No refracted ray in medium 2.\\n");
    } else {
        double theta2_deg = asin(sin_theta2) * (180.0 / 3.141592653589793);
        printf("  Angle of Refraction theta2: %.2f degrees\\n", theta2_deg);
    }
}

static void thin_lens(double f, double d_o) {
    printf("\\n--- Thin Lens Analysis (f = %.2f cm, object distance do = %.2f cm) ---\\n", f, d_o);
    if (fabs(d_o - f) < 1e-9) {
        printf("  Object is at the focal point (do = f). Refracted rays are parallel (image at infinity).\\n");
        return;
    }

    double d_i = (f * d_o) / (d_o - f);
    double m = -d_i / d_o;

    printf("  Image Distance di:   %10.2f cm -> %s\\n", d_i, (d_i > 0) ? "REAL image" : "VIRTUAL image");
    printf("  Magnification m:     %10.4f -> %s, %s\\n",
           m,
           (m < 0) ? "INVERTED" : "UPRIGHT",
           (fabs(m) > 1.0) ? "MAGNIFIED" : (fabs(m) < 1.0 ? "DIMINISHED" : "SAME SIZE"));
}

int main(void) {
    int choice;
    do {
        printf("\\n================ GEOMETRIC OPTICS WORKBENCH ================\\n");
        printf("1. Snell's Law of Refraction & Critical Angle\\n");
        printf("2. Thin Lens Equation & Image Classification\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double n1, n2, theta1;
                printf("Enter refractive index n1, n2 and angle of incidence theta1 (deg): ");
                if (scanf("%lf %lf %lf", &n1, &n2, &theta1) == 3 && n1 > 0 && n2 > 0) {
                    snell_refraction(n1, n2, theta1);
                } else { clear_input(); }
                break;
            }
            case 2: {
                double f, do_dist;
                printf("Enter focal length f in cm (+ for convex, - for concave) and object distance do: ");
                if (scanf("%lf %lf", &f, &do_dist) == 2 && do_dist > 0) {
                    thin_lens(f, do_dist);
                } else { clear_input(); }
                break;
            }
            case 0:
                printf("Exiting Optics Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "physics", "optics", "snells-law"],
      aliases: ["prog_acad_optics_refraction"],
    })
  );

  // 46. Force Equilibrium
  components.push(
    createComponent({
      id: "academics-programming.mechanics.statics-beams.force-equilibrium.prog-force-equilibrium",
      name: "prog_acad_force_equilibrium",
      type: "program",
      category: "academics-programming",
      subcategory: "mechanics",
      categoryId: "academics-programming.mechanics.statics-beams.force-equilibrium",
      path: "academics-programming/mechanics/statics-beams/force-equilibrium/prog-force-equilibrium",
      description: "Interactive coplanar force equilibrium analyzer computing resultant vector, equilibrant force, and net moments",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define MAX_FORCES 20

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    int n = 3;
    double mag[MAX_FORCES] = {100.0, 150.0, 200.0};
    double angle[MAX_FORCES] = {0.0, 45.0, 120.0};

    int choice;
    do {
        printf("\\n================ COPLANAR FORCE EQUILIBRIUM WORKBENCH ================\\n");
        printf("1. Enter System of 2D Force Vectors\\n");
        printf("2. Compute Resultant Force and Equilibrant\\n");
        printf("3. Equilibrium Verification (Sum Fx = 0, Sum Fy = 0)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter number of concurrent forces (1 to %d): ", MAX_FORCES);
                if (scanf("%d", &n) != 1 || n < 1 || n > MAX_FORCES) {
                    clear_input();
                    n = 3;
                    break;
                }
                for (int i = 0; i < n; i++) {
                    printf("Force %d - Magnitude (N) and Angle theta (degrees): ", i + 1);
                    if (scanf("%lf %lf", &mag[i], &angle[i]) != 2) {
                        mag[i] = 100.0; angle[i] = 0.0;
                    }
                }
                clear_input();
                break;
            }
            case 2:
            case 3: {
                double sum_fx = 0.0;
                double sum_fy = 0.0;
                printf("\\nForce Vector Components Breakdown:\\n");
                printf(" Force | Magnitude (N) | Angle (deg) |     Fx (N)    |     Fy (N)\\n");
                printf("-------+---------------+-------------+---------------+--------------\\n");
                for (int i = 0; i < n; i++) {
                    double rad = angle[i] * (3.141592653589793 / 180.0);
                    double fx = mag[i] * cos(rad);
                    double fy = mag[i] * sin(rad);
                    sum_fx += fx;
                    sum_fy += fy;
                    printf("  %3d  | %13.2f | %11.2f | %13.4f | %13.4f\\n",
                           i + 1, mag[i], angle[i], fx, fy);
                }
                printf("-------+---------------+-------------+---------------+--------------\\n");
                printf(" TOTAL |               |             | %13.4f | %13.4f\\n", sum_fx, sum_fy);

                double R = sqrt(sum_fx * sum_fx + sum_fy * sum_fy);
                double theta_R = atan2(sum_fy, sum_fx) * (180.0 / 3.141592653589793);
                double theta_E = theta_R + 180.0;
                if (theta_E >= 360.0) theta_E -= 360.0;

                printf("\\nResultant Force R:         %.4f N at %.2f degrees\\n", R, theta_R);
                printf("Equilibrant Force E (-R):   %.4f N at %.2f degrees\\n", R, theta_E);

                if (R < 1e-4) {
                    printf("Equilibrium Status: SYSTEM IS IN STATIC EQUILIBRIUM (R = 0).\\n");
                } else {
                    printf("Equilibrium Status: SYSTEM IS NOT IN EQUILIBRIUM (Net force exists).\\n");
                }
                break;
            }
            case 0:
                printf("Exiting Force Equilibrium.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "mechanics", "statics", "equilibrium"],
      aliases: ["prog_acad_force_equilibrium"],
    })
  );

  // 47. Beam Analysis
  components.push(
    createComponent({
      id: "academics-programming.mechanics.statics-beams.beam-analysis.prog-beam-analysis",
      name: "prog_acad_beam_analysis",
      type: "program",
      category: "academics-programming",
      subcategory: "mechanics",
      categoryId: "academics-programming.mechanics.statics-beams.beam-analysis",
      path: "academics-programming/mechanics/statics-beams/beam-analysis/prog-beam-analysis",
      description: "Interactive simply supported beam analyzer computing support reactions, shear force V(x), bending moment M(x), and maximum moment",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define MAX_LOADS 10

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

int main(void) {
    double L = 10.0;
    int num_loads = 1;
    double P[MAX_LOADS] = {50.0};
    double a[MAX_LOADS] = {5.0};
    double udl_w = 10.0;

    int choice;
    do {
        printf("\\n================ BEAM ANALYSIS (SIMPLY SUPPORTED) ================\\n");
        printf("1. Enter Beam Span and Loads\\n");
        printf("2. Compute Support Reactions (RA and RB)\\n");
        printf("3. Print Shear Force V(x) & Bending Moment M(x) Table\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter beam length L in meters: ");
                if (scanf("%lf", &L) != 1 || L <= 0.0) { clear_input(); L = 10.0; break; }
                printf("Enter uniformly distributed load w (kN/m across entire span): ");
                if (scanf("%lf", &udl_w) != 1) udl_w = 0.0;
                printf("Enter number of point loads (0 to %d): ", MAX_LOADS);
                if (scanf("%d", &num_loads) != 1 || num_loads < 0) num_loads = 0;
                for (int i = 0; i < num_loads; i++) {
                    printf("Load %d - Force P (kN) and position x from left support (m): ", i + 1);
                    scanf("%lf %lf", &P[i], &a[i]);
                }
                clear_input();
                break;
            }
            case 2:
            case 3: {
                double sum_moments_A = udl_w * L * (L / 2.0);
                double total_down_force = udl_w * L;
                for (int i = 0; i < num_loads; i++) {
                    sum_moments_A += P[i] * a[i];
                    total_down_force += P[i];
                }
                double RB = sum_moments_A / L;
                double RA = total_down_force - RB;

                printf("\\n--- Support Reactions ---\\n");
                printf("  Left Reaction RA:  %10.3f kN\\n", RA);
                printf("  Right Reaction RB: %10.3f kN\\n", RB);

                printf("\\nShear Force and Bending Moment Profile (10 segments):\\n");
                printf("--------------------------------------------------\\n");
                printf("  x (m)  | Shear Force V(x) (kN) | Bending Moment M(x) (kN*m)\\n");
                printf("--------------------------------------------------\\n");
                double max_M = 0.0, max_x = 0.0;
                for (int i = 0; i <= 10; i++) {
                    double x = (L / 10.0) * i;
                    double V = RA - udl_w * x;
                    double M = RA * x - 0.5 * udl_w * x * x;
                    for (int j = 0; j < num_loads; j++) {
                        if (x >= a[j]) {
                            V -= P[j];
                            M -= P[j] * (x - a[j]);
                        }
                    }
                    if (fabs(M) > fabs(max_M)) { max_M = M; max_x = x; }
                    printf(" %6.2f  |       %12.3f    |       %14.3f\\n", x, V, M);
                }
                printf("--------------------------------------------------\\n");
                printf("Maximum Bending Moment: %.3f kN*m at x = %.2f m\\n", max_M, max_x);
                break;
            }
            case 0:
                printf("Exiting Beam Analysis.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "mechanics", "statics", "beams"],
      aliases: ["prog_acad_beam_analysis"],
    })
  );

  // 48. Momentum & Collisions
  components.push(
    createComponent({
      id: "academics-programming.mechanics.dynamics-collisions.momentum-collision.prog-momentum-collision",
      name: "prog_acad_momentum_collision",
      type: "program",
      category: "academics-programming",
      subcategory: "mechanics",
      categoryId: "academics-programming.mechanics.dynamics-collisions.momentum-collision",
      path: "academics-programming/mechanics/dynamics-collisions/momentum-collision/prog-momentum-collision",
      description: "Interactive 1D collision simulator with restitution coefficients, momentum conservation check, and kinetic energy loss",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void simulate_collision(double m1, double u1, double m2, double u2, double e) {
    double v1 = (m1 * u1 + m2 * u2 - m2 * e * (u1 - u2)) / (m1 + m2);
    double v2 = (m1 * u1 + m2 * u2 + m1 * e * (u1 - u2)) / (m1 + m2);

    double p_initial = m1 * u1 + m2 * u2;
    double p_final = m1 * v1 + m2 * v2;

    double ke_initial = 0.5 * m1 * u1 * u1 + 0.5 * m2 * u2 * u2;
    double ke_final = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
    double ke_loss = ke_initial - ke_final;

    printf("\\n--- 1D Collision Analysis (Restitution e = %.2f) ---\\n", e);
    printf("  Initial Velocities:      u1 = %8.3f m/s, u2 = %8.3f m/s\\n", u1, u2);
    printf("  Post-Collision Velocity: v1 = %8.3f m/s, v2 = %8.3f m/s\\n", v1, v2);
    printf("  Initial Total Momentum:  %12.4f kg*m/s\\n", p_initial);
    printf("  Final Total Momentum:    %12.4f kg*m/s (Conserved!)\\n", p_final);
    printf("  Initial Kinetic Energy:  %12.4f Joules\\n", ke_initial);
    printf("  Final Kinetic Energy:    %12.4f Joules\\n", ke_final);
    printf("  Kinetic Energy Lost:     %12.4f Joules (%.2f%%)\\n",
           ke_loss, (ke_initial > 1e-9 ? (ke_loss / ke_initial) * 100.0 : 0.0));
}

int main(void) {
    int choice;
    do {
        printf("\\n================ 1D MOMENTUM & COLLISIONS WORKBENCH ================\\n");
        printf("1. Perfectly Elastic Collision (e = 1.0)\\n");
        printf("2. Inelastic Collision (0 < e < 1.0)\\n");
        printf("3. Perfectly Plastic / Sticking Collision (e = 0.0)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        if (choice >= 1 && choice <= 3) {
            double m1, u1, m2, u2, e = 1.0;
            printf("Enter Body 1 - mass m1 (kg) and velocity u1 (m/s): ");
            if (scanf("%lf %lf", &m1, &u1) != 2 || m1 <= 0) { clear_input(); continue; }
            printf("Enter Body 2 - mass m2 (kg) and velocity u2 (m/s): ");
            if (scanf("%lf %lf", &m2, &u2) != 2 || m2 <= 0) { clear_input(); continue; }

            if (choice == 1) e = 1.0;
            else if (choice == 3) e = 0.0;
            else {
                printf("Enter restitution coefficient e (0.0 to 1.0): ");
                if (scanf("%lf", &e) != 1 || e < 0.0 || e > 1.0) e = 0.5;
            }

            simulate_collision(m1, u1, m2, u2, e);
        } else if (choice == 0) {
            printf("Exiting Collisions Workbench.\\n");
        } else {
            printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "mechanics", "dynamics", "collisions"],
      aliases: ["prog_acad_momentum_collision"],
    })
  );

  // 49. Inclined Plane with Friction
  components.push(
    createComponent({
      id: "academics-programming.mechanics.dynamics-collisions.inclined-plane-friction.prog-inclined-plane-friction",
      name: "prog_acad_inclined_plane_friction",
      type: "program",
      category: "academics-programming",
      subcategory: "mechanics",
      categoryId: "academics-programming.mechanics.dynamics-collisions.inclined-plane-friction",
      path: "academics-programming/mechanics/dynamics-collisions/inclined-plane-friction/prog-inclined-plane-friction",
      description: "Interactive inclined plane simulator evaluating normal force, static friction, angle of repose, and acceleration",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static const double G = 9.80665;

int main(void) {
    int choice;
    do {
        printf("\\n================ INCLINED PLANE FRICTION WORKBENCH ================\\n");
        printf("1. Analyze Motion on Incline (Mass m, angle theta, mu_s, mu_k)\\n");
        printf("2. Compute Angle of Repose\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double m, theta_deg, mu_s, mu_k;
                printf("Enter mass m (kg), incline angle theta (deg), static mu_s, kinetic mu_k: ");
                if (scanf("%lf %lf %lf %lf", &m, &theta_deg, &mu_s, &mu_k) != 4 || m <= 0) {
                    clear_input();
                    break;
                }
                double rad = theta_deg * (3.141592653589793 / 180.0);
                double N = m * G * cos(rad);
                double W_parallel = m * G * sin(rad);
                double fs_max = mu_s * N;

                printf("\\n--- Incline Analysis ---\\n");
                printf("  Normal Force N:               %10.3f N\\n", N);
                printf("  Parallel Downslope Force W||: %10.3f N\\n", W_parallel);
                printf("  Max Static Friction fs_max:   %10.3f N\\n", fs_max);

                if (W_parallel <= fs_max) {
                    printf("  Motion State: AT REST (Static friction holds the block).\\n");
                    printf("  Friction force in action:     %10.3f N\\n", W_parallel);
                } else {
                    double fk = mu_k * N;
                    double F_net = W_parallel - fk;
                    double a = F_net / m;
                    printf("  Motion State: SLIDING DOWNHILL\\n");
                    printf("  Kinetic Friction fk:          %10.3f N\\n", fk);
                    printf("  Net Downhill Force:           %10.3f N\\n", F_net);
                    printf("  Downhill Acceleration:        %10.3f m/s^2\\n", a);
                }
                break;
            }
            case 2: {
                double mu_s;
                printf("Enter static coefficient of friction mu_s: ");
                if (scanf("%lf", &mu_s) == 1 && mu_s > 0) {
                    double theta_c_rad = atan(mu_s);
                    double theta_c_deg = theta_c_rad * (180.0 / 3.141592653589793);
                    printf("Angle of Repose theta_c = arctan(mu_s) = %.2f degrees (%.4f rad)\\n",
                           theta_c_deg, theta_c_rad);
                } else { clear_input(); }
                break;
            }
            case 0:
                printf("Exiting Incline Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "mechanics", "friction", "inclined-plane"],
      aliases: ["prog_acad_inclined_plane_friction"],
    })
  );

  // 50. Damped Free Vibrations
  components.push(
    createComponent({
      id: "academics-programming.mechanics.vibrations.damped-vibrations.prog-damped-vibrations",
      name: "prog_acad_damped_vibrations",
      type: "program",
      category: "academics-programming",
      subcategory: "mechanics",
      categoryId: "academics-programming.mechanics.vibrations.damped-vibrations",
      path: "academics-programming/mechanics/vibrations/damped-vibrations/prog-damped-vibrations",
      description: "Interactive single degree-of-freedom damped vibrations analyzer with natural frequency, damping ratio, regime, and logarithmic decrement",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void analyze_vibration(double m, double c, double k) {
    double omega_n = sqrt(k / m);
    double c_crit = 2.0 * sqrt(k * m);
    double zeta = c / c_crit;

    printf("\\n--- Damped Free Vibration Characteristics ---\\n");
    printf("  Mass m:                      %10.3f kg\\n", m);
    printf("  Damping Coefficient c:       %10.3f N*s/m\\n", c);
    printf("  Stiffness k:                 %10.3f N/m\\n", k);
    printf("  Natural Frequency omega_n:   %10.3f rad/s (%.3f Hz)\\n", omega_n, omega_n / (2.0 * 3.141592653589793));
    printf("  Critical Damping c_c:        %10.3f N*s/m\\n", c_crit);
    printf("  Damping Ratio zeta:          %10.4f\\n", zeta);

    if (fabs(zeta - 1.0) < 1e-4) {
        printf("  Vibration Regime: CRITICALLY DAMPED (Fastest non-oscillatory return to rest)\\n");
    } else if (zeta < 1.0) {
        double omega_d = omega_n * sqrt(1.0 - zeta * zeta);
        double delta = (2.0 * 3.141592653589793 * zeta) / sqrt(1.0 - zeta * zeta);
        double period_d = 2.0 * 3.141592653589793 / omega_d;

        printf("  Vibration Regime: UNDERDAMPED (Oscillatory decay)\\n");
        printf("  Damped Frequency omega_d:    %10.3f rad/s (%.3f Hz)\\n", omega_d, omega_d / (2.0 * 3.141592653589793));
        printf("  Damped Period T_d:           %10.3f seconds\\n", period_d);
        printf("  Logarithmic Decrement delta: %10.4f\\n", delta);
    } else {
        printf("  Vibration Regime: OVERDAMPED (Sluggish non-oscillatory decay)\\n");
    }
}

int main(void) {
    int choice;
    do {
        printf("\\n================ DAMPED FREE VIBRATIONS WORKBENCH ================\\n");
        printf("1. Enter System Parameters (Mass m, damping c, stiffness k)\\n");
        printf("2. Test Standard Underdamped Case (m=2.0 kg, c=1.5 N*s/m, k=50.0 N/m)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                double m, c, k;
                printf("Enter mass m (kg), damping c (N*s/m), and stiffness k (N/m): ");
                if (scanf("%lf %lf %lf", &m, &c, &k) == 3 && m > 0 && k > 0 && c >= 0) {
                    analyze_vibration(m, c, k);
                } else { clear_input(); }
                break;
            }
            case 2:
                analyze_vibration(2.0, 1.5, 50.0);
                break;
            case 0:
                printf("Exiting Vibrations Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "mechanics", "vibrations", "damping"],
      aliases: ["prog_acad_damped_vibrations"],
    })
  );

  return components;
}

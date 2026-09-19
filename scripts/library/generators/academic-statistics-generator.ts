import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";

export function generateAcademicStatisticsComponents(): Component[] {
  const components: Component[] = [];

  // 51. Central Tendency & Dispersion
  components.push(
    createComponent({
      id: "academics-programming.statistics.descriptive-statistics.central-tendency-dispersion.prog-central-tendency",
      name: "prog_acad_central_tendency",
      type: "program",
      category: "academics-programming",
      subcategory: "statistics",
      categoryId: "academics-programming.statistics.descriptive-statistics.central-tendency-dispersion",
      path: "academics-programming/statistics/descriptive-statistics/central-tendency-dispersion/prog-central-tendency",
      description: "Interactive descriptive statistics calculator computing mean, median, sample variance, standard deviation, IQR, and outliers",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define MAX_DATA 100

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void sort_array(int n, double arr[]) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                double tmp = arr[j]; arr[j] = arr[j + 1]; arr[j + 1] = tmp;
            }
        }
    }
}

static void compute_statistics(int n, double arr[]) {
    sort_array(n, arr);

    double sum = 0.0;
    for (int i = 0; i < n; i++) sum += arr[i];
    double mean = sum / n;

    double median = (n % 2 != 0) ? arr[n / 2] : (arr[n / 2 - 1] + arr[n / 2]) / 2.0;

    double sq_diff = 0.0;
    double abs_diff = 0.0;
    for (int i = 0; i < n; i++) {
        double d = arr[i] - mean;
        sq_diff += d * d;
        abs_diff += fabs(d);
    }
    double sample_var = (n > 1) ? sq_diff / (n - 1) : 0.0;
    double sample_std = sqrt(sample_var);
    double mad = abs_diff / n;

    double q1 = arr[n / 4];
    double q3 = arr[(3 * n) / 4];
    double iqr = q3 - q1;
    double lower_fence = q1 - 1.5 * iqr;
    double upper_fence = q3 + 1.5 * iqr;

    printf("\\n--- Descriptive Statistics Summary (N = %d) ---\\n", n);
    printf("  Minimum:             %10.4f\\n", arr[0]);
    printf("  First Quartile Q1:   %10.4f\\n", q1);
    printf("  Median (Q2):         %10.4f\\n", median);
    printf("  Third Quartile Q3:   %10.4f\\n", q3);
    printf("  Maximum:             %10.4f\\n", arr[n - 1]);
    printf("  Interquartile Range: %10.4f\\n", iqr);
    printf("  Arithmetic Mean:     %10.4f\\n", mean);
    printf("  Sample Variance:     %10.4f\\n", sample_var);
    printf("  Sample Std Dev:      %10.4f\\n", sample_std);
    printf("  Mean Absolute Dev:   %10.4f\\n", mad);

    printf("\\nOutlier Detection (1.5 * IQR Rule):\\n");
    printf("  Valid Fence Bounds: [%.4f, %.4f]\\n", lower_fence, upper_fence);
    int outlier_count = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] < lower_fence || arr[i] > upper_fence) {
            printf("  Outlier Detected: %.4f\\n", arr[i]);
            outlier_count++;
        }
    }
    if (outlier_count == 0) printf("  No outliers detected in dataset.\\n");
}

int main(void) {
    int n = 10;
    double data[MAX_DATA] = {12, 15, 11, 19, 22, 24, 25, 26, 29, 35};

    int choice;
    do {
        printf("\\n================ DESCRIPTIVE STATISTICS WORKBENCH ================\\n");
        printf("1. Enter Dataset from Terminal\\n");
        printf("2. Compute Statistics on Current Dataset\\n");
        printf("3. Display Current Dataset\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter sample size N (2 to %d): ", MAX_DATA);
                if (scanf("%d", &n) != 1 || n < 2 || n > MAX_DATA) {
                    clear_input();
                    n = 10;
                    break;
                }
                printf("Enter %d numeric values: ", n);
                for (int i = 0; i < n; i++) {
                    if (scanf("%lf", &data[i]) != 1) data[i] = 0.0;
                }
                clear_input();
                break;
            }
            case 2:
                compute_statistics(n, data);
                break;
            case 3:
                printf("\\nCurrent Dataset (%d values):\\n[ ", n);
                for (int i = 0; i < n; i++) printf("%.2f%s", data[i], (i < n - 1) ? ", " : " ");
                printf("]\\n");
                break;
            case 0:
                printf("Exiting Statistics Workbench.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "statistics", "mean", "dispersion", "iqr"],
      aliases: ["prog_acad_central_tendency"],
    })
  );

  // 52. Skewness & Kurtosis
  components.push(
    createComponent({
      id: "academics-programming.statistics.descriptive-statistics.skewness-kurtosis.prog-skewness-kurtosis",
      name: "prog_acad_skewness_kurtosis",
      type: "program",
      category: "academics-programming",
      subcategory: "statistics",
      categoryId: "academics-programming.statistics.descriptive-statistics.skewness-kurtosis",
      path: "academics-programming/statistics/descriptive-statistics/skewness-kurtosis/prog-skewness-kurtosis",
      description: "Interactive distribution shape analyzer computing central moments, Fisher-Pearson skewness, and excess kurtosis",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define MAX_DATA 100

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void analyze_shape(int n, const double arr[]) {
    double sum = 0.0;
    for (int i = 0; i < n; i++) sum += arr[i];
    double mean = sum / n;

    double m2 = 0.0, m3 = 0.0, m4 = 0.0;
    for (int i = 0; i < n; i++) {
        double d = arr[i] - mean;
        double d2 = d * d;
        m2 += d2;
        m3 += d2 * d;
        m4 += d2 * d2;
    }
    m2 /= n;
    m3 /= n;
    m4 /= n;

    if (m2 < 1e-12) {
        printf("Error: Variance is zero. All values are identical.\\n");
        return;
    }

    double skewness = m3 / pow(m2, 1.5);
    double kurtosis = m4 / (m2 * m2);
    double excess_kurtosis = kurtosis - 3.0;

    printf("\\n--- Distribution Shape Analysis (N = %d) ---\\n", n);
    printf("  Mean:                     %10.4f\\n", mean);
    printf("  Second Central Moment m2: %10.4f\\n", m2);
    printf("  Third Central Moment m3:  %10.4f\\n", m3);
    printf("  Fourth Central Moment m4: %10.4f\\n", m4);
    printf("  Fisher-Pearson Skewness:  %10.4f\\n", skewness);
    printf("  Kurtosis (Beta_2):        %10.4f\\n", kurtosis);
    printf("  Excess Kurtosis (Gamma_2):%10.4f\\n", excess_kurtosis);

    printf("\\nQualitative Classification:\\n");
    if (fabs(skewness) < 0.1) printf("  Symmetry: Nearly Symmetric distribution.\\n");
    else if (skewness > 0) printf("  Symmetry: POSITIVELY SKEWED (Right-tailed, tail stretches to the right).\\n");
    else printf("  Symmetry: NEGATIVELY SKEWED (Left-tailed, tail stretches to the left).\\n");

    if (fabs(excess_kurtosis) < 0.1) printf("  Peakedness: MESOKURTIC (Similar to standard Gaussian bell).\\n");
    else if (excess_kurtosis > 0) printf("  Peakedness: LEPTOKURTIC (Heavy-tailed, sharp central peak).\\n");
    else printf("  Peakedness: PLATYKURTIC (Light-tailed, flat central shoulder).\\n");
}

int main(void) {
    int n = 8;
    double vals[MAX_DATA] = {10, 12, 12, 13, 15, 18, 20, 25};

    int choice;
    do {
        printf("\\n================ SKEWNESS & KURTOSIS WORKBENCH ================\\n");
        printf("1. Enter Dataset from Terminal\\n");
        printf("2. Analyze Skewness and Kurtosis\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter sample size N (3 to %d): ", MAX_DATA);
                if (scanf("%d", &n) != 1 || n < 3 || n > MAX_DATA) {
                    clear_input();
                    n = 8;
                    break;
                }
                printf("Enter %d numeric values: ", n);
                for (int i = 0; i < n; i++) {
                    if (scanf("%lf", &vals[i]) != 1) vals[i] = 0.0;
                }
                clear_input();
                break;
            }
            case 2:
                analyze_shape(n, vals);
                break;
            case 0:
                printf("Exiting Skewness & Kurtosis.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "statistics", "skewness", "kurtosis", "moments"],
      aliases: ["prog_acad_skewness_kurtosis"],
    })
  );

  // 53. Discrete Probability Distributions
  components.push(
    createComponent({
      id: "academics-programming.statistics.probability-distributions.discrete-distributions.prog-discrete-distributions",
      name: "prog_acad_discrete_distributions",
      type: "program",
      category: "academics-programming",
      subcategory: "statistics",
      categoryId: "academics-programming.statistics.probability-distributions.discrete-distributions",
      path: "academics-programming/statistics/probability-distributions/discrete-distributions/prog-discrete-distributions",
      description: "Interactive discrete probability distribution calculator evaluating PMF and CDF for Binomial and Poisson models",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static unsigned long long ncr(int n, int r) {
    if (r < 0 || r > n) return 0;
    if (r > n - r) r = n - r;
    unsigned long long res = 1;
    for (int i = 1; i <= r; i++) res = res * (n - i + 1) / i;
    return res;
}

static void eval_binomial(int n, double p) {
    printf("\\n--- Binomial Distribution B(n = %d, p = %.4f) ---\\n", n, p);
    printf("  Mean mu = n*p:            %10.4f\\n", n * p);
    printf("  Variance sigma^2 = npq:   %10.4f\\n", n * p * (1.0 - p));
    printf("  Std Dev sigma:            %10.4f\\n", sqrt(n * p * (1.0 - p)));

    printf("\\nComplete PMF & CDF Table:\\n");
    printf("   k  |      P(X = k)     |     P(X <= k)\\n");
    printf("------+-------------------+------------------\\n");
    double cdf = 0.0;
    for (int k = 0; k <= n; k++) {
        double pmf = (double)ncr(n, k) * pow(p, k) * pow(1.0 - p, n - k);
        cdf += pmf;
        printf(" %4d | %17.8f | %16.8f\\n", k, pmf, cdf);
    }
}

static void eval_poisson(double lambda, int max_k) {
    printf("\\n--- Poisson Distribution Pois(lambda = %.4f) ---\\n", lambda);
    printf("  Mean mu = lambda:         %10.4f\\n", lambda);
    printf("  Variance sigma^2 = lambda:%10.4f\\n", lambda);
    printf("  Std Dev sigma:            %10.4f\\n", sqrt(lambda));

    printf("\\nComplete PMF & CDF Table up to k = %d:\\n", max_k);
    printf("   k  |      P(X = k)     |     P(X <= k)\\n");
    printf("------+-------------------+------------------\\n");
    double cdf = 0.0;
    double fact = 1.0;
    for (int k = 0; k <= max_k; k++) {
        if (k > 0) fact *= k;
        double pmf = (exp(-lambda) * pow(lambda, k)) / fact;
        cdf += pmf;
        printf(" %4d | %17.8f | %16.8f\\n", k, pmf, cdf);
    }
}

int main(void) {
    int choice;
    do {
        printf("\\n================ DISCRETE DISTRIBUTIONS WORKBENCH ================\\n");
        printf("1. Binomial Distribution B(n, p)\\n");
        printf("2. Poisson Distribution Pois(lambda)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int n; double p;
                printf("Enter number of trials n (1 to 25) and success probability p (0 to 1): ");
                if (scanf("%d %lf", &n, &p) == 2 && n >= 1 && n <= 25 && p >= 0.0 && p <= 1.0) {
                    eval_binomial(n, p);
                } else { clear_input(); }
                break;
            }
            case 2: {
                double lambda;
                printf("Enter average event rate lambda (> 0): ");
                if (scanf("%lf", &lambda) == 1 && lambda > 0.0) {
                    eval_poisson(lambda, (int)ceil(2.0 * lambda + 6));
                } else { clear_input(); }
                break;
            }
            case 0:
                printf("Exiting Discrete Distributions.\\n");
                break;
            default:
                printf("Invalid choice.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "statistics", "distributions", "binomial", "poisson"],
      aliases: ["prog_acad_discrete_distributions"],
    })
  );

  // 54. Normal Distribution
  components.push(
    createComponent({
      id: "academics-programming.statistics.probability-distributions.normal-distribution.prog-normal-distribution",
      name: "prog_acad_normal_distribution",
      type: "program",
      category: "academics-programming",
      subcategory: "statistics",
      categoryId: "academics-programming.statistics.probability-distributions.normal-distribution",
      path: "academics-programming/statistics/probability-distributions/normal-distribution/prog-normal-distribution",
      description: "Interactive Gaussian distribution analyzer calculating Z-scores, PDF, numerical CDF, and interval probabilities",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static double normal_pdf(double x, double mu, double sigma) {
    double coeff = 1.0 / (sigma * sqrt(2.0 * 3.141592653589793));
    double exp_part = exp(-0.5 * pow((x - mu) / sigma, 2.0));
    return coeff * exp_part;
}

static double normal_cdf(double x, double mu, double sigma) {
    double z = (x - mu) / (sigma * sqrt(2.0));
    return 0.5 * (1.0 + erf(z));
}

int main(void) {
    double mu = 0.0, sigma = 1.0;

    int choice;
    do {
        printf("\\n================ NORMAL DISTRIBUTION WORKBENCH ================\\n");
        printf("Current Parameters: Mean mu = %.4f, Std Dev sigma = %.4f\\n", mu, sigma);
        printf("1. Set Normal Distribution Parameters (mu, sigma)\\n");
        printf("2. Compute Z-Score, PDF, and Cumulative P(X <= x)\\n");
        printf("3. Compute Interval Probability P(a <= X <= b)\\n");
        printf("4. Display Empirical Rule Confidence Intervals (68-95-99.7%%)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter mean mu and standard deviation sigma (> 0): ");
                if (scanf("%lf %lf", &mu, &sigma) != 2 || sigma <= 0.0) {
                    clear_input();
                    mu = 0.0; sigma = 1.0;
                }
                break;
            }
            case 2: {
                double x;
                printf("Enter query value x: ");
                if (scanf("%lf", &x) == 1) {
                    double z = (x - mu) / sigma;
                    printf("\\nResults for x = %.4f:\\n", x);
                    printf("  Standardized Z-Score:  %10.4f\\n", z);
                    printf("  Probability Density f(x):%10.6f\\n", normal_pdf(x, mu, sigma));
                    printf("  CDF P(X <= x):         %10.6f (%.2f%%)\\n", normal_cdf(x, mu, sigma), normal_cdf(x, mu, sigma) * 100.0);
                    printf("  Upper Tail P(X > x):   %10.6f (%.2f%%)\\n", 1.0 - normal_cdf(x, mu, sigma), (1.0 - normal_cdf(x, mu, sigma)) * 100.0);
                } else { clear_input(); }
                break;
            }
            case 3: {
                double a, b;
                printf("Enter interval endpoints a and b: ");
                if (scanf("%lf %lf", &a, &b) == 2 && a <= b) {
                    double prob = normal_cdf(b, mu, sigma) - normal_cdf(a, mu, sigma);
                    printf("Probability P(%.2f <= X <= %.2f) = %.6f (%.2f%%)\\n", a, b, prob, prob * 100.0);
                } else { clear_input(); }
                break;
            }
            case 4:
                printf("\\n--- Empirical Rule (68-95-99.7%% Rule) ---\\n");
                printf("  68.27%% Interval [mu - 1*s, mu + 1*s]: [%.4f, %.4f]\\n", mu - sigma, mu + sigma);
                printf("  95.45%% Interval [mu - 2*s, mu + 2*s]: [%.4f, %.4f]\\n", mu - 2.0 * sigma, mu + 2.0 * sigma);
                printf("  99.73%% Interval [mu - 3*s, mu + 3*s]: [%.4f, %.4f]\\n", mu - 3.0 * sigma, mu + 3.0 * sigma);
                break;
            case 0:
                printf("Exiting Normal Distribution.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "statistics", "normal-distribution", "gaussian"],
      aliases: ["prog_acad_normal_distribution"],
    })
  );

  // 55. Linear Regression
  components.push(
    createComponent({
      id: "academics-programming.statistics.regression-hypothesis.linear-regression.prog-linear-regression",
      name: "prog_acad_linear_regression",
      type: "program",
      category: "academics-programming",
      subcategory: "statistics",
      categoryId: "academics-programming.statistics.regression-hypothesis.linear-regression",
      path: "academics-programming/statistics/regression-hypothesis/linear-regression/prog-linear-regression",
      description: "Interactive ordinary least-squares linear regression solver with Pearson correlation r, R-squared, and prediction table",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

#define MAX_PTS 50

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void solve_regression(int n, const double x[], const double y[]) {
    double sum_x = 0, sum_y = 0, sum_xy = 0, sum_x2 = 0, sum_y2 = 0;
    for (int i = 0; i < n; i++) {
        sum_x += x[i];
        sum_y += y[i];
        sum_xy += x[i] * y[i];
        sum_x2 += x[i] * x[i];
        sum_y2 += y[i] * y[i];
    }

    double denom_m = (n * sum_x2 - sum_x * sum_x);
    if (fabs(denom_m) < 1e-12) {
        printf("Error: All x values are identical. Vertical line regression undefined.\\n");
        return;
    }

    double m = (n * sum_xy - sum_x * sum_y) / denom_m;
    double c = (sum_y - m * sum_x) / n;

    double num_r = (n * sum_xy - sum_x * sum_y);
    double den_r = sqrt((n * sum_x2 - sum_x * sum_x) * (n * sum_y2 - sum_y * sum_y));
    double r = (den_r > 1e-12) ? (num_r / den_r) : 0.0;
    double r2 = r * r;

    double sse = 0.0;
    for (int i = 0; i < n; i++) {
        double y_pred = m * x[i] + c;
        sse += (y[i] - y_pred) * (y[i] - y_pred);
    }
    double se_estimate = (n > 2) ? sqrt(sse / (n - 2)) : 0.0;

    printf("\\n--- Ordinary Least Squares Linear Regression Results ---\\n");
    printf("  Slope (m):                    %10.4f\\n", m);
    printf("  Intercept (c):                %10.4f\\n", c);
    printf("  Best-Fit Line Equation:       y = %.4f*x + %.4f\\n", m, c);
    printf("  Pearson Correlation (r):      %10.4f\\n", r);
    printf("  Coefficient of Determ. (R^2): %10.4f (%.2f%% variance explained)\\n", r2, r2 * 100.0);
    printf("  Standard Error of Estimate:   %10.4f\\n", se_estimate);

    printf("\\nResidual Table:\\n");
    printf(" Point |     x     |     y     |  Predicted y_hat | Residual e_i\\n");
    printf("-------+-----------+-----------+------------------+--------------\\n");
    for (int i = 0; i < n; i++) {
        double y_hat = m * x[i] + c;
        printf("  %3d  | %9.3f | %9.3f | %16.4f | %12.4f\\n",
               i + 1, x[i], y[i], y_hat, y[i] - y_hat);
    }
}

int main(void) {
    int n = 5;
    double x[MAX_PTS] = {1, 2, 3, 4, 5};
    double y[MAX_PTS] = {2, 3, 5, 6, 8};

    int choice;
    do {
        printf("\\n================ LINEAR REGRESSION WORKBENCH ================\\n");
        printf("1. Enter Data Points (x_i, y_i)\\n");
        printf("2. Compute Linear Regression Analysis\\n");
        printf("3. Predict y for Query x\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                printf("Enter number of observations N (3 to %d): ", MAX_PTS);
                if (scanf("%d", &n) != 1 || n < 3 || n > MAX_PTS) {
                    clear_input();
                    n = 5;
                    break;
                }
                printf("Enter %d pairs as 'x y':\\n", n);
                for (int i = 0; i < n; i++) {
                    printf("Point %d: ", i + 1);
                    if (scanf("%lf %lf", &x[i], &y[i]) != 2) { x[i] = i; y[i] = i; }
                }
                clear_input();
                break;
            }
            case 2:
                solve_regression(n, x, y);
                break;
            case 3: {
                double qx;
                printf("Enter query value x: ");
                if (scanf("%lf", &qx) == 1) {
                    double sum_x = 0, sum_y = 0, sum_xy = 0, sum_x2 = 0;
                    for (int i = 0; i < n; i++) {
                        sum_x += x[i]; sum_y += y[i];
                        sum_xy += x[i] * y[i]; sum_x2 += x[i] * x[i];
                    }
                    double m = (n * sum_xy - sum_x * sum_y) / (n * sum_x2 - sum_x * sum_x);
                    double c = (sum_y - m * sum_x) / n;
                    printf("Predicted y_hat at x = %.4f: %.6f\\n", qx, m * qx + c);
                } else { clear_input(); }
                break;
            }
            case 0:
                printf("Exiting Linear Regression.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "statistics", "regression", "least-squares"],
      aliases: ["prog_acad_linear_regression"],
    })
  );

  // 56. Student's t-Test
  components.push(
    createComponent({
      id: "academics-programming.statistics.regression-hypothesis.students-t-test.prog-students-t-test",
      name: "prog_acad_students_t_test",
      type: "program",
      category: "academics-programming",
      subcategory: "statistics",
      categoryId: "academics-programming.statistics.regression-hypothesis.students-t-test",
      path: "academics-programming/statistics/regression-hypothesis/students-t-test/prog-students-t-test",
      description: "Interactive one-sample Student's t-test hypothesis tester with critical value comparison and confidence intervals",
      signature: "int main(void);",
      code: `#include <stdio.h>
#include <math.h>
#include <stdbool.h>

static void clear_input(void) {
    int c;
    while ((c = getchar()) != '\\n' && c != EOF);
}

static void run_t_test(int n, double x_bar, double s, double mu0) {
    if (n <= 1 || s <= 0.0) {
        printf("Error: Sample size must be > 1 and std dev > 0.\\n");
        return;
    }

    double se = s / sqrt((double)n);
    double t_stat = (x_bar - mu0) / se;
    int df = n - 1;

    double t_crit_05 = 2.064;
    double t_crit_01 = 2.797;
    if (df >= 30) { t_crit_05 = 1.960; t_crit_01 = 2.576; }
    else if (df >= 20) { t_crit_05 = 2.086; t_crit_01 = 2.845; }
    else if (df >= 10) { t_crit_05 = 2.228; t_crit_01 = 3.169; }

    printf("\\n--- One-Sample Student's t-Test Results ---\\n");
    printf("  Sample Size N:             %d\\n", n);
    printf("  Degrees of Freedom df:     %d\\n", df);
    printf("  Sample Mean x_bar:         %10.4f\\n", x_bar);
    printf("  Hypothesized Mean mu0:     %10.4f\\n", mu0);
    printf("  Sample Std Deviation s:    %10.4f\\n", s);
    printf("  Standard Error SE:         %10.4f\\n", se);
    printf("  Calculated t-Statistic:    %10.4f\\n", t_stat);

    printf("\\nHypothesis Test Decision (Two-Tailed):\\n");
    printf("  At alpha = 0.05: Critical t = +-%.3f -> ", t_crit_05);
    if (fabs(t_stat) > t_crit_05) printf("REJECT NULL HYPOTHESIS H0 (Statistically Significant!)\\n");
    else printf("FAIL TO REJECT NULL HYPOTHESIS H0 (No significant difference).\\n");

    printf("  At alpha = 0.01: Critical t = +-%.3f -> ", t_crit_01);
    if (fabs(t_stat) > t_crit_01) printf("REJECT NULL HYPOTHESIS H0 (Highly Significant!)\\n");
    else printf("FAIL TO REJECT NULL HYPOTHESIS H0.\\n");

    printf("\\n95%% Confidence Interval for Population Mean mu:\\n");
    printf("  [%.4f, %.4f]\\n", x_bar - t_crit_05 * se, x_bar + t_crit_05 * se);
}

int main(void) {
    int choice;
    do {
        printf("\\n================ STUDENT'S t-TEST HYPOTHESIS WORKBENCH ================\\n");
        printf("1. Perform One-Sample t-Test from Sample Summary (N, mean, std, mu0)\\n");
        printf("2. Test Classroom Example (N=25, x_bar=104.2, s=8.5, mu0=100.0)\\n");
        printf("0. Exit\\n");
        printf("Enter choice: ");
        if (scanf("%d", &choice) != 1) {
            clear_input();
            continue;
        }

        switch (choice) {
            case 1: {
                int n;
                double x_bar, s, mu0;
                printf("Enter sample size N: ");
                if (scanf("%d", &n) != 1) { clear_input(); break; }
                printf("Enter sample mean x_bar and sample std dev s: ");
                if (scanf("%lf %lf", &x_bar, &s) != 2) { clear_input(); break; }
                printf("Enter hypothesized population mean mu0: ");
                if (scanf("%lf", &mu0) != 1) { clear_input(); break; }
                run_t_test(n, x_bar, s, mu0);
                break;
            }
            case 2:
                run_t_test(25, 104.2, 8.5, 100.0);
                break;
            case 0:
                printf("Exiting Student's t-Test.\\n");
                break;
            default:
                printf("Invalid selection.\\n");
        }
    } while (choice != 0);

    return 0;
}`,
      tags: ["academics", "statistics", "hypothesis-testing", "t-test"],
      aliases: ["prog_acad_students_t_test"],
    })
  );

  return components;
}

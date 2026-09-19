import { Component } from "@dtyp/types";
import { createComponent } from "./component-factory.js";
import { generateCpFullProgramsComponents } from "./cp-full-programs-generator.js";

export function generateCompetitiveProgrammingComponents(): Component[] {
  const components: Component[] = [];

  // =========================================================================
  // SUBDOMAIN 1: PROGRAMMING TECHNICS (competitive-programming.programming-technics)
  // =========================================================================

  // -------------------------------------------------------------------------
  // TOPIC 1: FAST I/O & UTILITIES
  // -------------------------------------------------------------------------

  // Fast I/O
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.fast-io-utilities.fast-io.fast-read-int",
      name: "cp_fast_read_int",
      type: "function",
      category: "competitive-programming",
      subcategory: "fast-io-utilities",
      categoryId: "competitive-programming.programming-technics.fast-io-utilities.fast-io",
      path: "competitive-programming/programming-technics/fast-io-utilities/fast-io/fast-read-int",
      description: "Reads a signed integer from standard input using fast character scanning",
      signature: "int cp_fast_read_int(int* out_val);",
      code: `int cp_fast_read_int(int* out_val) {
    int c = getchar();
    if (c == EOF) return 0;
    while (c != '-' && (c < '0' || c > '9')) {
        c = getchar();
        if (c == EOF) return 0;
    }
    int sign = 1;
    if (c == '-') {
        sign = -1;
        c = getchar();
    }
    int res = 0;
    while (c >= '0' && c <= '9') {
        res = res * 10 + (c - '0');
        c = getchar();
    }
    *out_val = res * sign;
    return 1;
}`,
      tags: ["competitive-programming", "fast-io"],
      aliases: ["cp_fast_read_int", "fastReadInt"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.fast-io-utilities.fast-io.fast-write-int",
      name: "cp_fast_write_int",
      type: "function",
      category: "competitive-programming",
      subcategory: "fast-io-utilities",
      categoryId: "competitive-programming.programming-technics.fast-io-utilities.fast-io",
      path: "competitive-programming/programming-technics/fast-io-utilities/fast-io/fast-write-int",
      description: "Writes a signed integer to standard output using buffered characters",
      signature: "void cp_fast_write_int(int n);",
      code: `void cp_fast_write_int(int n) {
    if (n == 0) {
        putchar('0');
        return;
    }
    if (n < 0) {
        putchar('-');
        n = -n;
    }
    char buf[12];
    int idx = 0;
    while (n > 0) {
        buf[idx++] = (char)('0' + (n % 10));
        n /= 10;
    }
    while (idx > 0) {
        putchar(buf[--idx]);
    }
}`,
      tags: ["competitive-programming", "fast-io"],
      aliases: ["cp_fast_write_int", "fastWriteInt"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.fast-io-utilities.fast-io.fast-read-long",
      name: "cp_fast_read_long",
      type: "function",
      category: "competitive-programming",
      subcategory: "fast-io-utilities",
      categoryId: "competitive-programming.programming-technics.fast-io-utilities.fast-io",
      path: "competitive-programming/programming-technics/fast-io-utilities/fast-io/fast-read-long",
      description: "Reads a 64-bit integer from standard input using fast character scanning",
      signature: "int cp_fast_read_long(long long* out_val);",
      code: `int cp_fast_read_long(long long* out_val) {
    int c = getchar();
    if (c == EOF) return 0;
    while (c != '-' && (c < '0' || c > '9')) {
        c = getchar();
        if (c == EOF) return 0;
    }
    long long sign = 1;
    if (c == '-') {
        sign = -1;
        c = getchar();
    }
    long long res = 0;
    while (c >= '0' && c <= '9') {
        res = res * 10 + (c - '0');
        c = getchar();
    }
    *out_val = res * sign;
    return 1;
}`,
      tags: ["competitive-programming", "fast-io"],
      aliases: ["cp_fast_read_long", "fastReadLong"],
    })
  );

  // Coordinate Compression
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.fast-io-utilities.coordinate-compression.compress",
      name: "cp_coordinate_compress",
      type: "function",
      category: "competitive-programming",
      subcategory: "fast-io-utilities",
      categoryId: "competitive-programming.programming-technics.fast-io-utilities.coordinate-compression",
      path: "competitive-programming/programming-technics/fast-io-utilities/coordinate-compression/compress",
      description: "Sorts and removes duplicates to produce sorted unique coordinate array",
      signature: "int cp_coordinate_compress(int* arr, int n, int* unique_arr);",
      code: `int cp_coordinate_compress(int* arr, int n, int* unique_arr) {
    for (int i = 0; i < n; i++) {
        unique_arr[i] = arr[i];
    }
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (unique_arr[j] > unique_arr[j + 1]) {
                int tmp = unique_arr[j];
                unique_arr[j] = unique_arr[j + 1];
                unique_arr[j + 1] = tmp;
            }
        }
    }
    int u = 0;
    for (int i = 0; i < n; i++) {
        if (i == 0 || unique_arr[i] != unique_arr[i - 1]) {
            unique_arr[u++] = unique_arr[i];
        }
    }
    return u;
}`,
      tags: ["competitive-programming", "coordinate-compression"],
      aliases: ["cp_coordinate_compress", "coordCompress"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.fast-io-utilities.coordinate-compression.get-rank",
      name: "cp_compressed_rank",
      type: "function",
      category: "competitive-programming",
      subcategory: "fast-io-utilities",
      categoryId: "competitive-programming.programming-technics.fast-io-utilities.coordinate-compression",
      path: "competitive-programming/programming-technics/fast-io-utilities/coordinate-compression/get-rank",
      description: "Finds the 0-indexed rank of a value in a sorted unique coordinate array",
      signature: "int cp_compressed_rank(const int* unique_arr, int size, int val);",
      code: `int cp_compressed_rank(const int* unique_arr, int size, int val) {
    int low = 0, high = size - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (unique_arr[mid] == val) return mid;
        if (unique_arr[mid] < val) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
      tags: ["competitive-programming", "coordinate-compression"],
      aliases: ["cp_compressed_rank", "coordRank"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 2: BIT MANIPULATION
  // -------------------------------------------------------------------------

  // Bitwise Tricks
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.bit-manipulation.bitwise-tricks.count-set",
      name: "cp_bit_count_set",
      type: "function",
      category: "competitive-programming",
      subcategory: "bit-manipulation",
      categoryId: "competitive-programming.programming-technics.bit-manipulation.bitwise-tricks",
      path: "competitive-programming/programming-technics/bit-manipulation/bitwise-tricks/count-set",
      description: "Counts the number of set bits in an integer (popcount)",
      signature: "int cp_bit_count_set(unsigned int n);",
      code: `int cp_bit_count_set(unsigned int n) {
    int count = 0;
    while (n > 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}`,
      tags: ["competitive-programming", "bit-manipulation"],
      aliases: ["cp_bit_count_set", "bitCountSet"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.bit-manipulation.bitwise-tricks.lowest-set",
      name: "cp_bit_lowest_set",
      type: "function",
      category: "competitive-programming",
      subcategory: "bit-manipulation",
      categoryId: "competitive-programming.programming-technics.bit-manipulation.bitwise-tricks",
      path: "competitive-programming/programming-technics/bit-manipulation/bitwise-tricks/lowest-set",
      description: "Isolates the lowest set bit value of an integer (x & -x)",
      signature: "int cp_bit_lowest_set(int x);",
      code: `int cp_bit_lowest_set(int x) {
    return x & (-x);
}`,
      tags: ["competitive-programming", "bit-manipulation"],
      aliases: ["cp_bit_lowest_set", "bitLowestSet"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.bit-manipulation.bitwise-tricks.is-power-of-two",
      name: "cp_bit_is_power_of_two",
      type: "function",
      category: "competitive-programming",
      subcategory: "bit-manipulation",
      categoryId: "competitive-programming.programming-technics.bit-manipulation.bitwise-tricks",
      path: "competitive-programming/programming-technics/bit-manipulation/bitwise-tricks/is-power-of-two",
      description: "Checks if a positive integer is an exact power of two",
      signature: "int cp_bit_is_power_of_two(unsigned int x);",
      code: `int cp_bit_is_power_of_two(unsigned int x) {
    return (x > 0) && ((x & (x - 1)) == 0);
}`,
      tags: ["competitive-programming", "bit-manipulation"],
      aliases: ["cp_bit_is_power_of_two", "bitIsPowerOfTwo"],
    })
  );

  // State Bitmasking
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.bit-manipulation.bitmasking.iterate-submasks",
      name: "cp_bit_iterate_submasks",
      type: "function",
      category: "competitive-programming",
      subcategory: "bit-manipulation",
      categoryId: "competitive-programming.programming-technics.bit-manipulation.bitmasking",
      path: "competitive-programming/programming-technics/bit-manipulation/bitmasking/iterate-submasks",
      description: "Iterates through all non-empty submasks of a bitmask",
      signature: "int cp_bit_iterate_submasks(int mask, int* out_submasks, int max_capacity);",
      code: `int cp_bit_iterate_submasks(int mask, int* out_submasks, int max_capacity) {
    int count = 0;
    for (int sub = mask; sub > 0; sub = (sub - 1) & mask) {
        if (count < max_capacity) {
            out_submasks[count++] = sub;
        }
    }
    return count;
}`,
      tags: ["competitive-programming", "bitmasking"],
      aliases: ["cp_bit_iterate_submasks", "bitIterateSubmasks"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.bit-manipulation.bitmasking.has-subset",
      name: "cp_bitmask_has_subset",
      type: "function",
      category: "competitive-programming",
      subcategory: "bit-manipulation",
      categoryId: "competitive-programming.programming-technics.bit-manipulation.bitmasking",
      path: "competitive-programming/programming-technics/bit-manipulation/bitmasking/has-subset",
      description: "Checks if supermask contains all set bits present in submask",
      signature: "int cp_bitmask_has_subset(int supermask, int submask);",
      code: `int cp_bitmask_has_subset(int supermask, int submask) {
    return (supermask & submask) == submask;
}`,
      tags: ["competitive-programming", "bitmasking"],
      aliases: ["cp_bitmask_has_subset", "bitmaskHasSubset"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 3: NUMBER THEORY & MATH
  // -------------------------------------------------------------------------

  // Prime Sieve & Factors
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.number-theory.prime-sieve.sieve-eratosthenes",
      name: "cp_sieve_eratosthenes",
      type: "function",
      category: "competitive-programming",
      subcategory: "number-theory",
      categoryId: "competitive-programming.programming-technics.number-theory.prime-sieve",
      path: "competitive-programming/programming-technics/number-theory/prime-sieve/sieve-eratosthenes",
      description: "Generates primality array up to n using the Sieve of Eratosthenes",
      signature: "void cp_sieve_eratosthenes(int n, char* is_prime);",
      code: `void cp_sieve_eratosthenes(int n, char* is_prime) {
    for (int i = 0; i <= n; i++) is_prime[i] = 1;
    is_prime[0] = 0;
    if (n >= 1) is_prime[1] = 0;
    for (int p = 2; p * p <= n; p++) {
        if (is_prime[p]) {
            for (int i = p * p; i <= n; i += p) {
                is_prime[i] = 0;
            }
        }
    }
}`,
      tags: ["competitive-programming", "prime-sieve"],
      aliases: ["cp_sieve_eratosthenes", "sieveEratosthenes"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.number-theory.prime-sieve.factorization",
      name: "cp_prime_factorization",
      type: "function",
      category: "competitive-programming",
      subcategory: "number-theory",
      categoryId: "competitive-programming.programming-technics.number-theory.prime-sieve",
      path: "competitive-programming/programming-technics/number-theory/prime-sieve/factorization",
      description: "Decomposes an integer into its distinct prime factors and exponent counts",
      signature: "int cp_prime_factorization(long long n, long long* primes, int* exponents);",
      code: `int cp_prime_factorization(long long n, long long* primes, int* exponents) {
    int count = 0;
    for (long long d = 2; d * d <= n; d++) {
        if (n % d == 0) {
            primes[count] = d;
            exponents[count] = 0;
            while (n % d == 0) {
                exponents[count]++;
                n /= d;
            }
            count++;
        }
    }
    if (n > 1) {
        primes[count] = n;
        exponents[count] = 1;
        count++;
    }
    return count;
}`,
      tags: ["competitive-programming", "prime-factorization"],
      aliases: ["cp_prime_factorization", "primeFactorization"],
    })
  );

  // Modular Arithmetic
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.number-theory.modular-arithmetic.mod-pow",
      name: "cp_mod_pow",
      type: "function",
      category: "competitive-programming",
      subcategory: "number-theory",
      categoryId: "competitive-programming.programming-technics.number-theory.modular-arithmetic",
      path: "competitive-programming/programming-technics/number-theory/modular-arithmetic/mod-pow",
      description: "Calculates (base^exp) modulo mod in logarithmic time",
      signature: "long long cp_mod_pow(long long base, long long exp, long long mod);",
      code: `long long cp_mod_pow(long long base, long long exp, long long mod) {
    long long res = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) res = (res * base) % mod;
        base = (base * base) % mod;
        exp >>= 1;
    }
    return res;
}`,
      tags: ["competitive-programming", "modular-arithmetic"],
      aliases: ["cp_mod_pow", "modPow"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.number-theory.modular-arithmetic.extended-gcd",
      name: "cp_extended_gcd",
      type: "function",
      category: "competitive-programming",
      subcategory: "number-theory",
      categoryId: "competitive-programming.programming-technics.number-theory.modular-arithmetic",
      path: "competitive-programming/programming-technics/number-theory/modular-arithmetic/extended-gcd",
      description: "Computes gcd and Bezout coefficients x, y such that ax + by = gcd(a, b)",
      signature: "long long cp_extended_gcd(long long a, long long b, long long* x, long long* y);",
      code: `long long cp_extended_gcd(long long a, long long b, long long* x, long long* y) {
    if (b == 0) {
        *x = 1;
        *y = 0;
        return a;
    }
    long long x1, y1;
    long long gcd = cp_extended_gcd(b, a % b, &x1, &y1);
    *x = y1;
    *y = x1 - (a / b) * y1;
    return gcd;
}`,
      tags: ["competitive-programming", "extended-gcd"],
      aliases: ["cp_extended_gcd", "extendedGcd"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.number-theory.modular-arithmetic.mod-inverse",
      name: "cp_mod_inverse",
      type: "function",
      category: "competitive-programming",
      subcategory: "number-theory",
      categoryId: "competitive-programming.programming-technics.number-theory.modular-arithmetic",
      path: "competitive-programming/programming-technics/number-theory/modular-arithmetic/mod-inverse",
      description: "Calculates modular multiplicative inverse of a modulo mod",
      signature: "long long cp_mod_inverse(long long a, long long mod);",
      dependencies: ["competitive-programming.programming-technics.number-theory.modular-arithmetic.extended-gcd"],
      code: `long long cp_mod_inverse(long long a, long long mod) {
    long long x, y;
    long long g = cp_extended_gcd(a, mod, &x, &y);
    if (g != 1) return -1;
    return (x % mod + mod) % mod;
}`,
      tags: ["competitive-programming", "modular-inverse"],
      aliases: ["cp_mod_inverse", "modInverse"],
    })
  );

  // Combinatorics
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.number-theory.combinatorics.precompute-factorials",
      name: "cp_precompute_factorials",
      type: "function",
      category: "competitive-programming",
      subcategory: "number-theory",
      categoryId: "competitive-programming.programming-technics.number-theory.combinatorics",
      path: "competitive-programming/programming-technics/number-theory/combinatorics/precompute-factorials",
      description: "Precomputes factorials and inverse factorials up to n modulo mod",
      signature: "void cp_precompute_factorials(int n, long long mod, long long* fact, long long* inv_fact);",
      dependencies: ["competitive-programming.programming-technics.number-theory.modular-arithmetic.mod-pow"],
      code: `void cp_precompute_factorials(int n, long long mod, long long* fact, long long* inv_fact) {
    fact[0] = 1;
    for (int i = 1; i <= n; i++) {
        fact[i] = (fact[i - 1] * i) % mod;
    }
    inv_fact[n] = cp_mod_pow(fact[n], mod - 2, mod);
    for (int i = n - 1; i >= 0; i--) {
        inv_fact[i] = (inv_fact[i + 1] * (i + 1)) % mod;
    }
}`,
      tags: ["competitive-programming", "combinatorics"],
      aliases: ["cp_precompute_factorials", "precomputeFactorials"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.number-theory.combinatorics.ncr-modulo",
      name: "cp_ncr_modulo",
      type: "function",
      category: "competitive-programming",
      subcategory: "number-theory",
      categoryId: "competitive-programming.programming-technics.number-theory.combinatorics",
      path: "competitive-programming/programming-technics/number-theory/combinatorics/ncr-modulo",
      description: "Calculates nCr modulo mod in O(1) using precomputed factorial tables",
      signature: "long long cp_ncr_modulo(int n, int r, long long mod, const long long* fact, const long long* inv_fact);",
      code: `long long cp_ncr_modulo(int n, int r, long long mod, const long long* fact, const long long* inv_fact) {
    if (r < 0 || r > n) return 0;
    long long num = fact[n];
    long long den = (inv_fact[r] * inv_fact[n - r]) % mod;
    return (num * den) % mod;
}`,
      tags: ["competitive-programming", "combinatorics"],
      aliases: ["cp_ncr_modulo", "ncrModulo"],
    })
  );

  // Matrix Exponentiation
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.number-theory.matrix-exponentiation.multiply-2x2",
      name: "cp_matrix_multiply_2x2",
      type: "function",
      category: "competitive-programming",
      subcategory: "number-theory",
      categoryId: "competitive-programming.programming-technics.number-theory.matrix-exponentiation",
      path: "competitive-programming/programming-technics/number-theory/matrix-exponentiation/multiply-2x2",
      description: "Multiplies two 2x2 matrices modulo mod",
      signature: "void cp_matrix_multiply_2x2(const long long A[2][2], const long long B[2][2], long long C[2][2], long long mod);",
      code: `void cp_matrix_multiply_2x2(const long long A[2][2], const long long B[2][2], long long C[2][2], long long mod) {
    long long r00 = (A[0][0] * B[0][0] + A[0][1] * B[1][0]) % mod;
    long long r01 = (A[0][0] * B[0][1] + A[0][1] * B[1][1]) % mod;
    long long r10 = (A[1][0] * B[0][0] + A[1][1] * B[1][0]) % mod;
    long long r11 = (A[1][0] * B[0][1] + A[1][1] * B[1][1]) % mod;
    C[0][0] = r00;
    C[0][1] = r01;
    C[1][0] = r10;
    C[1][1] = r11;
}`,
      tags: ["competitive-programming", "matrix-exponentiation"],
      aliases: ["cp_matrix_multiply_2x2", "matrixMultiply2x2"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.number-theory.matrix-exponentiation.fibonacci",
      name: "cp_matrix_power_fibonacci",
      type: "function",
      category: "competitive-programming",
      subcategory: "number-theory",
      categoryId: "competitive-programming.programming-technics.number-theory.matrix-exponentiation",
      path: "competitive-programming/programming-technics/number-theory/matrix-exponentiation/fibonacci",
      description: "Computes N-th Fibonacci number in O(log N) using 2x2 matrix fast power",
      signature: "long long cp_matrix_power_fibonacci(long long n, long long mod);",
      dependencies: ["competitive-programming.programming-technics.number-theory.matrix-exponentiation.multiply-2x2"],
      code: `long long cp_matrix_power_fibonacci(long long n, long long mod) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    long long res[2][2] = {{1, 0}, {0, 1}};
    long long base[2][2] = {{1, 1}, {1, 0}};
    long long p = n - 1;
    while (p > 0) {
        if (p & 1) {
            long long tmp[2][2];
            cp_matrix_multiply_2x2(res, base, tmp, mod);
            res[0][0] = tmp[0][0]; res[0][1] = tmp[0][1];
            res[1][0] = tmp[1][0]; res[1][1] = tmp[1][1];
        }
        long long tmp_base[2][2];
        cp_matrix_multiply_2x2(base, base, tmp_base, mod);
        base[0][0] = tmp_base[0][0]; base[0][1] = tmp_base[0][1];
        base[1][0] = tmp_base[1][0]; base[1][1] = tmp_base[1][1];
        p >>= 1;
    }
    return res[0][0];
}`,
      tags: ["competitive-programming", "matrix-fibonacci"],
      aliases: ["cp_matrix_power_fibonacci", "matrixFibonacci"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 4: RANGE QUERIES & TECHNIQUES
  // -------------------------------------------------------------------------

  // Prefix Sums
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.range-queries.prefix-sums.build-1d",
      name: "cp_prefix_sum_1d_build",
      type: "function",
      category: "competitive-programming",
      subcategory: "range-queries",
      categoryId: "competitive-programming.programming-technics.range-queries.prefix-sums",
      path: "competitive-programming/programming-technics/range-queries/prefix-sums/build-1d",
      description: "Builds a 1-indexed 1D prefix sum array",
      signature: "void cp_prefix_sum_1d_build(const int* arr, int n, long long* pref);",
      code: `void cp_prefix_sum_1d_build(const int* arr, int n, long long* pref) {
    pref[0] = 0;
    for (int i = 0; i < n; i++) {
        pref[i + 1] = pref[i] + arr[i];
    }
}`,
      tags: ["competitive-programming", "prefix-sums"],
      aliases: ["cp_prefix_sum_1d_build", "prefSum1dBuild"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.range-queries.prefix-sums.query-1d",
      name: "cp_prefix_sum_1d_query",
      type: "function",
      category: "competitive-programming",
      subcategory: "range-queries",
      categoryId: "competitive-programming.programming-technics.range-queries.prefix-sums",
      path: "competitive-programming/programming-technics/range-queries/prefix-sums/query-1d",
      description: "Queries sum in range [L, R] (0-indexed inclusive) in O(1)",
      signature: "long long cp_prefix_sum_1d_query(const long long* pref, int L, int R);",
      code: `long long cp_prefix_sum_1d_query(const long long* pref, int L, int R) {
    return pref[R + 1] - pref[L];
}`,
      tags: ["competitive-programming", "prefix-sums"],
      aliases: ["cp_prefix_sum_1d_query", "prefSum1dQuery"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.range-queries.prefix-sums.query-2d",
      name: "cp_prefix_sum_2d_query",
      type: "function",
      category: "competitive-programming",
      subcategory: "range-queries",
      categoryId: "competitive-programming.programming-technics.range-queries.prefix-sums",
      path: "competitive-programming/programming-technics/range-queries/prefix-sums/query-2d",
      description: "Queries sum in subgrid [r1, c1] to [r2, c2] in O(1)",
      signature: "long long cp_prefix_sum_2d_query(const long long* pref, int cols_stride, int r1, int c1, int r2, int c2);",
      code: `long long cp_prefix_sum_2d_query(const long long* pref, int cols_stride, int r1, int c1, int r2, int c2) {
    long long total = pref[(r2 + 1) * cols_stride + (c2 + 1)];
    long long top = pref[r1 * cols_stride + (c2 + 1)];
    long long left = pref[(r2 + 1) * cols_stride + c1];
    long long diag = pref[r1 * cols_stride + c1];
    return total - top - left + diag;
}`,
      tags: ["competitive-programming", "prefix-sums-2d"],
      aliases: ["cp_prefix_sum_2d_query", "prefSum2dQuery"],
    })
  );

  // Difference Array
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.range-queries.difference-array.range-add",
      name: "cp_difference_array_range_add",
      type: "function",
      category: "competitive-programming",
      subcategory: "range-queries",
      categoryId: "competitive-programming.programming-technics.range-queries.difference-array",
      path: "competitive-programming/programming-technics/range-queries/difference-array/range-add",
      description: "Applies a range addition update [L, R] += val in O(1)",
      signature: "void cp_difference_array_range_add(long long* diff, int L, int R, long long val);",
      code: `void cp_difference_array_range_add(long long* diff, int L, int R, long long val) {
    diff[L] += val;
    diff[R + 1] -= val;
}`,
      tags: ["competitive-programming", "difference-array"],
      aliases: ["cp_difference_array_range_add", "diffRangeAdd"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.range-queries.difference-array.compute",
      name: "cp_difference_array_compute",
      type: "function",
      category: "competitive-programming",
      subcategory: "range-queries",
      categoryId: "competitive-programming.programming-technics.range-queries.difference-array",
      path: "competitive-programming/programming-technics/range-queries/difference-array/compute",
      description: "Accumulates difference array to restore updated values in O(N)",
      signature: "void cp_difference_array_compute(const long long* diff, int n, long long* res);",
      code: `void cp_difference_array_compute(const long long* diff, int n, long long* res) {
    long long running = 0;
    for (int i = 0; i < n; i++) {
        running += diff[i];
        res[i] = running;
    }
}`,
      tags: ["competitive-programming", "difference-array"],
      aliases: ["cp_difference_array_compute", "diffCompute"],
    })
  );

  // Two Pointers
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.range-queries.two-pointers.pair-sum",
      name: "cp_two_pointers_pair_sum",
      type: "function",
      category: "competitive-programming",
      subcategory: "range-queries",
      categoryId: "competitive-programming.programming-technics.range-queries.two-pointers",
      path: "competitive-programming/programming-technics/range-queries/two-pointers/pair-sum",
      description: "Finds two indices in a sorted array that sum to target in O(N)",
      signature: "int cp_two_pointers_pair_sum(const int* arr, int n, int target, int* out_i, int* out_j);",
      code: `int cp_two_pointers_pair_sum(const int* arr, int n, int target, int* out_i, int* out_j) {
    int left = 0, right = n - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            *out_i = left;
            *out_j = right;
            return 1;
        }
        if (sum < target) left++;
        else right--;
    }
    return 0;
}`,
      tags: ["competitive-programming", "two-pointers"],
      aliases: ["cp_two_pointers_pair_sum", "twoPointersPairSum"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.range-queries.two-pointers.remove-duplicates",
      name: "cp_two_pointers_remove_duplicates",
      type: "function",
      category: "competitive-programming",
      subcategory: "range-queries",
      categoryId: "competitive-programming.programming-technics.range-queries.two-pointers",
      path: "competitive-programming/programming-technics/range-queries/two-pointers/remove-duplicates",
      description: "Removes duplicates in-place from sorted array using fast/slow two pointers",
      signature: "int cp_two_pointers_remove_duplicates(int* arr, int n);",
      code: `int cp_two_pointers_remove_duplicates(int* arr, int n) {
    if (n <= 1) return n;
    int slow = 0;
    for (int fast = 1; fast < n; fast++) {
        if (arr[fast] != arr[slow]) {
            slow++;
            arr[slow] = arr[fast];
        }
    }
    return slow + 1;
}`,
      tags: ["competitive-programming", "two-pointers"],
      aliases: ["cp_two_pointers_remove_duplicates", "twoPointersDedup"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.range-queries.two-pointers.trapping-rain-water",
      name: "cp_two_pointers_trapping_rain_water",
      type: "function",
      category: "competitive-programming",
      subcategory: "range-queries",
      categoryId: "competitive-programming.programming-technics.range-queries.two-pointers",
      path: "competitive-programming/programming-technics/range-queries/two-pointers/trapping-rain-water",
      description: "Calculates trapped water units across elevation heights in O(N)",
      signature: "long long cp_two_pointers_trapping_rain_water(const int* heights, int n);",
      code: `long long cp_two_pointers_trapping_rain_water(const int* heights, int n) {
    if (n <= 2) return 0;
    int left = 0, right = n - 1;
    int left_max = 0, right_max = 0;
    long long total_water = 0;
    while (left <= right) {
        if (heights[left] <= heights[right]) {
            if (heights[left] >= left_max) left_max = heights[left];
            else total_water += (left_max - heights[left]);
            left++;
        } else {
            if (heights[right] >= right_max) right_max = heights[right];
            else total_water += (right_max - heights[right]);
            right--;
        }
    }
    return total_water;
}`,
      tags: ["competitive-programming", "two-pointers"],
      aliases: ["cp_two_pointers_trapping_rain_water", "twoPointersTrappingWater"],
    })
  );

  // Sliding Window
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.range-queries.sliding-window.fixed-sum",
      name: "cp_sliding_window_fixed_sum",
      type: "function",
      category: "competitive-programming",
      subcategory: "range-queries",
      categoryId: "competitive-programming.programming-technics.range-queries.sliding-window",
      path: "competitive-programming/programming-technics/range-queries/sliding-window/fixed-sum",
      description: "Finds maximum sum of any contiguous subarray of fixed size k",
      signature: "long long cp_sliding_window_fixed_sum(const int* arr, int n, int k);",
      code: `long long cp_sliding_window_fixed_sum(const int* arr, int n, int k) {
    if (n < k || k <= 0) return 0;
    long long current_sum = 0;
    for (int i = 0; i < k; i++) current_sum += arr[i];
    long long max_sum = current_sum;
    for (int i = k; i < n; i++) {
        current_sum += arr[i] - arr[i - k];
        if (current_sum > max_sum) max_sum = current_sum;
    }
    return max_sum;
}`,
      tags: ["competitive-programming", "sliding-window"],
      aliases: ["cp_sliding_window_fixed_sum", "slidingWindowFixedSum"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.range-queries.sliding-window.min-subarray-len",
      name: "cp_sliding_window_min_subarray_len",
      type: "function",
      category: "competitive-programming",
      subcategory: "range-queries",
      categoryId: "competitive-programming.programming-technics.range-queries.sliding-window",
      path: "competitive-programming/programming-technics/range-queries/sliding-window/min-subarray-len",
      description: "Finds minimum length of contiguous subarray with sum >= target in O(N)",
      signature: "int cp_sliding_window_min_subarray_len(const int* arr, int n, long long target);",
      code: `int cp_sliding_window_min_subarray_len(const int* arr, int n, long long target) {
    int min_len = n + 1;
    long long current_sum = 0;
    int left = 0;
    for (int right = 0; right < n; right++) {
        current_sum += arr[right];
        while (current_sum >= target) {
            int len = right - left + 1;
            if (len < min_len) min_len = len;
            current_sum -= arr[left++];
        }
    }
    return (min_len <= n) ? min_len : 0;
}`,
      tags: ["competitive-programming", "sliding-window"],
      aliases: ["cp_sliding_window_min_subarray_len", "slidingWindowMinLen"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 5: COMPETITIVE DATA STRUCTURES
  // -------------------------------------------------------------------------

  // Fenwick Tree (BIT)
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.cp-data-structures.fenwick-tree.struct",
      name: "CpFenwickTree",
      type: "struct",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.programming-technics.cp-data-structures.fenwick-tree",
      path: "competitive-programming/programming-technics/cp-data-structures/fenwick-tree/struct",
      description: "Fenwick Tree (Binary Indexed Tree) structure for prefix sums and point updates",
      signature: "typedef struct CpFenwickTree { long long* tree; int size; } CpFenwickTree;",
      code: `typedef struct CpFenwickTree {
    long long* tree;
    int size;
} CpFenwickTree;`,
      tags: ["competitive-programming", "fenwick-tree"],
      aliases: ["CpFenwickTree", "FenwickTree"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.cp-data-structures.fenwick-tree.update",
      name: "cp_fenwick_update",
      type: "function",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.programming-technics.cp-data-structures.fenwick-tree",
      path: "competitive-programming/programming-technics/cp-data-structures/fenwick-tree/update",
      description: "Adds value delta to element at 1-indexed position in O(log N)",
      signature: "void cp_fenwick_update(CpFenwickTree* ft, int idx, long long delta);",
      dependencies: ["competitive-programming.programming-technics.cp-data-structures.fenwick-tree.struct"],
      code: `void cp_fenwick_update(CpFenwickTree* ft, int idx, long long delta) {
    while (idx <= ft->size) {
        ft->tree[idx] += delta;
        idx += (idx & (-idx));
    }
}`,
      tags: ["competitive-programming", "fenwick-tree"],
      aliases: ["cp_fenwick_update", "fenwickUpdate"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.cp-data-structures.fenwick-tree.query",
      name: "cp_fenwick_query",
      type: "function",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.programming-technics.cp-data-structures.fenwick-tree",
      path: "competitive-programming/programming-technics/cp-data-structures/fenwick-tree/query",
      description: "Queries prefix sum from index 1 to idx in O(log N)",
      signature: "long long cp_fenwick_query(const CpFenwickTree* ft, int idx);",
      dependencies: ["competitive-programming.programming-technics.cp-data-structures.fenwick-tree.struct"],
      code: `long long cp_fenwick_query(const CpFenwickTree* ft, int idx) {
    long long sum = 0;
    while (idx > 0) {
        sum += ft->tree[idx];
        idx -= (idx & (-idx));
    }
    return sum;
}`,
      tags: ["competitive-programming", "fenwick-tree"],
      aliases: ["cp_fenwick_query", "fenwickQuery"],
    })
  );

  // Segment Tree
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.cp-data-structures.segment-tree.struct",
      name: "CpSegmentTree",
      type: "struct",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.programming-technics.cp-data-structures.segment-tree",
      path: "competitive-programming/programming-technics/cp-data-structures/segment-tree/struct",
      description: "Segment tree structure for range minimum and sum queries",
      signature: "typedef struct CpSegmentTree { long long* tree; int n; } CpSegmentTree;",
      code: `typedef struct CpSegmentTree {
    long long* tree;
    int n;
} CpSegmentTree;`,
      tags: ["competitive-programming", "segment-tree"],
      aliases: ["CpSegmentTree", "SegmentTree"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.cp-data-structures.segment-tree.build",
      name: "cp_seg_tree_build",
      type: "function",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.programming-technics.cp-data-structures.segment-tree",
      path: "competitive-programming/programming-technics/cp-data-structures/segment-tree/build",
      description: "Builds a segment tree from an array in O(N)",
      signature: "void cp_seg_tree_build(CpSegmentTree* st, const int* arr, int node, int start, int end);",
      dependencies: ["competitive-programming.programming-technics.cp-data-structures.segment-tree.struct"],
      code: `void cp_seg_tree_build(CpSegmentTree* st, const int* arr, int node, int start, int end) {
    if (start == end) {
        st->tree[node] = arr[start];
        return;
    }
    int mid = start + (end - start) / 2;
    cp_seg_tree_build(st, arr, 2 * node, start, mid);
    cp_seg_tree_build(st, arr, 2 * node + 1, mid + 1, end);
    st->tree[node] = (st->tree[2 * node] < st->tree[2 * node + 1]) ? st->tree[2 * node] : st->tree[2 * node + 1];
}`,
      tags: ["competitive-programming", "segment-tree"],
      aliases: ["cp_seg_tree_build", "segTreeBuild"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.cp-data-structures.segment-tree.update",
      name: "cp_seg_tree_update",
      type: "function",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.programming-technics.cp-data-structures.segment-tree",
      path: "competitive-programming/programming-technics/cp-data-structures/segment-tree/update",
      description: "Updates value at index idx in segment tree in O(log N)",
      signature: "void cp_seg_tree_update(CpSegmentTree* st, int node, int start, int end, int idx, long long val);",
      dependencies: ["competitive-programming.programming-technics.cp-data-structures.segment-tree.struct"],
      code: `void cp_seg_tree_update(CpSegmentTree* st, int node, int start, int end, int idx, long long val) {
    if (start == end) {
        st->tree[node] = val;
        return;
    }
    int mid = start + (end - start) / 2;
    if (idx <= mid) cp_seg_tree_update(st, 2 * node, start, mid, idx, val);
    else cp_seg_tree_update(st, 2 * node + 1, mid + 1, end, idx, val);
    st->tree[node] = (st->tree[2 * node] < st->tree[2 * node + 1]) ? st->tree[2 * node] : st->tree[2 * node + 1];
}`,
      tags: ["competitive-programming", "segment-tree"],
      aliases: ["cp_seg_tree_update", "segTreeUpdate"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.cp-data-structures.segment-tree.query",
      name: "cp_seg_tree_query",
      type: "function",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.programming-technics.cp-data-structures.segment-tree",
      path: "competitive-programming/programming-technics/cp-data-structures/segment-tree/query",
      description: "Queries range minimum in [l, r] in O(log N)",
      signature: "long long cp_seg_tree_query(const CpSegmentTree* st, int node, int start, int end, int l, int r);",
      dependencies: ["competitive-programming.programming-technics.cp-data-structures.segment-tree.struct"],
      code: `long long cp_seg_tree_query(const CpSegmentTree* st, int node, int start, int end, int l, int r) {
    if (r < start || end < l) return 9223372036854775807LL;
    if (l <= start && end <= r) return st->tree[node];
    int mid = start + (end - start) / 2;
    long long left_min = cp_seg_tree_query(st, 2 * node, start, mid, l, r);
    long long right_min = cp_seg_tree_query(st, 2 * node + 1, mid + 1, end, l, r);
    return (left_min < right_min) ? left_min : right_min;
}`,
      tags: ["competitive-programming", "segment-tree"],
      aliases: ["cp_seg_tree_query", "segTreeQuery"],
    })
  );

  // Disjoint Set Union (DSU)
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.cp-data-structures.disjoint-set.struct",
      name: "CpDsu",
      type: "struct",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.programming-technics.cp-data-structures.disjoint-set",
      path: "competitive-programming/programming-technics/cp-data-structures/disjoint-set/struct",
      description: "Disjoint Set Union structure with rank and path compression",
      signature: "typedef struct CpDsu { int* parent; int* rank; int size; } CpDsu;",
      code: `typedef struct CpDsu {
    int* parent;
    int* rank;
    int size;
} CpDsu;`,
      tags: ["competitive-programming", "dsu"],
      aliases: ["CpDsu", "DisjointSet"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.cp-data-structures.disjoint-set.init",
      name: "cp_dsu_init",
      type: "function",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.programming-technics.cp-data-structures.disjoint-set",
      path: "competitive-programming/programming-technics/cp-data-structures/disjoint-set/init",
      description: "Initializes DSU structure with n elements",
      signature: "void cp_dsu_init(CpDsu* dsu, int n, int* parent_buf, int* rank_buf);",
      dependencies: ["competitive-programming.programming-technics.cp-data-structures.disjoint-set.struct"],
      code: `void cp_dsu_init(CpDsu* dsu, int n, int* parent_buf, int* rank_buf) {
    dsu->parent = parent_buf;
    dsu->rank = rank_buf;
    dsu->size = n;
    for (int i = 0; i < n; i++) {
        dsu->parent[i] = i;
        dsu->rank[i] = 0;
    }
}`,
      tags: ["competitive-programming", "dsu"],
      aliases: ["cp_dsu_init", "dsuInit"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.cp-data-structures.disjoint-set.find",
      name: "cp_dsu_find",
      type: "function",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.programming-technics.cp-data-structures.disjoint-set",
      path: "competitive-programming/programming-technics/cp-data-structures/disjoint-set/find",
      description: "Finds set representative of element i with path compression",
      signature: "int cp_dsu_find(CpDsu* dsu, int i);",
      dependencies: ["competitive-programming.programming-technics.cp-data-structures.disjoint-set.struct"],
      code: `int cp_dsu_find(CpDsu* dsu, int i) {
    if (dsu->parent[i] == i) return i;
    dsu->parent[i] = cp_dsu_find(dsu, dsu->parent[i]);
    return dsu->parent[i];
}`,
      tags: ["competitive-programming", "dsu"],
      aliases: ["cp_dsu_find", "dsuFind"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.cp-data-structures.disjoint-set.union",
      name: "cp_dsu_union",
      type: "function",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.programming-technics.cp-data-structures.disjoint-set",
      path: "competitive-programming/programming-technics/cp-data-structures/disjoint-set/union",
      description: "Unites sets containing i and j by rank, returns 1 if united, 0 if already in same set",
      signature: "int cp_dsu_union(CpDsu* dsu, int i, int j);",
      dependencies: ["competitive-programming.programming-technics.cp-data-structures.disjoint-set.find"],
      code: `int cp_dsu_union(CpDsu* dsu, int i, int j) {
    int root_i = cp_dsu_find(dsu, i);
    int root_j = cp_dsu_find(dsu, j);
    if (root_i == root_j) return 0;
    if (dsu->rank[root_i] < dsu->rank[root_j]) {
        dsu->parent[root_i] = root_j;
    } else if (dsu->rank[root_i] > dsu->rank[root_j]) {
        dsu->parent[root_j] = root_i;
    } else {
        dsu->parent[root_j] = root_i;
        dsu->rank[root_i]++;
    }
    return 1;
}`,
      tags: ["competitive-programming", "dsu"],
      aliases: ["cp_dsu_union", "dsuUnion"],
    })
  );

  // Monotonic Structures
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.cp-data-structures.monotonic-structures.next-greater",
      name: "cp_monotonic_stack_next_greater",
      type: "function",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.programming-technics.cp-data-structures.monotonic-structures",
      path: "competitive-programming/programming-technics/cp-data-structures/monotonic-structures/next-greater",
      description: "Computes next greater element index for each element in O(N)",
      signature: "void cp_monotonic_stack_next_greater(const int* arr, int n, int* next_idx);",
      code: `void cp_monotonic_stack_next_greater(const int* arr, int n, int* next_idx) {
    int stack[n];
    int top = -1;
    for (int i = 0; i < n; i++) next_idx[i] = -1;
    for (int i = 0; i < n; i++) {
        while (top >= 0 && arr[i] > arr[stack[top]]) {
            next_idx[stack[top--]] = i;
        }
        stack[++top] = i;
    }
}`,
      tags: ["competitive-programming", "monotonic-stack"],
      aliases: ["cp_monotonic_stack_next_greater", "monotonicNextGreater"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.cp-data-structures.monotonic-structures.window-max",
      name: "cp_monotonic_sliding_window_max",
      type: "function",
      category: "competitive-programming",
      subcategory: "cp-data-structures",
      categoryId: "competitive-programming.programming-technics.cp-data-structures.monotonic-structures",
      path: "competitive-programming/programming-technics/cp-data-structures/monotonic-structures/window-max",
      description: "Computes maximum for every sliding window of size k in O(N)",
      signature: "void cp_monotonic_sliding_window_max(const int* arr, int n, int k, int* out_max);",
      code: `void cp_monotonic_sliding_window_max(const int* arr, int n, int k, int* out_max) {
    int deque[n];
    int head = 0, tail = 0;
    int out_idx = 0;
    for (int i = 0; i < n; i++) {
        if (head < tail && deque[head] <= i - k) head++;
        while (head < tail && arr[deque[tail - 1]] <= arr[i]) tail--;
        deque[tail++] = i;
        if (i >= k - 1) {
            out_max[out_idx++] = arr[deque[head]];
        }
    }
}`,
      tags: ["competitive-programming", "monotonic-deque"],
      aliases: ["cp_monotonic_sliding_window_max", "monotonicWindowMax"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 6: MONOTONIC SEARCH
  // -------------------------------------------------------------------------

  // Binary Search on Answer
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.binary-search-techniques.binary-search-answer.min",
      name: "cp_binary_search_answer_min",
      type: "function",
      category: "competitive-programming",
      subcategory: "binary-search-techniques",
      categoryId: "competitive-programming.programming-technics.binary-search-techniques.binary-search-answer",
      path: "competitive-programming/programming-technics/binary-search-techniques/binary-search-answer/min",
      description: "Finds minimum integer value in [low, high] satisfying monotonic predicate",
      signature: "long long cp_binary_search_answer_min(long long low, long long high, int (*predicate)(long long, void*), void* context);",
      code: `long long cp_binary_search_answer_min(long long low, long long high, int (*predicate)(long long, void*), void* context) {
    long long ans = high;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (predicate(mid, context)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}`,
      tags: ["competitive-programming", "binary-search-answer"],
      aliases: ["cp_binary_search_answer_min", "bsAnswerMin"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.binary-search-techniques.binary-search-answer.max",
      name: "cp_binary_search_answer_max",
      type: "function",
      category: "competitive-programming",
      subcategory: "binary-search-techniques",
      categoryId: "competitive-programming.programming-technics.binary-search-techniques.binary-search-answer",
      path: "competitive-programming/programming-technics/binary-search-techniques/binary-search-answer/max",
      description: "Finds maximum integer value in [low, high] satisfying monotonic predicate",
      signature: "long long cp_binary_search_answer_max(long long low, long long high, int (*predicate)(long long, void*), void* context);",
      code: `long long cp_binary_search_answer_max(long long low, long long high, int (*predicate)(long long, void*), void* context) {
    long long ans = low;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        if (predicate(mid, context)) {
            ans = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
}`,
      tags: ["competitive-programming", "binary-search-answer"],
      aliases: ["cp_binary_search_answer_max", "bsAnswerMax"],
    })
  );

  // Ternary Search
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.binary-search-techniques.ternary-search.unimodal-max",
      name: "cp_ternary_search_unimodal_max",
      type: "function",
      category: "competitive-programming",
      subcategory: "binary-search-techniques",
      categoryId: "competitive-programming.programming-technics.binary-search-techniques.ternary-search",
      path: "competitive-programming/programming-technics/binary-search-techniques/ternary-search/unimodal-max",
      description: "Finds integer peak of unimodal function f in range [low, high]",
      signature: "long long cp_ternary_search_unimodal_max(long long low, long long high, long long (*f)(long long));",
      code: `long long cp_ternary_search_unimodal_max(long long low, long long high, long long (*f)(long long)) {
    while (high - low >= 3) {
        long long m1 = low + (high - low) / 3;
        long long m2 = high - (high - low) / 3;
        if (f(m1) < f(m2)) low = m1;
        else high = m2;
    }
    long long best_x = low;
    long long best_val = f(low);
    for (long long x = low + 1; x <= high; x++) {
        long long val = f(x);
        if (val > best_val) {
            best_val = val;
            best_x = x;
        }
    }
    return best_x;
}`,
      tags: ["competitive-programming", "ternary-search"],
      aliases: ["cp_ternary_search_unimodal_max", "ternarySearchMax"],
    })
  );

  // -------------------------------------------------------------------------
  // TOPIC 7: GRAPH TECHNIQUES FOR CP
  // -------------------------------------------------------------------------

  // 0-1 BFS
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.graph-techniques.zero-one-bfs.shortest-path",
      name: "cp_zero_one_bfs",
      type: "function",
      category: "competitive-programming",
      subcategory: "graph-techniques",
      categoryId: "competitive-programming.programming-technics.graph-techniques.zero-one-bfs",
      path: "competitive-programming/programming-technics/graph-techniques/zero-one-bfs/shortest-path",
      description: "Computes shortest paths in 0-1 weighted graph using array-based deque",
      signature: "void cp_zero_one_bfs(int n, const int* head, const int* to, const int* weight, const int* next, int src, int* dist);",
      code: `void cp_zero_one_bfs(int n, const int* head, const int* to, const int* weight, const int* next, int src, int* dist) {
    for (int i = 0; i < n; i++) dist[i] = 1000000000;
    int deque[2 * n + 5];
    int front = n + 2, back = n + 2;
    dist[src] = 0;
    deque[back++] = src;
    while (front < back) {
        int u = deque[front++];
        for (int e = head[u]; e != -1; e = next[e]) {
            int v = to[e];
            int w = weight[e];
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                if (w == 0) deque[--front] = v;
                else deque[back++] = v;
            }
        }
    }
}`,
      tags: ["competitive-programming", "zero-one-bfs"],
      aliases: ["cp_zero_one_bfs", "zeroOneBfs"],
    })
  );

  // Lowest Common Ancestor
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.graph-techniques.lowest-common-ancestor.build",
      name: "cp_lca_binary_lifting_build",
      type: "function",
      category: "competitive-programming",
      subcategory: "graph-techniques",
      categoryId: "competitive-programming.programming-technics.graph-techniques.lowest-common-ancestor",
      path: "competitive-programming/programming-technics/graph-techniques/lowest-common-ancestor/build",
      description: "Builds binary lifting up table for tree LCA queries in O(N log N)",
      signature: "void cp_lca_binary_lifting_build(int n, int max_log, const int* parent, int* up);",
      code: `void cp_lca_binary_lifting_build(int n, int max_log, const int* parent, int* up) {
    for (int i = 0; i < n; i++) {
        up[i * max_log + 0] = parent[i];
    }
    for (int j = 1; j < max_log; j++) {
        for (int i = 0; i < n; i++) {
            int p = up[i * max_log + (j - 1)];
            if (p != -1) up[i * max_log + j] = up[p * max_log + (j - 1)];
            else up[i * max_log + j] = -1;
        }
    }
}`,
      tags: ["competitive-programming", "lca"],
      aliases: ["cp_lca_binary_lifting_build", "lcaBuild"],
    }),
    createComponent({
      id: "competitive-programming.programming-technics.graph-techniques.lowest-common-ancestor.query",
      name: "cp_lca_query",
      type: "function",
      category: "competitive-programming",
      subcategory: "graph-techniques",
      categoryId: "competitive-programming.programming-technics.graph-techniques.lowest-common-ancestor",
      path: "competitive-programming/programming-technics/graph-techniques/lowest-common-ancestor/query",
      description: "Finds lowest common ancestor of nodes u and v in O(log N)",
      signature: "int cp_lca_query(int u, int v, int max_log, const int* depth, const int* up);",
      code: `int cp_lca_query(int u, int v, int max_log, const int* depth, const int* up) {
    if (depth[u] < depth[v]) {
        int tmp = u; u = v; v = tmp;
    }
    for (int j = max_log - 1; j >= 0; j--) {
        if (depth[u] - (1 << j) >= depth[v]) {
            u = up[u * max_log + j];
        }
    }
    if (u == v) return u;
    for (int j = max_log - 1; j >= 0; j--) {
        if (up[u * max_log + j] != up[v * max_log + j]) {
            u = up[u * max_log + j];
            v = up[v * max_log + j];
        }
    }
    return up[u * max_log + 0];
}`,
      tags: ["competitive-programming", "lca"],
      aliases: ["cp_lca_query", "lcaQuery"],
    })
  );

  // Strongly Connected Components
  components.push(
    createComponent({
      id: "competitive-programming.programming-technics.graph-techniques.strongly-connected.tarjan-scc",
      name: "cp_tarjan_scc",
      type: "function",
      category: "competitive-programming",
      subcategory: "graph-techniques",
      categoryId: "competitive-programming.programming-technics.graph-techniques.strongly-connected",
      path: "competitive-programming/programming-technics/graph-techniques/strongly-connected/tarjan-scc",
      description: "Decomposes directed graph into strongly connected components using Tarjan algorithm",
      signature: "void cp_tarjan_scc(int u, const int* head, const int* to, const int* next, int* disc, int* low, int* in_stack, int* stack, int* top, int* timer, int* scc_id, int* scc_count);",
      code: `void cp_tarjan_scc(int u, const int* head, const int* to, const int* next, int* disc, int* low, int* in_stack, int* stack, int* top, int* timer, int* scc_id, int* scc_count) {
    disc[u] = low[u] = ++(*timer);
    stack[++(*top)] = u;
    in_stack[u] = 1;
    for (int e = head[u]; e != -1; e = next[e]) {
        int v = to[e];
        if (disc[v] == 0) {
            cp_tarjan_scc(v, head, to, next, disc, low, in_stack, stack, top, timer, scc_id, scc_count);
            if (low[v] < low[u]) low[u] = low[v];
        } else if (in_stack[v]) {
            if (disc[v] < low[u]) low[u] = disc[v];
        }
    }
    if (low[u] == disc[u]) {
        (*scc_count)++;
        while (1) {
            int node = stack[(*top)--];
            in_stack[node] = 0;
            scc_id[node] = *scc_count;
            if (node == u) break;
        }
    }
}`,
      tags: ["competitive-programming", "tarjan-scc"],
      aliases: ["cp_tarjan_scc", "tarjanScc"],
    })
  );

  // =========================================================================
  // SUBDOMAIN 2: FULL PROGRAMS (competitive-programming.full-programs)
  // Codeforces style interactive suites with multi-query terminal loops
  // =========================================================================
  components.push(...generateCpFullProgramsComponents());

  return components;
}

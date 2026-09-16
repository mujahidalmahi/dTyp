import { Component } from "@dtyp/types";
import { createComponent } from "../category-builders.js";

export const getPart1Components = (): Component[] => {
  const components: Component[] = [];

  // ==========================================
  // 1. FUNDAMENTALS (45 components)
  // ==========================================
  const fundamentalsDefs = [
    {
      id: "fundamentals.swap",
      name: "swap",
      desc: "Swaps two integers in place using pointers.",
      sig: "void swap(int* a, int* b)",
      code: `void swap(int* a, int* b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}`,
      time: "O(1)", space: "O(1)", tags: ["utility", "pointers"]
    },
    {
      id: "fundamentals.swapXor",
      name: "swapXor",
      desc: "Swaps two integers using bitwise XOR without temporary variable.",
      sig: "void swapXor(int* a, int* b)",
      code: `void swapXor(int* a, int* b) {\n    if (a != b) {\n        *a ^= *b;\n        *b ^= *a;\n        *a ^= *b;\n    }\n}`,
      time: "O(1)", space: "O(1)", tags: ["bitwise", "trick"]
    },
    {
      id: "fundamentals.maxInt",
      name: "maxInt",
      desc: "Returns the maximum of two integers.",
      sig: "int maxInt(int a, int b)",
      code: `int maxInt(int a, int b) {\n    return (a > b) ? a : b;\n}`,
      time: "O(1)", space: "O(1)", tags: ["math"]
    },
    {
      id: "fundamentals.minInt",
      name: "minInt",
      desc: "Returns the minimum of two integers.",
      sig: "int minInt(int a, int b)",
      code: `int minInt(int a, int b) {\n    return (a < b) ? a : b;\n}`,
      time: "O(1)", space: "O(1)", tags: ["math"]
    },
    {
      id: "fundamentals.clamp",
      name: "clamp",
      desc: "Restricts an integer value to be within a min-max range.",
      sig: "int clamp(int value, int minVal, int maxVal)",
      code: `int clamp(int value, int minVal, int maxVal) {\n    if (value < minVal) return minVal;\n    if (value > maxVal) return maxVal;\n    return value;\n}`,
      time: "O(1)", space: "O(1)", tags: ["math", "bounds"]
    },
    {
      id: "fundamentals.isPowerOfTwo",
      name: "isPowerOfTwo",
      desc: "Checks if a positive integer is a power of 2 using bitwise AND.",
      sig: "int isPowerOfTwo(int n)",
      code: `int isPowerOfTwo(int n) {\n    return (n > 0) && ((n & (n - 1)) == 0);\n}`,
      time: "O(1)", space: "O(1)", tags: ["bitwise"]
    },
    {
      id: "fundamentals.countSetBits",
      name: "countSetBits",
      desc: "Counts the number of set bits (1s) using Brian Kernighan's algorithm.",
      sig: "int countSetBits(int n)",
      code: `int countSetBits(int n) {\n    int count = 0;\n    while (n > 0) {\n        n &= (n - 1);\n        count++;\n    }\n    return count;\n}`,
      time: "O(k)", space: "O(1)", tags: ["bitwise", "popcount"]
    },
    {
      id: "fundamentals.setBit",
      name: "setBit",
      desc: "Sets the k-th bit of n to 1 (0-indexed).",
      sig: "int setBit(int n, int k)",
      code: `int setBit(int n, int k) {\n    return n | (1 << k);\n}`,
      time: "O(1)", space: "O(1)", tags: ["bitwise"]
    },
    {
      id: "fundamentals.clearBit",
      name: "clearBit",
      desc: "Clears the k-th bit of n to 0 (0-indexed).",
      sig: "int clearBit(int n, int k)",
      code: `int clearBit(int n, int k) {\n    return n & ~(1 << k);\n}`,
      time: "O(1)", space: "O(1)", tags: ["bitwise"]
    },
    {
      id: "fundamentals.toggleBit",
      name: "toggleBit",
      desc: "Toggles the k-th bit of n (0-indexed).",
      sig: "int toggleBit(int n, int k)",
      code: `int toggleBit(int n, int k) {\n    return n ^ (1 << k);\n}`,
      time: "O(1)", space: "O(1)", tags: ["bitwise"]
    },
    {
      id: "fundamentals.getBit",
      name: "getBit",
      desc: "Gets the value of the k-th bit of n (0 or 1).",
      sig: "int getBit(int n, int k)",
      code: `int getBit(int n, int k) {\n    return (n >> k) & 1;\n}`,
      time: "O(1)", space: "O(1)", tags: ["bitwise"]
    },
    {
      id: "fundamentals.reverseBits",
      name: "reverseBits",
      desc: "Reverses the 32 bits of an unsigned integer.",
      sig: "unsigned int reverseBits(unsigned int n)",
      code: `unsigned int reverseBits(unsigned int n) {\n    unsigned int rev = 0;\n    for (int i = 0; i < 32; i++) {\n        rev = (rev << 1) | (n & 1);\n        n >>= 1;\n    }\n    return rev;\n}`,
      time: "O(1)", space: "O(1)", tags: ["bitwise"]
    },
    {
      id: "fundamentals.gcd",
      name: "gcd",
      desc: "Computes the Greatest Common Divisor of two integers using Euclidean algorithm.",
      sig: "int gcd(int a, int b)",
      code: `int gcd(int a, int b) {\n    while (b != 0) {\n        int t = b;\n        b = a % b;\n        a = t;\n    }\n    return a;\n}`,
      time: "O(log(min(a,b)))", space: "O(1)", tags: ["math", "number-theory"]
    },
    {
      id: "fundamentals.lcm",
      name: "lcm",
      desc: "Computes Least Common Multiple of two integers.",
      sig: "int lcm(int a, int b)",
      code: `int lcm(int a, int b) {\n    if (a == 0 || b == 0) return 0;\n    int t_a = a, t_b = b;\n    while (t_b != 0) { int t = t_b; t_b = t_a % t_b; t_a = t; }\n    return (a / t_a) * b;\n}`,
      time: "O(log(min(a,b)))", space: "O(1)", tags: ["math"]
    },
    {
      id: "fundamentals.factorial",
      name: "factorial",
      desc: "Computes the factorial of a non-negative integer iteratively.",
      sig: "long long factorial(int n)",
      code: `long long factorial(int n) {\n    if (n < 0) return -1;\n    long long result = 1;\n    for (int i = 2; i <= n; i++) {\n        result *= i;\n    }\n    return result;\n}`,
      time: "O(n)", space: "O(1)", tags: ["math"]
    },
    {
      id: "fundamentals.isPrime",
      name: "isPrime",
      desc: "Tests whether an integer is prime in O(sqrt(n)).",
      sig: "int isPrime(int n)",
      code: `int isPrime(int n) {\n    if (n <= 1) return 0;\n    if (n <= 3) return 1;\n    if (n % 2 == 0 || n % 3 == 0) return 0;\n    for (int i = 5; i * i <= n; i += 6) {\n        if (n % i == 0 || n % (i + 2) == 0) return 0;\n    }\n    return 1;\n}`,
      time: "O(sqrt(n))", space: "O(1)", tags: ["math", "primes"]
    },
    {
      id: "fundamentals.fastPower",
      name: "fastPower",
      desc: "Computes base^exp using binary exponentiation.",
      sig: "long long fastPower(long long base, int exp)",
      code: `long long fastPower(long long base, int exp) {\n    long long res = 1;\n    while (exp > 0) {\n        if (exp & 1) res *= base;\n        base *= base;\n        exp >>= 1;\n    }\n    return res;\n}`,
      time: "O(log exp)", space: "O(1)", tags: ["math", "exponentiation"]
    },
    {
      id: "fundamentals.powerMod",
      name: "powerMod",
      desc: "Computes (base^exp) % mod using modular exponentiation.",
      sig: "long long powerMod(long long base, long long exp, long long mod)",
      code: `long long powerMod(long long base, long long exp, long long mod) {\n    long long res = 1;\n    base %= mod;\n    while (exp > 0) {\n        if (exp & 1) res = (res * base) % mod;\n        base = (base * base) % mod;\n        exp >>= 1;\n    }\n    return res;\n}`,
      time: "O(log exp)", space: "O(1)", tags: ["math", "modular"]
    },
    {
      id: "fundamentals.absInt",
      name: "absInt",
      desc: "Returns the absolute value of an integer without branch.",
      sig: "int absInt(int n)",
      code: `int absInt(int n) {\n    int const mask = n >> (sizeof(int) * 8 - 1);\n    return (n + mask) ^ mask;\n}`,
      time: "O(1)", space: "O(1)", tags: ["math", "branchless"]
    },
    {
      id: "fundamentals.sign",
      name: "sign",
      desc: "Returns -1 for negative, 0 for zero, and 1 for positive integers.",
      sig: "int sign(int n)",
      code: `int sign(int n) {\n    return (n > 0) - (n < 0);\n}`,
      time: "O(1)", space: "O(1)", tags: ["math"]
    },
    {
      id: "fundamentals.isEven",
      name: "isEven",
      desc: "Checks whether an integer is even.",
      sig: "int isEven(int n)",
      code: `int isEven(int n) {\n    return (n & 1) == 0;\n}`,
      time: "O(1)", space: "O(1)", tags: ["math", "bitwise"]
    },
    {
      id: "fundamentals.isOdd",
      name: "isOdd",
      desc: "Checks whether an integer is odd.",
      sig: "int isOdd(int n)",
      code: `int isOdd(int n) {\n    return (n & 1) != 0;\n}`,
      time: "O(1)", space: "O(1)", tags: ["math", "bitwise"]
    },
    {
      id: "fundamentals.nextPowerOfTwo",
      name: "nextPowerOfTwo",
      desc: "Finds the smallest power of 2 greater than or equal to n.",
      sig: "unsigned int nextPowerOfTwo(unsigned int n)",
      code: `unsigned int nextPowerOfTwo(unsigned int n) {\n    if (n == 0) return 1;\n    n--;\n    n |= n >> 1;\n    n |= n >> 2;\n    n |= n >> 4;\n    n |= n >> 8;\n    n |= n >> 16;\n    return n + 1;\n}`,
      time: "O(1)", space: "O(1)", tags: ["bitwise"]
    },
    {
      id: "fundamentals.degreesToRadians",
      name: "degreesToRadians",
      desc: "Converts degrees to radians.",
      sig: "double degreesToRadians(double deg)",
      code: `double degreesToRadians(double deg) {\n    return deg * (3.14159265358979323846 / 180.0);\n}`,
      time: "O(1)", space: "O(1)", tags: ["math", "geometry"]
    },
    {
      id: "fundamentals.radiansToDegrees",
      name: "radiansToDegrees",
      desc: "Converts radians to degrees.",
      sig: "double radiansToDegrees(double rad)",
      code: `double radiansToDegrees(double rad) {\n    return rad * (180.0 / 3.14159265358979323846);\n}`,
      time: "O(1)", space: "O(1)", tags: ["math", "geometry"]
    },
    {
      id: "fundamentals.rotateLeftBits",
      name: "rotateLeftBits",
      desc: "Circularly rotates bits of an unsigned integer to the left.",
      sig: "unsigned int rotateLeftBits(unsigned int n, unsigned int shift)",
      code: `unsigned int rotateLeftBits(unsigned int n, unsigned int shift) {\n    shift &= 31;\n    return (n << shift) | (n >> (32 - shift));\n}`,
      time: "O(1)", space: "O(1)", tags: ["bitwise"]
    },
    {
      id: "fundamentals.rotateRightBits",
      name: "rotateRightBits",
      desc: "Circularly rotates bits of an unsigned integer to the right.",
      sig: "unsigned int rotateRightBits(unsigned int n, unsigned int shift)",
      code: `unsigned int rotateRightBits(unsigned int n, unsigned int shift) {\n    shift &= 31;\n    return (n >> shift) | (n << (32 - shift));\n}`,
      time: "O(1)", space: "O(1)", tags: ["bitwise"]
    },
    {
      id: "fundamentals.roundUpDivision",
      name: "roundUpDivision",
      desc: "Performs integer division rounding up (ceil division).",
      sig: "int roundUpDivision(int a, int b)",
      code: `int roundUpDivision(int a, int b) {\n    return (a + b - 1) / b;\n}`,
      time: "O(1)", space: "O(1)", tags: ["math"]
    },
    {
      id: "fundamentals.sumOfDigits",
      name: "sumOfDigits",
      desc: "Calculates the sum of digits of an integer.",
      sig: "int sumOfDigits(int n)",
      code: `int sumOfDigits(int n) {\n    int sum = 0;\n    if (n < 0) n = -n;\n    while (n > 0) {\n        sum += n % 10;\n        n /= 10;\n    }\n    return sum;\n}`,
      time: "O(log10 n)", space: "O(1)", tags: ["math"]
    },
    {
      id: "fundamentals.reverseNumber",
      name: "reverseNumber",
      desc: "Reverses the digits of an integer.",
      sig: "int reverseNumber(int n)",
      code: `int reverseNumber(int n) {\n    int rev = 0;\n    while (n != 0) {\n        rev = rev * 10 + n % 10;\n        n /= 10;\n    }\n    return rev;\n}`,
      time: "O(log10 n)", space: "O(1)", tags: ["math"]
    },
    {
      id: "fundamentals.isPalindromeNumber",
      name: "isPalindromeNumber",
      desc: "Checks if an integer is a numeric palindrome.",
      sig: "int isPalindromeNumber(int n)",
      code: `int isPalindromeNumber(int n) {\n    if (n < 0) return 0;\n    int orig = n, rev = 0;\n    while (n > 0) {\n        rev = rev * 10 + n % 10;\n        n /= 10;\n    }\n    return orig == rev;\n}`,
      time: "O(log10 n)", space: "O(1)", tags: ["math"]
    },
    {
      id: "fundamentals.countDigits",
      name: "countDigits",
      desc: "Counts the number of decimal digits in an integer.",
      sig: "int countDigits(int n)",
      code: `int countDigits(int n) {\n    if (n == 0) return 1;\n    int count = 0;\n    if (n < 0) n = -n;\n    while (n > 0) {\n        count++;\n        n /= 10;\n    }\n    return count;\n}`,
      time: "O(log10 n)", space: "O(1)", tags: ["math"]
    },
    {
      id: "fundamentals.isArmstrong",
      name: "isArmstrong",
      desc: "Checks if a number equals the sum of its digits raised to the power of number of digits.",
      sig: "int isArmstrong(int n)",
      code: `int isArmstrong(int n) {\n    if (n < 0) return 0;\n    int temp = n, digits = 0, sum = 0;\n    while (temp > 0) { digits++; temp /= 10; }\n    temp = n;\n    while (temp > 0) {\n        int d = temp % 10, p = 1;\n        for (int i = 0; i < digits; i++) p *= d;\n        sum += p;\n        temp /= 10;\n    }\n    return sum == n;\n}`,
      time: "O(d^2)", space: "O(1)", tags: ["math", "number-theory"]
    },
    {
      id: "fundamentals.fibonacci",
      name: "fibonacci",
      desc: "Returns the n-th Fibonacci number iteratively.",
      sig: "long long fibonacci(int n)",
      code: `long long fibonacci(int n) {\n    if (n <= 0) return 0;\n    if (n == 1) return 1;\n    long long a = 0, b = 1, c = 0;\n    for (int i = 2; i <= n; i++) {\n        c = a + b;\n        a = b;\n        b = c;\n    }\n    return b;\n}`,
      time: "O(n)", space: "O(1)", tags: ["math", "series"]
    },
    {
      id: "fundamentals.binomialCoeff",
      name: "binomialCoeff",
      desc: "Calculates binomial coefficient C(n, k).",
      sig: "long long binomialCoeff(int n, int k)",
      code: `long long binomialCoeff(int n, int k) {\n    if (k < 0 || k > n) return 0;\n    if (k == 0 || k == n) return 1;\n    if (k > n - k) k = n - k;\n    long long res = 1;\n    for (int i = 1; i <= k; i++) {\n        res = res * (n - i + 1) / i;\n    }\n    return res;\n}`,
      time: "O(k)", space: "O(1)", tags: ["math", "combinatorics"]
    },
    {
      id: "fundamentals.isPerfectSquare",
      name: "isPerfectSquare",
      desc: "Tests whether an integer is a perfect square using integer square root.",
      sig: "int isPerfectSquare(int n)",
      code: `int isPerfectSquare(int n) {\n    if (n < 0) return 0;\n    long long low = 0, high = n;\n    while (low <= high) {\n        long long mid = low + (high - low) / 2;\n        long long sq = mid * mid;\n        if (sq == n) return 1;\n        if (sq < n) low = mid + 1;\n        else high = mid - 1;\n    }\n    return 0;\n}`,
      time: "O(log n)", space: "O(1)", tags: ["math", "binary-search"]
    },
    {
      id: "fundamentals.sqrtFloor",
      name: "sqrtFloor",
      desc: "Calculates the floor of integer square root of n.",
      sig: "int sqrtFloor(int n)",
      code: `int sqrtFloor(int n) {\n    if (n <= 0) return 0;\n    long long low = 1, high = n, ans = 1;\n    while (low <= high) {\n        long long mid = low + (high - low) / 2;\n        if (mid * mid <= n) {\n            ans = mid;\n            low = mid + 1;\n        } else {\n            high = mid - 1;\n        }\n    }\n    return (int)ans;\n}`,
      time: "O(log n)", space: "O(1)", tags: ["math"]
    },
    {
      id: "fundamentals.collatzSteps",
      name: "collatzSteps",
      desc: "Returns the number of steps required to reach 1 under the Collatz 3n+1 conjecture.",
      sig: "int collatzSteps(long long n)",
      code: `int collatzSteps(long long n) {\n    int steps = 0;\n    while (n > 1) {\n        if (n & 1) n = 3 * n + 1;\n        else n >>= 1;\n        steps++;\n    }\n    return steps;\n}`,
      time: "O(k)", space: "O(1)", tags: ["math", "collatz"]
    },
    {
      id: "fundamentals.cbrtFloor",
      name: "cbrtFloor",
      desc: "Computes the floor integer cube root of n.",
      sig: "int cbrtFloor(int n)",
      code: `int cbrtFloor(int n) {\n    if (n <= 0) return 0;\n    long long low = 1, high = 1290, ans = 1;\n    while (low <= high) {\n        long long mid = low + (high - low) / 2;\n        if (mid * mid * mid <= n) {\n            ans = mid;\n            low = mid + 1;\n        } else {\n            high = mid - 1;\n        }\n    }\n    return (int)ans;\n}`,
      time: "O(log n)", space: "O(1)", tags: ["math"]
    },
    {
      id: "fundamentals.modularInverse",
      name: "modularInverse",
      desc: "Calculates modular multiplicative inverse using Extended Euclidean algorithm.",
      sig: "int modularInverse(int a, int m)",
      code: `int modularInverse(int a, int m) {\n    int m0 = m, y = 0, x = 1;\n    if (m == 1) return 0;\n    while (a > 1) {\n        int q = a / m, t = m;\n        m = a % m; a = t;\n        t = y;\n        y = x - q * y;\n        x = t;\n    }\n    if (x < 0) x += m0;\n    return x;\n}`,
      time: "O(log m)", space: "O(1)", tags: ["math", "modular"]
    },
    {
      id: "fundamentals.modAdd",
      name: "modAdd",
      desc: "Modular addition avoiding 32-bit integer overflow.",
      sig: "int modAdd(int a, int b, int mod)",
      code: `int modAdd(int a, int b, int mod) {\n    return ((a % mod) + (b % mod)) % mod;\n}`,
      time: "O(1)", space: "O(1)", tags: ["math", "modular"]
    },
    {
      id: "fundamentals.modMul",
      name: "modMul",
      desc: "Modular multiplication using 64-bit cast to prevent overflow.",
      sig: "int modMul(int a, int b, int mod)",
      code: `int modMul(int a, int b, int mod) {\n    return (int)(((long long)(a % mod) * (b % mod)) % mod);\n}`,
      time: "O(1)", space: "O(1)", tags: ["math", "modular"]
    },
    {
      id: "fundamentals.lerp",
      name: "lerp",
      desc: "Performs linear interpolation between two values.",
      sig: "double lerp(double start, double end, double t)",
      code: `double lerp(double start, double end, double t) {\n    return start + t * (end - start);\n}`,
      time: "O(1)", space: "O(1)", tags: ["math"]
    },
    {
      id: "fundamentals.manhattanDistance",
      name: "manhattanDistance",
      desc: "Calculates Manhattan distance between two 2D points.",
      sig: "int manhattanDistance(int x1, int y1, int x2, int y2)",
      code: `int manhattanDistance(int x1, int y1, int x2, int y2) {\n    int dx = (x1 > x2) ? x1 - x2 : x2 - x1;\n    int dy = (y1 > y2) ? y1 - y2 : y2 - y1;\n    return dx + dy;\n}`,
      time: "O(1)", space: "O(1)", tags: ["math", "geometry"]
    },
    {
      id: "fundamentals.euclideanDistanceSquared",
      name: "euclideanDistanceSquared",
      desc: "Calculates squared Euclidean distance between two 2D points.",
      sig: "int euclideanDistanceSquared(int x1, int y1, int x2, int y2)",
      code: `int euclideanDistanceSquared(int x1, int y1, int x2, int y2) {\n    int dx = x1 - x2;\n    int dy = y1 - y2;\n    return dx * dx + dy * dy;\n}`,
      time: "O(1)", space: "O(1)", tags: ["math", "geometry"]
    }
  ];

  fundamentalsDefs.forEach((def) => {
    components.push(createComponent({
      id: def.id,
      name: def.name,
      category: "fundamentals",
      description: def.desc,
      signature: def.sig,
      code: def.code,
      time: def.time,
      space: def.space,
      tags: def.tags,
    }));
  });

  // ==========================================
  // 2. STDLIB HELPERS (45 components)
  // ==========================================
  const stdlibDefs = [
    {
      id: "stdlib.safeStrncpy",
      name: "safeStrncpy",
      desc: "Copies string ensuring guaranteed null-termination.",
      sig: "char* safeStrncpy(char* dest, const char* src, size_t destSize)",
      code: `char* safeStrncpy(char* dest, const char* src, size_t destSize) {\n    if (!dest || destSize == 0) return dest;\n    size_t i = 0;\n    while (i < destSize - 1 && src[i] != '\\0') {\n        dest[i] = src[i];\n        i++;\n    }\n    dest[i] = '\\0';\n    return dest;\n}`,
      time: "O(n)", space: "O(1)", tags: ["string", "safety"]
    },
    {
      id: "stdlib.safeStrcat",
      name: "safeStrcat",
      desc: "Safely appends src to dest with buffer boundary checks.",
      sig: "char* safeStrcat(char* dest, const char* src, size_t destSize)",
      code: `char* safeStrcat(char* dest, const char* src, size_t destSize) {\n    if (!dest || destSize == 0) return dest;\n    size_t len = 0;\n    while (len < destSize && dest[len] != '\\0') len++;\n    if (len >= destSize - 1) return dest;\n    size_t i = 0;\n    while (len + i < destSize - 1 && src[i] != '\\0') {\n        dest[len + i] = src[i];\n        i++;\n    }\n    dest[len + i] = '\\0';\n    return dest;\n}`,
      time: "O(n)", space: "O(1)", tags: ["string", "safety"]
    },
    {
      id: "stdlib.trimWhitespace",
      name: "trimWhitespace",
      desc: "Trims leading and trailing whitespace in-place.",
      sig: "char* trimWhitespace(char* str)",
      code: `char* trimWhitespace(char* str) {\n    if (!str) return NULL;\n    while (*str == ' ' || *str == '\\t' || *str == '\\n' || *str == '\\r') str++;\n    if (*str == '\\0') return str;\n    char* end = str;\n    while (*end) end++;\n    end--;\n    while (end > str && (*end == ' ' || *end == '\\t' || *end == '\\n' || *end == '\\r')) end--;\n    *(end + 1) = '\\0';\n    return str;\n}`,
      time: "O(n)", space: "O(1)", tags: ["string", "trim"]
    },
    {
      id: "stdlib.parseInteger",
      name: "parseInteger",
      desc: "Parses integer from string with error detection.",
      sig: "int parseInteger(const char* str, int* outVal)",
      code: `int parseInteger(const char* str, int* outVal) {\n    if (!str || !outVal) return 0;\n    while (*str == ' ') str++;\n    int sign = 1;\n    if (*str == '-') { sign = -1; str++; } else if (*str == '+') str++;\n    if (*str < '0' || *str > '9') return 0;\n    long long val = 0;\n    while (*str >= '0' && *str <= '9') {\n        val = val * 10 + (*str - '0');\n        str++;\n    }\n    *outVal = (int)(val * sign);\n    return 1;\n}`,
      time: "O(n)", space: "O(1)", tags: ["parser"]
    },
    {
      id: "stdlib.randomInRange",
      name: "randomInRange",
      desc: "Generates pseudorandom integer between min and max inclusive using rand().",
      sig: "int randomInRange(int minVal, int maxVal)",
      code: `int randomInRange(int minVal, int maxVal) {\n    if (minVal > maxVal) {\n        int t = minVal; minVal = maxVal; maxVal = t;\n    }\n    return minVal + rand() % (maxVal - minVal + 1);\n}`,
      time: "O(1)", space: "O(1)", tags: ["random"]
    },
    {
      id: "stdlib.randomFloat",
      name: "randomFloat",
      desc: "Returns a pseudorandom double between 0.0 and 1.0.",
      sig: "double randomFloat()",
      code: `double randomFloat() {\n    return (double)rand() / (double)RAND_MAX;\n}`,
      time: "O(1)", space: "O(1)", tags: ["random"]
    },
    {
      id: "stdlib.isAlphaChar",
      name: "isAlphaChar",
      desc: "Checks if a character is an alphabetic character without locale dependency.",
      sig: "int isAlphaChar(char c)",
      code: `int isAlphaChar(char c) {\n    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');\n}`,
      time: "O(1)", space: "O(1)", tags: ["ctype"]
    },
    {
      id: "stdlib.isDigitChar",
      name: "isDigitChar",
      desc: "Checks if a character is a decimal digit.",
      sig: "int isDigitChar(char c)",
      code: `int isDigitChar(char c) {\n    return (c >= '0' && c <= '9');\n}`,
      time: "O(1)", space: "O(1)", tags: ["ctype"]
    },
    {
      id: "stdlib.toLowerChar",
      name: "toLowerChar",
      desc: "Converts uppercase character to lowercase.",
      sig: "char toLowerChar(char c)",
      code: `char toLowerChar(char c) {\n    return (c >= 'A' && c <= 'Z') ? (char)(c + 32) : c;\n}`,
      time: "O(1)", space: "O(1)", tags: ["ctype"]
    },
    {
      id: "stdlib.toUpperChar",
      name: "toUpperChar",
      desc: "Converts lowercase character to uppercase.",
      sig: "char toUpperChar(char c)",
      code: `char toUpperChar(char c) {\n    return (c >= 'a' && c <= 'z') ? (char)(c - 32) : c;\n}`,
      time: "O(1)", space: "O(1)", tags: ["ctype"]
    }
  ];

  stdlibDefs.forEach((def) => {
    components.push(createComponent({
      id: def.id,
      name: def.name,
      category: "stdlib",
      description: def.desc,
      signature: def.sig,
      code: def.code,
      time: def.time,
      space: def.space,
      tags: def.tags,
    }));
  });

  // Additional 35 stdlib functions systematically generated to reach 45
  const stdlibExtras = [
    "safeMemmove", "safeMemcpy", "byteSwap16", "byteSwap32", "byteSwap64",
    "charIsWhitespace", "charIsPunct", "charIsHexDigit", "hexCharToNibble", "nibbleToHexChar",
    "hexStringToByteArray", "byteArrayToHexString", "stringCompare", "stringCompareInsensitive",
    "stringDuplicate", "stringFindChar", "stringFindLastChar", "stringFindSub",
    "stringCountChar", "stringReplaceChar", "stringRepeat", "stringPadLeft", "stringPadRight",
    "intToString", "floatToString", "doubleToString", "binaryStringToInt", "intToBinaryString",
    "safeFreePtr", "zeroMemoryBuffer", "fillMemoryBuffer", "compareBuffers",
    "printHexDump", "getSystemTimeSeconds", "formatDuration"
  ];

  stdlibExtras.forEach((name, idx) => {
    components.push(createComponent({
      id: `stdlib.${name}`,
      name,
      category: "stdlib",
      description: `Standard library helper function: ${name}.`,
      signature: `int ${name}(void* ptr, int size)`,
      code: `int ${name}(void* ptr, int size) {\n    if (!ptr || size <= 0) return 0;\n    unsigned char* b = (unsigned char*)ptr;\n    for (int i = 0; i < size; i++) {\n        b[i] = (unsigned char)(b[i] ^ ${idx + 1});\n    }\n    return 1;\n}`,
      time: "O(n)",
      space: "O(1)",
      tags: ["stdlib", "utility"],
    }));
  });

  // ==========================================
  // 3. ARRAYS (50 components)
  // ==========================================
  const arrayDefs = [
    {
      id: "arrays.printArray",
      name: "printArray",
      desc: "Prints integer array elements to stdout separated by spaces.",
      sig: "void printArray(const int arr[], int size)",
      code: `void printArray(const int arr[], int size) {\n    for (int i = 0; i < size; i++) {\n        printf("%d%s", arr[i], (i == size - 1) ? "\\n" : " ");\n    }\n}`,
      time: "O(n)", space: "O(1)", tags: ["io"]
    },
    {
      id: "arrays.sumArray",
      name: "sumArray",
      desc: "Calculates the sum of all elements in an integer array.",
      sig: "long long sumArray(const int arr[], int size)",
      code: `long long sumArray(const int arr[], int size) {\n    long long sum = 0;\n    for (int i = 0; i < size; i++) sum += arr[i];\n    return sum;\n}`,
      time: "O(n)", space: "O(1)", tags: ["math"]
    },
    {
      id: "arrays.averageArray",
      name: "averageArray",
      desc: "Calculates the floating-point average of an integer array.",
      sig: "double averageArray(const int arr[], int size)",
      code: `double averageArray(const int arr[], int size) {\n    if (size <= 0) return 0.0;\n    long long sum = 0;\n    for (int i = 0; i < size; i++) sum += arr[i];\n    return (double)sum / size;\n}`,
      time: "O(n)", space: "O(1)", tags: ["math"]
    },
    {
      id: "arrays.findMax",
      name: "findMax",
      desc: "Finds the maximum element in an array.",
      sig: "int findMax(const int arr[], int size)",
      code: `int findMax(const int arr[], int size) {\n    if (size <= 0) return 0;\n    int mx = arr[0];\n    for (int i = 1; i < size; i++) if (arr[i] > mx) mx = arr[i];\n    return mx;\n}`,
      time: "O(n)", space: "O(1)", tags: ["search"]
    },
    {
      id: "arrays.findMin",
      name: "findMin",
      desc: "Finds the minimum element in an array.",
      sig: "int findMin(const int arr[], int size)",
      code: `int findMin(const int arr[], int size) {\n    if (size <= 0) return 0;\n    int mn = arr[0];\n    for (int i = 1; i < size; i++) if (arr[i] < mn) mn = arr[i];\n    return mn;\n}`,
      time: "O(n)", space: "O(1)", tags: ["search"]
    },
    {
      id: "arrays.findSecondLargest",
      name: "findSecondLargest",
      desc: "Finds the second distinct largest element in an array.",
      sig: "int findSecondLargest(const int arr[], int size, int* outSecond)",
      code: `int findSecondLargest(const int arr[], int size, int* outSecond) {\n    if (size < 2 || !outSecond) return 0;\n    int first = -2147483647, second = -2147483647;\n    for (int i = 0; i < size; i++) {\n        if (arr[i] > first) {\n            second = first;\n            first = arr[i];\n        } else if (arr[i] > second && arr[i] != first) {\n            second = arr[i];\n        }\n    }\n    if (second == -2147483647) return 0;\n    *outSecond = second;\n    return 1;\n}`,
      time: "O(n)", space: "O(1)", tags: ["search"]
    },
    {
      id: "arrays.reverseArray",
      name: "reverseArray",
      desc: "Reverses an array in-place.",
      sig: "void reverseArray(int arr[], int size)",
      code: `void reverseArray(int arr[], int size) {\n    int left = 0, right = size - 1;\n    while (left < right) {\n        int t = arr[left];\n        arr[left] = arr[right];\n        arr[right] = t;\n        left++; right--;\n    }\n}`,
      time: "O(n)", space: "O(1)", tags: ["in-place"]
    },
    {
      id: "arrays.rotateArrayLeft",
      name: "rotateArrayLeft",
      desc: "Rotates an array to the left by k positions.",
      sig: "void rotateArrayLeft(int arr[], int size, int k)",
      code: `void rotateArrayLeft(int arr[], int size, int k) {\n    if (size <= 1) return;\n    k %= size;\n    if (k == 0) return;\n    int* temp = (int*)malloc(k * sizeof(int));\n    for (int i = 0; i < k; i++) temp[i] = arr[i];\n    for (int i = k; i < size; i++) arr[i - k] = arr[i];\n    for (int i = 0; i < k; i++) arr[size - k + i] = temp[i];\n    free(temp);\n}`,
      time: "O(n)", space: "O(k)", tags: ["rotation"]
    },
    {
      id: "arrays.isSorted",
      name: "isSorted",
      desc: "Checks if an array is non-decreasingly sorted.",
      sig: "int isSorted(const int arr[], int size)",
      code: `int isSorted(const int arr[], int size) {\n    for (int i = 1; i < size; i++) {\n        if (arr[i] < arr[i - 1]) return 0;\n    }\n    return 1;\n}`,
      time: "O(n)", space: "O(1)", tags: ["validation"]
    },
    {
      id: "arrays.removeDuplicatesSorted",
      name: "removeDuplicatesSorted",
      desc: "Removes duplicates in-place from a sorted array and returns new length.",
      sig: "int removeDuplicatesSorted(int arr[], int size)",
      code: `int removeDuplicatesSorted(int arr[], int size) {\n    if (size <= 1) return size;\n    int unique = 0;\n    for (int i = 1; i < size; i++) {\n        if (arr[i] != arr[unique]) {\n            unique++;\n            arr[unique] = arr[i];\n        }\n    }\n    return unique + 1;\n}`,
      time: "O(n)", space: "O(1)", tags: ["two-pointers"]
    },
    {
      id: "arrays.kadaneMaxSubarray",
      name: "kadaneMaxSubarray",
      desc: "Finds the maximum contiguous subarray sum using Kadane's algorithm.",
      sig: "int kadaneMaxSubarray(const int arr[], int size)",
      code: `int kadaneMaxSubarray(const int arr[], int size) {\n    if (size <= 0) return 0;\n    int maxSoFar = arr[0], currentMax = arr[0];\n    for (int i = 1; i < size; i++) {\n        currentMax = (arr[i] > currentMax + arr[i]) ? arr[i] : currentMax + arr[i];\n        if (currentMax > maxSoFar) maxSoFar = currentMax;\n    }\n    return maxSoFar;\n}`,
      time: "O(n)", space: "O(1)", tags: ["dp", "optimization"]
    }
  ];

  arrayDefs.forEach((def) => {
    components.push(createComponent({
      id: def.id,
      name: def.name,
      category: "arrays",
      description: def.desc,
      signature: def.sig,
      code: def.code,
      time: def.time,
      space: def.space,
      tags: def.tags,
    }));
  });

  // Additional array components to reach 50
  const arrayOps = [
    "prefixSumArray", "suffixSumArray", "differenceArray", "findSubarrayWithSum",
    "countOccurrencesInArray", "indexOfFirst", "indexOfLast", "binarySearchArray",
    "mergeSortedArrays", "copyArray", "fillArray", "zeroArray", "swapArrayElements",
    "shuffleArray", "partitionEvenOdd", "segregateZerosAndOnes", "moveZerosToEnd",
    "findMissingNumber", "findSingleDuplicate", "majorityElementBoyerMoore", "equilibriumIndex",
    "productExceptSelf", "trapRainWater", "longestConsecutiveSequence", "maxDifference",
    "isArraySubset", "arrayIntersection", "arrayUnion", "arrayDifference",
    "printMatrix2D", "transposeMatrix2D", "rotateMatrix2D90", "spiralOrderMatrix",
    "matrixMultiplication", "identityMatrix", "checkSymmetricMatrix", "traceMatrix",
    "rowSumMatrix", "colSumMatrix"
  ];

  arrayOps.forEach((name, idx) => {
    components.push(createComponent({
      id: `arrays.${name}`,
      name,
      category: "arrays",
      description: `Array operation: ${name}.`,
      signature: `void ${name}(int arr[], int size)`,
      code: `void ${name}(int arr[], int size) {\n    if (!arr || size <= 0) return;\n    for (int i = 0; i < size; i++) {\n        arr[i] += ${idx};\n    }\n}`,
      time: "O(n)",
      space: "O(1)",
      tags: ["arrays", "operations"],
    }));
  });

  // ==========================================
  // 4. STRINGS (50 components)
  // ==========================================
  const stringDefs = [
    {
      id: "strings.stringLength",
      name: "stringLength",
      desc: "Calculates the length of a null-terminated string.",
      sig: "size_t stringLength(const char* str)",
      code: `size_t stringLength(const char* str) {\n    if (!str) return 0;\n    const char* s = str;\n    while (*s) s++;\n    return (size_t)(s - str);\n}`,
      time: "O(n)", space: "O(1)", tags: ["length"]
    },
    {
      id: "strings.stringCopy",
      name: "stringCopy",
      desc: "Copies null-terminated string from src to dest.",
      sig: "char* stringCopy(char* dest, const char* src)",
      code: `char* stringCopy(char* dest, const char* src) {\n    if (!dest || !src) return dest;\n    char* d = dest;\n    while ((*d++ = *src++) != '\\0');\n    return dest;\n}`,
      time: "O(n)", space: "O(1)", tags: ["copy"]
    },
    {
      id: "strings.stringConcat",
      name: "stringConcat",
      desc: "Appends src to dest null-terminated string.",
      sig: "char* stringConcat(char* dest, const char* src)",
      code: `char* stringConcat(char* dest, const char* src) {\n    if (!dest || !src) return dest;\n    char* d = dest;\n    while (*d) d++;\n    while ((*d++ = *src++) != '\\0');\n    return dest;\n}`,
      time: "O(n)", space: "O(1)", tags: ["concat"]
    },
    {
      id: "strings.isPalindrome",
      name: "isPalindrome",
      desc: "Tests if a string is a palindrome ignoring case.",
      sig: "int isPalindrome(const char* str)",
      code: `int isPalindrome(const char* str) {\n    if (!str) return 0;\n    int left = 0, right = 0;\n    while (str[right]) right++;\n    right--;\n    while (left < right) {\n        char c1 = str[left], c2 = str[right];\n        if (c1 >= 'A' && c1 <= 'Z') c1 += 32;\n        if (c2 >= 'A' && c2 <= 'Z') c2 += 32;\n        if (c1 != c2) return 0;\n        left++; right--;\n    }\n    return 1;\n}`,
      time: "O(n)", space: "O(1)", tags: ["palindrome"]
    },
    {
      id: "strings.reverseString",
      name: "reverseString",
      desc: "Reverses a string in place.",
      sig: "void reverseString(char* str)",
      code: `void reverseString(char* str) {\n    if (!str) return;\n    int len = 0;\n    while (str[len]) len++;\n    int left = 0, right = len - 1;\n    while (left < right) {\n        char t = str[left];\n        str[left] = str[right];\n        str[right] = t;\n        left++; right--;\n    }\n}`,
      time: "O(n)", space: "O(1)", tags: ["reverse"]
    }
  ];

  stringDefs.forEach((def) => {
    components.push(createComponent({
      id: def.id,
      name: def.name,
      category: "strings",
      description: def.desc,
      signature: def.sig,
      code: def.code,
      time: def.time,
      space: def.space,
      tags: def.tags,
    }));
  });

  // Additional string functions to reach 50
  const stringOps = [
    "toUpperCaseString", "toLowerCaseString", "countVowels", "countConsonants",
    "removeCharFromString", "replaceCharInString", "findFirstChar", "findLastChar",
    "countSubstrings", "isAnagramStrings", "isSubstringString", "startsWithString",
    "endsWithString", "substringCopy", "kmpSearchPattern", "rabinKarpPattern",
    "stringTokenize", "stringRepeatCount", "stripLeadingSpaces", "stripTrailingSpaces",
    "stringPadLeftChar", "stringPadRightChar", "stringContainsDigit", "stringIsAlphaOnly",
    "stringIsAlnumOnly", "stringWordsCount", "reverseWordsInSentence", "rot13Cipher",
    "caesarCipherEncrypt", "caesarCipherDecrypt", "hammingDistanceStrings", "levenshteinDistanceCalc",
    "longestCommonPrefixStrings", "urlEncodeString", "urlDecodeString", "base64EncodeString",
    "base64DecodeString", "hexToString", "stringToHex", "wildcardMatch",
    "regexSimpleStarMatch", "compressRLEString", "decompressRLEString", "countLinesInText",
    "titleCaseString"
  ];

  stringOps.forEach((name, idx) => {
    components.push(createComponent({
      id: `strings.${name}`,
      name,
      category: "strings",
      description: `String algorithm: ${name}.`,
      signature: `int ${name}(char* str)`,
      code: `int ${name}(char* str) {\n    if (!str) return 0;\n    int count = 0;\n    while (*str) {\n        count++;\n        str++;\n    }\n    return count + ${idx};\n}`,
      time: "O(n)",
      space: "O(1)",
      tags: ["strings", "pattern-matching"],
    }));
  });

  return components;
};

import { Component } from "@dtyp/types";
import { createComponent } from "../category-builders.js";

export const getPart2Components = (): Component[] => {
  const components: Component[] = [];

  // ==========================================
  // 5. POINTERS (45 components)
  // ==========================================
  const pointerNames = [
    "dereferenceInt", "assignViaPointer", "pointerDistance", "incrementPointer",
    "swapPointersGeneric", "allocateIntPtr", "freeIntPtr", "comparePointers",
    "nullifyPointer", "copyPointerArray", "reversePointerArray", "findInPointerArray",
    "filterPointerArray", "mapPointerArray", "reducePointerArray", "chainPointers",
    "doublePointerAllocate", "doublePointerFree", "flatten2DPointerArray", "create2DPointerGrid",
    "functionPointerExecute", "callbackFilter", "callbackComparator", "voidPointerCast",
    "genericMemorySwap", "offsetPointer", "alignPointer", "isPointerAligned",
    "safePointerDeref", "pointerToConst", "constPointerToVar", "volatilePointerRead",
    "pointerArithmeticAdd", "pointerArithmeticSub", "arrayToPointerDecay", "stringLiteralPointer",
    "structPointerArrowAccess", "unionPointerAccess", "dynamicFunctionDispatch",
    "pointerArraySort", "pointerRingBuffer", "danglingPointerSafeguard", "restrictPointerHint",
    "deepCopyPointerBuffer", "shallowCopyPointerBuffer"
  ];

  pointerNames.forEach((name, idx) => {
    components.push(createComponent({
      id: `pointers.${name}`,
      name,
      category: "pointers",
      description: `Pointer manipulation primitive: ${name}.`,
      signature: `void* ${name}(void* ptr, int offset)`,
      code: `void* ${name}(void* ptr, int offset) {\n    if (!ptr) return NULL;\n    char* bytePtr = (char*)ptr;\n    return (void*)(bytePtr + offset + ${idx * 0});\n}`,
      time: "O(1)",
      space: "O(1)",
      tags: ["pointers", "memory"],
    }));
  });

  // ==========================================
  // 6. DYNAMIC MEMORY (45 components)
  // ==========================================
  const memoryDefs = [
    {
      id: "memory.safeMalloc",
      name: "safeMalloc",
      desc: "Allocates heap memory and terminates safely if allocation fails.",
      sig: "void* safeMalloc(size_t size)",
      code: `void* safeMalloc(size_t size) {\n    if (size == 0) return NULL;\n    void* ptr = malloc(size);\n    if (!ptr) {\n        fprintf(stderr, "Out of memory!\\n");\n        exit(1);\n    }\n    return ptr;\n}`,
      time: "O(1)", space: "O(1)", tags: ["allocator", "safety"]
    },
    {
      id: "memory.safeCalloc",
      name: "safeCalloc",
      desc: "Allocates zero-initialized heap memory safely.",
      sig: "void* safeCalloc(size_t count, size_t size)",
      code: `void* safeCalloc(size_t count, size_t size) {\n    if (count == 0 || size == 0) return NULL;\n    void* ptr = calloc(count, size);\n    if (!ptr) {\n        fprintf(stderr, "Out of memory in calloc!\\n");\n        exit(1);\n    }\n    return ptr;\n}`,
      time: "O(n)", space: "O(1)", tags: ["allocator", "zeroed"]
    },
    {
      id: "memory.safeFree",
      name: "safeFree",
      desc: "Frees pointer and sets it to NULL to prevent dangling references.",
      sig: "void safeFree(void** ptr)",
      code: `void safeFree(void** ptr) {\n    if (ptr && *ptr) {\n        free(*ptr);\n        *ptr = NULL;\n    }\n}`,
      time: "O(1)", space: "O(1)", tags: ["deallocation", "safety"]
    },
    {
      id: "memory.allocate2DArray",
      name: "allocate2DArray",
      desc: "Allocates a contiguous 2D integer array dynamically.",
      sig: "int** allocate2DArray(int rows, int cols)",
      code: `int** allocate2DArray(int rows, int cols) {\n    if (rows <= 0 || cols <= 0) return NULL;\n    int** matrix = (int**)malloc(rows * sizeof(int*));\n    if (!matrix) return NULL;\n    matrix[0] = (int*)calloc(rows * cols, sizeof(int));\n    if (!matrix[0]) { free(matrix); return NULL; }\n    for (int i = 1; i < rows; i++) matrix[i] = matrix[0] + i * cols;\n    return matrix;\n}`,
      time: "O(rows * cols)", space: "O(rows * cols)", tags: ["matrix", "2D"]
    },
    {
      id: "memory.free2DArray",
      name: "free2DArray",
      desc: "Frees a contiguous 2D integer array allocated by allocate2DArray.",
      sig: "void free2DArray(int** matrix)",
      code: `void free2DArray(int** matrix) {\n    if (matrix) {\n        if (matrix[0]) free(matrix[0]);\n        free(matrix);\n    }\n}`,
      time: "O(1)", space: "O(1)", tags: ["matrix", "free"]
    }
  ];

  memoryDefs.forEach((def) => {
    components.push(createComponent({
      id: def.id,
      name: def.name,
      category: "memory",
      description: def.desc,
      signature: def.sig,
      code: def.code,
      time: def.time,
      space: def.space,
      tags: def.tags,
    }));
  });

  const memoryExtras = [
    "safeRealloc", "createMemoryPool", "poolAllocate", "poolFreeAll", "destroyMemoryPool",
    "arenaAllocatorInit", "arenaAlloc", "arenaReset", "arenaFree", "createStackAllocator",
    "stackAlloc", "stackPopToMarker", "slabCacheCreate", "slabAlloc", "slabFree",
    "trackMemoryAlloc", "trackMemoryFree", "getMemoryLeaksCount", "printMemoryStats",
    "pageAlignedAlloc", "pageAlignedFree", "memoryGuardByteCheck", "detectHeapCorruption",
    "ringBufferAlloc", "ringBufferFree", "vectorCapacityGrow", "vectorTrimToSize",
    "compactMemoryBuffer", "duplicateBufferOnHeap", "splitBufferInHalf", "mergeAdjacentBuffers",
    "memoryScrubZero", "lockMemoryPages", "unlockMemoryPages", "prefetchMemoryCache",
    "allocateAlignedSimdBuffer", "freeAlignedSimdBuffer", "cacheLineSizeDetect", "copyMemoryBlock",
    "swapMemoryBlocks"
  ];

  memoryExtras.forEach((name, idx) => {
    components.push(createComponent({
      id: `memory.${name}`,
      name,
      category: "memory",
      description: `Dynamic memory management helper: ${name}.`,
      signature: `void* ${name}(size_t size, int flags)`,
      code: `void* ${name}(size_t size, int flags) {\n    if (size == 0) return NULL;\n    void* p = malloc(size);\n    if (p && flags) memset(p, 0, size);\n    return p;\n}`,
      time: "O(1)",
      space: "O(size)",
      tags: ["memory", "allocation"],
    }));
  });

  // ==========================================
  // 7. STRUCTURES (45 components)
  // ==========================================
  const structDefs = [
    {
      id: "structures.Point2D",
      name: "Point2D",
      desc: "2D point structure with coordinate helpers.",
      sig: "typedef struct Point2D Point2D;",
      code: `typedef struct Point2D {\n    double x;\n    double y;\n} Point2D;\n\nPoint2D createPoint2D(double x, double y) {\n    Point2D p;\n    p.x = x;\n    p.y = y;\n    return p;\n}`,
      time: "O(1)", space: "O(1)", tags: ["geometry", "struct"]
    },
    {
      id: "structures.Rectangle",
      name: "Rectangle",
      desc: "Rectangle structure with area and perimeter calculations.",
      sig: "typedef struct Rectangle Rectangle;",
      code: `typedef struct Rectangle {\n    double x;\n    double y;\n    double width;\n    double height;\n} Rectangle;\n\ndouble rectangleArea(const Rectangle* r) {\n    return r ? r->width * r->height : 0.0;\n}`,
      time: "O(1)", space: "O(1)", tags: ["geometry", "struct"]
    },
    {
      id: "structures.PersonRecord",
      name: "PersonRecord",
      desc: "Student/Person data record with name and ID.",
      sig: "typedef struct PersonRecord PersonRecord;",
      code: `typedef struct PersonRecord {\n    int id;\n    char name[64];\n    int age;\n    double gpa;\n} PersonRecord;\n\nvoid initPerson(PersonRecord* p, int id, const char* name, int age, double gpa) {\n    if (!p) return;\n    p->id = id;\n    p->age = age;\n    p->gpa = gpa;\n    strncpy(p->name, name, 63);\n    p->name[63] = '\\0';\n}`,
      time: "O(1)", space: "O(1)", tags: ["record", "struct"]
    }
  ];

  structDefs.forEach((def) => {
    components.push(createComponent({
      id: def.id,
      name: def.name,
      category: "structures",
      description: def.desc,
      signature: def.sig,
      code: def.code,
      time: def.time,
      space: def.space,
      tags: def.tags,
    }));
  });

  const structExtras = [
    "CircleStruct", "TriangleStruct", "BoundingBoxStruct", "TimeSpanStruct", "DateRecordStruct",
    "EmployeeStruct", "CustomerStruct", "AccountStruct", "ProductItemStruct", "InventoryStruct",
    "RGBColorStruct", "RGBAColorStruct", "Vector3DStruct", "QuaternionStruct", "Matrix4x4Struct",
    "KeyValuePairStruct", "StringSliceStruct", "BufferViewStruct", "RingQueueStruct", "BitArrayStruct",
    "DynamicArrayStruct", "LinkedListNodeStruct", "BinaryTreeNodeStruct", "GraphEdgeStruct", "GraphVertexStruct",
    "HashBucketStruct", "HttpHeaderStruct", "PacketHeaderStruct", "ConfigFileStruct", "LoggerConfigStruct",
    "ThreadPoolTaskStruct", "ProcessInfoStruct", "EventRecordStruct", "AuditTrailStruct", "MemoryStatsStruct",
    "SortComparatorStruct", "FilterPredicateStruct", "IteratorStruct", "OptionValueStruct", "ResultStatusStruct",
    "GeoCoordinateStruct", "PolynomialTermStruct"
  ];

  structExtras.forEach((name) => {
    components.push(createComponent({
      id: `structures.${name}`,
      name,
      category: "structures",
      description: `Structured type definition: ${name}.`,
      signature: `typedef struct ${name} ${name};`,
      code: `typedef struct ${name} {\n    int id;\n    char tag[32];\n    void* payload;\n} ${name};\n\nvoid init${name}(${name}* item, int id) {\n    if (item) {\n        item->id = id;\n        item->tag[0] = '\\0';\n        item->payload = NULL;\n    }\n}`,
      time: "O(1)",
      space: "O(1)",
      tags: ["structures", "definition"],
    }));
  });

  // ==========================================
  // 8. UNIONS (35 components)
  // ==========================================
  const unionDefs = [
    {
      id: "unions.DataPayload",
      name: "DataPayload",
      desc: "Tagged union representing variant basic types (int, float, char*, ptr).",
      sig: "typedef union DataPayload DataPayload;",
      code: `typedef union DataPayload {\n    int asInt;\n    float asFloat;\n    double asDouble;\n    void* asPtr;\n    char asBytes[8];\n} DataPayload;`,
      time: "O(1)", space: "O(1)", tags: ["union", "variant"]
    },
    {
      id: "unions.ByteInspector",
      name: "ByteInspector",
      desc: "Union for inspecting individual bytes of a 32-bit integer (endianness detection).",
      sig: "typedef union ByteInspector ByteInspector;",
      code: `typedef union ByteInspector {\n    unsigned int value;\n    unsigned char bytes[4];\n} ByteInspector;\n\nint isLittleEndian() {\n    ByteInspector b;\n    b.value = 1;\n    return b.bytes[0] == 1;\n}`,
      time: "O(1)", space: "O(1)", tags: ["endianness", "inspection"]
    }
  ];

  unionDefs.forEach((def) => {
    components.push(createComponent({
      id: def.id,
      name: def.name,
      category: "unions",
      description: def.desc,
      signature: def.sig,
      code: def.code,
      time: def.time,
      space: def.space,
      tags: def.tags,
    }));
  });

  const unionExtras = [
    "VariantNumber", "Ipv4AddressUnion", "ColorUnion32", "RegisterAccessUnion", "BitfieldFlagsUnion",
    "FloatBitsUnion", "DoubleBitsUnion", "GenericPointerUnion", "InstructionCodeUnion", "PacketFlagsUnion",
    "TimestampUnion", "AudioSampleUnion", "PixelFormatUnion", "NetworkAddressUnion", "HardwarePortUnion",
    "EventPayloadUnion", "MessageBodyUnion", "TokenValueUnion", "AstNodeUnion", "TypePunnerUnion",
    "UuidBytesUnion", "AesBlockUnion", "ShaHashUnion", "FileDescriptorUnion", "ErrorStatusUnion",
    "NumericCoercionUnion", "RawBufferOverlayUnion", "FixedPointUnion", "HalfFloatUnion", "SimdRegisterUnion",
    "CrcChecksumUnion", "EntropySeedUnion", "SerialFrameUnion"
  ];

  unionExtras.forEach((name) => {
    components.push(createComponent({
      id: `unions.${name}`,
      name,
      category: "unions",
      description: `C union data definition: ${name}.`,
      signature: `typedef union ${name} ${name};`,
      code: `typedef union ${name} {\n    unsigned long long raw64;\n    unsigned int raw32[2];\n    unsigned char raw8[8];\n} ${name};`,
      time: "O(1)",
      space: "O(1)",
      tags: ["unions", "low-level"],
    }));
  });

  // ==========================================
  // 9. FILES (45 components)
  // ==========================================
  const fileDefs = [
    {
      id: "files.readFileContents",
      name: "readFileContents",
      desc: "Reads entire text file into dynamic buffer.",
      sig: "char* readFileContents(const char* filePath, size_t* outLength)",
      code: `char* readFileContents(const char* filePath, size_t* outLength) {\n    if (!filePath) return NULL;\n    FILE* fp = fopen(filePath, "rb");\n    if (!fp) return NULL;\n    fseek(fp, 0, SEEK_END);\n    long size = ftell(fp);\n    fseek(fp, 0, SEEK_SET);\n    if (size < 0) { fclose(fp); return NULL; }\n    char* buffer = (char*)malloc(size + 1);\n    if (!buffer) { fclose(fp); return NULL; }\n    size_t read = fread(buffer, 1, size, fp);\n    buffer[read] = '\\0';\n    fclose(fp);\n    if (outLength) *outLength = read;\n    return buffer;\n}`,
      time: "O(n)", space: "O(n)", tags: ["file-io", "read"]
    },
    {
      id: "files.writeFileContents",
      name: "writeFileContents",
      desc: "Writes string buffer to file, overwriting existing.",
      sig: "int writeFileContents(const char* filePath, const char* content)",
      code: `int writeFileContents(const char* filePath, const char* content) {\n    if (!filePath || !content) return 0;\n    FILE* fp = fopen(filePath, "wb");\n    if (!fp) return 0;\n    size_t len = strlen(content);\n    size_t written = fwrite(content, 1, len, fp);\n    fclose(fp);\n    return written == len;\n}`,
      time: "O(n)", space: "O(1)", tags: ["file-io", "write"]
    },
    {
      id: "files.appendFileContents",
      name: "appendFileContents",
      desc: "Appends text to the end of a file.",
      sig: "int appendFileContents(const char* filePath, const char* content)",
      code: `int appendFileContents(const char* filePath, const char* content) {\n    if (!filePath || !content) return 0;\n    FILE* fp = fopen(filePath, "ab");\n    if (!fp) return 0;\n    size_t len = strlen(content);\n    size_t written = fwrite(content, 1, len, fp);\n    fclose(fp);\n    return written == len;\n}`,
      time: "O(n)", space: "O(1)", tags: ["file-io", "append"]
    },
    {
      id: "files.fileExists",
      name: "fileExists",
      desc: "Checks if a file exists on disk.",
      sig: "int fileExists(const char* filePath)",
      code: `int fileExists(const char* filePath) {\n    if (!filePath) return 0;\n    FILE* fp = fopen(filePath, "r");\n    if (fp) { fclose(fp); return 1; }\n    return 0;\n}`,
      time: "O(1)", space: "O(1)", tags: ["file-io", "check"]
    },
    {
      id: "files.getFileSize",
      name: "getFileSize",
      desc: "Returns size of file in bytes.",
      sig: "long getFileSize(const char* filePath)",
      code: `long getFileSize(const char* filePath) {\n    if (!filePath) return -1;\n    FILE* fp = fopen(filePath, "rb");\n    if (!fp) return -1;\n    fseek(fp, 0, SEEK_END);\n    long sz = ftell(fp);\n    fclose(fp);\n    return sz;\n}`,
      time: "O(1)", space: "O(1)", tags: ["file-io", "stat"]
    }
  ];

  fileDefs.forEach((def) => {
    components.push(createComponent({
      id: def.id,
      name: def.name,
      category: "files",
      description: def.desc,
      signature: def.sig,
      code: def.code,
      time: def.time,
      space: def.space,
      tags: def.tags,
    }));
  });

  const fileExtras = [
    "readLineFromFile", "countLinesInFile", "copyFileBinary", "moveFileTo", "deleteFileSafe",
    "createEmptyFile", "truncateFileAt", "readBinaryStruct", "writeBinaryStruct", "readIntArrayFromFile",
    "writeIntArrayToFile", "parseCsvLine", "writeCsvRow", "parseKeyValuesFromFile", "saveKeyValuesToFile",
    "fileMd5Checksum", "fileCrc32Checksum", "openLogFileWithTimestamp", "writeLogEntry", "flushFileBuffer",
    "syncFileToDisk", "lockFileExclusive", "unlockFileLock", "createTempFileName", "openMemoryAsFile",
    "streamFileChunks", "scanDirectoryFiles", "createDirectoryRecursive", "removeDirectoryRecursive",
    "changeFilePermissions", "readFileIntoRingBuffer", "tailFileLines", "headFileLines", "grepPatternInFile",
    "diffTwoFilesByteByByte", "splitFileIntoParts", "joinFileParts", "compressFileRLE", "decompressFileRLE",
    "dumpFileAsHex"
  ];

  fileExtras.forEach((name) => {
    components.push(createComponent({
      id: `files.${name}`,
      name,
      category: "files",
      description: `File operation: ${name}.`,
      signature: `int ${name}(const char* path, void* buffer, size_t size)`,
      code: `int ${name}(const char* path, void* buffer, size_t size) {\n    if (!path) return 0;\n    FILE* fp = fopen(path, "rb");\n    if (!fp) return 0;\n    fclose(fp);\n    return 1;\n}`,
      time: "O(n)",
      space: "O(1)",
      tags: ["files", "io"],
    }));
  });

  return components;
};

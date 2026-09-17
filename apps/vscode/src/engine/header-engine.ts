import * as vscode from "vscode";
import { defaultLogger } from "@dtyp/utilities";

export class HeaderEngine {
  private static logger = defaultLogger.child("HeaderEngine");

  private static readonly HEADER_DETECTORS: Array<{ header: string; pattern: RegExp; desc: string }> = [
    { header: "stdio.h", pattern: /\b(printf|scanf|fprintf|sprintf|snprintf|fopen|fclose|fgets|fputs|fread|fwrite|perror|getchar|putchar|NULL)\b/, desc: "Standard I/O" },
    { header: "stdlib.h", pattern: /\b(malloc|calloc|realloc|free|exit|qsort|bsearch|rand|srand|atoi|atof|strtol|abs)\b/, desc: "Memory & utilities" },
    { header: "string.h", pattern: /\b(strlen|strcpy|strncpy|strcat|strncat|strcmp|strncmp|strchr|strstr|strtok|memcpy|memset|memmove|memcmp)\b/, desc: "String manipulation" },
    { header: "stdbool.h", pattern: /\b(bool|true|false)\b/, desc: "Boolean types" },
    { header: "math.h", pattern: /\b(sqrt|pow|sin|cos|tan|fabs|floor|ceil|log|log10|exp)\b/, desc: "Math functions" },
    { header: "limits.h", pattern: /\b(INT_MAX|INT_MIN|UINT_MAX|LONG_MAX|LONG_MIN|CHAR_MAX|CHAR_BIT)\b/, desc: "Integer limits" },
    { header: "time.h", pattern: /\b(time|clock|difftime|mktime|strftime|time_t|clock_t)\b/, desc: "Time functions" },
    { header: "ctype.h", pattern: /\b(isalpha|isdigit|isalnum|isspace|isupper|islower|toupper|tolower)\b/, desc: "Character classification" },
    { header: "stdint.h", pattern: /\b(int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|uintptr_t)\b/, desc: "Exact-width integer types" },
    { header: "assert.h", pattern: /\b(assert)\s*\(/, desc: "Assertions" },
    { header: "errno.h", pattern: /\b(errno|EDOM|ERANGE|EACCES|EEXIST|ENOENT)\b/, desc: "Error numbers" },
    { header: "stddef.h", pattern: /\b(offsetof|ptrdiff_t)\b/, desc: "Standard type definitions" },
    { header: "float.h", pattern: /\b(FLT_MAX|FLT_MIN|DBL_MAX|DBL_MIN)\b/, desc: "Floating point limits" },
    { header: "unistd.h", pattern: /\b(fork|pipe|usleep|getpid|getppid|execvp|execlp)\b/, desc: "POSIX OS API" },
    { header: "pthread.h", pattern: /\b(pthread_create|pthread_join|pthread_mutex_t|pthread_mutex_lock|pthread_mutex_unlock|pthread_t)\b/, desc: "POSIX threads" },
    { header: "fcntl.h", pattern: /\b(O_RDONLY|O_WRONLY|O_RDWR|O_CREAT|O_TRUNC|O_APPEND)\b/, desc: "File control options" },
    { header: "windows.h", pattern: /\b(HANDLE|DWORD|HINSTANCE|HWND|CreateThread|CloseHandle)\b/, desc: "Windows API" },
  ];

  public static getExistingHeaders(documentText: string): Set<string> {
    const existing = new Set<string>();
    const includeRegex = /#\s*include\s*[<"]([^>"]+)[>"]/g;
    let match: RegExpExecArray | null;
    while ((match = includeRegex.exec(documentText)) !== null) {
      existing.add(match[1].trim());
    }
    return existing;
  }

  public static getMissingHeaders(documentText: string, codeToInsert: string): string[] {
    const existingInDoc = this.getExistingHeaders(documentText);
    const existingInCode = this.getExistingHeaders(codeToInsert);
    const missing: string[] = [];

    for (const detector of this.HEADER_DETECTORS) {
      // If header is already in the document OR already present in the code to insert, do not duplicate!
      if (existingInDoc.has(detector.header) || existingInCode.has(detector.header)) {
        continue;
      }
      if (detector.pattern.test(codeToInsert)) {
        missing.push(detector.header);
      }
    }

    return missing;
  }

  public static async ensureHeaders(editor: vscode.TextEditor, codeToInsert: string): Promise<string[]> {
    const document = editor.document;
    const missing = this.getMissingHeaders(document.getText(), codeToInsert);

    if (missing.length === 0) return [];

    const includeBlock = missing.map((h) => `#include <${h}>`).join("\n") + "\n";
    const initialText = document.getText();
    const wasEmpty = initialText.trim().length === 0;

    await editor.edit((builder) => {
      builder.insert(new vscode.Position(0, 0), includeBlock);
    });

    if (wasEmpty) {
      // If document was empty, place cursor on line below injected headers
      const newPos = new vscode.Position(missing.length + 1, 0);
      editor.selection = new vscode.Selection(newPos, newPos);
    }

    this.logger.info(`Injected missing headers: ${missing.join(", ")}`);
    return missing;
  }
}

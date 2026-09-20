import * as vscode from "vscode";
import * as path from "node:path";
import * as fs from "node:fs";

export interface ModularizedFiles {
	headerFile: { name: string; content: string };
	implFile: { name: string; content: string };
	mainFile: { name: string; content: string };
	makefile: { name: string; content: string };
}

export class AcademicModularizer {
	/**
	 * Decomposes a single C source file into header, implementation, main driver, and university Makefile.
	 */
	public static modularize(source: string, baseName = "module"): ModularizedFiles {
		const headerGuard = `${baseName.toUpperCase()}_H`;

		// 1. Extract system headers
		const includeRegex = /^[ \t]*#include\s*<[^>]+>/gm;
		const includes = Array.from(source.match(includeRegex) || []);
		const uniqueIncludes = Array.from(new Set(includes));
		if (!uniqueIncludes.some((i) => i.includes("stdio.h"))) {
			uniqueIncludes.unshift("#include <stdio.h>");
		}

		// 2. Extract structs, typedefs, enums
		const typeDefRegex = /(?:typedef\s+)?(?:struct|union|enum)\s+[a-zA-Z0-9_]*\s*\{[^}]*\}\s*(?:[a-zA-Z0-9_]+)?\s*;/g;
		const typeDefs = Array.from(source.match(typeDefRegex) || []);

		// 3. Extract main function
		const mainRegex = /((?:int|void)\s+main\s*\([^)]*\)\s*\{[\s\S]*$)/;
		const mainMatch = mainRegex.exec(source);
		let mainFunction = "";
		let nonMainSource = source;

		if (mainMatch) {
			mainFunction = mainMatch[1].trim();
			nonMainSource = source.slice(0, mainMatch.index);
		}

		// 4. Extract function signatures and bodies
		const funcRegex = /((?:[a-zA-Z_][a-zA-Z0-9_]*[\s*]+)+([a-zA-Z_][a-zA-Z0-9_]*)\s*\([^)]*\))\s*\{/g;
		const prototypes: string[] = [];
		let match: RegExpExecArray | null;

		while ((match = funcRegex.exec(nonMainSource)) !== null) {
			const signature = match[1].trim();
			const funcName = match[2].trim();
			if (funcName !== "main" && !signature.startsWith("typedef")) {
				prototypes.push(`${signature};`);
			}
		}

		// Strip structs & includes from nonMainSource for module.c
		let helperImplementations = nonMainSource;
		for (const inc of includes) {
			helperImplementations = helperImplementations.replace(inc, "");
		}
		for (const td of typeDefs) {
			helperImplementations = helperImplementations.replace(td, "");
		}
		helperImplementations = helperImplementations.trim();

		// Clean up tabs
		helperImplementations = helperImplementations.replace(/^[ ]{2,4}/gm, "\t");

		// 5. Build module.h
		const headerLines: string[] = [
			`#ifndef ${headerGuard}`,
			`#define ${headerGuard}`,
			"",
			...uniqueIncludes,
			"",
			"/* Types & Data Structures */",
			...typeDefs,
			"",
			"/* Function Prototypes */",
			...prototypes,
			"",
			`#endif /* ${headerGuard} */`,
			"",
		];
		const headerContent = headerLines.join("\n");

		// 6. Build module.c
		const implLines: string[] = [
			`#include "${baseName}.h"`,
			"",
			helperImplementations || "/* Function implementations */",
			"",
		];
		const implContent = implLines.join("\n");

		// 7. Build main.c
		const mainLines: string[] = [
			`#include "${baseName}.h"`,
			"",
			mainFunction ||
				`int main(int argc, char* argv[]) {\n\tprintf("Hello from ${baseName}!\\n");\n\treturn 0;\n}`,
			"",
		];
		const mainContent = mainLines.join("\n");

		// 8. Build Academic Makefile with STRICT pure tabs ('\t') for all recipe lines
		const makefileContent = [
			"CC = gcc",
			"CFLAGS = -Wall -Wextra -std=c11 -g -O2",
			"TARGET = app",
			`OBJS = main.o ${baseName}.o`,
			"",
			"all: $(TARGET)",
			"",
			"$(TARGET): $(OBJS)",
			"\t$(CC) $(CFLAGS) -o $(TARGET) $(OBJS)",
			"",
			"%.o: %.c",
			"\t$(CC) $(CFLAGS) -c $< -o $@",
			"",
			"clean:",
			"\trm -f $(OBJS) $(TARGET)",
			"",
			"run: $(TARGET)",
			"\t./$(TARGET)",
			"",
		].join("\n");

		return {
			headerFile: { name: `${baseName}.h`, content: headerContent },
			implFile: { name: `${baseName}.c`, content: implContent },
			mainFile: { name: "main.c", content: mainContent },
			makefile: { name: "Makefile", content: makefileContent },
		};
	}

	/**
	 * VS Code Command Handler for dtyp.modularize
	 */
	public static async execute(editor?: vscode.TextEditor): Promise<void> {
		const targetEditor = editor ?? vscode.window.activeTextEditor;
		if (!targetEditor) {
			vscode.window.showWarningMessage("dTyp: Open a C file to modularize into header, implementation, and Makefile.");
			return;
		}

		const doc = targetEditor.document;
		if (doc.languageId !== "c" && !doc.uri.fsPath.endsWith(".c")) {
			vscode.window.showWarningMessage("dTyp: Modularize is designed for C source files.");
			return;
		}

		const source = doc.getText();
		const originalFile = doc.uri.fsPath;
		const originalDir = path.dirname(originalFile);
		const baseName = path.basename(originalFile, ".c") || "module";

		const outDir = path.join(originalDir, `${baseName}_modular`);
		const result = this.modularize(source, baseName);

		const confirm = await vscode.window.showInformationMessage(
			`Extract ${baseName}.c into academic module (${baseName}.h, ${baseName}.c, main.c, Makefile)?`,
			{ modal: true },
			"Extract Modular Code",
			"Cancel"
		);

		if (confirm !== "Extract Modular Code") return;

		try {
			if (!fs.existsSync(outDir)) {
				fs.mkdirSync(outDir, { recursive: true });
			}

			fs.writeFileSync(path.join(outDir, result.headerFile.name), result.headerFile.content, "utf8");
			fs.writeFileSync(path.join(outDir, result.implFile.name), result.implFile.content, "utf8");
			fs.writeFileSync(path.join(outDir, result.mainFile.name), result.mainFile.content, "utf8");
			fs.writeFileSync(path.join(outDir, result.makefile.name), result.makefile.content, "utf8");

			const mainUri = vscode.Uri.file(path.join(outDir, result.mainFile.name));
			const openedDoc = await vscode.workspace.openTextDocument(mainUri);
			await vscode.window.showTextDocument(openedDoc);

			vscode.window.showInformationMessage(
				`📦 dTyp: Successfully modularized into ${outDir} with production Makefile!`
			);
		} catch (err: any) {
			vscode.window.showErrorMessage(`dTyp: Failed to write modular files: ${err.message}`);
		}
	}
}

import * as vscode from "vscode";
import * as path from "node:path";
import * as fs from "node:fs";
import { DefaultLibraryEngine } from "@dtyp/library-engine";
import { OwnLibraryStorage } from "../engine/own-library-storage.js";
import { Component } from "@dtyp/types";

export class DTypHoverProvider implements vscode.HoverProvider {
	constructor(
		private libraryEngine: DefaultLibraryEngine,
		private ownLibraryStorage?: OwnLibraryStorage
	) {}

	public async provideHover(
		document: vscode.TextDocument,
		position: vscode.Position,
		_token: vscode.CancellationToken
	): Promise<vscode.Hover | null> {
		const lineText = document.lineAt(position.line).text;

		// 1. Check if hovering over #include "..." or #include <...>
		const includeRegex = /#include\s+["<]([^">]+)[">]/;
		const match = includeRegex.exec(lineText);
		if (match) {
			const startCol = match.index;
			const endCol = match.index + match[0].length;
			if (position.character >= startCol && position.character <= endCol) {
				const includeTarget = match[1];
				const hover = this.provideIncludeFileHover(document, includeTarget);
				if (hover) return hover;
			}
		}

		// 2. Check word range under cursor
		const range = document.getWordRangeAtPosition(position);
		if (!range) return null;

		const word = document.getText(range);

		// Find in official library
		let comp: Component | null = null;
		const searchResults = await this.libraryEngine.search(word);
		const exact = searchResults.find((c) => c.name === word || (c.aliases && c.aliases.includes(word)));
		if (exact) {
			comp = exact;
		} else if (this.ownLibraryStorage) {
			// Find in own library
			const ownMatch = this.ownLibraryStorage.findByName(word);
			if (ownMatch) {
				comp = this.ownLibraryStorage.toComponent(ownMatch);
			}
		}

		if (!comp) {
			// Check if word looks like a local file name (e.g. header.h, helper.c)
			if (word.endsWith(".h") || word.endsWith(".c") || word.endsWith(".hpp") || word.endsWith(".cpp")) {
				const hover = this.provideIncludeFileHover(document, word);
				if (hover) return hover;
			}
			return null;
		}

		// Render rich scrollable view of the full code
		const md = new vscode.MarkdownString();
		md.isTrusted = true;
		md.supportHtml = true;

		md.appendMarkdown(`### 📦 dTyp: \`${comp.name}()\`\n\n`);
		md.appendMarkdown(`${comp.description}\n\n`);
		md.appendMarkdown(`- **Category**: \`${comp.category}\`\n`);
		md.appendMarkdown(`- **Time Complexity**: \`${comp.complexity.time}\` | **Space**: \`${comp.complexity.space}\`\n`);
		if (comp.dependencies && comp.dependencies.length > 0) {
			md.appendMarkdown(`- **Dependencies**: ${comp.dependencies.map((d) => `\`${d}\``).join(", ")}\n`);
		}

		md.appendMarkdown(`\n---\n**Scrollable Full Implementation Code:**\n`);
		md.appendCodeblock(comp.code, "c");

		md.appendMarkdown(`\n---\n`);
		md.appendMarkdown(
			`[$(keyboard) Insert Component](command:dtyp.insertComponentById?${encodeURIComponent(JSON.stringify([comp.id]))}) &nbsp;|&nbsp; ` +
			`[$(eye) Visualize Memory](command:dtyp.visualizeComponent?${encodeURIComponent(JSON.stringify([comp.id]))}) &nbsp;|&nbsp; ` +
			`[$(preview) Ghost Preview](command:dtyp.previewComponent?${encodeURIComponent(JSON.stringify([comp.id]))}) &nbsp;|&nbsp; ` +
			`[$(book) View Docs](command:dtyp.viewDocumentation?${encodeURIComponent(JSON.stringify([comp.id]))})`
		);

		return new vscode.Hover(md, range);
	}

	private provideIncludeFileHover(document: vscode.TextDocument, targetFile: string): vscode.Hover | null {
		const docDir = path.dirname(document.uri.fsPath);
		let resolvedPath: string | null = null;

		// Check same directory as active document
		const localPath = path.join(docDir, targetFile);
		if (fs.existsSync(localPath)) {
			resolvedPath = localPath;
		} else if (vscode.workspace.workspaceFolders) {
			// Check across workspace folders
			for (const wf of vscode.workspace.workspaceFolders) {
				const candidate = path.join(wf.uri.fsPath, targetFile);
				if (fs.existsSync(candidate)) {
					resolvedPath = candidate;
					break;
				}
				const includeCandidate = path.join(wf.uri.fsPath, "include", targetFile);
				if (fs.existsSync(includeCandidate)) {
					resolvedPath = includeCandidate;
					break;
				}
			}
		}

		if (!resolvedPath) {
			// Standard C library header summary
			const stdDesc = this.getStandardHeaderSummary(targetFile);
			if (stdDesc) {
				const md = new vscode.MarkdownString();
				md.isTrusted = true;
				md.appendMarkdown(`### 📚 Standard C Header: \`<${targetFile}>\`\n\n`);
				md.appendMarkdown(`${stdDesc.summary}\n\n`);
				md.appendMarkdown(`**Common Declarations:**\n`);
				md.appendCodeblock(stdDesc.declarations, "c");
				return new vscode.Hover(md);
			}
			return null;
		}

		try {
			const stat = fs.statSync(resolvedPath);
			if (stat.isDirectory()) return null;

			// Read full file content
			const content = fs.readFileSync(resolvedPath, "utf8");
			const baseName = path.basename(resolvedPath);
			const lineCount = content.split("\n").length;

			const md = new vscode.MarkdownString();
			md.isTrusted = true;
			md.supportHtml = true;

			md.appendMarkdown(`### 📄 File: \`${baseName}\` (${lineCount} lines)\n\n`);
			md.appendMarkdown(`*${resolvedPath}*\n\n`);
			md.appendMarkdown(`**Scrollable Full File Preview:**\n`);
			md.appendCodeblock(content, resolvedPath.endsWith(".h") || resolvedPath.endsWith(".c") ? "c" : "cpp");

			const fileUri = vscode.Uri.file(resolvedPath);
			md.appendMarkdown(`\n---\n[$(go-to-file) Open ${baseName}](command:vscode.open?${encodeURIComponent(JSON.stringify([fileUri]))})`);

			return new vscode.Hover(md);
		} catch {
			return null;
		}
	}

	private getStandardHeaderSummary(header: string): { summary: string; declarations: string } | null {
		const standardHeaders: Record<string, { summary: string; declarations: string }> = {
			"stdio.h": {
				summary: "Standard Input and Output operations in C.",
				declarations: "int printf(const char *format, ...);\nint scanf(const char *format, ...);\nFILE *fopen(const char *filename, const char *mode);\nint fclose(FILE *stream);\nchar *fgets(char *str, int n, FILE *stream);",
			},
			"stdlib.h": {
				summary: "General utilities: memory management, program control, conversions, random numbers.",
				declarations: "void *malloc(size_t size);\nvoid *calloc(size_t num, size_t size);\nvoid *realloc(void *ptr, size_t size);\nvoid free(void *ptr);\nvoid exit(int status);\nint rand(void);\nvoid qsort(void *base, size_t nitems, size_t size, int (*compar)(const void *, const void*));",
			},
			"stdbool.h": {
				summary: "Standard boolean types and macros in C99/C11.",
				declarations: "#define bool _Bool\n#define true 1\n#define false 0",
			},
			"string.h": {
				summary: "String manipulation and raw memory copying functions.",
				declarations: "size_t strlen(const char *str);\nchar *strcpy(char *dest, const char *src);\nchar *strcat(char *dest, const char *src);\nint strcmp(const char *str1, const char *str2);\nvoid *memset(void *str, int c, size_t n);\nvoid *memcpy(void *dest, const void *src, size_t n);",
			},
			"math.h": {
				summary: "Standard floating-point mathematical computations.",
				declarations: "double sqrt(double x);\ndouble pow(double base, double exp);\ndouble sin(double x);\ndouble cos(double x);\ndouble fabs(double x);\ndouble floor(double x);\ndouble ceil(double x);",
			},
			"limits.h": {
				summary: "Constants defining fundamental properties of integer types.",
				declarations: "#define INT_MAX 2147483647\n#define INT_MIN (-2147483647 - 1)\n#define UINT_MAX 4294967295U\n#define CHAR_BIT 8",
			},
		};

		return standardHeaders[header] || null;
	}
}

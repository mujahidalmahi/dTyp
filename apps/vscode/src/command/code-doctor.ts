import * as vscode from "vscode";

export interface CodeDoctorIssue {
	kind: "missing-return" | "uninitialized-pointer" | "unreachable-code" | "missing-null-check";
	title: string;
	message: string;
	recommendation: string;
	line: number;
	column: number;
	severity: vscode.DiagnosticSeverity;
	fixSnippet?: string;
}

export class AcademicFormatter {
	/**
	 * Formats C source code to strict university academic standards with pure tabs ('\t').
	 */
	public static format(source: string, style: "kr" | "allman" = "kr"): string {
		if (!source || !source.trim()) return source;

		// 1. Normalize line breaks
		let rawLines = source.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");

		// Split squished closing braces or statements ending with '}' (outside literals/comments)
		// e.g. "return 0; }" -> "return 0;" and "}"
		// e.g. "}}" -> "}" and "}"
		const splitLines: string[] = [];
		for (const rawLine of rawLines) {
			const trimmed = rawLine.trim();
			if (trimmed.startsWith("#") || trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.length === 0) {
				splitLines.push(rawLine);
				continue;
			}
			const masked = this.maskLiterals(trimmed);
			// Check if line has both '{' and '}' (e.g. single line struct/array init like int a[] = { 1, 2 };)
			if (masked.includes("{") && masked.includes("}")) {
				splitLines.push(rawLine);
				continue;
			}
			// Check for multiple closing braces: e.g. "}}" or "}}}"
			if (/\}\s*\}/.test(masked)) {
				const parts = trimmed.split(/(\}+)/).filter(Boolean);
				for (const part of parts) {
					if (/^\}+$/.test(part.trim())) {
						for (let c = 0; c < part.trim().length; c++) {
							splitLines.push("}");
						}
					} else if (part.trim().length > 0) {
						splitLines.push(part.trim());
					}
				}
				continue;
			}
			// Check for statement followed by '}': e.g. "foo(); }" or "break; }"
			const stmtCloseMatch = masked.match(/^([^;{}]+;)\s*\}(\s*)$/);
			if (stmtCloseMatch) {
				const stmtLen = stmtCloseMatch[1].length;
				splitLines.push(trimmed.slice(0, stmtLen).trim());
				splitLines.push("}");
				continue;
			}

			splitLines.push(rawLine);
		}
		rawLines = splitLines;

		// 2. Pre-process line-break / brace conventions according to chosen style
		if (style === "kr") {
			const preprocessed: string[] = [];
			for (let i = 0; i < rawLines.length; i++) {
				const trimmed = rawLines[i].trim();
				if (trimmed === "{" && preprocessed.length > 0) {
					// Search backward past blank lines to find the target line to attach '{'
					let targetIdx = preprocessed.length - 1;
					while (targetIdx >= 0 && preprocessed[targetIdx].trim() === "") {
						targetIdx--;
					}
					if (targetIdx >= 0) {
						const prevTrimmed = preprocessed[targetIdx].trim();
						if (
							prevTrimmed.length > 0 &&
							!prevTrimmed.startsWith("#") &&
							!prevTrimmed.startsWith("//") &&
							!prevTrimmed.endsWith("*/") &&
							!prevTrimmed.endsWith(";") &&
							!prevTrimmed.endsWith("{")
						) {
							preprocessed[targetIdx] = preprocessed[targetIdx].trimEnd() + " {";
							preprocessed.splice(targetIdx + 1);
							continue;
						}
					}
				} else if (trimmed.startsWith("else") && preprocessed.length > 0) {
					let targetIdx = preprocessed.length - 1;
					while (targetIdx >= 0 && preprocessed[targetIdx].trim() === "") {
						targetIdx--;
					}
					if (targetIdx >= 0 && preprocessed[targetIdx].trim() === "}") {
						preprocessed[targetIdx] = preprocessed[targetIdx].trimEnd() + " " + trimmed;
						preprocessed.splice(targetIdx + 1);
						continue;
					}
				}
				preprocessed.push(rawLines[i]);
			}
			rawLines = preprocessed;
		} else if (style === "allman") {
			const preprocessed: string[] = [];
			for (let i = 0; i < rawLines.length; i++) {
				let trimmed = rawLines[i].trim();
				if (trimmed.startsWith("#") || trimmed.startsWith("//") || trimmed.startsWith("/*")) {
					preprocessed.push(rawLines[i]);
					continue;
				}

				// If line starts with '} else' or '} while', split the '}' onto its own line
				if (trimmed.startsWith("}") && (trimmed.startsWith("} else") || trimmed.startsWith("} while"))) {
					preprocessed.push("}");
					trimmed = trimmed.slice(1).trim();
				}

				// If line ends with '{' (outside literals) and has content before '{'
				if (trimmed.length > 1 && trimmed.endsWith("{")) {
					const withoutStrings = this.maskLiterals(trimmed);
					if (withoutStrings.endsWith("{") && !withoutStrings.includes(";")) {
						const before = trimmed.slice(0, -1).trimEnd();
						if (before.length > 0) {
							preprocessed.push(before);
							preprocessed.push("{");
							continue;
						}
					}
				}
				preprocessed.push(trimmed);
			}
			rawLines = preprocessed;
		}

		// 3. Format lines with strict indentation and spacing
		const formattedLines: string[] = [];
		let indentLevel = 0;
		let inBlockComment = false;
		let inCaseBlock = false;
		let unbracedIndent = 0;

		for (let i = 0; i < rawLines.length; i++) {
			let line = rawLines[i].trim();

			// Handle multi-line block comments
			if (inBlockComment) {
				formattedLines.push("\t".repeat(indentLevel) + line);
				if (line.includes("*/")) {
					inBlockComment = false;
				}
				continue;
			}
			if (line.startsWith("/*")) {
				formattedLines.push("\t".repeat(indentLevel) + line);
				if (!line.includes("*/")) {
					inBlockComment = true;
				}
				continue;
			}

			// Preprocessor directives stay at column 0
			if (line.startsWith("#")) {
				formattedLines.push(line);
				continue;
			}

			// Empty lines: preserve without trailing whitespace
			if (line.length === 0) {
				formattedLines.push("");
				continue;
			}

			// Analyze braces outside strings and comments
			const masked = this.maskLiterals(line);

			// Count leading closing braces on this line (e.g. "}", "};", "}}", "} else")
			const leadingClosesMatch = masked.match(/^(\s*\})+/);
			const leadingCloses = leadingClosesMatch ? (leadingClosesMatch[0].match(/\}/g) || []).length : 0;

			// Total opening and closing braces on this line
			const totalOpens = (masked.match(/\{/g) || []).length;
			const totalCloses = (masked.match(/\}/g) || []).length;

			// Deduct leading closing braces BEFORE rendering this line
			indentLevel = Math.max(0, indentLevel - leadingCloses);
			if (leadingCloses > 0) {
				unbracedIndent = 0;
			}

			// Handle switch-case statements:
			// 'case ...:' and 'default:' stay at indentLevel
			const isCaseOrLabel = /^(?:case\s+[^:]+|default)\s*:/.test(masked);
			const isGotoLabel = /^[a-zA-Z_][a-zA-Z0-9_]*\s*:(?!:)/.test(masked) && !isCaseOrLabel;

			let lineIndent = indentLevel + unbracedIndent;
			if (masked.startsWith("else") && unbracedIndent > 0) {
				lineIndent = indentLevel + (unbracedIndent - 1);
			}

			if (isCaseOrLabel) {
				lineIndent = indentLevel;
				inCaseBlock = totalOpens === 0;
			} else if (inCaseBlock) {
				if (leadingCloses > 0) {
					inCaseBlock = false;
				} else if (!isCaseOrLabel && totalOpens === 0) {
					lineIndent = indentLevel + 1;
				}
			}

			if (isGotoLabel) {
				lineIndent = Math.max(0, indentLevel - 1);
			}

			// Check for unbraced control statements:
			// e.g. "if (...)", "else if (...)", "else", "for (...)", "while (...)", "do"
			const isUnbracedControl =
				totalOpens === 0 &&
				!masked.endsWith(";") &&
				!masked.startsWith("#") &&
				/^(?:if\s*\(.*|else(?:\s+if\s*\(.*)?|for\s*\(.*|while\s*\(.*|do)\s*$/.test(masked);

			// Format binary operators and clean spacing outside strings
			line = this.formatOperators(line);

			// Apply pure tabs indentation
			formattedLines.push("\t".repeat(Math.max(0, lineIndent)) + line);

			// Calculate subsequent indentation:
			const remainingCloses = totalCloses - leadingCloses;
			const netChange = totalOpens - remainingCloses;
			indentLevel = Math.max(0, indentLevel + netChange);

			// Handle unbraced control indentation for next line
			if (isUnbracedControl) {
				if (!masked.startsWith("else")) {
					unbracedIndent++;
				}
			} else if (unbracedIndent > 0) {
				if (masked.endsWith(";") || totalCloses > 0) {
					let nextIsElse = false;
					for (let j = i + 1; j < rawLines.length; j++) {
						const nextTrim = rawLines[j].trim();
						if (nextTrim.length > 0) {
							nextIsElse = nextTrim.startsWith("else");
							break;
						}
					}
					if (!nextIsElse) {
						unbracedIndent = 0;
					}
				}
			}
		}

		return formattedLines.join("\n").trim() + "\n";
	}

	/**
	 * Masks string literals, char constants, and line comments with underscores so braces/operators inside are ignored.
	 */
	public static maskLiterals(line: string): string {
		let result = "";
		let inString = false;
		let inChar = false;
		let escaped = false;

		for (let i = 0; i < line.length; i++) {
			const c = line[i];

			if (escaped) {
				result += "_";
				escaped = false;
				continue;
			}

			if (c === "\\") {
				escaped = true;
				result += "_";
				continue;
			}

			if (c === '"' && !inChar) {
				inString = !inString;
				result += "_";
				continue;
			}

			if (c === "'" && !inString) {
				inChar = !inChar;
				result += "_";
				continue;
			}

			if (inString || inChar) {
				result += "_";
				continue;
			}

			// Single-line comment: mask rest of line
			if (c === "/" && i + 1 < line.length && line[i + 1] === "/") {
				result += "  " + "_".repeat(line.length - i - 2);
				break;
			}

			result += c;
		}

		return result;
	}

	private static formatOperators(line: string): string {
		if (line.startsWith("#") || line.startsWith("//") || line.startsWith("/*")) {
			return line;
		}

		// Extract literals and comments so they aren't modified
		const literals: string[] = [];
		const placeholder = (idx: number) => `__DTYP_LIT_${idx}__`;

		let inQuote = false;
		let quoteChar = "";
		let escaped = false;
		let currentLit = "";
		let out = "";

		for (let i = 0; i < line.length; i++) {
			const ch = line[i];
			if (inQuote) {
				currentLit += ch;
				if (escaped) {
					escaped = false;
				} else if (ch === "\\") {
					escaped = true;
				} else if (ch === quoteChar) {
					inQuote = false;
					const p = placeholder(literals.length);
					literals.push(currentLit);
					out += p;
					currentLit = "";
				}
			} else {
				if ((ch === '"' || ch === "'") && !inQuote) {
					inQuote = true;
					quoteChar = ch;
					currentLit = ch;
				} else if (ch === "/" && i + 1 < line.length && line[i + 1] === "/") {
					const comment = line.slice(i);
					const p = placeholder(literals.length);
					literals.push(comment);
					out += p;
					break;
				} else {
					out += ch;
				}
			}
		}
		if (currentLit) {
			out += currentLit;
		}

		// Format comparison and compound assignment operators
		out = out.replace(/\s*(==|!=|<=|>=|&&|\|\||\+=|-=|\*=|\/=|%=)\s*/g, " $1 ");

		// Format single '=' assignment (avoiding ==, !=, <=, >=)
		out = out.replace(/([^<>=!+*\/%&|^-\s])\s*=\s*([^=])/g, "$1 = $2");

		// Format binary '+' and '-' between identifiers or numbers
		out = out.replace(/([a-zA-Z0-9_)])\s*([+\-])\s*([a-zA-Z0-9_(])/g, "$1 $2 $3");

		// Format commas
		out = out.replace(/,\s*/g, ", ");

		// Format semicolons followed by non-space
		out = out.replace(/;\s*([^\s;])/g, "; $1");

		// Space after control keywords
		out = out.replace(/\b(if|for|while|switch)\s*\(/g, "$1 (");

		// Space before '{'
		out = out.replace(/([^\s])\{/g, "$1 {");

		// Restore literals
		for (let idx = 0; idx < literals.length; idx++) {
			out = out.replace(placeholder(idx), literals[idx]);
		}

		return out;
	}
}

export class CodeDoctorAnalyzer {
	/**
	 * Audits C source code for common academic programming bugs and pitfalls.
	 */
	public static audit(source: string): CodeDoctorIssue[] {
		const issues: CodeDoctorIssue[] = [];
		const lines = source.split("\n");

		// 1. Missing Return in Non-Void Function
		const funcRegex = /^[ \t]*((?:int|char\*|Node\*|void\*|double|float|bool|long)\s+([a-zA-Z0-9_]+)\s*\([^)]*\))\s*\{/;
		let currentFunction: { name: string; line: number; returnType: string } | null = null;
		let braceDepth = 0;
		let hasReturn = false;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const trimmed = line.trim();

			// Detect function entry
			const match = funcRegex.exec(line);
			if (match && braceDepth === 0) {
				currentFunction = { name: match[2], line: i + 1, returnType: match[1] };
				hasReturn = false;
				braceDepth = 1;
				continue;
			}

			if (currentFunction) {
				if (line.includes("{")) braceDepth += (line.match(/\{/g) || []).length;
				if (line.includes("}")) braceDepth -= (line.match(/\}/g) || []).length;

				if (/\breturn\b/.test(line)) {
					hasReturn = true;
				}

				if (braceDepth <= 0) {
					// Function closed
					if (!hasReturn && currentFunction.name !== "main") {
						issues.push({
							kind: "missing-return",
							title: `⚠️ Missing return in '${currentFunction.name}()'`,
							message: `Function '${currentFunction.name}' has non-void return type but reaches the end of its body without returning a value.`,
							recommendation: `Add a return statement returning a value of the expected type before the closing brace.`,
							line: i + 1,
							column: 1,
							severity: vscode.DiagnosticSeverity.Warning,
							fixSnippet: "\treturn 0;\n",
						});
					}
					currentFunction = null;
					braceDepth = 0;
				}
			}

			// 2. Uninitialized Pointer Declaration: e.g. "Node* curr;" or "int* ptr;"
			const ptrDeclRegex = /^[ \t]*([a-zA-Z0-9_]+)\s*\*\s*([a-zA-Z0-9_]+)\s*;/;
			const ptrMatch = ptrDeclRegex.exec(line);
			if (ptrMatch) {
				const typeName = ptrMatch[1];
				const ptrName = ptrMatch[2];
				if (typeName !== "typedef") {
					issues.push({
						kind: "uninitialized-pointer",
						title: `🚨 Uninitialized Pointer '${ptrName}'`,
						message: `Pointer '${ptrName}' is declared without an initial value, pointing to garbage memory.`,
						recommendation: `Always initialize pointers to NULL: '${typeName}* ${ptrName} = NULL;'`,
						line: i + 1,
						column: line.indexOf(ptrName) + 1,
						severity: vscode.DiagnosticSeverity.Warning,
						fixSnippet: `${typeName}* ${ptrName} = NULL;`,
					});
				}
			}

			// 3. Unreachable Code After return / exit
			if (/\b(?:return\s*[^;]*;|exit\s*\([^)]*\);)/.test(trimmed)) {
				if (i + 1 < lines.length) {
					const nextLine = lines[i + 1].trim();
					if (
						nextLine.length > 0 &&
						!nextLine.startsWith("}") &&
						!nextLine.startsWith("case ") &&
						!nextLine.startsWith("default:")
					) {
						issues.push({
							kind: "unreachable-code",
							title: "⚠️ Unreachable Statement",
							message: `Statements immediately following 'return' or 'exit()' inside the same block can never be executed.`,
							recommendation: "Remove or reorganize the dead code.",
							line: i + 2,
							column: 1,
							severity: vscode.DiagnosticSeverity.Information,
						});
					}
				}
			}
		}

		return issues;
	}
}

export class CodeDoctorProvider implements vscode.CodeActionProvider {
	private static diagnosticCollection: vscode.DiagnosticCollection | null = null;

	public static init(context: vscode.ExtensionContext): void {
		this.diagnosticCollection = vscode.languages.createDiagnosticCollection("dtyp-doctor");
		context.subscriptions.push(this.diagnosticCollection);
	}

	public static updateDiagnostics(document: vscode.TextDocument): CodeDoctorIssue[] {
		if (document.languageId !== "c" && document.languageId !== "cpp") {
			return [];
		}

		const source = document.getText();
		const issues = CodeDoctorAnalyzer.audit(source);

		if (this.diagnosticCollection) {
			const diags: vscode.Diagnostic[] = issues.map((issue) => {
				const line = Math.max(0, issue.line - 1);
				const col = Math.max(0, issue.column - 1);
				const range = new vscode.Range(new vscode.Position(line, col), new vscode.Position(line, col + 15));
				const d = new vscode.Diagnostic(range, `${issue.title}\n${issue.message}\n💡 ${issue.recommendation}`, issue.severity);
				d.source = "dTyp Code Doctor";
				return d;
			});
			this.diagnosticCollection.set(document.uri, diags);
		}

		return issues;
	}

	public provideCodeActions(
		document: vscode.TextDocument,
		range: vscode.Range | vscode.Selection
	): vscode.CodeAction[] {
		const actions: vscode.CodeAction[] = [];
		const lineText = document.lineAt(range.start.line).text;

		// QuickFix: Initialize pointer to NULL
		const ptrMatch = /^[ \t]*([a-zA-Z0-9_]+)\s*\*\s*([a-zA-Z0-9_]+)\s*;/.exec(lineText);
		if (ptrMatch) {
			const fix = new vscode.CodeAction(`Initialize '${ptrMatch[2]}' to NULL`, vscode.CodeActionKind.QuickFix);
			fix.edit = new vscode.WorkspaceEdit();
			const replaceText = lineText.replace(/;/, " = NULL;");
			fix.edit.replace(document.uri, document.lineAt(range.start.line).range, replaceText);
			fix.isPreferred = true;
			actions.push(fix);
		}

		return actions;
	}

	public static async formatActiveDocument(editor?: vscode.TextEditor): Promise<void> {
		const targetEditor = editor ?? vscode.window.activeTextEditor;
		if (!targetEditor) {
			vscode.window.showWarningMessage("dTyp: Open a C/C++ file to format with academic standards.");
			return;
		}

		const doc = targetEditor.document;
		const fullText = doc.getText();
		const config = vscode.workspace.getConfiguration("dtyp");
		const style = config.get<"kr" | "allman">("academicBraceStyle", "kr");
		const formatted = AcademicFormatter.format(fullText, style);

		await targetEditor.edit((editBuilder) => {
			const fullRange = new vscode.Range(
				doc.positionAt(0),
				doc.positionAt(fullText.length)
			);
			editBuilder.replace(fullRange, formatted);
		});

		vscode.window.setStatusBarMessage("$(check) dTyp: Code formatted with academic pure tabs ('\\t')!", 3000);
	}
}

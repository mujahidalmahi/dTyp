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
		const lines = source.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
		const formattedLines: string[] = [];
		let indentLevel = 0;
		let inBlockComment = false;

		for (let i = 0; i < lines.length; i++) {
			let line = lines[i].trim();

			// Handle block comments
			if (inBlockComment) {
				formattedLines.push("\t".repeat(indentLevel) + line);
				if (line.includes("*/")) {
					inBlockComment = false;
				}
				continue;
			}
			if (line.startsWith("/*") && !line.includes("*/")) {
				inBlockComment = true;
				formattedLines.push("\t".repeat(indentLevel) + line);
				continue;
			}

			// Preprocessor directives stay at column 0
			if (line.startsWith("#")) {
				formattedLines.push(line);
				continue;
			}

			// Empty line preservation
			if (line.length === 0) {
				formattedLines.push("");
				continue;
			}

			// Check closing braces on line
			if (line.startsWith("}") || line.startsWith("};")) {
				indentLevel = Math.max(0, indentLevel - 1);
			}

			// Allman style adjustment: opening brace on its own line
			if (style === "allman" && line.endsWith("{") && line !== "{") {
				const beforeBrace = this.formatOperators(line.slice(0, -1).trimEnd());
				formattedLines.push("\t".repeat(indentLevel) + beforeBrace);
				formattedLines.push("\t".repeat(indentLevel) + "{");
				indentLevel++;
				continue;
			}
			if (style === "allman" && line === "{") {
				formattedLines.push("\t".repeat(indentLevel) + "{");
				indentLevel++;
				continue;
			}

			// Format binary operators with clean single spacing outside strings
			line = this.formatOperators(line);

			// K&R style adjustment: ensure control flow braces have preceding space e.g. "if (x) {"
			if (style === "kr") {
				line = line.replace(/(\b(?:if|while|for|switch|else)\b[^{]*)\{/g, "$1{");
				line = line.replace(/([^\s])\{/g, "$1 {");
			}

			formattedLines.push("\t".repeat(indentLevel) + line);

			// Increase indent if line ends with '{'
			if (line.endsWith("{") && !line.endsWith("};")) {
				indentLevel++;
			} else {
				// Count unclosed open braces vs closing braces
				const opens = (line.match(/\{/g) || []).length;
				const closes = (line.match(/\}/g) || []).length;
				if (opens > closes && !line.startsWith("}")) {
					indentLevel += opens - closes;
				}
			}
		}

		return formattedLines.join("\n").trim() + "\n";
	}

	private static formatOperators(line: string): string {
		// Avoid altering string literals or character constants
		if (line.includes('"') || line.includes("'")) {
			return line;
		}

		return line
			.replace(/\s*(==|!=|<=|>=|&&|\|\||\+=|-=|\*=|\/=|%=)\s*/g, " $1 ")
			.replace(/([a-zA-Z0-9_)])\s*([+\-*\/%])\s*([a-zA-Z0-9_(])/g, "$1 $2 $3")
			.replace(/([^<>=!+*\/%&|^-\s])\s*=\s*([^=])/g, "$1 = $2")
			.replace(/,\s*/g, ", ")
			.replace(/;\s*([^\s;])/g, "; $1");
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

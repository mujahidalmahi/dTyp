import * as vscode from "vscode";
import { SessionEngine } from "../engine/session-engine.js";
import { HistoryEntry } from "@dtyp/types";
import { DefaultLibraryEngine } from "@dtyp/library-engine";

export class HistoryTreeProvider implements vscode.TreeDataProvider<HistoryEntry> {
	private _onDidChangeTreeData: vscode.EventEmitter<HistoryEntry | undefined | void> = new vscode.EventEmitter<HistoryEntry | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<HistoryEntry | undefined | void> = this._onDidChangeTreeData.event;

	constructor(
		private readonly sessionEngine: SessionEngine,
		private readonly libraryEngine?: DefaultLibraryEngine
	) {}

	public refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	private formatTimeAgo(timestamp: number): string {
		const elapsed = Math.floor((Date.now() - timestamp) / 1000);
		if (elapsed < 60) return "just now";
		const mins = Math.floor(elapsed / 60);
		if (mins < 60) return `${mins}m ago`;
		const hours = Math.floor(mins / 60);
		if (hours < 24) return `${hours}h ago`;
		const days = Math.floor(hours / 24);
		return `${days}d ago`;
	}

	public async getTreeItem(element: HistoryEntry): Promise<vscode.TreeItem> {
		const timeStr = this.formatTimeAgo(element.timestamp);
		const item = new vscode.TreeItem(element.componentName, vscode.TreeItemCollapsibleState.None);
		item.id = `hist_${element.id}`;
		item.description = `${timeStr} (${element.charactersTyped} chars)`;
		item.iconPath = new vscode.ThemeIcon("history");

		const md = new vscode.MarkdownString();
		md.isTrusted = true;
		md.supportHtml = true;
		md.appendMarkdown(`### 📜 ${element.componentName} *(History)*\n\n`);
		md.appendMarkdown(`- **Inserted:** ${timeStr} (${new Date(element.timestamp).toLocaleTimeString()})\n`);
		md.appendMarkdown(`- **Characters Typed:** ${element.charactersTyped}\n`);
		md.appendMarkdown(`- **Mode:** \`${element.mode}\`\n\n`);

		if (this.libraryEngine) {
			const comp = await this.libraryEngine.findComponent(element.componentId);
			if (comp) {
				md.appendMarkdown(`**Scrollable Implementation:**\n`);
				md.appendCodeblock(comp.code, "c");
			}
		}

		item.tooltip = md;
		item.contextValue = "historyItem";
		item.command = {
			command: "dtyp.insertComponentById",
			title: "Re-insert Component",
			arguments: [element.componentId],
		};
		return item;
	}

	public async getChildren(element?: HistoryEntry): Promise<HistoryEntry[]> {
		if (element) return [];
		return this.sessionEngine.getHistory(30);
	}
}

import * as vscode from "vscode";
import { SessionEngine } from "../engine/session-engine.js";
import { FavoriteEntry } from "@dtyp/types";
import { DefaultLibraryEngine } from "@dtyp/library-engine";

export class FavoritesTreeProvider implements vscode.TreeDataProvider<FavoriteEntry> {
	private _onDidChangeTreeData: vscode.EventEmitter<FavoriteEntry | undefined | void> = new vscode.EventEmitter<FavoriteEntry | undefined | void>();
	readonly onDidChangeTreeData: vscode.Event<FavoriteEntry | undefined | void> = this._onDidChangeTreeData.event;

	constructor(
		private readonly sessionEngine: SessionEngine,
		private readonly libraryEngine?: DefaultLibraryEngine
	) {}

	public refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	public async getTreeItem(element: FavoriteEntry): Promise<vscode.TreeItem> {
		const item = new vscode.TreeItem(element.componentName, vscode.TreeItemCollapsibleState.None);
		item.id = `fav_${element.componentId}`;
		item.description = element.category;
		item.iconPath = new vscode.ThemeIcon("star-full", new vscode.ThemeColor("charts.yellow"));

		const md = new vscode.MarkdownString();
		md.isTrusted = true;
		md.supportHtml = true;
		md.appendMarkdown(`### ⭐ ${element.componentName} *(Starred)*\n\n`);
		md.appendMarkdown(`**Category:** \`${element.category}\`\n\n`);

		if (this.libraryEngine) {
			const comp = await this.libraryEngine.findComponent(element.componentId);
			if (comp) {
				md.appendMarkdown(`${comp.description}\n\n`);
				md.appendMarkdown(`**Time Complexity:** \`${comp.complexity.time}\` | **Space:** \`${comp.complexity.space}\`\n\n`);
				md.appendMarkdown(`**Scrollable Implementation:**\n`);
				md.appendCodeblock(comp.code, "c");
			}
		}

		item.tooltip = md;
		item.contextValue = "favorite";
		item.command = {
			command: "dtyp.insertComponentById",
			title: "Insert Favorite",
			arguments: [element.componentId],
		};
		return item;
	}

	public async getChildren(element?: FavoriteEntry): Promise<FavoriteEntry[]> {
		if (element) return [];
		return this.sessionEngine.getFavorites();
	}
}

import * as vscode from "vscode";
import { SessionEngine } from "../engine/session-engine.js";
import { HistoryEntry } from "@dtyp/types";

export class HistoryTreeProvider implements vscode.TreeDataProvider<HistoryEntry> {
  private _onDidChangeTreeData: vscode.EventEmitter<HistoryEntry | undefined | void> = new vscode.EventEmitter<HistoryEntry | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<HistoryEntry | undefined | void> = this._onDidChangeTreeData.event;

  constructor(private readonly sessionEngine: SessionEngine) {}

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

  public getTreeItem(element: HistoryEntry): vscode.TreeItem {
    const timeStr = this.formatTimeAgo(element.timestamp);
    const item = new vscode.TreeItem(element.componentName, vscode.TreeItemCollapsibleState.None);
    item.id = `hist_${element.id}`;
    item.description = `${timeStr} (${element.charactersTyped} chars)`;
    item.iconPath = new vscode.ThemeIcon("history");
    item.tooltip = `Inserted: ${element.componentName}\nTime: ${new Date(element.timestamp).toLocaleString()}\nCharacters: ${element.charactersTyped}\nMode: ${element.mode}`;
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

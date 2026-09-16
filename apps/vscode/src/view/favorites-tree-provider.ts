import * as vscode from "vscode";
import { SessionEngine } from "../engine/session-engine.js";
import { FavoriteEntry } from "@dtyp/types";

export class FavoritesTreeProvider implements vscode.TreeDataProvider<FavoriteEntry> {
  private _onDidChangeTreeData: vscode.EventEmitter<FavoriteEntry | undefined | void> = new vscode.EventEmitter<FavoriteEntry | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<FavoriteEntry | undefined | void> = this._onDidChangeTreeData.event;

  constructor(private readonly sessionEngine: SessionEngine) {}

  public refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  public getTreeItem(element: FavoriteEntry): vscode.TreeItem {
    const item = new vscode.TreeItem(element.componentName, vscode.TreeItemCollapsibleState.None);
    item.id = `fav_${element.componentId}`;
    item.description = element.category;
    item.iconPath = new vscode.ThemeIcon("star-full", new vscode.ThemeColor("charts.yellow"));
    item.tooltip = `Starred Component: ${element.componentName} (${element.category})`;
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

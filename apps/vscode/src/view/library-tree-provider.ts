import * as vscode from "vscode";
import { DefaultLibraryEngine } from "@dtyp/library-engine";
import { Category, Component } from "@dtyp/types";

export type LibraryTreeNode = CategoryNode | ComponentNode;

export class CategoryNode {
  readonly kind = "category";
  constructor(
    public readonly category: Category,
    public readonly hasChildren: boolean
  ) {}
}

export class ComponentNode {
  readonly kind = "component";
  constructor(public readonly component: Component) {}
}

export class LibraryTreeProvider implements vscode.TreeDataProvider<LibraryTreeNode> {
  private _onDidChangeTreeData: vscode.EventEmitter<LibraryTreeNode | undefined | void> = new vscode.EventEmitter<LibraryTreeNode | undefined | void>();
  readonly onDidChangeTreeData: vscode.Event<LibraryTreeNode | undefined | void> = this._onDidChangeTreeData.event;

  constructor(private readonly libraryEngine: DefaultLibraryEngine) {}

  public refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  public getTreeItem(element: LibraryTreeNode): vscode.TreeItem {
    if (element.kind === "category") {
      const item = new vscode.TreeItem(
        element.category.name,
        vscode.TreeItemCollapsibleState.Collapsed
      );
      item.id = `cat_${element.category.id}`;
      
      let icon = "symbol-folder";
      if (!element.category.parentId) {
        switch (element.category.slug) {
          case "boiler-plates": icon = "repo"; break;
          case "data-structures": icon = "layers"; break;
          case "algorithms": icon = "symbol-event"; break;
          case "competitive-programming": icon = "trophy"; break;
          case "academics-programming": icon = "mortar-board"; break;
          case "projects": icon = "package"; break;
          case "detection": icon = "shield"; break;
          default: icon = "folder";
        }
      }
      item.iconPath = new vscode.ThemeIcon(icon);
      item.description = element.category.slug;
      item.tooltip = `Category: ${element.category.name} (${element.category.path})`;
      item.contextValue = "category";
      return item;
    } else {
      const comp = element.component;
      const item = new vscode.TreeItem(comp.name, vscode.TreeItemCollapsibleState.None);
      item.id = `comp_${comp.id}`;
      item.description = `${comp.complexity.time} • ${comp.difficulty || "standard"}`;
      item.iconPath = new vscode.ThemeIcon("symbol-method");
      
      const md = new vscode.MarkdownString();
      md.appendMarkdown(`### ${comp.name}\n\n`);
      md.appendMarkdown(`${comp.description}\n\n`);
      md.appendMarkdown(`**Signature:** \`${comp.signature}\`\n\n`);
      md.appendMarkdown(`**Time Complexity:** \`${comp.complexity.time}\` | **Space Complexity:** \`${comp.complexity.space}\`\n\n`);
      if (comp.difficulty) {
        md.appendMarkdown(`**Difficulty:** \`${comp.difficulty}\`\n\n`);
      }
      md.appendCodeblock(comp.code, "c");
      item.tooltip = md;

      item.contextValue = "component";
      item.command = {
        command: "dtyp.insertComponentById",
        title: "Insert Component",
        arguments: [comp.id],
      };
      return item;
    }
  }

  public async getChildren(element?: LibraryTreeNode): Promise<LibraryTreeNode[]> {
    if (!element) {
      // Root categories
      const roots = await this.libraryEngine.getChildren(null);
      return roots.map((r) => new CategoryNode(r, true));
    }

    if (element.kind === "category") {
      const catId = element.category.id;
      const subcategories = await this.libraryEngine.getChildren(catId);

      // If this category has sub-divisions, show only those sub-divisions
      if (subcategories.length > 0) {
        return subcategories.map((sub) => new CategoryNode(sub, true));
      }

      // Leaf division: show the components inside this division
      const components = await this.libraryEngine.getByCategoryId(catId);
      return components.map((comp) => new ComponentNode(comp));
    }

    return [];
  }
}

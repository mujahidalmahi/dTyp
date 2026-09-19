import * as vscode from "vscode";
import { OwnLibraryStorage, OwnComponent } from "../engine/own-library-storage.js";

export type OwnLibraryTreeNode =
  | SubDomainNode
  | SubTopicNode
  | OwnComponentNode
  | EmptyStateNode;

export class SubDomainNode {
  readonly kind = "subDomain";
  constructor(public readonly subDomain: string, public readonly count: number) {}
}

export class SubTopicNode {
  readonly kind = "subTopic";
  constructor(
    public readonly subDomain: string,
    public readonly subTopic: string,
    public readonly count: number
  ) {}
}

export class OwnComponentNode {
  readonly kind = "component";
  constructor(public readonly component: OwnComponent) {}
}

export class EmptyStateNode {
  readonly kind = "empty";
}

export class OwnLibraryTreeProvider
  implements vscode.TreeDataProvider<OwnLibraryTreeNode>
{
  private _onDidChangeTreeData = new vscode.EventEmitter<
    OwnLibraryTreeNode | undefined | void
  >();
  readonly onDidChangeTreeData: vscode.Event<
    OwnLibraryTreeNode | undefined | void
  > = this._onDidChangeTreeData.event;

  constructor(private readonly storage: OwnLibraryStorage) {
    this.storage.onDidChange(() => this.refresh());
  }

  public refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  public getTreeItem(element: OwnLibraryTreeNode): vscode.TreeItem {
    if (element.kind === "empty") {
      const item = new vscode.TreeItem(
        "No custom components yet",
        vscode.TreeItemCollapsibleState.None
      );
      item.description = "Click [+] to create one";
      item.tooltip = "Create your own reusable C components with custom fields and use them anytime!";
      item.iconPath = new vscode.ThemeIcon("plus");
      item.command = {
        command: "dtyp.createOwnComponent",
        title: "Create Own Component",
      };
      item.contextValue = "ownEmptyState";
      return item;
    }

    if (element.kind === "subDomain") {
      const item = new vscode.TreeItem(
        element.subDomain,
        vscode.TreeItemCollapsibleState.Expanded
      );
      item.id = `own_subdomain_${element.subDomain}`;
      item.description = `(${element.count})`;
      item.iconPath = new vscode.ThemeIcon("folder-library");
      item.tooltip = `Sub Domain: ${element.subDomain} (${element.count} component${element.count > 1 ? "s" : ""})`;
      item.contextValue = "ownSubDomain";
      return item;
    }

    if (element.kind === "subTopic") {
      const item = new vscode.TreeItem(
        element.subTopic,
        vscode.TreeItemCollapsibleState.Expanded
      );
      item.id = `own_subtopic_${element.subDomain}_${element.subTopic}`;
      item.description = `(${element.count})`;
      item.iconPath = new vscode.ThemeIcon("list-tree");
      item.tooltip = `Sub Topic: ${element.subTopic} (${element.count} component${element.count > 1 ? "s" : ""})`;
      item.contextValue = "ownSubTopic";
      return item;
    }

    // Component Node
    const comp = element.component;
    const item = new vscode.TreeItem(
      comp.name,
      vscode.TreeItemCollapsibleState.None
    );
    item.id = `own_comp_${comp.id}`;
    item.description = `${comp.type} • ${comp.subTopic}`;

    let icon = "symbol-method";
    if (comp.type === "struct") icon = "symbol-structure";
    else if (comp.type === "snippet") icon = "symbol-snippet";
    else if (comp.type === "program") icon = "terminal";
    else if (comp.type === "header") icon = "file-code";

    item.iconPath = new vscode.ThemeIcon(icon);

    const md = new vscode.MarkdownString();
    md.appendMarkdown(`### ${comp.name} *(Own Library)*\n\n`);
    if (comp.description) {
      md.appendMarkdown(`${comp.description}\n\n`);
    }
    md.appendMarkdown(`**Hierarchy:** \`Own Library\` -> \`${comp.subDomain}\` -> \`${comp.subTopic}\`\n\n`);
    md.appendMarkdown(`**Type:** \`${comp.type}\` | **Signature:** \`${comp.signature}\`\n\n`);
    if (comp.tags && comp.tags.length > 0) {
      md.appendMarkdown(`**Tags:** ${comp.tags.map((t) => `\`${t}\``).join(", ")}\n\n`);
    }
    if (comp.aliases && comp.aliases.length > 0) {
      md.appendMarkdown(`**Aliases:** ${comp.aliases.map((a) => `\`${a}\``).join(", ")}\n\n`);
    }
    md.appendCodeblock(comp.code, "c");
    item.tooltip = md;

    item.contextValue = "ownComponent";
    item.command = {
      command: "dtyp.insertOwnComponent",
      title: "Insert / Auto-Type Component",
      arguments: [comp.id],
    };

    return item;
  }

  public async getChildren(
    element?: OwnLibraryTreeNode
  ): Promise<OwnLibraryTreeNode[]> {
    const all = this.storage.getAll();
    if (all.length === 0) {
      return element ? [] : [new EmptyStateNode()];
    }

    if (!element) {
      // Root: list subDomains
      const subDomains = this.storage.getSubDomains();
      return subDomains.map((sd) => {
        const count = all.filter((c) => c.subDomain === sd).length;
        return new SubDomainNode(sd, count);
      });
    }

    if (element.kind === "subDomain") {
      // List subTopics within subDomain
      const subTopics = this.storage.getSubTopics(element.subDomain);
      return subTopics.map((st) => {
        const count = all.filter(
          (c) => c.subDomain === element.subDomain && c.subTopic === st
        ).length;
        return new SubTopicNode(element.subDomain, st, count);
      });
    }

    if (element.kind === "subTopic") {
      // List components within subDomain and subTopic
      const comps = this.storage.getBySubDomainAndTopic(
        element.subDomain,
        element.subTopic
      );
      return comps.map((c) => new OwnComponentNode(c));
    }

    return [];
  }
}

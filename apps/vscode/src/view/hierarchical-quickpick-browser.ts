import * as vscode from "vscode";
import { DefaultLibraryEngine } from "@dtyp/library-engine";
import { Category, Component } from "@dtyp/types";
import { SessionEngine } from "../engine/session-engine";

function getDomainIcon(slug: string, isRoot: boolean): string {
  if (!isRoot) return "symbol-folder";
  switch (slug) {
    case "boiler-plates":
      return "repo";
    case "data-structures":
      return "layers";
    case "algorithms":
      return "symbol-event";
    case "competitive-programming":
      return "trophy";
    case "academics-programming":
      return "mortar-board";
    case "projects":
      return "package";
    case "detection":
      return "shield";
    default:
      return "symbol-folder";
  }
}

interface CategoryQuickPickItem extends vscode.QuickPickItem {
  itemType: "category";
  category: Category;
}

interface ViewAllQuickPickItem extends vscode.QuickPickItem {
  itemType: "view_all";
  parentCategory: Category;
}

interface ComponentQuickPickItem extends vscode.QuickPickItem {
  itemType: "component";
  component: Component;
}

type BrowserQuickPickItem = CategoryQuickPickItem | ViewAllQuickPickItem | ComponentQuickPickItem;

export interface QuickPickBrowserOptions {
  libraryEngine: DefaultLibraryEngine;
  sessionEngine?: SessionEngine;
  onInsert?: (componentId: string) => Promise<void>;
  onFavoriteChanged?: () => void;
}

export class HierarchicalQuickPickBrowser {
  private history: Category[] = [];
  private isViewingAll = false;
  private readonly quickPick: vscode.QuickPick<BrowserQuickPickItem>;

  constructor(private readonly options: QuickPickBrowserOptions) {
    this.quickPick = vscode.window.createQuickPick<BrowserQuickPickItem>();
    this.quickPick.matchOnDescription = true;
    this.quickPick.matchOnDetail = true;

    this.quickPick.onDidTriggerButton(async (button) => {
      if (button === vscode.QuickInputButtons.Back) {
        if (this.isViewingAll) {
          this.isViewingAll = false;
          await this.renderCurrentLevel();
        } else if (this.history.length > 0) {
          this.history.pop();
          await this.renderCurrentLevel();
        }
      }
    });

    this.quickPick.onDidTriggerItemButton(async (e) => {
      const item = e.item;
      if (item.itemType !== "component") return;
      const comp = item.component;

      if (e.button.tooltip === "View Documentation") {
        const docContent =
          comp.documentation ||
          `# ${comp.name}\n\n${comp.description}\n\n\`\`\`c\n${comp.code}\n\`\`\``;
        const doc = await vscode.workspace.openTextDocument({
          content: docContent,
          language: "markdown",
        });
        await vscode.window.showTextDocument(doc, {
          preview: true,
          viewColumn: vscode.ViewColumn.Beside,
        });
      } else if (e.button.tooltip?.includes("Favorite")) {
        if (this.options.sessionEngine) {
          this.options.sessionEngine.toggleFavorite(comp.id, comp.name, comp.category);
          this.options.onFavoriteChanged?.();
          const isNowFav = this.options.sessionEngine.isFavorite(comp.id);
          vscode.window.setStatusBarMessage(
            isNowFav
              ? `dTyp: Starred "${comp.name}" ★`
              : `dTyp: Removed "${comp.name}" from favorites`,
            2500
          );

          // Update the button icon in the current list
          this.quickPick.items = this.quickPick.items.map((it) => {
            if (it.itemType === "component" && it.component.id === comp.id) {
              return {
                ...it,
                buttons: [
                  it.buttons![0],
                  {
                    iconPath: new vscode.ThemeIcon(isNowFav ? "star-full" : "star"),
                    tooltip: isNowFav ? "Remove Favorite" : "Add to Favorites",
                  },
                  it.buttons![2],
                ],
              };
            }
            return it;
          });
        }
      } else if (e.button.tooltip === "Copy Code") {
        await vscode.env.clipboard.writeText(comp.code);
        vscode.window.setStatusBarMessage(`dTyp: Copied "${comp.name}" code to clipboard!`, 2500);
      }
    });

    this.quickPick.onDidAccept(async () => {
      const selected = this.quickPick.selectedItems[0];
      if (!selected) return;

      if (selected.itemType === "category") {
        this.history.push(selected.category);
        this.isViewingAll = false;
        await this.renderCurrentLevel();
      } else if (selected.itemType === "view_all") {
        this.isViewingAll = true;
        await this.renderViewAll(selected.parentCategory);
      } else if (selected.itemType === "component") {
        this.quickPick.hide();
        if (this.options.onInsert) {
          await this.options.onInsert(selected.component.id);
        }
      }
    });

    this.quickPick.onDidHide(() => {
      this.quickPick.dispose();
    });
  }

  public async show(): Promise<void> {
    this.history = [];
    this.isViewingAll = false;
    await this.renderCurrentLevel();
    this.quickPick.show();
  }

  private async renderCurrentLevel(): Promise<void> {
    this.quickPick.busy = true;
    this.quickPick.value = "";

    try {
      if (this.history.length === 0) {
        // Root Domains Level
        this.quickPick.title = "dTyp: Offline C Library (500 components)";
        this.quickPick.placeholder = "Select a Domain to browse components...";
        this.quickPick.buttons = [];

        const roots = await this.options.libraryEngine.getChildren(null);
        const counts = await this.options.libraryEngine.getCategoryCounts();

        const items: BrowserQuickPickItem[] = roots.map((cat) => {
          const icon = getDomainIcon(cat.slug, true);
          const count = counts[cat.slug] ?? 0;
          return {
            itemType: "category",
            label: `$(${icon}) ${cat.name}`,
            description: cat.slug,
            detail: `${count} components • ${cat.description || cat.path}`,
            category: cat,
          };
        });

        this.quickPick.items = items;
      } else {
        const currentCat = this.history[this.history.length - 1];
        const subcategories = await this.options.libraryEngine.getChildren(currentCat.id);

        this.quickPick.buttons = [vscode.QuickInputButtons.Back];

        if (subcategories.length > 0) {
          // Division Level with Sub-Divisions
          const breadcrumb = this.history.map((c) => c.name).join(" > ");
          this.quickPick.title = `dTyp: ${breadcrumb}`;
          this.quickPick.placeholder = `Select a division in ${currentCat.name}...`;

          const branchCount = await this.options.libraryEngine.getCategoryBranchCount(currentCat.id);

          const items: BrowserQuickPickItem[] = [
            {
              itemType: "view_all",
              label: `$(list-unordered) View All in ${currentCat.name}`,
              description: `${branchCount} components`,
              detail: `Browse and search all ${branchCount} components across this entire division`,
              parentCategory: currentCat,
            },
            ...subcategories.map((sub): BrowserQuickPickItem => ({
              itemType: "category",
              label: `$(symbol-folder) ${sub.name}`,
              description: sub.slug,
              detail: sub.description || sub.path,
              category: sub,
            })),
          ];

          this.quickPick.items = items;
        } else {
          // Leaf Division Level (e.g. Singly Linked List)
          const components = await this.options.libraryEngine.getByCategoryId(currentCat.id);
          this.renderComponents(components);
        }
      }
    } finally {
      this.quickPick.busy = false;
    }
  }

  private async renderViewAll(parentCat: Category): Promise<void> {
    this.quickPick.busy = true;
    this.quickPick.value = "";

    try {
      this.quickPick.buttons = [vscode.QuickInputButtons.Back];
      const components = await this.options.libraryEngine.getByCategoryBranch(parentCat.id);
      this.renderComponents(components, true);
    } finally {
      this.quickPick.busy = false;
    }
  }

  private renderComponents(components: Component[], isAllBranch = false): void {
    const breadcrumb = this.history.map((c) => c.name).join(" > ");
    this.quickPick.title = `dTyp: ${breadcrumb}${isAllBranch ? " (All)" : ""}`;
    this.quickPick.placeholder = `Select component to insert... (${components.length} available)`;

    const items: BrowserQuickPickItem[] = components.map((c) => {
      const isFav = this.options.sessionEngine?.isFavorite(c.id) ?? false;
      return {
        itemType: "component",
        label: `$(symbol-method) ${c.name}()`,
        description: `[${c.complexity.time}] ${c.difficulty ? "• " + c.difficulty : ""}`,
        detail: `${c.description} | ${c.signature}`,
        component: c,
        buttons: [
          {
            iconPath: new vscode.ThemeIcon("book"),
            tooltip: "View Documentation",
          },
          {
            iconPath: new vscode.ThemeIcon(isFav ? "star-full" : "star"),
            tooltip: isFav ? "Remove Favorite" : "Add to Favorites",
          },
          {
            iconPath: new vscode.ThemeIcon("copy"),
            tooltip: "Copy Code",
          },
        ],
      };
    });

    this.quickPick.items = items;
  }
}

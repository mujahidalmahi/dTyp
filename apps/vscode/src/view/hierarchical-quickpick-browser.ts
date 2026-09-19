import * as vscode from "vscode";
import { DefaultLibraryEngine } from "@dtyp/library-engine";
import { Category, Component } from "@dtyp/types";
import { SessionEngine } from "../engine/session-engine.js";
import { OwnLibraryStorage } from "../engine/own-library-storage.js";

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
    case "own-library":
      return "folder-library";
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
  ownLibraryStorage?: OwnLibraryStorage;
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
        const roots = await this.options.libraryEngine.getChildren(null);
        const counts = await this.options.libraryEngine.getCategoryCounts();
        const totalCount = await this.options.libraryEngine.count();
        const ownCount = this.options.ownLibraryStorage ? this.options.ownLibraryStorage.getCount() : 0;

        this.quickPick.title = `dTyp: Offline C Library (${(totalCount + ownCount).toLocaleString()} components)`;
        this.quickPick.placeholder = "Select a Domain to browse components...";
        this.quickPick.buttons = [];

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

        // Add Own Library domain
        if (this.options.ownLibraryStorage) {
          items.push({
            itemType: "category",
            label: `$(folder-library) Own Library`,
            description: "own-library",
            detail: `${ownCount} custom component${ownCount !== 1 ? "s" : ""} • User defined library`,
            category: {
              id: "own_library_root",
              parentId: null,
              name: "Own Library",
              slug: "own-library",
              path: "Own Library",
              depth: 0,
              type: "domain",
              description: "User created custom components and snippets",
            },
          });
        }

        this.quickPick.items = items;
      } else {
        const currentCat = this.history[this.history.length - 1];
        this.quickPick.buttons = [vscode.QuickInputButtons.Back];

        // Handle Own Library hierarchy
        if (currentCat.id.startsWith("own_")) {
          await this.renderOwnLibraryLevel(currentCat);
          return;
        }

        // Built-in Library hierarchy
        const subcategories = await this.options.libraryEngine.getChildren(currentCat.id);

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
          // Leaf Division Level
          const components = await this.options.libraryEngine.getByCategoryId(currentCat.id);
          this.renderComponents(components);
        }
      }
    } finally {
      this.quickPick.busy = false;
    }
  }

  private async renderOwnLibraryLevel(currentCat: Category): Promise<void> {
    if (!this.options.ownLibraryStorage) return;
    const storage = this.options.ownLibraryStorage;
    const all = storage.getAll();

    if (currentCat.id === "own_library_root") {
      const subDomains = storage.getSubDomains();
      const breadcrumb = "Own Library";
      this.quickPick.title = `dTyp: ${breadcrumb}`;
      this.quickPick.placeholder = "Select a Sub Domain in Own Library...";

      if (all.length === 0) {
        vscode.window.showInformationMessage("Your Own Library is empty! Click [+] in the sidebar to create one.");
        this.renderComponents([]);
        return;
      }

      const items: BrowserQuickPickItem[] = [
        {
          itemType: "view_all",
          label: `$(list-unordered) View All in Own Library`,
          description: `${all.length} custom components`,
          detail: `Browse and search all ${all.length} custom components`,
          parentCategory: currentCat,
        },
        ...subDomains.map((sd): BrowserQuickPickItem => {
          const count = all.filter((c) => c.subDomain === sd).length;
          return {
            itemType: "category",
            label: `$(folder-library) ${sd}`,
            description: `${count} components`,
            detail: `Sub Domain: ${sd}`,
            category: {
              id: `own_sd_${sd}`,
              parentId: "own_library_root",
              name: sd,
              slug: sd.toLowerCase(),
              path: `Own Library / ${sd}`,
              depth: 1,
              type: "subdomain",
            },
          };
        }),
      ];

      this.quickPick.items = items;
      return;
    }

    if (currentCat.id.startsWith("own_sd_")) {
      const subDomain = currentCat.name;
      const subTopics = storage.getSubTopics(subDomain);
      const compsInSd = all.filter((c) => c.subDomain === subDomain);

      this.quickPick.title = `dTyp: Own Library > ${subDomain}`;
      this.quickPick.placeholder = `Select a Sub Topic in ${subDomain}...`;

      const items: BrowserQuickPickItem[] = [
        {
          itemType: "view_all",
          label: `$(list-unordered) View All in ${subDomain}`,
          description: `${compsInSd.length} components`,
          detail: `Browse and search all components in ${subDomain}`,
          parentCategory: currentCat,
        },
        ...subTopics.map((st): BrowserQuickPickItem => {
          const count = compsInSd.filter((c) => c.subTopic === st).length;
          return {
            itemType: "category",
            label: `$(list-tree) ${st}`,
            description: `${count} components`,
            detail: `Sub Topic: ${st}`,
            category: {
              id: `own_st_${subDomain}_${st}`,
              parentId: currentCat.id,
              name: st,
              slug: st.toLowerCase(),
              path: `Own Library / ${subDomain} / ${st}`,
              depth: 2,
              type: "subtopic",
            },
          };
        }),
      ];

      this.quickPick.items = items;
      return;
    }

    if (currentCat.id.startsWith("own_st_")) {
      // Leaf Sub Topic: render components
      const parts = currentCat.path.split("/").map((p) => p.trim());
      const subDomain = parts[1] || "";
      const subTopic = parts[2] || currentCat.name;
      const comps = storage.getBySubDomainAndTopic(subDomain, subTopic);
      this.renderComponents(comps.map((c) => storage.toComponent(c)));
      return;
    }
  }

  private async renderViewAll(parentCat: Category): Promise<void> {
    this.quickPick.busy = true;
    this.quickPick.value = "";

    try {
      this.quickPick.buttons = [vscode.QuickInputButtons.Back];

      if (parentCat.id.startsWith("own_")) {
        if (!this.options.ownLibraryStorage) return;
        const storage = this.options.ownLibraryStorage;
        if (parentCat.id === "own_library_root") {
          this.renderComponents(storage.getAllAsComponents(), true);
        } else if (parentCat.id.startsWith("own_sd_")) {
          const sd = parentCat.name;
          const comps = storage.getAll().filter((c) => c.subDomain === sd);
          this.renderComponents(comps.map((c) => storage.toComponent(c)), true);
        }
        return;
      }

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

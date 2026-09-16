import * as vscode from "vscode";
import { HistoryEntry, FavoriteEntry } from "@dtyp/types";

export class SessionEngine {
  private static readonly HISTORY_KEY = "dtyp.session.history";
  private static readonly FAVORITES_KEY = "dtyp.session.favorites";
  private static readonly STATS_KEY = "dtyp.session.stats";

  private history: HistoryEntry[] = [];
  private favorites = new Map<string, FavoriteEntry>();
  private totalTyped = 0;
  private totalComponents = 0;

  constructor(private context: vscode.ExtensionContext) {
    this.loadState();
  }

  private loadState(): void {
    const savedHistory = this.context.globalState.get<HistoryEntry[]>(SessionEngine.HISTORY_KEY, []);
    this.history = savedHistory.slice(-100);

    const savedFavorites = this.context.globalState.get<FavoriteEntry[]>(SessionEngine.FAVORITES_KEY, []);
    savedFavorites.forEach((f) => this.favorites.set(f.componentId, f));

    const stats = this.context.globalState.get<{ totalTyped: number; totalComponents: number }>(
      SessionEngine.STATS_KEY,
      { totalTyped: 0, totalComponents: 0 }
    );
    this.totalTyped = stats.totalTyped;
    this.totalComponents = stats.totalComponents;
  }

  public recordInsertion(entry: Omit<HistoryEntry, "id" | "timestamp">): HistoryEntry {
    const fullEntry: HistoryEntry = {
      id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      ...entry,
    };

    this.history.unshift(fullEntry);
    if (this.history.length > 100) {
      this.history = this.history.slice(0, 100);
    }

    this.totalComponents++;
    this.totalTyped += entry.charactersTyped;

    this.context.globalState.update(SessionEngine.HISTORY_KEY, this.history);
    this.context.globalState.update(SessionEngine.STATS_KEY, {
      totalTyped: this.totalTyped,
      totalComponents: this.totalComponents,
    });

    return fullEntry;
  }

  public getHistory(limit = 20): HistoryEntry[] {
    return this.history.slice(0, limit);
  }

  public clearHistory(): void {
    this.history = [];
    this.context.globalState.update(SessionEngine.HISTORY_KEY, []);
  }

  public toggleFavorite(componentId: string, componentName: string, category: string): boolean {
    if (this.favorites.has(componentId)) {
      this.favorites.delete(componentId);
      this.saveFavorites();
      return false;
    } else {
      this.favorites.set(componentId, {
        componentId,
        componentName,
        category,
        addedAt: Date.now(),
      });
      this.saveFavorites();
      return true;
    }
  }

  public isFavorite(componentId: string): boolean {
    return this.favorites.has(componentId);
  }

  public getFavorites(): FavoriteEntry[] {
    return Array.from(this.favorites.values()).sort((a, b) => b.addedAt - a.addedAt);
  }

  private saveFavorites(): void {
    const arr = Array.from(this.favorites.values());
    this.context.globalState.update(SessionEngine.FAVORITES_KEY, arr);
  }

  public getStats() {
    return {
      totalComponentsInserted: this.totalComponents,
      totalCharactersTyped: this.totalTyped,
      recentHistoryCount: this.history.length,
      favoritesCount: this.favorites.size,
    };
  }
}

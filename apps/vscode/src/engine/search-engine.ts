import { Component, LibraryEngine } from "@dtyp/types";
import { OwnLibraryStorage } from "./own-library-storage.js";

export interface ScoredComponent {
  component: Component;
  score: number;
  matchField: "id" | "name" | "prefix" | "category" | "alias" | "tag";
}

const ALGORITHMIC_INTENTS: Record<string, string[]> = {
  // Sorting
  "fast sort": ["quicksort", "mergesort", "heapsort"],
  "quick sort": ["quicksort"],
  "merge sort": ["mergesort"],
  "stable sort": ["mergesort", "insertion_sort"],
  "bubble sort": ["bubble_sort"],

  // Graphs & Trees
  "cycle": ["floyd", "cycle", "loop", "tortoise"],
  "loop in list": ["floyd", "cycle", "detect_cycle"],
  "detect loop": ["floyd", "cycle", "detect_cycle"],
  "find loop": ["floyd", "cycle", "detect_cycle"],
  "shortest path": ["dijkstra", "bellman_ford", "bfs"],
  "minimum spanning tree": ["kruskal", "prim"],
  "mst": ["kruskal", "prim"],
  "tree traversal": ["inorder", "preorder", "postorder", "level_order"],
  "balanced tree": ["avl", "red_black", "splay"],

  // Data structures
  "fifo": ["queue", "circular_queue"],
  "lifo": ["stack"],
  "priority queue": ["heap", "priority_queue", "min_heap", "max_heap"],
  "hash map": ["hash_table", "hash_map"],
  "lru": ["lru_cache"],
  "dynamic array": ["vector", "dynamic_array"],

  // Searching & Math
  "binary search": ["binary_search", "bsearch"],
  "gcd": ["euclidean_gcd", "gcd"],
  "prime": ["sieve", "is_prime"],
  "reverse list": ["reverse_linked_list", "reverse_list", "linkedlist"],
  "palindrome": ["is_palindrome", "palindrome_check"],
};

export class SearchEngine {
  private cache = new Map<string, ScoredComponent[]>();
  private readonly MAX_CACHE = 100;

  constructor(
    private libraryEngine: LibraryEngine,
    private ownLibraryStorage?: OwnLibraryStorage
  ) {
    if (this.ownLibraryStorage) {
      this.ownLibraryStorage.onDidChange(() => this.clearCache());
    }
  }

  public async search(query: string, limit = 50): Promise<ScoredComponent[]> {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    if (this.cache.has(trimmed)) {
      return this.cache.get(trimmed)!.slice(0, limit);
    }

    // Check for category prefix e.g. "ds:stack" or "algo:sort"
    let categoryScope: string | null = null;
    let searchTerm = trimmed;

    if (trimmed.includes(":")) {
      const parts = trimmed.split(":");
      categoryScope = parts[0].trim();
      searchTerm = parts.slice(1).join(":").trim();
    }

    // Query candidate components from sqlite
    const candidates = await this.libraryEngine.search(searchTerm || categoryScope || "", 300);
    if (this.ownLibraryStorage) {
      candidates.push(...this.ownLibraryStorage.getAllAsComponents());
    }

    const scored: ScoredComponent[] = [];

    for (const comp of candidates) {
      // Category scope filtering
      if (categoryScope) {
        const catMatch =
          comp.category.toLowerCase().includes(categoryScope) ||
          comp.categoryId.toLowerCase().includes(categoryScope) ||
          comp.path.toLowerCase().includes(categoryScope);
        if (!catMatch) continue;
      }

      const score = this.calculateScore(comp, searchTerm);
      if (score.score > 0) {
        scored.push({
          component: comp,
          score: score.score,
          matchField: score.field,
        });
      }
    }

    scored.sort((a, b) => b.score - a.score);

    if (this.cache.size >= this.MAX_CACHE) {
      const oldest = this.cache.keys().next().value;
      if (oldest) this.cache.delete(oldest);
    }
    this.cache.set(trimmed, scored);

    return scored.slice(0, limit);
  }

  private calculateScore(
    comp: Component,
    query: string
  ): { score: number; field: "id" | "name" | "prefix" | "category" | "alias" | "tag" } {
    if (!query) {
      return { score: 10, field: "category" };
    }

    const q = query.toLowerCase();
    const id = comp.id.toLowerCase();
    const name = comp.name.toLowerCase();

    // 0. Algorithmic intent / synonym matching
    for (const [intentKey, targets] of Object.entries(ALGORITHMIC_INTENTS)) {
      if (q.includes(intentKey) || intentKey.includes(q)) {
        for (const target of targets) {
          if (id.includes(target) || name.includes(target)) {
            return { score: 950, field: "name" };
          }
        }
      }
    }

    // 1. Exact matches
    if (id === q) return { score: 1000, field: "id" };
    if (name === q) return { score: 800, field: "name" };

    // 2. Name prefix
    if (name.startsWith(q)) return { score: 600, field: "name" };

    // 3. Name contains
    if (name.includes(q)) return { score: 400, field: "name" };

    // 4. Aliases
    if (comp.aliases && comp.aliases.some((a) => a.toLowerCase().includes(q))) {
      return { score: 350, field: "alias" };
    }

    // 5. Category or subcategory
    if (comp.category.toLowerCase().includes(q) || comp.path.toLowerCase().includes(q)) {
      return { score: 250, field: "category" };
    }

    // 6. Multi-word token overlap
    const tokens = q.split(/\s+/).filter((t) => t.length > 1);
    if (tokens.length > 1) {
      const fullText = `${id} ${name} ${comp.category} ${comp.description} ${(comp.tags || []).join(" ")}`.toLowerCase();
      const matchedTokens = tokens.filter((t) => fullText.includes(t));
      if (matchedTokens.length === tokens.length) {
        return { score: 450, field: "name" };
      } else if (matchedTokens.length > 0) {
        return { score: 120 * matchedTokens.length, field: "tag" };
      }
    }

    // 7. Tags
    if (comp.tags && comp.tags.some((t) => t.toLowerCase().includes(q))) {
      return { score: 150, field: "tag" };
    }

    // 8. Description
    if (comp.description.toLowerCase().includes(q)) {
      return { score: 80, field: "tag" };
    }

    return { score: 0, field: "name" };
  }

  public clearCache(): void {
    this.cache.clear();
  }
}

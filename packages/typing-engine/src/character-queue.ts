import { QueuedCharacter, TypingAction } from "@dtyp/types";

export class CharacterQueue {
  private queue: QueuedCharacter[] = [];
  private nextId = 1;

  constructor(text?: string, preserveNewlines = true, preserveTabs = true) {
    if (text) {
      this.loadText(text, preserveNewlines, preserveTabs);
    }
  }

  public loadActions(actions: TypingAction[]): void {
    this.clear();
    for (const act of actions) {
      const char = act.char ?? "";
      this.queue.push({
        id: this.nextId++,
        char,
        isNewline: char === "\n",
        isTab: char === "\t",
        delayOverrideMs: act.delayMs,
        action: act.type,
        description: act.description,
      });
    }
  }

  public loadText(text: string, preserveNewlines = true, preserveTabs = true): void {
    this.clear();
    let normalized = text;
    if (preserveNewlines) {
      // Normalize CRLF to LF internally, but keep newlines
      normalized = normalized.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    } else {
      normalized = normalized.replace(/\r?\n/g, " ");
    }

    for (let i = 0; i < normalized.length; i++) {
      const char = normalized[i];
      if (char === "\t" && !preserveTabs) {
        // Expand tab to spaces if tabs not preserved
        for (let s = 0; s < 4; s++) {
          this.enqueue(" ", false, false);
        }
      } else {
        const isNewline = char === "\n";
        const isTab = char === "\t";
        this.enqueue(char, isNewline, isTab);
      }
    }
  }

  public enqueue(
    char: string,
    isNewline = false,
    isTab = false,
    delayOverrideMs?: number,
    action: QueuedCharacter["action"] = "type",
    description?: string
  ): void {
    this.queue.push({
      id: this.nextId++,
      char,
      isNewline,
      isTab,
      delayOverrideMs,
      action,
      description,
    });
  }

  public dequeue(): QueuedCharacter | undefined {
    return this.queue.shift();
  }

  public peek(): QueuedCharacter | undefined {
    return this.queue[0];
  }

  public clear(): void {
    this.queue = [];
    this.nextId = 1;
  }

  public get length(): number {
    return this.queue.length;
  }

  public isEmpty(): boolean {
    return this.queue.length === 0;
  }

  public toArray(): QueuedCharacter[] {
    return [...this.queue];
  }
}

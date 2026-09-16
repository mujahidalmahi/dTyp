export type Listener<T = any> = (data: T) => void | Promise<void>;

export class EventEmitter<Events extends Record<string, any>> {
  private events: Map<keyof Events, Set<Listener>> = new Map();

  public on<K extends keyof Events>(event: K, listener: (data: Events[K]) => void): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add(listener);

    return () => {
      this.off(event, listener);
    };
  }

  public once<K extends keyof Events>(event: K, listener: (data: Events[K]) => void): () => void {
    const wrapper = (data: Events[K]) => {
      this.off(event, wrapper);
      listener(data);
    };
    return this.on(event, wrapper);
  }

  public off<K extends keyof Events>(event: K, listener: (data: Events[K]) => void): void {
    const listeners = this.events.get(event);
    if (listeners) {
      listeners.delete(listener);
      if (listeners.size === 0) {
        this.events.delete(event);
      }
    }
  }

  public emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const listeners = this.events.get(event);
    if (listeners) {
      for (const listener of listeners) {
        try {
          listener(data);
        } catch (err) {
          console.error(`Error handling event "${String(event)}":`, err);
        }
      }
    }
  }

  public removeAllListeners(): void {
    this.events.clear();
  }
}

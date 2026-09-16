import { Component } from "@dtyp/types";
import { defaultLogger } from "@dtyp/utilities";

export class DependencyCycleError extends Error {
  constructor(public cyclePath: string[]) {
    super(`Cyclic dependency detected: ${cyclePath.join(" -> ")}`);
    this.name = "DependencyCycleError";
  }
}

export class DependencyResolver {
  private logger = defaultLogger.child("DependencyResolver");

  /**
   * Resolves all dependencies for a component, returning them in topological order
   * (dependencies appear BEFORE dependents).
   */
  public async resolve(
    rootId: string,
    fetchComponent: (id: string) => Promise<Component | null>
  ): Promise<Component[]> {
    const visited = new Set<string>();
    const activePath = new Set<string>();
    const pathStack: string[] = [];
    const result: Component[] = [];
    const componentMap = new Map<string, Component>();

    const dfs = async (currentId: string): Promise<void> => {
      if (activePath.has(currentId)) {
        const cycleStartIndex = pathStack.indexOf(currentId);
        const cyclePath = [...pathStack.slice(cycleStartIndex), currentId];
        throw new DependencyCycleError(cyclePath);
      }

      if (visited.has(currentId)) {
        return;
      }

      activePath.add(currentId);
      pathStack.push(currentId);

      const component = await fetchComponent(currentId);
      if (!component) {
        this.logger.warn(`Missing dependency component: "${currentId}"`);
        activePath.delete(currentId);
        pathStack.pop();
        return;
      }

      componentMap.set(currentId, component);

      if (component.dependencies && component.dependencies.length > 0) {
        for (const depId of component.dependencies) {
          await dfs(depId);
        }
      }

      activePath.delete(currentId);
      pathStack.pop();
      visited.add(currentId);
      result.push(component);
    };

    await dfs(rootId);
    return result;
  }
}

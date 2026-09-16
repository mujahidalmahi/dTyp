import { OutputTarget, WindowInfo } from "@dtyp/types";
import { defaultLogger } from "@dtyp/utilities";

export class TargetRecovery {
  private logger = defaultLogger.child("TargetRecovery");

  public async resolveTarget(
    target: OutputTarget,
    availableWindows: WindowInfo[]
  ): Promise<{ resolved: WindowInfo | null; strategy: string; error?: string }> {
    if (!target) {
      return { resolved: null, strategy: "none", error: "Target definition is empty" };
    }

    this.logger.debug("Attempting target recovery", { target });

    // Strategy 1: Exact window handle match
    if (target.windowHandle) {
      const matchByHandle = availableWindows.find(
        (w) => w.handle.toLowerCase() === target.windowHandle?.toLowerCase()
      );
      if (matchByHandle) {
        this.logger.info(`Resolved target by exact handle: ${target.windowHandle}`);
        return { resolved: matchByHandle, strategy: "exact_handle" };
      }
    }

    // Strategy 2: Exact process name match
    if (target.processName) {
      const matchByProcess = availableWindows.find((w) =>
        w.processName.toLowerCase().includes(target.processName!.toLowerCase())
      );
      if (matchByProcess) {
        this.logger.info(`Resolved target by process name: ${target.processName}`);
        return { resolved: matchByProcess, strategy: "process_name" };
      }
    }

    // Strategy 3: Executable path match
    if (target.executablePath) {
      const matchByExe = availableWindows.find(
        (w) =>
          w.executablePath &&
          w.executablePath.toLowerCase().endsWith(target.executablePath!.toLowerCase())
      );
      if (matchByExe) {
        this.logger.info(`Resolved target by executable path: ${target.executablePath}`);
        return { resolved: matchByExe, strategy: "executable_path" };
      }
    }

    // Strategy 4: Window title match
    if (target.windowTitle) {
      const matchByTitle = availableWindows.find((w) =>
        w.title.toLowerCase().includes(target.windowTitle!.toLowerCase())
      );
      if (matchByTitle) {
        this.logger.info(`Resolved target by window title: ${target.windowTitle}`);
        return { resolved: matchByTitle, strategy: "window_title" };
      }
    }

    // Strategy 5: Application name match
    if (target.applicationName) {
      const matchByApp = availableWindows.find(
        (w) =>
          w.title.toLowerCase().includes(target.applicationName!.toLowerCase()) ||
          w.processName.toLowerCase().includes(target.applicationName!.toLowerCase())
      );
      if (matchByApp) {
        this.logger.info(`Resolved target by application name: ${target.applicationName}`);
        return { resolved: matchByApp, strategy: "application_name" };
      }
    }

    this.logger.warn("Failed to recover target window automatically");
    return {
      resolved: null,
      strategy: "unresolved",
      error: "Target window could not be found. Please ensure the application is running or reselect.",
    };
  }
}

import * as vscode from "vscode";
import * as https from "node:https";
import * as fs from "node:fs";
import * as path from "node:path";
import { defaultLogger } from "@dtyp/utilities";

const REPO_OWNER = "mujahidalmahi";
const REPO_NAME = "dTyp";
const GITHUB_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`;

export interface GitHubReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

export interface GitHubRelease {
  tag_name: string;
  name: string;
  html_url: string;
  body: string;
  assets: GitHubReleaseAsset[];
}

export class UpdateEngine {
  private logger = defaultLogger.child("UpdateEngine");

  constructor(private readonly context: vscode.ExtensionContext) {}

  /**
   * Compares two semver strings: a > b => 1, a < b => -1, a === b => 0
   */
  public static compareSemver(a: string, b: string): number {
    const cleanA = a.replace(/^v/, "").split(".").map((n) => parseInt(n, 10));
    const cleanB = b.replace(/^v/, "").split(".").map((n) => parseInt(n, 10));
    for (let i = 0; i < 3; i++) {
      const segA = cleanA[i] || 0;
      const segB = cleanB[i] || 0;
      if (segA > segB) return 1;
      if (segA < segB) return -1;
    }
    return 0;
  }

  public async checkForUpdates(isManual = false): Promise<void> {
    const config = vscode.workspace.getConfiguration("dtyp");
    const autoCheck = config.get<boolean>("checkForUpdates", true);
    if (!isManual && !autoCheck) {
      return;
    }

    const currentVersion = this.context.extension.packageJSON.version || "2.0.0";

    try {
      const release = await this.fetchLatestRelease();
      if (!release || !release.tag_name) {
        if (isManual) {
          vscode.window.showInformationMessage(`dTyp is up to date (v${currentVersion}).`);
        }
        return;
      }

      const remoteVersion = release.tag_name.replace(/^v/, "");
      if (UpdateEngine.compareSemver(remoteVersion, currentVersion) > 0) {
        this.logger.info(`Update available: v${currentVersion} -> v${remoteVersion}`);

        const vsixAsset = release.assets.find((a) => a.name.endsWith(".vsix"));
        const actions = vsixAsset ? ["Update Extension", "View Release Notes", "Dismiss"] : ["View Release Notes", "Dismiss"];

        const choice = await vscode.window.showInformationMessage(
          `dTyp v${remoteVersion} is available! (Current: v${currentVersion})`,
          ...actions
        );

        if (choice === "Update Extension" && vsixAsset) {
          await this.downloadAndInstallVsix(vsixAsset, remoteVersion);
        } else if (choice === "View Release Notes") {
          vscode.env.openExternal(vscode.Uri.parse(release.html_url));
        }
      } else if (isManual) {
        vscode.window.showInformationMessage(`dTyp is up to date (v${currentVersion}).`);
      }
    } catch (err: any) {
      this.logger.warn(`Failed to check for updates: ${err.message}`);
      if (isManual) {
        vscode.window.showWarningMessage(`Could not check for dTyp updates: ${err.message}`);
      }
    }
  }

  private fetchLatestRelease(): Promise<GitHubRelease | null> {
    return new Promise((resolve) => {
      const req = https.get(
        GITHUB_API_URL,
        {
          headers: {
            "User-Agent": "dTyp-VSCode-Extension",
            Accept: "application/vnd.github.v3+json",
          },
          timeout: 5000,
        },
        (res) => {
          if (res.statusCode !== 200) {
            resolve(null);
            return;
          }
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => {
            try {
              resolve(JSON.parse(data));
            } catch {
              resolve(null);
            }
          });
        }
      );

      req.on("error", () => resolve(null));
      req.on("timeout", () => {
        req.destroy();
        resolve(null);
      });
    });
  }

  private async downloadAndInstallVsix(asset: GitHubReleaseAsset, version: string): Promise<void> {
    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: `Downloading dTyp v${version}...`,
        cancellable: false,
      },
      async (progress) => {
        const storagePath = this.context.globalStorageUri.fsPath;
        if (!fs.existsSync(storagePath)) {
          fs.mkdirSync(storagePath, { recursive: true });
        }
        const tempVsixPath = path.join(storagePath, asset.name);

        await this.downloadFile(asset.browser_download_url, tempVsixPath, progress);

        progress.report({ message: "Installing extension..." });
        await vscode.commands.executeCommand("workbench.extensions.installExtension", vscode.Uri.file(tempVsixPath));

        const reloadChoice = await vscode.window.showInformationMessage(
          `dTyp successfully updated to v${version}! Reload VS Code to activate.`,
          "Reload Window"
        );
        if (reloadChoice === "Reload Window") {
          vscode.commands.executeCommand("workbench.action.reloadWindow");
        }
      }
    );
  }

  private downloadFile(url: string, destPath: string, progress: vscode.Progress<{ message?: string }>): Promise<void> {
    return new Promise((resolve, reject) => {
      const follow = (curUrl: string) => {
        https
          .get(curUrl, { headers: { "User-Agent": "dTyp-VSCode-Extension" } }, (res) => {
            if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
              follow(res.headers.location);
              return;
            }
            if (res.statusCode !== 200) {
              reject(new Error(`Download failed with HTTP status ${res.statusCode}`));
              return;
            }

            const total = parseInt(res.headers["content-length"] || "0", 10);
            let downloaded = 0;
            const fileStream = fs.createWriteStream(destPath);

            res.on("data", (chunk) => {
              downloaded += chunk.length;
              if (total > 0) {
                const pct = Math.floor((downloaded / total) * 100);
                progress.report({ message: `${pct}% completed` });
              }
            });

            res.pipe(fileStream);
            fileStream.on("finish", () => {
              fileStream.close();
              resolve();
            });
            fileStream.on("error", (err) => reject(err));
          })
          .on("error", (err) => reject(err));
      };
      follow(url);
    });
  }
}

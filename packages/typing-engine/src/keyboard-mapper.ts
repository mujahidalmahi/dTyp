import { KeyboardMapper, TypingTarget } from "@dtyp/types";

export class StandardKeyboardMapper implements KeyboardMapper {
  constructor(private target: TypingTarget) {}

  public setTarget(target: TypingTarget): void {
    this.target = target;
  }

  public async typeCharacter(character: string, autoClose?: string): Promise<void> {
    if (!this.target) {
      throw new Error("Cannot type character: no typing target configured");
    }
    // Delegate directly to the target which knows how to send native or editor input
    await this.target.typeCharacter(character, autoClose);
  }

  public async overtypeCharacter(character: string): Promise<void> {
    if (!this.target) {
      throw new Error("Cannot overtype character: no typing target configured");
    }
    if (typeof this.target.overtypeCharacter === "function") {
      await this.target.overtypeCharacter(character);
    } else {
      await this.target.typeCharacter(character);
    }
  }

  public async deleteBackward(): Promise<void> {
    if (this.target && typeof this.target.deleteBackward === "function") {
      await this.target.deleteBackward();
    }
  }

  public async releaseModifiers(): Promise<void> {
    if (this.target && typeof this.target.releaseModifiers === "function") {
      await this.target.releaseModifiers();
    }
  }

  public async moveCursor(
    lineOffset: number,
    column?: number,
    landmark?: "above_main" | "inside_main"
  ): Promise<void> {
    if (this.target && typeof this.target.moveCursor === "function") {
      await this.target.moveCursor(lineOffset, column, landmark);
    }
  }
}
